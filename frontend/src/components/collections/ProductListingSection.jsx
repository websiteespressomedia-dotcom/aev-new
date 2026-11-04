/* eslint-disable */

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProductListingSection.css";

const FINISH_FILTERS = [
  "All",
  "Liso",
  "Carving",
  "Highglossy",
  "Glossy",
  "Liso+Carving",
];

const SIZE_FILTERS = [
  "All",
  "600x1200",
  "800x1600",
  "800x2400",
  "1200x1800",
];

const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

// Treat x, X, and the multiplication sign (×) as the same size separator.
const normalizeSize = (value) =>
  normalize(value).replace(/×/g, "x").replace(/\s/g, "");

export default function ProductListingSection({ initialProducts = [] }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSizeFilter, setActiveSizeFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [sheetOpen, setSheetOpen] = useState(false); // phone: filter sheet

  const pathname = location.pathname || "/porcelain-floor-tiles";

  // Read URL filters whenever a new search is submitted.
  // A new search parameter clears filters from the previous search.
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const sizeFromUrl = params.get("size");
    const finishFromUrl = params.get("finish");
    const filterFromUrl = params.get("filter");
    const searchFromUrl = params.get("search");

    setActiveSizeFilter(
      sizeFromUrl ? normalizeSize(sizeFromUrl) : "All"
    );

    setActiveFilter(finishFromUrl || filterFromUrl || "All");
    setSearch(searchFromUrl || "");

    setVisibleCount(8);

    const shouldScrollToResults =
      location.hash === "#product-listing" ||
      Boolean(sizeFromUrl || finishFromUrl || filterFromUrl || searchFromUrl);

    if (shouldScrollToResults) {
      // Scroll from one place only, after React has applied the URL filters.
      // Refresh ScrollTrigger first because pinned sections above the listing
      // can otherwise make the target position stale.
      let secondFrame = 0;

      const firstFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        secondFrame = window.requestAnimationFrame(() => {
          const target = document.getElementById("product-listing");
          if (!target) return;

          const top = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "auto" });
        });
      });

      return () => {
        window.cancelAnimationFrame(firstFrame);
        if (secondFrame) window.cancelAnimationFrame(secondFrame);
      };
    }
  }, [location.search, location.hash]);

  // Filter by design name, finish, and tile size.
  const filteredProducts = useMemo(() => {
    const query = normalize(search);
    const products = Array.isArray(initialProducts)
      ? initialProducts
      : [];

    return products.filter((product) => {
      const name = normalize(product?.name);

      // The existing product card displays category as its finish.
      // Prefer an explicit finish field if one exists.
      const finish = normalize(
        product?.finish ??
        product?.Finish ??
        product?.category
      );

      const size = normalizeSize(product?.size);
      const targetSize = normalizeSize(activeSizeFilter);
      const targetFinish = normalize(activeFilter);

      const matchesName = !query || name.includes(query);
      const matchesTypedFinish = !query || finish.includes(query);

      const matchesSearch =
        !query || matchesName || matchesTypedFinish;

      const matchesFinish =
        activeFilter === "All" || finish === targetFinish;

      const matchesSize =
        activeSizeFilter === "All" || size === targetSize;

      return matchesSearch && matchesFinish && matchesSize;
    });
  }, [initialProducts, search, activeFilter, activeSizeFilter]);

  const displayedProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  useEffect(() => {
    setVisibleCount(8);
  }, [search, activeFilter, activeSizeFilter]);

  // Product card entrance animation.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return undefined;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".aev-product-card");

      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.055,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [displayedProducts]);

  const urlPrefix = pathname.includes("large-format-porcelain-tiles")
    ? "/large-format-porcelain-tiles"
    : pathname.includes("porcelain-slab-tiles")
      ? "/porcelain-slab-tiles"
      : "/porcelain-floor-tiles";

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("All");
    setActiveSizeFilter("All");

    // Remove old URL parameters as well.
    window.history.replaceState(
      {},
      "",
      `${pathname}#product-listing`
    );
  };

  const selectFinish = (finish) => {
    setActiveFilter(finish);
    setSearch("");
  };

  const selectSize = (size) => {
    setActiveSizeFilter(size);
    setSearch("");
  };

  // ----- phone filter sheet -----
  const activeCount =
    (activeFilter !== "All" ? 1 : 0) + (activeSizeFilter !== "All" ? 1 : 0);

  const showResults = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const top = grid.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const closeSheet = () => setSheetOpen(false);

  const applyAndShow = () => {
    setSheetOpen(false);
    window.setTimeout(showResults, 80);
  };

  // lock the page behind the sheet, close it with Esc
  useEffect(() => {
    if (!sheetOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  // tiny tile icon: shape follows the real format, e.g. 800x2400 = tall and thin
  const sizeParts = (size) => {
    const [w, h] = String(size).split("x").map((n) => Number.parseInt(n, 10));
    return { w: w || 1, h: h || 1 };
  };

  return (
    <section
      id="product-listing"
      ref={sectionRef}
      className="aev-collection"
    >
      <div className="aev-collection__grain" aria-hidden="true" />

      <header className="aev-collection__toolbar">
        <div className="aev-collection__head-grid">
          <div className="aev-collection__intro">
            <p>Explore surfaces shaped by material, texture, and light.</p>
          </div>
        </div>

        <div className="aev-collection__filters">
          <div className="aev-collection__filters-left">
            <div className="aev-collection__filter-group aev-collection__finish-group">
              <span className="aev-collection__filter-label">Finish:</span>
              <div className="aev-collection__pills" role="group" aria-label="Filter by finish">
                {FINISH_FILTERS.map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={`aev-filter-pill ${activeFilter === filter ? "is-active" : ""}`}
                    aria-pressed={activeFilter === filter}
                    onClick={() => selectFinish(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="aev-collection__filter-group aev-collection__size-group">
              <span className="aev-collection__filter-label">Format:</span>
              <div className="aev-collection__pills" role="group" aria-label="Filter by tile size">
                {SIZE_FILTERS.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={`aev-filter-pill ${activeSizeFilter === size ? "is-active" : ""}`}
                    aria-pressed={activeSizeFilter === size}
                    onClick={() => selectSize(size)}
                  >
                    {size === "All" ? "All formats" : size}
                  </button>
                ))}
              </div>
            </div>

            {(search || activeFilter !== "All" || activeSizeFilter !== "All") && (
              <button type="button" className="aev-collection__clear" onClick={clearFilters}>
                Clear selection <span>↗</span>
              </button>
            )}
          </div>

          <div className="aev-collection__filters-right">
            <label className="aev-collection__search">
              <span className="aev-collection__sr-only">Search tiles</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.2 4.2" />
              </svg>
              <input
                type="search"
                placeholder="Search tiles or finish"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setActiveFilter("All");
                  setActiveSizeFilter("All");
                }}
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </label>
          </div>
        </div>

        {/* ===== phone only: one compact bar + a slide-up filter sheet ===== */}
        <div className="aev-pf">
          <button
            type="button"
            className="aev-pf__btn"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h9M19 7h1M4 17h1M11 17h9" />
              <circle cx="16" cy="7" r="2.2" />
              <circle cx="8" cy="17" r="2.2" />
            </svg>
            <span>Filters</span>
            {activeCount > 0 && <b>{activeCount}</b>}
          </button>

          <div className="aev-pf__chips">
            {activeFilter !== "All" && (
              <button type="button" className="aev-pf__chip" onClick={() => selectFinish("All")} aria-label={`Remove ${activeFilter}`}>
                {activeFilter}<i aria-hidden="true">×</i>
              </button>
            )}
            {activeSizeFilter !== "All" && (
              <button type="button" className="aev-pf__chip" onClick={() => selectSize("All")} aria-label={`Remove ${activeSizeFilter}`}>
                {activeSizeFilter.replace("x", " × ")}<i aria-hidden="true">×</i>
              </button>
            )}
            {activeCount === 0 && (
              <span className="aev-pf__hint">All finishes · All formats</span>
            )}
          </div>
        </div> <br />

        <div
          className={`aev-sheet ${sheetOpen ? "is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          aria-hidden={!sheetOpen}
        >
          <button
            type="button"
            className="aev-sheet__scrim"
            aria-label="Close filters"
            tabIndex={sheetOpen ? 0 : -1}
            onClick={closeSheet}
          />

          <div className="aev-sheet__panel">
            <span className="aev-sheet__handle" aria-hidden="true" />

            <div className="aev-sheet__head">
              <h3>Filters</h3>
              <button type="button" className="aev-sheet__close" aria-label="Close filters" onClick={closeSheet}>
                ×
              </button>
            </div>

            <div className="aev-sheet__body">
              <div className="aev-sheet__group">
                <span className="aev-sheet__label">Finish</span>
                <div className="aev-sheet__chips" role="group" aria-label="Filter by finish">
                  {FINISH_FILTERS.map((filter, i) => (
                    <button
                      type="button"
                      key={filter}
                      style={{ "--i": i }}
                      className={`aev-sheet__chip ${activeFilter === filter ? "is-active" : ""}`}
                      aria-pressed={activeFilter === filter}
                      onClick={() => selectFinish(filter)}
                    >
                      {filter === "All" ? "All finishes" : filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="aev-sheet__group">
                <span className="aev-sheet__label">Format</span>
                <div className="aev-sheet__chips" role="group" aria-label="Filter by tile size">
                  {SIZE_FILTERS.map((size, i) => {
                    const { w, h } = sizeParts(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        style={{ "--i": i + FINISH_FILTERS.length }}
                        className={`aev-sheet__chip ${activeSizeFilter === size ? "is-active" : ""}`}
                        aria-pressed={activeSizeFilter === size}
                        onClick={() => selectSize(size)}
                      >
                        {size !== "All" && (
                          <span className="aev-tile-icon" style={{ "--w": w, "--h": h }} aria-hidden="true" />
                        )}
                        {size === "All" ? "All formats" : size.replace("x", " × ")}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="aev-sheet__foot">
              <button
                type="button"
                className="aev-sheet__clear"
                onClick={clearFilters}
                disabled={activeCount === 0 && !search}
              >
                Clear all
              </button>
              <button type="button" className="aev-sheet__show" onClick={applyAndShow}>
                <span>
                  Show {filteredProducts.length} {filteredProducts.length === 1 ? "surface" : "surfaces"}
                </span>
                <i aria-hidden="true">→</i>
              </button>
            </div>
          </div>
        </div>

        <div className="aev-collection__rule">
          <span />
        </div>
      </header>

      <div className="aev-collection__body"> <br />
        <div className="aev-collection__meta-row">
          <p>
          </p>

          <p>
            Showing{" "}
            <strong>
              {String(displayedProducts.length).padStart(2, "0")}
            </strong>
            <span className="aev-collection__meta-divider">/</span>
            {String(filteredProducts.length).padStart(2, "0")} surfaces
          </p>
        </div>

        <div ref={gridRef} className="aev-collection__grid">
          {displayedProducts.length ? (
            displayedProducts.map((product, index) => {
              const hasPreview =
                product?.previewImage &&
                product.previewImage !== product.image;

              const sizeString = String(product?.size || "1000x1000");
              const [widthString, heightString] = sizeString
                .toLowerCase()
                .split("x");

              const width = Number.parseInt(widthString, 10) || 1000;
              const height = Number.parseInt(heightString, 10) || 1000;
              const aspectRatio = `${width} / ${height}`;

              return (
                <Link
                  to={`${urlPrefix}/${product.id}`}
                  key={product.id ?? `${product.name}-${index}`}
                  className="aev-product-card"
                  aria-label={`View ${product.name}, ${product.size || "tile"}`}
                >
                  <div
                    className="aev-product-card__visual"
                    style={{ aspectRatio }}
                    onContextMenu={(event) => event.preventDefault()}
                  >
                    <span className="aev-product-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="aev-product-card__image aev-product-card__image--base">
                      <img
                        src={product.image}
                        alt={`${product.name || "Premium"} porcelain tile design by Aevitas Ceramics`}
                        className="aev-product-card__img"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>

                    {hasPreview && (
                      <div className="aev-product-card__image aev-product-card__image--preview">
                        {/* eager + low priority: the interior photo is downloaded and decoded
                            in the background, so it is ready the moment the card is hovered */}
                        <img
                          src={product.previewImage}
                          alt={`${product.name || "Tile"} in an interior`}
                          className="aev-product-card__img"
                          loading="eager"
                          fetchPriority="low"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    )}

                    <div className="aev-product-card__shade" />
                    <span className="aev-product-card__corner" aria-hidden="true">
                      ↗
                    </span>

                    <div className="aev-product-card__hover-copy">
                      <span>Explore finish</span>
                      <strong>{product.name}</strong>
                    </div>
                  </div>

                  <div className="aev-product-card__details">
                    <div className="aev-product-card__title-wrap">
                      <h3>{product.name}</h3>
                      <p>{product.size || "Signature format"}</p>
                    </div>

                    <span className="aev-product-card__finish">
                      {product.finish || product.Finish || product.category || "Ceramic"}
                    </span>
                  </div>

                  <div className="aev-product-card__bottom-rule">
                    <span />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="aev-collection__empty">
              <span className="aev-collection__empty-mark">—</span>
              <h3>No surfaces found</h3>
              <p>Try another name, finish, or format.</p>

              <button type="button" onClick={clearFilters}>
                Clear all filters <span>↗</span>
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length > visibleCount && (
          <div className="aev-collection__load-more">
            <span className="aev-collection__load-line" />

            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + 8, filteredProducts.length)
                )
              }
            >
              <span>Load more designs</span>

              <span className="aev-collection__load-count">
                {String(Math.min(visibleCount, filteredProducts.length)).padStart(2, "0")}
                {" / "}
                {String(filteredProducts.length).padStart(2, "0")}
              </span>

              <i aria-hidden="true">↓</i>
            </button>

            <span className="aev-collection__load-line" />
          </div>
        )}
      </div>

    </section>
  );
}