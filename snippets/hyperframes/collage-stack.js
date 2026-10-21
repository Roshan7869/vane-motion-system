/**
 * Collage-stack builder — HyperFrames / GSAP
 *
 * The layer order is the technique. Every "viral reel" frame in the corpus is this
 * stack with different contents:
 *
 *   bg (distressed) -> cutouts (hard shadow) -> paper shapes -> type plate
 *     -> grain -> vignette
 *
 * Renders at 1080x1920. All motion is transform-only and driven by the timeline, so
 * HyperFrames can seek to any frame.
 */

/** Inline SVG turbulence as a data URL — keeps the project offline, no asset needed. */
export const GRAIN_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/>` +
      `<feColorMatrix type='saturate' values='0'/></filter>` +
      `<rect width='220' height='220' filter='url(%23n)'/></svg>`
  );

/**
 * Build one collage shot.
 *
 * @param {object} o
 * @param {string} o.id          DOM id for the shot wrapper
 * @param {string} o.paper       background colour (each shot gets its OWN — palette reset)
 * @param {string[]} o.cutouts   image srcs, back to front
 * @param {string} [o.plateText] oversized type on a solid plate
 * @returns {HTMLElement} the shot element (already attached to #root)
 */
export function buildCollageShot({ id, paper, cutouts = [], plateText = null }) {
  const shot = document.createElement("div");
  shot.id = id;
  shot.className = "shot";
  shot.style.cssText = `
    position:absolute; inset:0; background:${paper}; overflow:hidden; opacity:0;
    width:1080px; height:1920px;`;

  // 1. textured background — a flat fill is the single most common way this look fails
  const bg = document.createElement("div");
  bg.style.cssText = `position:absolute; inset:0; opacity:.12; mix-blend-mode:multiply;
    background-image:url("${GRAIN_URL}"); background-size:220px 220px;`;
  shot.appendChild(bg);

  // 2. cut-outs, each with a HARD shadow (zero blur) so it reads as cut paper
  cutouts.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.cssText = `
      position:absolute; left:50%; bottom:0; height:${62 - i * 8}%;
      transform:translateX(-50%); object-fit:contain; z-index:${2 + i};
      filter:drop-shadow(18px 18px 0 rgba(0,0,0,.35));`;
    shot.appendChild(img);
  });

  // 3. oversized type on a solid plate — the visual anchor
  if (plateText) {
    const plate = document.createElement("div");
    plate.style.cssText = `
      position:absolute; left:50%; top:56%; transform:translateX(-50%); z-index:9;
      background:#fff; padding:18px 54px;`;
    const span = document.createElement("span");
    span.textContent = plateText;
    span.style.cssText = `font:900 190px/0.9 system-ui,sans-serif; color:#0a0a0a;
      letter-spacing:-6px; display:block;`;
    plate.appendChild(span);
    shot.appendChild(plate);
  }

  // 4. grain
  const grain = document.createElement("div");
  grain.style.cssText = `position:absolute; inset:0; pointer-events:none; z-index:20;
    mix-blend-mode:multiply; opacity:.28;
    background-image:url("${GRAIN_URL}"); background-size:220px 220px;`;
  shot.appendChild(grain);

  // 5. vignette
  const vig = document.createElement("div");
  vig.style.cssText = `position:absolute; inset:0; pointer-events:none; z-index:21;
    background:radial-gradient(ellipse at 50% 46%, transparent 38%, rgba(0,0,0,.62) 100%);`;
  shot.appendChild(vig);

  document.getElementById("root").appendChild(shot);
  return shot;
}

/**
 * Hard cut with no transition object. The palette change IS the transition.
 * Set both states at the same timestamp so no intermediate frame can blend them.
 */
export function hardCut(tl, fromSel, toSel, at) {
  tl.set(fromSel, { opacity: 0 }, at);
  tl.set(toSel, { opacity: 1 }, at);
}

/**
 * Continuous churn — keeps static_ratio at 0 without adding cuts.
 * `ease:'none'` deliberately: any easing here reads as "designed", which kills the look.
 */
export function churn(tl, sel, duration, { from = 1.0, to = 1.09 } = {}) {
  return tl.fromTo(sel, { scale: from }, { scale: to, duration, ease: "none" }, 0);
}

/**
 * 3D extrusion via stacked text-shadow — no WebGL, no 3D engine.
 *
 * `stops` is capped deliberately. On Devanagari, each stop is an offset copy of the
 * shaped cluster, so 6+ stops fuse conjuncts into a blur. Use 3-4 there.
 */
export function extrude(el, { stops = 8, color = "#b0b0b0", px = 2 } = {}) {
  const layers = [];
  for (let i = 1; i <= stops; i++) {
    layers.push(`0 ${i * px}px 0 ${color}`);
  }
  layers.push(`0 ${stops * px + 4}px ${stops * 2}px rgba(0,0,0,.55)`);
  el.style.textShadow = layers.join(", ");
  return el;
}
