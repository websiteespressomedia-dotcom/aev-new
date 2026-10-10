"use client";
 
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
import "./AboutHero.css";
 
gsap.registerPlugin(ScrollTrigger);
 
/* =========================================================
   CONTENT  (edit the words / numbers / video here)
   ========================================================= */
 
const VIDEO_SRC = "/videos/reel1.mp4";
 
const TITLE_WORDS = ["About", "Us"];
 
const SUBTITLE =
  "Aevitas Ceramic bridges the gap between India’s renowned ceramic manufacturing ecosystem and global design markets.";
 
const STORY =
  "We help businesses worldwide access thoughtfully selected tile collections through a reliable supply network built on quality, consistency, and trust. Working with established manufacturers from Morbi, we deliver ceramic solutions that meet the evolving needs of showrooms, architects, developers, and project professionals across international markets. From contemporary designs to dependable project supply, we focus on making tile sourcing simpler, smoother, and more efficient — helping our partners create inspiring spaces with confidence.";
 
/* words that fill in gold instead of ivory */
const GOLD_WORDS = ["quality,", "consistency,", "trust.", "Morbi,", "confidence."];
 
const STATS = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];
 
const IVORY = "#F2F0E9";
const GOLD = "#C1A673";
 
/* =========================================================
   COMPONENT
   ========================================================= */
 
