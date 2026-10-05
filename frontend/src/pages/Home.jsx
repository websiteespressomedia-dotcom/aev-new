import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SplitText from '../components/SplitText';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);
// Phones: URL-bar show/hide fires resize; don't rebuild every pin because of it
ScrollTrigger.config({ ignoreMobileResize: true });


const SizePanel = ({ item, isActive, onActivate, onDeactivate, onToggle }) => {
  const panelRef = useRef(null);

  // On touch the strip scrolls sideways, so bring the opened panel into view
  useEffect(() => {
    if (isActive && panelRef.current && window.matchMedia('(hover: none)').matches) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [isActive]);

  return (
    <article
      ref={panelRef}
      className={`size-panel ${isActive ? 'is-active' : ''}`}
      style={{ '--size-image': `url("${item.img}")` }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') onActivate(item.id); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') onDeactivate(item.id); }}
      onPointerUp={(e) => { if (e.pointerType !== 'mouse') onToggle(item.id); }}
      onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) onActivate(item.id); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onDeactivate(item.id);
        }
      }}
      tabIndex={0}
      aria-label={`${item.size} ${item.type}`}
    >
      <div className="size-panel-image"  />

      <div className="size-panel-overlay"  />

      <div className="size-panel-vertical">
        <span className="size-panel-vertical-size">
          {item.size.replace('×', ' x ')} MM
        </span>

        <span className="size-panel-vertical-meta">
          {item.thk} · {item.type}
        </span>
      </div>

      <div className="size-panel-content">
        <span className="size-panel-index">
          FORMAT / {String(item.id).padStart(2, '0')}
        </span>

        <h3>{item.size} <small>MM</small></h3>

        <div className="size-panel-meta">
          <span>{item.thk} THICKNESS</span>
          <span>{item.type}</span>
        </div>

        <p>{item.description}</p>

        <a
          href="/collections"
          className="size-panel-link"
          tabIndex={isActive ? 0 : -1}
        >
          View More <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
};


/* ---------- Scroll-driven category stage data ---------- */
const CATEGORY_SLIDES = [
  {
    id: 'porcelain',
    num: '01 / PORCELAIN',
    title: ['Porcelain', 'Tiles'],
    desc: 'Discover our premium range of porcelain tiles, offering lasting durability and timeless appeal for distinctive interiors. Explore refined surfaces designed to bring character to every space.',
    tags: ['GVT', 'PGVT'],
    linkText: 'Explore Collection',
    href: '/collections',
    img: '/floor_preview.jpg',
    alt: 'Porcelain tile surface',
    bg: '#222220',
  },
  {
    id: 'formats',
    num: '02 / FORMATS',
    title: ['Large', 'Format'],
    desc: 'Create seamless, expansive spaces with large-format porcelain slabs. Their generous dimensions reduce grout lines and bring a calm, continuous finish to modern architecture.',
    tags: ['Color Body', 'Full Body'],
    linkText: 'Explore Formats',
    href: '/collections',
    img: '/terrace_preview.jpg',
    alt: 'Large format porcelain slabs',
    bg: '#222220',
  },
];

/* ---------- Inspiration (vertical panels, shared background) ----------
   Hover / tap a panel -> ITS image fades in as the background behind ALL panels,
   and the description rises inside that panel. Panel sizes never change on desktop.
   Add your images later: fill in `img` with a path from /public,
   e.g. img: '/inspiration_villa.jpg'. Until then a soft gradient shows. */
