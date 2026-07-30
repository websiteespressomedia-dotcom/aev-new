import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ReverseScroll.css';

const leftImages = [
  '/images/hero_interior.jpg',
  '/images/kitchen_tiles.jpg',
  '/images/bathroom_tiles.jpg',
];

const rightImages = [
  '/images/hero_exterior.jpg',
  '/images/panorama_outdoor.jpg',
  '/images/hero_exterior.jpg', // Reusing exterior
];

const ReverseScroll = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // 200% scroll distance
          pin: true,
          scrub: 1,
        }
      });

      // Left column scrolls UP
      tl.to(leftColRef.current, {
        yPercent: -66.66, // Move 2 out of 3 images up
        ease: 'none',
      }, 0);

      // Right column scrolls DOWN (starts from top)
      tl.fromTo(rightColRef.current, {
        yPercent: -66.66,
      }, {
        yPercent: 0,
        ease: 'none',
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="reverse-scroll-section" ref={sectionRef}>
      <div className="rs-overlay-title" data-cursor-text="DRAG">
        <h2>Seamless</h2>
        <p className="rs-subtitle">Perfect finishes for both inside and outside your home.</p>
        <button className="rs-btn">Explore Finishes</button>
      </div>
      
      <div className="rs-columns">
        <div className="rs-col left-col" ref={leftColRef}>
          {leftImages.map((img, i) => (
            <div className="rs-item" key={`left-${i}`}>
              <img src={img} alt="Collection left" />
            </div>
          ))}
        </div>
        
        <div className="rs-col right-col" ref={rightColRef}>
          {rightImages.map((img, i) => (
            <div className="rs-item" key={`right-${i}`}>
              <img src={img} alt="Collection right" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReverseScroll;
