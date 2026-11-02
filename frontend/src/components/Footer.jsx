import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const ADDRESSES = [
  { city: "Ahmedabad", text: "B906, Swati Trinity, SP Ring Road, Ahmedabad, Gujarat, India" },
  { city: "Morbi", text: "410, Pavansut Plaza, National Highway - 8, Morbi, Gujarat, India" },
];

const PHONE_NUMBER = "+91 92659 01137";
const CONTACT_EMAIL = ""; // Add the official email when confirmed.

const FINISHES = ["Liso", "Carving", "Highglossy", "Glossy", "Liso + Carving"];
const FORMATS = ["600 × 1200", "800 × 1600", "800 × 2400", "1200 × 1800"];

const Svg = ({ children }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const PinIcon = () => (
  <Svg>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
const PhoneIcon = () => (
  <Svg>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
);
const MailIcon = () => (
  <Svg>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
);
const InstagramIcon = () => (
  <Svg>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </Svg>
);
const LinkedinIcon = () => (
  <Svg>
    <path d="M7 10v7M7 7v.01M11 17v-7M11 13a3 3 0 0 1 6 0v4" />
    <rect x="3" y="3" width="18" height="18" rx="3" />
  </Svg>
);

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/aevitasceramics/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aevitas-ceramics/", Icon: LinkedinIcon },
  // Add Facebook / YouTube / Pinterest here when available.
];

/* A footer column. On tablet / desktop it is a normal column; on phones the
   heading becomes a tap-to-open row (see Footer.css), which keeps the footer short. */
const FooterCol = ({ id, title, openId, onToggle, Tag = "section", children }) => {
  const isOpen = openId === id;
  return (
    <Tag className={`sf-col sf-acc${isOpen ? " is-open" : ""}`} aria-label={title}>
      <h3 className="sf-heading">
        <button
          type="button"
          className="sf-acc-btn"
          aria-expanded={isOpen}
          aria-controls={`sf-panel-${id}`}
          onClick={() => onToggle(id)}
        >
          <span>{title}</span>
          <i className="sf-acc-icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="sf-panel" id={`sf-panel-${id}`}>
        <div className="sf-panel-in">{children}</div>
      </div>
    </Tag>
  );
};

const Footer = () => {
  const [openId, setOpenId] = useState("");
  const toggle = (id) => setOpenId((current) => (current === id ? "" : id));
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="sf-shell">
        
        <div className="sf-main">
          {/* Column 1: Logo + addresses + phone (sketch: logo box, address/phone box) */}
          <section className="sf-brand" aria-label="Aevitas Ceramics contact details">
            <Link to="/" className="sf-logo-link" aria-label="Aevitas Ceramics home">
              <img
                className="sf-logo"
                src="/images/logo/Aevitas_Logo_B.png"
                alt="Aevitas Ceramics"
                loading="lazy"
              />
            </Link>

            <p className="sf-tagline">
              Thoughtfully crafted surfaces that bring timeless character to
              contemporary spaces.
            </p>

            <ul className="sf-info">
              {ADDRESSES.map((a) => (
                <li className="sf-info-row" key={a.city}>
                  <span className="sf-info-icon"><PinIcon /></span>
                  <span>
                    <span className="sf-address-city">{a.city}</span>
                    <span className="sf-info-text">{a.text}</span>
                  </span>
                </li>
              ))}
              {PHONE_NUMBER && (
                <li className="sf-info-row sf-info-row--phone">
                  <span className="sf-info-icon"><PhoneIcon /></span>
                  <a className="sf-info-text sf-info-link" href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    {PHONE_NUMBER}
                  </a>
                </li>
              )}
              {CONTACT_EMAIL && (
                <li className="sf-info-row">
                  <span className="sf-info-icon"><MailIcon /></span>
                  <a className="sf-info-text sf-info-link" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </li>
              )}
            </ul>
          </section>

          {/* Column 2: Company */}
          <FooterCol id="company" title="Company" Tag="nav" openId={openId} onToggle={toggle}>
            <ul className="sf-list">
              <li><Link to="/" className="sf-link">Home</Link></li>
              <li><Link to="/about" className="sf-link">About us</Link></li>
              <li><Link to="/collections" className="sf-link">Collections</Link></li>
              <li><Link to="/export" className="sf-link">Export</Link></li>
              <li><Link to="/catalogue" className="sf-link">Catalogue</Link></li>
              <li><Link to="/tile-calculator" className="sf-link">Tile Calculator</Link></li>
              <li><Link to="/contact" className="sf-link">Contact</Link></li>
            </ul>
          </FooterCol>

          {/* Column 3: Collections */}
          <FooterCol id="collections" title="Collections" Tag="nav" openId={openId} onToggle={toggle}>
            <ul className="sf-list">
              <li><Link to="/collections#product-listing" className="sf-link">All Collections</Link></li>
              <li><Link to="/collections?size=600x1200#product-listing" className="sf-link">600 X 1200</Link></li>
              <li><Link to="/collections?size=800x1600#product-listing" className="sf-link">800 X 1600</Link></li>
              <li><Link to="/collections?size=800x2400#product-listing" className="sf-link">800 X 2400</Link></li>
              <li><Link to="/collections?size=1200x1800#product-listing" className="sf-link">1200 X 1800</Link></li>
              <li><Link to="/catalogue" className="sf-link">All Catalogue</Link></li>
            </ul>
          </FooterCol>

          {/* Column 4: Finishes & formats (two stacked blocks) */}
          <div className="sf-stack">
            <FooterCol id="finishes" title="Finishes" openId={openId} onToggle={toggle}>
              <ul className="sf-chips">
                {FINISHES.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </FooterCol>
            <FooterCol id="formats" title="Formats (mm)" openId={openId} onToggle={toggle}>
              <ul className="sf-chips">
                {FORMATS.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </FooterCol>
          </div>

          {/* Column 5: Social */}
          <section className="sf-col sf-social-column" aria-label="Follow Aevitas">
            <h3 className="sf-heading">Follow us</h3>
            <p className="sf-social-note">Discover our latest surfaces, projects and updates.</p>
            <div className="sf-social-list">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-social-link"
                >
                  <span className="sf-social-icon"><Icon /></span>
                  <span>{label}</span>
                  <span className="sf-social-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="sf-bottom">
          {/* <p className="sf-copy">© {new Date().getFullYear()} Aevitas Ceramics. All rights reserved.</p> */}
          <p className="sf-copy">Designed & Developed by <a href="https://espressomedia.in/" target="_blank" rel="noopener noreferrer">The Espresso Media</a></p>
          <nav className="sf-legal" aria-label="Legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          </nav>
          <button type="button" className="sf-top" onClick={scrollTop} aria-label="Back to top">
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;