import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text simulation for main title
      const title = textRef.current;
      const chars = title.innerText.split('');
      title.innerHTML = '';
      chars.forEach(char => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.innerHTML = char === ' ' ? ' ' : char;
        if (char === ' ') span.style.width = '2vw'; // ensure space has width
        title.appendChild(span);
      });

      const tl = gsap.timeline();

      // Entrance Animation
      tl.fromTo('.hero-char',
        { yPercent: 100, opacity: 0, rotateX: 90 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: 'power4.out' },
        0
      )
      .fromTo(subtextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.8
      )
      .to(overlayRef.current,
        { opacity: 0, duration: 2, ease: 'power2.inOut' },
        0
      );

      // Scroll Animation
      gsap.to(imageRef.current, {
        yPercent: 30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(title, {
        yPercent: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-image-wrapper">
        <video 
          ref={imageRef}
          src="/video/reel1.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="hero-overlay" ref={overlayRef}></div>
      </div>
      
      <div className="hero-content-wrapper">
        <h1 ref={textRef} className="hero-main-title">LUXURY SURFACES</h1>
        <p ref={subtextRef} className="hero-subtext">Premium Tiles & Slabs for Luxury Living</p>
      </div>

      <div className="scroll-prompt">
        <div className="scroll-line"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;
