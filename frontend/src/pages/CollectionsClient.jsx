import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/components/collections/HeroSection";
import TileSection from "@/components/collections/TileSection";
import CategorySection from "@/components/collections/CategorySection";
import ProductListingSection from "@/components/collections/ProductListingSection";

export default function CollectionsClient({ products }) {
  const triggerRef = useRef(null);
  const giantLogoRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const giantLogo = giantLogoRef.current;
    const navLogo = document.querySelector("#nav-logo");
    const bgContainer = document.querySelector(".bg-container");

    if (!navLogo || !heroRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        // Background scroll animation
        if (bgContainer) {
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
        }

        // Toggle logos on scroll
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          onEnter: () => {
            gsap.set(navLogo, {
              opacity: 1,
              pointerEvents: "auto",
            });

            if (giantLogo) {
              gsap.set(giantLogo, { opacity: 0 });
            }
          },
          onLeaveBack: () => {
            gsap.set(navLogo, {
              opacity: 0,
              pointerEvents: "none",
            });

            if (giantLogo) {
              gsap.set(giantLogo, { opacity: 1 });
            }
          },
        });
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <main
      ref={triggerRef}
      className="relative bg-black min-h-[300vh]"
    >
      {/* Background video */}
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

      {/* Page sections */}
      <HeroSection ref={heroRef} />

      <TileSection />

      <div className="relative z-20 mt-0 md:-mt-[100vh]">
        <CategorySection />
      </div>

      <div className="relative z-30">
        <ProductListingSection initialProducts={products} />
      </div>
    </main>
  );
}
