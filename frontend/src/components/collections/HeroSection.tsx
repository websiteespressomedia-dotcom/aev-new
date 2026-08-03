"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    }, (context) => {
      // @ts-expect-error: context.conditions is defined by gsap.matchMedia
      const { isMobile } = context.conditions;

      // This timeline handles the "Out" animation as the user scrolls down
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          // On mobile, we start the fade slightly later so the user can actually read it
          start: isMobile ? "top 5%" : "top 10%",
          end: "bottom 10%",
          scrub: true,
        }
      });

      tl.to(contentRef.current, {
        y: isMobile ? -40 : -100, // Reduced upward movement on mobile
        opacity: 0,
        filter: "blur(10px)",
        ease: "none"
      });
    });

    return () => mm.revert(); // Cleans up this specific component's triggers
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative z-10 w-full px-6 md:px-20 pt-40 md:pt-40 min-h-screen bg-black/20 md:min-h-screen text-white"
    >
      <div ref={contentRef} className="max-w-4xl will-change-transform">
        {/* Adjusted text size and leading for mobile responsiveness */}
        <h1 className="text-5xl md:text-[8vw] font-semibold uppercase tracking-tighter leading-none md:leading-[0.85]">
          Curated<br />Collections.
        </h1>
        
        <div className="flex flex-col md:flex-row items-start gap-4 mt-6 md:mt-8">
          {/* Dot hidden on mobile for a cleaner look */}
          <div className="hidden md:block w-2 h-2 rounded-full bg-orange-600 mt-2" />
          
          <p className="text-base md:text-xl opacity-70 max-w-md font-light leading-relaxed">
            A celebration of craftsmanship and timeless elegance, 
            designed for those who appreciate the finer details.
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;