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
  "800x1600",
  "800x2400",
  "600x1200",
  "1200x1800",
];

const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

const normalizeSize = (value) =>
  normalize(value).replace(/\s/g, "");

export default function ProductListingSection({ initialProducts = [] }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSizeFilter, setActiveSizeFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

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

    if (
      location.hash === "#product-listing" ||
      sizeFromUrl ||
      finishFromUrl ||
      filterFromUrl ||
      searchFromUrl
    ) {
      const timer = window.setTimeout(() => {
        document.getElementById("product-listing")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 350);

      return () => window.clearTimeout(timer);
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

  const displayedProducts = filteredProducts.slice(0, visibleCount);

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

  return (
    <section
      id="product-listing"
      ref={sectionRef}
      className="aev-collection"
    >
      <div className="aev-collection__grain" aria-hidden="true" />

      <header className="aev-collection__toolbar">
        <div className="aev-collection__topline">
          <span className="aev-collection__eyebrow">
            <i /> Explore
          </span>

          <span className="aev-collection__edition">
            Aevitas Ceramics <b>— Collection</b>
          </span>
        </div>

        <div className="aev-collection__heading-row">
          <div className="aev-collection__heading">
            <h2>The Collection</h2>
            <p>Explore surfaces shaped by material, texture, and light.</p>
          </div>

          <div className="aev-collection__count" aria-live="polite">
            <span className="aev-collection__count-number">
              {String(filteredProducts.length).padStart(2, "0")}
            </span>
            <span className="aev-collection__count-label">
              surfaces<br />available
            </span>
          </div>
        </div>

        <div className="aev-collection__filters">
          <label className="aev-collection__search">
            <span className="aev-collection__sr-only">
              Search tiles
            </span>

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>

            <input
              type="search"
              placeholder="Find a surface by name or finish"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveFilter("All");
                setActiveSizeFilter("All");
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <div className="aev-collection__filter-group">
            <span className="aev-collection__filter-label">
              Finish
            </span>

            <div
              className="aev-collection__pills"
              role="group"
              aria-label="Filter by finish"
            >
              {FINISH_FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={`aev-filter-pill ${
                    activeFilter === filter ? "is-active" : ""
                  }`}
                  aria-pressed={activeFilter === filter}
                  onClick={() => selectFinish(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="aev-collection__filter-group aev-collection__size-group">
            <span className="aev-collection__filter-label">
              Format
            </span>

            <div
              className="aev-collection__pills"
              role="group"
              aria-label="Filter by tile size"
            >
              {SIZE_FILTERS.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={`aev-filter-pill ${
                    activeSizeFilter === size ? "is-active" : ""
                  }`}
                  aria-pressed={activeSizeFilter === size}
                  onClick={() => selectSize(size)}
                >
                  {size === "All" ? "All formats" : size}
                </button>
              ))}
            </div>
          </div>

          {(search ||
            activeFilter !== "All" ||
            activeSizeFilter !== "All") && (
            <button
              type="button"
              className="aev-collection__clear"
              onClick={clearFilters}
            >
              Clear selection <span>↗</span>
            </button>
          )}
        </div>

        <div className="aev-collection__rule">
          <span />
        </div>
      </header>

      <div className="aev-collection__body">
        <div className="aev-collection__meta-row">
          <p>
            <span className="aev-collection__live-dot" />
            Selected surfaces
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
                        alt={product.name || "Ceramic tile"}
                        className="aev-product-card__img"
                        loading="lazy"
                      />
                    </div>

                    {hasPreview && (
                      <div className="aev-product-card__image aev-product-card__image--preview">
                        <img
                          src={product.previewImage}
                          alt={`${product.name || "Tile"} in an interior`}
                          className="aev-product-card__img"
                          loading="lazy"
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

      <footer className="aev-collection__footer">
        <span>AEVITAS CERAMICS</span>
        <span>Materiality, made meaningful.</span>
        <span>
          Collection / 01 <b>↗</b>
        </span>
      </footer>
    </section>
  );
}
