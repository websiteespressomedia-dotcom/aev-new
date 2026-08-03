"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATEGORIES = [
  { src: "/images/categories/marble.jpg", title: "Liso", subtitle: "Smooth & Elegant" },
  { src: "/images/categories/granite.png", title: "Carving", subtitle: "Textured Depth" },
  { src: "/images/categories/quartz.jpg", title: "Highglossy", subtitle: "Brilliant Shine" },
  { src: "/images/categories/porcelain.webp", title: "Liso+Carving", subtitle: "Hybrid Perfection" },
];

export default function CategorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cursor = cursorRef.current;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
    }, (context) => {
      // @ts-expect-error: conditions are dynamic
      const { isDesktop } = context.conditions;

      // --- 1. CURSOR LOGIC (Desktop Only) ---
      if (isDesktop && cursor) {
        const onMouseMove = (e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const onMouseEnter = () => gsap.to(cursor, { scale: 1, opacity: 1 });
        const onMouseLeave = () => gsap.to(cursor, { scale: 0, opacity: 0 });

        window.addEventListener("mousemove", onMouseMove);
        containerRef.current?.addEventListener("mouseenter", onMouseEnter);
        containerRef.current?.addEventListener("mouseleave", onMouseLeave);
      }

      // --- 2. PINNING & SCROLL LOGIC ---
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        // Pinning Logic
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        });

        // Content Animation - Cast elements to HTMLElement to avoid "align" property errors
        const image = section.querySelector(".category-image") as HTMLElement | null;
        const line = section.querySelector(".title-line") as HTMLElement | null;

        if (image && line) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });

          tl.fromTo(image, 
            { scale: 1.2 }, 
            { scale: 1, duration: 1, ease: "none" }, 0
          ).to(line, { 
            scaleX: 0, 
            transformOrigin: "left", 
            ease: "none" 
          }, 0);
        }
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} data-no-cursor className="relative z-10 bg-black w-full lg:cursor-none">
      
      {/* CUSTOM CURSOR */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 border border-white/20 rounded-full pointer-events-none z-50 hidden lg:flex items-center justify-center bg-white/10 backdrop-blur-md opacity-0 scale-0 origin-center -translate-x-1/2 -translate-y-1/2"
      >
        <span className="text-[10px] text-white uppercase tracking-widest font-bold">View</span>
      </div>

      {CATEGORIES.map((cat, index) => (
        <section
          key={index}
          ref={(el) => { sectionRefs.current[index] = el; }}
          className="relative h-screen w-full overflow-hidden bg-black cursor-pointer"
          style={{ zIndex: index + 1 }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent('changeFilter', { detail: cat.title }));
            const el = document.getElementById('product-listing');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {/* Background Image Container */}
          <div className="category-image absolute inset-0 w-full h-full will-change-transform">
            <Image
              src={cat.src}
              alt={cat.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Dark Gradient: Bottom-up on mobile, Top-Right on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-tr lg:from-black lg:via-black/20" />
          </div>

          {/* Text Container: Bottom-aligned on mobile for better reach */}
          <div className="text-container relative z-20 h-full w-full flex flex-col justify-start pt-20 px-8 lg:justify-start lg:pt-32 lg:pl-20">
            <div className="flex items-center gap-4 lg:gap-6 mb-2">
              <span className="text-orange-600 text-xs lg:text-sm font-bold tracking-[0.3em]">
                0{index + 1}
              </span>
              <div className="title-line w-16 lg:w-24 h-px bg-white/40" />
            </div>

            <h2 className="text-white text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase italic leading-[0.85]">
              {cat.title}
            </h2>
            
            <p className="text-white/60 text-[10px] lg:text-base mt-4 tracking-[0.4em] uppercase font-light pl-1">
              {cat.subtitle}
            </p>
          </div>

          {/* Decorative Sideways Text (Desktop Only) */}
          <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
            <p className="text-white/20 text-[9px] uppercase tracking-[1em] rotate-90 origin-right whitespace-nowrap">
              Premium Collections
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-30" />
        </section>
      ))}
    </div>
  );
}