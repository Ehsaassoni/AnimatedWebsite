import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";
import { getScenePalette } from "./palette";

function Core({ palette }: { palette: ReturnType<typeof getScenePalette> }) {
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.35;
      wireRef.current.rotation.x += delta * 0.14;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.55;
      coreRef.current.rotation.z += delta * 0.2;
    }
    if (coreMatRef.current) {
      const pulse = 0.55 + Math.sin(state.clock.getElapsedTime() * 1.6) * 0.4;
      coreMatRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <group>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial
          color={palette.lineFaint}
          wireframe
          transparent
          opacity={Math.min(1, 0.55 * palette.opacityMult)}
        />
      </mesh>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          ref={coreMatRef}
          color={palette.lineBase}
          emissive={palette.lineBase}
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function CoreScene() {
  const { theme } = useTheme();
  const palette = useMemo(() => getScenePalette(theme), [theme]);

  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 3.2], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={1.3} color={palette.lineFaint} />
      <Core palette={palette} />
    </Canvas>
  );
}
