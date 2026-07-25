import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";
import { getScenePalette, makeDotTexture } from "./palette";

const RINGS = 6;
const VERTICALS = 16;
const RADIUS = 2.1;
const HEIGHT = 1.6;

function LatticeRing({ palette }: { palette: ReturnType<typeof getScenePalette> }) {
  const group = useRef<THREE.Group>(null);
  const dotTexture = useMemo(() => makeDotTexture(palette.dot), [palette.dot]);

  const { ringLines, vertLines, joints } = useMemo(() => {
    const ringLines: THREE.BufferGeometry[] = [];
    const jointPositions: number[] = [];

    for (let r = 0; r < RINGS; r++) {
      const y = -HEIGHT / 2 + (HEIGHT * r) / (RINGS - 1);
      const pts: THREE.Vector3[] = [];
      const segments = 48;
      for (let s = 0; s <= segments; s++) {
        const a = (s / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * RADIUS, y, Math.sin(a) * RADIUS));
      }
      ringLines.push(new THREE.BufferGeometry().setFromPoints(pts));

      for (let v = 0; v < VERTICALS; v++) {
        const a = (v / VERTICALS) * Math.PI * 2;
        jointPositions.push(Math.cos(a) * RADIUS, y, Math.sin(a) * RADIUS);
      }
    }

    const vertLines: THREE.BufferGeometry[] = [];
    for (let v = 0; v < VERTICALS; v++) {
      const a = (v / VERTICALS) * Math.PI * 2;
      const x = Math.cos(a) * RADIUS;
      const z = Math.sin(a) * RADIUS;
      const pts = [
        new THREE.Vector3(x, -HEIGHT / 2, z),
        new THREE.Vector3(x, HEIGHT / 2, z),
      ];
      vertLines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }

    const joints = new THREE.BufferGeometry();
    joints.setAttribute("position", new THREE.Float32BufferAttribute(jointPositions, 3));

    return { ringLines, vertLines, joints };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.14;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.5) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.22, 0, 0]}>
      {ringLines.map((geo, i) => (
        <line key={`r${i}`}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial
            color={i === 0 || i === RINGS - 1 ? palette.lineBright : palette.lineBase}
            transparent
            opacity={(i === 0 || i === RINGS - 1 ? 0.85 : 0.32) * palette.opacityMult}
          />
        </line>
      ))}
      {vertLines.map((geo, i) => (
        <line key={`v${i}`}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color={palette.lineFaint} transparent opacity={0.22 * palette.opacityMult} />
        </line>
      ))}
      <points geometry={joints}>
        <pointsMaterial
          map={dotTexture}
          size={0.075}
          transparent
          depthWrite={false}
          blending={palette.blending}
          color={palette.dot}
        />
      </points>
    </group>
  );
}

function Glow({ color }: { color: string }) {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

export default function SteelScene() {
  const { theme } = useTheme();
  const palette = useMemo(() => getScenePalette(theme), [theme]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [3.4, 1.6, 4.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <LatticeRing palette={palette} />
      <Glow color={palette.glow} />
    </Canvas>
  );
}
