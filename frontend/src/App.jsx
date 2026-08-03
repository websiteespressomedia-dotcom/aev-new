import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import FullscreenMenu from './components/FullscreenMenu';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Catalogue from './pages/Catalogue';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

// Sub-component to handle smooth scrolling reset on route change
const ScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <Router>
      <ScrollManager />
      <main className="app-container">
        <CustomCursor />
        <GlobalBackground />
        
        <Navigation onMenuClick={() => setIsMenuOpen(true)} />
        <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
