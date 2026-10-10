"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";

const HeroSection = forwardRef(function HeroSection(_props, ref) {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
      (context) => {
        const isMobile = Boolean(context.conditions?.isMobile);
        const content = contentRef.current;
        if (!content) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: content,
            start: isMobile ? "top 8%" : "top 12%",
            end: isMobile ? "bottom top" : "bottom 5%",
            scrub: 0.8,
          },
        });

        timeline.to(content, {
          y: isMobile ? -24 : -64,
          opacity: 0,
          filter: "blur(4px)",
          ease: "none",
        });
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={ref} className="aev-hero" aria-labelledby="aev-hero-title">
      <div className="aev-hero__topline" aria-hidden="true">
        <span className="aev-hero__eyebrow">
          <span className="aev-hero__eyebrow-dot" />
          AEVITAS CERAMICS
        </span>
        <span className="aev-hero__index">DESIGN / MATERIAL / SPACE</span>
      </div>

      <div ref={contentRef} className="aev-hero__content">
        <p className="aev-hero__kicker">A considered study in surface</p>
        <h1 id="aev-hero-title" className="aev-hero__title">
          Curated<br /><em>Collections.</em>
        </h1>
        <div className="aev-hero__bottom">
          <span className="aev-hero__rule" aria-hidden="true" />
          <p className="aev-hero__description">
            A celebration of craftsmanship and timeless elegance, designed
            for spaces where every detail matters.
          </p>
        </div>
      </div>

      <div className="aev-hero__scroll" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className="aev-hero__scroll-line"><span /></span>
      </div>
      <span className="aev-hero__side-note" aria-hidden="true">
        MATERIALS FOR MODERN LIVING
      </span>
    </section>
  );
});

export default HeroSection;
