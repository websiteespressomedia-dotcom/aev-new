"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const values = [
  {
    id: "01",
    title: "Curated Excellence",
    description: "We carefully select tile collections from trusted manufacturing partners to offer designs that balance aesthetics, performance, and market demand.",
    tags: ["Classic", "Durable", "Symmetry"],
    image: "/images/hero/core1.avif",
  },
  {
    id: "02",
    title: "Reliable Supply",
    description: "Our focus is on consistency, transparency, and smooth coordination — ensuring our partners receive the right solutions when they need them.",
    tags: ["Eco-friendly", "Premium", "Ethical"],
    image: "/images/hero/core2.avif",
  },
  {
    id: "03",
    title: "Global Approach",
    description: "We understand diverse market needs and deliver tile solutions designed to serve international showrooms, projects, and professionals.",
    tags: ["Personalized", "Trust", "Unique"],
    image: "/images/hero/core3.avif",
  },
  {
    id: "04",
    title: "Quality Assurance",
    description: "Every collection is aligned with expectations of durability, finish, and long-term performance.",
    tags: ["Smart Homes", "Practicality", "Bespoke"],
    image: "/images/hero/core4.avif",
  },
  {
    id: "05",
    title: "Partnership Driven",
    description: "We build lasting relationships by supporting our clients beyond supply — becoming a dependable extension of their business.",
    tags: ["Classic", "Durable", "Symmetry"],
    image: "/images/hero/core1.avif",
  },
];

const CoreValues = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Toggle function for mobile tap support
  const handleInteraction = (index: number) => {
    if (hoveredIndex === index) {
      setHoveredIndex(null);
    } else {
      setHoveredIndex(index);
    }
  };

  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-16 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4 block font-bold">
            Our Philosophy
          </span>
          <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter">
            Core Values
          </h2>
        </div>

        <div className="border-t border-white/10">
          {values.map((value, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={value.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleInteraction(index)}
                className={`relative flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-b border-white/10 cursor-pointer ${
                  isHovered ? "bg-white/[0.03]" : "bg-transparent"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-20 px-2 md:px-10 py-10 md:py-14">
                  
                  {/* 1. NUMBERING */}
                  <div className="flex items-start gap-1 min-w-[60px] md:min-w-[80px]">
                    <span className={`text-3xl md:text-3xl font-light transition-all duration-500 ${
                      isHovered ? "text-white md:text-5xl" : "text-white/20 md:text-3xl"
                    }`}>
                      {value.id}
                    </span>
                    <span className="text-orange-600 text-xl font-bold">.</span>
                  </div>

                  {/* 2. IMAGE REVEAL (Hidden on mobile for cleaner vertical flow) */}
                  <div className="hidden lg:block w-80 relative">
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.1, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.1, x: -10 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          style={{ transformOrigin: "left top" }}
                          className="absolute top-0 left-0 w-80 aspect-video rounded-sm overflow-hidden shadow-2xl z-10 pointer-events-none"
                        >
                          <Image
                            src={value.image}
                            alt={value.title}
                            fill
                            className="object-cover"
                            sizes="320px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 3. CONTENT AREA */}
                  <div className="flex-1">
                    <h3 className={`text-3xl md:text-4xl font-medium transition-all duration-500 leading-none tracking-tight ${
                      isHovered ? "text-white lg:text-5xl" : "text-white/40"
                    }`}>
                      {value.title}
                    </h3>

                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? (window.innerWidth < 768 ? 16 : 24) : 0
                      }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      {/* Mobile-only image if you want visual representation on small screens */}
                      <div className="block lg:hidden w-full aspect-video relative mb-6 rounded-sm overflow-hidden">
                         <Image src={value.image} alt={value.title} fill className="object-cover" />
                      </div>

                      <p className="text-zinc-400 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                        {value.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {value.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500 font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* 4. MOBILE INDICATOR */}
                  <div className="absolute right-4 top-12 md:hidden">
                    <motion.span 
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      className="text-2xl text-white/20 font-light"
                    >
                      +
                    </motion.span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;