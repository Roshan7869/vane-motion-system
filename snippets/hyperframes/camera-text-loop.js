/**
 * Camera-text loop — HyperFrames / GSAP
 *
 * For the "3D camera text" Short: extruded type under a floating camera, with motion
 * blur faked by ghost copies, structured as a short cycle repeated to fill the slot.
 *
 * The one rule that makes this render correctly: every transform is a PURE FUNCTION OF
 * TIME. HyperFrames seeks; it does not play. Anything that accumulates state will
 * diverge between a preview and a render.
 */

/** Two incommensurate frequencies — never a single axis, or the move reads mechanical. */
export function cameraPath(t, { amp = 260, rot = 34, depth = 120 } = {}) {
  return {
    x: amp * Math.sin(t * 2.1),
    z: -depth * Math.cos(t * 2.1),
    rotY: rot * Math.sin(t * 1.7),
  };
}

/**
 * Ghost-copy motion blur.
 *
 * CSS has no velocity-based blur, so we approximate: ghost g shows the head from
 * (g * lag) seconds ago. Because cameraPath is pure, this is exact at any seek target.
 *
 * @param {object} tl      gsap timeline (paused)
 * @param {string} sel     selector for the ghost elements, each with data-ghost="0..n-1"
 * @param {object} o
 */
export function motionBlur(tl, sel, { duration = 5.5, ghosts = 5, lag = 0.012,
                                      startOpacity = 0.30, fade = 0.055,
                                      blurStep = 1.6 } = {}) {
  for (let g = 0; g < ghosts; g++) {
    const el = document.querySelector(`${sel}[data-ghost="${g}"]`);
    if (!el) continue;

    el.style.opacity = String(Math.max(0, startOpacity - g * fade));
    if (g > 0) el.style.filter = `blur(${g * blurStep}px)`;

    // onUpdate reads the timeline clock, so the ghost is a function of t, not of wall time
    const obj = { t: 0 };
    tl.to(obj, {
      t: duration,
      duration,
      ease: "none",
      onUpdate() {
        const p = cameraPath(obj.t - g * lag);
        el.style.transform =
          `translate3d(${p.x}px,0,${p.z}px) rotateY(${p.rotY}deg)`;
      },
    }, 0);
  }
}

/**
 * Build a loop from a beat pattern.
 *
 * Measured from the reference: intervals [1.8, 1.0, 0.5, 0.5, 1.7] sum to 5.5 s and the
 * whole 5.5 s cycle repeats to fill the duration. Author ONE cycle; never author N shots.
 *
 * @param {number[]} intervals  seconds between cuts, one full cycle
 * @param {number}   total      total duration to fill
 * @returns {{start:number,index:number,cycle:number}[]}
 */
export function buildLoopCycle(intervals, total) {
  const cycle = intervals.reduce((a, b) => a + b, 0);
  const out = [];
  const cycles = Math.ceil(total / cycle);
  for (let c = 0; c < cycles; c++) {
    let t = 0;
    for (let i = 0; i < intervals.length; i++) {
      const at = c * cycle + t;
      if (at >= total) break;
      out.push({ start: at, index: i, cycle: c });
      t += intervals[i];
    }
  }
  return out;
}

/** Apply a loop cycle as opacity sets on shot elements. */
export function applyLoop(tl, shots, intervals, total) {
  const seq = buildLoopCycle(intervals, total);
  for (let i = 0; i < seq.length; i++) {
    const s = seq[i];
    tl.set(shots[s.index], { opacity: 1 }, s.start);
    const next = seq[i + 1];
    if (next && next.start > s.start) {
      tl.set(shots[s.index], { opacity: 0 }, next.start);
    }
  }
  return seq;
}

/**
 * Extruded type as stacked translateZ layers (real geometry, unlike text-shadow).
 *
 * WARNING for Devanagari: stacked DOM copies of a conjunct overlap inside the cluster and
 * render as a solid block. For complex scripts, rasterise the glyph to a texture and
 * extrude that instead. Never extrude below ~80px.
 */
export function extrude3d(el, { layers = 14, step = 2, front = '#141414', side = '#2b2b2b' } = {}) {
  const parent = el.parentElement;
  parent.style.transformStyle = 'preserve-3d';
  el.style.transformStyle = 'preserve-3d';
  el.style.color = front;

  for (let i = 1; i <= layers; i++) {
    const c = el.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    c.style.position = 'absolute';
    c.style.inset = '0';
    c.style.color = side;
    c.style.transform = `translateZ(${-i * step}px)`;
    parent.appendChild(c);
  }
}
