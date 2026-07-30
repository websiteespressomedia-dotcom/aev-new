import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './OutdoorTiles.css';

const OutdoorTiles = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Multi-depth parallax
      gsap.to('.floating-image-1', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to('.floating-image-2', {
        yPercent: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      gsap.to('.outdoor-text h2', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="outdoor-tiles-section section-padding" ref={sectionRef}>
      <div className="outdoor-container">
        <div className="outdoor-text">
          <h2>Seamless Transitions</h2>
          <p>Extend your luxury living space to the outdoors with our anti-slip porcelain paving designed for pools and pathways.</p>
        </div>
        <div className="outdoor-images">
          <img 
            className="floating-image-1" 
            src="/images/hero_exterior.jpg" 
            alt="Luxury Pool Deck" 
          />
          <img 
            className="floating-image-2" 
            src="/images/marble_slab.jpg" 
            alt="Garden Pathway Paving" 
          />
        </div>
      </div>
    </section>
  );
};

export default OutdoorTiles;
