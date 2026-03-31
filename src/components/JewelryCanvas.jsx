import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';

// Animated Diamond-like gem
const DiamondGem = ({ position, scale = 1, color = '#ffaacb' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.05}
        transmission={0.9}
        thickness={1.5}
        ior={2.4}
        transparent
        opacity={0.92}
        reflectivity={1}
        envMapIntensity={2}
      />
    </mesh>
  );
};

// Main ring — reduced segment count (24×64 vs 32×128)
const Ring = () => {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      ringRef.current.rotation.y += 0.006;
      ringRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh>
        <torusGeometry args={[1.6, 0.18, 24, 64]} />
        <meshPhysicalMaterial
          color="#d4a0b5"
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={3}
          reflectivity={1}
        />
      </mesh>
      {/* Diamond on ring */}
      <mesh position={[0, 1.79, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshPhysicalMaterial
          color="#ffc2dc"
          metalness={0.0}
          roughness={0.0}
          transmission={0.95}
          thickness={0.5}
          ior={2.5}
          transparent
          opacity={0.96}
          envMapIntensity={4}
        />
      </mesh>
    </group>
  );
};

// Orbiting pearls — reduced sphere segments (12×12 vs 16×16)
const OrbitingPearl = ({ radius, speed, offset, color = '#ffe0ef', size = 0.18 }) => {
  const pearlRef = useRef();

  useFrame((state) => {
    if (pearlRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      pearlRef.current.position.x = Math.cos(t) * radius;
      pearlRef.current.position.z = Math.sin(t) * radius;
      pearlRef.current.position.y = Math.sin(t * 0.7) * 0.5;
    }
  });

  return (
    <mesh ref={pearlRef}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.0}
        roughness={0.02}
        transmission={0.3}
        envMapIntensity={2}
        reflectivity={0.8}
      />
    </mesh>
  );
};

const JewelryCanvas = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '480px' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffd6ea" />
        <pointLight position={[-5, -3, 3]} intensity={1} color="#c8a96e" />
        <pointLight position={[0, -5, -2]} intensity={0.5} color="#ffb0cc" />

        <Suspense fallback={null}>
          <Environment preset="studio" />

          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <Ring />
          </Float>

          {/* Floating diamonds */}
          <DiamondGem position={[-3.2, 1.5, -1]} scale={0.45} color="#ffc2dc" />
          <DiamondGem position={[3.0, -1.0, -0.5]} scale={0.35} color="#c8a96e" />
          <DiamondGem position={[-2.5, -1.8, 0.5]} scale={0.28} color="#ffaacb" />
          <DiamondGem position={[2.5, 2.2, -1.5]} scale={0.22} color="#e8d5a3" />

          {/* Orbiting pearls — 3 instead of 5 */}
          <OrbitingPearl radius={2.8} speed={0.5} offset={0} color="#ffe0ef" size={0.18} />
          <OrbitingPearl radius={2.8} speed={0.5} offset={Math.PI * 0.66} color="#ffd6e7" size={0.14} />
          <OrbitingPearl radius={2.8} speed={0.5} offset={Math.PI * 1.33} color="#c8a96e" size={0.12} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default JewelryCanvas;
