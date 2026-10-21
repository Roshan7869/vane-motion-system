---
id: Q6H_fYhn3x0
title: "🔥3D Camera TEXT ANIMATION After Effects"
source_url: https://www.youtube.com/watch?v=Q6H_fYhn3x0
form: short
depth: deep
kind: shot-breakdown
duration_s: 16.5
resolution: 1080x1080
fps: 30/1
primitives:
  - loop-structure
  - extruded-type
  - camera-move
  - motion-blur
  - depth-of-field
emotion:
  - urgent
  - hypnotic
tags:
  - camera
  - type
  - loop
  - 3d
  - motion-blur
easing:
  - linear
  - power4.out
has_captions: false
caption_script: none
measured:
  cuts: 14
  median_cut_s: 1.0
  mean_frame_delta: 73.09
  median_frame_delta: 83.685
  p95_frame_delta: 127.424
  static_ratio: 0.0
---

# 🔥3D Camera TEXT ANIMATION After Effects

- **id** `Q6H_fYhn3x0`
- **url** https://www.youtube.com/watch?v=Q6H_fYhn3x0
- **duration** 0m 16.5s
- **source** 1080x1080 av1 @ 30 fps · 827 kbps — **square, not vertical**
- **audio** opus · -13.97 LUFS · TP -4.07 dBTP · LRA **1.1**
- **extracted** 2026-10-21

## What this video teaches

This is the highest-motion item in the 45-Short corpus: mean frame delta **73.09** on a
0–255 scale, median **83.69**, p95 **127.42**. At that level almost every pixel changes every
frame. It also has the most cuts (14) at a median interval of **1.0 s**.

The obvious read is "14 fast cuts". That read is wrong, and the way it is wrong is the whole
lesson: **this is a 5.5-second sequence played three times.**

Two independent measurements say so.

**1. The keyframes repeat.** Comparing sampled frames by mean absolute difference on a 64×64
grey thumbnail:

| pair | gap | mean difference |
|---|---|---|
| k00 ↔ k05 | 5.5 s | **0.6** |
| k00 ↔ k10 | 11.0 s | **0.4** |
| k01 ↔ k06 | 5.5 s | **0.9** |
| k02 ↔ k07 | 5.5 s | **0.9** |

Consecutive keyframes differ by **58.45** on the same scale. So the repeat is **72× closer**
than a step forward. That is not similarity, it is identity.

**2. The cut intervals repeat.** The 14 cut times yield only 13 intervals, and they form a
cycle:

```
1.8 · 1.0 · 0.5 · 0.5 · 1.7   |   1.8 · 1.0 · 0.5 · 0.5 · 1.7   |   1.8 · 1.0 · 0.5
└──────────── 5.5 s ────────┘   └──────────── 5.5 s ────────┘   └─── 4.0 s (cut short)
```

Sum of one cycle = **5.5 s**. Three cycles = 16.5 s, the exact duration.

So the structure is a **5-shot rhythm — long, medium, short, short, long — looped three
times.** The 14 "cuts" are 5 distinct beats observed 3× each, plus the truncated final cycle.

That is the reusable primitive: not "cut fast", but **author a 5-second rhythm and loop it to
fill the slot.** Retention comes from the viewer recognising the loop and staying to confirm it.

## Frame evidence

| # | t | what it shows |
|---|---|---|
| 0 | 2.07s | heavy grotesque **MY**, charcoal, extruded and beveled; near-frontal but clearly solid; soft radial white-grey background with strong vignette; visible **directional motion blur** on the lower-left edges; word sits off-centre in the lower-left with large negative space |
| 5 | 7.57s | pixel-identical to k00 (d=0.6) — same word, same placement, same blur |

Both frames are grainy-soft: nothing in the image is sharp. Palette is almost entirely
neutral — `#484c4f` 30%, `#b3b6b7` 26%, `#eaeaea` 21%, `#6c747b` 20%, `#0d0d0d` 4%. The type
is the only dark mass; the background is the light mass. There is no second colour anywhere,
which is why the motion reads so clearly: contrast is structural, not chromatic.

## Transfer to HyperFrames

### What CSS 3D can and cannot do here

Be precise about this, because it decides the architecture:

| Element of the look | CSS 3D | Verdict |
|---|---|---|
| Extruded geometry | stacked `translateZ` layers in a `preserve-3d` parent | works |
| Camera move / perspective | `perspective` + parent rotation | works |
| Real motion blur | — | **cannot** — CSS has no velocity-based blur |
| Depth of field | `filter: blur()` per layer only | fake, but convincing |
| Bevel + specular | gradients on the side faces | approximate |

