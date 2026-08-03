import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './FullscreenMenu.css';

const FullscreenMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      gsap.fromTo(linksRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'CATALOGUE', path: '/catalogue' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <div className="fullscreen-menu" ref={menuRef}>
      <button className="menu-close-btn" onClick={onClose} data-cursor-hover>
        Close
      </button>

      <div className="menu-content">
        <div className="menu-left">
          <p className="menu-subtitle">CURATING</p>
          <p className="menu-subtitle-bold">MODERN<br/>PERSPECTIVES</p>
          <p className="menu-subtitle">IN ARCHITECTURAL<br/>DESIGN.</p>
        </div>

        <div className="menu-right">
          <p className="menu-label">MENU</p>
          <nav className="menu-nav">
            {links.map((link, index) => (
              <div className="menu-link-wrapper" key={link.name}>
                <Link 
                  to={link.path} 
                  className="menu-link"
                  ref={el => linksRef.current[index] = el}
                  data-cursor-hover
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FullscreenMenu;
