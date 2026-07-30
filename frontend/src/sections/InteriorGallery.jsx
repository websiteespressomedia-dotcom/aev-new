import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './InteriorGallery.css';

const galleryItems = [
  { id: 1, title: 'Bespoke Living', img: '/images/hero_interior.jpg' },
  { id: 2, title: 'Modern Kitchens', img: '/images/kitchen_tiles.jpg' },
  { id: 3, title: 'Luxury Bathrooms', img: '/images/bathroom_tiles.jpg' },
  { id: 4, title: 'Architectural Slabs', img: '/images/marble_slab.jpg' },
  { id: 5, title: 'Outdoor Paving', img: '/images/hero_exterior.jpg' },
];

const InteriorGallery = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      
      // Calculate how far to scroll to show all items
      const scrollWidth = container.scrollWidth - window.innerWidth;
      
      gsap.to(container, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
        }
      });
      
      // Image parallax effect inside horizontal scroll
      gsap.utils.toArray('.gallery-img').forEach(img => {
        gsap.to(img, {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${scrollWidth}`,
            scrub: 1,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="horizontal-gallery-section" id="gallery" ref={sectionRef}>
      <div className="hg-container" ref={containerRef}>
        <div className="hg-title-slide">
          <h2 className="hg-huge-text">DISCOVER</h2>
          <p className="hg-sub-text">Scroll horizontally to explore our curated interiors.</p>
        </div>
        
        {galleryItems.map(item => (
          <div className="hg-slide" key={item.id} data-cursor-text="EXPLORE">
            <div className="hg-img-wrapper">
              <img src={item.img} alt={item.title} className="gallery-img" />
            </div>
            <div className="hg-slide-info">
              <span>0{item.id}</span>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InteriorGallery;
