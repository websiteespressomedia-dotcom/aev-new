import React, { useRef, useMemo, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, Html, useProgress, shaderMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ background: 'rgba(255,0,0,0.8)', color: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>3D Render Error</h2>
            <p>{this.state.error?.message}</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

// Loader component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: 'white', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '20px' }}>
        Loading High-Res Textures... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// Safely create the shader material using drei's helper
const DepthMaterial = shaderMaterial(
  { uTexture: null, uDepthMap: null, uIntensity: 3.5 },
  // vertex shader
  `
    uniform sampler2D uDepthMap;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 depthColor = texture2D(uDepthMap, vUv);
      float depth = depthColor.r;
      vec3 pos = position;
      pos.z += depth * uIntensity;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `
);

extend({ DepthMaterial });

const CinematicKitchen = () => {
  const [colorMap, depthMap] = useTexture(['/kitchen_bg.jpg', '/kitchen_depth.jpg']);
  const materialRef = useRef();
  
  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    depthMap.colorSpace = THREE.LinearSRGBColorSpace;
  }, [colorMap, depthMap]);

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[32, 18, 128, 128]} />
      <depthMaterial 
        ref={materialRef}
        uTexture={colorMap}
        uDepthMap={depthMap}
        uIntensity={3.5}
      />
    </mesh>
  );
};

const SceneController = () => {
  const { camera } = useThree();

  useLayoutEffect(() => {
    // Start slightly pulled back
    camera.position.set(0, 0, 10);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    });

    // As user scrolls, we dive deep into the 3D displaced image!
    // This perfectly simulates zooming into the kitchen island
    tl.to(camera.position, {
      z: 2.5, // Move camera deeply into the Z space
      y: -1.5, // Pan down slightly towards the island
      ease: "power2.inOut",
    }, 0);
    
    // Slight rotation for cinematic feel
    tl.to(camera.rotation, {
      x: 0.1,
      ease: "power2.inOut",
    }, 0);

    return () => {
      tl.kill();
    };
  }, [camera]);

  return null;
};

export default function ContinuousExperience() {
  return (
    <div className="three-canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <CinematicKitchen />
            <SceneController />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
}
