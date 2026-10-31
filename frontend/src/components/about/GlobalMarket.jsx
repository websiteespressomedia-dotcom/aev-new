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

export default function GlobalMarket() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const targets = (selector) => gsap.utils.toArray(selector, section);
      const eyebrow = section.querySelector(".gm-eyebrow");
      const titleLines = targets(".gm-title-line");
      const rule = section.querySelector(".gm-rule");
      const paragraphs = targets(".gm-copy p");
      const frame = section.querySelector(".gm-image-frame");
      const image = section.querySelector(".gm-image");
      const labels = targets(".gm-image-label, .gm-bottom-note");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(section.querySelectorAll("*"), { clearProps: "all" });
        return;
      }

      gsap.set(eyebrow, { autoAlpha: 0, y: 14 });
      gsap.set(titleLines, { autoAlpha: 0, yPercent: 105, rotateX: 5 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(paragraphs, { autoAlpha: 0, y: 18 });
      gsap.set(frame, { clipPath: "inset(0 0 0 100%)" });
      gsap.set(image, { scale: 1.08 });
      gsap.set(labels, { autoAlpha: 0, y: 10 });

      const entrance = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      });

      entrance
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5 })
        .to(titleLines, {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.1,
        }, "-=0.15")
        .to(rule, { scaleX: 1, duration: 0.55 }, "-=0.25")
        .to(paragraphs, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.1")
        .to(frame, { clipPath: "inset(0 0 0 0%)", duration: 0.9, ease: "power3.inOut" }, 0.15)
        .to(image, { scale: 1, duration: 1.1, ease: "power3.out" }, "<")
        .to(labels, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 }, "-=0.25");

      gsap.to(image, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-global-markets-section"
      aria-labelledby="global-markets-title"
    >

      <header className="gm-heading-block">

        <h2 className="gm-title" id="global-markets-title">
          <span className="gm-title-mask">
            <span className="gm-title-line">Bringing Premium Porcelain Tile</span>
          </span>
          <span className="gm-title-mask gm-title-accent">
            <span className="gm-title-line">Solutions to Global Markets</span>
          </span>
        </h2>
      </header>

      <div className="gm-rule" />

      <div className="gm-layout">
        <div className="gm-content">
          <div className="gm-copy">
            {PARAGRAPHS.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="gm-bottom-note">
            <span className="gm-bottom-line" aria-hidden="true" />
            <span>Quality · Consistency · Trust</span>
          </div>
        </div>

        <div className="gm-visual">
          <div className="gm-image-frame">
            <img
              className="gm-image"
              src="/images/global-markets-porcelain.png"
              alt="Premium porcelain surfaces in a contemporary architectural interior"
              loading="lazy"
              decoding="async"
            />
            <div className="gm-image-shade" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
