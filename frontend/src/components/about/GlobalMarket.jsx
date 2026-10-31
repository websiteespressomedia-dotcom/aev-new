import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GlobalMarket.css";

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  "Aevitas Ceramics is an Indian porcelain tile brand focused on delivering premium porcelain tiles and large format tile solutions for international markets. With a commitment to contemporary design, manufacturing quality, and reliable product standards, we aim to serve importers, distributors, wholesalers, architects, and project suppliers seeking dependable surface solutions.",
  "Our approach combines design-driven porcelain collections with a focus on product consistency, careful packaging, and export-oriented supply requirements. From residential interiors and commercial developments to hospitality spaces and large-scale architectural projects, Aevitas Ceramics offers tile solutions tailored to diverse design and application needs.",
  "We believe successful international partnerships are built on quality, consistency, and trust. As we expand our global reach, our goal is to establish lasting relationships with buyers and distribution partners by delivering thoughtfully designed porcelain surfaces backed by a commitment to dependable service.",
];

const [LEAD, ...REST] = PARAGRAPHS;

export default function GlobalMarket() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = (s) => gsap.utils.toArray(s, section);
      const titleLines = q(".gm-title-line");
      const lead = section.querySelector(".gm-lead");
      const cols = q(".gm-col");
      const rule = section.querySelector(".gm-rule");
      const note = section.querySelector(".gm-bottom-note");
      const frame = section.querySelector(".gm-image-frame");
      const block = section.querySelector(".gm-visual-block");
      const image = section.querySelector(".gm-image");

      gsap.set(titleLines, { yPercent: 108 });
      gsap.set([lead, ...cols, note], { autoAlpha: 0, y: 22 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(frame, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(block, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(image, { scale: 1.18 });

      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
          defaults: { ease: "power3.out" },
        })
        .to(titleLines, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" })
        .to(block, { scaleY: 1, duration: 0.9, ease: "power3.inOut" }, 0.2)
        .to(frame, { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut" }, 0.3)
        .to(image, { scale: 1, duration: 1.6 }, 0.3)
        .to(lead, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .to(rule, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.9)
        .to(cols, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, 1)
        .to(note, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.3);

      /* the photo drifts a little slower than the page */
      gsap.to(image, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
    }, section);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-global-markets-section"
      aria-labelledby="global-markets-title"
    >
      <div className="gm-wrap">
        <h2 className="gm-title" id="global-markets-title">
          <span className="gm-title-mask">
            <span className="gm-title-line">Bringing Premium Porcelain Tile</span>
          </span>
          <span className="gm-title-mask gm-title-accent">
            <span className="gm-title-line">Solutions to Global Markets</span>
          </span>
        </h2>

        <div className="gm-layout">
          {/* ---------- photo (left): tall portrait on a flat colour block ---------- */}
          <div className="gm-visual">
            <span className="gm-visual-block" aria-hidden="true" />
            <div className="gm-image-frame">
              <img
                className="gm-image"
                src="/images/global-markets-porcelain.png"
                alt="Premium porcelain surfaces in a contemporary architectural interior"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* ---------- text (right): lead paragraph, then two supporting ones ---------- */}
          <div className="gm-content">
            <p className="gm-lead">{LEAD}</p>

            <div className="gm-rule" />

            <div className="gm-cols">
              {REST.map((paragraph, i) => (
                <p className="gm-col" key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="gm-bottom-note">
              <span className="gm-bottom-line" aria-hidden="true" />
              <span>Quality · Consistency · Trust</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}