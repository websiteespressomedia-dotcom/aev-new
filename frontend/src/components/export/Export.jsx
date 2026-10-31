import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Export.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   IMAGES  — every picture on this page is set here.
   Replace the paths with your own files (public folder).
   ========================================================= */

const IMG = {
  hero: "/images/container-yard.png",                  // 1 · HERO background (full screen, dark overlay)
  intro: "/images/global-markets-porcelain.png",    // 2 · INTRO wide banner under the big paragraph
  supply: "/images/shipping.png",                // 4 · BULK SUPPLY photo above the numbered list
  process: "/images/tile-export.png",               // 5 · EXPORT PROCESS wide banner under the steps
  floor: "/floor_preview.jpg",                      // 7 · RANGE card 1  (Porcelain Tiles)
  large: "/lobi_preview.png",                    // 7 · RANGE card 2  (Large Format Tiles)
  specs: "/images/surface-finish.png",                     // 8 · SPECIFICATIONS photo above the list
  footer: "/images/footer-container-yard.png"
};

/* =========================================================
   CONTENT  (edit words here — no copy lives inside the JSX)
   ========================================================= */

const WHATSAPP_URL = "https://wa.me/919265901137";

const INK = "#352934"; // Keep in sync with --aev-export-text-primary in Export.css :root.
const GOLD = "#A78350"; // Keep in sync with --aev-export-accent in Export.css :root.

const HERO_EYEBROW = "Manufacturing & Exporting Porcelain Tiles from India";
const HERO_SUB =
  "Premium porcelain tiles for global markets — contemporary design, manufacturing expertise and a quality-focused approach, built for importers, distributors and project buyers.";

const INTRO =
  "Whether you are sourcing porcelain tiles for retail distribution, commercial developments, hospitality interiors or architectural projects, we welcome enquiries from buyers seeking a dependable Indian tile manufacturing partner. Our product vision combines refined aesthetics with practical performance, backed by product consistency, versatile designs and export-oriented supply planning.";
const INTRO_GOLD = ["consistency,", "dependable", "partner."];

const CAPABILITIES = [
  { t: "Porcelain floor tiles", d: "For residential and commercial interiors." },
  { t: "Large format tiles", d: "For spacious, contemporary environments." },
  { t: "Multiple sizes", d: "To suit different project requirements, subject to availability." },
  { t: "Stone-inspired designs", d: "Contemporary surfaces inspired by natural stone and modern architecture." },
  { t: "Surface finishes", d: "Different finishes according to the available product collection." },
];
const CAP_NOTE = "Modern surface aesthetics, versatile formats and applications across a variety of interior environments.";
const CAP_END = "Tile solutions that balance visual appeal, practical application and the needs of professional buyers.";

const SUPPLY_TEXT = [
  "Aevitas Ceramics aims to support buyers looking for structured porcelain tile sourcing for distribution, retail, and project-based requirements. We understand that commercial buyers need clear product specifications, consistent communication, and realistic supply planning when evaluating a manufacturing partner.",
];
const SUPPLY = [
  "Bulk order requirements for importers, distributors, and wholesalers.",
  "Product and size selection based on market demand and application.",
  "Order planning aligned with confirmed production capabilities.",
  "Packaging requirements appropriate to the selected products and shipment.",
  "Product specifications and quotations to support purchasing decisions.",
  "Long-term sourcing discussions for recurring business requirements.",
];
const SUPPLY_NOTE = "Each enquiry can be assessed according to product selection, order volume, destination market, and delivery expectations.";

const PROCESS_TEXT = [
  "India is an important source of ceramic and porcelain tile products for international trade. Aevitas Ceramics aims to connect Indian tile manufacturing capabilities with the requirements of buyers seeking contemporary porcelain surfaces for their respective markets.",
  "Our approach to export enquiries is centered on clear product information, transparent commercial discussions, and careful coordination of order requirements. From selecting suitable tile collections to reviewing packaging and shipment arrangements, we aim to establish a clear process for evaluating each international order.",
];
const PROCESS = [
  { t: "Product selection", d: "Product selection and technical specifications." },
  { t: "Quantity & quotation", d: "Quantity requirements and order quotations." },
  { t: "Packaging & shipment", d: "Packaging options and shipment preparation." },
  { t: "Documentation", d: "Commercial documentation requirements." },
  { t: "Freight & delivery", d: "Freight and delivery coordination, subject to the agreed shipping arrangement." },
];
const PROCESS_NOTE = "International supply arrangements will be confirmed according to product availability, production capacity, destination requirements, and mutually agreed terms.";

