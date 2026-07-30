import { useEffect, useState } from 'react';
import Magnetic from './Magnetic';
import './Navigation.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="nav-content">
        <Magnetic>
          <div className="logo" data-cursor-hover>
            SURFACES<span>.</span>
          </div>
        </Magnetic>
        <div className="nav-links">
          <a href="#collections" className="nav-link">Products</a>
          <a href="#story" className="nav-link">Our Craft</a>
          <a href="#gallery" className="nav-link">Spaces</a>
        </div>
        <Magnetic>
          <button className="menu-btn" data-cursor-hover data-cursor-text="MENU">
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </button>
        </Magnetic>
      </div>
    </nav>
  );
};

export default Navigation;
