import { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import './BathroomTiles.css';

const BathroomTiles = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
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
    <section className="bathroom-tiles-section" ref={sectionRef}>
      <div className="bathroom-content">
        <div className="parallax-container">
          <img 
            ref={imageRef}
            src="/images/bathroom_tiles.jpg" 
            alt="Spa Inspired Bathroom" 
            className="parallax-image"
          />
        </div>
        <div className="bathroom-text-box glass">
          <span>Sanctuary</span>
          <h2>Spa-Inspired Retreats</h2>
          <p>Immerse yourself in tranquility with our water-resistant, seamless luxury bathroom collections.</p>
        </div>
      </div>
    </section>
  );
};

export default BathroomTiles;
