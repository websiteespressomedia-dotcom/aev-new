import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GlobalBackground from './components/GlobalBackground';
import Hero from './sections/Hero';
import RingGallery from './sections/RingGallery';
import ReverseScroll from './sections/ReverseScroll';
import FloorTiles from './sections/FloorTiles';
import WallTiles from './sections/WallTiles';
import BathroomTiles from './sections/BathroomTiles';
import KitchenTiles from './sections/KitchenTiles';
import OutdoorTiles from './sections/OutdoorTiles';
import LargeFormatSlabs from './sections/LargeFormatSlabs';
import InteriorGallery from './sections/InteriorGallery';
import ManufacturingStory from './sections/ManufacturingStory';
import Statistics from './sections/Statistics';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import VirtualTour from './sections/VirtualTour';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <main className="app-container">
      {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
      <CustomCursor />
      <GlobalBackground />
      <Navigation />
      <Hero />
      <ManufacturingStory />
      <div style={{ height: '5vh' }} />
      <VirtualTour />
      <div style={{ height: '10vh' }} />
      <LargeFormatSlabs />
      <div style={{ height: '15vh' }} />
      <FloorTiles />
      <div style={{ height: '15vh' }} />
      <WallTiles />
      <div style={{ height: '15vh' }} />
      <RingGallery />
      <div style={{ height: '15vh' }} />
      <ReverseScroll />
      <div style={{ height: '15vh' }} />
      <BathroomTiles />
      <KitchenTiles />
      <OutdoorTiles />
      <InteriorGallery />
      <Statistics />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default App;
