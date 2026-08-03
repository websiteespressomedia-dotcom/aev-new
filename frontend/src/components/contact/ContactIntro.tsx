"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ContactIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax adjustments
  const imageScale = useTransform(smoothProgress, [0, 1], [1.1, 1.4]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.8], [0.4, 0]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100vh] md:h-[105vh] w-full bg-[#0a0a0a] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
            style={{ filter: 'brightness(0.3)' }}
          >
            <source src="/videos/reel1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="flex flex-col items-center"
          >
            <div className="overflow-hidden mb-6">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[9px] md:text-[10px] font-mono uppercase tracking-[0.5em] md:tracking-[0.8em] text-zinc-500"
              >
                Available Worldwide
              </motion.span>
            </div>

            <h1 className="text-7xl md:text-[12rem] lg:text-[15rem] font-serif italic leading-[0.8] tracking-tighter text-white select-none">
              Connect
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8 md:mt-12 text-zinc-500 max-w-[280px] md:max-w-xs text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed"
            >
              Collaborating with visionaries to redefine architectural surfaces and interior landscapes.
            </motion.p>
          </motion.div>
        </div>

        {/* Gradient Transition to Form */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20" />
      </div>
    </section>
  );
}