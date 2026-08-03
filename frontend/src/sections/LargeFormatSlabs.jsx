import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LargeFormatSlabs.css';

gsap.registerPlugin(ScrollTrigger);

const availableSizes = [
  { id: 1, text: "600 x 600 MM", w: 600, h: 600, img: "/images/hero/hero.avif" },
  { id: 2, text: "600 x 1200 MM", w: 600, h: 1200, img: "/images/hero/img1.png" },
  { id: 3, text: "1200 x 1200 MM", w: 1200, h: 1200, img: "/images/hero/art1.jpg" },
  { id: 4, text: "800 x 800 MM", w: 800, h: 800, img: "/images/hero/core1.avif" },
  { id: 5, text: "800 x 1600 MM", w: 800, h: 1600, img: "/images/hero/core2.avif" },
  { id: 6, text: "1200 x 1800 MM", w: 1200, h: 1800, img: "/images/hero/core3.avif" },
  { id: 7, text: "800 x 2400 MM", w: 800, h: 2400, img: "/images/hero/core4.avif" },
  { id: 8, text: "800 x 3000 MM", w: 800, h: 3000, img: "/images/hero/hero.avif" },
  { id: 9, text: "800 x 3200 MM", w: 800, h: 3200, img: "/images/hero/img1.png" },
  { id: 10, text: "1200 x 2400 MM", w: 1200, h: 2400, img: "/images/hero/art1.jpg" },
  { id: 11, text: "1200 x 2800 MM", w: 1200, h: 2800, img: "/images/hero/core1.avif" },
  { id: 12, text: "1200 x 3000 MM", w: 1200, h: 3000, img: "/images/hero/core2.avif" },
  { id: 13, text: "1200 x 3200 MM", w: 1200, h: 3200, img: "/images/hero/core3.avif" },
  { id: 14, text: "1600 x 3200 MM", w: 1600, h: 3200, img: "/images/hero/core4.avif" }
];

const LargeFormatSlabs = () => {
  const [activeSize, setActiveSize] = useState(availableSizes[0]);
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseEnter = (size) => {
    if (activeSize.id === size.id) return;
    setActiveSize(size);

    // Animate the image change
    gsap.fromTo(imgRef.current, 
      { scale: 1.2, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the entire section
      gsap.fromTo('.sizes-left-header',
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo('.sizes-list-item',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%'
          }
        }
      );
      
      gsap.fromTo(visualRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate dynamic aspect ratio based on physical dimensions
  const aspectRatio = activeSize.w / activeSize.h;
  
  // Base height is fixed (e.g. 600px), width scales down based on aspect ratio
  // If it's 1:1, width=600. If it's 0.25, width=150.
  const visualWidth = `calc(600px * ${aspectRatio})`;

  return (
    <section className="sizes-directory-section" ref={sectionRef} id="sizes">
      <div className="sizes-container">
        
        {/* Left Side: Directory List */}
        <div className="sizes-left">
          <div className="sizes-left-header">
            <h2 className="sizes-title">Available Sizes</h2>
            <p className="sizes-desc">A diverse range of dimensions to perfectly fit any architectural vision, from standard tiles to massive uninterrupted slabs.</p>
          </div>
          
          <ul className="sizes-list">
            {availableSizes.map((size) => (
              <li 
                key={size.id} 
                className={`sizes-list-item ${activeSize.id === size.id ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter(size)}
              >
                <span className="sizes-item-text">{size.text}</span>
                <div className="sizes-item-line"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Dynamic Visualizer */}
        <div className="sizes-right">
          <div className="sizes-visual-container" ref={visualRef}>
            {/* The dynamic frame that changes shape based on dimensions */}
            <div 
              className="sizes-dynamic-frame" 
              style={{ width: visualWidth, aspectRatio: `${activeSize.w} / ${activeSize.h}` }}
            >
              <img 
                ref={imgRef}
                src={activeSize.img} 
                alt={activeSize.text} 
                className="sizes-visual-img" 
              />
              <div className="sizes-visual-overlay"></div>
              
              {/* Corner Accents */}
              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>
            </div>
            
            <div className="sizes-dimension-info">
              <span className="dimension-label">WIDTH</span>
              <span className="dimension-value">{activeSize.w}mm</span>
              <span className="dimension-divider">×</span>
              <span className="dimension-label">HEIGHT</span>
              <span className="dimension-value">{activeSize.h}mm</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default LargeFormatSlabs;