CSS gives you the geometry and the camera. It does not give you motion blur. Two honest
options:

**Option A — fake the blur with ghost copies.** Cheap on CPU, and at 30 fps with heavy motion
the eye reads it as blur.

```html
<div class="stage">
  <div class="word" data-ghost="0">MY</div>
  <div class="word ghost" style="--g:1">MY</div>
  <div class="word ghost" style="--g:2">MY</div>
  <div class="word ghost" style="--g:3">MY</div>
  <div class="word ghost" style="--g:4">MY</div>
</div>
```

```css
.stage{
  position:relative; width:1080px; height:1080px;
  perspective:1400px; perspective-origin:50% 50%;
  background:radial-gradient(ellipse at 50% 48%, #f2f2f2 0%, #d8d8d8 46%, #9a9a9a 100%);
  overflow:hidden;
}
.word{
  position:absolute; left:14%; top:52%;
  font:900 210px/1 system-ui,sans-serif; letter-spacing:-8px;
  color:#141414; will-change:transform;
}
.ghost{
  opacity:calc(.30 - var(--g) * .055);
  filter:blur(calc(var(--g) * 1.6px));
  /* each ghost lags the head by a fraction of the velocity — set in JS */
}
```

```js
// motion blur by lag: ghost g is the head from N ms ago.
// At capture time this is exact, because it depends only on t.
const GHOSTS = 5, LAG = 0.012;              // 12 ms per ghost
const head = (t) => ({ x: 260 * Math.sin(t * 2.1), rotY: 34 * Math.sin(t * 1.7), z: -120 * Math.cos(t * 2.1) });

gsap.ticker.add(() => {});                   // not used in render — see below
// Instead, drive from the timeline so HyperFrames can seek:
for (let g = 0; g < GHOSTS; g++) {
  tl.to(`.word[data-ghost="${g}"]`, {
    duration: 5.5, ease: 'none',
    onUpdate() {
      const t = this.time();
      const p = head(t - g * LAG);
      this.targets()[0].style.transform =
        `translate3d(${p.x}px,0,${p.z}px) rotateY(${p.rotY}deg)`;
    }
  }, 0);
}
```

The critical detail: `head()` is a **pure function of time**. The ghost at time `t` reads the
head at `t - g·LAG`. That makes the blur a function of the timestamp, so a seek to any frame
reproduces it exactly. A velocity-sampling approach would not.

**Option B — real blur in three.js.** Justified only if you need true camera DOF. On this
2-core box, measure before committing: a full-frame postprocessing pass at 1080×1080 will
dominate render time.

### The loop

```js
const CYCLE = 5.5;                  // measured
const CUTS  = [0, 1.8, 2.8, 3.3, 3.8];   // cumulative, from the measured intervals

// Three cycles, last one truncated at the video's end
for (let c = 0; c < 3; c++) {
  CUTS.forEach((t, i) => {
    const at = c * CYCLE + t;
    if (at < 16.5) tl.set(`#shot${i}`, { opacity: 1 }, at);
    if (i < CUTS.length - 1) tl.set(`#shot${i}`, { opacity: 0 }, c * CYCLE + CUTS[i+1]);
  });
}
```

Build **one** cycle and repeat it. Do not author 14 shots.

### The vignette and the off-centre placement

```css
.stage::after{
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(0,0,0,.55) 100%);
}
```

The word sits at `left:14%; top:52%` — deliberately not centred. Every version of this look
that fails centres the type and loses the tension. Measured from k00: the word occupies the
lower-left third and roughly a quarter of the frame width, leaving the rest empty.

## Transfer to Remotion

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const CYCLE = 5.5;
const GHOSTS = 5;
const LAG = 0.012;

// pure function of time — identical to the GSAP version, which is the point
const head = (t: number) => ({
  x: 260 * Math.sin(t * 2.1),
  rotY: 34 * Math.sin(t * 1.7),
  z: -120 * Math.cos(t * 2.1),
});

export const CameraText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) % CYCLE;   // the loop, expressed as a modulo

  return (
    <AbsoluteFill style={{
      perspective: 1400,
      background: 'radial-gradient(ellipse at 50% 48%, #f2f2f2 0%, #d8d8d8 46%, #9a9a9a 100%)',
      overflow: 'hidden',
    }}>
      {Array.from({ length: GHOSTS }).map((_, g) => {
        const p = head(t - g * LAG);
        return (
          <div key={g} style={{
            position: 'absolute', left: '14%', top: '52%',
            font: '900 210px/1 system-ui, sans-serif', letterSpacing: -8,
            color: '#141414',
            opacity: 0.30 - g * 0.055,
            filter: `blur(${g * 1.6}px)`,
            transform: `translate3d(${p.x}px,0,${p.z}px) rotateY(${p.rotY}deg)`,
          }}>MY</div>
        );
      })}
    </AbsoluteFill>
  );
};
```

