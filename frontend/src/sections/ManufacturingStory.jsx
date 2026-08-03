import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './ManufacturingStory.css';

gsap.registerPlugin(ScrollTrigger);

const ManufacturingStory = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.fromTo(imageRef.current, 
        { y: -50, scale: 1.1 },
        {
          y: 50,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Fade up text elements
      const textElements = textRef.current.children;
      gsap.fromTo(textElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="manufacturing-section" id="story" ref={containerRef}>
      <div className="manufacturing-container">
        
        <div className="manufacturing-image-wrapper">
          <img 
            ref={imageRef}
            src="/luxury_tile_craftsmanship.jpg" 
            alt="Luxury Italian Marble Tile Detail" 
            className="manufacturing-image" 
          />
          <div className="image-overlay"></div>
        </div>

        <div className="manufacturing-content" ref={textRef}>
          <span className="manufacturing-subtitle">ITALIAN CRAFTSMANSHIP</span>
          <h2 className="manufacturing-title">
            Where <em>Nature</em> <br />
            Meets <em>Perfection</em>
          </h2>
          <p className="manufacturing-desc">
            We source the finest materials globally to engineer surfaces that defy expectations. 
            Every slab is a masterpiece of modern technology, offering zero maintenance, 
            unmatched durability, and the timeless elegance of natural stone.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Stain & Scratch Resistant</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Zero Maintenance</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Large Format Precision</span>
            </div>
          </div>

          <Link to="/about" className="discover-btn" data-cursor-hover>
            DISCOVER OUR STORY
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ManufacturingStory;
