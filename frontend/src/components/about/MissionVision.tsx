"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MISSION_DESC = "To connect global markets with India's finest ceramic capabilities by delivering curated tile solutions, consistent quality, and seamless supply experiences that support projects of every scale.";
const VISION_DESC = "To become a globally trusted ceramic solutions partner, empowering architects, developers, and businesses with exceptional tile collections, reliable supply, and world-class service.";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(sectionRef.current);
    
    // Fade in text elements
    gsap.fromTo(q('.fade-up'), 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out"
      }
    );

    // Parallax/fade for images
    gsap.fromTo(q('.img-reveal'),
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        scale: 1, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power3.out"
      }
    );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* ── Top Header Section ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20">
          <div className="fade-up text-[#3D2B1F]/60 text-xs tracking-[0.3em] uppercase font-semibold whitespace-nowrap mb-8 lg:mb-0 lg:w-1/4">
            MISSION & VISION
          </div>
          <h2 className="fade-up text-3xl md:text-4xl lg:text-[44px] font-serif text-[#3D2B1F] tracking-tight leading-[1.2] lg:w-3/4 lg:text-center uppercase">
            WE BELIEVE INTERIOR DESIGN<br className="hidden md:block" /> IS MORE THAN VISUAL BEAUTY
          </h2>
        </div>

        {/* ── 3-Column Grid Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Text Content */}
          <div className="lg:col-span-4 flex flex-col pt-4 lg:pt-12 pr-0 lg:pr-8">
            <div className="mb-16">
              <h3 className="fade-up text-2xl lg:text-3xl font-sans text-[#3D2B1F] mb-6">
                Our mission
              </h3>
              <p className="fade-up text-[#3D2B1F]/70 text-sm lg:text-base leading-relaxed font-sans max-w-sm">
                {MISSION_DESC}
              </p>
            </div>
            <div>
              <h3 className="fade-up text-2xl lg:text-3xl font-sans text-[#3D2B1F] mb-6">
                Our vision
              </h3>
              <p className="fade-up text-[#3D2B1F]/70 text-sm lg:text-base leading-relaxed font-sans max-w-sm">
                {VISION_DESC}
              </p>
            </div>
          </div>

          {/* Column 2: Large Image */}
          <div className="lg:col-span-5 img-reveal">
            <div className="relative w-full aspect-[3/4] rounded-[16px] overflow-hidden shadow-lg">
              <Image 
                src="/images/about/mission.jpg" 
                fill 
                alt="Our Mission" 
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Column 3: Small Image */}
          <div className="lg:col-span-3 img-reveal lg:pt-24">
            <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg">
              <Image 
                src="/images/about/vision.jpg" 
                fill 
                alt="Our Vision" 
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}