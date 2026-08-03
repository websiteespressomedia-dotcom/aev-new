"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CollectionData, getCoverImage, getDriveViewUrl, getDriveDownloadUrl } from "@/lib/catalogueData";

// Spine colour palette — cycles across all PDF cards
const SPINE_COLORS = [
  "#1c1c1c",
  "#2d302a",
  "#3b3431",
  "#1a2520",
  "#2a1e1a",
  "#1e2030",
  "#2d2820",
  "#1f2420",
  "#28201c",
  "#1c2828",
];

interface Props {
  collection: CollectionData;
}

export default function CatalogueListingPage({ collection }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    if (headerRef.current) {
      const lines = headerRef.current.querySelectorAll(".reveal-line");
      const meta = headerRef.current.querySelectorAll(".reveal-meta");
      gsap.fromTo(
        meta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.1 }
      );
      gsap.fromTo(
        lines,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.3, ease: "power4.out", stagger: 0.08, delay: 0.25 }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden"
    >
      {/* ── Subtle ambient glow ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-8 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════════════════════════ */}
      {/*  HEADER                                                 */}
      {/* ════════════════════════════════════════════════════════ */}
      <div
        ref={headerRef}
        className="relative z-10 pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-14 max-w-[1400px] mx-auto"
      >
        {/* Back navigation */}
        <div className="reveal-meta mb-10">
          <Link
            href="/tile-catalogue"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/40 hover:text-white transition-colors duration-300"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-400 group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            All Collections
          </Link>
        </div>

        {/* Orange label */}
        <div className="reveal-meta flex items-center gap-4 mb-7">
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-orange-500">
            Tile Catalogues
          </span>
        </div>

        {/* Large size heading */}
        <div className="overflow-hidden mb-1">
          <h1 className="reveal-line text-[11vw] sm:text-[8vw] md:text-[6.5vw] font-serif italic uppercase leading-[0.85] tracking-tighter text-white">
            {collection.title}
          </h1>
        </div>
        <div className="overflow-hidden mb-8 md:mb-12">
          <p className="reveal-line text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/40 mt-4 leading-relaxed">
            {collection.subtitle} &mdash; {collection.catalogues.length} catalogues
          </p>
        </div>

        {/* Divider */}
        <div className="reveal-meta h-px bg-gradient-to-r from-orange-500/30 via-white/10 to-transparent" />
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/*  PDF CARD GRID — 3D Book style (same as CreativeCatalogue) */}
      {/* ════════════════════════════════════════════════════════ */}
      <div
        ref={gridRef}
        className="relative z-10 px-6 md:px-14 pb-40 max-w-[1400px] mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 md:gap-x-16 md:gap-y-28">
          {collection.catalogues.map((item, index) => {
            const spineColor = SPINE_COLORS[index % SPINE_COLORS.length];
            const coverImage = getCoverImage(index);
            const viewUrl     = getDriveViewUrl(item.driveId);
            const downloadUrl = getDriveDownloadUrl(item.driveId);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 3) * 0.1,
                }}
                className="flex flex-col items-center gap-8"
              >
                {/* ── 3D BOOK (identical to CreativeCatalogue) ── */}
                <div className="perspective-2000 group">
                  <motion.div
                    initial={{ rotateY: -8, rotateX: 2 }}
                    whileHover={{
                      rotateY: -18,
                      rotateX: 0,
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative w-[200px] h-[270px] sm:w-[220px] sm:h-[300px] md:w-[240px] md:h-[320px] preserve-3d"
                  >
                    {/* 1. PAPER STACK */}
                    <div
                      className="absolute inset-y-[2px] right-0 w-full bg-[#f5f5f5] rounded-r-sm overflow-hidden"
                      style={{ transform: "translateZ(-28px)" }}
                    >
                      <div
                        className="w-full h-full opacity-20"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to right, #000 0px, #000 1px, transparent 1px, transparent 3px)",
                        }}
                      />
                    </div>

                    {/* 2. SPINE */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[32px] md:w-[36px] origin-left brightness-75 rounded-l-md"
                      style={{
                        backgroundColor: spineColor,
                        transform: "rotateY(90deg) translateZ(-32px)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/10" />
                    </div>

                    {/* 3. FORE-EDGE */}
                    <div
                      className="absolute top-[2px] bottom-[2px] right-0 w-[28px] md:w-[32px] bg-[#ececec] shadow-[inset_15px_0_30px_rgba(0,0,0,0.1)]"
                      style={{ transform: "translateZ(-28px)" }}
                    >
                      <div
                        className="w-full h-full opacity-60"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, #d1d1d1 0%, #fff 10%, #d1d1d1 20%, #fff 30%)",
                          backgroundSize: "4px 100%",
                        }}
                      />
                    </div>

                    {/* 4. FRONT COVER */}
                    <div
                      className="absolute inset-0 z-10 rounded-r-sm p-5 md:p-7 flex flex-col justify-between overflow-hidden shadow-[inset_-5px_0_20px_rgba(0,0,0,0.4)]"
                      style={{ backgroundColor: spineColor }}
                    >
                      {/* Spine shadow strip */}
                      <div className="absolute left-5 md:left-7 top-0 bottom-0 w-[6px] md:w-[10px] bg-gradient-to-r from-black/30 via-transparent to-white/5 border-r border-black/20" />

                      {/* Cover image */}
                      <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden grayscale md:grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/5">
                        <Image
                          src={coverImage}
                          alt={item.displayName}
                          fill
                          className="object-cover"
                          sizes="240px"
                        />
                      </div>

                      {/* Title strip */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex justify-between items-end">
                          <h3 className="text-base md:text-lg font-serif italic leading-tight text-white">
                            {item.displayName}
                          </h3>
                          <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em]">
                            PDF
                          </span>
                        </div>
                        <div className="h-px w-full bg-white/5" />
                        <div className="h-px w-6 bg-orange-500/60" />
                      </div>

                      {/* Paper texture */}
                      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                    </div>
                  </motion.div>
                </div>

                {/* ── Card info & action buttons ─────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.2 + (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-4 text-center w-full max-w-[260px]"
                >
                  {/* Display name */}
                  <p className="text-sm md:text-[15px] font-medium text-white/80 leading-snug tracking-wide">
                    {item.displayName}
                  </p>

                  {/* Buttons row */}
                  <div className="flex gap-3 w-full">
                    {/* Download */}
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-full hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
                      title={`Download ${item.displayName}`}
                    >
                      <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="relative z-10 text-white/60 group-hover/btn:text-black"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span className="relative z-10 text-[9px] uppercase tracking-[0.3em] font-bold text-white/60 group-hover/btn:text-black">
                        Download
                      </span>
                    </a>

                    {/* View / Open */}
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/view relative flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-full hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
                      title={`View ${item.displayName}`}
                    >
                      <div className="absolute inset-0 bg-white translate-y-full group-hover/view:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="relative z-10 text-white/60 group-hover/view:text-black"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <span className="relative z-10 text-[9px] uppercase tracking-[0.3em] font-bold text-white/60 group-hover/view:text-black">
                        View
                      </span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .preserve-3d div {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
