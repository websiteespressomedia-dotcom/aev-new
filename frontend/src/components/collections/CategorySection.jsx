/* eslint-disable */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CategorySection.css";

const CATEGORIES = [
  {
    title: "Liso",
    descriptor: "Smooth / Elegant",
    description: "Clean, continuous surfaces that bring calm, clarity, and understated luxury to a space.",
    image: "/images/categories/marble.jpg",
    code: "01",
    detail: "Soft reflection",
  },
  {
    title: "Carving",
    descriptor: "Texture / Depth",
    description: "Sculpted surfaces create a tactile play of shadow, depth, and architectural character.",
    image: "/images/categories/granite.png",
    code: "02",
    detail: "Sculpted relief",
  },
  {
    title: "Highglossy",
    descriptor: "Light / Brilliance",
    description: "A luminous finish that catches changing light and gives interiors a crisp, polished presence.",
    image: "/images/categories/quartz.jpg",
    code: "03",
    detail: "High reflection",
  },
  {
    title: "Liso+Carving",
    descriptor: "Contrast / Balance",
    description: "The precision of a smooth finish meets carved detail for a layered, distinctive surface.",
    image: "/images/categories/porcelain.webp",
    code: "04",
    detail: "Dual character",
  },
];

export default function CategorySection() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const [active, setActive] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const current = CATEGORIES[active];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".aev-finish__topline, .aev-finish__heading, .aev-finish__selector",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".aev-finish__stage",
        { y: 65, opacity: 0, rotateX: 4 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );

      gsap.to(".aev-finish__orbit", {
        rotate: 360, duration: 42, repeat: -1, ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".aev-finish__stage-glow", {
        opacity: 0.8, scale: 1.12, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!imageRef.current || !titleRef.current || !copyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 0 0 100%)", scale: 1.12, x: 22 },
        { clipPath: "inset(0 0 0 0%)", scale: 1, x: 0, duration: 0.85, ease: "power4.inOut" }
      );
      gsap.fromTo(
        [titleRef.current, copyRef.current],
        { y: 24, opacity: 0, filter: "blur(7px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.1, ease: "power3.out", delay: 0.12 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [active, motionKey]);

  const chooseCategory = (index) => {
    if (index === active) return;
    setActive(index);
    setMotionKey((key) => key + 1);
  };

  const explore = () => {
    window.dispatchEvent(new CustomEvent("changeFilter", { detail: current.title }));
    const target = document.getElementById("product-listing");
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section ref={rootRef} className="aev-finish" aria-label="Explore finishes">
      <div className="aev-finish__ambient" aria-hidden="true" />
      <div className="aev-finish__topline">
        <span><i /> AEVITAS / FINISH INDEX</span>
        <span className="aev-finish__topline-right">MATERIAL STUDIES <b>— 04</b></span>
      </div>

      <div className="aev-finish__heading">
        <div>
          <p>Surface, reimagined</p>
          <h2>Find your <em>finish.</em></h2>
        </div>
        <span className="aev-finish__heading-note">Four expressions.<br />One material language.</span>
      </div>

      <div className="aev-finish__experience">
        <nav className="aev-finish__selector" aria-label="Choose a finish">
          {CATEGORIES.map((item, index) => (
            <button
              key={item.code}
              type="button"
              className={`aev-finish__option ${active === index ? "is-active" : ""}`}
              onClick={() => chooseCategory(index)}
              aria-pressed={active === index}
            >
              <span className="aev-finish__option-number">{item.code}</span>
              <span className="aev-finish__option-name">{item.title}</span>
              <span className="aev-finish__option-arrow">↗</span>
              <span className="aev-finish__option-track"><i /></span>
            </button>
          ))}
          <div className="aev-finish__selector-foot">
            <span>SELECT A SURFACE</span>
            <span>0{active + 1} / 04</span>
          </div>
        </nav>

        <div className="aev-finish__stage">
          <div className="aev-finish__stage-glow" aria-hidden="true" />
          <div className="aev-finish__orbit" aria-hidden="true">
            <span />
          </div>
          <div className="aev-finish__stage-image">
            <Image
              key={current.image}
              ref={imageRef}
              src={current.image}
              alt={`${current.title} ceramic finish`}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 64vw"
              className="aev-finish__image"
            />
            <div className="aev-finish__image-shade" />
            <span className="aev-finish__image-label">AEVITAS / {current.code}</span>
            <span className="aev-finish__image-detail">{current.detail}</span>
            <span className="aev-finish__image-cross" aria-hidden="true">+</span>
          </div>

          <div className="aev-finish__stage-caption">
            <span className="aev-finish__stage-index">{current.code}</span>
            <div className="aev-finish__stage-copy">
              <span className="aev-finish__descriptor">{current.descriptor}</span>
              <h3 ref={titleRef}>{current.title}<span>.</span></h3>
              <p ref={copyRef}>{current.description}</p>
              <button type="button" className="aev-finish__explore" onClick={explore}>
                Explore this finish <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="aev-finish__bottom">
        <span>FORM / TEXTURE / LIGHT</span>
        <div className="aev-finish__bottom-progress">
          <span style={{ width: `${((active + 1) / CATEGORIES.length) * 100}%` }} />
        </div>
        <span>SCROLL TO EXPLORE <b>↓</b></span>
      </div>
    </section>
  );
}
