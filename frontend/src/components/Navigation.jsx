import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";

const POPULAR_SIZES = [
  "600x1200",
  "800x1600",
  "800x2400",
  "1200x1800",
];

const FINISH_OPTIONS = [
  "Liso",
  "Carving",
  "Highglossy",
  "Glossy",
  "Liso+Carving",
];

export default function Navigation({ products = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const skipOpenRef = useRef(false);
  const mInputRef = useRef(null);
  const [phoneSearch, setPhoneSearch] = useState(false); // phone-only search sheet
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = Math.max(160, window.innerHeight * 0.65);
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll after every page navigation from either the navbar or footer.
  // Preserve deliberate hash links (for example /collections#product-listing).
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (hash) {
        let targetId = hash.slice(1);

        try {
          targetId = decodeURIComponent(targetId);
        } catch {
          // Keep the original hash id if it contains malformed encoding.
        }

        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      } else {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }

      const threshold = Math.max(160, window.innerHeight * 0.65);
      setScrolled(window.scrollY > threshold);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || phoneSearch ? "hidden" : "";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setPhoneSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, phoneSearch]);

  // Phone: focus the field when the search sheet opens.
  useEffect(() => {
    if (phoneSearch && mInputRef.current) mInputRef.current.focus();
  }, [phoneSearch]);

  // Phone UI only exists up to 560px: close it if the window grows past that.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const onChange = (event) => {
      if (!event.matches) {
        setPhoneSearch(false);
        setMenuOpen(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close the search suggestions when the user clicks/taps anywhere outside search.
  useEffect(() => {
    if (!searchOpen) return;

    const handleOutsidePointer = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
    };
  }, [searchOpen]);

  const designNames = useMemo(() => {
    const names = products
      .map((product) => product.baseName || product.name)
      .filter(Boolean);

    return [...new Set(names)];
  }, [products]);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return {
        sizes: POPULAR_SIZES.slice(0, 4),
        designs: designNames.slice(0, 4),
        finishes: FINISH_OPTIONS.slice(0, 4),
      };
    }

    return {
      sizes: POPULAR_SIZES.filter((size) =>
        size.toLowerCase().includes(value)
      ).slice(0, 4),

      designs: designNames
        .filter((name) => name.toLowerCase().includes(value))
        .slice(0, 5),

      finishes: FINISH_OPTIONS.filter((finish) =>
        finish.toLowerCase().includes(value)
      ).slice(0, 5),
    };
  }, [query, designNames]);

  const submitSearch = (value = query) => {
    const searchTerm = value.trim();
    if (!searchTerm) return;

    setQuery("");
    setSearchOpen(false);
    setPhoneSearch(false);
    setMenuOpen(false);

    // Accept 600x1200, 600X1200, 600 x 1200, and 600 × 1200.
    const normalizedTerm = searchTerm
      .toLowerCase()
      .replace(/×/g, "x")
      .replace(/\s+/g, "");

    const isSize = /^\d{2,4}x\d{2,4}$/.test(normalizedTerm);
    const matchingFinish = FINISH_OPTIONS.find(
      (finish) => finish.toLowerCase() === searchTerm.toLowerCase()
    );

    const params = new URLSearchParams();

    if (isSize) {
      params.set("size", normalizedTerm);
    } else if (matchingFinish) {
      params.set("finish", matchingFinish);
    } else {
      params.set("search", searchTerm);
    }

    // Let the Collections page own scrolling after its filters are applied.
    // A second scroll here caused the page to jump when both components scrolled.
    navigate(`/collections?${params.toString()}#product-listing`);
  };

  // Picking a suggestion only fills the field. The text stays there and the
  // field stays focused until Enter / the arrow button goes to the results.
  const chooseSuggestion = (value) => {
    setQuery(value);
    setSearchOpen(false);

    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      skipOpenRef.current = true; // focusing must not re-open the suggestion list
      inputRef.current.focus();
      skipOpenRef.current = false;
    });
  };

  // ----- phone navbar helpers -----
  const choosePhoneSuggestion = (value) => {
    setQuery(value);
    requestAnimationFrame(() => mInputRef.current && mInputRef.current.focus());
  };

  const togglePhoneSearch = () => {
    setMenuOpen(false);
    setPhoneSearch((open) => !open);
  };

  const togglePhoneMenu = () => {
    setPhoneSearch(false);
    setMenuOpen((open) => !open);
  };

  const closePhoneUi = () => {
    setPhoneSearch(false);
    setMenuOpen(false);
  };

  const closeMobileMenu = () => setMenuOpen(false);

  const hasSuggestions =
    suggestions.sizes.length > 0 ||
    suggestions.designs.length > 0 ||
    suggestions.finishes.length > 0;

  const PHONE_LINKS = [
    ["/", "Home"],
    ["/about", "About"],
    ["/collections", "Collections"],
    ["/export", "Export"],
    ["/catalogue", "Catalogue"],
    ["/tile-calculator", "Tile Calculator"],
    ["/contact", "Contact"],
  ];

  const phoneGroups = [
    { label: "Tile size", items: suggestions.sizes, size: true },
    { label: "Design name", items: suggestions.designs },
    { label: "Finish", items: suggestions.finishes },
  ].filter((group) => group.items.length > 0);

  return (
    <>
    <nav
      className={`navigation ${scrolled ? "scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Aevitas Ceramics home">
          <img
            className="nav-logo-image"
            src="/images/logo/Aevitas_Logo_B.png"
            alt="Aevitas Ceramics Logo"
          />
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/collections" className="nav-link">Collections</Link>
          <Link to="/export" className="nav-link">Export</Link>
          <Link to="/catalogue" className="nav-link">Catalogue</Link>
          <Link to="/tile-calculator" className="nav-link">Tile Calculator</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-right">
          <div ref={searchRef} className={`nav-search ${searchOpen ? "is-open" : ""}`}>
            <form
              className="nav-search-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
            >
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>

              <input
                ref={inputRef}
                type="search"
                enterKeyHint="search"
                value={query}
                placeholder="Search tiles or size"
                aria-label="Search tile designs, sizes, or finishes"
                aria-expanded={searchOpen}
                onFocus={() => {
                  if (skipOpenRef.current) return;
                  setSearchOpen(true);
                }}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchOpen(true);
                }}
              />

              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}

              <button
                type="submit"
                className="search-submit"
                aria-label="Search"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12h15M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            {searchOpen && (
              <>
                <div className="search-dropdown">
                  <div className="search-dropdown-heading">
                    <span>
                      {query.trim() ? "MATCHING RESULTS" : "QUICK SEARCH"}
                    </span>
                    <span className="search-heading-line" />
                  </div>

                  {suggestions.sizes.length > 0 && (
                    <div className="suggestion-group">
                      <span className="suggestion-label">TILE SIZE</span>

                      {suggestions.sizes.map((size) => (
                        <button
                          type="button"
                          className="search-suggestion"
                          key={size}
                          onClick={() => chooseSuggestion(size)}
                        >
                          <span className="suggestion-symbol size-symbol">
                            ▦
                          </span>
                          <span>
                            {size} <small>mm</small>
                          </span>
                          <span className="suggestion-arrow">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {suggestions.designs.length > 0 && (
                    <div className="suggestion-group">
                      <span className="suggestion-label">DESIGN NAME</span>

                      {suggestions.designs.map((name) => (
                        <button
                          type="button"
                          className="search-suggestion"
                          key={name}
                          onClick={() => chooseSuggestion(name)}
                        >
                          <span className="suggestion-symbol">◇</span>
                          <span>{name}</span>
                          <span className="suggestion-arrow">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {suggestions.finishes.length > 0 && (
                    <div className="suggestion-group">
                      <span className="suggestion-label">FINISH</span>

                      {suggestions.finishes.map((finish) => (
                        <button
                          type="button"
                          className="search-suggestion"
                          key={finish}
                          onClick={() => chooseSuggestion(finish)}
                        >
                          <span className="suggestion-symbol">◇</span>
                          <span>{finish}</span>
                          <span className="suggestion-arrow">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {query.trim() && !hasSuggestions && (
                    <button
                      type="button"
                      className="search-anyway"
                      onClick={() => submitSearch()}
                    >
                      Search for “{query.trim()}”
                      <span>→</span>
                    </button>
                  )}

                  <div className="search-dropdown-footer">
                    Press <kbd>ENTER ↵</kbd> to view results
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>

  <div
    className={`mobile-menu ${menuOpen ? "active" : ""}`}
    aria-hidden={!menuOpen}
  >
    <button
      type="button"
      className="mobile-menu-backdrop"
      aria-label="Close navigation menu"
      tabIndex={-1}
      onClick={closeMobileMenu}
    />
    <div className="mobile-menu-inner" onClick={(event) => event.stopPropagation()}>
          <span className="mobile-menu-label">Explore Aevitas</span>

          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>01</span><strong>Home</strong>
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>02</span><strong>About</strong>
            </Link>
            <Link to="/collections" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>03</span><strong>Collections</strong>
            </Link>
            <Link to="/export" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>04</span><strong>Export</strong>
            </Link>
            <Link to="/catalogue" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>05</span><strong>Catalogue</strong>
            </Link>
            <Link to="/tile-calculator" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>06</span><strong>Tile Calculator</strong>
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>07</span><strong>Contact</strong>
            </Link>
          </div>

          <div className="mobile-menu-footer">
            <span>AEVITAS CERAMICS</span>
            <span>Surfaces for modern architecture</span>
          </div>
        </div>
  </div>

    {/* ===================== PHONE NAVBAR (max 560px) ===================== */}
    <header className="mnav">
      <div className="mnav-bar">
        <Link to="/" className="mnav-logo" aria-label="Aevitas Ceramics home" onClick={closePhoneUi}>
          <img src="/images/logo/Aevitas_Logo_B.png" alt="Aevitas Ceramics" />
        </Link>

        <div className="mnav-actions">
          <button
            type="button"
            className={`mnav-btn ${phoneSearch ? "is-active" : ""}`}
            onClick={togglePhoneSearch}
            aria-label={phoneSearch ? "Close search" : "Open search"}
            aria-expanded={phoneSearch}
          >
            {phoneSearch ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.2" />
                <path d="m15.6 15.6 4.4 4.4" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className={`mnav-btn mnav-burger ${menuOpen ? "is-open" : ""}`}
            onClick={togglePhoneMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* search sheet */}
      {phoneSearch && (
        <>
          <button type="button" className="mnav-scrim" aria-label="Close search" onClick={() => setPhoneSearch(false)} />

          <div className="mnav-search" role="search">
            <form
              className="mnav-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
            >
              <svg className="mnav-mag" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.2" />
                <path d="m15.6 15.6 4.4 4.4" />
              </svg>

              <input
                ref={mInputRef}
                type="search"
                enterKeyHint="search"
                value={query}
                placeholder="Search tiles or size"
                aria-label="Search tile designs, sizes, or finishes"
                onChange={(event) => setQuery(event.target.value)}
              />

              {query && (
                <button
                  type="button"
                  className="mnav-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("");
                    if (mInputRef.current) mInputRef.current.focus();
                  }}
                >
                  ×
                </button>
              )}

              <button type="submit" className="mnav-go" aria-label="Search">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg>
              </button>
            </form>

            {phoneGroups.map((group) => (
              <div className="mnav-group" key={group.label}>
                <span className="mnav-label">{group.label}</span>
                <div className="mnav-chips">
                  {group.items.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`mnav-chip ${
                        query.trim().toLowerCase() === item.toLowerCase() ? "is-on" : ""
                      }`}
                      onClick={() => choosePhoneSuggestion(item)}
                    >
                      {group.size ? item.replace("x", " × ") : item}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <p className="mnav-hint">
              {query.trim() && !hasSuggestions
                ? `No quick matches — tap the arrow to search for “${query.trim()}”.`
                : "Pick one or type, then press Enter to see results."}
            </p>
          </div>
        </>
      )}

      {/* menu */}
      <div className={`mnav-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="mnav-links" aria-label="Main">
          {PHONE_LINKS.map(([to, label], i) => (
            <Link
              key={to}
              to={to}
              className={`mnav-link ${pathname === to ? "is-current" : ""}`}
              style={{ "--i": i }}
              onClick={closePhoneUi}
              tabIndex={menuOpen ? 0 : -1}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              <strong>{label}</strong>
            </Link>
          ))}
        </nav>

        <div className="mnav-foot">
          <span>AEVITAS CERAMICS</span>
          <span>Surfaces for modern architecture</span>
        </div>
      </div>
    </header>
    </>
  );
}