The `% CYCLE` is the entire loop mechanism. Remotion needs no repeated keyframes — the modulo
makes frame 165 identical to frame 0 by construction.

## Emotion → motion mapping

| Feeling | Parameter | Value |
|---|---|---|
| Hypnotic | loop period | **5.5 s**, 3 repeats — measured |
| Urgent | cut rhythm | 1.8 / 1.0 / 0.5 / 0.5 / 1.7 — long-medium-short-short-long |
| Fast but legible | blur strength | 5 ghosts, 12 ms lag, 1.6 px blur per step, opacity 0.30 → 0.08 |
| Floating, not staged | camera path | sinusoidal on two axes at different frequencies (2.1 / 1.7) — never a single axis |
| Premium-neutral | palette | one dark mass, one light mass, zero chromatic contrast |
| Cinematic | vignette | transparent to 30%, then `rgba(0,0,0,.55)` |
| Loud master | audio | −13.97 LUFS, LRA **1.1** — almost no dynamic range at all |

The two-frequency sinusoid matters. A single-frequency camera move reads as a mechanical
oscillation; two incommensurate frequencies (2.1 and 1.7 rad/s) never quite repeat, so the
motion feels organic even though the *shot* repeats exactly.

## Timing rules extracted

- Loop period **5.5 s**, exactly 3 cycles in 16.5 s — `measured` (frame identity + cut intervals)
- Cut beat pattern **1.8 / 1.0 / 0.5 / 0.5 / 1.7** — `measured`
- Median cut interval **1.0 s** — `measured`
- Ghost lag 12 ms, 5 ghosts, 1.6 px blur/step — `judged` (calibrated to the observed smear)
- Camera frequencies 2.1 / 1.7 rad/s — `judged`
- Type at 210 px on a 1080 square, `left:14% top:52%` — `judged` from k00
- Audio LRA 1.1 — `measured`

## Caption implications

- **There are no captions in this piece** — confirmed by reading the frames. The type *is* the
  content. Do not add subtitles to a piece like this; you would be labelling a graphic.
- If this treatment is used as a title card inside a longer edit, the safe window is the
  **1.7 s beat** (the long beat) — the 0.5 s beats are far too short to read anything.
- **Devanagari caveat:** this whole technique depends on extruded, beveled type with per-face
  lighting. Devanagari conjuncts have interior counters and stacked marks that a naive
  `translateZ` extrusion will render as a solid block — the layers overlap in the middle of a
  cluster. If you must extrude Devanagari, extrude a **rasterised** glyph to a texture and
  displace it in 3D, rather than stacking DOM copies. Never extrude below ~80 px.
- The off-centre placement (`left:14%`) is right for a square. On 9:16 it needs a different
  anchor — the measured safe zone there is roughly the middle 70% vertically.

## Caveats

- **The "14 cuts" number is misleading and will mislead an agent that reads index.json alone.**
  It is 5 beats × 3 loops. This is the clearest case in the corpus for why `measured.cuts` must
  be read alongside the frame-identity test, not on its own.
- Real motion blur is not available in CSS. The ghost-copy approximation is good at 30 fps with
  large motion; on a slow, small movement it reads as a smear rather than blur.
- `filter: blur()` on five stacked elements is not free. Five blurred 210 px glyphs at
  1080×1080 is affordable on this CPU; twenty would not be.
- The square format (1080×1080) is a deliberate choice for feed placement, not an accident.
  Do not "fix" it to 9:16 — the composition depends on the extra width.
- Audio at LRA 1.1 means there is no quiet passage anywhere. If you reuse this track under a
  piece with a soft moment, the master will sound broken.

## Reusable snippet

`snippets/hyperframes/camera-text-loop.js` — the two-frequency camera path, ghost-copy motion
blur driven from the timeline, and `buildLoopCycle()` for the 1.8/1.0/0.5/0.5/1.7 rhythm.
