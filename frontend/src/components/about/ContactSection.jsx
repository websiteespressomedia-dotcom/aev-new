import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ContactSection.css";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL = "https://wa.me/918758117559";

const OFFICES = [
  {
    number: "01",
    name: "Ahmedabad",
    address: (
      <>
        B906, Swati Trinity, SP Ring Road,
        <br />
        Ahmedabad, Gujarat, India
      </>
    ),
    map: "https://maps.app.goo.gl/JYDB17skygmjNJA48",
  },
  {
    number: "02",
    name: "Morbi",
    address: (
      <>
        410, Pavansut Plaza, National Highway - 8,
        <br />
        Morbi, Gujarat, India
      </>
    ),
    map: "https://maps.app.goo.gl/d6kC6JvinURADcPZ9",
  },
];

const ContactSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const eyebrow = root.querySelector(".contact-eyebrow");
      const titleLines = gsap.utils.toArray(".contact-title-line", root);
      const intro = root.querySelector(".contact-intro");
      const cta = root.querySelector(".contact-cta");
      const meta = gsap.utils.toArray(".contact-meta", root);
      const offices = gsap.utils.toArray(".contact-office", root);
      const backgroundWords = gsap.utils.toArray(".contact-bg-word", root);
      const line = root.querySelector(".contact-rule");
      const buttonInner = root.querySelector(".contact-cta-inner");

      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.set(titleLines, { yPercent: 110 });
      gsap.set(intro, { opacity: 0, y: 18 });
      gsap.set(cta, { opacity: 0, scale: 0.9, y: 18 });
      gsap.set(meta, { opacity: 0, y: 15 });
      gsap.set(offices, { opacity: 0, y: 18 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });

      entrance
        .to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        })
        .to(
          titleLines,
          {
            yPercent: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .to(
          intro,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          cta,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.35"
        )
        .to(
          offices,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4"
        );

      backgroundWords.forEach((word, index) => {
        gsap.to(word, {
          xPercent: index % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      const onMove = (event) => {
        if (!cta || !buttonInner) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          return;
        }

        const rect = cta.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(buttonInner, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const resetButton = () => {
        if (!buttonInner) return;

        gsap.to(buttonInner, {
          x: 0,
          y: 0,
          duration: 0.55,
          ease: "elastic.out(1, 0.45)",
        });
      };

      cta?.addEventListener("pointermove", onMove);
      cta?.addEventListener("pointerleave", resetButton);

      return () => {
        entrance.kill();
        cta?.removeEventListener("pointermove", onMove);
        cta?.removeEventListener("pointerleave", resetButton);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="contact-section aev-contact-section">
      <div className="contact-noise" aria-hidden="true" />

      <div className="contact-bg" aria-hidden="true">
        <div className="contact-bg-word contact-bg-word-one">CONTACT</div>
        <div className="contact-bg-word contact-bg-word-two">CONNECT</div>
      </div>

      <div className="contact-inner">
        <div className="contact-top">
          <div className="contact-eyebrow">
            <span className="contact-eyebrow-line" />
            <span>Start a conversation</span>
          </div>
        </div>

        <div className="contact-main">
          <div className="contact-copy">
            <h2 className="contact-title">
              <span className="contact-title-mask">
                <span className="contact-title-line">Let's</span>
              </span>
              <span className="contact-title-mask">
                <span className="contact-title-line contact-title-accent">
                  make it
                </span>
              </span>
              <span className="contact-title-mask">
                <span className="contact-title-line">happen.</span>
              </span>
            </h2>

            <p className="contact-intro">
              Have a project, collection or requirement in mind? Let&apos;s
              discuss how we can help bring the right tile solution to your
              space.
            </p>
          </div>

          <a
            className="contact-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start a conversation on WhatsApp"
          >
            <span className="contact-cta-ring" />
            <span className="contact-cta-inner">
              <span className="contact-cta-small">Get in touch</span>
              <span className="contact-cta-arrow">↗</span>
            </span>
          </a>
        </div>

        <div className="contact-rule" />

        <div className="contact-bottom">
          <div className="contact-bottom-label contact-meta">
            Our locations
          </div>

          <div className="contact-offices">
            {OFFICES.map((office) => (
              <div className="contact-office" key={office.number}>
                <div className="contact-office-top">
                  <span className="contact-office-number">{office.number}</span>
                  <span className="contact-office-name">{office.name}</span>
                </div>

                <p className="contact-office-address">{office.address}</p>

                <a
                  className="contact-office-map"
                  href={office.map}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on maps <span>↗</span>
                </a>
              </div>
            ))}
          </div>

          <div className="contact-direct contact-meta">
            <span>Direct</span>
            <a href="tel:+918758117559">+91 87581 17559</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
