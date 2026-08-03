// ============================================================
// catalogueData.ts
// Static catalogue data — required because next.config.ts uses
// output: "export" (no runtime server / filesystem reads).
// PDFs are hosted on Google Drive — no local storage needed.
// ============================================================

export interface CatalogueItem {
  /** Human-friendly title shown on the card */
  displayName: string;
  /** Google Drive file ID — used to build view & download URLs */
  driveId: string;
}

export interface CollectionData {
  /** URL slug used in /tile-catalogue/[slug] */
  slug: string;
  /** Kept for reference only */
  folder: string;
  /** Display title shown on the landing card */
  title: string;
  /** Display subtitle shown on the landing card */
  subtitle: string;
  /** Hero image path (from /public) for the landing card */
  heroImage: string;
  /** Accent colour used for the book spine on listing cards */
  spineColor: string;
  /** All PDFs in this collection */
  catalogues: CatalogueItem[];
}

// ============================================================
// Cover images recycled from the existing hero gallery
// ============================================================
const COVER_IMAGES = [
  "/images/hero/core1.avif",
  "/images/hero/core2.avif",
  "/images/hero/core3.avif",
  "/images/hero/core4.avif",
  "/images/hero/art1.jpg",
  "/images/hero/art2.jpg",
  "/images/hero/art3.jpg",
  "/images/hero/art4.jpg",
  "/images/hero/art5.jpg",
  "/images/hero/img3.jpeg",
];

export function getCoverImage(index: number): string {
  return COVER_IMAGES[index % COVER_IMAGES.length];
}

/** Google Drive viewer URL (opens PDF in Drive) */
export function getDriveViewUrl(driveId: string): string {
  return `https://drive.google.com/file/d/${driveId}/view`;
}

/** Google Drive direct download URL */
export function getDriveDownloadUrl(driveId: string): string {
  return `https://drive.google.com/uc?export=download&id=${driveId}`;
}

