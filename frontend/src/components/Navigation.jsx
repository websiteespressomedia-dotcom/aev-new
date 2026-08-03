import { useEffect, useState } from 'react';
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
            <span className="brand-name">PACIFIC</span>
            <span className="brand-sub">ITALIAN SURFACES</span>
          </div>
        </div>

        {/* Center: Links */}
        <div className="nav-links">
          <a href="#" className="nav-link">PRODUCTS</a>
          <a href="#" className="nav-link">SPACES</a>
          <a href="#" className="nav-link">PROFESSIONALS</a>
          <a href="#" className="nav-link">RESOURCES</a>
          <a href="#" className="nav-link">INSPIRATIONS</a>
          <a href="#" className="nav-link">OUR STORY</a>
          <a href="#" className="nav-link">CORPORATE</a>
        </div>

        {/* Right: Actions */}
        <div className="nav-actions">
          <button className="icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button className="pill-btn login-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            LOGIN
          </button>
          <button className="pill-btn visualizer-btn">
            VISUALIZER →
          </button>
          <button className="pill-btn quote-btn">
            GET A QUOTE →
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
