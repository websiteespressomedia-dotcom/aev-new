"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const locations = [
  {
    city: "Ahmedabad",
    address: "B906, Swati Trinity, SP ring road, Ahmedabad, Gujarat",
    phone: "+91 87581 17559", 
    email: "ahmedabad@aevitas.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.838210435648!2d72.46683978662529!3d22.992976163800925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b4edded74ef%3A0x2209f704b87c01f0!2sSWATI%20TRINITY!5e0!3m2!1sen!2sin!4v1773321189631!5m2!1sen!2sin",
    directions: "https://maps.app.goo.gl/JYDB17skygmjNJA48"
  },
  {
    city: "Morbi",
    address: "410, Pavansut Plaza, National Highway - 8, Morbi, Gujarat",
    phone: "+91 87581 17559",
    email: "morbi@aevitas.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.6868487762003!2d70.86700427605327!3d22.814064624075773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598d00365446b7%3A0xffb1a11e93b17603!2sPavansut%20Plaza!5e0!3m2!1sen!2sin!4v1773321462999!5m2!1sen!2sin",
    directions: "https://maps.app.goo.gl/d6kC6JvinURADcPZ9"
  }
];

export default function ContactMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = locations[activeIdx];

  return (
    <section className="bg-[#0a0a0a] py-24 md:py-40 px-6 md:px-16 border-t border-white/5 relative isolate">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* LEFT: LOCATION DATA */}
          <div className="lg:col-span-4 space-y-10 md:space-y-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 mb-4 block font-bold">Navigation</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-white leading-tight">Visit our <br /> Offices</h2>
              
              {/* LOCATION TOGGLE */}
              <div className="flex flex-wrap gap-3 mt-8">
                {locations.map((loc, i) => (
                  <button
                    key={loc.city}
                    onClick={() => setActiveIdx(i)}
                    className={`text-[9px] md:text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-full border transition-all duration-500 ${
                      activeIdx === i 
                      ? "bg-white text-black border-white" 
                      : "text-zinc-500 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {loc.city}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="space-y-10"
              >
                <div className="group">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-3 font-bold">Office Address</p>
                  <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed group-hover:text-white transition-colors">
                    {active.address}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2 font-bold">Direct Line</p>
                    <p className="text-zinc-400 font-light hover:text-white transition-colors">{active.phone}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2 font-bold">Inquiries</p>
                    <p className="text-zinc-400 font-light hover:text-white transition-colors break-all">{active.email}</p>
                  </div>
                </div>

                <motion.a 
                  whileHover={{ x: 5 }}
                  href={active.directions} 
                  target="_blank"
                  className="inline-flex items-center gap-4 py-4 px-8 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all group"
                >
                  Get Directions <span className="group-hover:translate-x-1 transition-transform">↘</span>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: THE INTERACTIVE MAP */}
          <div className="lg:col-span-8 relative aspect-square md:aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, filter: "grayscale(1) blur(10px)" }}
                animate={{ opacity: 1, filter: "grayscale(1) blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full"
              >
                <iframe
                  src={active.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0, 
                    filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' 
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Dark vignette overlay to soften edges */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
      </div>
    </section>
  );
}