/**
 * Letterbox band + emissive bloom — HyperFrames / GSAP
 *
 * For pieces shot in 16:9 but published in a 9:16 container (reposts, compilations,
 * repurposed ads). The black bars are structural: content must never escape the band.
 *
 * Measured from the reference (HVTuxncA9JU): 369 px flat bands top and bottom, leaving
 * a 342 px content band in a 608 px-wide frame — exactly 16:9.
 */

/** Absolute geometry for a 16:9 band centred in a portrait frame. */
export function bandGeometry(frameW, frameH, bandW = null) {
  const w = bandW ?? frameW;
  const h = Math.round(w / (16 / 9));
  const top = Math.round((frameH - h) / 2);
  return { left: 0, top, width: w, height: h, bottom: frameH - top - h };
}

/**
 * Build the band element. Clip, never scale — scaling a 16:9 comp to fill 9:16 would
 * letterbox nothing and destroy the composition.
 */
export function buildBand({ id = 'band', frameW = 1080, frameH = 1920, bg = '#131314' } = {}) {
  const stage = document.getElementById('stage') || document.body;
  const g = bandGeometry(frameW, frameH);

  const band = document.createElement('div');
  band.id = id;
  band.style.cssText = `
    position:absolute; left:${g.left}px; top:${g.top}px;
    width:${g.width}px; height:${g.height}px;
    overflow:hidden; background:${bg};`;
  stage.appendChild(band);

  // the bars themselves are the stage background — no separate elements needed,
  // but they must not be animatable or a beat could accidentally paint over them
  stage.style.background = '#1C1C1C';
  return band;
}

/**
 * Emissive radial bloom — every bright area in this family is its own light source,
 * so there is no directional key anywhere.
 *
 * @param {HTMLElement} parent
 * @param {object} o
 */
export function radialBloom(parent, {
  id = 'bloom',
  cx = 0.5, cy = 0.5,
  stops = [[0, '#FFFFFF'], [0.42, '#CCCCCC'], [0.72, '#333333'], [1, 'rgba(0,0,0,0)']],
  size = 1.0,                   // fraction of the band's smaller axis
} = {}) {
  const el = document.createElement('div');
  el.id = id;
  const grad = stops
    .map(([p, c]) => `${c} ${(p * 100).toFixed(1)}%`)
    .join(', ');
  el.style.cssText = `
    position:absolute;
    left:${cx * 100}%; top:${cy * 100}%;
    width:${size * 100}%; aspect-ratio:1;
    transform:translate(-50%,-50%);
    border-radius:50%;
    background:radial-gradient(circle, ${grad});
    pointer-events:none;`;
  parent.appendChild(el);
  return el;
}

/**
 * Perf note that matters on a 2-core box:
 * a static gradient field should be a pre-rasterised PNG, not a live radial-gradient
 * with filter:blur(). Only the elements that actually move need to be live DOM.
 * In the reference, beats 2/4/5 are near-static fields — rasterise them.
 */
export function rasteriseHint(el) {
  el.style.willChange = 'auto';          // nothing animates here, so do not promote
  el.style.contain = 'paint';
  return el;
}

/** Hard cut: two sets at the same timestamp so no intermediate frame can blend. */
export function hardCut(tl, fromSel, toSel, at) {
  tl.set(fromSel, { opacity: 0 }, at);
  tl.set(toSel, { opacity: 1 }, at);
}
