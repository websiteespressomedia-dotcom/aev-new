"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const revealTextRef = useRef<HTMLParagraphElement>(null);

  const paragraph = "We help businesses worldwide access thoughtfully selected tile collections through a reliable supply network built on quality, consistency, and trust. Working with established manufacturers from Morbi, we deliver ceramic solutions that meet the evolving needs of showrooms, architects, developers, and project professionals across international markets. From contemporary designs to dependable project supply, we focus on making tile sourcing simpler, smoother, and more efficient — helping our partners create inspiring spaces with confidence.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Responsive Scroll Length
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=100%" : "+=150%", // Reduced scroll distance so it takes less time to move to next section
          scrub: 1,
          pin: true,
        },
      });

      // 1. Sync the Hero exit and Black section entry
      tl.to(imageRef.current, { scale: 1.1, ease: "none" }, 0)
        .to(textGroupRef.current, { 
          yPercent: -100, 
          opacity: 0, 
          ease: "none" 
        }, 0)
        .fromTo(statsSectionRef.current, 
          { yPercent: 100 }, 
          { yPercent: 0, ease: "none" }, 
          0
        );

      // 2. Character Reveal
      const chars = revealTextRef.current?.querySelectorAll(".char");
      if (chars) {
        tl.to(chars, {
          color: "white",
          opacity: 1,
          duration: 0.05, // Makes each character fade in sharply instead of overlapping
          stagger: { amount: 1.5 }, // Spread the start times widely for a slow, one-by-one feel
          ease: "none",
        }, 0.2); // Start slightly later in the timeline
        
        // 3. Add reading time (timeline continues but no animation, keeping section pinned)
        tl.to({}, { duration: 0.8 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [paragraph]); // Added paragraph to dependencies so GSAP re-runs correctly if you change the text


  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* BACKGROUND VIDEO */}
      <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/reel1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* PART 1: HERO TEXT */}
      <div ref={textGroupRef} className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-[22vw] md:text-[10rem] font-serif uppercase md:tracking-tighter leading-none md:leading-[0.8]">
          About <br className="md:hidden" /> Us
        </h1>
        <p className="mt-12 md:mt-8 max-w-lg text-md md:text-xl font-light leading-relaxed opacity-80">
          Aevitas Ceramic bridges the gap between India’s renowned ceramic manufacturing ecosystem and global design markets.
        </p>
      </div>

      {/* PART 2: BLACK STATS SECTION */}
      <div ref={statsSectionRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-white px-6">
        {/* Soft edge for transition */}
        <div className="absolute top-0 left-0 w-full h-32 -translate-y-full bg-gradient-to-t from-black to-transparent" />

        <div className="max-w-7xl w-full text-center px-4">
          <p ref={revealTextRef} className="text-xl md:text-3xl lg:text-4xl leading-tight font-light mb-10 md:mb-14 max-w-7xl mx-auto">
            {paragraph.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block mr-[0.25em]">
                {word.split("").map((char, cIdx) => (
                  <span 
                    key={cIdx} 
                    className="char text-white/10 inline-block opacity-10 will-change-opacity"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <div className="grid grid-cols-1 md:flex md:flex-row items-center justify-center gap-8 md:gap-0">
            <StatItem label="Projects Completed" value="250+" />
            <StatItem label="Years of Experience" value="15+" showBorder />
            <StatItem label="Client Satisfaction" value="98%" showBorder />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ label, value, showBorder }: { label: string; value: string; showBorder?: boolean }) => (
  <div className={`flex flex-col items-center px-6 md:px-16 lg:px-20 py-4 md:py-0 ${showBorder ? "md:border-l border-white/10" : ""}`}>
    <span className="text-5xl md:text-7xl lg:text-8xl font-serif mb-2 md:mb-4 leading-none tracking-tighter">
      {value}
    </span>
    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 text-center leading-relaxed font-bold">
      {label}
    </span>
  </div>
);

export default AboutHero;