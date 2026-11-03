import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalBackground.css';

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
  const bgRef = useRef(null);
  const { pathname } = useLocation();

  // Match the exposed Home-page canvas to the footer's solid base colour.
  // Restore the site's original backgrounds as soon as another route opens.
  useEffect(() => {
    if (pathname !== '/') return undefined;

    const elements = [
      document.documentElement,
      document.body,
      document.getElementById('root'),
    ].filter(Boolean);

    const previous = elements.map((element) => ({
      element,
      value: element.style.getPropertyValue('background'),
      priority: element.style.getPropertyPriority('background'),
    }));

    elements.forEach((element) => {
      element.style.setProperty('background', 'radial-gradient(ellipse at 82% 10%, rgba(255, 255, 255, 0.45), transparent 38%), linear-gradient(145deg, #D6D3D1 0%, #EAE8E6 54%, #D6D3D1 100%)', 'important');
    });

    return () => {
      previous.forEach(({ element, value, priority }) => {
        if (value) element.style.setProperty('background', value, priority);
        else element.style.removeProperty('background');
      });
    };
  }, [pathname]);

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
