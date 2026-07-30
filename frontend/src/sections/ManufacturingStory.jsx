import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ManufacturingStory.css';

const features = [
  {
    title: 'Stain Resistant',
    desc: 'Impervious to spills and stains, ensuring lasting beauty.',
    icon: '✨'
  },
  {
    title: 'Zero Maintenance',
    desc: 'Effortless cleaning with no sealing required.',
    icon: '🛡️'
  },
  {
    title: 'High Durability',
    desc: 'Engineered to withstand heavy impact and daily wear.',
    icon: '💎'
  },
  {
    title: 'Italian Design',
    desc: 'State-of-the-art aesthetics crafted to perfection.',
    icon: '📐'
  }
];

const ManufacturingStory = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-card');
      
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="features-section section-padding" id="features" ref={containerRef}>
      <div className="features-header">
        <h2>Why Choose Us</h2>
        <p>Uncompromising quality meets extraordinary design.</p>
      </div>

      <div className="features-grid">
        {features.map((feat, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManufacturingStory;
