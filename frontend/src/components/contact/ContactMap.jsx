"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactMap.css";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    id: "ahmedabad",
    number: "01",
    city: "Ahmedabad",
    label: "Head Office",
    address: "B906, Swati Trinity, SP Ring Road, Ahmedabad, Gujarat, India",
    mapQuery: "B906, Swati Trinity, SP Ring Road, Ahmedabad, Gujarat, India",
    directions: "https://maps.app.goo.gl/JYDB17skygmjNJA48",
  },
  {
    id: "morbi",
    number: "02",
    city: "Morbi",
    label: "Ceramic Hub",
    address: "410, Pavansut Plaza, National Highway 8, Morbi, Gujarat, India",
    mapQuery: "410, Pavansut Plaza, National Highway 8, Morbi, Gujarat, India",
    directions: "https://maps.app.goo.gl/d6kC6JvinURADcPZ9",
  },
];

export default function ContactMap() {
  const sectionRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState("ahmedabad");
  const active = locations.find((location) => location.id === activeLocation) || locations[0];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cm-shell",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cm-eyebrow, .cm-heading, .cm-intro",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cm-section" ref={sectionRef} aria-labelledby="cm-heading">
      <div className="cm-shell">
        <div className="cm-topline">
          <span className="cm-eyebrow">
            <span className="cm-eyebrow-mark" aria-hidden="true" />
            FIND US
          </span>
          <span className="cm-topline-note">Aevitas Ceramics · Gujarat, India</span>
        </div>

        <div className="cm-heading-row">
          <div>
            <h2 className="cm-heading" id="cm-heading">
              Closer to <em>your next</em>
              <br />
              great space.
            </h2>
          </div>
          <p className="cm-intro">
            From conversations to crafted surfaces, we’re here to help you find the right
            direction for your project.
          </p>
        </div>

        <div className="cm-content">
          <div className="cm-location-panel">
            <div className="cm-panel-label">OUR LOCATIONS <span>—</span></div>

            <div className="cm-location-list" role="tablist" aria-label="Choose a location">
              {locations.map((location) => {
                const isActive = activeLocation === location.id;
                return (
                  <button
                    className={`cm-location-tab${isActive ? " is-active" : ""}`}
                    key={location.id}
                    id={`cm-tab-${location.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="cm-map-panel"
                    onClick={() => setActiveLocation(location.id)}
                  >
                    <span className="cm-location-number">{location.number}</span>
                    <span className="cm-location-name-wrap">
                      <span className="cm-location-name">{location.city}</span>
                      <span className="cm-location-label">{location.label}</span>
                    </span>
                    <span className="cm-location-arrow" aria-hidden="true">↗</span>
                  </button>
                );
              })}
            </div>

            <div className="cm-address-block">
              <span className="cm-address-label">VISIT US</span>
              <p className="cm-address">{active.address}</p>
              <a
                className="cm-directions"
                href={active.directions}
                target="_blank"
                rel="noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="cm-panel-footer">
              <span className="cm-footer-dot" aria-hidden="true" />
              <span>We look forward to meeting you.</span>
            </div>
          </div>

          <div
            className="cm-map-panel"
            id="cm-map-panel"
            role="tabpanel"
            aria-labelledby={`cm-tab-${active.id}`}
            key={active.id}
          >
            <div className="cm-map-frame">
              <iframe
                title={`${active.city} location map`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(active.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="cm-map-top-tag">
                <span className="cm-map-pin" aria-hidden="true">✦</span>
                <span>{active.city.toUpperCase()}</span>
              </div>
              <div className="cm-map-coordinates" aria-hidden="true">
                AEVITAS <span>•</span> {active.number}
              </div>
            </div>
            <div className="cm-map-caption">
              <span className="cm-caption-line" />
              <span>MADE TO BE FOUND. MADE TO LAST.</span>
              <span className="cm-caption-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
