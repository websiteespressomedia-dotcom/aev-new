"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Responsive scroll values
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#0a0a0a] py-24 md:py-40 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* BACKGROUND SCROLLING TEXT */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col gap-2 md:gap-4 opacity-[0.03] md:opacity-[0.07] select-none pointer-events-none">
        <motion.div style={{ x: xLeft }} className="whitespace-nowrap">
          <span className="text-[15vw] md:text-[10vw] font-serif uppercase leading-none tracking-tighter italic will-change-transform">
            Start a Project — Work With Us — Start a Project — Work With Us —
          </span>
        </motion.div>
        
        <motion.div style={{ x: xRight }} className="whitespace-nowrap">
          <span 
            className="text-[15vw] md:text-[10vw] font-serif uppercase leading-none tracking-tighter will-change-transform"
            style={{ 
              WebkitTextStroke: "1px white", 
              color: "transparent" 
            }}
          >
            Creative Direction — Interaction — Creative Direction — Interaction —
          </span>
        </motion.div>
      </div>

      {/* MAIN CONTENT OVERLAY */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-800/50 text-zinc-300 py-2 rounded-full px-6 mb-8 md:mb-10 backdrop-blur-md border border-white/5"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
            Available for new work
          </span>
        </motion.div>

        <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-medium tracking-tighter mb-16 md:mb-24 text-white leading-[0.9]">
          HAVE AN IDEA? <br />
          <span className="italic font-serif text-zinc-600">Let’s make it real.</span>
        </h2>

        {/* MAGNETIC BUTTON */}
        <motion.a
          href="https://wa.me/918758117559"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/10 flex items-center justify-center overflow-hidden transition-colors hover:border-white/40 mb-24 md:mb-32 cursor-pointer"
        >
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          
          <div className="relative z-10 flex flex-col items-center group-hover:text-black transition-colors duration-500 text-white">
            <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Get in touch</span>
            <span className="text-3xl">↗</span>
          </div>
        </motion.a>

        {/* TWO LOCATIONS FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full text-left border-t border-white/5 pt-16 md:pt-20">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Office One</span>
            <div className="space-y-2">
              <p className="text-white text-lg md:text-xl font-light">B906, Swati Trinity, SP ring road,<br /> Ahmedabad, Gujarat, India</p>
              <a href="https://maps.app.goo.gl/JYDB17skygmjNJA48" target="_blank" className="inline-block text-zinc-500 hover:text-white transition-colors text-sm border-b border-zinc-800 pb-1">View on Maps</a>
            </div>
            <p className="text-zinc-400 font-light">+91 87581 17559</p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Office Two</span>
            <div className="space-y-2">
              <p className="text-white text-lg md:text-xl font-light">410, Pavansut Plaza, National Highway - 8,<br /> Morbi, Gujarat, India</p>
              <a href="https://maps.app.goo.gl/d6kC6JvinURADcPZ9" target="_blank" className="inline-block text-zinc-500 hover:text-white transition-colors text-sm border-b border-zinc-800 pb-1">View on Maps</a>
            </div>
            <p className="text-zinc-400 font-light">+91 87581 17559</p>
          </div>
        </div>
      </div>
    </section>
  );
}