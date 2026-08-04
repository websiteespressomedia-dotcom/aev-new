import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
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

// Page Transition Configuration
const pageVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const PageWrapper = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%' }}>
    {children}
  </motion.div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothWheel: true,
      mouseMultiplier: 1.2,
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
    <>
      <ScrollManager />
      <main className="app-container">
        <CustomCursor />
        <GlobalBackground />
        
        <Navigation onMenuClick={() => setIsMenuOpen(true)} />
        <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/collections" element={<PageWrapper><Collections /></PageWrapper>} />
            <Route path="/catalogue" element={<PageWrapper><Catalogue /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
