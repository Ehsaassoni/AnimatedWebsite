import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(220,220,255,0.7)");
  grad.addColorStop(1, "rgba(220,220,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const RINGS = 6;
const VERTICALS = 16;
const RADIUS = 2.1;
const HEIGHT = 1.6;

function LatticeRing() {
  const group = useRef<THREE.Group>(null);
  const dotTexture = useMemo(() => makeDotTexture(), []);

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
            color={i === 0 || i === RINGS - 1 ? "#a9a9ff" : "#5b5bf0"}
            transparent
            opacity={i === 0 || i === RINGS - 1 ? 0.85 : 0.32}
          />
        </line>
      ))}
      {vertLines.map((geo, i) => (
        <line key={`v${i}`}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color="#7c7cff" transparent opacity={0.22} />
        </line>
      ))}
      <points geometry={joints}>
        <pointsMaterial
          map={dotTexture}
          size={0.075}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#e8e8ff"
        />
      </points>
    </group>
  );
}

function Glow() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshBasicMaterial color="#5b5bf0" transparent opacity={0.12} />
    </mesh>
  );
}

export default function SteelScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [3.4, 1.6, 4.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <LatticeRing />
      <Glow />
    </Canvas>
  );
}
