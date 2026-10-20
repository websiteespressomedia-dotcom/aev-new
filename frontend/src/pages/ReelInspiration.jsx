import { useEffect, useRef, useState } from 'react';
import './ReelInspiration.css';

// Replace the example paths and Instagram URLs with your Aevitas reels.
// Keep MP4s inside your project's public/videos/ folder.
const REEL_ITEMS = [
  {
    id: '01',
    video: '/video/instaReel1.mp4',
    poster: '/terrace_preview.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DZbohI-E5gD/',
  },
  {
    id: '02',
    video: '/video/instaReel2.mp4',
    poster: '/residential_preview.png',
    instagramUrl: 'https://www.instagram.com/reel/DapoWF5lHi8/',
  },
  {
    id: '03',
    video: '/video/instaReel3.mp4',
    poster: '/office_preview.png',
    instagramUrl: 'https://www.instagram.com/reel/DeB9JjalU7b/',
  },
  {
    id: '04',
    video: '/video/instaReel4.mp4',
    poster: '/commercial_preview.png',
    instagramUrl: 'https://www.instagram.com/reel/DZborLqlCiZ/',
  },
  {
    id: '05',
    video: '/video/instaReel5.mp4',
    poster: '/kitchen_preview.png',
    instagramUrl: 'https://www.instagram.com/reel/DVyHzTzk_rE/',
  },
  {
    id: '06',
    video: '/video/instaReel6.mp4',
    poster: '/floor_preview.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DZsAkMvDHvd/',
  },
  {
    id: '07',
    video: '/video/instaReel7.mp4',
    poster: '/floor_preview.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DeiwfTZko_y/',
  },
  {
    id: '08',
    video: '/video/instaReel8.mp4',
    poster: '/floor_preview.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DZuotyTFbf7/',
  },
  {
    id: '09',
    video: '/video/instaReel9.mp4',
    poster: '/floor_preview.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DVyLUz3kwO2/',
  },
];

export default function ReelInspiration() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefs = useRef([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let sectionObserver;
    let videoObserver;

    // Reveal the section when it enters the viewport.
    if (reducedMotion || !('IntersectionObserver' in window)) {
      section.classList.add('is-in-view');
    } else {
      sectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-in-view');
          sectionObserver.disconnect();
        }
      }, { threshold: 0.18 });

      sectionObserver.observe(section);
    }

    // Play videos only while they are near the viewport.
    if ('IntersectionObserver' in window) {
      videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting && !reducedMotion) {
            const playAttempt = video.play();
            if (playAttempt?.catch) playAttempt.catch(() => {});
          } else {
            video.pause();
          }
        });
      }, {
        threshold: 0.25,
        rootMargin: '80px 0px',
      });

      videoRefs.current.forEach((video) => {
        if (video) videoObserver.observe(video);
      });
    }

    return () => {
      sectionObserver?.disconnect();
      videoObserver?.disconnect();
      videoRefs.current.forEach((video) => video?.pause());
    };
  }, []);

  const scrollReels = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.72, 240),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const updateProgress = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;

    setProgress(
      maxScroll > 0 ? (track.scrollLeft / maxScroll) * 100 : 0
    );
  };

  return (
    <section
      className="ae-reels-section"
      ref={sectionRef}
      aria-labelledby="ae-reels-title"
    >
      {/* <div className="ae-reels-orbit" aria-hidden="true" /> */}

      <div className="ae-reels-layout">
        <div className="ae-reels-intro">
          <span className="ae-reels-eyebrow">
            <i />
            A closer look at living
          </span>

          <h2 className="ae-reels-title" id="ae-reels-title">
            Inspiration
            <em>in motion.</em>
          </h2>

          <div className="ae-reels-bottomline">
            <div className="ae-reels-progress-wrap" aria-hidden="true">
              <div className="ae-reels-progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>

              <span className="ae-reels-progress-label">
                DRAG TO EXPLORE
              </span>
            </div>

            <div className="ae-reels-controls">
              <button
                type="button"
                className="ae-reels-arrow"
                onClick={() => scrollReels(-1)}
                aria-label="Previous reels"
              >
                ←
              </button>

              <button
                type="button"
                className="ae-reels-arrow"
                onClick={() => scrollReels(1)}
                aria-label="Next reels"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="ae-reels-gallery">
          <div
            className="ae-reels-track"
            ref={trackRef}
            onScroll={updateProgress}
            aria-label="Aevitas video reels"
          >
            {REEL_ITEMS.map((reel, index) => (
              <article
                className="ae-reel-card"
                key={reel.id}
                style={{ '--reel-index': index }}
              >
                <div className="ae-reel-frame">
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    src={reel.video}
                    poster={reel.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    aria-label={reel.title}
                  />

                  <div className="ae-reel-shade" aria-hidden="true" />

                  <span className="ae-reel-number">
                    {reel.id}
                  </span>

                  {reel.instagramUrl ? (
                    <a
                      className="ae-reel-open"
                      href={reel.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${reel.title} on Instagram`}
                    >
                      ↗
                    </a>
                  ) : (
                    <span
                      className="ae-reel-open ae-reel-open--placeholder"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="ae-reels-gallery-foot">
            <span>CRAFTED SURFACES. CONSIDERED SPACES.</span>
            <span>
              {String(REEL_ITEMS.length).padStart(2, '0')} STORIES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}