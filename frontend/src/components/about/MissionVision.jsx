import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./MissionVision.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONTENT
   ========================================================= */

const MISSION_IMAGE = "/luxury_tile_craftsmanship.jpg";
const VISION_IMAGE = "/terrace_preview.jpg";

const INTRO_TEXT =
  "At Aevitas Ceramics, we connect global markets with India's finest ceramic capabilities through curated collections, consistent quality, and a supply network you can rely on.";

const MISSION_DESC =
  "To deliver exceptional ceramic solutions that support architects, developers, showrooms, and businesses with consistent quality, reliable supply, and a seamless global experience.";

const VISION_DESC =
  "To be a globally trusted partner in ceramic surfaces, empowering distinctive spaces with innovative collections, enduring quality, and a commitment to long-term value.";

const HEADING = [
  [
    { text: "Designed", accent: false },
    { text: "with", accent: false },
  ],
  [
    { text: "purpose.", accent: false },
  ],
  [
    { text: "Sourced", accent: true },
    { text: "with", accent: true },
  ],
  [
    { text: "confidence.", accent: true },
  ],
];

/* =========================================================
   COMPONENT
   ========================================================= */

const MissionVision = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(section.querySelectorAll("*"), {
          clearProps: "all",
        });

        return;
      }

      const get = (selector) =>
        section.querySelector(selector);

      const getAll = (selector) =>
        gsap.utils.toArray(selector, section);

      const visual = get(".mv-visual");
      const main = get(".mv-main-image");
      const second = get(".mv-secondary-image");
      const frame = get(".mv-frame");

      if (!visual || !main || !second || !frame) {
        return;
      }

      const eyebrow = get(".mv-eyebrow");
      const description = get(".mv-description");
      const meta = get(".mv-image-meta");
      const verticalLabel = get(".mv-vertical-label");
      const progressFill = get(".mv-progress-fill");

      const words = getAll(".mv-heading-word");
      const items = getAll(".mv-item");
      const bodies = getAll(".mv-item-body");
      const bars = getAll(".mv-item-bar");
      const corners = getAll(".mv-frame-corner");

      const numbers = getAll(".mv-en");
      const indexes = getAll(".mv-idx");
      const metaStates = getAll(".mv-meta-state span");

      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      if (eyebrow) {
        gsap.set(eyebrow, {
          opacity: 1,
          y: 0,
        });
      }

      gsap.set(words, {
        opacity: 0,
        yPercent: 110,
        rotateX: 10,
      });

      if (description) {
        gsap.set(description, {
          opacity: 0,
          y: 24,
        });
      }

      gsap.set(items, {
        opacity: 0,
        y: 30,
      });

      gsap.set(main, {
        clipPath:
          "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        scale: 1.1,
      });

      gsap.set(second, {
        clipPath:
          "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        scale: 1.08,
      });

      gsap.set(frame, {
        clipPath:
          "polygon(0 0, 0 0, 0 100%, 0 100%)",
      });

      gsap.set(corners, {
        scale: 0,
      });

      if (meta) {
        gsap.set(meta, {
          opacity: 0,
          x: 20,
        });
      }

      if (verticalLabel) {
        gsap.set(verticalLabel, {
          opacity: 0,
          y: 20,
        });
      }

      /* =====================================================
         INITIAL MISSION STATE
      ===================================================== */

      if (bodies[0]) {
        gsap.set(bodies[0], {
          opacity: 1,
        });
      }

      if (bodies[1]) {
        gsap.set(bodies[1], {
          opacity: 0.38,
        });
      }

      if (bars[0]) {
        gsap.set(bars[0], {
          scaleX: 1,
          transformOrigin: "left",
        });
      }

      if (bars[1]) {
        gsap.set(bars[1], {
          scaleX: 0,
          transformOrigin: "left",
        });
      }

      if (numbers[1]) {
        gsap.set(numbers[1], {
          color: "rgba(24, 35, 51, 0.4)",
        });
      }

      if (indexes[1]) {
        gsap.set(indexes[1], {
          color: "rgba(24, 35, 51, 0.4)",
        });
      }

      if (metaStates[1]) {
        gsap.set(metaStates[1], {
          opacity: 0,
          y: 8,
        });
      }

      if (progressFill) {
        gsap.set(progressFill, {
          scaleY: 0,
          transformOrigin: "top",
        });
      }

      /* =====================================================
         ENTRANCE ANIMATION
      ===================================================== */

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      if (eyebrow) {
        entrance.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      entrance.to(
        words,
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.25"
      );

      if (description) {
        entrance.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        );
      }

      entrance.to(
        main,
        {
          clipPath:
            "polygon(0 0, 100% 0, 96% 88%, 84% 100%, 0 100%)",
          scale: 1,
          duration: 1.35,
          ease: "power4.inOut",
        },
        "-=0.7"
      );

      if (meta) {
        entrance.to(
          meta,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.75"
        );
      }

      entrance.to(
        second,
        {
          clipPath:
            "polygon(12% 0, 100% 0, 100% 100%, 0 100%, 0 18%)",
          scale: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.7"
      );

      entrance.to(
        frame,
        {
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.7"
      );

      entrance.to(
        corners,
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.55"
      );

      entrance.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: "power3.out",
        },
        "-=0.35"
      );

      if (verticalLabel) {
        entrance.to(
          verticalLabel,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      /* =====================================================
         READ CURRENT IMAGE POSITIONS
      ===================================================== */

      const getBox = (element) => {
        const width = visual.clientWidth || 1;
        const height = visual.clientHeight || 1;

        return {
          left: `${(element.offsetLeft / width) * 100}%`,
          top: `${(element.offsetTop / height) * 100}%`,
          width: `${(element.offsetWidth / width) * 100}%`,
          height: `${(element.offsetHeight / height) * 100}%`,
        };
      };

      const mainBox = getBox(main);
      const secondBox = getBox(second);

      const borderWidth =
        parseFloat(
          window.getComputedStyle(second).borderTopWidth
        ) || 5;

      /* =====================================================
         MISSION → VISION SCROLL STORY
      ===================================================== */

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktopPin:
            "(min-width: 851px) and (min-height: 780px)",
        },
        (context) => {
          const shouldPin = context.conditions.desktopPin;

          const story = gsap.timeline({
            defaults: {
              ease: "power2.inOut",
            },

            scrollTrigger: shouldPin
              ? {
                  trigger: section,
                  start: "top top",
                  end: "+=110%",
                  pin: true,
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  refreshPriority: 1,
                }
              : {
                  trigger: visual,
                  start: "top 78%",
                  end: "bottom 35%",
                  scrub: 1,
                },
          });

          const hold = 0.4;

          story.to({}, {
            duration: hold,
          });

          /* Main image moves into secondary position */
          story.to(
            main,
            {
              ...secondBox,
              borderWidth,
              duration: 1.1,
            },
            hold
          );

          /* Secondary image moves into main position */
          story.to(
            second,
            {
              ...mainBox,
              borderWidth: 0,
              duration: 1.1,
            },
            hold
          );

          story.set(
            main,
            {
              zIndex: 20,
            },
            hold + 0.5
          );

          /* Mission fades */
          if (bodies[0]) {
            story.to(
              bodies[0],
              {
                opacity: 0.38,
                duration: 0.6,
              },
              hold + 0.3
            );
          }

          /* Vision appears */
          if (bodies[1]) {
            story.to(
              bodies[1],
              {
                opacity: 1,
                duration: 0.6,
              },
              hold + 0.3
            );
          }

          /* Mission gold bar disappears */
          if (bars[0]) {
            story.to(
              bars[0],
              {
                scaleX: 0,
                transformOrigin: "right",
                duration: 0.6,
              },
              hold + 0.3
            );
          }

          /* Vision gold bar appears */
          if (bars[1]) {
            story.to(
              bars[1],
              {
                scaleX: 1,
                transformOrigin: "left",
                duration: 0.6,
              },
              hold + 0.5
            );
          }

          /* Number states */
          if (numbers[0]) {
            story.to(
              numbers[0],
              {
                color: "rgba(24, 35, 51, 0.4)",
                duration: 0.5,
              },
              hold + 0.3
            );
          }

          if (numbers[1]) {
            story.to(
              numbers[1],
              {
                color: "#C1A673",
                duration: 0.5,
              },
              hold + 0.5
            );
          }

          /* Image indexes */
          if (indexes[0]) {
            story.to(
              indexes[0],
              {
                color: "rgba(24, 35, 51, 0.4)",
                duration: 0.5,
              },
              hold + 0.3
            );
          }

          if (indexes[1]) {
            story.to(
              indexes[1],
              {
                color: "#C1A673",
                duration: 0.5,
              },
              hold + 0.5
            );
          }

          /* Metadata */
          if (metaStates[0]) {
            story.to(
              metaStates[0],
              {
                opacity: 0,
                y: -8,
                duration: 0.4,
              },
              hold + 0.25
            );
          }

          if (metaStates[1]) {
            story.to(
              metaStates[1],
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
              },
              hold + 0.55
            );
          }

          story.to(
            {},
            {
              duration: 0.4,
            }
          );

          if (progressFill) {
            story.to(
              progressFill,
              {
                scaleY: 1,
                ease: "none",
                duration: story.duration(),
              },
              0
            );
          }
        }
      );

      /* =====================================================
         SUBTLE PARALLAX
      ===================================================== */

      gsap.to(".mv-main-image img", {
        yPercent: -8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(".mv-secondary-image img", {
        yPercent: 10,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.7,
        },
      });

      gsap.to(second, {
        y: 28,
        rotate: -1.2,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      gsap.to(frame, {
        y: 18,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".mv-heading", {
        y: -18,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      /* =====================================================
         REFRESH
      ===================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mission-vision-section"
      aria-labelledby="mission-vision-title"
    >
      <div className="mv-shell">

        {/* LEFT CONTENT */}

        <div className="mv-content">

          <div className="mv-eyebrow">
            <span className="mv-eyebrow-line" />

            <span className="mv-eyebrow-text">
              Mission &amp; Vision
            </span>

            <span className="mv-eyebrow-number">
              <span className="mv-en">01</span>
              <span>/</span>
              <span className="mv-en">02</span>
            </span>
          </div>


          <h2
            id="mission-vision-title"
            className="mv-heading"
          >
            {HEADING.map((row, rowIndex) => (
              <span
                className={`mv-heading-row ${
                  row[0].accent
                    ? "mv-heading-accent"
                    : ""
                }`}
                key={`row-${rowIndex}`}
              >
                {row.map((word, wordIndex) => (
                  <span
                    className="mv-heading-word"
                    key={`${word.text}-${wordIndex}`}
                  >
                    {word.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>


          <p className="mv-description">
            {INTRO_TEXT}
          </p>


          {/* MISSION / VISION */}

          <div className="mv-items">

            <article className="mv-item">

              <span className="mv-item-bar" />

              <div className="mv-item-body">

                <div className="mv-item-heading">
                  <span className="mv-item-number">
                    01
                  </span>

                  <span className="mv-item-line" />

                  <span className="mv-item-label">
                    Our Mission
                  </span>
                </div>

                <p>{MISSION_DESC}</p>

              </div>

            </article>


            <article className="mv-item">

              <span className="mv-item-bar" />

              <div className="mv-item-body">

                <div className="mv-item-heading">
                  <span className="mv-item-number">
                    02
                  </span>

                  <span className="mv-item-line" />

                  <span className="mv-item-label">
                    Our Vision
                  </span>
                </div>

                <p>{VISION_DESC}</p>

              </div>

            </article>

          </div>

        </div>


        {/* RIGHT VISUAL */}

        <div className="mv-visual">

          <div className="mv-image-meta">

            <span>
              Aevitas Ceramics
            </span>

            <span className="mv-meta-state">
              <span>Our Mission</span>
              <span>Our Vision</span>
            </span>

          </div>


          {/* GOLD FRAME */}

          <div className="mv-frame">

            <span className="mv-frame-corner mv-corner-tl" />
            <span className="mv-frame-corner mv-corner-tr" />
            <span className="mv-frame-corner mv-corner-br" />
            <span className="mv-frame-corner mv-corner-bl" />

          </div>


          {/* MAIN IMAGE */}

          <div className="mv-main-image">

            <img
              src={MISSION_IMAGE}
              alt="Aevitas Ceramics mission"
            />

            <div className="mv-image-overlay" />

          </div>


          {/* SECOND IMAGE */}

          <div className="mv-secondary-image">

            <img
              src={VISION_IMAGE}
              alt="Aevitas Ceramics vision"
            />

            <div className="mv-secondary-overlay" />

          </div>


          {/* GOLD VERTICAL LINE */}

          <div className="mv-image-line" />


          {/* IMAGE INDEX */}

          <div className="mv-image-index">

            <span className="mv-idx">
              01
            </span>

            <span className="mv-index-line" />

            <span className="mv-idx">
              02
            </span>

          </div>


          {/* SCROLL PROGRESS */}

          <div className="mv-progress">

            <span className="mv-progress-track" />

            <span className="mv-progress-fill" />

          </div>


          {/* SIDE LABEL */}

          <div className="mv-vertical-label">

            <span>Timeless</span>
            <span>Surfaces</span>
            <span>Enduring</span>
            <span>Design</span>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MissionVision;