const WHY_TEXT =
  "India offers international buyers access to a broad tile manufacturing ecosystem, a diverse range of surface designs, and competitive sourcing opportunities. For businesses evaluating porcelain tile suppliers, working with an Indian manufacturer can open up options for developing collections suited to local customer preferences.";
const WHY = [
  { t: "Design-led product selection", d: "Contemporary porcelain tile aesthetics suited to changing interior and architectural preferences." },
  { t: "Versatile product applications", d: "Tile solutions for residential flooring, commercial interiors, and selected architectural applications." },
  { t: "Business-focused communication", d: "Clear discussions around product specifications, quantities, pricing, and supply expectations." },
  { t: "Quality-conscious sourcing", d: "An emphasis on understanding product characteristics and confirming relevant specifications before an order is placed." },
  { t: "Long-term business relationships", d: "A partnership-oriented approach for buyers seeking to develop dependable supply arrangements over time." },
];

const RANGE_TEXT = "Aevitas Ceramics focuses on two primary product categories, offering solutions for a variety of interior design and architectural needs.";
const RANGE = [
  {
    t: "Porcelain Tiles",
    d: "Porcelain tiles for residential and commercial flooring, selected for their contemporary appearance and suitability for modern interiors. Explore available designs, formats, and finishes to identify products aligned with your market or project requirements.",
    img: IMG.floor,
  },
  {
    t: "Large Format Tiles",
    d: "Large format tile solutions for projects that call for expansive surfaces and a refined architectural appearance. Depending on the available collection, these tiles can be considered for feature walls, interior applications, and selected design-led environments.",
    img: IMG.large,
  },
];
const RANGE_NOTE = "Contact our team to enquire about available sizes, finishes, product specifications, and bulk purchasing requirements.";

const SPECS_TEXT =
  "Choosing porcelain tiles for a commercial order requires attention to product specifications as well as appearance. Aevitas Ceramics aims to provide buyers with relevant product information to support product evaluation and purchasing decisions.";
const SPECS = [
  { t: "Dimensions & Thickness", d: "Information about available tile formats and thickness specifications." },
  { t: "Surface Appearance", d: "Details of the selected design, finish, texture, and visual characteristics." },
  { t: "Technical Properties", d: "Applicable product data relating to water absorption, strength, and other relevant performance characteristics." },
  { t: "Application Suitability", d: "Guidance on the intended use of a selected product based on its specifications." },
  { t: "Packaging & Order Preparation", d: "Details of product packaging and order arrangements confirmed for the proposed shipment." },
];
const SPECS_NOTE = "Specific performance figures, testing results, and compliance claims should be confirmed against the relevant product documentation.";

const FINAL_TEXT = [
  "We believe a successful supplier relationship begins with understanding the buyer's requirements. Importers, distributors, wholesalers, and project procurement teams may have different priorities when selecting a porcelain tile range, from market positioning and product variety to order quantities and shipment planning.",
  "Aevitas Ceramics welcomes business enquiries from companies interested in evaluating Indian porcelain tile products for their markets. Our goal is to establish a clear foundation for future cooperation through product discussions, commercial transparency, and realistic supply commitments.",
  "Whether you are exploring a new product category, evaluating potential suppliers, or planning a future tile collection, we invite you to connect with our team.",
];
const CTA_TEXT = [
  "Looking for an Indian supplier of porcelain floor tiles or large format tiles? Aevitas Ceramics welcomes enquiries from international importers, distributors, wholesalers, and project buyers.",
  "Share your destination country, preferred tile category, required sizes, estimated order quantity, and any specific project requirements. Our team can review your enquiry and discuss suitable products, pricing, availability, and potential shipping arrangements.",
];
const TAGLINE = "Aevitas Ceramics — Contemporary Porcelain Surfaces for a World of Possibilities.";

