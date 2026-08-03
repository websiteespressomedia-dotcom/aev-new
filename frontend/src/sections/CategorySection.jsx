import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './CategorySection.css';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    title: 'Porcelain Tiles',
    image: '/images/hero/img2.png',
    link: '/collections',
  },
  {
    id: 2,
    title: 'Large Format Slabs',
    image: '/images/hero/hero.avif',
    link: '/collections',
  }
];

const CategorySection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Animate Cards stagger
      gsap.fromTo(cardsRef.current,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="category-section" ref={sectionRef}>
      <div className="category-header" ref={headerRef}>
        <h2 className="category-title">Find By Category</h2>
        <div className="category-line"></div>
      </div>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <Link 
            to={cat.link} 
            className="category-card" 
            key={cat.id}
            ref={el => cardsRef.current[index] = el}
          >
            <div className="category-image-wrap">
              <img src={cat.image} alt={cat.title} className="category-image" />
              <div className="category-overlay"></div>
            </div>
            
            <div className="category-content">
              <h3 className="category-card-title">{cat.title}</h3>
              <span className="category-explore">
                Explore 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
