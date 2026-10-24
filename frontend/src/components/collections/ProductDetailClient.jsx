import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, MessageCircle } from "lucide-react";
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
    if (!group || !activeVariation) return;

    const name = activeVariation.name || group.name;
    const size = activeVariation.size || group.size || "";
    const finish = activeVariation.category || group.category || "";

    document.title = `${name} Tiles${size ? ` ${size} mm` : ""} | Aevitas Ceramics`;

    const description =
      `Explore ${name} porcelain tiles${size ? ` in ${size} mm size` : ""}` +
      `${finish ? ` with ${finish} finish` : ""}. View design details from Aevitas Ceramics.`;

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = window.location.origin + window.location.pathname;
  }, [group, activeVariation]);

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
                alt={activeVariation.name}
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
                      <img src={variation.image} alt={variation.name} draggable="false" />
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
              Crafted with precision, the {activeVariation.name} collection delivers
              authentic texture and visual depth to elevate any architectural space.
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
            alt={`${activeVariation.name} room preview`}
            loading="lazy"
            draggable="false"
            onContextMenu={(event) => event.preventDefault()}
          />
        </section>
      )}
    </main>
  );
}
