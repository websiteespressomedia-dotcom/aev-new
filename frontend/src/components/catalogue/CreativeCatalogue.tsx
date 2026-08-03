"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const catalogues = [
  {
    title: "The Stone Archive",
    subtitle: "Volume 01",
    description: "A comprehensive study of natural textures and mineral compositions.",
    image: "/images/hero/core1.avif",
    color: "#1c1c1c", 
  },
  {
    title: "Minimalist Geometry",
    subtitle: "Volume 02",
    description: "Focusing on the intersection of light and architectural form.",
    image: "/images/hero/core2.avif",
    color: "#2d302a", 
  },
  {
    title: "Tactile Finishes",
    subtitle: "Volume 03",
    description: "Exploring the sensory relationship between surface and space.",
    image: "/images/hero/core3.avif",
    color: "#3b3431", 
  },
  {
    title: "Urban Elements",
    subtitle: "Volume 04",
    description: "Contemporary designs inspired by modern metropolitan landscapes.",
    image: "/images/hero/core4.avif",
    color: "#2a2d34", 
  },
  {
    title: "Classic Elegance",
    subtitle: "Volume 05",
    description: "Timeless patterns that redefine classical interior aesthetics.",
    image: "/images/hero/hero.avif",
    color: "#3a2e2b", 
  },
  {
    title: "Abstract Forms",
    subtitle: "Volume 06",
    description: "Pushing boundaries with bold, unconventional surface designs.",
    image: "/images/hero/art1.jpg",
    color: "#1e2226", 
  }
];

export default function CreativeCatalogue() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-40 px-6 md:px-16 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 border-b border-white/5 pb-12 gap-8 pt-10">
          <h1 className="text-7xl md:text-9xl font-serif italic leading-none tracking-tighter">
            Archives
          </h1>
          <p className="text-gray-500 max-w-[240px] text-[9px] md:text-[10px] uppercase tracking-[0.3em] leading-relaxed">
            Technical specifications & design directions.
          </p>
        </div>

        {/* Catalogues List */}
        <div className="flex flex-col gap-32 md:gap-56">
          {catalogues.map((item, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center gap-16 md:gap-32 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* THE 3D HEAVY BOOK */}
              <div className="perspective-2000 md:perspective-3000 group">
                <motion.div 
                  initial={{ rotateY: index % 2 === 0 ? -8 : -8, rotateX: 2 }}
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? -18 : -18, 
                    rotateX: 0,
                    scale: 1.02,
                  }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] md:w-[420px] md:h-[560px] preserve-3d"
                >
                  
                  {/* 1. THE PAPER STACK */}
                  <div 
                    className="absolute inset-y-[2px] right-0 w-full bg-[#f5f5f5] rounded-r-sm overflow-hidden"
                    style={{ transform: "translateZ(-34px)" }}
                  >
                    <div className="w-full h-full opacity-20" 
                         style={{ 
                           backgroundImage: 'repeating-linear-gradient(to right, #000 0px, #000 1px, transparent 1px, transparent 3px)',
                         }} 
                    />
                  </div>

                  {/* 2. THE SPINE */}
                  <div 
                    className="absolute top-0 left-0 bottom-0 w-[38px] md:w-[44px] origin-left rotate-y-90 translate-z-[-38px] md:translate-z-[-44px] brightness-75 rounded-l-md"
                    style={{ backgroundColor: item.color }}
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/10" />
                  </div>

                  {/* 3. FORE-EDGE */}
                  <div 
                    className="absolute top-[2px] bottom-[2px] right-0 w-[34px] md:w-[40px] bg-[#ececec] origin-right rotate-y-90 shadow-[inset_15px_0_30px_rgba(0,0,0,0.1)]"
                    style={{ transform: "translateZ(-34px) md:translateZ(-40px)" }}
                  >
                    <div className="w-full h-full opacity-60" 
                         style={{ 
                           backgroundImage: 'linear-gradient(90deg, #d1d1d1 0%, #fff 10%, #d1d1d1 20%, #fff 30%)',
                           backgroundSize: '4px 100%' 
                         }} 
                    />
                  </div>

                  {/* 4. THE FRONT COVER */}
                  <div 
                    className="absolute inset-0 z-10 rounded-r-sm p-6 md:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_-5px_0_20px_rgba(0,0,0,0.4)]"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="absolute left-6 md:left-9 top-0 bottom-0 w-[8px] md:w-[12px] bg-gradient-to-r from-black/30 via-transparent to-white/5 border-r border-black/20" />

                    <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/5">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="space-y-3 md:space-y-4 relative z-10">
                      <div className="flex justify-between items-end">
                        <h3 className="text-2xl md:text-4xl font-serif italic leading-none">{item.title}</h3>
                        <span className="text-[8px] md:text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{item.subtitle}</span>
                      </div>
                      <div className="h-px w-full bg-white/5" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                  </div>
                </motion.div>
              </div>

              {/* DESCRIPTION TEXT */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:flex-1 space-y-8 md:space-y-12 text-center lg:text-left"
              >
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase leading-[0.85]">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-base md:text-2xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-light italic">
                    {item.description}
                  </p>
                </div>

                <button className="group/btn relative inline-flex items-center gap-6 md:gap-10 py-4 md:py-6 px-8 md:px-12 border border-white/10 rounded-full hover:border-white transition-all duration-700 overflow-hidden">
                   <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                   <span className="relative z-10 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold group-hover/btn:text-black">
                     Download PDF ↓
                   </span>
                </button>
              </motion.div>

            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .perspective-3000 { perspective: 3000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-90 { transform: rotateY(90deg); }
        .rotate-x-90 { transform: rotateX(-90deg); }
        .preserve-3d div { backface-visibility: hidden; }
      `}</style>
    </section>
  );
}