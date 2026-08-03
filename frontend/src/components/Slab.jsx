import { useRef, useLayoutEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Slab({ isFloating }) {
  const meshRef = useRef();

  // Load the premium marble texture we generated
  const [colorMap] = useTexture(['/marble_texture.jpg']);
  
  // Set texture properties for a more realistic look
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;

  useFrame((state) => {
    // Add a very subtle floating animation when in the floating scenes (4 and 5)
    if (isFloating.current && meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time * 1.5) * 0.0005;
      meshRef.current.rotation.z += Math.cos(time * 1) * 0.0002;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow name="main-slab">
      {/* A large, thin box geometry to represent the porcelain slab. 
          Sizes can be adjusted via GSAP scale, starting with a base size. */}
      <boxGeometry args={[4, 2.5, 0.05]} />
      
      {/* High-end physical material to simulate polished porcelain/marble */}
      <meshPhysicalMaterial 
        map={colorMap}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        envMapIntensity={2.5}
        color="#ffffff"
      />
    </mesh>
  );
}
