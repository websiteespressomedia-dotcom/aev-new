import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
import "./CoreValues.css";
 
gsap.registerPlugin(ScrollTrigger);
 
/* =========================================================
   CONTENT  (edit the words / tags / image paths here)
   ========================================================= */
 
const INTRO =
  "Five principles that guide how we select, supply and support every project.";
 
const VALUES = [
  {
    id: "01",
    title: "Curated Excellence",
    description:
      "We carefully select tile collections from trusted manufacturing partners to offer designs that balance aesthetics, performance, and market demand.",
    tags: ["Selection", "Design", "Performance"],
    image: "/images/hero/core1.avif",
  },
  {
    id: "02",
    title: "Reliable Supply",
    description:
      "Our focus is on consistency, transparency, and smooth coordination — ensuring our partners receive the right solutions when they need them.",
    tags: ["Consistency", "Transparency", "On time"],
    image: "/images/hero/core2.avif",
  },
  {
    id: "03",
    title: "Global Approach",
    description:
      "We understand diverse market needs and deliver tile solutions designed to serve international showrooms, projects, and professionals.",
    tags: ["Showrooms", "Projects", "Export"],
    image: "/images/hero/core3.avif",
  },
  {
    id: "04",
    title: "Quality Assurance",
    description:
      "Every collection is aligned with expectations of durability, finish, and long-term performance.",
    tags: ["Durability", "Finish", "Testing"],
    image: "/images/hero/core4.avif",
  },
  {
    id: "05",
    title: "Partnership Driven",
    description:
      "We build lasting relationships by supporting our clients beyond supply — becoming a dependable extension of their business.",
    tags: ["Support", "Trust", "Long term"],
    image: "/marble_texture.jpg",
  },
];
 
const pad = (n) => String(n).padStart(2, "0");
 
/* =========================================================
   COMPONENT
   ---------------------------------------------------------
   The section pins. As you scroll, each value card rises from
   the bottom and lands on top of the previous one; the cards
   underneath shrink and dim so the pile stays visible.
   ========================================================= */
 
