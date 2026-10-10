import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

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

    setQuery(searchTerm);
    setSearchOpen(false);
    setMenuOpen(false);

    const isSize = /^\d{2,4}\s*x\s*\d{2,4}$/i.test(searchTerm);
    const matchingFinish = FINISH_OPTIONS.find(
      (finish) => finish.toLowerCase() === searchTerm.toLowerCase()
    );

    const params = new URLSearchParams();

    if (isSize) {
      params.set("size", searchTerm.replace(/\s/g, ""));
    } else if (matchingFinish) {
      params.set("finish", matchingFinish);
    } else {
      params.set("search", searchTerm);
    }

    navigate(`/collections?${params.toString()}#product-listing`);

    window.setTimeout(() => {
      document.getElementById("product-listing")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  };

  const chooseSuggestion = (value) => {
    setQuery(value);
    setSearchOpen(false);
  };

  const closeMobileMenu = () => setMenuOpen(false);

  const hasSuggestions =
    suggestions.sizes.length > 0 ||
    suggestions.designs.length > 0 ||
    suggestions.finishes.length > 0;

  return (
    <nav
      className={`navigation ${scrolled ? "scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Aevitas Ceramics home">
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2L2 22h20L12 2Z" fill="currentColor" />
          </svg>

          <span className="logo-text">
            <span className="brand-name">AEVITAS</span>
            <span className="brand-sub">CERAMICS</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/collections" className="nav-link">Collections</Link>
          <Link to="/catalogue" className="nav-link">Catalogue</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-right">
          <div className={`nav-search ${searchOpen ? "is-open" : ""}`}>
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
                type="search"
                value={query}
                placeholder="Search tiles or size"
                aria-label="Search tile designs, sizes, or finishes"
                aria-expanded={searchOpen}
                onFocus={() => setSearchOpen(true)}
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
                <button
                  type="button"
                  className="search-dismiss"
                  aria-label="Close suggestions"
                  onClick={() => setSearchOpen(false)}
                />

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

        <div
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-menu-inner">
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
              <Link to="/catalogue" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>04</span><strong>Catalogue</strong>
              </Link>
              <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>05</span><strong>Contact</strong>
              </Link>
            </div>

            <div className="mobile-menu-footer">
              <span>AEVITAS CERAMICS</span>
              <span>Surfaces for modern architecture</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