/* =========================================================
   SMALL HELPERS
   ========================================================= */

const pad = (n) => String(n + 1).padStart(2, "0");

const Mask = ({ children, cls = "" }) => (
  <span className="ex-mask">
    <span className={`ex-line ${cls}`}>{children}</span>
  </span>
);

const Paras = ({ items, cls = "ex-body" }) =>
  items.map((text, i) => (
    <p className={cls} data-rv key={i}>
      {text}
    </p>
  ));

/* framed photo with clip reveal + parallax (animated in the effect below) */
const Photo = ({ src, alt, caption, tall = false }) => (
  <figure className={`ex-photo${tall ? " is-tall" : ""}`}>
    <div className="ex-photo-box">
      <img src={src} alt={alt} loading="lazy" />
      <span className="ex-photo-shade" />
    </div>
    {caption && (
      <figcaption>
        <i />
        {caption}
      </figcaption>
    )}
  </figure>
);

/* =========================================================
   PAGE
   ========================================================= */

const Export = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const q = (s) => gsap.utils.toArray(s, root);
    const mm = gsap.matchMedia();

    /*
      Elements inside a sticky column move while they are stuck, so a trigger
      on them fires at the wrong time (or never). For those we trigger from
      the parent section instead.
    */
    const when = (el, start = "top 88%") =>
      el.closest(".ex-sticky")
        ? { trigger: el.closest("section"), start: "top 72%", once: true }
        : { trigger: el, start, once: true };

    const ctx = gsap.context(() => {
      /* ---------- everything (skipped for reduced motion) ---------- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* HERO intro */
        const chars = q(".ex-char");
        gsap.set(chars, { yPercent: 118 });
        gsap.set(".ex-hero-eyebrow", { opacity: 0, y: 14 });
        gsap.set(".ex-hero-sub", { opacity: 0, filter: "blur(8px)" });
        gsap.set(".ex-scroll", { opacity: 0 });

        gsap
          .timeline({ delay: 0.2 })
          .to(".ex-hero-eyebrow", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
          .to(chars, { yPercent: 0, duration: 1.2, stagger: 0.06, ease: "power4.out" }, "-=0.5")
          .to(".ex-hero-sub", { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }, "-=0.7")
          .to(".ex-scroll", { opacity: 1, duration: 0.8 }, "-=0.4");

        gsap.to(".ex-hero-in", {
          yPercent: -12, opacity: 0, scale: 1.05, ease: "none",
          scrollTrigger: { trigger: ".ex-hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".ex-hero-video", {
          scale: 1.15, yPercent: 8, ease: "none",
          scrollTrigger: { trigger: ".ex-hero", start: "top top", end: "bottom top", scrub: true },
        });

        /* headings: lines rise out of masks */
        q(".ex-head").forEach((h) => {
          const lines = h.querySelectorAll(".ex-line");
          if (!lines.length) return;
          // Animate from a hidden offset only when the heading actually enters view.
          // Unlike a standalone gsap.set(), this avoids permanently clipped headings
          // if ScrollTrigger refreshes late or the page is opened at a deep scroll position.
          gsap.fromTo(lines,
            { yPercent: 105 },
            {
              yPercent: 0,
              duration: 1.05,
              stagger: 0.12,
              ease: "power4.out",
              immediateRender: false,
              scrollTrigger: { ...when(h, "top 85%"), invalidateOnRefresh: true },
            }
          );
        });

        /* gold rules draw */
        q("[data-line]").forEach((el) => {
          gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(el, { scaleX: 1, duration: 1.1, ease: "power3.inOut", scrollTrigger: when(el, "top 90%") });
        });

        /* body copy fades up (paragraphs in a sticky column stagger in) */
        q("[data-rv]").forEach((el) => {
          const sticky = el.closest(".ex-sticky");
          const order = sticky ? Array.from(sticky.querySelectorAll("[data-rv]")).indexOf(el) : 0;
          gsap.fromTo(el,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1, y: 0, duration: 0.85,
              delay: sticky ? 0.18 + order * 0.12 : 0,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: { ...when(el), invalidateOnRefresh: true },
            }
          );
        });

        /* intro paragraph fills word by word with scroll */
        gsap.to(q(".ex-word"), {
          color: (_i, el) => el.dataset.fill || INK,
          stagger: 0.1, duration: 1, ease: "none",
          scrollTrigger: { trigger: ".ex-para", start: "top 78%", end: "bottom 50%", scrub: true },
        });

        /* supply rows */
        q(".ex-supply-row").forEach((row) => {
          gsap.set(row, { autoAlpha: 0, x: -30 });
          gsap.to(row, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 88%", once: true } });
        });

        /* process: spine fills + current step lights up.
           Measured live from the DOM on every scroll tick, so it can never be
           out of sync with pin spacing, images loading or the page transition. */
        const stepsEl = root.querySelector(".ex-steps");
        if (stepsEl) {
          const fill = stepsEl.querySelector(".ex-spine-fill");
          const stepEls = Array.from(stepsEl.querySelectorAll(".ex-step"));
          const setFill = fill ? gsap.quickTo(fill, "scaleY", { duration: 0.35, ease: "power2.out" }) : null;

          const updateSteps = () => {
            const line = window.innerHeight * 0.6;               // reading line
            const box = stepsEl.getBoundingClientRect();
            if (setFill) setFill(gsap.utils.clamp(0, 1, (line - box.top) / box.height));

            let current = -1;
            stepEls.forEach((el, i) => {
              if (el.getBoundingClientRect().top <= line) current = i;
            });
            stepEls.forEach((el, i) => {
              el.classList.toggle("is-on", i === current);
              el.classList.toggle("is-done", i < current);
            });
          };

          if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: updateSteps,
            onRefresh: updateSteps,
          });
          updateSteps();
        }

        /* why India: marquee rows + cards */
        q(".ex-mq-row").forEach((row, i) => {
          gsap.fromTo(row, { xPercent: i % 2 ? -18 : 0 }, {
            xPercent: i % 2 ? 0 : -18, ease: "none",
            scrollTrigger: { trigger: ".ex-why", start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });
        gsap.set(".ex-why-card", { autoAlpha: 0 });
        ScrollTrigger.batch(".ex-why-card", {
          start: "top 90%", once: true,
          onEnter: (b) => gsap.fromTo(b, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }),
        });

        /* every photo: clip open + zoom settle + parallax */
        q(".ex-range-img, .ex-photo-box").forEach((box) => {
          const img = box.querySelector("img");
          gsap.set(box, { clipPath: "inset(0% 0% 100% 0%)" });
          gsap.set(img, { scale: 1.3 });
          gsap
            .timeline({ scrollTrigger: { trigger: box, start: "top 85%", once: true } })
            .to(box, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" })
            .to(img, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
          gsap.to(img, {
            yPercent: -8, ease: "none",
            scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.set(".ex-photo figcaption", { autoAlpha: 0 });
        q(".ex-photo figcaption").forEach((c) => {
          gsap.to(c, { autoAlpha: 1, duration: 0.8, delay: 0.6, scrollTrigger: { trigger: c, start: "top 95%", once: true } });
        });

        /* spec rows */
        q(".ex-spec").forEach((row) => {
          const rule = row.querySelector(".ex-spec-rule");
          const parts = row.querySelectorAll(".ex-spec-n, .ex-spec-t, .ex-spec-d");
          gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(parts, { autoAlpha: 0, y: 20 });
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
            .to(rule, { scaleX: 1, duration: 0.9, ease: "power3.inOut" })
            .to(parts, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.5");
        });

        /* CTA button follows the cursor a little */
        const cta = root.querySelector(".ex-cta-btn");
        const inner = root.querySelector(".ex-cta-inner");
        if (cta && inner && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const move = (e) => {
            const r = cta.getBoundingClientRect();
            gsap.to(inner, {
              x: (e.clientX - r.left - r.width / 2) * 0.12,
              y: (e.clientY - r.top - r.height / 2) * 0.12,
              duration: 0.4, ease: "power3.out", overwrite: true,
            });
          };
          const leave = () => gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
          cta.addEventListener("pointermove", move);
          cta.addEventListener("pointerleave", leave);
          return () => {
            cta.removeEventListener("pointermove", move);
            cta.removeEventListener("pointerleave", leave);
          };
        }
        return undefined;
      });

      /* ---------- desktop only: pinned horizontal capabilities ---------- */
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.querySelector(".ex-hs-track");
        if (!track) return undefined;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".ex-hs", start: "top top",
            end: () => "+=" + dist(),
            pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
          },
        });
        tl.to(track, { x: () => -dist() }, 0).to(".ex-hs-bar", { scaleX: 1 }, 0);
        q(".ex-hs-card").forEach((c, i) => {
          tl.fromTo(c.querySelector(".ex-hs-big"), { yPercent: 20, opacity: 0.2 }, { yPercent: 0, opacity: 1, duration: 0.25 }, i * 0.18);
        });
        return undefined;
      });
    }, root);

    /* Refresh after layout, fonts, images and the page-enter transition (App.jsx
       animates the page for ~1.2s), so every scroll position is measured on the
       final layout. */
    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });
    const t1 = window.setTimeout(refresh, 250);
    const t2 = window.setTimeout(refresh, 1500);
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      images.forEach((img) => img.removeEventListener("load", refresh));
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="ex">
      {/* ================= 1 · HERO ================= */}
      <section className="ex-hero" aria-label="Porcelain tile exporter from India">
        {/* IMAGE AREA: hero background → IMG.hero */}
        <div className="ex-hero-video">
          <img src={IMG.hero} alt="" />
        </div>

        <div className="ex-hero-in">
          <div className="ex-eyebrow ex-hero-eyebrow">
            <i style={{backgroundColor: "#f6f3f0"}} />
            <span style={{color: "#f6f3f0"}}>{HERO_EYEBROW}</span>
            <i style={{backgroundColor: "#f6f3f0"}} />
          </div>
          <h1 className="ex-hero-title" aria-label="Export from India">
            <span className="ex-hero-word" aria-hidden="true">
              {"Export".split("").map((c, i) => (
                <span className="ex-char-wrap" key={i}><span className="ex-char">{c}</span></span>
              ))}
            </span>
            <span className="ex-hero-word ex-gold" aria-hidden="true">
              {"from India".split("").map((c, i) => (
                <span className="ex-char-wrap" key={i}><span className="ex-char">{c === " " ? "\u00A0" : c}</span></span>
              ))}
            </span>
          </h1>
          <p className="ex-hero-sub">{HERO_SUB}</p>
        </div>
        <div className="ex-scroll" aria-hidden="true">
          <span className="ex-scroll-ring"><span className="ex-scroll-dot" /></span>
          <span>Scroll</span>
        </div>
      </section>

      {/* ================= 2 · INTRO ================= */}
      <section className="ex-sec ex-light ex-intro">
        <div className="ex-wrap">
          <div className="ex-eyebrow ex-left" data-rv><i /><span>Premium porcelain tiles for global markets</span></div>
          <p className="ex-para">
            {INTRO.split(" ").map((w, i) => (
              <React.Fragment key={i}>
                <span className="ex-word" data-fill={INTRO_GOLD.includes(w) ? GOLD : INK}>{w}</span>{" "}
              </React.Fragment>
            ))}
          </p>

          {/* IMAGE AREA: wide banner → IMG.intro */}
          <Photo src={IMG.intro} alt="Premium porcelain surfaces in a contemporary interior" caption="Contemporary porcelain surfaces" />
        </div>
      </section>

      {/* ================= 3 · CAPABILITIES (pinned, horizontal) ================= */}
      <section
        className="ex-hs ex-dark"
        aria-labelledby="ex-cap-title"
        style={{ "--ex-cap-image": `url("${IMG.intro}")` }}
      >
        <div className="ex-hs-top">
          <div>
            <div className="ex-eyebrow ex-left"><i /><span>Porcelain tile capabilities</span></div>
            <h2 id="ex-cap-title" className="ex-h2 ex-head">
              <Mask>Designed for</Mask>
              <Mask cls="ex-gold">contemporary architecture</Mask>
            </h2>
          </div>
          <p className="ex-hs-note">{CAP_NOTE}</p>
        </div>
        <div className="ex-hs-view">
          <div className="ex-hs-track">
            {CAPABILITIES.map((c, i) => (
              <article className="ex-hs-card" key={c.t}>
                <span className="ex-hs-big">{pad(i)}</span>
                <div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              </article>
            ))}
            <div className="ex-hs-end"><p>{CAP_END}</p></div>
          </div>
        </div>
        <div className="ex-hs-progress" aria-hidden="true"><span className="ex-hs-bar" /></div>
      </section>

      {/* ================= 4 · BULK SUPPLY ================= */}
      <section className="ex-sec ex-light ex-supply" aria-labelledby="ex-supply-title">
        <div className="ex-wrap ex-split">
          <div className="ex-sticky">
            <div className="ex-eyebrow ex-left"><i /><span>Bulk Porcelain Tile Supply for Business Buyers</span></div>
            <h2 id="ex-supply-title" className="ex-h2 ex-head">
              <Mask>Supply Solutions</Mask>
              <Mask>for Different</Mask>
              <Mask cls="ex-gold">Business needs</Mask>
            </h2> <br />
            <Paras items={SUPPLY_TEXT} />
          </div>
          <div className="ex-supply-list">
            {/* IMAGE AREA: above the list → IMG.supply */}
            <Photo src={IMG.supply} alt="Porcelain tiles prepared for bulk supply" caption="Bulk supply" />
            {SUPPLY.map((s, i) => (
              <div className="ex-supply-row" key={s}>
                <span className="ex-supply-n">{pad(i)}</span>
                <p>{s}</p>
              </div>
            ))}
            <p className="ex-small" data-rv>{SUPPLY_NOTE}</p>
          </div>
        </div>
      </section>

      {/* ================= 5 · EXPORT PROCESS ================= */}
      <section className="ex-sec ex-dark ex-process" aria-labelledby="ex-pr-title">
        <div className="ex-wrap">
          <div className="ex-split">
            <div className="ex-sticky">
              <div className="ex-eyebrow ex-left"><i /><span>Porcelain tile export from India</span></div>
              <h2 id="ex-pr-title" className="ex-h2 ex-head">
                <Mask>Your sourcing</Mask>
                <Mask cls="ex-gold">partner for</Mask>
                <Mask>international markets</Mask>
              </h2> <br />
              <Paras items={PROCESS_TEXT} />
            </div>
            <div className="ex-steps">
              <span className="ex-spine"><span className="ex-spine-fill" /></span>
              {PROCESS.map((p, i) => (
                <div className="ex-step" key={p.t}>
                  <span className="ex-step-dot" />
                  <span className="ex-step-n">{pad(i)}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
              <p className="ex-small" data-rv>{PROCESS_NOTE}</p>
            </div>
          </div>

          {/* IMAGE AREA: wide banner under the steps → IMG.process */}
          <Photo src={IMG.process} alt="Packaging and shipment preparation" caption="Packaging & shipment" />
        </div>
      </section>

      {/* ================= 6 · WHY INDIA ================= */}
      <section className="ex-sec ex-light ex-why" aria-labelledby="ex-why-title">
        <h2 id="ex-why-title" className="ex-sr">Why source porcelain tiles from India?</h2>
        <div className="ex-mq" aria-hidden="true">
          <div className="ex-mq-row"><span>Manufacturing Expertise</span><span className="ex-gold">Design Versatility</span><span>Business Opportunity</span></div>
          <div className="ex-mq-row"><span className="ex-gold">Design Versatility</span><span>Business Opportunity</span><span>Manufacturing Expertise</span></div>
        </div>
        <div className="ex-wrap">
          <div className="ex-why-head">
            <div className="ex-eyebrow ex-left" data-rv><i /><span>Why Source Porcelain Tiles from India?</span></div>
            <p className="ex-body" data-rv>{WHY_TEXT}</p>
          </div>
          <div className="ex-why-grid">
            {WHY.map((w) => (
              <article className="ex-why-card" key={w.t}>
                <span className="ex-why-bar" />
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7 · PRODUCT RANGE ================= */}
      <section className="ex-sec ex-dark ex-range" aria-labelledby="ex-range-title">
        <div className="ex-wrap">
          <div className="ex-eyebrow ex-left"><i /><span>Our porcelain tile product range</span></div>
          <h2 id="ex-range-title" className="ex-h2 ex-head">
            <Mask>Explore surfaces</Mask>
            <Mask cls="ex-gold">for modern spaces</Mask>
          </h2> <br />
          <p className="ex-body" data-rv>{RANGE_TEXT}</p> <br />

          <div className="ex-range-grid">
            {RANGE.map((r, i) => (
              <article className={`ex-range-card${i ? " is-offset" : ""}`} key={r.t}>
                {/* IMAGE AREA: category photo → IMG.floor / IMG.large */}
                <div className="ex-range-img">
                  <img src={r.img} alt={r.t} loading="lazy" />
                  <span className="ex-range-shade" />
                </div>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </article>
            ))}
          </div>
          <p className="ex-range-note" data-rv>{RANGE_NOTE}</p>
        </div>
      </section>

      
{/* ================= 8 · SPECIFICATIONS ================= */}
<section
  className="ex-sec ex-light ex-specs"
  aria-labelledby="ex-spec-title"
>
  <div className="ex-wrap ex-split">

    {/* LEFT: STICKY HEADING + DESCRIPTION */}
    <div className="ex-sticky ex-spec-intro">
      <div className="ex-eyebrow ex-left">
        <i />
        <span>Product Specifications &amp; Quality Expectations</span>
      </div>

      <h2 id="ex-spec-title" className="ex-h2 ex-head">
        <Mask>Making informed</Mask>
        <Mask cls="ex-gold">sourcing decisions</Mask>
      </h2>

      <p className="ex-body" data-rv>
        Choosing porcelain tiles for a commercial order requires
        attention to product specifications as well as appearance.
        Aevitas Ceramics aims to provide buyers with relevant product
        information to support product evaluation and purchasing decisions.
      </p>
    </div>

    {/* RIGHT: IMAGE ABOVE THE SPECIFICATIONS */}
    <div className="ex-spec-list">

      <figure className="ex-spec-photo" data-rv>
        <div className="ex-spec-photo-frame">
          <img
            src={IMG.specs}
            alt="Premium porcelain tiles in a contemporary interior"
            loading="lazy"
          />
        </div>

        <figcaption className="ex-eyebrow ex-left">
          <i />
          <span>Surface &amp; Finish</span>
        </figcaption>
      </figure>

      {SPECS.map((s, i) => (
        <div className="ex-spec" key={s.t}>
          <span className="ex-spec-rule" />
          <span className="ex-spec-n">{pad(i)}</span>
          <h3 className="ex-spec-t">{s.t}</h3>
          <p className="ex-spec-d">{s.d}</p>
        </div>
      ))}

      <p className="ex-small" data-rv>
        Specific performance figures, testing results, and compliance
        claims should be confirmed against the relevant product documentation.
      </p>
    </div>

  </div>
</section>


      {/* ================= 9 · PARTNERSHIP + ENQUIRY ================= */}
      <section className="ex-sec ex-dark ex-final" aria-labelledby="ex-final-title" style={{ "--ex-final-image": `url("${IMG.footer}")` }}>
        <div className="ex-wrap">
          {/* <div className="ex-eyebrow ex-left"><i /><span>Building international business partnerships</span></div> */}
          <h2 id="ex-final-title" className="ex-h2 ex-big ex-head">
            <Mask>A long-term approach</Mask>
            <Mask cls="ex-gold">to tile sourcing.</Mask>
          </h2>

          <div className="ex-final-cols">
            <Paras items={FINAL_TEXT} />
          </div>

          <div className="ex-rule" data-line />

          <div className="ex-cta">
            <div>
              <h3 className="ex-cta-title ex-head">
                <Mask>Let&apos;s discuss your</Mask>
                <Mask cls="ex-gold">tile sourcing requirements</Mask>
              </h3>
              <Paras items={CTA_TEXT} />
            </div>
            <a className="ex-cta-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Enquire about porcelain tile exports on WhatsApp">
              <span className="ex-cta-fill" />
              <span className="ex-cta-inner">
                <span>Enquire now</span>
                <b>↗</b>
              </span>
            </a>
          <p className="ex-tagline" data-rv>{TAGLINE}</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Export;