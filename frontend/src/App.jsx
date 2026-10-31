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
import WhatsAppButton from './components/WhatsAppButton';
import Export from './components/export/Export';
import Footer from './components/Footer';


// Pages
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Catalogue from './pages/Catalogue';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from "./pages/ProductDetailPage";
import TileCalculatorPage from "./pages/TileCalculatorPage";

gsap.registerPlugin(ScrollTrigger);

// Sub-component to handle smooth scrolling reset on route change
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const isProductDetailRoute =
      /^\/(porcelain-floor-tiles|large-format-porcelain-tiles|porcelain-slab-tiles)\//.test(
        pathname
      );

    const isReturningToListing =
      pathname === "/collections" &&
      hash === "#product-listing";

    // Let the destination page handle its own scroll position.
    // This prevents the old collection page from jumping to its heading
    // while AnimatePresence is running its exit animation.
    if (isProductDetailRoute || isReturningToListing) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash]);

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
    const seoPages = {
      "/": {
        title: "Premium Porcelain Tiles & Surfaces | Aevitas Ceramics",
        description:
          "Explore premium porcelain tiles, floor tiles, wall tiles and large-format surfaces by Aevitas Ceramics for contemporary residential and commercial spaces."
      },
      "/about": {
        title: "About Aevitas Ceramics | Tile Design & Surfaces",
        description:
          "Learn about Aevitas Ceramics, our approach to tile design, material quality and surface solutions for architectural and interior spaces."
      },
      "/collections": {
        title: "Porcelain Floor & Wall Tile Collections | Aevitas Ceramics",
        description:
          "Explore porcelain floor tiles, wall tiles, large-format surfaces and distinctive finishes for modern homes and commercial interiors."
      },
      "/export": {
        title: "Porcelain Tile Exporter from India | Aevitas Ceramics",
        description:
          "Aevitas Ceramics supplies premium porcelain floor tiles and large format tiles to importers, distributors, wholesalers and project buyers worldwide."
      },
      "/catalogue": {
        title: "Tile Catalogue & Designs | Aevitas Ceramics",
        description:
          "Browse the Aevitas Ceramics tile catalogue to discover tile designs, surface finishes and available formats for your next project."
      },
      "/contact": {
        title: "Contact Aevitas Ceramics | Tile Enquiries",
        description:
          "Contact Aevitas Ceramics for tile specifications, product availability, catalogue enquiries and information about our porcelain tile collections."
      },
      "/tile-calculator": {
        title: "Tile Calculator | Estimate Tile Requirements",
        description:
          "Estimate how many tiles your project may need using the Aevitas Ceramics tile calculator. Enter your area and tile dimensions to calculate quantities."
      }
    };

    const path = location.pathname.replace(/\/+$/, "") || "/";
    const page = seoPages[path];

    // Product pages already set their own dynamic SEO metadata.
    if (!page) return;

    document.title = page.title;

    let description = document.querySelector(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content = page.description;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `https://aev-new.vercel.app${path}`;
  }, [location.pathname]);


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

        <WhatsAppButton />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/collections" element={<PageWrapper><Collections /></PageWrapper>} />
            <Route path="/catalogue" element={<PageWrapper><Catalogue /></PageWrapper>} />
            <Route path="/export" element={<PageWrapper><Export /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/porcelain-floor-tiles/:slug" element={<ProductDetailPage />} />
            <Route path="/large-format-porcelain-tiles/:slug" element={<ProductDetailPage />} />
            <Route path="/porcelain-slab-tiles/:slug" element={<ProductDetailPage />} />
            <Route path="/tile-calculator" element={<PageWrapper><TileCalculatorPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export default App;
