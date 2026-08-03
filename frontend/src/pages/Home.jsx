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

      // 2. Video Collage Parallax & Expand
      if (videoPinSecRef.current && videoWrapperRef.current) {
        const vids = gsap.utils.toArray('.collage-vid:not(.vid-center)');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoPinSecRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true
          }
        });

        // Center scales up to fill screen
        tl.to('.vid-center', {
          width: '100%',
          height: '100vh',
          top: 0,
          left: 0,
          borderRadius: 0,
          ease: "power2.inOut"
        }, 0);

        // Hide watch video button as it scales up
        tl.to('.watch-btn', {
          opacity: 0,
          ease: "power2.inOut"
        }, 0);

        // Others fly off screen in different directions
        vids.forEach((vid, i) => {
           const yOffset = i % 2 === 0 ? -150 : 150;
           const xOffset = i < 2 ? -100 : 100;
           
           tl.to(vid, {
             yPercent: yOffset,
             xPercent: xOffset,
             opacity: 0,
             scale: 0.5,
             ease: "power2.inOut"
           }, 0);
        });
      }

      // 3. Pinned Horizontal Timeline Scroll
      if (historySliderRef.current && historySectionRef.current) {
        gsap.to(historySliderRef.current, {
          x: () => -(historySliderRef.current.scrollWidth - window.innerWidth + 120),
          ease: "none",
          scrollTrigger: {
            trigger: historySectionRef.current,
            pin: true,
            start: "center center",
            end: () => "+=" + (historySliderRef.current.scrollWidth * 0.8), // Reduced scroll distance
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        // Fade up cards as they enter
        gsap.to(".card", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: historySectionRef.current,
            start: "top 70%"
          }
        });
      }

      // 4. Team Slider Horizontal Scroll (Not Pinned, just drag/scroll feel)
      if (teamSliderRef.current) {
        gsap.to(teamSliderRef.current, {
          x: () => -(teamSliderRef.current.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: teamSliderRef.current,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1
          }
        });
      }
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
      <section className="hero">
        <div className="hero-title-wrap" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Explicit Kicker */}
          <div style={{ fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem', color: '#1a1a1a', fontWeight: '600' }}>
             Luxury Italian Porcelain Slabs & Natural Stone
          </div>

          <h1 className="hero-title custom-hero-title">
            <div className="title-row-1">
              <SplitText text="THE ART OF" direction="left" />
            </div>
            <div className="title-row-2">
              <SplitText text="PREMIUM TILES" direction="right" />
            </div>
            <div className="title-row-3">
              <SplitText text="& SLABS" direction="up" />
            </div>
          </h1>
        </div>
      </section>


      {/* Video Collage Parallax Section */}
      <div className="video-collage-wrapper" ref={videoPinSecRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#F2F0E9' }}>
        <section className="collage-container" ref={videoWrapperRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
          
          <div className="collage-vid vid-center" onClick={openModal}>
            <button className="watch-btn" style={{ zIndex: 20 }}>WATCH VIDEO</button>
            <video autoPlay muted loop playsInline>
              <source src="/video/reel1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="collage-vid vid-top-left">
             <video autoPlay muted loop playsInline><source src="/video/reel2.mp4" type="video/mp4" /></video>
          </div>

          <div className="collage-vid vid-top-right">
             <video autoPlay muted loop playsInline><source src="/video/reel3.mp4" type="video/mp4" /></video>
          </div>

          <div className="collage-vid vid-bottom-left">
             <video autoPlay muted loop playsInline><source src="/video/reel4.mp4" type="video/mp4" /></video>
          </div>

          <div className="collage-vid vid-bottom-right">
             <video autoPlay muted loop playsInline><source src="/video/reel5.mp4" type="video/mp4" /></video>
          </div>
          
          <div className="collage-vid vid-mid-left">
             <video autoPlay muted loop playsInline><source src="/video/reel6.mp4" type="video/mp4" /></video>
          </div>

        </section>
      </div>

      {/* Artisans & Innovators Section */}
      <section className="section split-layout" style={{ position: 'relative', zIndex: 10, backgroundColor: '#F2F0E9' }}>
        <h2 className="section-title">
          <SplitText text="Artisans, Aesthetes and Innovators" />
        </h2>
        <div>
          <p className="section-desc" style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.6 }}>
            <SplitText text="Distinguished by a great sensitivity in seeing and creating beauty by constantly reinventing ourselves." />
          </p>
        </div>
      </section>

      {/* 2 Elegant Categories Section */}
      <section className="section elegant-categories">
        <div className="cat-grid">
          
          <div className="cat-card">
            <div className="cat-image-wrap">
              <img src="/marble_texture.jpg" alt="Porcelain Tiles" />
            </div>
            <div className="cat-text">
              <h3 className="cat-title">Porcelain Tiles</h3>
              <div className="explore-link">EXPLORE COLLECTION ↗</div>
            </div>
          </div>
          
          <div className="cat-card">
            <div className="cat-image-wrap">
              <img src="/luxury_tile_craftsmanship.jpg" alt="Large Format" />
            </div>
            <div className="cat-text">
              <h3 className="cat-title">Large Format</h3>
              <div className="cat-sublinks">
                <span>Color Body</span>
                <span>Full Body</span>
              </div>
              <div className="explore-link">EXPLORE FORMATS ↗</div>
            </div>
          </div>

        </div>
      </section>

      {/* Category Brief About - Redesigned as Full Screen Hero */}
      <section className="category-hero-section">
        <div className="hero-bg" style={{ backgroundImage: 'url(/tile_calacatta.jpg)' }}></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h2 className="hero-large-text">
            EXPLORING OUR<br/>CATEGORIES
          </h2>
          
          <div className="hero-small-text-box">
            <p className="hero-desc">
              We curate the world’s finest materials, organizing them into distinct categories to help architects and designers find the exact expression of luxury they envision. From timeless natural stone to cutting-edge technical ceramics.
            </p>
            <a href="#" className="hero-link">EXPLORE MORE ↗</a>
          </div>
        </div>
      </section>

      {/* Collections / Editorial Process Layout */}
      <section className="collection-section">
        <div className="collections-process-grid">
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
        </div>
      </section>

      {/* Surface & Sizes Section */}
      <section className="section surfaces-section">
        <div className="surfaces-content" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ opacity: 0.6, textTransform: 'uppercase', marginBottom: '2rem' }}>( Surfaces & Sizes )</p>
          <h2 className="section-title" style={{ fontSize: '3rem', marginBottom: '4rem' }}>
            Available Formats
          </h2>

          <div className="sizes-architectural-grid">
            
            <div className="size-group">
              <h4 className="size-group-title">Standard Square</h4>
              <div className="size-pills">
                <span>600x600</span>
                <span>800x800</span>
                <span>1200x1200</span>
              </div>
            </div>

            <div className="size-group">
              <h4 className="size-group-title">Rectangular</h4>
              <div className="size-pills">
                <span>600x1200</span>
                <span>800x1600</span>
                <span>1200x1800</span>
              </div>
            </div>

            <div className="size-group">
              <h4 className="size-group-title">Large Slabs (800mm width)</h4>
              <div className="size-pills">
                <span>800x2400</span>
                <span>800x3000</span>
                <span>800x3200</span>
              </div>
            </div>

            <div className="size-group">
              <h4 className="size-group-title">Massive Slabs (1200mm+ width)</h4>
              <div className="size-pills">
                <span>1200x2400</span>
                <span>1200x2800</span>
                <span>1200x3000</span>
                <span>1200x3200</span>
                <span>1600x3200</span>
              </div>
            </div>

            <div className="size-group" style={{ gridColumn: '1 / -1', marginTop: '4rem', borderTop: 'none', paddingTop: 0 }}>
              <h4 className="size-group-title" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '1rem', marginBottom: '2rem' }}>Available Surfaces</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}>
                
                <div>
                  <div style={{ backgroundImage: 'url(/tile_emerald.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1', width: '100%' }}></div>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', letterSpacing: '1px' }}>Glossy</h3>
                </div>
                
                <div>
                  <div style={{ backgroundImage: 'url(/tile_nero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1', width: '100%' }}></div>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', letterSpacing: '1px' }}>Matt</h3>
                </div>
                
                <div>
                  <div style={{ backgroundImage: 'url(/luxury_tile_craftsmanship.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1', width: '100%' }}></div>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', letterSpacing: '1px' }}>Carving</h3>
                </div>
                
                <div>
                  <div style={{ backgroundImage: 'url(/tile_travertine.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1', width: '100%' }}></div>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', letterSpacing: '1px' }}>Rustic</h3>
                </div>

                <div>
                  <div style={{ backgroundImage: 'url(/tile_calacatta.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1', width: '100%' }}></div>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', letterSpacing: '1px' }}>Satin</h3>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pinned Horizontal Scroll Section (Our History) */}
      <section className="horizontal-section" ref={historySectionRef}>
        <div className="history-header">
          <h2 className="section-title">
            <SplitText text="Our History" />
          </h2>
        </div>
        <div className="cards-wrapper" ref={historySliderRef}>
          <div className="card">
            <span className="card-year">1981</span>
            <p>In 1981 Mario and Laura founded Scalvini Marmi, dealing mainly with small construction work in Breno.</p>
          </div>
          <div className="card">
            <span className="card-year">1984</span>
            <p>A first major expansion took place in 1984, thanks to the acquisition of a company in a neighbouring town.</p>
          </div>
          <div className="card">
            <span className="card-year">1991</span>
            <p>In 1991 the first and current headquarters were built in Breno, in the province of Brescia.</p>
          </div>
          <div className="card">
            <span className="card-year">'90</span>
            <p>During the 1990s, far-sighted investments were made in technology, purchasing new numerical controlled machines.</p>
          </div>
          <div className="card">
            <span className="card-year">2000</span>
            <p>Since the 2000s, Matteo, Andrea and Marta have joined management, carrying forward their parents' tradition.</p>
          </div>
        </div>
      </section>



      {/* Materials Grid */}
      <section className="section">
        <p style={{ opacity: 0.6, textTransform: 'uppercase' }}>( Material )</p>
        <h2 className="section-title">
          <SplitText text="Noble Materials for Unique Creations" />
        </h2>
        <div className="materials-grid">
          <div className="material-item"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_calacatta.jpg)', backgroundSize: 'cover' }}></div><h3>Stone</h3></div>
          <div className="material-item"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_nero.jpg)', backgroundSize: 'cover' }}></div><h3>Granite</h3></div>
          <div className="material-item"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_emerald.jpg)', backgroundSize: 'cover' }}></div><h3>Marble</h3></div>
          <div className="material-item"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_travertine.jpg)', backgroundSize: 'cover' }}></div><h3>Quartzite</h3></div>
          <div className="material-item"><div className="material-thumb" style={{ backgroundImage: 'url(/tile_calacatta.jpg)', backgroundSize: 'cover' }}></div><h3>Ceramic</h3></div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-container">
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>
          <SplitText text="Contact us" />
        </h2>
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="form-group"><input type="text" placeholder="First name *" className="form-input" required /></div>
          <div className="form-group"><input type="text" placeholder="Last name *" className="form-input" required /></div>
          <div className="form-group"><input type="email" placeholder="E-mail *" className="form-input" required /></div>
          <div className="form-group"><textarea placeholder="Text *" className="form-input" rows="4" required></textarea></div>
          <div style={{ marginBottom: '2rem', textAlign: 'left', opacity: 0.7 }}>
            <input type="checkbox" id="privacy" required />
            <label htmlFor="privacy" style={{ marginLeft: '10px' }}>I declare that I have read and understood the privacy policy *</label>
          </div>
          <button type="submit" className="submit-btn">SUBMIT ↗</button>
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
