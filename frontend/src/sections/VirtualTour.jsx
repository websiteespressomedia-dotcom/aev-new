import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import './VirtualTour.css';

const tourData = {
  living_room: {
    id: 'living_room',
    texture: '/images/panorama.jpg',
    name: 'Luxury Living Room',
    hotspots: [
      { position: [-300, -50, -300], target: 'bathroom', label: 'Go to Bathroom' },
      { position: [400, 0, 100], target: 'outdoor', label: 'Explore Outdoor' },
      { position: [-100, 0, 400], target: 'bedroom', label: 'Go to Bedroom' },
      { position: [200, 0, -400], target: 'kitchen', label: 'Go to Kitchen' },
    ]
  },
  bathroom: {
    id: 'bathroom',
    texture: '/images/panorama_bathroom.jpg',
    name: 'Premium Bathroom',
    hotspots: [
      { position: [0, -50, 400], target: 'living_room', label: 'Back to Living Room' }
    ]
  },
  bedroom: {
    id: 'bedroom',
    texture: '/images/panorama_bedroom.jpg',
    name: 'Modern Bedroom',
    hotspots: [
      { position: [300, 0, -300], target: 'living_room', label: 'Back to Living Room' }
    ]
  },
  outdoor: {
    id: 'outdoor',
    texture: '/images/panorama_outdoor.jpg',
    name: 'Outdoor Patio',
    hotspots: [
      { position: [-400, -50, 0], target: 'living_room', label: 'Back to Living Room' }
    ]
  },
  kitchen: {
    id: 'kitchen',
    texture: '/images/panorama_kitchen.jpg',
    name: 'Luxury Kitchen',
    hotspots: [
      { position: [0, 0, 400], target: 'living_room', label: 'Back to Living Room' }
    ]
  }
};

const SphereScene = ({ sceneId, onChangeScene }) => {
  const sceneData = tourData[sceneId];
  const texture = useTexture(sceneData.texture);
  const materialRef = useRef();
  
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial ref={materialRef} map={texture} side={THREE.BackSide} />
      </mesh>
      
      {sceneData.hotspots.map((hotspot, idx) => (
        <Html 
          key={idx} 
          position={hotspot.position} 
          center 
          zIndexRange={[100, 0]}
        >
          <div 
            className="hotspot-dot" 
            onClick={() => onChangeScene(hotspot.target)}
          >
            <div className="hotspot-inner"></div>
            <span className="hotspot-label">{hotspot.label}</span>
          </div>
        </Html>
      ))}
    </group>
  );
};

const VirtualTour = () => {
  const [currentScene, setCurrentScene] = useState('living_room');

  return (
    <section className="virtual-tour-section" id="tour">
      <div className="tour-header">
        <h2>Immersive Experience</h2>
        <p>Step inside luxury. You are viewing: <strong>{tourData[currentScene].name}</strong></p>
      </div>
      
      <div className="tour-container" data-cursor-text="DRAG & ZOOM">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 80 }}>
          <Suspense fallback={
            <Html center>
              <div className="tour-loading">LOADING...</div>
            </Html>
          }>
            <SphereScene 
              sceneId={currentScene} 
              onChangeScene={setCurrentScene} 
            />
          </Suspense>
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={-0.5}
          />
        </Canvas>
        
        <div className="tour-navigation-hud">
          {Object.keys(tourData).map(key => (
            <button 
              key={key} 
              className={`tour-nav-btn ${currentScene === key ? 'active' : ''}`}
              onClick={() => setCurrentScene(key)}
            >
              {tourData[key].name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
