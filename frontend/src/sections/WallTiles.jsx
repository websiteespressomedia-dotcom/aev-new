import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './WallTiles.css';

const WallTiles = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Shutter/Mask reveal effect
      gsap.fromTo(maskRef.current, 
        { clipPath: 'inset(50% 50% 50% 50%)' },
        { 
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top top',
            scrub: 1,
          }
        }
      );

      // Subtle scale up inside the mask
      gsap.fromTo(imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center top',
            scrub: 1,
          }
        }
      );
      
      gsap.fromTo('.wall-text', 
        { y: 150, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="wall-tiles-section" ref={sectionRef}>
      <div className="wall-content">
        <div className="wall-image-container" ref={maskRef}>
          <img 
            ref={imageRef} 
            src="/images/marble_slab.jpg" 
            alt="Luxury Wall Tiles" 
          />
        </div>
        <div className="wall-text-overlay">
          <div className="wall-text">
            <h2>Vertical Art</h2>
            <p>Transforming walls into masterpieces with large-format marble textures and striking bookmatched designs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallTiles;