const INSPIRATION_ITEMS = [
  {
    id: 'villa',
    name: 'Villa',
    desc: 'Warm, seamless surfaces that turn private retreats into quiet statements.',
    img: '/terrace_preview.jpg',
    tone: 'linear-gradient(160deg, #7a6d5b 0%, #2b2823 100%)',
  },
  {
    id: 'residential',
    name: 'Residential',
    desc: 'Everyday living, elevated with durable and beautifully finished tiles.',
    img: '/residential_preview.png',
    tone: 'linear-gradient(160deg, #8f8677 0%, #34312c 100%)',
  },
  {
    id: 'office',
    name: 'Office Building',
    desc: 'Calm, hard-wearing floors and walls built for the pace of modern work.',
    img: '/office_preview.png',
    tone: 'linear-gradient(160deg, #62676d 0%, #25272a 100%)',
  },
  {
    id: 'commercial',
    name: 'Commercial Building',
    desc: 'Large-format surfaces that handle heavy footfall without losing their poise.',
    img: '/commercial_preview.png',
    tone: 'linear-gradient(160deg, #84735c 0%, #2c2822 100%)',
  },
  {
    id: 'hotel',
    name: 'Hotel',
    desc: 'Lobbies and suites with a luxurious first impression that lasts.',
    img: '/kitchen_preview.png',
    tone: 'linear-gradient(160deg, #6f5e47 0%, #241f19 100%)',
  },
];

