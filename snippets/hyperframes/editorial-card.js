/**
 * Editorial card system — HyperFrames / GSAP
 *
 * "Candy frame, black card": a large rounded near-black card inset on a white canvas,
 * bright pastel shapes peeking from the canvas edges, and inside the card an editorial
 * layout (photo + crop marks + one chart + one pun headline).
 *
 * The discipline that makes it work: EXACTLY TWO type registers, ~10:1 apart.
 * Add a third and the card becomes a slide deck.
 */

/** Register 1 — credibility. Caps + wide tracking. No Devanagari equivalent (no case). */
export const MICRO = `
  font:700 14px/1 ui-monospace, SFMono-Regular, monospace;
  letter-spacing:.12em; text-transform:uppercase; color:#8E8E93;
`;

/** Register 2 — impact. Heavy, tight, white. */
export const DISPLAY = `
  font:900 132px/0.92 system-ui, sans-serif;
  letter-spacing:-.02em; color:#fff;
`;

export const PASTELS = {
  cyan: "#25D5F2", cyanBright: "#63F5FF",
  mint: "#50E3B3", mintBright: "#73FFB0",
  pink: "#F5A8E8", lavender: "#C18AFF",
  paleBlue: "#A7F3F8",
  card: "#060604", canvas: "#eef7f6", label: "#8E8E93",
};

/**
 * The scaffold. Pastel accents go on the CANVAS, behind the card — they must only
 * ever peek at the edges. Putting them inside the card destroys the effect.
 */
export function buildEditorialStage({ id = "stage", w = 1920, h = 1080, inset = 0.02, radius = 34 } = {}) {
  const stage = document.getElementById(id) || document.body;

  const canvas = document.createElement("div");
  canvas.className = "canvas";
  canvas.style.cssText = `position:absolute;inset:0;background:${PASTELS.canvas};overflow:hidden;`;

  // edge accents — offset outward so only an arc shows
  const accents = [
    { c: PASTELS.mint,  x: -0.06, y: 0.72, s: 0.55 },
    { c: PASTELS.cyan,  x: 0.86,  y: -0.10, s: 0.45 },
    { c: PASTELS.pink,  x: 0.55,  y: -0.14, s: 0.30 },
    { c: PASTELS.paleBlue, x: 0.92, y: 0.80, s: 0.35 },
  ];
  for (const a of accents) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:absolute; border-radius:50%;
      left:${a.x * 100}%; top:${a.y * 100}%;
      width:${a.s * 100}%; aspect-ratio:1;
      background:${a.c}; opacity:.95; filter:blur(2px);`;
    canvas.appendChild(el);
  }

  const card = document.createElement("div");
  card.className = "card";
  card.style.cssText = `
    position:absolute; inset:${inset * 100}%;
    background:${PASTELS.card}; border-radius:${radius}px; overflow:hidden;`;

  canvas.appendChild(card);
  stage.appendChild(canvas);
  return { canvas, card };
}

/**
 * Editorial data card: photo with L-shaped crop marks, one bar + axis, one pun headline.
 *
 * @param {HTMLElement} parent
 * @param {object} o
 * @param {string} o.photo       image src
 * @param {{value:string,label:string}} o.chart
 * @param {{kicker:string,headline:string,caption:string,fig:string}} o.copy
 */
export function editorialCard(parent, { photo, chart, copy }) {
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:absolute;inset:0;padding:4% 5%;box-sizing:border-box;";

  // --- left: photo + crop marks + caption row
  const left = document.createElement("div");
  left.style.cssText = "position:absolute;left:5%;top:12%;width:50%;height:66%;";
  left.innerHTML = `
    <img src="${photo}" style="width:100%;height:100%;object-fit:cover;display:block;">
    ${["top:0;left:0;border-right:0;border-bottom:0","top:0;right:0;border-left:0;border-bottom:0",
       "bottom:0;left:0;border-right:0;border-top:0","bottom:0;right:0;border-left:0;border-top:0"]
      .map(s => `<span style="position:absolute;${s};width:22px;height:22px;border:2px solid #fff;"></span>`)
      .join("")}`;
  wrap.appendChild(left);

  // caption row: micro-label left, FIG number right — this is the credibility register
  const cap = document.createElement("div");
  cap.style.cssText = `position:absolute;left:5%;right:5%;top:80%;display:flex;
                       justify-content:space-between;`;
  cap.innerHTML = `<span style="${MICRO}">${copy.caption}</span>
                   <span style="${MICRO}">${copy.fig}</span>`;
  wrap.appendChild(cap);

  // --- right: one bar, one axis, value above, category below
  const right = document.createElement("div");
  right.style.cssText = "position:absolute;right:6%;top:26%;width:30%;height:46%;";
  right.innerHTML = `
    <div style="${MICRO};position:absolute;top:-16%;right:0;">${copy.kicker}</div>
    <div style="${DISPLAY};font-size:56px;position:absolute;top:-6%;left:50%;
                transform:translateX(-50%);">${chart.value}</div>
    <div style="position:absolute;left:50%;top:14%;transform:translateX(-50%);
                width:34%;height:72%;background:#5C5C5C;"></div>
    <div style="position:absolute;left:0;right:0;top:86%;height:1px;background:#808080;"></div>
    <div style="${MICRO};position:absolute;top:92%;left:50%;
                transform:translateX(-50%);">${chart.label}</div>`;
  wrap.appendChild(right);

  // --- bottom: the pun headline. It must reframe the image, or it is a dad joke.
  const head = document.createElement("div");
  head.style.cssText = `${DISPLAY};position:absolute;left:5%;right:5%;bottom:6%;
                        text-align:center;font-size:96px;`;
  head.textContent = copy.headline;
  wrap.appendChild(head);

  parent.appendChild(wrap);
  return wrap;
}

/**
 * Whip blur out of a beat.
 *
 * CSS has no velocity blur, so this translates hard and lets the cut hide the rest.
 * Duration must stay under ~0.35 s or it reads as a slide, not a whip.
 */
export function whipBlur(tl, sel, { at, distance = -160, duration = 0.28 } = {}) {
  tl.to(sel, { y: distance, duration, ease: "power3.in" }, at);
  tl.set(sel, { opacity: 0, y: 0 }, at + duration);
  return tl;
}

/**
 * Accessibility / timing guard: this system HOLDS.
 * If you find yourself adding motion to a beat that measured < 8 median frame delta,
 * you are fighting the reference.
 */
export const HOLD_ADVICE =
  "median frame delta in the reference was 4.71 with p95 at 108.35: stillness is the " +
  "default and movement is an event. Do not fill holds with drift.";
