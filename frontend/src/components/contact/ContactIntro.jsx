"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ContactIntro.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactIntro() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const eyebrow = section.querySelector(".ci-eyebrow");
      const titleLines = section.querySelectorAll(".ci-title-line");
      const description = section.querySelector(".ci-description");
      const meta = section.querySelector(".ci-meta");
      const visual = section.querySelector(".ci-visual");
      const ring = section.querySelector(".ci-orbit");
      const video = section.querySelector(".ci-video");

      gsap.set([eyebrow, description, meta], { autoAlpha: 0, y: 18 });
      gsap.set(titleLines, { yPercent: 110 });
      gsap.set(visual, { autoAlpha: 0, scale: 0.88, rotate: -8 });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      intro
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.65 })
        .to(
          titleLines,
          { yPercent: 0, duration: 1.05, stagger: 0.13, ease: "power4.out" },
          "-=0.28"
        )
        .to(
          description,
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "-=0.48"
        )
        .to(
          meta,
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.42"
        )
        .to(
          visual,
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.15,
            ease: "power3.out",
          },
          "-=0.95"
        );

      gsap.to(ring, {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(video, {
        yPercent: 8,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(".ci-content", {
        y: -48,
        autoAlpha: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ci-section"
      aria-labelledby="ci-title"
    >
      <div className="ci-backdrop" aria-hidden="true">
        <video
          className="ci-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/categories/porcelain.webp"
        >
          <source src="/videos/reel1.mp4" type="video/mp4" />
        </video>
        <div className="ci-video-shade" />
        <div className="ci-grain" />
      </div>

      <div className="ci-content">
        <div className="ci-topline">
          <span className="ci-eyebrow">
            <span className="ci-eyebrow-rule" />
            Aevitas Ceramics
            <span className="ci-eyebrow-dot" />
            Here to help
          </span>
          <span className="ci-index">CONTACT <i> / </i> 01</span>
        </div>

        <div className="ci-main">
          <div className="ci-copy">
            <h1 className="ci-title" id="ci-title">
              <span className="ci-title-mask">
                <span className="ci-title-line">Let’s talk</span>
              </span>
              <span className="ci-title-mask">
                <span className="ci-title-line ci-title-accent">surfaces.</span>
              </span>
            </h1>

            <p className="ci-description">
              Have a project in mind? Tell us what you’re creating.
              We’ll help you find the right surface for the space.
            </p>

            <a className="ci-scroll-link" href="#contact-form">
              <span className="ci-scroll-line" />
              <span>Start a conversation</span>
              <span className="ci-scroll-arrow" aria-hidden="true">↘</span>
            </a>
          </div>

          <div className="ci-visual" aria-hidden="true">
            <div className="ci-orbit ci-orbit-outer" />
            <div className="ci-orbit ci-orbit-inner" />
            <div className="ci-orbit-core">
              <span className="ci-core-caption">MADE FOR</span>
              <span className="ci-core-word">living.</span>
              <span className="ci-core-number">A / 01</span>
            </div>
            <span className="ci-visual-cross ci-cross-one" />
            <span className="ci-visual-cross ci-cross-two" />
          </div>
        </div>

        <div className="ci-bottomline">
          <span className="ci-meta">Thoughtful materials. Lasting spaces.</span>
          <span className="ci-meta ci-bottom-right">
            <span className="ci-status-dot" />
            Ahmedabad · Morbi · India
          </span>
        </div>
      </div>
    </section>
  );
}
