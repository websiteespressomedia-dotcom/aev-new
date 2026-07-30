import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Statistics.css';

gsap.registerPlugin(ScrollTrigger);

const Statistics = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = document.querySelectorAll('.stat-number');
      
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.fromTo(stat, 
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
            onUpdate: function() {
              stat.innerHTML = Math.ceil(this.targets()[0].innerHTML);
            }
          }
        );
      });
      
      gsap.fromTo('.stat-item', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section section-padding" ref={containerRef}>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number-wrapper">
            <span className="stat-number" data-target="250">0</span>
            <span className="stat-plus">+</span>
          </div>
          <div className="stat-label">Exclusive Collections</div>
        </div>
        <div className="stat-item">
          <div className="stat-number-wrapper">
            <span className="stat-number" data-target="30">0</span>
            <span className="stat-plus">+</span>
          </div>
          <div className="stat-label">Years of Heritage</div>
        </div>
        <div className="stat-item">
          <div className="stat-number-wrapper">
            <span className="stat-number" data-target="50">0</span>
            <span className="stat-plus">+</span>
          </div>
          <div className="stat-label">Countries Served</div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
