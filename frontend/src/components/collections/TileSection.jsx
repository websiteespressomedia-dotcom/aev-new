"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TileSection.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONTENT  (edit sizes / images / words here)
   ========================================================= */

const TILE_CARDS = [
  { size: "800 × 1600", querySize: "800x1600", image: "/images/previews/liso/HONEY_WHITE.jpg.jpg", label: "Quiet elegance" },
  { size: "800 × 2400", querySize: "800x2400", image: "/images/previews/carving/ADLINE STATUARIO_EN-CR.jpg.jpg", label: "Architectural scale" },
  { size: "1200 × 1800", querySize: "1200x1800", image: "/images/previews/Glossy/AMO BIANCO.jpg.jpg", label: "Reflective beauty" },
  { size: "1200 × 2400", querySize: "1200x2400", image: "/images/previews/carving/MOCA RIVER.png.jpg", label: "Statement surfaces" },
];

/* =========================================================
   COMPONENT
   ---------------------------------------------------------
   Pinned scroll story (no big photo any more):
   1. a calm centred headline
   2. as you scroll it lifts away while the four tile cards
      leave a small pile in the middle and fan out into the
      four corners
   3. a thin measuring cross draws between them and a
      "Choose your scale" call-to-action appears in the centre
   ========================================================= */

