"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  COLLECTIONS,
  getCoverImage,
  getDriveViewUrl,
  getDriveDownloadUrl,
} from "@/lib/catalogueData";
import "./CreativeCatalogue.css";

gsap.registerPlugin(ScrollTrigger);

const ALL_FILTER = "All collections";
const PAGE_SIZE_OPTIONS = [15, 25];

export default function CreativeCatalogue() {
  const sectionRef = useMemo(() => ({ current: null }), []);
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState(ALL_FILTER);
  const [sortOrder, setSortOrder] = useState("featured");
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const catalogueItems = useMemo(() => {
    let globalIndex = 0;

    return COLLECTIONS.flatMap((collection) =>
      collection.catalogues.map((item) => {
        const currentIndex = globalIndex++;
        return {
          ...item,
          key: `${collection.slug}-${item.driveId || item.displayName || currentIndex}`,
          collectionTitle: collection.title,
          collectionSubtitle: collection.subtitle,
          collectionSlug: collection.slug,
          coverImage: getCoverImage(currentIndex),
          viewUrl: getDriveViewUrl(item.driveId),
          downloadUrl: getDriveDownloadUrl(item.driveId),
          originalIndex: currentIndex,
        };
      })
    );
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = catalogueItems.filter((item) => {
      const matchesCollection =
        activeCollection === ALL_FILTER || item.collectionTitle === activeCollection;

      const searchable = [
        item.displayName,
        item.collectionTitle,
        item.collectionSubtitle,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCollection && (!query || searchable.includes(query));
    });

    if (sortOrder === "az") {
      result.sort((a, b) => (a.displayName || "").localeCompare(b.displayName || ""));
    } else if (sortOrder === "za") {
      result.sort((a, b) => (b.displayName || "").localeCompare(a.displayName || ""));
    } else {
      result.sort((a, b) => a.originalIndex - b.originalIndex);
    }

    return result;
  }, [catalogueItems, search, activeCollection, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleItems = filteredItems.slice(startIndex, startIndex + pageSize);
  const firstResult = filteredItems.length === 0 ? 0 : startIndex + 1;
  const lastResult = Math.min(startIndex + pageSize, filteredItems.length);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.fromTo(
        ".cc-hero-reveal",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
        }
      );

      gsap.fromTo(
        ".cc-catalogue-row",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: ".cc-results",
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  function resetToFirstPage() {
    setCurrentPage(1);
  }

  function changePage(nextPage) {
    const next = Math.max(1, Math.min(nextPage, totalPages));
    setCurrentPage(next);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.querySelector(".cc-library")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    }
  }

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let page = start; page <= end; page += 1) pages.push(page);
    return pages;
  }, [safePage, totalPages]);

  return (
    <main className="cc-page" ref={sectionRef}>
      <div className="cc-grain" aria-hidden="true" />

      <header className="cc-hero cc-container">
        <div className="cc-hero-top cc-hero-reveal">
          <span className="cc-kicker"><span /> Aevitas Ceramics</span>
          <span className="cc-hero-index">DIGITAL LIBRARY / 001</span>
        </div>

        <div className="cc-hero-title-wrap">
          <p className="cc-overline cc-hero-reveal">Technical specifications &amp; design directions</p>
          <h1 className="cc-hero-title cc-hero-reveal">
            The Catalogue
            <br />
            <em>Archive.</em>
          </h1>
        </div>

        <div className="cc-hero-bottom cc-hero-reveal">
          <p>
            A considered library of surfaces, finishes, and collections.
            Find the right catalogue for your next project.
          </p>
          <div className="cc-total">
            <strong>{String(catalogueItems.length).padStart(2, "0")}</strong>
            <span>CATALOGUES<br />IN THE ARCHIVE</span>
          </div>
        </div>
      </header>

      <section className="cc-library cc-container" aria-label="Catalogue library">
        <div className="cc-library-heading">
          <div>
            <span className="cc-section-label">THE LIBRARY</span>
            <h2>Find your <em>direction.</em></h2>
          </div>
          <span className="cc-library-note">BROWSE · FILTER · EXPLORE</span>
        </div>

        <div className="cc-toolbar" aria-label="Filter catalogues">
          <label className="cc-search">
            <span className="cc-search-icon" aria-hidden="true">⌕</span>
            <span className="cc-sr-only">Search catalogues</span>
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetToFirstPage();
              }}
              placeholder="Search by catalogue or collection"
            />
            {search && (
              <button type="button" className="cc-clear-search" onClick={() => {
                setSearch("");
                resetToFirstPage();
              }}>
                Clear
              </button>
            )}
          </label>

          <label className="cc-select-wrap">
            <span className="cc-sr-only">Filter by collection</span>
            <select
              value={activeCollection}
              onChange={(event) => {
                setActiveCollection(event.target.value);
                resetToFirstPage();
              }}
            >
              <option value={ALL_FILTER}>{ALL_FILTER}</option>
              {COLLECTIONS.map((collection) => (
                <option value={collection.title} key={collection.slug}>{collection.title}</option>
              ))}
            </select>
            <span aria-hidden="true">⌄</span>
          </label>

          <label className="cc-select-wrap cc-sort">
            <span className="cc-sr-only">Sort catalogues</span>
            <select
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
                resetToFirstPage();
              }}
            >
              <option value="featured">Featured order</option>
              <option value="az">Name: A to Z</option>
              <option value="za">Name: Z to A</option>
            </select>
            <span aria-hidden="true">⌄</span>
          </label>

          <label className="cc-select-wrap cc-page-size">
            <span className="cc-sr-only">Catalogues per page</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                resetToFirstPage();
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option value={size} key={size}>{size} per page</option>
              ))}
            </select>
            <span aria-hidden="true">⌄</span>
          </label>
        </div>

        <div className="cc-results-meta" aria-live="polite">
          <span><strong>{String(filteredItems.length).padStart(2, "0")}</strong> MATCHING CATALOGUES</span>
          <span>PDF CATALOGUES <i>✳</i></span>
        </div>

        <div className="cc-table-head" aria-hidden="true">
          <span>CATALOGUE</span>
          <span>COLLECTION</span>
          <span>FORMAT</span>
          <span>EXPLORE</span>
        </div>

        <div className="cc-results" aria-live="polite">
          {visibleItems.map((item, index) => (
            <article className="cc-catalogue-row" key={item.key}>
              <div className="cc-item-main">
                <div className="cc-cover">
                  <Image
                    src={item.coverImage}
                    alt={`${item.displayName} catalogue cover`}
                    fill
                    sizes="(max-width: 680px) 65px, 94px"
                    className="cc-cover-image"
                  />
                  <span className="cc-cover-number">{String(startIndex + index + 1).padStart(2, "0")}</span>
                </div>
                <div className="cc-item-title">
                  <span className="cc-item-eyebrow">Aevitas / Archive</span>
                  <h3>{item.displayName}</h3>
                  <span className="cc-item-mobile-collection">{item.collectionTitle}</span>
                </div>
              </div>

              <div className="cc-item-collection">
                <span>{item.collectionTitle}</span>
                <small>{item.collectionSubtitle}</small>
              </div>

              <div className="cc-item-format">
                <span className="cc-pdf-mark">PDF</span>
                <span>Digital edition</span>
              </div>

              <div className="cc-item-actions">
                <a
                  className="cc-action cc-action-view"
                  href={item.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.displayName}`}
                >
                  View <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="cc-action cc-action-download"
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${item.displayName}`}
                >
                  <span className="cc-download-label">Download</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </article>
          ))}

          {filteredItems.length === 0 && (
            <div className="cc-empty">
              <span className="cc-empty-symbol">✳</span>
              <h3>No catalogues found.</h3>
              <p>Try another search term or select a different collection.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCollection(ALL_FILTER);
                  setSortOrder("featured");
                  setPageSize(25);
                  setCurrentPage(1);
                }}
              >
                Reset filters <span aria-hidden="true">↗</span>
              </button>
            </div>
          )}
        </div>

        {filteredItems.length > 0 && (
          <nav className="cc-pagination" aria-label="Catalogue pagination">
            <div className="cc-pagination-summary">
              Showing <strong>{firstResult}–{lastResult}</strong> of <strong>{filteredItems.length}</strong>
            </div>

            <div className="cc-pagination-controls">
              <button
                type="button"
                className="cc-page-arrow"
                disabled={safePage === 1}
                onClick={() => changePage(safePage - 1)}
                aria-label="Previous page"
              >
                <span aria-hidden="true">←</span><span className="cc-page-arrow-label">Previous</span>
              </button>

              {pageNumbers[0] > 1 && (
                <>
                  <button type="button" className="cc-page-number" onClick={() => changePage(1)}>1</button>
                  {pageNumbers[0] > 2 && <span className="cc-page-ellipsis">…</span>}
                </>
              )}

              {pageNumbers.map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`cc-page-number${page === safePage ? " is-current" : ""}`}
                  aria-current={page === safePage ? "page" : undefined}
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                    <span className="cc-page-ellipsis">…</span>
                  )}
                  <button type="button" className="cc-page-number" onClick={() => changePage(totalPages)}>
                    {totalPages}
                  </button>
                </>
              )}

              <button
                type="button"
                className="cc-page-arrow"
                disabled={safePage === totalPages}
                onClick={() => changePage(safePage + 1)}
                aria-label="Next page"
              >
                <span className="cc-page-arrow-label">Next</span><span aria-hidden="true">→</span>
              </button>
            </div>
          </nav>
        )}

        <div className="cc-library-footer">
          <span>END OF CURRENT ARCHIVE</span>
          <span>AEVITAS CERAMICS <i>✳</i> INDIA</span>
        </div>
      </section>

      <footer className="cc-footer cc-container">
        <p>Need help choosing the right surface?</p>
        <Link href="/contact" className="cc-contact-link">
          Talk to our team <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </main>
  );
}
