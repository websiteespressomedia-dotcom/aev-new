import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalBackground.css';

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect: The fluid background slowly shifts downwards as you scroll
      gsap.to(bgRef.current, {
        y: '20vh',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="global-bg-wrapper">
      <div className="fluid-aurora-bg" ref={bgRef}>
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>
      {/* Very subtle architectural grid overlay */}
      <div className="bg-grid-overlay"></div>
    </div>
  );
};

export default GlobalBackground;
