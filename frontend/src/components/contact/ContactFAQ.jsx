"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ContactFAQ.css";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    number: "01",
    question: "How do I choose the right tile for my project?",
    answer:
      "Start with the space, intended use, finish, size, and overall design direction. Share your project details with our team and we can help you explore suitable collections for your requirements.",
  },
  {
    number: "02",
    question: "Can I request samples before placing an order?",
    answer:
      "Sample availability depends on the collection and current stock. Contact our team with the tile name or reference and your delivery location so we can guide you on the available options.",
  },
  {
    number: "03",
    question: "Do you work with architects, designers, and dealers?",
    answer:
      "Yes. We welcome enquiries from architects, interior designers, dealers, distributors, and project teams. Tell us a little about your business or project so we can direct your enquiry appropriately.",
  },
  {
    number: "04",
    question: "Can you help with bulk or project requirements?",
    answer:
      "Share the project location, required tile sizes and finishes, estimated quantity, and expected timeline. Our team can review the details and advise on the next steps.",
  },
  {
    number: "05",
    question: "What information should I include in my enquiry?",
    answer:
      "Include your name and contact details, project type, location, preferred tile size or finish, estimated quantity, and any reference images or deadlines that may help us understand your requirement.",
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
