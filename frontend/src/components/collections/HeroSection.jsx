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

      <div ref={contentRef} className="aev-hero__content">
        <p className="aev-hero__kicker">A considered study in surface</p>
        <h1 id="aev-hero-title" className="aev-hero__title">
          Premium Porcelain<br /><em>Tile Collections.</em>
        </h1>
        <div className="aev-hero__bottom">
          <span className="aev-hero__rule" aria-hidden="true" />
          <p className="aev-hero__description">
            Explore premium porcelain tile designs by Aevitas Ceramics.
            Discover refined finishes, contemporary surfaces and tile
            formats for residential and commercial spaces. Browse the
            collection and contact our team for product details.
          </p>
        </div>
      </div>

      <div className="aev-hero__scroll" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className="aev-hero__scroll-line"><span /></span>
      </div>
    </section>
  );
});

export default HeroSection;
