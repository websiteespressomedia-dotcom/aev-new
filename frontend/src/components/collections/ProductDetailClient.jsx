import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, MessageCircle } from "lucide-react";

import { groupedProducts } from "../../lib/productData";

import gsap from "gsap";
import "./ProductDetailClient.css";

export default function ProductDetailClient({ group }) {
  const variations = Array.isArray(group?.variations) ? group.variations : [];
  const allSizes = useMemo(
    () => [...new Set(variations.map((item) => item.size).filter(Boolean))],
    [variations]
  );

  const [activeSize, setActiveSize] = useState(allSizes[0] || "");
  const [activeVariation, setActiveVariation] = useState(variations[0] || group);
  const mainImageRef = useRef(null);
  const detailsRef = useRef(null);

  const sizeVariations = variations.filter(
    (item) => !activeSize || item.size === activeSize
  );

  useLayoutEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
}, [group?.id]);

  useEffect(() => {
    if (!variations.length) return;
    const firstSize = allSizes[0] || "";
    setActiveSize(firstSize);
    setActiveVariation(
      variations.find((item) => item.size === firstSize) || variations[0]
    );
  }, [group?.id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }
        );
      }
      if (detailsRef.current) {
        gsap.fromTo(
          Array.from(detailsRef.current.children),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, delay: 0.12, ease: "power2.out" }
        );
      }
    });
    return () => ctx.revert();
  }, [group?.id]);

  
useEffect(() => {
  if (!group) return;

  const productName = group.baseName || group.name;
  const sizes = [
    ...new Set(variations.map((item) => item.size).filter(Boolean)),
  ];
  const finishes = [
    ...new Set(variations.map((item) => item.category).filter(Boolean)),
  ];

  document.title =
    `${productName} Porcelain Tiles | Aevitas Ceramics`;

  const description =
    `Explore ${productName} porcelain tiles by Aevitas Ceramics` +
    `${sizes.length ? `. Available sizes: ${sizes.join(", ")} mm` : ""}` +
    `${finishes.length ? `. Finishes: ${finishes.join(", ")}` : ""}.` +
    ` Request product details and availability.`;

  let meta = document.querySelector(
    'meta[name="description"]'
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }

  meta.content = description;

  let canonical = document.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = `https://aev-new.vercel.app/porcelain-floor-tiles/${group.id}`;
}, [group]);


