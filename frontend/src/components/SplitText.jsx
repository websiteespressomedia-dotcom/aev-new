import React from 'react';
import './SplitText.css';

/**
 * SplitText safely breaks a string into individual words wrapped in spans
 * for GSAP stagger animations without manipulating innerHTML directly.
 */
const SplitText = ({ text, className = '', direction = 'up' }) => {
  if (!text) return null;
  
  const words = text.split(' ');

  return (
    <span className={`split-text-container ${className}`}>
      {words.map((word, index) => (
        <span className="word-wrap" key={index}>
          <span className={`animated-word animated-word-${direction}`}>{word}&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

export default SplitText;
