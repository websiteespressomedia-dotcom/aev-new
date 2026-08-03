"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const contactLinks = [
  { id: "gen", title: "General", detail: "hello@company.com", sub: "Collaborations & Press" },
  { id: "sal", title: "Project Sales", detail: "sales@company.com", sub: "Estimates & Catalogues" },
  { id: "cal", title: "Office Call", detail: "+91 123 456 7548", sub: "Mon — Fri, 10am - 6pm" },
];

export default function ContactForm() {
  const [role, setRole] = useState("architect");
  const [activeHover, setActiveHover] = useState<string | null>(null);

  return (
    <section className="bg-[#0a0a0a] text-white pt-12 md:pt-16 pb-24 md:pb-40 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP: INTERACTIVE INFO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-white/10 mb-20 md:mb-40">
          {contactLinks.map((link) => (
            <div 
              key={link.id}
              onMouseEnter={() => setActiveHover(link.id)}
              onMouseLeave={() => setActiveHover(null)}
              // Simple tap-to-reveal for mobile
              onClick={() => setActiveHover(activeHover === link.id ? null : link.id)}
              className="relative p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 group cursor-pointer overflow-hidden transition-colors"
            >
              <motion.div 
                initial={false}
                animate={{ y: activeHover === link.id ? 0 : "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 md:bg-white z-0"
              />
              
              <div className="relative z-10 transition-colors duration-300 group-hover:text-black">
                <p className={`text-[10px] uppercase tracking-[0.4em] mb-8 md:mb-12 transition-opacity`}>
                  {link.title}
                </p>
                <h3 className="text-xl md:text-2xl font-light mb-2 break-words">{link.detail}</h3>
                <p className={`text-xs font-serif italic transition-opacity`}>
                  {link.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM: THE JOURNAL FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-5xl md:text-6xl font-serif italic leading-tight">
              Start a <br className="hidden md:block" /> Conversation
            </h2>
            <p className="mt-6 md:mt-8 text-zinc-500 text-sm leading-relaxed max-w-xs font-light">
              Fill out the brief below. Our technical team will review your project requirements and reach out within one business day.
            </p>
          </div>

          <div className="lg:col-span-8">
            <form className="space-y-12 md:space-y-16" onSubmit={(e) => e.preventDefault()}>
              
              {/* THE MAD-LIBS STYLE INLINE FORM */}
              <div className="text-xl md:text-3xl lg:text-4xl font-serif leading-[1.8] text-white/90">
                <span className="inline-block mr-2">Greetings! My name is</span>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border-b border-white/20 bg-transparent focus:outline-none focus:border-white w-full md:w-auto min-w-[200px] placeholder:text-white/10 placeholder:italic transition-all px-2 py-1 mb-4 md:mb-0"
                />
                <span className="inline-block mx-2">, reaching out from</span>
                <input
                  type="text"
                  placeholder="Company/Studio"
                  className="border-b border-white/20 bg-transparent focus:outline-none focus:border-white w-full md:w-auto min-w-[240px] placeholder:text-white/10 placeholder:italic transition-all px-2 py-1 mb-4 md:mb-0"
                />
                
                <span className="inline-block mr-2 md:mt-4">. Find me at</span>
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="border-b border-white/20 bg-transparent focus:outline-none focus:border-white w-full md:w-auto min-w-[300px] placeholder:text-white/10 placeholder:italic transition-all px-2 py-1 mb-4 md:mb-0"
                />
                
                <span className="inline-block mx-2">or via</span>
                <input
                  type="tel"
                  placeholder="phone number"
                  className="border-b border-white/20 bg-transparent focus:outline-none focus:border-white w-full md:w-auto min-w-[200px] placeholder:text-white/10 placeholder:italic transition-all px-2 py-1"
                />

                {/* ROLE SELECTION */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-6 mt-12 md:mt-16">
                  <span className="text-lg md:text-2xl font-light opacity-50">I am a</span>
                  {["architect", "designer", "homeowner"].map((item) => (
                    <label key={item} className="flex items-center gap-3 md:gap-4 cursor-pointer group">
                      <div className={`w-2.5 h-2.5 rounded-full border border-white/30 transition-all ${role === item ? "bg-white scale-125" : "bg-transparent"}`}>
                        <input type="radio" className="hidden" checked={role === item} onChange={() => setRole(item)} />
                      </div>
                      <span className={`text-2xl md:text-3xl lg:text-4xl transition-all font-light ${role === item ? "opacity-100 italic" : "opacity-20 md:group-hover:opacity-40"}`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-baseline gap-x-4">
                  <span className="opacity-50">interested in</span>
                  <input
                    type="text"
                    placeholder="Specific Collection or Style..."
                    className="border-b border-white/20 bg-transparent focus:outline-none focus:border-white w-full md:flex-1 placeholder:text-white/10 placeholder:italic transition-all px-2 py-1 mt-2 md:mt-0"
                  />
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-16">
                <div>
                  <button type="submit" className="group flex items-center gap-6 text-xl md:text-2xl font-serif italic text-white transition-all">
                    <span className="h-px w-12 md:w-20 bg-white/20 md:group-hover:w-32 group-hover:bg-white transition-all duration-500" />
                    Submit Specification
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-10 md:gap-16 text-left md:text-right w-full md:w-auto">
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold mb-3">Direct Sales</p>
                    <p className="text-lg md:text-xl text-white font-serif italic">+91 123 456 7548</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold mb-3">Email</p>
                    <p className="text-lg md:text-xl text-white font-serif italic underline underline-offset-8 decoration-white/10">hello@company.com</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}