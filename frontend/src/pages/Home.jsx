import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SplitText from '../components/SplitText';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const videoPinSecRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const modalVideoRef = useRef(null);
  
  const historySectionRef = useRef(null);
  const historySliderRef = useRef(null);
  const teamSliderRef = useRef(null);
  const processPinRef = useRef(null);
  const processSliderRef = useRef(null);
  const sizesSectionRef = useRef(null);
  const sizesSliderRef = useRef(null);
  const wipeContainerRef = useRef(null);
  const categoryHeroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text Stagger Reveal Animation for SplitText
      const titles = gsap.utils.toArray('.split-text-container');
      titles.forEach(title => {
        const words = title.querySelectorAll('.animated-word');
        if (words.length === 0) return;
        
        gsap.to(words, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%"
          },
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.04,
          ease: "power3.out"
        });
      });

      // Special animation for the Hero Title to load instantly
      const heroWords = gsap.utils.toArray('.hero-title .animated-word');
      if (heroWords.length > 0) {
        gsap.to(heroWords, {
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power4.out",
          delay: 0.2
        });
      }
      
      // Animate kicker, CTA, and scroll indicator
      gsap.fromTo(['.hero-kicker', '.hero-cta-btn', '.scroll-indicator'], 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.8
        }
      );

      // Parallax Image Effect
      const parallaxImages = gsap.utils.toArray('.parallax-img');
      parallaxImages.forEach(img => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 2. 9-Part Shatter Animation
      const shatterPieces = gsap.utils.toArray('.shatter-piece');
      if (shatterPieces.length > 0) {
        // Initial scattered state
        shatterPieces.forEach((piece, i) => {
          gsap.set(piece, {
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            rotation: (Math.random() - 0.5) * 90,
            scale: 0.3 + Math.random() * 0.5,
            opacity: 0
          });
        });

        // Assemble on scroll
        gsap.to(shatterPieces, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".shatter-wrap",
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5
          }
        });
      }

      // 2.5 Horizontal Wipe for Category Hero Section (Standard Entry Animation)
      if (categoryHeroRef.current) {
        gsap.fromTo(categoryHeroRef.current, 
          { xPercent: 100 },
          {
            xPercent: 0,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: categoryHeroRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 3. Horizontal Scroll for Collection Process Section
      if (processSliderRef.current && processPinRef.current) {
        gsap.to(processSliderRef.current, {
          x: () => -(processSliderRef.current.scrollWidth - window.innerWidth + 150),
          ease: "none",
          scrollTrigger: {
            trigger: processPinRef.current,
            pin: true,
            start: "center center",
            end: () => "+=" + processSliderRef.current.scrollWidth,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      // 3.5 Sizes Carousel Pinned Horizontal Scroll (Moved for DOM order)
      if (sizesSectionRef.current && sizesSliderRef.current) {
        gsap.to(sizesSliderRef.current, {
          x: () => -(sizesSliderRef.current.scrollWidth - window.innerWidth + (window.innerWidth * 0.1)),
          ease: "none",
          scrollTrigger: {
            trigger: sizesSectionRef.current,
            pin: true,
            start: "center center",
            end: () => "+=" + sizesSliderRef.current.scrollWidth,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      // 4. Staggered Scroll Animation for Stats Cards
      gsap.fromTo(".stat-info-card", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-grid-wrapper",
            start: "top 80%", // Animates when top of grid wrapper hits 80% of screen height
            toggleActions: "play none none reverse"
          }
        }
      );

      // 5. Team Slider Horizontal Scroll (Not Pinned, just drag/scroll feel)
      if (teamSliderRef.current) {
        gsap.to(teamSliderRef.current, {
          x: () => -(teamSliderRef.current.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: teamSliderRef.current,
            start: "center center",
            end: () => "+=" + (teamSliderRef.current.scrollWidth * 0.5),
            scrub: 1
          }
        });
      }

      // 6. Split Categories Reveal Animation
      const splitRows = gsap.utils.toArray('.cat-split-row');
      splitRows.forEach((row) => {
        const textBlock = row.querySelector('.cat-split-text');
        const imgContainer = row.querySelector('.cat-split-image');
        const img = row.querySelector('.cat-split-image img');

        // Initial states for scrub reveal
        gsap.set(textBlock, { y: 150, opacity: 0, filter: "blur(20px)" });
        gsap.set(imgContainer, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(img, { scale: 1.2, yPercent: -15 });

        // Single Scrub Timeline for EVERYTHING (Movement, Blur, Reveal)
        // This ensures text and image animate perfectly together, strictly tied to scroll position
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 95%", // Starts animating when top of row enters bottom of screen
            end: "center center", // Fully revealed when center of row hits center of screen
            scrub: true // Instantly tracks scroll wheel without delay
          }
        });

        scrubTl.to(textBlock, { y: 0, opacity: 1, filter: "blur(0px)", ease: "none" }, 0)
               .to(imgContainer, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
               .to(img, { scale: 1, yPercent: 0, ease: "none" }, 0);
      });

      // 7. Pronounced Global Text Reveal on Scroll
      const textElements = gsap.utils.toArray("p:not(.hero-desc):not(.cat-split-desc):not(.process-desc), h2:not(:has(.split-text-container)):not(.hero-large-text):not(.cat-split-title), h3:not(.process-head), h4, .diagram-text > div, form > div, .submit-btn, .material-item h3");
      
      textElements.forEach(el => {
        if (el.closest('.horizontal-section') || el.closest('.collection-section') || el.closest('.sizes-carousel-section') || el.closest('.stats-grid-wrapper')) return;

        gsap.fromTo(el,
          { 
            y: 100, 
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });


    }); // end context

    // Refresh ScrollTrigger after layout calculation
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      ctx.revert(); // cleanup GSAP!
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  const openModal = () => {
    setIsModalOpen(true);
    if (modalVideoRef.current) {
      modalVideoRef.current.play();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="home-page">
      
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero cinematic-hero">
        
        {/* Background Video */}
        <div className="hero-bg-video">
          <video autoPlay muted loop playsInline>
            <source src="/video/reel1.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-title-wrap" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative' }}>
          
          {/* Explicit Kicker */}
          <div className="hero-kicker" style={{ fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem', color: '#F9F8F6', fontWeight: '600' }}>
             Luxury Italian Porcelain Slabs & Natural Stone
          </div>

          <button className="hero-cta-btn" data-cursor-hover>
            EXPLORE COLLECTION
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>SCROLL</span>
        </div>
      </section>


      {/* Brand Legacy Section */}
      <section className="brand-legacy-section" style={{ padding: '15rem 4% 8rem 4%', background: '#F2F0E9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', minHeight: '80vh' }}>
        
        {/* Left: Shattered Image */}
        <div className="legacy-image-wrap shatter-wrap" style={{ flex: '1', height: '600px', borderRadius: '4px' }}>
          <div className="shatter-container">
            <div className="shatter-piece piece-0-0"></div>
            <div className="shatter-piece piece-0-1"></div>
            <div className="shatter-piece piece-0-2"></div>
            <div className="shatter-piece piece-1-0"></div>
            <div className="shatter-piece piece-1-1"></div>
            <div className="shatter-piece piece-1-2"></div>
            <div className="shatter-piece piece-2-0"></div>
            <div className="shatter-piece piece-2-1"></div>
            <div className="shatter-piece piece-2-2"></div>
          </div>
        </div>

        {/* Right: Typography */}
        <div className="legacy-text-wrap" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="animate-fade-up" style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#C1A673', marginBottom: '2rem' }}>
            Our Heritage
          </div>
          <h2 className="animate-fade-up" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontFamily: "'Times New Roman', serif", fontWeight: '300', color: '#1a1a2e', lineHeight: '1.2', marginBottom: '2rem' }}>
            Elevating spaces with <br/>uncompromising <br/>Italian excellence.
          </h2>
          <p className="animate-fade-up" style={{ fontSize: '1.1rem', color: '#1a1a2e', opacity: '0.8', lineHeight: '1.8', maxWidth: '500px', marginBottom: '3rem' }}>
            For decades, Aevitas Ceramics has pioneered the art of large-format porcelain slabs. By merging traditional craftsmanship with cutting-edge technology, we create surfaces that redefine luxury architecture.
          </p>
          <div className="animate-fade-up">
            <button className="pill-btn" style={{ background: '#1a1a2e', color: '#F9F8F6', padding: '1rem 2.5rem', border: 'none', borderRadius: '50px', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer' }}>
              DISCOVER OUR STORY
            </button>
          </div>
        </div>
      </section>

      {/* Elegant Separator Line */}
      <div style={{ width: '100%', backgroundColor: '#F2F0E9' }}>
        <div style={{ width: '90%', height: '1px', background: 'rgba(26, 26, 46, 0.1)', margin: '0 auto' }}></div>
      </div>

      {/* 2 Elegant Categories Section - Redesigned to Split Layout */}
      <section className="section split-categories" style={{ padding: '8rem 4rem 2rem 4rem' }}>
        
        {/* Porcelain Tiles Row */}
        <div className="cat-split-row">
          <div className="cat-split-text">
            <span className="cat-num">01 . PORCELAIN</span>
            <h2 className="cat-split-title">Porcelain<br/>Tiles</h2>
            <p className="cat-split-desc">Discover our premium range of porcelain tiles, offering unmatched durability and timeless aesthetic appeal for any space. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className="cat-sublinks">
              <span>GVT</span>
              <span>PGVT</span>
            </div>
            <a href="#" className="explore-link">EXPLORE COLLECTION ↗</a>
          </div>
          <div className="cat-split-image">
            <img src="/marble_texture.jpg" alt="Porcelain Tiles" />
          </div>
        </div>

        {/* Large Format Row */}
        <div className="cat-split-row reverse" style={{ marginTop: '10rem' }}>
          <div className="cat-split-text">
            <span className="cat-num">02 . FORMATS</span>
            <h2 className="cat-split-title">Large<br/>Format</h2>
            <p className="cat-split-desc">Seamless and expansive. Our large format slabs reduce grout lines and create breathtaking, continuous surfaces. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className="cat-sublinks">
              <span>Color Body</span>
              <span>Full Body</span>
            </div>
            <a href="#" className="explore-link">EXPLORE FORMATS ↗</a>
          </div>
          <div className="cat-split-image">
            <img src="/luxury_tile_craftsmanship.jpg" alt="Large Format" />
          </div>
        </div>

      </section>

      {/* Category Brief About - Redesigned as Full Screen Hero */}
      <section className="category-hero-section" ref={categoryHeroRef}>
        <div className="hero-bg" style={{ backgroundImage: 'url(/bathroom_preview.jpg)' }}></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-glass-box">
            <h2 className="hero-large-text">
              <SplitText text="EXPLORING OUR" /><br/><SplitText text="CATEGORIES" />
            </h2>
            <p className="hero-desc animate-fade-up">
              We curate the world’s finest materials, organizing them into distinct categories to help architects and designers find the exact expression of luxury they envision. From timeless natural stone to cutting-edge technical ceramics.
            </p>
            <br/>
            <a href="#" className="hero-link animate-fade-up" style={{ color: 'white', borderBottomColor: 'rgba(255,255,255,0.5)' }}>EXPLORE MORE ↗</a>
          </div>
        </div>
        </section>

      {/* Elegant Separator Line Above */}
      <div style={{ width: '100%', backgroundColor: '#F2F0E9' }}>
        <div style={{ width: '100%', height: '1px', background: 'rgba(26, 26, 46, 0.1)' }}></div>
      </div>

      {/* Collections / Editorial Process Layout */}
      <section className="collection-section" ref={processPinRef}>
        <div className="collections-process-grid" ref={processSliderRef}>
          <div className="process-col">
            <div className="process-num">01</div>
            <h3 className="process-head">Floor Tiles</h3>
            <p className="process-desc">We translate strategy into a clear spatial concept with our stunning premium floor tiles, testing ideas against brand and feasibility.</p>
            <a href="#" className="process-link">Learn more ↗</a>
            <div className="process-img-wrapper">
              <img src="/floor_preview.jpg" alt="Floor Tiles" />
            </div>
          </div>
          
          {/* 02 */}
          <div className="process-col">
            <div className="process-num">02</div>
            <h3 className="process-head">Wall Tiles</h3>
            <p className="process-desc">We develop the concept into coordinated layouts and systems, resolving key decisions for vertical spaces.</p>
            <a href="#" className="process-link">Learn more ↗</a>
            <div className="process-img-wrapper">
              <img src="/wall_preview.jpg" alt="Wall Tiles" />
            </div>
          </div>
          
          {/* 03 */}
          <div className="process-col">
            <div className="process-num">03</div>
            <h3 className="process-head">Terrace Tiles</h3>
            <p className="process-desc">We develop the design intent outdoors with our highly durable, weather-resistant luxury terrace tiles and systems.</p>
            <a href="#" className="process-link">Learn more ↗</a>
            <div className="process-img-wrapper">
              <img src="/terrace_preview.jpg" alt="Terrace Tiles" />
            </div>
          </div>
          
          {/* 04 */}
          <div className="process-col">
            <div className="process-num">04</div>
            <h3 className="process-head">Kitchen Tiles</h3>
            <p className="process-desc">We prepare clear, coordinated culinary spaces with our beautiful, high-performance and hygienic kitchen surfaces.</p>
            <a href="#" className="process-link">Learn more ↗</a>
            <div className="process-img-wrapper">
              <img src="/kitchen_bg.jpg" alt="Kitchen Tiles" />
            </div>
          </div>

          {/* 05 */}
          <div className="process-col">
            <div className="process-num">05</div>
            <h3 className="process-head">Bathroom Tiles</h3>
            <p className="process-desc">Transform personal spaces into luxury sanctuaries with our premium bathroom tile collections and bespoke finishes.</p>
            <a href="#" className="process-link">Learn more ↗</a>
            <div className="process-img-wrapper">
              <img src="/bathroom_preview.jpg" alt="Bathroom Tiles" />
            </div>
          </div>
          
          {/* 06 */}
          <div className="process-col">
            <div className="process-num">06</div>
            <h3 className="process-head">Parking Tiles</h3>
            <p className="process-desc">We create robust, heavy-duty tiles designed to withstand vehicular load while maintaining an elegant aesthetic for your parking spaces.</p>
            <a href="#" className="process-link">Learn more ↗</a>
            <div className="process-img-wrapper">
              <img src="/tile_nero.jpg" alt="Parking Tiles" />
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Separator Line Below */}
      <div style={{ width: '100%', backgroundColor: '#F2F0E9' }}>
        <div style={{ width: '100%', height: '1px', background: 'rgba(26, 26, 46, 0.1)' }}></div>
      </div>

      {/* Sizes / Formats Carousel Section */}
      <section className="sizes-carousel-section" ref={sizesSectionRef} style={{ padding: '4rem 4%', background: '#F2F0E9', width: '100%', minHeight: '100vh', justifyContent: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
        
        {/* Header */}
        <div className="sizes-header" style={{ marginBottom: '0.5rem' }}>
          <div className="sizes-header-left animate-fade-up">
            <span className="subtitle">SIZES</span>
            <h2 className="title">Forme in equilibrio.<br/>Spazi in armonia.</h2>
          </div>
          <div className="sizes-header-right animate-fade-up">
            <p>Una selezione di formati pensati per valorizzare<br/>ogni superficie con proporzioni perfette.<br/>Dalla materia, infinite possibilità progettuali.</p>
          </div>
        </div>
        
        <div style={{ width: '100%', height: '1px', backgroundColor: '#d8d3c5', marginBottom: '0.5rem' }}></div>
        
        {/* Carousel */}
        <div className="sizes-carousel-wrapper" style={{ overflow: 'visible' }}>
          <div className="sizes-carousel" ref={sizesSliderRef} style={{ width: 'max-content', display: 'flex', overflow: 'visible', paddingRight: '150px', paddingTop: '0.5rem' }}>
            {[
              { id: 1, size: '1600×3200', thk: '6mm', type: 'SLAB', img: '/luxury_tile_craftsmanship.jpg' },
              { id: 2, size: '1200×3200', thk: '6mm', type: 'SLAB', img: '/tile_nero.jpg' },
              { id: 3, size: '1200×3000', thk: '6mm', type: 'SLAB', img: '/tile_travertine.jpg' },
              { id: 4, size: '1200×2800', thk: '6mm', type: 'SLAB', img: '/tile_calacatta.jpg' },
              { id: 5, size: '1200×2400', thk: '9mm', type: 'SLAB', img: '/marble_texture.jpg' },
              { id: 6, size: '800×3200', thk: '9mm', type: 'SLAB', img: '/tile_emerald.jpg' },
              { id: 7, size: '800×3000', thk: '9mm', type: 'TILE', img: '/tile_calacatta.jpg' },
              { id: 8, size: '800×2400', thk: '9mm', type: 'TILE', img: '/marble_texture.jpg' },
              { id: 9, size: '1200×1800', thk: '9mm', type: 'TILE', img: '/tile_nero.jpg' },
              { id: 10, size: '800×1600', thk: '9mm', type: 'TILE', img: '/tile_travertine.jpg' },
              { id: 11, size: '1200×1200', thk: '9mm', type: 'TILE', img: '/tile_nero.jpg' },
              { id: 12, size: '800×800', thk: '9mm', type: 'TILE', img: '/tile_calacatta.jpg' },
              { id: 13, size: '600×1200', thk: '9mm', type: 'TILE', img: '/marble_texture.jpg' },
              { id: 14, size: '600×600', thk: '9mm', type: 'TILE', img: '/tile_emerald.jpg' },
            ].map((item) => (
              <div key={item.id} className="size-card">
                <div className="size-card-img" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="size-card-info">
                  <h4>{item.size}</h4>
                  <div className="size-meta">
                    <span>{item.thk}</span>
                    <span>{item.type}</span>
                  </div>
                  <button className="size-plus-btn">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section (Grid Layout) */}
      <section style={{ padding: '8rem 4%', background: '#F2F0E9', width: '100%', boxSizing: 'border-box' }}>
        <div className="animate-fade-up" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0, fontSize: '3.5rem' }}>
            <SplitText text="The Strength Behind Every Surface" />
          </h2>
          <p style={{ maxWidth: '600px', marginTop: '1rem', opacity: 0.8, lineHeight: 1.6 }}>
            From advanced manufacturing to global exports, every number reflects our commitment to quality, innovation, and customer satisfaction.
          </p>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#d8d3c5', marginTop: '3rem' }}></div>
        </div>
        <div className="stats-grid-wrapper">
          {[
            { num: "57,600+", label: "Sq. Meters Daily Production", text: "Manufactured with cutting-edge Italian technology ensuring precision and durability." },
            { num: "3,500", label: "Sq. Ft Display Area", text: "Explore our vast collections in our immersive state-of-the-art showrooms." },
            { num: "282", label: "Meter Long Kiln", text: "Advanced firing processes guarantee the structural integrity of every slab." },
            { num: "100%", label: "Export Quality", text: "Rigorous quality checks ensure perfection for every international shipment." },
            { num: "78+", label: "Export Countries", text: "Trusted by architects and developers across the globe." },
            { num: "10+", label: "Tile Sizes", text: "From standard formats to massive seamless slabs for any project." },
            { num: "48k+", label: "Tile Designs", text: "A massive library of textures, colors, and premium finishes." },
            { num: "20+", label: "Tile Surfaces", text: "Matte, polished, rustic, and specialized textures for all environments." },
          ].map((stat, i) => (
            <div key={i} className="stat-info-card">
              <span className="stat-large-num">{stat.num}</span>
              <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 1rem 0', color: '#1a1a1a', fontWeight: '400' }}>{stat.label}</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Elegant Separator Line */}
      <div style={{ width: '100%', padding: '4rem 0' }}>
        <div style={{ width: '90%', height: '1px', background: 'rgba(26, 26, 46, 0.1)', margin: '0 auto' }}></div>
      </div>
      {/* Materials Grid */}
      <section className="section">
        <p style={{ opacity: 0.6, textTransform: 'uppercase' }} className="animate-fade-up">( Material )</p>
        <h2 className="section-title">
          <SplitText text="Noble Materials for Unique Creations" />
        </h2>
        <div className="materials-grid">
          <div className="material-item animate-fade-up"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_calacatta.jpg)', backgroundSize: 'cover' }}></div><h3>Stone</h3></div>
          <div className="material-item animate-fade-up"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_nero.jpg)', backgroundSize: 'cover' }}></div><h3>Granite</h3></div>
          <div className="material-item animate-fade-up"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_emerald.jpg)', backgroundSize: 'cover' }}></div><h3>Marble</h3></div>
          <div className="material-item animate-fade-up"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_travertine.jpg)', backgroundSize: 'cover' }}></div><h3>Quartzite</h3></div>
          <div className="material-item animate-fade-up"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_calacatta.jpg)', backgroundSize: 'cover' }}></div><h3>Ceramic</h3></div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-container">
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>
          <SplitText text="Contact us" />
        </h2>
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="form-group animate-fade-up"><input type="text" placeholder="First name *" className="form-input" required /></div>
          <div className="form-group animate-fade-up"><input type="text" placeholder="Last name *" className="form-input" required /></div>
          <div className="form-group animate-fade-up"><input type="email" placeholder="E-mail *" className="form-input" required /></div>
          <div className="form-group animate-fade-up"><textarea placeholder="Text *" className="form-input" rows="4" required></textarea></div>
          <div style={{ marginBottom: '2rem', textAlign: 'left', opacity: 0.7 }} className="animate-fade-up">
            <input type="checkbox" id="privacy" required />
            <label htmlFor="privacy" style={{ marginLeft: '10px' }}>I declare that I have read and understood the privacy policy *</label>
          </div>
          <button type="submit" className="submit-btn animate-fade-up">SUBMIT ↗</button>
        </form>
      </section>

      {/* Video Modal Overlay */}
      <div className={`video-modal ${isModalOpen ? 'active' : ''}`}>
        <button className="close-modal" onClick={closeModal}>&times;</button>
        <video controls ref={modalVideoRef}>
          <source src="/video/reel1.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  );
};

export default Home;