const InspirationSection = () => {
  const [active, setActive] = useState(0);   // whose image is the background
  const [hovered, setHovered] = useState(-1); // which panel shows its text

  const select = (i) => { setActive(i); setHovered(i); };

  return (
    <section className="insp-section" onMouseLeave={() => setHovered(-1)}>
      {/* one shared background: every item's image is stacked here */}
      <div className="insp-bg" aria-hidden="true">
        {INSPIRATION_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`insp-bg-layer${active === i ? ' is-active' : ''}`}
            style={{ background: item.img ? `url(${item.img}) center / cover no-repeat` : item.tone }}
          />
        ))}
        <div className="insp-bg-overlay" />
      </div>

      <div className="insp-head">
        <span className="insp-eyebrow">Inspiration</span>
        <h2 className="insp-title">Where Our Surfaces Come to Life</h2>
      </div>

      <div className="insp-panels">
        {INSPIRATION_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`insp-panel${hovered === i ? ' is-hovered' : ''}${hovered !== -1 && hovered !== i ? ' is-dim' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={hovered === i}
            onMouseEnter={() => select(i)}
            onFocus={() => select(i)}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
            }}
          >
            <span className="insp-panel-line" aria-hidden="true" />
            <span className="insp-num">{String(i + 1).padStart(2, '0')}</span>

            <div className="insp-panel-body">
              <span className="insp-name">{item.name}</span>
              <div className="insp-desc-wrap">
                <div className="insp-desc-inner">
                  <span className="insp-desc">{item.desc}</span>
                  {/* <span className="insp-link">View Inspiration <span aria-hidden="true">↗</span></span> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   AEVITAS HERO IMAGE SLIDER
   ========================================================= */

const HERO_SLIDES = [
  { id: 'villa',       image: '/terrace_preview.jpg',    alt: 'Villa terrace with porcelain flooring' },
  { id: 'residential', image: '/residential_preview.png', alt: 'Residential living space' },
  { id: 'office',      image: '/office_preview.png',      alt: 'Office interior with large-format surfaces' },
  { id: 'commercial',  image: '/commercial_preview.png',  alt: 'Commercial space with porcelain surfaces' },
  { id: 'hotel',       image: '/kitchen_preview.png',     alt: 'Kitchen with premium porcelain finishes' },
  { id: 'porcelain',   image: '/floor_preview.jpg',       alt: 'Contemporary floor in porcelain' }
];

const HERO_SLICE_COUNT = 7;
const HERO_AUTOPLAY_MS = 4000;   // change image every 4 seconds

// one single text for the whole hero (does not change per slide)
const HERO_TEXT = {
  eyebrow: 'Aevitas Ceramics',
  title: ['Timeless', 'Surfaces for', 'Every Space'],
  description: 'Luxury Italian porcelain slabs and natural stone, crafted for distinctive interiors.'
};


const HeroImageSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const rootRef = useRef(null);
  const busyRef = useRef(false);
  const hoverRef = useRef(false);
  const timerRef = useRef(null);
  const tlRef = useRef(null);
  const changeRef = useRef(null);

  const nextIndex = (activeSlide + 1) % HERO_SLIDES.length;

  const changeSlide = (direction) => {
    if (busyRef.current) return;
    const root = rootRef.current;
    if (!root) return;

    const target =
      (activeSlide + direction + HERO_SLIDES.length) % HERO_SLIDES.length;

    // the transition layer always shows `target`
    const slices = gsap.utils.toArray('.aev-hero-transition-slice', root);
    const imgs = gsap.utils.toArray('.aev-hero-transition-image', root);
    if (slices.length === 0) {
      setActiveSlide(target);
      return;
    }

    busyRef.current = true;
    clearTimeout(timerRef.current);
    imgs.forEach((im) => { im.src = HERO_SLIDES[target].image; });

    const fromRight = direction < 0;
    const order = fromRight ? [...slices].reverse() : slices;

    gsap.set(slices, {
      clipPath: fromRight ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
      opacity: 1
    });

    // each vertical slice is revealed one after another (left -> right, or right -> left on "prev")
    tlRef.current = gsap.timeline({
      onComplete: () => {
        // slices stay fully visible until React swaps the permanent image,
        // so there is no flash of the old picture
        setActiveSlide(target);
      }
    });

    tlRef.current.to(order, {
      clipPath: 'inset(0 0% 0 0%)',
      duration: 0.9,
      stagger: 0.14,
      ease: 'power3.inOut'
    });
  };
  changeRef.current = changeSlide;

  // autoplay: every 4s, paused while the mouse is over the hero
  const schedule = () => {
    clearTimeout(timerRef.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timerRef.current = setTimeout(() => {
      if (hoverRef.current || busyRef.current) { schedule(); return; }
      changeRef.current && changeRef.current(1);
    }, HERO_AUTOPLAY_MS);
  };

  // runs after every committed slide change: unlock + restart the 4s timer
  useEffect(() => {
    busyRef.current = false;
    schedule();
    return () => clearTimeout(timerRef.current);
  }, [activeSlide]);

  // preload images + cleanup
  useEffect(() => {
    HERO_SLIDES.forEach((s) => { const im = new Image(); im.src = s.image; });
    return () => {
      clearTimeout(timerRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  const onPointerEnter = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    hoverRef.current = true;
  };
  const onPointerLeave = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    hoverRef.current = false;
    if (!busyRef.current) schedule();   // fresh 5s after the mouse leaves
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  const arrowKey = (dir) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); changeSlide(dir); }
  };

  return (
    <section
      className="aev-hero"
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >

      {/* =====================================================
          IMAGE (right side, ~70%)
          ===================================================== */}

      <div className="aev-hero-media">

        {/* Permanent current image */}
        <img
          className="aev-hero-current-image"
          src={currentSlide.image}
          alt={currentSlide.alt}
        />

        {/* Temporary transition image (vertical slices) */}
        <div className="aev-hero-transition" aria-hidden="true">
          {Array.from({ length: HERO_SLICE_COUNT }).map((_, index) => (
            <div
              key={`${activeSlide}-${index}`}
              className="aev-hero-transition-slice"
              style={{
                left: `${(index / HERO_SLICE_COUNT) * 100}%`,
                width: `${100 / HERO_SLICE_COUNT}%`
              }}
            >
              <img
                className="aev-hero-transition-image"
                src={HERO_SLIDES[nextIndex].image}
                alt=""
              />
            </div>
          ))}
        </div>

        <div className="aev-hero-image-overlay" />
      </div>


      {/* =====================================================
          LEFT CONTENT (~30%): one fixed text
          ===================================================== */}

      <div className="aev-hero-copy">

        <span className="aev-hero-eyebrow">{HERO_TEXT.eyebrow}</span>

        <h1 className="aev-hero-heading">
          {HERO_TEXT.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <div className="aev-hero-description">{HERO_TEXT.description}</div>

        <div className="aev-hero-navigation">

          {/* plain divs (not <button>) so the site cursor stays the normal dot + ring */}
          <div
            role="button"
            tabIndex={0}
            className="aev-hero-arrow"
            onClick={() => changeSlide(-1)}
            onKeyDown={arrowKey(-1)}
            aria-label="Previous image"
          >
            <span>←</span>
          </div>

          <div className="aev-hero-counter">
            <span className="aev-hero-current-number">
              {String(activeSlide + 1).padStart(2, '0')}
            </span>

            <span className="aev-hero-counter-line">
              <span style={{ width: `${((activeSlide + 1) / HERO_SLIDES.length) * 100}%` }} />
            </span>

            <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
          </div>

          <div
            role="button"
            tabIndex={0}
            className="aev-hero-arrow"
            onClick={() => changeSlide(1)}
            onKeyDown={arrowKey(1)}
            aria-label="Next image"
          >
            <span>→</span>
          </div>

        </div>
      </div>

      {/* Small number on image */}
      <div className="aev-hero-index">
        {String(activeSlide + 1).padStart(2, '0')}
        <span>/</span>
        {String(HERO_SLIDES.length).padStart(2, '0')}
      </div>

    </section>
  );
};

/* ---------- About / Heritage: pinned scroll story (5 steps) ----------
   1  "Designed to become part of the architecture." + scroll hint
   2  text splits apart, a thin band of marble opens between the lines
   3  the band expands, the text fades into the background
   4  full-screen material view  ("01 - Material Intelligence")
   5  the image shrinks into a frame and the final About text appears
   Edit the words and the two image paths below. */
const ABOUT_TEXT = {
  eyebrow: 'Our Heritage',
  line1: 'Designed to become',
  line2: 'part of the architecture.',
  matNumber: '01',
  matTitle: ['Material', 'Intelligence'],
  matText: 'Italian craftsmanship meets modern technology to create timeless surfaces.',
  finalTitle: 'Aevitas Ceramics is where material, technology and architecture meet.',
  finalText:
    'For decades, we have combined Italian craftsmanship with cutting-edge technology to create surfaces that redefine luxury spaces.',
  cta: 'Discover Our Story'
};

const ABOUT_IMAGES = {
  main: '/luxury_tile_craftsmanship.jpg',   // band + full-screen view
  final: '/marble_texture.jpg'              // image inside the final frame
};

const AboutHeritage = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const q = (sel) => gsap.utils.toArray(sel, root);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = () => window.innerWidth <= 800;
    const vh = (n) => () => (n * window.innerHeight) / 100;   // re-evaluated on resize
    const pick = (d, m) => () => (isMobile() ? m : d);

    const ctx = gsap.context(() => {
      const media = q('.ah-media')[0];
      const imgA = q('.ah-img-a')[0];
      const imgB = q('.ah-img-b')[0];
      const veil = q('.ah-veil')[0];
      const eyebrow = q('.ah-eyebrow')[0];
      const hl1 = q('.ah-hl-1')[0];
      const hl2 = q('.ah-hl-2')[0];
      const vline = q('.ah-vline')[0];
      const hint = q('.ah-scroll')[0];
      const matKids = q('.ah-mat > *');
      const finalWrap = q('.ah-final-wrap')[0];
      const finalKids = q('.ah-final > *');

      /* final frame (image on the left, text on the right; stacked on phones) */
      const frame = {
        left: pick('5%', '6%'),
        top: pick('13%', '11%'),
        width: pick('46%', '88%'),
        height: pick('74%', '36%')
      };

      /* ---------- reduced motion: just show the final layout ---------- */
      if (reduce) {
        gsap.set(media, { left: frame.left(), top: frame.top(), width: frame.width(), height: frame.height(), borderRadius: 6 });
        gsap.set(imgB, { opacity: 1 });
        gsap.set([eyebrow, hl1, hl2, vline, hint, q('.ah-mat')[0]], { autoAlpha: 0 });
        return;
      }

      /* ---------- start state (step 1) ---------- */
      gsap.set(media, { left: '0%', top: '54%', width: '100%', height: '0%', borderRadius: 0 });
      gsap.set(imgA, { scale: 1.25 });
      gsap.set([eyebrow, hl1, hl2], { yPercent: -50 });
      gsap.set(matKids, { opacity: 0, y: 40 });
      gsap.set(finalWrap, { autoAlpha: 0 });
      gsap.set(finalKids, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=600%',
          pin: true,
          scrub: 1.2,               // smooth catch-up
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2        // this pin is the first one on the page: measure it first
        }
      });

      const T2 = 0.4;   // step 1 -> 2
      const T3 = 1.6;   // step 2 -> 3
      const T4 = 2.8;   // step 3 -> 4
      const T5 = 5.4;   // step 4 -> 5

      /* ---------- step 1 -> 2 : text separates, a thin band opens ---------- */
      tl.to(media, { top: '48%', height: '12%', duration: 1 }, T2)
        .to(eyebrow, { y: vh(-5), duration: 1 }, T2)
        .to(hl1, { y: vh(-6), duration: 1 }, T2)
        .to(hl2, { y: vh(27), duration: 1 }, T2)
        .to(vline, { top: vh(37), height: vh(49), duration: 1 }, T2)
        .to(hint, { opacity: 0, y: 12, duration: 0.6 }, T2)
        .to(imgA, { scale: 1, duration: T4 + 1.3 - T2, ease: 'none' }, T2);   // slow zoom-out until full view

      /* ---------- step 2 -> 3 : image reveal expands, text turns ghostly ---------- */
      tl.to(media, { top: '33%', height: '42%', duration: 1 }, T3)
        .to(eyebrow, { y: vh(-8), duration: 1 }, T3)
        .to(hl1, { y: vh(-12), opacity: 0.22, duration: 1 }, T3)
        .to(hl2, { y: vh(33), opacity: 0.22, duration: 1 }, T3)
        .to(vline, { opacity: 0, duration: 0.8 }, T3);

      /* ---------- step 3 -> 4 : full material view ---------- */
      tl.to(media, { top: '0%', height: '100%', duration: 1.3 }, T4)
        .to(hl1, { y: vh(-20), opacity: 0, duration: 1 }, T4)
        .to(hl2, { y: vh(45), opacity: 0, duration: 1 }, T4)
        .to(eyebrow, { y: vh(-12), opacity: 0, duration: 1 }, T4)
        .to(veil, { opacity: 1, duration: 0.8 }, T4 + 0.5)
        .to(matKids, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, T4 + 0.8);

      /* ---------- step 4 -> 5 : image shrinks into a frame, final text arrives ---------- */
      tl.to(matKids, { opacity: 0, y: -30, duration: 0.6, stagger: 0.05, ease: 'power2.in' }, T5)
        .to(veil, { opacity: 0, duration: 0.8 }, T5)
        .to(
          media,
          { left: frame.left, top: frame.top, width: frame.width, height: frame.height, borderRadius: 6, duration: 1.5 },
          T5
        )
        .to(imgB, { opacity: 1, duration: 0.8, ease: 'none' }, T5 + 0.6)
        .fromTo(finalWrap, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: false }, T5 + 0.7)
        .to(finalKids, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power2.out' }, T5 + 0.8);

      tl.to({}, { duration: 0.5 });   // short hold on the final layout before un-pinning
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ah-section" ref={rootRef}>
      {/* image: thin band -> full screen -> final frame */}
      <div className="ah-media">
        <img className="ah-img ah-img-a" src={ABOUT_IMAGES.main} alt="Gold-veined Italian marble" />
        <img className="ah-img ah-img-b" src={ABOUT_IMAGES.final} alt="Marble surface in an architectural space" />
        <div className="ah-veil" />
      </div>

      {/* steps 1-3: centred text */}
      <div className="ah-eyebrow">
        <span>{ABOUT_TEXT.eyebrow}</span>
        <i />
      </div>

      <h2 className="ah-heading">
        <span className="ah-hl ah-hl-1">{ABOUT_TEXT.line1}</span>
        <span className="ah-hl ah-hl-2">{ABOUT_TEXT.line2}</span>
      </h2>

      <div className="ah-vline" aria-hidden="true" />

      <div className="ah-scroll" aria-hidden="true">
        <span className="ah-scroll-ring"><span className="ah-scroll-dot" /></span>
        <span>Scroll</span>
      </div>

      {/* step 4: text over the full image */}
      <div className="ah-mat">
        <div className="ah-mat-num">
          <span>{ABOUT_TEXT.matNumber}</span>
          <i />
        </div>
        <div className="ah-mat-title">
          {ABOUT_TEXT.matTitle.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div className="ah-mat-text">{ABOUT_TEXT.matText}</div>
      </div>

      {/* step 5: final layout */}
      <div className="ah-final-wrap">
        <div className="ah-final">
          <div className="ah-final-eyebrow">
            <span className="ah-final-num">{ABOUT_TEXT.matNumber}</span>
            <i />
            <span className="ah-final-label">{ABOUT_TEXT.eyebrow}</span>
          </div>
          <h3 className="ah-final-title">{ABOUT_TEXT.finalTitle}</h3>
          <p className="ah-final-p">{ABOUT_TEXT.finalText}</p>
          <div>
            <button className="pill-btn ah-cta">
              <span className="ah-cta-circle" aria-hidden="true">→</span>
              <span className="ah-cta-label">{ABOUT_TEXT.cta}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSizeId, setActiveSizeId] = useState(null);
  
  const videoPinSecRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const modalVideoRef = useRef(null);
  
  const historySectionRef = useRef(null);
  const historySliderRef = useRef(null);
  const teamSliderRef = useRef(null);
  const processPinRef = useRef(null);
  const processSliderRef = useRef(null);
  // const sizesSectionRef = useRef(null);
  // const sizesSliderRef = useRef(null);
  const wipeContainerRef = useRef(null);
  const categoryHeroRef = useRef(null);
  const catStageRef = useRef(null);

  useEffect(() => {
    let mm;
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
            x: (Math.random() - 0.5) * Math.min(600, window.innerWidth * 0.6),
            y: (Math.random() - 0.5) * Math.min(600, window.innerWidth * 0.6),
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
      // if (sizesSectionRef.current && sizesSliderRef.current) {
      //   gsap.to(sizesSliderRef.current, {
      //     x: () => -(sizesSliderRef.current.scrollWidth - window.innerWidth + (window.innerWidth * 0.1)),
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: sizesSectionRef.current,
      //       pin: true,
      //       start: "center center",
      //       end: () => "+=" + sizesSliderRef.current.scrollWidth,
      //       scrub: 1,
      //       invalidateOnRefresh: true
      //     }
      //   });
      // }

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

      // 6. Pinned Category Stage: card stays, text rises in, image changes (scrubbed)
      if (catStageRef.current) {
       mm = gsap.matchMedia();
       mm.add(
        {
          isDesktop: '(min-width: 1025px)',
          isTablet: '(min-width: 769px) and (max-width: 1024px)',
          isPhone: '(max-width: 768px)'
        },
        (mmCtx) => {
        const { isPhone, isTablet } = mmCtx.conditions;
        // scroll distance per slide: shorter on touch devices so it never feels endless
        const perSlide = isPhone ? 0.7 : isTablet ? 0.8 : 0.9;
        const stage = catStageRef.current;
        const card = stage.querySelector('.cs-card');
        const layers = gsap.utils.toArray('.cs-layer', stage);
        const slides = gsap.utils.toArray('.cs-slide', stage);
        const dots = gsap.utils.toArray('.cs-dot', stage);
        const count = slides.length;
        const kids = (slide) => gsap.utils.toArray('.cs-item', slide);

        // initial state: slide 0 visible, the rest waiting below
        slides.forEach((s, i) => {
          gsap.set(s, { autoAlpha: i === 0 ? 1 : 0 });
          if (i > 0) gsap.set(kids(s), { y: 90, opacity: 0 });
        });
        layers.forEach((l, i) => {
          if (i > 0) {
            gsap.set(l, { clipPath: 'inset(100% 0% 0% 0%)' });
            gsap.set(l.querySelector('img'), { scale: 1.25 });
          }
        });
        // gsap.set(card, { backgroundColor: CATEGORY_SLIDES[0].bg });
        dots.forEach((d, i) => gsap.set(d, { width: i === 0 ? 30 : 8, opacity: i === 0 ? 1 : 0.35 }));

        const STEP = 2;      // timeline length per slide (hold + transition)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * perSlide * (count - 1) + window.innerHeight * 0.4),
            pin: true,
            scrub: isPhone ? 0.6 : 1,   // snappier follow on touch
            anticipatePin: 1,
            refreshPriority: 1,         // measure this pin FIRST (it's above the other pins on the page)
            invalidateOnRefresh: true
          }
        });

        tl.to({}, { duration: 0.3 }); // short hold on slide 1 before anything moves

        for (let i = 1; i < count; i++) {
          const T = 0.3 + (i - 1) * STEP;

          // outgoing text slides up and fades
          tl.to(kids(slides[i - 1]), { y: -90, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power2.in' }, T);
          tl.fromTo(slides[i - 1], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01, immediateRender: false }, T + 1.1);

          // incoming text rises from the bottom
          tl.fromTo(slides[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: false }, T + 0.5);
          tl.to(kids(slides[i]), { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out' }, T + 0.55);

          // image: next one wipes up over the previous, with a slow zoom-out
          tl.to(layers[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power2.inOut' }, T);
          tl.to(layers[i].querySelector('img'), { scale: 1, duration: 1.5, ease: 'power2.out' }, T);
          tl.to(layers[i - 1].querySelector('img'), { scale: 1.08, duration: 1.3 }, T);

          // card colour + progress dots
          // tl.to(card, { backgroundColor: CATEGORY_SLIDES[i].bg, duration: 1.2 }, T);
          tl.to(dots[i - 1], { width: 8, opacity: 0.35, duration: 0.5 }, T + 0.4);
          tl.to(dots[i], { width: 30, opacity: 1, duration: 0.5 }, T + 0.4);

          tl.to({}, { duration: 0.01 }, T + STEP - 0.01); // keep spacing for next hold
        }
        tl.to({}, { duration: 0.3 }); // short hold on last slide before un-pinning
        }
       );
      }

      // 7. Pronounced Global Text Reveal on Scroll
      const textElements = gsap.utils.toArray("p:not(.hero-desc):not(.cat-split-desc):not(.process-desc), h2:not(:has(.split-text-container)):not(.hero-large-text):not(.cat-split-title), h3:not(.process-head), h4, .diagram-text > div, form > div, .submit-btn, .material-item h3");
      
      textElements.forEach(el => {
        if (el.closest('.horizontal-section') || el.closest('.collection-section') || el.closest('.sizes-carousel-section') || el.closest('.stats-grid-wrapper') || el.closest('.cs-card') || el.closest('.ah-section')) return;

        gsap.fromTo(el,
          { 
            y: window.innerWidth < 768 ? 50 : 100, 
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
      if (mm) mm.revert();
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
      <HeroImageSlider />


      {/* About / Heritage (pinned scroll story) */}
      <AboutHeritage />

      {/* Elegant Separator Line */}
      <div style={{ width: '100%', backgroundColor: '#F2F0E9' }}>
        <div style={{ width: '90%', height: '1px', background: 'rgba(26, 26, 46, 0.1)', margin: '0 auto' }}></div>
      </div>

      {/* Editorial Category Stage (pinned, scroll-driven) */}
      <section className="cat-stage" ref={catStageRef}>
        <div className="cs-card">
          {/* Image layers (stacked) */}
          <div className="cs-media">
            {CATEGORY_SLIDES.map((c, i) => (
              <div className="cs-layer" key={c.id} style={{ zIndex: i + 1 }}>
                <img src={c.img} alt={c.alt} />
              </div>
            ))}
          </div>

          {/* Text slides (stacked) */}
          <div className="cs-content">
            {CATEGORY_SLIDES.map((c) => (
              <div className="cs-slide" key={c.id}>
                <span className="cs-num cs-item">{c.num}</span>

                <h2 className="cs-title cs-item">
                  {c.title.map((line, idx) => (
                    <span key={idx} className="cs-title-line">{line}</span>
                  ))}
                </h2>

                <p className="cs-desc cs-item">{c.desc}</p>

                <div className="cs-tags cs-item">
                  {c.tags.map((t) => <span key={t}>{t}</span>)}
                </div>

                <a href={c.href} className="cs-link cs-item">
                  {c.linkText} <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="cs-dots" aria-hidden="true">
            {CATEGORY_SLIDES.map((c) => <span className="cs-dot" key={c.id} />)}
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
      
      {/* Sizes / Formats — Expanding Panels */}
      <section
        className="sizes-carousel-section"
        style={{
          padding: '4rem 4%',
          background: '#1c1c1a',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div className="sizes-header">
          <div className="sizes-header-left">
            <span className="subtitle">Luxurious Collection</span>
            <h2 className="title">
              Discover Perfect Tile Sizes for Every Unique Space
            </h2>
          </div>
        </div>

        <div className="sizes-divider" />

        {/* Expanding Panels */}
        <div className="sizes-panels">
          {[
            {
              id: 1,
              size: '1600×3200',
              thk: '6mm',
              type: 'SLAB',
              img: '/images/size-previews/tile-1600x3200.webp',
              description:
                'Monumental surfaces designed for seamless architecture and expansive interiors.',
            },
            {
              id: 2,
              size: '1200×3200',
              thk: '6mm',
              type: 'SLAB',
              img: '/images/size-previews/tile-1200x3200.webp',
              description:
                'A dramatic large-format surface for sophisticated contemporary spaces.',
            },
            {
              id: 3,
              size: '1200×3000',
              thk: '6mm',
              type: 'SLAB',
              img: '/images/size-previews/tile-1200x3000.webp',
              description:
                'Natural stone character with generous proportions and visual continuity.',
            },
            {
              id: 4,
              size: '1200×2800',
              thk: '6mm',
              type: 'SLAB',
              img: '/images/size-previews/tile-1200x2800.webp',
              description:
                'Elegant marble-inspired surfaces for refined architectural applications.',
            },
            {
              id: 5,
              size: '1200×2400',
              thk: '9mm',
              type: 'SLAB',
              img: '/images/size-previews/tile-1200x2400.webp',
              description:
                'A versatile slab format that brings scale and sophistication to interiors.',
            },
            {
              id: 6,
              size: '1200×1800',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-1200x1800.webp',
              description:
                'A generous format that creates a strong visual foundation for a space.',
            },
            {
              id: 7,
              size: '1200×1200',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-1200x1200.webp',
              description:
                'A confident square format for balanced layouts and modern interiors.',
            },
            {
              id: 8,
              size: '800×3200',
              thk: '9mm',
              type: 'SLAB',
              img: '/images/size-previews/tile-800x3200.webp',
              description:
                'An expressive format that pairs distinctive surfaces with modern design.',
            },
            {
              id: 9,
              size: '800×3000',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-800x3000.webp',
              description:
                'Tall, elegant proportions for walls and carefully composed interiors.',
            },
            {
              id: 10,
              size: '800×2400',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-800x2400.webp',
              description:
                'A balanced large-format tile for clean lines and understated luxury.',
            },
            {
              id: 11,
              size: '800×1600',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-800x1600.webp',
              description:
                'A contemporary rectangular format with a natural, tactile appearance.',
            },
            {
              id: 12,
              size: '800×800',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-800x800.webp',
              description:
                'A timeless square format suited to a wide range of applications.',
            },
            {
              id: 13,
              size: '600×1200',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-600x1200.webp',
              description:
                'A practical rectangular format that brings elegance to everyday spaces.',
            },
            {
              id: 14,
              size: '600×600',
              thk: '9mm',
              type: 'TILE',
              img: '/images/size-previews/tile-600x600.webp',
              description:
                'A compact square format for versatile layouts and distinctive surfaces.',
            },
          ].map((item) => (
            <SizePanel
              key={item.id}
              item={item}
              isActive={activeSizeId === item.id}
              onActivate={(id) => setActiveSizeId(id)}
              onDeactivate={(id) => setActiveSizeId((cur) => (cur === id ? null : cur))}
              onToggle={(id) => setActiveSizeId((cur) => (cur === id ? null : id))}
            />
          ))}
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

      {/* Inspiration Section (cursor-follow preview) */}
      <InspirationSection />

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