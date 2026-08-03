"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COLLECTIONS } from "@/lib/catalogueData";

export default function CatalogueLanding() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Hero header reveal ──────────────────────────────────────
    if (headerRef.current) {
      const lines = headerRef.current.querySelectorAll(".reveal-line");
      const meta = headerRef.current.querySelectorAll(".reveal-meta");

      gsap.fromTo(
        meta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2 }
      );

      gsap.fromTo(
        lines,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.35,
        }
      );
    }

    // ── Cards scroll-reveal (staggered, cinematic) ──────────────
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".collection-card");

      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] min-h-screen text-white overflow-hidden"
    >
      {/* ── Subtle grain / noise overlay ──────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Ambient soft glow (top-left) ──────────────────────── */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════════════════════════ */}
      {/*  HERO HEADER                                            */}
      {/* ════════════════════════════════════════════════════════ */}
      <div
        ref={headerRef}
        className="relative z-10 pt-36 md:pt-44 pb-16 md:pb-24 px-6 md:px-14 max-w-[1400px] mx-auto"
      >
        {/* Label row */}
        <div className="reveal-meta flex items-center gap-4 mb-8 md:mb-10">
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-orange-500">
            Aevitas Ceramics
          </span>
          <span className="text-white/20 text-[10px]">/</span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-white/40">
            Tile Catalogues
          </span>
        </div>

        {/* Large heading */}
        <div className="overflow-hidden mb-2">
          <h1 className="reveal-line text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-serif italic uppercase leading-[0.85] tracking-tighter text-white">
            Collection
          </h1>
        </div>
        <div className="overflow-hidden mb-10 md:mb-12">
          <h1 className="reveal-line text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-serif uppercase leading-[0.85] tracking-tighter text-white/90">
            Archives
          </h1>
        </div>

        {/* Subtext + divider */}
        <div className="reveal-meta flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/8 pt-8">
          <p className="text-white/40 text-[10px] md:text-[11px] uppercase tracking-[0.3em] leading-loose max-w-sm">
            Select a tile size to explore the full range of collections,
            finishes, and PDF catalogues available for that format.
          </p>
          <span className="text-white/20 text-[10px] uppercase tracking-[0.25em]">
            {COLLECTIONS.reduce((sum, c) => sum + c.catalogues.length, 0)} catalogues available
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/*  COLLECTION CARDS — 2 × 2                              */}
      {/* ════════════════════════════════════════════════════════ */}
      <div
        ref={cardsRef}
        className="relative z-10 px-6 md:px-14 pb-32 max-w-[1400px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {COLLECTIONS.map((collection, idx) => (
            <Link
              key={collection.slug}
              href={`/tile-catalogue/${collection.slug}`}
              id={`catalogue-card-${collection.slug}`}
              className="collection-card group relative block overflow-hidden rounded-xl cursor-pointer"
              style={{ aspectRatio: "3 / 4" }}
            >
              {/* ── Background Image ─────────────────────────── */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={collection.heroImage}
                  alt={collection.title}
                  fill
                  priority={idx < 2}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* ── Gradient overlay (bottom only — keeps text readable, image visible) */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 40%, transparent 65%)",
                }}
              />

              {/* ── Card number (top-left) ───────────────────── */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                  0{idx + 1}
                </span>
              </div>

              {/* ── Catalogue count badge (top-right) ───────── */}
              <div className="absolute top-6 right-6">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 border border-white/10 rounded-full px-3 py-1">
                  {collection.catalogues.length} catalogues
                </span>
              </div>

              {/* ── Content panel (bottom) ───────────────────── */}
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                {/* Glassmorphism card */}
                <div
                  className="relative rounded-xl p-6 md:p-8 overflow-hidden"
                  style={{
                    background: "rgba(10,10,10,0.55)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Orange accent line */}
                  <div
                    className="mb-4 h-[1.5px] w-10 bg-orange-500 transition-all duration-700"
                    style={{
                      boxShadow: "0 0 0 0 rgba(249,115,22,0)",
                    }}
                  />

                  {/* Title */}
                  <h2
                    className="text-3xl md:text-4xl xl:text-5xl font-serif italic leading-none tracking-tight text-white mb-3 transition-transform duration-700 group-hover:-translate-y-1"
                  >
                    {collection.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-white/50 mb-5 leading-relaxed transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:text-white/70">
                    {collection.subtitle}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold">
                      Explore Collection
                    </span>
                    <div className="relative overflow-hidden w-8 h-[1px] bg-orange-500/40">
                      <div className="absolute inset-0 bg-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-orange-500 transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ── Hover: orange glow on border ─────────────── */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.25)",
                }}
              />

              {/* ── Lift shadow ───────────────────────────────── */}
              <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]" />
            </Link>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/*  BOTTOM CTA STRIP                                       */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/5 px-6 md:px-14 py-12 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/25 text-[10px] uppercase tracking-[0.3em]">
          Aevitas Ceramics — Premium Porcelain Tile Exporter
        </p>
        <Link
          href="/contact"
          className="group/cta relative inline-flex items-center gap-4 py-3 px-7 border border-white/10 rounded-full hover:border-white/30 transition-all duration-500 text-[10px] uppercase tracking-[0.35em] font-bold text-white/50 hover:text-white"
        >
          Request a Sample →
        </Link>
      </div>

      <style jsx global>{`
        .collection-card {
          transform: translateY(0);
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            box-shadow 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .collection-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.7),
            0 0 40px -10px rgba(249, 115, 22, 0.08);
        }
        .collection-card:hover .orange-glow-line {
          box-shadow: 0 0 12px 2px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </section>
  );
}
