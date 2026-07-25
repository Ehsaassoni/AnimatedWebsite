import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";
import { getScenePalette, makeDotTexture } from "./palette";

const NODE_COUNT = 46;
const NEIGHBORS = 2;
const SPHERE_RADIUS = 2.3;

function distSq(a: [number, number, number], b: [number, number, number]) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return dx * dx + dy * dy + dz * dz;
}

function buildNetwork() {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    positions.push([x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS]);
  }

  const connSet = new Set<string>();
  positions.forEach((p, i) => {
    const dists = positions
      .map((q, j) => ({ j, d: i === j ? Infinity : distSq(p, q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBORS);
    dists.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      connSet.add(key);
    });
  });

  const linePositions: number[] = [];
  connSet.forEach((key) => {
    const [a, b] = key.split("-").map(Number);
    linePositions.push(...positions[a], ...positions[b]);
  });

  const pointPositions = new Float32Array(positions.length * 3);
  positions.forEach((p, i) => {
    pointPositions[i * 3] = p[0];
    pointPositions[i * 3 + 1] = p[1];
    pointPositions[i * 3 + 2] = p[2];
  });

  return {
    pointPositions,
    linePositions: new Float32Array(linePositions),
  };
}

function Globe({ palette }: { palette: ReturnType<typeof getScenePalette> }) {
  const group = useRef<THREE.Group>(null);
  const { pointPositions, linePositions } = useMemo(() => buildNetwork(), []);
  const dotTexture = useMemo(() => makeDotTexture(palette.dot), [palette.dot]);

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    return geo;
  }, [pointPositions]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.06;
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.15;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={palette.lineBase} transparent opacity={0.25 * palette.opacityMult} />
      </lineSegments>
      <points geometry={pointsGeo}>
        <pointsMaterial
          map={dotTexture}
          size={0.11}
          transparent
          depthWrite={false}
          blending={palette.blending}
          color={palette.dot}
        />
      </points>
    </group>
  );
}

export default function NetworkScene() {
  const { theme } = useTheme();
  const palette = useMemo(() => getScenePalette(theme), [theme]);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <Globe palette={palette} />
    </Canvas>
  );
}