const CoreValues = () => {
  const rootRef = useRef(null);
  const jumpRef = useRef(null); // lets the index list scroll to a card
  const [active, setActive] = useState(0);
 
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
 
    const mm = gsap.matchMedia();
 
    // NOTE: matchMedia only runs this function when at least one listed query matches,
    // so "all" is a catch-all that is always true.
    mm.add({ reduce: "(prefers-reduced-motion: reduce)", all: "(min-width: 0px)" }, (context) => {
      const { reduce } = context.conditions || {};
 
      /* reduced motion: a plain vertical list, no pin */
      if (reduce) {
        root.classList.add("cv-static");
        return () => root.classList.remove("cv-static");
      }
 
      const cards = gsap.utils.toArray(".cv-card", root);
      const imgs = gsap.utils.toArray(".cv-card-img", root);
      const dims = gsap.utils.toArray(".cv-card-dim", root);
      const bodies = cards.map((c) => gsap.utils.toArray(".cv-card-body > *", c));
      const aside = gsap.utils.toArray(".cv-aside-in", root);
      const n = cards.length;
      if (n === 0) return undefined;
 
      /* ---------- start state ---------- */
      cards.forEach((c, i) => {
        gsap.set(c, { yPercent: i === 0 ? 0 : 106, transformOrigin: "50% 0%" });
        gsap.set(imgs[i], { scale: i === 0 ? 1 : 1.2 });
        gsap.set(dims[i], { opacity: 0 });
        gsap.set(bodies[i], { opacity: 0, y: 30 });
      });
      gsap.set(aside, { opacity: 0, y: 26 });
 
      /* ---------- entrance (plays once as the section arrives) ---------- */
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: "top 75%", once: true } })
        .to(aside, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" })
        .to(bodies[0], { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.5");
 
      /* ---------- scroll story ---------- */
      const mids = [0];
      const STEP = 1.5; // timeline length per card (move + hold)
      const MOVE = 1.1; // how long a card takes to rise
 
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * (0.8 * (n - 1) + 0.4)),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // AboutHero pin = 2, Mission & Vision pin = 1, this one uses the default (0)
        },
        onUpdate: () => {
          const t = tl.time();
          let idx = 0;
          mids.forEach((m, i) => {
            if (t >= m) idx = i;
          });
          setActive(idx);
        },
      });
 
      tl.to({}, { duration: 0.3 }); // short hold on card 1
 
      for (let i = 1; i < n; i++) {
        const t0 = 0.3 + (i - 1) * STEP;
        mids[i] = t0 + MOVE * 0.5;
 
        // new card rises and lands
        tl.to(cards[i], { yPercent: 0, duration: MOVE }, t0)
          .to(imgs[i], { scale: 1, duration: MOVE + 0.4, ease: "power2.out" }, t0)
          .to(bodies[i], { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, t0 + 0.55);
 
        // everything underneath shrinks, steps back and darkens
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            { scale: 1 - depth * 0.04, y: -depth * 14, duration: MOVE },
            t0
          ).to(dims[j], { opacity: Math.min(0.55, depth * 0.2), duration: MOVE }, t0);
        }
      }
 
      tl.to({}, { duration: 0.5 }); // hold on the last card before the page continues
 
      /* clicking a name in the left index scrolls to that card */
      jumpRef.current = (i) => {
        const st = tl.scrollTrigger;
        if (!st) return;
        const time = i === 0 ? 0 : 0.3 + (i - 1) * STEP + MOVE; // moment card i has landed
        const progress = Math.min(1, time / tl.duration());
        window.scrollTo({ top: st.start + (st.end - st.start) * progress, behavior: "smooth" });
      };
 
      return () => {
        jumpRef.current = null;
        tl.kill();
      };
    });
 
    return () => mm.revert();
  }, []);
 
  return (
    <section ref={rootRef} className="cv" aria-labelledby="cv-title">
      <div className="cv-inner">
        {/* ---------- left: title + live index ---------- */}
        <aside className="cv-aside">
          <div className="cv-eyebrow cv-aside-in">
            <i />
            <span>Our Philosophy</span>
          </div>
 
          <h2 id="cv-title" className="cv-title cv-aside-in">
            Core
            <br />
            Values
          </h2>
 
          <p className="cv-intro cv-aside-in">{INTRO}</p>
 
          <div className="cv-counter cv-aside-in" aria-hidden="true">
            <span className="cv-count-num" key={active}>
              {pad(active + 1)}
            </span>
            <span className="cv-count-total">/ {pad(VALUES.length)}</span>
          </div>
 
          <ul className="cv-ticks cv-aside-in">
            {VALUES.map((v, i) => (
              <li
                className={`cv-tick${active === i ? " is-active" : ""}`}
                key={v.id}
                role="button"
                tabIndex={0}
                onClick={() => jumpRef.current && jumpRef.current(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (jumpRef.current) jumpRef.current(i);
                  }
                }}
              >
                <i />
                <span>{v.title}</span>
              </li>
            ))}
          </ul>
        </aside>
 
        {/* ---------- right: pile of cards ---------- */}
        <div className="cv-stage">
          {VALUES.map((v, i) => (
            <article className="cv-card" key={v.id} aria-label={v.title}>
              <img className="cv-card-img" src={v.image} alt={v.title} />
              <div className="cv-card-shade" />
 
              <div className="cv-card-top">
                <span>Core value</span>
                <span>
                  {pad(i + 1)} / {pad(VALUES.length)}
                </span>
              </div>
 
              <div className="cv-card-body">
                <span className="cv-card-num">{v.id}</span>
                <h3 className="cv-card-title">{v.title}</h3>
                <p className="cv-card-desc">{v.description}</p>
                <div className="cv-tags">
                  {v.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
 
              <div className="cv-card-dim" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default CoreValues;
 