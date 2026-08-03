"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor || !textEl) return;

    // Only activate on true mouse/pointer devices
    const isTouchOnly =
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isTouchOnly) {
      cursor.style.display = "none";
      return;
    }

    // Show cursor and hide native cursor via injected style
    cursor.style.display = "flex";

    const style = document.createElement("style");
    style.id = "hide-native-cursor";
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Center and position cursor on the pointer
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      // Check if cursor is inside a [data-no-cursor] zone
      const noCursorZone = (e.target as Element)?.closest("[data-no-cursor]");
      const customTextZone = (e.target as Element)?.closest("[data-cursor-text]") as HTMLElement;

      if (noCursorZone) {
        // Hide orange dot only — keep native cursor hidden so only View circle shows
        gsap.to(cursor, { opacity: 0, width: 0, height: 0, duration: 0.15, overwrite: "auto" });
      } else {
        // Show orange cursor outside no-cursor zones
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          width: customTextZone ? 80 : 14,
          height: customTextZone ? 80 : 14,
          backgroundColor: customTextZone?.dataset?.cursorColor || "#ea580c",
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (customTextZone) {
          const txt = customTextZone.dataset.cursorText || "";
          if (textEl.innerText !== txt) {
            textEl.innerText = txt;
          }
          gsap.to(textEl, { opacity: 1, duration: 0.2 });
        } else {
          gsap.to(textEl, { opacity: 0, duration: 0.1 });
        }
      }
    };

    const onMouseEnterInteractive = (e: Event) => {
      const el = e.currentTarget as Element;
      if (el.closest("[data-cursor-text]")) return; // handled by move event
      gsap.to(cursor, {
        width: 32, // ≈ 14 * 2.2
        height: 32,
        backgroundColor: "#f97316",
        opacity: 0.85,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onMouseLeaveInteractive = (e: Event) => {
      const el = e.currentTarget as Element;
      if (el.closest("[data-cursor-text]")) return;
      gsap.to(cursor, {
        width: 14,
        height: 14,
        backgroundColor: "#ea580c",
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const attachListeners = () => {
      document
        .querySelectorAll(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer'
        )
        .forEach((el) => {
          // Don't attach scale-up on interactive elements inside no-cursor zones
          if (!el.closest("[data-no-cursor]")) {
            el.addEventListener("mouseenter", onMouseEnterInteractive);
            el.addEventListener("mouseleave", onMouseLeaveInteractive);
          }
        });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      document.getElementById("hide-native-cursor")?.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        backgroundColor: "#ea580c",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 999999,
        willChange: "transform, width, height, background-color",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span 
        ref={textRef} 
        style={{ 
          opacity: 0, 
          color: "white", 
          fontSize: "12px", 
          fontWeight: 700, 
          letterSpacing: "0.5px" 
        }}
      ></span>
    </div>
  );
}
