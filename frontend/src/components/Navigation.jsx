import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';
import './Navigation.css';

const Navigation = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* Left: Logo */}
        <div className="nav-logo" data-cursor-hover>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 22h20L12 2z" fill="white" stroke="none" />
          </svg>
          <div className="logo-text">
            <span className="brand-name">AEVITAS</span>
            <span className="brand-sub">CERAMICS</span>
          </div>
        </div>

        {/* Center: Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/collections" className="nav-link">COLLECTIONS</Link>
          <Link to="/catalogue" className="nav-link">CATALOGUE</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
        </div>

        {/* Right: Actions (Removed as requested) */}
        <div className="nav-actions">
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
