"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoData {
  id: number;
  src: string;
  poster: string;
}

const videos: VideoData[] = [
  { id: 1, src: "/videos/box-pack.mp4", poster: "/images/categories/granite.png" },
  { id: 2, src: "/videos/diagonal-check.mp4", poster: "/images/categories/quartz.jpg" },
  { id: 3, src: "/videos/glossiness-check.mp4", poster: "/images/categories/porcelain.webp" },
  { id: 4, src: "/videos/thickness-check.mp4", poster: "/images/categories/marble.jpg" },
  { id: 5, src: "/videos/box-pack.mp4", poster: "/images/categories/granite.png" },
  { id: 6, src: "/videos/diagonal-check.mp4", poster: "/images/categories/quartz.jpg" },
  { id: 7, src: "/videos/glossiness-check.mp4", poster: "/images/categories/marble.jpg" },
  { id: 8, src: "/videos/box-pack.mp4", poster: "/images/categories/porcelain.webp" },
  { id: 9, src: "/videos/thickness-check.mp4", poster: "/images/categories/granite.png" },
];

const QualityVideo = ({ video, index }: { video: VideoData; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.error("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-xl bg-white/5 group cursor-pointer transition-all duration-500
        ${index === 0 || index === 4 ? "md:col-span-2 aspect-video" : "col-span-1 aspect-[4/5]"}
        ${index > 4 ? "hidden md:block" : "block"} 
      `}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? "opacity-100 scale-105" : "opacity-40"}`}
        poster={video.poster}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src={video.src} type="video/mp4" />
      </video>
      
      {/* UI OVERLAY */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? "bg-transparent" : "bg-black/20 group-hover:bg-black/40"}`}>
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-500 ${isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </div>
        
        {/* Pause Indicator on Hover (Desktop Only) */}
        {isPlaying && (
          <div className="hidden md:flex opacity-0 group-hover:opacity-100 w-14 h-14 rounded-full border border-white/20 items-center justify-center backdrop-blur-md transition-opacity">
            <div className="flex gap-1.5">
               <div className="w-1.5 h-5 bg-white" />
               <div className="w-1.5 h-5 bg-white" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-mono text-white/40">QC_SCAN_0{video.id}</p>
      </div>
    </div>
  );
};

export default function QualityControl() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Animation: Staggered "Slide Up & Blur"
      // We target each word for a more sophisticated look
      const words = headingRef.current?.innerText.split(" ");
      if (headingRef.current) {
        headingRef.current.innerHTML = words
          ?.map(word => `<span class="inline-block overflow-hidden"><span class="heading-word inline-block">${word}</span></span>`)
          .join(" ") || "";
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".heading-word", {
        yPercent: 100,
        rotateX: -40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      })
      // 2. Text Reveal: Character-by-character or line fade
      .fromTo(textRef.current, 
        { 
          opacity: 0, 
          filter: "blur(10px)",
          y: 20 
        }, 
        { 
          opacity: 1, 
          filter: "blur(0px)", 
          y: 0, 
          duration: 1.5,
          ease: "power2.out"
        }, 
        "-=0.8"
      )
      // 3. Grid Reveal
      .fromTo(gridRef.current?.children || [], 
        { 
          y: 60, 
          opacity: 0,
          scale: 0.95
        }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          stagger: 0.1, 
          ease: "expo.out" 
        }, 
        "-=1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] text-white py-24 md:py-40 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <div className="overflow-hidden mb-4">
          <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
             Laboratory Testing
          </span>
        </div>

        <h2 
          ref={headingRef} 
          className="text-5xl md:text-[8rem] font-serif uppercase tracking-tighter leading-[0.85] mb-8 perspective-1000"
        >
          Quality Control
        </h2>
        
        <p 
          ref={textRef} 
          className="max-w-xl text-zinc-500 text-sm md:text-lg font-light leading-relaxed mb-16 md:mb-24 px-4"
        >
          Architectural grade testing protocols for precision masonry, material density, and surface durability.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full">
          {videos.map((video, index) => (
            <QualityVideo key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .heading-word {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}