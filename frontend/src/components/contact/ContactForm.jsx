"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ContactForm.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  "Residential project",
  "Commercial project",
  "Architect / Interior designer",
  "Dealer / Distributor enquiry",
  "Other",
];

const REFERRAL_OPTIONS = [
  "Google search",
  "Instagram",
  "Referral",
  "Trade show",
  "Other",
];

export default function ContactForm() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    referral: "",
    message: "",
  });
  const [notice, setNotice] = useState("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = section.querySelector(".cf-intro");
      const fields = section.querySelectorAll(".cf-field, .cf-submit-row");
      const side = section.querySelector(".cf-side-card");

      gsap.set([intro, side], { autoAlpha: 0, y: 24 });
      gsap.set(fields, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(intro, { autoAlpha: 1, y: 0, duration: 0.7 })
        .to(
          fields,
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.075 },
          "-=0.32"
        )
        .to(side, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45");
    }, section);

    return () => ctx.revert();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (notice) setNotice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect your existing API/email handler here before showing a success message.
    // This UI-only component deliberately does not pretend an enquiry was sent.
    setNotice(
      "Your form is ready. Connect your enquiry endpoint to send this message to the Aevitas team."
    );
  };

  return (
    <section
      ref={sectionRef}
      className="cf-section"
      id="contact-form"
      aria-labelledby="cf-title"
    >
      <div className="cf-wrap">
        <div className="cf-intro">
          <div className="cf-eyebrow">
            <span className="cf-eyebrow-rule" />
            Contact
          </div>

          <h2 className="cf-title" id="cf-title">
            Let’s create
            <span> something timeless.</span>
          </h2>

          <p className="cf-lead">
            Tell us about your space, your vision, or the surface you’re
            looking for. We’ll help you find the right material for your project.
          </p>

          <div className="cf-side-card">
            <span className="cf-side-index">01 — 03</span>
            <span className="cf-side-line" />
            <p>
              Good spaces begin with the right material.
              <em> Let’s find yours.</em>
            </p>
            <span className="cf-side-note">AEVITAS CERAMICS · INDIA</span>
          </div>
        </div>

        <div className="cf-form-panel">
          <div className="cf-form-heading">
            <div>
              <span className="cf-form-kicker">PROJECT ENQUIRY</span>
              <h3>Tell us a little more.</h3>
            </div>
            <span className="cf-required-note">
              <i>*</i> Required fields
            </span>
          </div>

          <form className="cf-form" onSubmit={handleSubmit}>
            <div className="cf-field-grid">
              <label className="cf-field" htmlFor="cf-first-name">
                <span>First name <i>*</i></span>
                <input
                  id="cf-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Your first name"
                  value={form.firstName}
                  onChange={updateField}
                  required
                />
              </label>

              <label className="cf-field" htmlFor="cf-last-name">
                <span>Last name <i>*</i></span>
                <input
                  id="cf-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Your last name"
                  value={form.lastName}
                  onChange={updateField}
                  required
                />
              </label>

              <label className="cf-field" htmlFor="cf-email">
                <span>Email address <i>*</i></span>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </label>

              <label className="cf-field" htmlFor="cf-phone">
                <span>Phone number</span>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  value={form.phone}
                  onChange={updateField}
                />
              </label>

              <label className="cf-field" htmlFor="cf-project-type">
                <span>I’m enquiring as <i>*</i></span>
                <select
                  id="cf-project-type"
                  name="projectType"
                  value={form.projectType}
                  onChange={updateField}
                  required
                >
                  <option value="" disabled>
                    Select project type
                  </option>
                  {PROJECT_TYPES.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cf-field" htmlFor="cf-referral">
                <span>How did you find us?</span>
                <select
                  id="cf-referral"
                  name="referral"
                  value={form.referral}
                  onChange={updateField}
                >
                  <option value="">Choose an option</option>
                  {REFERRAL_OPTIONS.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cf-field cf-field-full" htmlFor="cf-message">
                <span>Tell us about your project <i>*</i></span>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={4}
                  placeholder="Project location, tile requirements, quantity, timeline…"
                  value={form.message}
                  onChange={updateField}
                  required
                />
              </label>
            </div>

            {notice && (
              <p className="cf-notice" role="status">
                {notice}
              </p>
            )}

            <div className="cf-submit-row">
              <p>
                By submitting, you agree that our team may contact you about
                this enquiry.
              </p>
              <button className="cf-submit" type="submit">
                <span>Send enquiry</span>
                <span className="cf-submit-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
