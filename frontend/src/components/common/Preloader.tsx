"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = ""; 
      }
    });

    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value).toString() + "%";
        }
      }
    });

    tl.to(
      counterRef.current,
      { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" },
      "+=0.2"
    );

    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      },
      "-=0.1"
    );
  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f5f5f5]"
    >
      <div className="absolute top-8 left-8 text-sm font-serif uppercase tracking-widest opacity-50">
        Aevitas Ceramics
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div 
          ref={counterRef} 
          className="text-[15vw] md:text-[10vw] font-serif leading-none tracking-tighter"
        >
          0%
        </div>
        <div className="text-sm uppercase tracking-widest mt-4 opacity-50 font-serif">
          Loading Experience
        </div>
      </div>
    </div>
  );
}
