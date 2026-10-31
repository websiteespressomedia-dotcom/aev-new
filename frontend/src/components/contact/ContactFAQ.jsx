"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ContactFAQ.css";

gsap.registerPlugin(ScrollTrigger);


const FAQS = [
  {
    number: "01",
    question: "Do you manufacture porcelain tiles in India?",
    answer:
      "Yes. Aevitas Ceramics is an Indian porcelain tile brand focused on premium porcelain tiles and large-format tile solutions for residential, commercial, and international markets.",
  },
  {
    number: "02",
    question: "Do you export porcelain tiles to international markets?",
    answer:
      "Yes. Aevitas Ceramics focuses on serving global markets with premium porcelain tile solutions for importers, wholesalers, distributors, and project buyers. Contact our team to discuss your destination market and requirements.",
  },
  {
    number: "03",
    question: "What porcelain tile sizes do you offer?",
    answer:
      "We offer a range of tile formats, including 600 × 600 mm, 600 × 1200 mm, 800 × 1600 mm, 800 × 2400 mm, and 1200 × 1800 mm. Availability may vary by collection.",
  },
  {
    number: "04",
    question: "Do you offer private label or OEM tile solutions?",
    answer:
      "For private label or OEM enquiries, please share your branding requirements, preferred tile formats, finishes, and estimated quantities with our team so we can discuss suitable options.",
  },
  {
    number: "05",
    question: "What is the minimum order quantity for export?",
    answer:
      "Minimum order quantities depend on the selected tile format, collection, and destination market. Contact our team with your product preferences, estimated quantity, and delivery destination for further details.",
  },
];

export default function ContactFAQ() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const eyebrow = section.querySelector(".cfaq-eyebrow");
      const heading = section.querySelector(".cfaq-heading");
      const intro = section.querySelector(".cfaq-intro");
      const rows = section.querySelectorAll(".cfaq-item");
      const side = section.querySelector(".cfaq-side-note");

      gsap.set([eyebrow, heading, intro, side], {
        autoAlpha: 0,
        y: 22,
      });
      gsap.set(rows, { autoAlpha: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(
          heading,
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.25"
        )
        .to(
          intro,
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.42"
        )
        .to(
          rows,
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.09 },
          "-=0.25"
        )
        .to(side, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      className="cfaq-section"
      aria-labelledby="cfaq-title"
    >
      <div className="cfaq-wrap">
        <div className="cfaq-left">
          <div className="cfaq-eyebrow">
            <span className="cfaq-rule" />
            A little clarity
          </div>

          <h2 className="cfaq-heading" id="cfaq-title">
            Good questions.
            <span>Clear answers.</span>
          </h2>

          <p className="cfaq-intro">
            Everything you need to know before starting a conversation with
            Aevitas Ceramics.
          </p>

          <div className="cfaq-side-note">
            <p>
              Still have a question?
              <a href="#contact-form">
                Talk to our team <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>

        <div className="cfaq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `cfaq-answer-${index + 1}`;

            return (
              <article
                className={`cfaq-item${isOpen ? " is-open" : ""}`}
                key={faq.number}
              >
                <button
                  className="cfaq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                >
                  <span className="cfaq-number">{faq.number}</span>
                  <span className="cfaq-question-text">{faq.question}</span>
                  <span className="cfaq-toggle" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>

                <div
                  className="cfaq-answer-clip"
                  id={answerId}
                  aria-hidden={!isOpen}
                >
                  <div className="cfaq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
