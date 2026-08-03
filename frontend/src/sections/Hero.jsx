import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    image: '/images/hero/hero.avif',
    title: 'TIMELESS',
    subtitle: 'Classic Elegance & Heritage'
  },
  {
    id: 2,
    image: '/images/hero/img1.png',
    title: 'MINIMAL',
    subtitle: 'Modern Architectural Form'
  },
  {
    id: 3,
    image: '/images/hero/art1.jpg',
    title: 'ABSTRACT',
    subtitle: 'Unconventional Surface Design'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const textRef = useRef(null);
  const isAnimating = useRef(false);

  const goToSlide = (nextIndex) => {
    if (isAnimating.current || nextIndex === currentSlide) return;
    isAnimating.current = true;

    const currentEl = slidesRef.current[currentSlide];
    const nextEl = slidesRef.current[nextIndex];

    const currentLeft = currentEl.querySelector('.split-left');
    const currentRight = currentEl.querySelector('.split-right');
    const nextLeft = nextEl.querySelector('.split-left');
    const nextRight = nextEl.querySelector('.split-right');

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(nextIndex);
        isAnimating.current = false;
        // reset positions for the previous slide to be ready for next time
        gsap.set(currentEl, { zIndex: 1 });
        gsap.set(currentLeft, { yPercent: 0 });
        gsap.set(currentRight, { yPercent: 0 });
      }
    });

    // Prepare next slide
    gsap.set(nextEl, { zIndex: 2 });
    gsap.set(nextLeft, { yPercent: 100 }); // start from bottom
    gsap.set(nextRight, { yPercent: -100 }); // start from top

    // Animate text out
    tl.to('.hero-title-char', {
      yPercent: -100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power3.in'
    }, 0);

    tl.to('.hero-subtitle', {
      opacity: 0,
      y: -20,
      duration: 0.4
    }, 0);

    // Split sliding animation
    tl.to(currentLeft, { yPercent: -100, duration: 1.5, ease: 'power4.inOut' }, 0);
    tl.to(currentRight, { yPercent: 100, duration: 1.5, ease: 'power4.inOut' }, 0);
    
    tl.to(nextLeft, { yPercent: 0, duration: 1.5, ease: 'power4.inOut' }, 0);
    tl.to(nextRight, { yPercent: 0, duration: 1.5, ease: 'power4.inOut' }, 0);

    // Also add a slight scale (parallax) to the images inside during the slide
    tl.fromTo(nextLeft.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.5, ease: 'power4.inOut' }, 0);
    tl.fromTo(nextRight.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.5, ease: 'power4.inOut' }, 0);

    // Update text state halfway through animation so it changes before fading back in
    tl.call(() => setCurrentSlide(nextIndex), [], 0.7);

    // Animate text in
    tl.fromTo('.hero-title-char', 
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.03, duration: 0.8, ease: 'power3.out' },
      0.8
    );
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.8
    );
  };

  useEffect(() => {
    // Initial Setup
    slidesRef.current.forEach((el, index) => {
      if (index === 0) {
        gsap.set(el, { zIndex: 2 });
        gsap.set(el.querySelector('.split-left'), { yPercent: 0 });
        gsap.set(el.querySelector('.split-right'), { yPercent: 0 });
      } else {
        gsap.set(el, { zIndex: 1 });
        gsap.set(el.querySelector('.split-left'), { yPercent: 100 });
        gsap.set(el.querySelector('.split-right'), { yPercent: -100 });
      }
    });

    // Initial Text Entrance
    gsap.fromTo('.hero-title-char',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.04, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );
    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.8 }
    );

  }, []);

  // Text Splitting helper
  const renderSplitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="hero-title-char inline-block" style={{ width: char === ' ' ? '2vw' : 'auto' }}>
        {char}
      </span>
    ));
  };

  return (
    <section className="hero-section" ref={containerRef} id="home">
      
      {/* Background Split Slider */}
      <div className="hero-slider-container">
        {slides.map((slide, index) => (
          <div 
            className="split-slide" 
            key={slide.id}
            ref={el => slidesRef.current[index] = el}
          >
            <div className="split-left">
              <div className="img-wrapper">
                <img src={slide.image} alt={slide.title} />
              </div>
              <div className="split-overlay left-overlay"></div>
            </div>
            <div className="split-right">
              <div className="img-wrapper right-img-wrapper">
                <img src={slide.image} alt={slide.title} />
              </div>
              <div className="split-overlay right-overlay"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Center Typography */}
      <div className="hero-center-content pointer-events-none" ref={textRef}>
        <p className="hero-subtitle overflow-hidden">
          {slides[currentSlide].subtitle}
        </p>
        <h1 className="hero-title overflow-hidden flex">
          {renderSplitText(slides[currentSlide].title)}
        </h1>
      </div>

      {/* Controls */}
      <div className="hero-controls z-30">
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`indicator-wrap ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <span className="indicator-num">0{index + 1}</span>
              <div className="indicator-line"></div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
