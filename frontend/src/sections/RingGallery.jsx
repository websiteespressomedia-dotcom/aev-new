import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RingGallery.css';

gsap.registerPlugin(ScrollTrigger);

// Reduced to 6 premium items for a better vertical scrolling experience
const galleryItems = [
  { id: 1, img: '/images/hero_exterior.jpg', title: 'Exterior', desc: 'Monumental facades that redefine modern architecture.' },
  { id: 2, img: '/images/hero_interior.jpg', title: 'Interior', desc: 'Seamless spaces crafted with timeless elegance.' },
  { id: 3, img: '/images/bathroom_tiles.jpg', title: 'Bath', desc: 'Sanctuaries of tranquility and pure luxury.' },
  { id: 4, img: '/images/kitchen_tiles.jpg', title: 'Kitchen', desc: 'Where culinary art meets impeccable design.' },
  { id: 5, img: '/images/panorama.jpg', title: 'Living', desc: 'The heart of the home, dressed in perfection.' },
  { id: 6, img: '/images/hero_exterior.jpg', title: 'Outdoor', desc: 'Durability and beauty harmonized with nature.' },
];

const RingGallery = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack-card');
      
      // Animate each card to scale down and fade slightly when the NEXT card scrolls over it
      cards.forEach((card, index) => {
        // We don't scale down the very last card
        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.85,
            opacity: 0.3,
            filter: "blur(10px)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 12%", // When this card hits the sticky position
              endTrigger: cards[index + 1],
              end: "top 12%", // When the NEXT card hits the sticky position
              scrub: true,
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stack-section" ref={sectionRef}>
      <div className="stack-header-wrapper">
        <h2 className="stack-main-title">Collections</h2>
        <p className="stack-sub-title">A Journey Through Masterpieces</p>
      </div>
      
      <div className="stack-container">
        {galleryItems.map((item, index) => (
          <div className="stack-card" key={item.id} style={{ zIndex: index }}>
            <div className="stack-card-inner">
              <img src={item.img} alt={item.title} className="stack-img" />
              <div className="stack-overlay"></div>
              
              <div className="stack-content">
                <span className="stack-number">0{index + 1}</span>
                <h3 className="stack-title">{item.title}</h3>
                <p className="stack-desc">{item.desc}</p>
                <div className="stack-explore-btn">Explore Collection</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RingGallery;
