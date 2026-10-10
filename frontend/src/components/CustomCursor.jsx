import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

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

    // Simple, consistent hover treatment for every link/button.
    // No VIEW text, no large white circle.
    const onMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], [data-cursor-hover]'
      );

      if (!target) return;

      gsap.to(follower, {
        scale: 1.28,
        borderColor: 'var(--color-accent)',
        backgroundColor: 'transparent',
        mixBlendMode: 'difference',
        duration: 0.28,
        ease: 'power2.out',
      });

      gsap.to(cursor, {
        scale: 0.72,
        duration: 0.22,
        ease: 'power2.out',
      });
    };

    const onMouseOut = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], [data-cursor-hover]'
      );

      if (!target) return;

      // Ignore mouseout when moving between children of the same
      // interactive element.
      if (target.contains(e.relatedTarget)) return;

      gsap.to(follower, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'transparent',
        mixBlendMode: 'difference',
        duration: 0.28,
        ease: 'power2.out',
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.22,
        ease: 'power2.out',
      });
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
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
};

export default CustomCursor;
