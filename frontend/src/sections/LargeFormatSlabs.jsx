import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LargeFormatSlabs.css';

gsap.registerPlugin(ScrollTrigger);

const LargeFormatSlabs = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the entire bento grid
      gsap.from(gridRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bento-section" ref={sectionRef}>
      
      <div className="bento-header">
        <h2>Discover Perfect Tile Sizes</h2>
        <p>A format for every architectural vision.</p>
      </div>

      <div className="bento-container">
        <div className="bento-grid" ref={gridRef}>
          
          {/* JUMBO: 1200x2400 (Massive left block) */}
          <div className="bento-item bento-jumbo">
            <div className="bento-bg" style={{ backgroundImage: "url('/images/kitchen_tiles.jpg')" }}></div>
            <div className="bento-overlay"></div>
            
            <div className="bento-pill">1200 x 2400 mm</div>
            
            <div className="bento-content">
              <span className="bento-subtitle">Jumbo Slab</span>
              <h3 className="bento-title">Uninterrupted Luxury</h3>
              <div className="bento-specs">
                <span>THK: 12 mm</span> <span className="bento-dot">•</span> <span>Countertops, Facades</span>
              </div>
            </div>
          </div>

          {/* LARGE: 1200x1800 (Top middle block) */}
          <div className="bento-item bento-large">
            <div className="bento-bg" style={{ backgroundImage: "url('/images/bathroom_tiles.jpg')" }}></div>
            <div className="bento-overlay"></div>
            
            <div className="bento-pill">1200 x 1800 mm</div>
            
            <div className="bento-content">
              <h3 className="bento-title-small">Perfectly Balanced</h3>
              <div className="bento-specs">
                <span>9 mm</span> <span className="bento-dot">•</span> <span>Bathrooms</span>
              </div>
            </div>
          </div>

          {/* STANDARD: 600x1200 (Bottom middle block) */}
          <div className="bento-item bento-standard">
            <div className="bento-bg" style={{ backgroundImage: "url('/images/hero_interior.jpg')" }}></div>
            <div className="bento-overlay"></div>
            
            <div className="bento-pill">600 x 1200 mm</div>
            
            <div className="bento-content">
              <h3 className="bento-title-small">The Classic</h3>
              <div className="bento-specs">
                <span>9 mm</span> <span className="bento-dot">•</span> <span>Floors, Walls</span>
              </div>
            </div>
          </div>

          {/* TALL: 800x2400 (Tall right block) */}
          <div className="bento-item bento-tall">
            <div className="bento-bg" style={{ backgroundImage: "url('/images/hero_exterior.jpg')" }}></div>
            <div className="bento-overlay"></div>
            
            <div className="bento-pill">800 x 2400 mm</div>
            
            <div className="bento-content">
              <span className="bento-subtitle">Tall Profile</span>
              <h3 className="bento-title-small">Vertical Elegance</h3>
              <div className="bento-specs">
                <span>15 mm</span> <span className="bento-dot">•</span> <span>Cladding</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default LargeFormatSlabs;
