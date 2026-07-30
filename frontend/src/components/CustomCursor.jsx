import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power4.out',
      });
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .tile-card, .ring-item, .stack-card, .hg-slide, [data-cursor-hover]');
      if (target) {
        const hoverText = target.getAttribute('data-cursor-text') || 'VIEW';
        text.innerText = hoverText;
        
        gsap.to(follower, {
          scale: 3,
          backgroundColor: 'var(--color-white)',
          mixBlendMode: 'normal',
          duration: 0.3,
        });

        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, .tile-card, .ring-item, .stack-card, .hg-slide, [data-cursor-hover]');
      if (target) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          mixBlendMode: 'difference',
          duration: 0.3,
        });

        gsap.to(text, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}>
        <span className="cursor-text" ref={textRef}>VIEW</span>
      </div>
    </>
  );
};

export default CustomCursor;
