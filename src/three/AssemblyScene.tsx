import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYCLE = 9;
const HOLD_END = 0.9;
const FADE_IN_END = 0.035;

type Member = {
  size: [number, number, number];
  to: [number, number, number];
  toRot: [number, number, number];
  from: [number, number, number];
  fromRot: [number, number, number];
  delay: number;
  dur: number;
};

function buildMembers(): Member[] {
  const members: Member[] = [];
  let i = 0;
  const nextDelay = () => {
    const d = i * 0.052;
    i += 1;
    return d;
  };

  members.push({
    size: [2.6, 0.08, 0.08],
    to: [0, -1, 0],
    toRot: [0, 0, 0],
    from: [4.6, -1, 1.6],
    fromRot: [0, 0.6, 0.3],
    delay: nextDelay(),
    dur: 0.14,
  });

  [-1.2, -0.4, 0.4, 1.2].forEach((x) => {
    members.push({
      size: [0.08, 2, 0.08],
      to: [x, 0, 0],
      toRot: [0, 0, 0],
      from: [x + (Math.random() - 0.5) * 1.6, 3.6, (Math.random() - 0.5) * 2.2],
      fromRot: [0.45, 0.35, 0.2],
      delay: nextDelay(),
      dur: 0.13,
    });
  });

  members.push({
    size: [2.6, 0.08, 0.08],
    to: [0, 0, 0],
    toRot: [0, 0, 0],
    from: [-4.6, 0, -1.6],
    fromRot: [0, 0.5, 0.2],
    delay: nextDelay(),
    dur: 0.14,
  });

  const diagLen = Math.sqrt(0.8 * 0.8 + 2 * 2);
  const diagAngle = Math.atan2(2, 0.8);
  members.push({
    size: [diagLen, 0.05, 0.05],
    to: [-0.8, 0, 0],
    toRot: [0, 0, diagAngle],
    from: [-0.8, 0, 3.2],
    fromRot: [0, 0, 0],
    delay: nextDelay(),
    dur: 0.14,
  });
  members.push({
    size: [diagLen, 0.05, 0.05],
    to: [0.8, 0, 0],
    toRot: [0, 0, -diagAngle],
    from: [0.8, 0, 3.2],
    fromRot: [0, 0, 0],
    delay: nextDelay(),
    dur: 0.14,
  });

  members.push({
    size: [2.6, 0.08, 0.08],
    to: [0, 1, 0],
    toRot: [0, 0, 0],
    from: [4.6, 1, -1.6],
    fromRot: [0, 0.6, 0.3],
    delay: nextDelay(),
    dur: 0.14,
  });

  return members;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Beam({ m }: { m: Member }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = (state.clock.getElapsedTime() % CYCLE) / CYCLE;

    const localRaw = m.dur > 0 ? (t - m.delay) / m.dur : 1;
    const localT = Math.min(1, Math.max(0, localRaw));
    const eased = easeOutCubic(localT);

    mesh.position.set(
      lerp(m.from[0], m.to[0], eased),
      lerp(m.from[1], m.to[1], eased),
      lerp(m.from[2], m.to[2], eased)
    );
    mesh.rotation.set(
      lerp(m.fromRot[0], m.toRot[0], eased),
      lerp(m.fromRot[1], m.toRot[1], eased),
      lerp(m.fromRot[2], m.toRot[2], eased)
    );

    let opacity = 1;
    if (t < FADE_IN_END) opacity = t / FADE_IN_END;
    else if (t > HOLD_END) opacity = Math.max(0, 1 - (t - HOLD_END) / (1 - HOLD_END));

    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.opacity = opacity;
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={m.size} />
      <meshStandardMaterial
        color="#8fa3c7"
        metalness={0.85}
        roughness={0.32}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

function Rig() {
  const members = useMemo(() => buildMembers(), []);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.3 + 0.4;
  });

  return (
    <group ref={group}>
      {members.map((m, i) => (
        <Beam key={i} m={m} />
      ))}
    </group>
  );
}

export default function AssemblyScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3.6, 1.4, 4.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} castShadow />
      <pointLight position={[-3, -1.5, -2]} intensity={5} color="#5b5bf0" />
      <pointLight position={[3, -2, 2.5]} intensity={2.8} color="#4f7df0" />
      <Rig />
    </Canvas>
  );
}