const AboutHero = () => {
  const rootRef = useRef<HTMLElement | null>(null);
 
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
 
    const q = <T extends HTMLElement>(sel: string): T[] =>
      gsap.utils.toArray<T>(sel, root);
    const one = <T extends HTMLElement>(sel: string): T | null =>
      root.querySelector<T>(sel);
 
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = () => window.innerWidth < 768;
 
    const ctx = gsap.context(() => {
      const video = one<HTMLDivElement>(".abh-video");
      const hero = one<HTMLDivElement>(".abh-hero");
      const hint = one<HTMLDivElement>(".abh-scroll");
      const panel = one<HTMLDivElement>(".abh-panel");
      const heroEyebrow = one<HTMLDivElement>(".abh-hero .abh-eyebrow");
      const chars = q<HTMLSpanElement>(".abh-char");
      const sub = one<HTMLParagraphElement>(".abh-sub");
      const hintInner = one<HTMLDivElement>(".abh-scroll-inner");
 
      const storyEyebrowLine = one<HTMLElement>(".abh-story .abh-eyebrow i");
      const storyEyebrowText = one<HTMLElement>(".abh-story .abh-eyebrow span");
      const words = q<HTMLSpanElement>(".abh-word");
      const statLines = q<HTMLElement>(".abh-stat-line");
      const statLabels = q<HTMLElement>(".abh-stat-label");
      const stats = q<HTMLElement>(".abh-stat");
 
      if (!video || !hero || !hint || !panel) return;
 
      /* ---------- reduced motion: show the story, no scroll effects ---------- */
      if (reduce) {
        gsap.set(panel, { clipPath: "circle(142% at 50% 50%)" });
        gsap.set([hero, hint], { autoAlpha: 0 });
        words.forEach((w) => gsap.set(w, { color: w.dataset.fill || IVORY }));
        stats.forEach((s) => {
          const num = s.querySelector<HTMLElement>(".abh-count");
          if (num) num.textContent = s.dataset.value || "0";
        });
        return;
      }
 
      /* ---------- intro (plays once on load) ---------- */
      gsap.set(chars, { yPercent: 118 });
      gsap.set(heroEyebrow, { opacity: 0, y: 14 });
      gsap.set(sub, { opacity: 0, filter: "blur(8px)" });
      gsap.set(hintInner, { opacity: 0 });
 
      gsap
        .timeline({ delay: 0.2 })
        .to(heroEyebrow, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
        .to(chars, { yPercent: 0, duration: 1.2, stagger: 0.07, ease: "power4.out" }, "-=0.5")
        .to(sub, { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }, "-=0.7")
        .to(hintInner, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
 
      /* ---------- start state for the scroll story ---------- */
      gsap.set(panel, { clipPath: "circle(0% at 50% 50%)" });
      if (storyEyebrowLine) gsap.set(storyEyebrowLine, { scaleX: 0, transformOrigin: "left center" });
      if (storyEyebrowText) gsap.set(storyEyebrowText, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(statLines, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(statLabels, { opacity: 0 });
 
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * (isMobile() ? 3 : 3.4)),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2, // first pinned section on the page: measure it first
        },
      });
 
      /* 1. hero text drifts away, video slowly zooms, a charcoal "iris" opens from the centre */
      tl.to(video, { scale: 1.12, duration: 3.4 }, 0)
        .to(hint, { opacity: 0, y: 12, duration: 0.5 }, 0)
        .to(hero, { scale: 1.08, opacity: 0, yPercent: -6, duration: 1, ease: "power2.in" }, 0.15)
        .to(panel, { clipPath: "circle(142% at 50% 50%)", duration: 1.5, ease: "power2.inOut" }, 0.35);
 
      /* 2. story label draws */
      if (storyEyebrowLine && storyEyebrowText) {
        tl.to(storyEyebrowLine, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 1.7)
          .to(storyEyebrowText, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, 1.8);
      }
 
      /* 3. paragraph fills word by word */
      tl.to(
        words,
        {
          color: (_i: number, el: Element) => (el as HTMLElement).dataset.fill || IVORY,
          duration: 0.3,
          stagger: { amount: 1.6 },
        },
        1.95
      );
 
      /* 4. stats: gold line draws + numbers count up */
      tl.to(statLines, { scaleX: 1, duration: 0.7, stagger: 0.2, ease: "power2.inOut" }, 3.5);
 
      stats.forEach((s, i) => {
        const num = s.querySelector<HTMLElement>(".abh-count");
        if (!num) return;
        const target = Number(s.dataset.value || 0);
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: target,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v));
            },
          },
          3.6 + i * 0.2
        );
      });
 
      tl.to(statLabels, { opacity: 1, duration: 0.6, stagger: 0.2 }, 4.1);
 
      /* 5. short hold before the page continues */
      tl.to({}, { duration: 0.7 });
    }, root);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section ref={rootRef} className="abh" aria-label="About Aevitas Ceramics">
      {/* background video */}
      <div className="abh-video">
        <video autoPlay loop muted playsInline preload="auto">
          {/* <source src={VIDEO_SRCC} type="video/mp4" /> */}
        </video>
      </div>
 
      {/* step 1: title */}
      <div className="abh-hero">
        <div className="abh-eyebrow">
          <i />
          <span>Aevitas Ceramics</span>
          <i />
        </div>
 
        <h1 className="abh-title" aria-label={TITLE_WORDS.join(" ")}>
          {TITLE_WORDS.map((word) => (
            <span className="abh-title-word" key={word} aria-hidden="true">
              {word.split("").map((c, i) => (
                <span className="abh-char-wrap" key={i}>
                  <span className="abh-char">{c}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
 
        <p className="abh-sub">{SUBTITLE}</p>
      </div>
 
      <div className="abh-scroll" aria-hidden="true">
        <div className="abh-scroll-inner">
          <span className="abh-scroll-ring">
            <span className="abh-scroll-dot" />
          </span>
          <span>Scroll</span>
        </div>
      </div>
 
      {/* step 2: story panel that opens like an iris */}
      <div className="abh-panel">
        <div className="abh-story">
          <div className="abh-eyebrow">
            <i />
            <span>Who We Are</span>
          </div>
 
          <p className="abh-para">
            {STORY.split(" ").map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className="abh-word"
                  data-fill={GOLD_WORDS.includes(word) ? GOLD : IVORY}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            ))}
          </p>
 
          <div className="abh-stats">
            {STATS.map((s) => (
              <div className="abh-stat" key={s.label} data-value={s.value}>
                <span className="abh-stat-line" />
                <div className="abh-stat-num">
                  <span className="abh-count">0</span>
                  <span className="abh-stat-suf">{s.suffix}</span>
                </div>
                <span className="abh-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default AboutHero;
 