// ============================================================
// Collection definitions — all PDFs on Google Drive
// ============================================================
export const COLLECTIONS: CollectionData[] = [
  // ----------------------------------------------------------
  // 800 × 1600
  // ----------------------------------------------------------
  {
    slug: "800x1600",
    folder: "800x1600",
    title: "800 × 1600 mm",
    subtitle: "Large Format Porcelain Collection",
    heroImage: "/images/catalogues/800x1600.jpg",
    spineColor: "#1c1c1c",
    catalogues: [
      { displayName: "Beby Satin Collection",  driveId: "1xJRwfeP5mvrJvZ9eiOjMfOk1j5abKwnU" },
      { displayName: "Craft Brochure",          driveId: "1FuxmJ_93lMoaGLdjQRMZPmlb0g3etl10" },
      { displayName: "Elight Brochure",         driveId: "15FYvSgD2Z2TvZJzgR7FaoNtA6g_qQnyg" },
      { displayName: "Endless Brochure",        driveId: "1Wt-mu3zh4nKpFddJCzg0Na9xIZA1A6K3" },
      { displayName: "GHR Collection",          driveId: "1FkCFrA95Y8XnuuF2ns_1jI08SwBz2Rs5" },
      { displayName: "Grace Brochure",          driveId: "1wXt40l1oobYS_uxBznAOXIEJTx1P3LQz" },
      { displayName: "Lucia Brochure",          driveId: "1sEmKq07l2c01Yzg5OiDQk6L7fk89JsFW" },
      { displayName: "Poss Collection",         driveId: "1nKQo7HfrxFTk0Qusq0wPKmc_TnCN6nVE" },
    ],
  },

  // ----------------------------------------------------------
  // 800 × 2400
  // ----------------------------------------------------------
  {
    slug: "800x2400",
    folder: "800X2400",
    title: "800 × 2400 mm",
    subtitle: "Premium Architectural Slabs",
    heroImage: "/images/catalogues/800x2400.jpg",
    spineColor: "#2d302a",
    catalogues: [
      { displayName: "Cosmic by Ballii",        driveId: "10Min56jYngoodjRy7TB2jwz26SuiS0lb" },
      { displayName: "Dark Marble Collection",  driveId: "1SrzQK53DeNikSVQWIubLCCuLbHyEjUyX" },
      { displayName: "Galaxy Collection",       driveId: "151AyX8p1wrjrfMyEP7lyp5vn8AI00f2o" },
      { displayName: "Light Marble Collection", driveId: "1Rrz_eKlbk-MQRb4S93qEEoYz5iNRMXrd" },
      { displayName: "Pure Colors Collection",  driveId: "1H-VHRYbfe175w4YFgvLvRHsKg0Xh3TUl" },
      { displayName: "Saga Stone Collection",   driveId: "1TNkAz21lydMjeCCnLmgbOsZ-Oped7-MF" },
      { displayName: "Sparkle Collection",      driveId: "1OrB0VRgl87oCl8Yle5I0GhBQKSd0qfbw" },
      { displayName: "Spectrum Collection",     driveId: "16tqw5K4ti_rFNxpUsK0nUsk1sD-r60PT" },
      { displayName: "Stonex Collection",       driveId: "1Lzgxrdb74f72U1mVye9cUXMwR5rEZiXj" },
      { displayName: "Terrazzo Collection",     driveId: "1832Fhl4ctEDRY5Vlqm0ZcOsH4EMImlUl" },
    ],
  },

  // ----------------------------------------------------------
  // 600 × 1200
  // ----------------------------------------------------------
  {
    slug: "600x1200",
    folder: "600X1200",
    title: "600 × 1200 mm",
    subtitle: "Modern Interior Collection",
    heroImage: "/images/catalogues/600x1200.jpg",
    spineColor: "#3b3431",
    catalogues: [
      { displayName: "Granulla Collection",            driveId: "13IF-f0stDl6ow5TSlYldAXrBrto27Au4" },
      { displayName: "Lux Collection",                 driveId: "1fAZ2uC3t9UBcFWKKBzQlKs1uVW1v1G1Q" },
      { displayName: "Lux Plus Collection",            driveId: "1r3ki0uDyWVIlqcUURxXyJv_olTqTMtfN" },
      { displayName: "Metalloid Collection",           driveId: "1Dj3rzOr--nRH9mCCYr3nyj01H4wI9JSs" },
      { displayName: "Natural & Elegant Collection",   driveId: "1YdiCXvdSWMMkPCEI9kyOGtpDJSudFKbQ" },
      { displayName: "Spectra Collection",             driveId: "15NoWsdXmkbVEZ9gJ2gWfWe3YzzMA_4xq" },
      { displayName: "Urban Collection",               driveId: "1XUuWZI7gaDz9pZRpIkwqyGc45l4-m3l0" },
      { displayName: "Luzzo Collection",               driveId: "1WuoPROhcuYKLgS55ntb1-MVyu7Mfkygc" },
      { displayName: "Elegant Collection",             driveId: "1y6J18lj3i1l3Oh3B-vZRtshebc3s3P0r" },
      { displayName: "V-Glossy Vol. 2 — No. 1",       driveId: "1xctiili-zE-NWOXiioQx5BdnIEzwufYX" },
      { displayName: "V-Glossy Vol. 2 — No. 2",       driveId: "1PIb1h16HO7baUg29Na_k278x3S21lG9T" },
      { displayName: "V-Glossy Vol. 2 — No. 3",       driveId: "1VMKWWEslb7_BElcXITyXN_jxrzEI1DIr" },
      { displayName: "V-Glossy Vol. 2 — No. 4",       driveId: "1t9gzuiPEr1_FJDsoRBnq8gQgZfEL3PHV" },
      { displayName: "V-Glossy Vol. 2 — No. 5",       driveId: "1oYvUf3-fXat0cnbsTrKDlCda6Jkh8kQi" },
      { displayName: "V-Glossy Vol. 2 — No. 6",       driveId: "1vvbRUAZDFoWsVOWB_MkKqZvgDMYIJXQ-" },
      { displayName: "V-Glossy Vol. 2 — No. 7",       driveId: "1jjITGSCKNxwtqKO-_ZdeN7jRSTW2Zq3S" },
      { displayName: "V-Glossy Vol. 2 — No. 8",       driveId: "1FE3D6RJmK1I5k3DmEl2sA4du8oR_Hq_p" },
      { displayName: "V-Glossy Vol. 2 — No. 9",       driveId: "1zy5vn5j_GL7j5XetG_-C89w1oUHpa6xg" },
      { displayName: "V-Glossy Vol. 2 — No. 10",      driveId: "1LwzEUALdg8rGF0Jbs7GsNz5yA8euQOQy" },
      { displayName: "V-Glossy Vol. 2 — No. 11",      driveId: "1mw5C8u4u-DjeEn8bstxxoUituRtgxDje" },
      { displayName: "V-Glossy Vol. 2 — No. 12",      driveId: "1VGgyGmPNSYiq0YfwD98uep_l4JdhprWz" },
      { displayName: "V-Glossy Vol. 2 — No. 13",      driveId: "1uDS5ey8Dfk6-idb_HKWzOBTUKCsZkmom" },
      { displayName: "V-Glossy Vol. 2 — No. 15",      driveId: "1BiXvJOTxSs1YddMVCmoNjrFLxSDHtY5w" },
      { displayName: "V-Glossy Vol. 2 — No. 16",      driveId: "1VovX9nJ-oHort-d2BdH9G6d1EswT2D6X" },
      { displayName: "V-Glossy Vol. 2 — No. 17",      driveId: "1C9L9E4MTsW-WnAgnflDP0RJlWNJ6wkcp" },
      { displayName: "V-Glossy Vol. 2 — No. 18",      driveId: "1Iw5pZpNI_FvPB6c6KNPIcqcYgwMwFUMJ" },
      { displayName: "V-Glossy Vol. 2 — No. 19",      driveId: "1DeRq_LFVUFXRnYv6rvfZae9zZ2ko54Sd" },
    ],
  },

  // ----------------------------------------------------------
  // 1200 × 1800
  // ----------------------------------------------------------
  {
    slug: "1200x1800",
    folder: "1200x1800",
    title: "1200 × 1800 mm",
    subtitle: "Luxury Signature Collection",
    heroImage: "/images/catalogues/1200x1800.jpg",
    spineColor: "#1a2520",
    catalogues: [
      { displayName: "Carving Collection",              driveId: "19DI-V2tskMlIDXYWcOilwrEdMpAdyuxh" },
      { displayName: "Light Polished 2024 — Vol. 1",   driveId: "11wlMCZwe8iksWfF8Lcpm6lvhmRCd5tNu" },
      { displayName: "Light Polished 2024 — Vol. 3",   driveId: "1UaSK8zXp1bNnVnYGJcktEizutv1h_Ki-" },
      { displayName: "Light Polished 2024 — Vol. 4",   driveId: "1QfL6BfzWJ3POigWb0ksa-lqxw0yHmcsF" },
      { displayName: "Light Polished 2024 — Vol. 5",   driveId: "11-dMvEoBe9KSK3y5o2gQDNzaDZZksirt" },
      { displayName: "Glossy Collection",               driveId: "1yGAPBqxIhJoVsFgKVJgjxze-aJ60nEXT" },
      { displayName: "High Glossy Collection",          driveId: "1LokoQ1n4e9c6bZLSoJNYa9bXP9wisZrr" },
      { displayName: "Marble Collection",               driveId: "1K-s02Z3sfYR6YNjRwf03YPJ1TrU5NUVc" },
      { displayName: "Matt Collection",                 driveId: "1oqyajDI3wFFKp9ws64-R6nKvU3KboMTE" },
    ],
  },
];

/** Look up a collection by its URL slug */
export function getCollectionBySlug(slug: string): CollectionData | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
