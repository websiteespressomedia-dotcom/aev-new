"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: "01",
    question: "Custom tile dimensions?",
    answer: "We offer bespoke sizing for projects over 500sqm, including specialized edge profiling for seamless transitions."
  },
  {
    id: "02",
    question: "Shipping lead times?",
    answer: "Standard collections dispatch in 7-10 days. Custom architectural orders require 4-6 weeks for precision curing."
  },
  {
    id: "03",
    question: "Requesting a sample kit?",
    answer: "Curated 'Materials Boxes' are available for studios. These include 10x10cm swatches of our core stone finishes."
  },
  {
    id: "04",
    question: "Slip resistance ratings?",
    answer: "Our external porcelain carries an R11 anti-slip rating, engineered for high-traffic wet areas and landscapes."
  }
];

export default function ContactFAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#0a0a0a] text-white py-24 md:py-40 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: THE INDEX */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-zinc-600 mb-8 md:mb-12 block font-bold">
              Common Inquiries
            </span>
            
            <div className="flex flex-col">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-white/5 last:border-0">
                  <button
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className="group w-full py-6 md:py-8 text-left outline-none"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={`text-[10px] font-mono transition-colors duration-500 ${activeIndex === index ? "text-white" : "text-zinc-800"}`}>
                        {faq.id}
                      </span>
                      <h3 className={`text-xl md:text-3xl font-light transition-all duration-500 ${activeIndex === index ? "md:translate-x-4 italic text-white" : "text-zinc-500 md:group-hover:text-zinc-300"}`}>
                        {faq.question}
                      </h3>
                    </div>
                  </button>

                  {/* MOBILE ONLY: INLINE ANSWER */}
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="pb-8 text-zinc-400 text-lg leading-relaxed font-light italic pr-4">
                          &quot;{faq.answer}&quot;
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE GHOST ANSWER (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 items-center lg:pl-20 border-l border-white/5 min-h-[400px]">
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-center"
                >
                  <p className="text-zinc-300 text-3xl md:text-4xl lg:text-5xl leading-tight font-light italic">
                    &quot;{faqs[activeIndex].answer}&quot;
                  </p>
                  
                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-px w-12 bg-zinc-800" />
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
                      Architectural_Ref_{faqs[activeIndex].id}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}