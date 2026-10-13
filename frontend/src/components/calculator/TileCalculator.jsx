import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./TileCalculator.css";

const UNITS = ["Feet", "Meter", "Inch", "CM"];
const TILE_SIZES = [
  { label: "600 × 600", length: 600, width: 600 },
  { label: "600 × 1200", length: 1200, width: 600 },
  { label: "800 × 800", length: 800, width: 800 },
  { label: "800 × 1600", length: 1600, width: 800 },
  { label: "1200 × 1200", length: 1200, width: 1200 },
  { label: "Custom", length: 1200, width: 600 },
];
const PATTERNS = [
  { name: "Straight", note: "Clean, aligned layout", waste: 10, icon: "▦" },
  { name: "Diagonal", note: "Angled installation", waste: 15, icon: "◇" },
  { name: "Herringbone", note: "Decorative pattern", waste: 15, icon: "⌁" },
];

const toMeters = (value, unit) => {
  const number = Number(value) || 0;
  if (unit === "Feet") return number * 0.3048;
  if (unit === "Inch") return number * 0.0254;
  if (unit === "CM") return number / 100;
  return number;
};

const numberFormat = (value, digits = 2) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);

export default function TileCalculator() {
  const reduceMotion = useReducedMotion();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("Feet");
  const [preset, setPreset] = useState("600 × 1200");
  const [tileLength, setTileLength] = useState("1200");
  const [tileWidth, setTileWidth] = useState("600");
  const [pattern, setPattern] = useState("Straight");
  const [wastage, setWastage] = useState(10);
  const [showDetails, setShowDetails] = useState(false);

  const updatePreset = (item) => {
    setPreset(item.label);
    if (item.label !== "Custom") {
      setTileLength(String(item.length));
      setTileWidth(String(item.width));
    }
  };

  const results = useMemo(() => {
    const roomLength = toMeters(length, unit);
    const roomWidth = toMeters(width, unit);
    const tileL = (Number(tileLength) || 0) / 1000;
    const tileW = (Number(tileWidth) || 0) / 1000;
    const valid = roomLength > 0 && roomWidth > 0 && tileL > 0 && tileW > 0;
    if (!valid) return { valid: false, roomArea: 0, areaFt: 0, baseTiles: 0, extraTiles: 0, totalTiles: 0, boxes: 0, perBox: 2, coverage: 0 };

    const roomArea = roomLength * roomWidth;
    const exactTiles = roomArea / (tileL * tileW);
    const baseTiles = Math.ceil(exactTiles);
    const extraTiles = Math.ceil(exactTiles * (wastage / 100));
    const totalTiles = baseTiles + extraTiles;

    // Packaging is an estimate; confirm the selected product's actual box quantity.
    const shortSide = Math.min(Number(tileLength), Number(tileWidth));
    const longSide = Math.max(Number(tileLength), Number(tileWidth));
    const perBox = shortSide <= 600 && longSide <= 600 ? 4 : shortSide <= 800 && longSide <= 800 ? 3 : 2;
    const boxes = Math.ceil(totalTiles / perBox);
    return {
      valid: true,
      roomArea,
      areaFt: roomArea * 10.7639104167,
      baseTiles,
      extraTiles,
      totalTiles,
      boxes,
      perBox,
      coverage: boxes * perBox * tileL * tileW,
    };
  }, [length, width, unit, tileLength, tileWidth, wastage]);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <main className="aev-calc">
      <section className="aev-calc-hero">
        <div className="aev-calc-hero__texture" aria-hidden="true" />
        <motion.div
          className="aev-calc-hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="aev-eyebrow"><span /> PROJECT PLANNING</p>
          <h1>Measure with <em>confidence.</em></h1>
          <p className="aev-calc-hero__intro">
            A considered estimate for your next space. Calculate tile quantities, allow for cutting,
            and plan your material with greater clarity.
          </p>
          <a className="aev-calc-hero__jump" href="#tile-estimator">
            Start your estimate <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </section>

      <section className="aev-calc-workspace" id="tile-estimator">
        <div className="aev-calc-workspace__heading">
          <motion.div {...reveal}>
            <p className="aev-eyebrow"><span /> YOUR PROJECT</p>
            <h2>Let’s find your <em>tile count.</em></h2>
          </motion.div>
        </div>

        <div className="aev-calc-grid">
          <div className="aev-calc-form">
            <motion.section className="aev-calc-panel" {...reveal}>
              <div className="aev-calc-panel__title">
                <span className="aev-step">01</span>
                <div><h3>Room dimensions</h3><p>Measure the area you intend to cover.</p></div>
              </div>
              <div className="aev-unit-switch" aria-label="Measurement unit">
                {UNITS.map((item) => (
                  <button key={item} type="button" className={unit === item ? "is-active" : ""} onClick={() => setUnit(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="aev-input-grid">
                <label className="aev-field">
                  <span>Length <small>({unit})</small></span>
                  <input type="number" min="0" step="any" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 18" />
                </label>
                <label className="aev-field">
                  <span>Width <small>({unit})</small></span>
                  <input type="number" min="0" step="any" inputMode="decimal" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 12" />
                </label>
              </div>
              <p className="aev-field-hint">For an irregular room, calculate each rectangular area separately and add the results.</p>
            </motion.section>

            <motion.section className="aev-calc-panel" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
              <div className="aev-calc-panel__title">
                <span className="aev-step">02</span>
                <div><h3>Choose your tile</h3><p>Select a format or enter your own dimensions.</p></div>
              </div>
              <div className="aev-size-grid">
                {TILE_SIZES.map((item) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className={`aev-size-option ${preset === item.label ? "is-active" : ""}`}
                    onClick={() => updatePreset(item)}
                  >
                    <span className="aev-size-option__tile" aria-hidden="true"><i /></span>
                    <span>{item.label}</span>
                    <small>{item.label === "Custom" ? "YOUR SIZE" : "MM"}</small>
                    {preset === item.label && <motion.i layoutId="aev-size-active" className="aev-size-option__marker" transition={{ type: "spring", stiffness: 360, damping: 30 }} />}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence initial={false}>
                {preset === "Custom" && (
                  <motion.div
                    className="aev-input-grid aev-custom-size"
                    initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.28 }}
                  >
                    <label className="aev-field"><span>Tile length <small>(mm)</small></span><input type="number" min="1" value={tileLength} onChange={(e) => setTileLength(e.target.value)} /></label>
                    <label className="aev-field"><span>Tile width <small>(mm)</small></span><input type="number" min="1" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} /></label>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            <motion.section className="aev-calc-panel" {...reveal} transition={{ ...reveal.transition, delay: 0.16 }}>
              <div className="aev-calc-panel__title">
                <span className="aev-step">03</span>
                <div><h3>Layout & allowance</h3><p>Account for cuts, breakages and your chosen pattern.</p></div>
              </div>
              <div className="aev-pattern-grid">
                {PATTERNS.map((item) => (
                  <motion.button
                    key={item.name}
                    type="button"
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className={`aev-pattern-option ${pattern === item.name ? "is-active" : ""}`}
                    onClick={() => { setPattern(item.name); setWastage(item.waste); }}
                  >
                    <span className="aev-pattern-option__icon" aria-hidden="true">{item.icon}</span>
                    <strong>{item.name}</strong>
                    <small>{item.note}</small>
                    <span className="aev-pattern-option__waste">Suggested {item.waste}%</span>
                  </motion.button>
                ))}
              </div>
              <div className="aev-wastage">
                <div><span>Wastage allowance</span><strong>{wastage}%</strong></div>
                <input aria-label="Wastage percentage" type="range" min="5" max="20" step="5" value={wastage} onChange={(e) => setWastage(Number(e.target.value))} style={{ "--aev-range": `${((wastage - 5) / 15) * 100}%` }} />
                <div className="aev-wastage__scale"><span>5%</span><span>10%</span><span>15%</span><span>20%</span></div>
              </div>
            </motion.section>
          </div>

          <motion.aside className="aev-calc-result" {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
            <div className="aev-calc-result__top">
              <p className="aev-eyebrow"><span /> ESTIMATE SUMMARY</p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {!results.valid ? (
                <motion.div key="empty" className="aev-calc-empty" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
                  <div className="aev-calc-empty__symbol" aria-hidden="true">▦</div>
                  <h3>Your space, <em>quantified.</em></h3>
                  <p>Add your room dimensions to see the estimated tile quantity and packaging requirement.</p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <p className="aev-result-label">ESTIMATED AREA</p>
                  <div className="aev-result-area"><strong>{numberFormat(results.areaFt, 2)}</strong><span>sq. ft</span></div>
                  <div className="aev-result-divider" />
                  <div className="aev-result-row"><span>Base tiles</span><strong>{results.baseTiles.toLocaleString("en-IN")}</strong></div>
                  <div className="aev-result-row aev-result-row--extra"><span>Wastage allowance</span><strong>+{results.extraTiles.toLocaleString("en-IN")}</strong></div>
                  <div className="aev-result-total"><span>Total estimated tiles</span><strong>{results.totalTiles.toLocaleString("en-IN")}</strong></div>
                  <div className="aev-result-box">
                    <span className="aev-result-box__icon" aria-hidden="true">▤</span>
                    <div><small>ESTIMATED PACKAGING</small><strong>{results.boxes.toLocaleString("en-IN")} <span>boxes</span></strong><p>Assuming {results.perBox} tiles per box</p></div>
                  </div>
                  <div className="aev-result-coverage"><span>Coverage including full boxes</span><strong>{numberFormat(results.coverage, 2)} m²</strong></div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="aev-result-footnote">Planning estimate only. Actual box quantities vary by product; please confirm packaging details with the Aevitas team or your installer.</div>
          </motion.aside>
        </div>
      </section>

      <section className="aev-calc-manual" id="how-calculation-works">
        <motion.div {...reveal} className="aev-calc-manual__heading">
          <p className="aev-eyebrow"><span /> THE CALCULATION, EXPLAINED</p>
          <h2>Know how your estimate<br /><em>comes together.</em></h2>
          <p className="aev-calc-manual__lead">A simple guide to how room measurements become a tile quantity, so you can plan your project with confidence.</p>
        </motion.div>

        <div className="aev-calc-manual__layout">
          <div className="aev-calc-manual__steps">
            {[
              { number: "01", title: "Measure your space", copy: "Enter the room length and width. The calculator converts your chosen unit into metres before calculating the area.", formula: "Room area = length × width" },
              { number: "02", title: "Find the area of one tile", copy: "Your tile dimensions are entered in millimetres and converted into metres. Multiplying its sides gives the coverage of one tile.", formula: "Tile area = tile length × tile width" },
              { number: "03", title: "Calculate the base quantity", copy: "The room area is divided by the area of one tile. Any fraction is rounded up because you cannot order part of a tile.", formula: "Base tiles = room area ÷ tile area" },
              { number: "04", title: "Add your wastage allowance", copy: "The selected percentage estimates extra tiles for cuts and breakages. The extra quantity is rounded up, then added to the base quantity.", formula: "Total = base tiles + extra tiles" },
            ].map((step, index) => (
              <motion.article key={step.number} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} className="aev-manual-step">
                <span className="aev-manual-step__number">{step.number}</span>
                <div className="aev-manual-step__body">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  <div className="aev-manual-step__formula">{step.formula}</div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside {...reveal} className="aev-calc-example">
            <div className="aev-calc-example__top">
              <span className="aev-calc-example__icon" aria-hidden="true">∑</span>
              <div><p className="aev-eyebrow"><span /> WORKED EXAMPLE</p><h3>See the maths.</h3></div>
            </div>
            <p className="aev-calc-example__description">Imagine a room measuring 12 × 10 ft, using 600 × 600 mm tiles with a 10% wastage allowance.</p>
            <div className="aev-calc-example__inputs">
              <div><span>ROOM AREA</span><strong>120 sq. ft</strong></div>
              <div><span>TILE FORMAT</span><strong>600 × 600 mm</strong></div>
              <div><span>WASTAGE</span><strong>10%</strong></div>
            </div>
            <div className="aev-calc-example__math">
              <div className="aev-calc-example__line"><span>1. Convert room area</span><strong>120 × 0.092903 = 11.15 m²</strong></div>
              <div className="aev-calc-example__line"><span>2. Area per tile</span><strong>0.6 × 0.6 = 0.36 m²</strong></div>
              <div className="aev-calc-example__line"><span>3. Base tile quantity</span><strong>11.15 ÷ 0.36 ≈ 31 tiles</strong></div>
              <div className="aev-calc-example__line"><span>4. Extra for wastage</span><strong>⌈30.97 × 10%⌉ = 4 tiles</strong></div>
            </div>
            <div className="aev-calc-example__answer"><div><span>ESTIMATED TOTAL</span><small>31 base + 4 extra tiles</small></div><strong>35 <span>tiles</span></strong></div>
            <p className="aev-calc-example__note">This is an illustration of the calculator's rounding method. Box count is an estimate and must be checked against the actual product packaging.</p>
          </motion.aside>
        </div>
        <div className="aev-calc-manual__tip"><span aria-hidden="true">✦</span><p><strong>Good to know</strong> Choosing a layout can suggest a starting wastage percentage, but you can adjust the allowance with the slider. The final requirement may vary with room shape, cuts, installer practices and the tile product.</p></div>
      </section>

      <section className="aev-calc-guide">
        <motion.div {...reveal} className="aev-calc-guide__intro">
          <p className="aev-eyebrow"><span /> A BETTER STARTING POINT</p>
          <h2>Thoughtful planning.<br /><em>Beautifully finished spaces.</em></h2>
        </motion.div>
        <div className="aev-calc-guide__items">
          {[
            ["01", "Measure carefully", "Measure the longest length and width of the area. Split L-shaped rooms into rectangles and add their areas."],
            ["02", "Allow for cutting", "Cuts and breakages are part of installation. A common starting point is 10% for straight layouts and 15% for diagonal or herringbone."],
            ["03", "Confirm the box", "Packaging differs between tile collections and formats. Confirm the actual tiles-per-box value before placing your order."],
          ].map(([number, title, copy], index) => (
            <motion.article key={number} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
