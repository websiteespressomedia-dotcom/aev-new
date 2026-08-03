/* eslint-disable */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import { useLocation } from "react-router-dom";

export default function ProductListingSection({ initialProducts = [] }: { initialProducts?: any[] }) {
  const { pathname } = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSizeFilter, setActiveSizeFilter] = useState("All");
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [visibleCount, setVisibleCount] = useState(4); // Show 4 products initially

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || p.category === activeFilter;
    const matchesSize = activeSizeFilter === "All" || p.size === activeSizeFilter;
    return matchesSearch && matchesFilter && matchesSize;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(4);
  }, [search, activeFilter, activeSizeFilter]);

  useEffect(() => {
    const handleFilterChange = (e: any) => {
      setActiveFilter(e.detail);
    };
    window.addEventListener('changeFilter', handleFilterChange as EventListener);

    // Handle hash navigation manually (fixes Lenis smooth scroll blocking native anchors)
    if (window.location.hash === '#product-listing') {
      setTimeout(() => {
        const el = document.getElementById('product-listing');
        if (el) {
          // Calculate an offset to put the section header right under the navbar
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }

    // Read filter and size from URL if navigated from Home page
    const params = new URLSearchParams(window.location.search);
    const filterFromUrl = params.get("filter");
    const sizeFromUrl = params.get("size");
    
    let hasURLFilter = false;
    if (filterFromUrl) {
      setActiveFilter(filterFromUrl);
      hasURLFilter = true;
    }
    if (sizeFromUrl) {
      setActiveSizeFilter(sizeFromUrl);
      hasURLFilter = true;
    }

    if (hasURLFilter) {
      setTimeout(() => {
        const el = document.getElementById('product-listing');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    }

    return () => window.removeEventListener('changeFilter', handleFilterChange as EventListener);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tiles = gridRef.current?.querySelectorAll(".tile-wrapper");
    
    // Using a simpler animation for mobile performance
    if (tiles) {
      gsap.fromTo(
        tiles,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "sine.out", // Sine is cheaper to calculate than Power2/3
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 92%", // Start slightly later to ensure smooth entry
            toggleActions: "play none none none",
            fastScrollEnd: true, // Crucial: prevents animation overlap during fast scrolls
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [search, activeFilter, activeSizeFilter, products]);

  return (
    <section id="product-listing" ref={sectionRef} className="relative min-h-screen bg-black text-white">
      <div className="sticky top-0 z-10 bg-black backdrop-blur-2xl pt-16 md:pt-22 border-b border-white/20 px-4 md:px-12 lg:px-20 py-4 md:py-8 will-change-transform">
        <div className="flex flex-col gap-4 md:gap-6">
          
          <div className="flex flex-col">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-orange-600 mb-1">
              Explore
            </h3>
            <h2 className="text-2xl text-white md:text-5xl font-bold tracking-tighter uppercase italic leading-none">
              The Collection
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center text-white gap-6">
            <div className="relative w-full lg:w-72 shrink-0">
              <input 
                type="text" 
                placeholder="Search tiles..."
                className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-orange-600 transition-colors text-sm rounded-none appearance-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 w-full justify-end">
              {/* Category / Finish Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-zinc-400 font-bold w-14 md:w-16 shrink-0">Finish:</span>
                <div className="flex gap-2 overflow-x-auto w-full pb-1 no-scrollbar overscroll-x-contain touch-pan-x">
                  {['All', 'Liso', 'Carving', 'Highglossy', 'Glossy', 'Liso+Carving'].map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 border rounded-full text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest transition-all whitespace-nowrap active:bg-zinc-200 ${
                        activeFilter === filter 
                          ? "bg-white text-black border-white" 
                          : "border-white/20 hover:bg-white hover:text-black"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vertical Divider on Desktop */}
              <div className="hidden lg:block w-px h-6 bg-white/20 shrink-0" />

              {/* Sizes Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-zinc-400 font-bold w-14 md:w-16 shrink-0">Size:</span>
                <div className="flex gap-2 overflow-x-auto w-full pb-1 no-scrollbar overscroll-x-contain touch-pan-x">
                  {['All', '800x1600', '800x2400', '600x1200', '1200x1800'].map((sizeFilter) => (
                    <button 
                      key={sizeFilter}
                      onClick={() => setActiveSizeFilter(sizeFilter)}
                      className={`px-4 py-2 border rounded-full text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest transition-all whitespace-nowrap active:bg-zinc-200 ${
                        activeSizeFilter === sizeFilter 
                          ? "bg-white text-black border-white" 
                          : "border-white/20 hover:bg-white hover:text-black"
                      }`}
                    >
                      {sizeFilter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID AREA */}
      <div className="py-8 md:py-16 px-4 md:px-12 lg:px-20">
        <div 
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8 items-start"
        >
          {displayedProducts.length > 0 ? (
            displayedProducts.map((p, i) => {
              const hasPreview = p.previewImage && p.previewImage !== p.image;
              const urlPrefix = pathname.includes("large-format-porcelain-tiles") 
                ? "/large-format-porcelain-tiles" 
                : pathname.includes("porcelain-slab-tiles") 
                  ? "/porcelain-slab-tiles" 
                  : "/porcelain-floor-tiles";
              const sizeStr = p.size || "1000x1000";
              const [wStr, hStr] = sizeStr.toLowerCase().split("x");
              const tWidth = parseInt(wStr) || 1000;
              const tHeight = parseInt(hStr) || 1000;
              const dynamicAspectRatio = `${tWidth} / ${tHeight}`;
              
              return (
                <Link href={`${urlPrefix}/${p.id}`} key={i} className="tile-wrapper group cursor-pointer will-change-opacity block col-span-1 mx-auto w-full max-w-[260px] 2xl:max-w-[300px]">
                  <div 
                    className="relative bg-zinc-800 overflow-hidden rounded-sm translate-z-0"
                    style={{ aspectRatio: dynamicAspectRatio }}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {/* Tile base image */}
                    <div className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105 pointer-events-none select-none">
                      <Image 
                        src={p.image} 
                        alt={p.name} 
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className={`object-cover ${hasPreview ? "group-hover:opacity-0" : "group-hover:opacity-100"}`} 
                      />
                    </div>
                    {/* Preview image on hover */}
                    {hasPreview && (
                      <div className="absolute inset-0 opacity-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100 group-hover:opacity-100 pointer-events-none select-none">
                        <Image 
                          src={p.previewImage} 
                          alt={`${p.name} Preview`} 
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover" 
                        />
                      </div>
                    )}
                    {/* CSS-only hover mask + Invisible shield to prevent saving/dragging */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" style={{ WebkitUserDrag: 'none' } as any} />
                  </div>

                  <div className="mt-4 flex justify-between items-start px-1">
                    <div className="max-w-[75%]">
                      <h4 className="text-xs md:text-sm font-bold uppercase tracking-tight truncate">
                        {p.name}
                      </h4>
                      <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest mt-1">
                        {p.size}
                      </p>
                    </div>
                    <span className="text-[8px] md:text-[10px] font-bold py-1 px-2 bg-white/10 text-white/80 border border-white/10 rounded uppercase">
                      {p.category}
                    </span>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center text-white/50 text-xs uppercase tracking-widest">
              No products found.
            </div>
          )}
        </div>

        {filteredProducts.length > visibleCount && (
          <div className="mt-16 md:mt-24 text-center">
            <button 
              onClick={() => setVisibleCount(filteredProducts.length)}
              className="w-full md:w-auto px-12 py-5 bg-white/80 text-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-colors cursor-pointer"
            >
              Load More Designs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}