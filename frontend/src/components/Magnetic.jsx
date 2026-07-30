import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    
    // Check if the wrapped element exists and is a DOM node
    if (!el) return;
    
    const child = el.children[0];
    if (!child) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = child.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Move the button towards the mouse by a fraction
      gsap.to(child, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 1,
        ease: "power3.out"
      });
    };

    const onMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    child.addEventListener('mousemove', onMouseMove);
    child.addEventListener('mouseleave', onMouseLeave);

    return () => {
      child.removeEventListener('mousemove', onMouseMove);
      child.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Wrap the children in a div so we can attach a ref to it easily
  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

export default Magnetic;
