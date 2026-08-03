/* eslint-disable */
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import gsap from "gsap";

export default function ProductDetailClient({ group }: { group: any }) {
  // Collect all unique sizes from variations
  const allSizes: string[] = Array.from(
    new Set(group.variations.map((v: any) => v.size).filter(Boolean))
  );

  const [activeSize, setActiveSize] = useState<string>(allSizes[0] || "");
  
  // Filter variations to those matching the active size
  const sizeVariations = group.variations.filter(
    (v: any) => !activeSize || v.size === activeSize
  );

  const [activeVariation, setActiveVariation] = useState(sizeVariations[0] || group.variations[0]);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainImageRef.current && detailsRef.current) {
      gsap.fromTo(mainImageRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(Array.from(detailsRef.current.children),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const handleSizeClick = (size: string) => {
    if (size === activeSize) return;
    setActiveSize(size);
    // Set first variation of new size as active
    const newVariations = group.variations.filter((v: any) => v.size === size);
    if (newVariations.length > 0) {
      setActiveVariation(newVariations[0]);
      if (mainImageRef.current) {
        gsap.fromTo(mainImageRef.current, { opacity: 0.5 }, { opacity: 1, duration: 0.4 });
      }
    }
  };

  const handleThumbnailClick = (variation: any) => {
    if (variation.image === activeVariation.image) return;
    setActiveVariation(variation);
    if (mainImageRef.current) {
      gsap.fromTo(mainImageRef.current, { opacity: 0.6 }, { opacity: 1, duration: 0.4 });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${activeVariation.name} - Aevitas Ceramics`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const hasUniquePreview =
    activeVariation.previewImage && activeVariation.previewImage !== activeVariation.image;

  const sizeString = activeVariation.size || group.size || "1000x1000";
  const [wStr, hStr] = sizeString.toLowerCase().split("x");
  const tWidth = parseInt(wStr) || 1000;
  const tHeight = parseInt(hStr) || 1000;
  const dynamicAspectRatio = `${tWidth} / ${tHeight}`;

  return (
    <div className="min-h-screen bg-[#F3F0EB] text-[#3D2B1F] pt-24 md:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/collections#product-listing"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:opacity-60 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Collections
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Active Image */}
          <div className="lg:col-span-6 flex flex-col gap-4 items-center">
            <div className="max-w-[440px] w-full mx-auto">
              <div
                ref={mainImageRef}
                className="relative w-full overflow-hidden transition-all duration-300"
                style={{ aspectRatio: dynamicAspectRatio, WebkitUserDrag: "none" } as any}
                onContextMenu={(e) => e.preventDefault()}
              >
                <div className="absolute inset-0 pointer-events-none select-none">
                  <Image
                    src={activeVariation.image}
                    alt={activeVariation.name}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                </div>
                <div className="absolute inset-0 z-10" style={{ WebkitUserDrag: "none" } as any} />
              </div>
            </div>
            <p className="text-xs text-center uppercase tracking-widest opacity-40">
              High-Resolution Tile
            </p>
          </div>

          {/* Right: Details & Controls */}
          <div ref={detailsRef} className="lg:col-span-6 flex flex-col">

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-2 leading-tight">
              {activeVariation.name}
            </h1>

            {/* Finish & Size info */}
            <div className="flex flex-col gap-0 mt-8">
              <div className="flex items-center justify-between border-b border-[#3D2B1F]/10 py-4">
                <span className="text-xs uppercase tracking-widest font-bold opacity-50">Finish</span>
                <span className="text-sm font-medium">{activeVariation.category || group.category}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#3D2B1F]/10 py-4">
                <span className="text-xs uppercase tracking-widest font-bold opacity-50">Size</span>
                <span className="text-sm font-medium">{activeVariation.size || group.size}</span>
              </div>
            </div>

            {/* ── Available Sizes ── */}
            {allSizes.length > 1 && (
              <div className="mt-10">
                <h3 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-4">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSizes.map((size) => {
                    const isActive = size === activeSize;
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeClick(size)}
                        style={{
                          padding: "10px 20px",
                          border: isActive ? "2px solid #3D2B1F" : "1px solid rgba(61,43,31,0.25)",
                          background: isActive ? "#3D2B1F" : "transparent",
                          color: isActive ? "#F3F0EB" : "#3D2B1F",
                          fontSize: "11px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          borderRadius: "2px",
                          opacity: 1,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(61,43,31,0.08)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          }
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Available Variations (Thumbnails) ── */}
            {sizeVariations.length > 1 && (
              <div className="mt-10">
                <h3 className="text-xs uppercase tracking-widest font-bold opacity-50 mb-4">
                  Available Variations
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sizeVariations.map((v: any, idx: number) => {
                    const isActive = activeVariation.image === v.image;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleThumbnailClick(v)}
                        onContextMenu={(e) => e.preventDefault()}
                        style={{
                          position: "relative",
                          width: "72px",
                          height: "72px",
                          overflow: "hidden",
                          flexShrink: 0,
                          outline: isActive ? "2px solid #3D2B1F" : "1px solid rgba(61,43,31,0.15)",
                          outlineOffset: isActive ? "3px" : "0px",
                          opacity: isActive ? 1 : 0.55,
                          transition: "all 0.25s ease",
                          background: "#e0dbd5",
                          cursor: "pointer",
                          borderRadius: "2px",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) (e.currentTarget as HTMLButtonElement).style.opacity = "0.55";
                        }}
                      >
                        <div className="absolute inset-0 pointer-events-none select-none">
                          <Image
                            src={v.image}
                            alt={v.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 z-10" style={{ WebkitUserDrag: "none" } as any} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Share Button */}
            <div className="mt-10">
              <button
                onClick={handleShare}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  border: "1.5px solid #3D2B1F",
                  background: "transparent",
                  color: "#3D2B1F",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#3D2B1F";
                  (e.currentTarget as HTMLButtonElement).style.color = "#F3F0EB";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#3D2B1F";
                }}
              >
                <Share2 size={14} /> Share Design
              </button>
            </div>

            {/* Description */}
            <div className="mt-auto pt-16">
              <p className="text-sm leading-relaxed opacity-70">
                Crafted with precision, the {activeVariation.name} collection delivers an authentic
                texture and stunning visual depth to elevate any architectural space.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Full-bleed Room Preview */}
      {hasUniquePreview && (
        <div className="mt-24 w-full">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-12">
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#3D2B1F] mb-3">
              Room Application
            </h2>
            <p className="text-sm uppercase tracking-widest opacity-50">
              See how {activeVariation.name} transforms a space
            </p>
          </div>
          <div
            className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="absolute inset-0 pointer-events-none select-none">
              <Image
                src={activeVariation.previewImage}
                alt={`${activeVariation.name} Preview in room`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 z-10" style={{ WebkitUserDrag: "none" } as any} />
          </div>
        </div>
      )}
    </div>
  );
}
