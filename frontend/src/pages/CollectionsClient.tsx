/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/collections/HeroSection";
import TileSection from "@/components/collections/TileSection";
import CategorySection from "@/components/collections/CategorySection";
import ProductListingSection from "@/components/collections/ProductListingSection";

export default function CollectionsClient({ products }: { products: any[] }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const giantLogoRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const giantLogo = giantLogoRef.current;
    const navLogo = document.querySelector("#nav-logo") as HTMLElement;
    const bgContainer = document.querySelector(".bg-container") as HTMLElement;

    if (!giantLogo || !navLogo || !heroRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    }, (context) => {
      // Use expect-error here to handle the dynamic context conditions
      // @ts-expect-error: context.conditions is defined by gsap.matchMedia at runtime
      const { isMobile } = context.conditions;

      // 1. Background Scrub (Responsive)
      gsap.to(bgContainer, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        scaleY: isMobile ? 0.8 : 0.55,
        scaleX: isMobile ? 0.8 : 0.45,
        y: isMobile ? -300 : -800,
        opacity: 0.5,
      });

      // 2. Instant Toggle of Logos on Scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        onEnter: () => {
          gsap.set(navLogo, { opacity: 1, pointerEvents: "auto" });
          gsap.set(giantLogo, { opacity: 0 });
        },
        onLeaveBack: () => {
          gsap.set(navLogo, { opacity: 0, pointerEvents: "none" });
          gsap.set(giantLogo, { opacity: 1 });
        },
      });
    });

    return () => {
      mm.revert(); // Essential for cleaning up memory and resizing
    };
  }, []);

  return (
    <main ref={triggerRef} className="relative bg-black min-h-[300vh]">
      {/* GLOBAL BACKGROUND */}
      <div className="bg-container fixed inset-0 z-0 opacity-80 will-change-transform">
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
      </div>

      {/* SECTION STACK */}
      <HeroSection ref={heroRef} />
      
      <TileSection />

      {/* Responsive Margin: 
          On mobile, sections stack naturally. 
          On desktop, we pull the categories up for the parallax feel. 
      */}
      <div className="relative z-20 mt-0 md:-mt-[100vh]">
        <CategorySection />
      </div>

      <div className="relative z-30">
        <ProductListingSection initialProducts={products} />
      </div>

      {/* GIANT LOGO (Responsive Wrapper) */}
      <div className="fixed inset-0 z-20 flex items-end pb-10 md:pb-20 justify-center pointer-events-none px-6">
        <h2 
          ref={giantLogoRef} 
          className="w-full max-w-[1200px] leading-none tracking-tighter will-change-transform"
        >
          <Image 
            src="/images/logo/Aevitas_Logo_W.png" 
            alt="Logo" 
            width={1200} 
            height={200} 
            className="w-full h-auto pt-2" 
            priority 
          />
        </h2>
      </div>
    </main>
  );
}