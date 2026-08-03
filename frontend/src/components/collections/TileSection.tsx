"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARDS = [
  { size: "800x1600",  image: "/images/previews/liso/HONEY_WHITE.jpg.jpg" },
  { size: "800x2400",  image: "/images/previews/carving/ADLINE STATUARIO_EN-CR.jpg.jpg" },
  { size: "1200x1800", image: "/images/previews/Glossy/AMO BIANCO.jpg.jpg" },
  { size: "1200x2400", image: "/images/previews/carving/MOCA RIVER.png.jpg" },
];

export default function TileSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Symmetrical Outward Expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 screens of scrolling for smooth interpolation
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Shrink Video
      tl.to(videoWrapperRef.current, {
        width: "28vw",
        height: "55vh",
        borderRadius: "4px",
        ease: "power3.inOut",
      }, 0);

      // 2. Fade/Scale Hero Text
      tl.to(heroTextRef.current, {
        scale: 0.85,
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
      }, 0);

      // 3. Expand Cards to 4 corners
      const cards = gsap.utils.toArray('.expansion-card');
      const xTargets = ["-28vw", "28vw", "-28vw", "28vw"];
      const yTargets = ["-24vh", "-24vh", "24vh", "24vh"];

      cards.forEach((card: any, i) => {
        // Initial set to ensure they start perfectly centered and hidden
        gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 0, opacity: 0, scale: 0.8 });
        
        tl.to(card, {
          x: xTargets[i],
          y: yTargets[i],
          opacity: 1,
          scale: 1,
          ease: "power3.inOut",
        }, 0.1); // Slight delay so video starts shrinking first
      });

      // 4. Add a dummy buffer at the end of the timeline
      // This ensures the animation finishes at 300vh (75% of 400vh),
      // giving it a full 100vh buffer to stay static while the next section slides up over it.
      tl.to({}, { duration: 0.2 });

      // No external labels to fade in anymore, text is inside the card
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: 2x2 Grid Expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", 
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // Video moves up and shrinks
      tl.to(videoWrapperRef.current, {
        width: "90vw",
        height: "35vh",
        y: "-25vh",
        borderRadius: "4px",
        ease: "power3.inOut",
      }, 0);

      tl.to(heroTextRef.current, {
        scale: 0.8,
        opacity: 0,
        ease: "power2.inOut",
      }, 0);

      const cards = gsap.utils.toArray('.expansion-card');
      const xTargets = ["-23vw", "23vw", "-23vw", "23vw"];
      const yTargets = ["10vh", "10vh", "35vh", "35vh"];

      cards.forEach((card: any, i) => {
        gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 0, opacity: 0, scale: 0.8 });
        
        tl.to(card, {
          x: xTargets[i],
          y: yTargets[i],
          opacity: 1,
          scale: 1,
          ease: "power3.inOut",
        }, 0.1);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] md:h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center"
    >
      
      {/* ── 4 Expansion Cards (Z-Index 5: Behind Video initially) ── */}
      {CARDS.map((card, i) => (
        <div 
          key={i} 
          className="expansion-card absolute top-1/2 left-1/2 w-[40vw] h-[22vh] md:w-[22vw] md:h-[40vh] xl:w-[20vw] xl:h-[42vh] opacity-0 z-0"
        >
          <Link 
            href={`/collections?size=${card.size}`} 
            className="block relative w-full h-full group overflow-hidden rounded-sm shadow-2xl"
          >
            {/* Image with extreme hover scale for premium feel */}
            <Image 
              src={card.image} 
              alt={card.size} 
              fill 
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-125" 
            />
            {/* Dynamic Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-700" />
            <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors duration-700" />

            {/* Centered size — bold italic, no box */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
              <span
                className="text-[8px] md:text-[11px] tracking-[0.35em] text-orange-400 uppercase font-semibold mb-1"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
              >
                Dimensions
              </span>
              <h3
                className="text-lg md:text-3xl lg:text-4xl font-black italic text-white tracking-tighter leading-none"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)" }}
              >
                {card.size}
              </h3>
              <span
                className="text-[7px] md:text-[10px] text-orange-400 mt-1 font-bold tracking-[0.4em] uppercase"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
              >
                MM
              </span>
            </div>
          </Link>
        </div>
      ))}

      {/* ── Central Video (Z-Index 10) ── */}
      <div 
        ref={videoWrapperRef} 
        className="absolute top-1/2 left-1/2 w-[100vw] h-[100svh] md:h-[100vh] -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden shadow-2xl"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/tile-section-vid.mp4" type="video/mp4" />
        </video>
        {/* Soft vignette to make text pop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      {/* ── Hero Text (Z-Index 20) ── */}
      <div 
        ref={heroTextRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none w-full px-4"
      >
        <p className="text-orange-500 text-[9px] md:text-xs uppercase tracking-[0.6em] mb-4 md:mb-6 font-bold" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          Crafted for Elegance
        </p>
        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-serif italic text-white leading-[0.85] tracking-tighter" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
          Premium<br className="hidden md:block"/> Collections
        </h2>
      </div>

      {/* ── Scroll Indicator (Fades out via CSS or stays) ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-50">
         <span className="text-[8px] uppercase tracking-[0.3em] text-white font-bold">Scroll</span>
         <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-white -translate-y-full animate-[scrollLineVertical_2s_ease-in-out_infinite]" />
         </div>
      </div>

      <style jsx global>{`
        @keyframes scrollLineVertical {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}