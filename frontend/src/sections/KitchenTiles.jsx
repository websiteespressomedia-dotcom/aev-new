import { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { ScrollContext } from '../context/ScrollContext';
import './KitchenTiles.css';

const KitchenTiles = () => {
  const scrollTween = useContext(ScrollContext);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!scrollTween) return;

    const ctx = gsap.context(() => {
      // Simple split text simulation for words
      const words = textRef.current.innerText.split(' ');
      textRef.current.innerHTML = '';
      words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word-wrap';
        span.innerHTML = `<span class="word">${word}</span>&nbsp;`;
        textRef.current.appendChild(span);
      });

      gsap.fromTo('.word', 
        { yPercent: 100 },
        { 
          yPercent: 0, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
          horizontal: true,
          containerAnimation: scrollTween,
            trigger: sectionRef.current,
            start: 'left 60%',
          }
        }
      );
      
      gsap.fromTo('.kitchen-image img',
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
          horizontal: true,
          containerAnimation: scrollTween,
            trigger: sectionRef.current,
            start: 'left 70%',
          }
        }
      )
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween]);

  return (
    <section className="kitchen-tiles-section section-padding" ref={sectionRef}>
      <div className="kitchen-grid">
        <div className="kitchen-text">
          <h2 ref={textRef}>Culinary Masterpieces.</h2>
          <p className="fade-in-text">Experience European modernism with our high-end backsplashes and continuous porcelain slabs, designed for ultimate durability and aesthetics.</p>
        </div>
        <div className="kitchen-image">
          <img src="/images/kitchen_tiles.jpg" alt="Modern European Kitchen" />
        </div>
      </div>
    </section>
  );
};

export default KitchenTiles;
