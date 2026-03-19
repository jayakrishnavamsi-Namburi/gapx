import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// 🧱 PROJECT BLOCK
const Block = ({ strain }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = strain * 0.02;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#92400e" metalness={0.3} roughness={0.6} />
    </mesh>
  );
};

// 🧍 SIMPLE CHARACTER (capsule body)
const Character = ({ strain }) => {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = strain * 0.02 - 2;
      ref.current.rotation.z = Math.sin(strain * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.4, 1.2, 4, 8]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#fcd34d" />
      </mesh>
    </group>
  );
};

// 🌍 GROUND
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[50, 50]} />
    <meshStandardMaterial color="#1e293b" roughness={1} />
  </mesh>
);

// 🎥 MAIN SCENE
const Scene = ({ strain }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Environment for realism */}
      <Environment preset="city" />

      {/* Floating cinematic effect */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Block strain={strain} />
      </Float>

      <Character strain={strain} />
      <Ground />

      {/* Camera control (optional) */}
      <OrbitControls enableZoom={false} />
    </>
  );
};

// 🎯 MAIN COMPONENT
const LoadingSpinner = () => {
  const [strain, setStrain] = React.useState(0);

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % 100;
      setStrain(i);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <Canvas shadows camera={{ position: [5, 3, 8], fov: 50 }}>
        <Scene strain={strain} />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-mono">
        ⚡ Loading Project... {strain}%
      </div>
    </div>
  );
};

export default LoadingSpinner;