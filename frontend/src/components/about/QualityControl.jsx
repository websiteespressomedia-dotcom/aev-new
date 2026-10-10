import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./QualityControl.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONTENT
   ========================================================= */

const EYEBROW = "Laboratory Testing";
const TITLE_WORDS = ["Quality", "Control"];
const TEXT =
  "Architectural grade testing protocols for precision masonry, material density, and surface durability.";

const VIDEOS = [
  {
    id: 1,
    src: "/videos/box-pack.mp4",
    poster: "/images/categories/granite.png",
    name: "Packing inspection",
  },
  {
    id: 2,
    src: "/videos/diagonal-check.mp4",
    poster: "/images/categories/quartz.jpg",
    name: "Diagonal measurement",
  },
  {
    id: 3,
    src: "/videos/glossiness-check.mp4",
    poster: "/images/categories/porcelain.webp",
    name: "Gloss level test",
  },
  {
    id: 4,
    src: "/videos/thickness-check.mp4",
    poster: "/images/categories/marble.jpg",
    name: "Thickness check",
  },
  {
    id: 5,
    src: "/videos/box-pack.mp4",
    poster: "/images/categories/granite.png",
    name: "Packing inspection",
  },
  {
    id: 6,
    src: "/videos/diagonal-check.mp4",
    poster: "/images/categories/quartz.jpg",
    name: "Diagonal measurement",
  },
  {
    id: 7,
    src: "/videos/glossiness-check.mp4",
    poster: "/images/categories/marble.jpg",
    name: "Gloss level test",
  },
  {
    id: 8,
    src: "/videos/box-pack.mp4",
    poster: "/images/categories/porcelain.webp",
    name: "Packing inspection",
  },
  {
    id: 9,
    src: "/videos/thickness-check.mp4",
    poster: "/images/categories/granite.png",
    name: "Thickness check",
  },
];

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* =========================================================
   ONE VIDEO TILE
   Mouse: hover to play, leave to stop
   Touch: tap to play / pause
   ========================================================= */

const QcTile = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const play = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const pause = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.pause();
    setPlaying(false);
  };

  const toggle = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const onKey = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={`qc-tile${playing ? " is-playing" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`${video.name}, ${playing ? "pause" : "play"} video`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          play();
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          pause();
        }
      }}
      onClick={() => {
        if (!canHover()) {
          toggle();
        }
      }}
      onKeyDown={onKey}
    >
      <div className="qc-media">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          poster={video.poster}
          onContextMenu={(event) => event.preventDefault()}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        <div className="qc-shade" />
      </div>

      <span className="qc-corner qc-corner-tl" />
      <span className="qc-corner qc-corner-br" />

      <div className="qc-play" aria-hidden="true">
        <span />
      </div>

      <div className="qc-label">
        <span className="qc-code">
          QC&nbsp;·&nbsp;{String(video.id).padStart(2, "0")}
        </span>

        <span className="qc-name">{video.name}</span>
      </div>
    </div>
  );
};

/* =========================================================
   SECTION
   ========================================================= */

const QualityControl = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return undefined;

    const mm = gsap.matchMedia();

    /*
      Keep the exact GSAP behavior from the supplied TSX.
      "all" is a catch-all media query.
    */
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        all: "(min-width: 0px)",
      },
      (context) => {
        const reduce = context.conditions?.reduce;

        if (reduce) return;

        const eyebrow = root.querySelector(".qc-eyebrow");
        const words = gsap.utils.toArray(".qc-title-word", root);
        const text = root.querySelector(".qc-text");
        const grid = root.querySelector(".qc-grid");
        const tiles = gsap.utils.toArray(".qc-tile", root);
        const medias = gsap.utils.toArray(".qc-media", root);

        if (!eyebrow || !text || !grid) return;

        const SHUT = "inset(0% 50% 0% 50% round 14px)";
        const OPEN = "inset(0% 0% 0% 0% round 14px)";

        /* ---------- initial animation state ---------- */

        gsap.set(eyebrow, {
          opacity: 0,
          y: 16,
        });

        gsap.set(words, {
          yPercent: 115,
        });

        gsap.set(text, {
          opacity: 0,
          filter: "blur(10px)",
        });

        gsap.set(tiles, {
          clipPath: SHUT,
        });

        gsap.set(medias, {
          scale: 1.25,
        });

        /* ---------- header animation ---------- */

        const headerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        });

        headerTimeline
          .to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          })
          .to(
            words,
            {
              yPercent: 0,
              duration: 1.2,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.4"
          )
          .to(
            text,
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.3,
              ease: "power2.out",
            },
            "-=0.8"
          );

        /* ---------- video tile reveal ---------- */

        const gridTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
            once: true,
          },
        });

        gridTimeline
          .to(
            tiles,
            {
              clipPath: OPEN,
              duration: 1.1,
              stagger: 0.09,
              ease: "power3.inOut",
            },
            0
          )
          .to(
            medias,
            {
              scale: 1,
              duration: 1.6,
              stagger: 0.09,
              ease: "power3.out",
            },
            0
          );

        return () => {
          headerTimeline.kill();
          gridTimeline.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="qc" aria-labelledby="qc-title">
      <div className="qc-inner">
        {/* ---------- header ---------- */}

        <header className="qc-head">
          <div className="qc-head-left">
            <div className="qc-eyebrow">
              <i />
              <span>{EYEBROW}</span>
            </div>

            <h2
              id="qc-title"
              className="qc-title"
              aria-label={TITLE_WORDS.join(" ")}
            >
              {TITLE_WORDS.map((word) => (
                <span
                  className="qc-title-row"
                  key={word}
                  aria-hidden="true"
                >
                  <span className="qc-title-word">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          <p className="qc-text">{TEXT}</p>
        </header>

        {/* ---------- video mosaic ---------- */}

        <div className="qc-grid">
          {VIDEOS.map((video) => (
            <QcTile key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityControl;
