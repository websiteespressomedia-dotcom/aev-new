import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "The level of detail in these porcelain slabs is unprecedented. A monumental aesthetic without the constraints of natural stone.",
    author: "Elena Rossi",
    role: "Lead Architect, Studio Milano"
  },
  {
    text: "AEVITAS has redefined luxury surfaces. We specify their large formats for all our high-end residential projects globally.",
    author: "James Chen",
    role: "Principal, ArchiForm"
  },
  {
    text: "The bookmatch continuous veins are indistinguishable from natural marble. Simply breathtaking engineering.",
    author: "Sarah Jenkins",
    role: "Interior Designer"
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite Marquee animation
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1,
      });

      // Cards fade in on scroll
      gsap.fromTo('.t-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-section" ref={containerRef}>
      <div className="marquee-container">
        <div className="marquee-inner">
          {/* Duplicate text for seamless looping */}
          <span>WHAT THEY SAY • ARCHITECTS & DESIGNERS • WHAT THEY SAY • ARCHITECTS & DESIGNERS • </span>
          <span>WHAT THEY SAY • ARCHITECTS & DESIGNERS • WHAT THEY SAY • ARCHITECTS & DESIGNERS • </span>
        </div>
      </div>

      <div className="t-grid-container">
        {testimonials.map((t, i) => (
          <div className="t-card" key={i}>
            <div className="t-quote-icon">"</div>
            <p className="t-text">{t.text}</p>
            <div className="t-author">
              <strong>{t.author}</strong>
              <span>{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