useEffect(() => {
  if (!group) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aev-new.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Collections",
        "item": "https://aev-new.vercel.app/collections"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": group.baseName || group.name,
        "item": `https://aev-new.vercel.app/porcelain-floor-tiles/${group.id}`
      }
    ]
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.seoBreadcrumb = "true";
  script.textContent = JSON.stringify(schema);

  document.head.appendChild(script);

  return () => script.remove();
}, [group]);


  const handleSizeClick = (size) => {
    setActiveSize(size);
    const next = variations.find((item) => item.size === size);
    if (next) setActiveVariation(next);
  };

  const handleWhatsAppEnquiry = () => {
    const productName = activeVariation?.name || group?.name || "this tile design";
    const productSize = activeVariation?.size || group?.size || "Not specified";
    const productFinish = activeVariation?.category || group?.category || "Not specified";
    const productUrl = window.location.href;

    const message = [
      "Hello, I'm Interested in this tile design and would like to know more details.",
      "",
      `Design: ${productName}`,
      `Size: ${productSize} mm`,
      `Finish: ${productFinish}`,
      `Product link: ${productUrl}`,
      "",
      "Could you please share the price, availability, and more details about this design?",
    ].join("\n");

    const whatsappUrl = `https://wa.me/919265901137?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${activeVariation?.name || group.name} — Aevitas Ceramics`,
          url,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        window.alert("Link copied to clipboard!");
      } else {
        window.prompt("Copy this design link:", url);
      }
    } catch (error) {
      if (error?.name !== "AbortError") console.error("Unable to share design:", error);
    }
  };


  const relatedProducts = useMemo(() => {
    if (!group) return [];

    const sizes = new Set(
      variations.map((item) => item.size).filter(Boolean)
    );
    const finishes = new Set(
      variations.map((item) => item.category).filter(Boolean)
    );

    // Treat R1, R2, R3, etc. as faces/versions of the same design.
    const normalizeDesignName = (name = "") =>
      String(name)
        .replace(/[\s_-]+R\d+\s*$/i, "")
        .trim()
        .toLowerCase()
        .replace(/[_\s-]+/g, " ");

    const currentDesign = normalizeDesignName(
      group.baseName || group.name
    );

    const uniqueDesigns = new Map();

    groupedProducts.forEach((item) => {
      const designName = normalizeDesignName(
        item.baseName || item.name
      );

      // Exclude every version of the currently opened design.
      if (!designName || designName === currentDesign) return;

      // Keep only one card per unique design.
      if (!uniqueDesigns.has(designName)) {
        uniqueDesigns.set(designName, item);
      }
    });

    return [...uniqueDesigns.values()]
      .map((item) => ({
        ...item,
        score:
          (item.variations.some((v) => finishes.has(v.category)) ? 2 : 0) +
          (item.variations.some((v) => sizes.has(v.size)) ? 1 : 0),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [group, variations]);
  
  if (!activeVariation) return null;

  const hasUniquePreview =
    activeVariation.previewImage &&
    activeVariation.previewImage !== activeVariation.image;
  const sizeString = activeVariation.size || group.size || "1000x1000";
  const [widthString, heightString] = sizeString.toLowerCase().split("x");
  const width = Number.parseInt(widthString, 10) || 1000;
  const height = Number.parseInt(heightString, 10) || 1000;

  return (
    <main className="aev-detail-page">
      <div className="aev-detail-shell">
        <div className="aev-detail-back">
          <Link to="/collections#product-listing">
            <ArrowLeft size={15} />
            <span>Back to collections</span>
          </Link>
        </div>

        <div className="aev-detail-layout">
          <div className="aev-detail-media-column">
            <div
              ref={mainImageRef}
              className="aev-detail-main-image"
              style={{ aspectRatio: `${width} / ${height}` }}
              onContextMenu={(event) => event.preventDefault()}
            >
              <img
                src={activeVariation.image}
                alt={`${activeVariation.name || group.name} porcelain tile by Aevitas Ceramics`}
                draggable="false"
                fetchPriority="high"
              />
            </div>
            <p className="aev-detail-image-caption">High-resolution tile</p>
          </div>

          <section className="aev-detail-info" ref={detailsRef}>
            <p className="aev-detail-kicker">Aevitas Ceramics / Design library</p>
            <h1>{activeVariation.name}</h1>

            <div className="aev-detail-specs">
              <div>
                <span>Finish</span>
                <strong>{activeVariation.category || group.category || "Ceramic"}</strong>
              </div>
              <div>
                <span>Size</span>
                <strong>{activeVariation.size || group.size || "Signature format"}</strong>
              </div>
            </div>

            {allSizes.length > 1 && (
              <div className="aev-detail-option">
                <h2>Available sizes</h2>
                <div className="aev-detail-size-options">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={activeSize === size ? "is-active" : ""}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeVariations.length > 1 && (
              <div className="aev-detail-option">
                <h2>Available variations</h2>
                <div className="aev-detail-thumbnails">
                  {sizeVariations.map((variation, index) => (
                    <button
                      key={`${variation.image}-${index}`}
                      type="button"
                      className={activeVariation.image === variation.image ? "is-active" : ""}
                      onClick={() => setActiveVariation(variation)}
                      aria-label={`Show ${variation.name}`}
                      onContextMenu={(event) => event.preventDefault()}
                    >
                      <img
                        src={variation.image}
                        alt={`${variation.name || group.name} tile variation`}
                        draggable="false"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="aev-detail-actions">
              <button className="aev-detail-share" type="button" onClick={handleShare}>
                <Share2 size={15} />
                Share design
              </button>
              <button
                className="aev-detail-whatsapp"
                type="button"
                onClick={handleWhatsAppEnquiry}
                aria-label={`Request details about ${activeVariation.name}`}
              >
                <MessageCircle size={16} />
                Request for details
              </button>
            </div>

            <p className="aev-detail-description">
              Explore {group.baseName || group.name} porcelain tiles by Aevitas Ceramics.
              Available in {allSizes.length ? allSizes.join(", ") : "selected"} mm sizes,
              this design brings distinctive surface detail to residential and commercial
              interiors. Contact our team for product specifications, availability, and
              finish options.
            </p>
          </section>
        </div>
      </div>

      {hasUniquePreview && (
        <section className="aev-detail-room">
          <div className="aev-detail-room-heading">
            <p>Material in context</p>
            <h2>Room application</h2>
            <span>See how {activeVariation.name} transforms a space.</span>
          </div>
          <img
            src={activeVariation.previewImage}
            alt={`${activeVariation.name || group.name} porcelain tile installed in an interior`}
            loading="lazy"
            draggable="false"
            onContextMenu={(event) => event.preventDefault()}
          />
        </section>
      )}
      <section className="aev-related">
  <h2>Explore Related Tile Designs</h2>
  <p>Discover more porcelain tile designs from Aevitas Ceramics.</p>

  <div className="aev-related-grid">
    {relatedProducts.map((product) => (
      <Link
        key={product.id}
        to={`/porcelain-floor-tiles/${product.id}`}
        className="aev-related-card"
      >
        <img
          src={product.image}
          alt={`${product.name} porcelain tile design`}
          loading="lazy"
        />

        <h3>{product.name}</h3>
        <p>{product.size || "Available formats"} mm</p>
        <span>Explore design ↗</span>
      </Link>
    ))}
  </div>
</section>
    </main>
  );
}
