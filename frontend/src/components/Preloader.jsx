import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Simulate loading progress
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 15) + 5; // Add 5 to 20
      if (count > 100) count = 100;
      setProgress(count);
      
      if (count === 100) {
        clearInterval(interval);
      }
    }, 150);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }
        });

        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
        }, "+=0.5")
        .to(progressRef.current, {
          scaleX: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut"
        }, "<")
        .to(percentRef.current, {
          opacity: 0,
          duration: 0.5
        }, "<")
        .to(containerRef.current, {
          yPercent: -100, // Sweep up
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.2");
      });

      return () => ctx.revert();
    }
  }, [progress, onComplete]);

  return (
    <div className="preloader-container" ref={containerRef}>
      <div className="preloader-content">
        <h1 className="preloader-logo" ref={textRef}>Aevitas Ceramic<span style={{color: 'var(--color-accent)'}}>.</span></h1>
        
        <div className="preloader-progress-wrapper">
          <div 
            className="preloader-progress-bar" 
            ref={progressRef}
            style={{ transform: `scaleX(${progress / 100})` }}
          ></div>
        </div>
        
        <div className="preloader-percentage" ref={percentRef}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
