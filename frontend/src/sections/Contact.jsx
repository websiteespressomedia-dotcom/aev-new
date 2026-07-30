import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic button effect on hover
      const btn = document.querySelector('.magnetic-btn');
      
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      };

      if (btn) {
        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
      }

      // Parallax Reveal Effect (Replaces CSS fixed position)
      gsap.fromTo(footerRef.current.querySelector('.contact-container'),
        { yPercent: -40, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          }
        }
      );

      return () => {
        if (btn) {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="contact-section" ref={footerRef}>
      <div className="contact-container section-padding">
          <div className="contact-main">
            <h2>Ready to elevate your space?</h2>
            <button className="magnetic-btn" data-cursor-text="WHATSAPP">
              Request a Quote
            </button>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3>Luxury Surfaces</h3>
              <p>Mumbai, India</p>
              <p>info@luxurysurfaces.com</p>
            </div>
            <div className="footer-column">
              <h3>Collections</h3>
              <a href="#">Marble</a>
              <a href="#">Stone</a>
              <a href="#">Wood</a>
              <a href="#">Concrete</a>
            </div>
            <div className="footer-column">
              <h3>Social</h3>
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Luxury Surfaces. All Rights Reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Contact;