export default function TileSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const intro = root.querySelector(".aev-tile-showcase__intro");
    const finalEl = root.querySelector(".aev-tile-showcase__final");
    const ruleH = root.querySelector(".aev-tile-showcase__rule--h");
    const ruleV = root.querySelector(".aev-tile-showcase__rule--v");
    const node = root.querySelector(".aev-tile-showcase__node");
    const ghost = root.querySelector(".aev-tile-showcase__ghost");
    const cards = gsap.utils.toArray(".aev-tile-showcase__card", root);
    if (!intro || !finalEl || !cards.length) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    const build = (mobile) => {
      /* where each card ends up (in vw / vh, measured from the centre) */
      const xs = mobile ? [-23, 23, -23, 23] : [-27, 27, -27, 27];
      const ys = mobile ? [-19, -19, 10, 10] : [-22, -22, 22, 22];
      const rest = [-2.5, 2, 2.5, -2]; // final tilt in degrees
      /* the small pile they start in */
      const pile = [
        { x: -22, y: 12, r: -8 },
        { x: 20, y: -10, r: 6 },
        { x: -10, y: -16, r: -3 },
        { x: 14, y: 16, r: 9 },
      ];

      const px = (i) => (xs[i] * window.innerWidth) / 100;
      const py = (i) => (ys[i] * window.innerHeight) / 100;

      /* ---------- start state ---------- */
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: pile[i].x,
          y: pile[i].y,
          rotate: pile[i].r,
          scale: 0.82,
          autoAlpha: 0,
        });
      });
      gsap.set(finalEl, { autoAlpha: 0, y: 26 });
      gsap.set(ruleH, { scaleX: 0 });
      gsap.set(ruleV, { scaleY: 0 });
      gsap.set(node, { scale: 0 });
      gsap.set(ghost, { xPercent: -6 });

      /* ---------- reduced motion: show the finished layout, no pin ---------- */
      if (reduce) {
        cards.forEach((card, i) => {
          gsap.set(card, { x: px(i), y: py(i), rotate: rest[i], scale: 1, autoAlpha: 1 });
        });
        gsap.set(intro, { autoAlpha: 0 });
        gsap.set(finalEl, { autoAlpha: 1, y: 0 });
        gsap.set([ruleH, ruleV, node], { scale: 1 });
        return undefined;
      }

      /* ---------- scroll story ---------- */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: mobile ? "+=150%" : "+=240%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* headline lifts away, background word drifts */
      tl.to(intro, { y: -46, autoAlpha: 0, scale: 0.94, ease: "power2.in", duration: 0.3 }, 0);
      tl.to(ghost, { xPercent: 6, duration: 1 }, 0);

      /* cards leave the pile and fan out one after another */
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: () => px(i),
            y: () => py(i),
            rotate: rest[i],
            scale: 1,
            autoAlpha: 1,
            ease: "power3.out",
            duration: 0.52,
          },
          0.12 + i * 0.045
        );
      });

      /* thin measuring cross draws between the cards */
      tl.to(ruleH, { scaleX: 1, ease: "power2.inOut", duration: 0.4 }, 0.32);
      tl.to(ruleV, { scaleY: 1, ease: "power2.inOut", duration: 0.4 }, 0.36);
      tl.to(node, { scale: 1, ease: "back.out(2)", duration: 0.25 }, 0.62);

      /* call-to-action settles in the centre */
      tl.to(finalEl, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.26 }, 0.64);

      /* short hold on the finished layout before the page continues */
      tl.to({}, { duration: 0.1 }, 0.9);

      return undefined;
    };

    mm.add("(min-width: 768px)", () => build(false));
    mm.add("(max-width: 767px)", () => build(true));

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="aev-tile-showcase" aria-label="Explore tile sizes">
      <div className="aev-tile-showcase__grain" aria-hidden="true" />
      <div className="aev-tile-showcase__ghost" aria-hidden="true">Sizes</div>

      {/* measuring cross */}
      <div className="aev-tile-showcase__rule aev-tile-showcase__rule--h" aria-hidden="true" />
      <div className="aev-tile-showcase__rule aev-tile-showcase__rule--v" aria-hidden="true" />
      <div className="aev-tile-showcase__node" aria-hidden="true" />

      <div className="aev-tile-showcase__header">
        <span>AEVITAS / SURFACE STUDIES</span>
        <span className="aev-tile-showcase__counter">01 — 04</span>
      </div>

      {/* step 1: headline */}
      <div className="aev-tile-showcase__intro-wrap">
        <div className="aev-tile-showcase__intro">
          <div className="aev-tile-showcase__eyebrow">Form follows feeling</div>
          <h2>
            Made to
            <br />
            <em>move space.</em>
          </h2>
          <div className="aev-tile-showcase__copy">
            Discover the scale, texture and character of surfaces designed to shape the
            atmosphere of a room.
          </div>
          <span className="aev-tile-showcase__scroll-cue">
            SCROLL TO REVEAL <span aria-hidden="true">↓</span>
          </span>
        </div>
      </div>

      {/* step 3: centre call-to-action */}
      <div className="aev-tile-showcase__final-wrap">
        <div className="aev-tile-showcase__final">
          <div className="aev-tile-showcase__eyebrow">Four signature formats</div>
          <div className="aev-tile-showcase__final-title">
            Choose your <em>scale.</em>
          </div>
          <div className="aev-tile-showcase__final-copy">
            From slender planks to grand slabs, find the size that fits your space.
          </div>
          <Link href="/collections" className="aev-tile-showcase__cta">
            <span>Explore all sizes</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      {/* step 2: the four cards */}
      {TILE_CARDS.map((card, index) => (
        <div
          key={card.querySize}
          className={`aev-tile-showcase__card aev-tile-showcase__card--${index + 1}`}
        >
          <Link href={`/collections?size=${card.querySize}`} className="aev-tile-showcase__card-link">
            <div className="aev-tile-showcase__card-image">
              <Image
                src={card.image}
                alt={`${card.size} porcelain tile`}
                fill
                sizes="(max-width: 767px) 44vw, 24vw"
                className="aev-tile-showcase__tile-img"
              />
              <span className="aev-tile-showcase__card-number">0{index + 1}</span>
              <span className="aev-tile-showcase__card-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="aev-tile-showcase__card-meta">
              <span className="aev-tile-showcase__card-label">{card.label}</span>
              <strong>{card.size}</strong>
              <small>MM / EXPLORE SIZE</small>
            </div>
          </Link>
        </div>
      ))}

      <div className="aev-tile-showcase__footer">
        <span>PRECISION IN EVERY DIMENSION</span>
        <span>SCROLL TO CONTINUE</span>
      </div>
    </section>
  );
}