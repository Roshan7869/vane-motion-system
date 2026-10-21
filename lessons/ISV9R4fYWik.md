---
id: ISV9R4fYWik
title: "How to Create VIRAL REELS"
source_url: https://www.youtube.com/watch?v=ISV9R4fYWik
form: short
depth: deep
duration_s: 10.0
resolution: 608x1080
fps: 16/1
primitives:
  - collage-layering
  - paper-grain
  - extruded-type
  - per-shot-palette-reset
  - vignette
emotion:
  - loud
  - urgent
  - meme-literate
tags:
  - reel
  - collage
  - typography
  - texture
  - transition
easing:
  - power4.out
  - none
has_captions: true
caption_script: latin
measured:
  cuts: 2
  median_cut_s: 7.44
  mean_frame_delta: 43.971
  static_ratio: 0.0
---

# How to Create VIRAL REELS

- **id** `ISV9R4fYWik`
- **url** https://www.youtube.com/watch?v=ISV9R4fYWik
- **duration** 0m 10s
- **source** 608x1080 av1 @ 16 fps · 950 kbps
- **audio** opus · -13.91 LUFS · TP -1.14 dBTP · LRA 1.9
- **extracted** 2026-10-21

## What this video teaches

The "viral reel" look is **collage, not motion design**. Each shot is a flat-lay of cut-out
photographs, paper-textured shapes and oversized type, finished with print grain and a heavy
vignette. The energy comes from **switching between completely different colour worlds**, not
from easing curves.

Measured: 10.0 s, 16 fps, **static ratio 0.0** — not one sampled frame was still. Mean frame
delta **43.97** (median 42.37, p95 83.12, max 105.97), the highest in this corpus so far. But
only **2 cuts**. So motion is continuous *within* shots and the cuts are few and brutal. That
combination is the whole formula.

Structure from the measured cut times `1.1 · 8.6`:

| shot | span | length | job |
|---|---|---|---|
| A | 0 → 1.1 s | 1.1 s | interrupt — too short to read, that is the point |
| B | 1.1 → 8.6 s | 7.5 s | the body, one collage, continuous churn |
| C | 8.6 → 10.0 s | 1.4 s | beat-out / loop point |

That 1.1 s / 7.5 s / 1.4 s shape is reusable independently of the aesthetic: a short shock
open, a long hold, a short exit that loops.

The reusable insight is the layer stack, present in every frame with different contents:

```
background (distressed texture — never a flat colour)
  → cut-out photographic subjects, each with a HARD drop shadow (zero blur)
    → paper-textured shapes / rings / frames
      → oversized type on a solid plate
        → grain overlay (multiply / screen)
          → vignette
```

## Frame evidence

| # | t | what it shows |
|---|---|---|
| 0 | 1.52s | cut-out figure over red wavy concentric rings; white plate holding black **300** in a heavy grotesque; cream ground; print grain |
| 1 | 3.76s | next collage, palette reset |
| 2 | 4.59s | — |
| 3 | 5.42s | — |
| 4 | 6.26s | flat-lay: distressed blue/white vertical stripes, four metallic pens framing centre, gold coins, a postage stamp, three-line 3D-extruded **"THEN THE WHOLE COUNTRY"** in white over grey shadow, heavy vignette |
| 5 | 7.09s | — |
| 6 | 8.96s | — |

Frames 0 and 4 share **zero colours**. Measured palette across the piece: `#1c1e1d` 26%,
`#394a5b` 24%, `#958e89` 21%, `#d7d7d3` 15%, `#721c19` 14% — i.e. the whole video oscillates
between a red/cream world and a blue/white one. The perceived energy is that jump.

## Transfer to HyperFrames

### The layer stack

```html
<div class="shot" style="--paper:#f4efe4">
  <div class="bg"></div>            <!-- distressed texture, not a flat fill -->
  <img class="cutout" src="subject.png">
  <svg class="rings" viewBox="0 0 1080 1920">…</svg>
  <div class="plate"><span>300</span></div>
  <div class="grain"></div>
  <div class="vignette"></div>
</div>
```

```css
.shot{ position:relative; width:1080px; height:1920px; overflow:hidden; background:var(--paper); }

.cutout{
  position:absolute; left:50%; bottom:0; transform:translateX(-50%);
  height:62%; object-fit:contain;
  filter:drop-shadow(18px 18px 0 rgba(0,0,0,.35));   /* HARD shadow, zero blur */
}

.plate{
  position:absolute; left:50%; top:56%; transform:translateX(-50%);
  background:#fff; padding:18px 54px;
}
.plate span{
  font:900 190px/0.9 system-ui,sans-serif; color:#0a0a0a; letter-spacing:-6px;
}

/* paper grain — inline SVG turbulence, no image asset */
.grain{
  position:absolute; inset:0; pointer-events:none;
  mix-blend-mode:multiply; opacity:.28;
  background-image:url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/>\
<feColorMatrix type='saturate' values='0'/></filter>\
<rect width='220' height='220' filter='url(%23n)'/></svg>");
}

.vignette{
  position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse at 50% 46%, transparent 38%, rgba(0,0,0,.62) 100%);
}
```

### 3D extrusion without a 3D engine

A stacked `text-shadow` reads as extrusion at phone size and costs nothing at render time.

```css
.extruded{
  color:#fff;
  text-shadow:
    0 2px 0 #b9b9b9, 0 4px 0 #b0b0b0, 0 6px 0 #a6a6a6,
    0 8px 0 #9c9c9c, 0 10px 0 #929292, 0 14px 18px rgba(0,0,0,.55);
}
```

Six to ten stops is the useful range; past ~12 the glyph becomes a blob at small sizes.

### Wavy concentric rings

`feTurbulence` + `feDisplacementMap` on a group of ellipses gives the melted contour, and the
displacement must be driven from the timeline, never by CSS keyframes.

```html
<svg viewBox="0 0 1080 1920">
  <filter id="warp">
    <feTurbulence id="turb" type="fractalNoise"
                  baseFrequency="0.012 0.020" numOctaves="2" seed="7"/>
    <feDisplacementMap in="SourceGraphic" scale="46"/>
  </filter>
  <g filter="url(#warp)" fill="none" stroke="#c8102e" stroke-width="26">
    <ellipse cx="540" cy="860" rx="360" ry="430"/>
    <ellipse cx="540" cy="860" rx="450" ry="540"/>
    <ellipse cx="540" cy="860" rx="540" ry="650"/>
  </g>
</svg>
```

```js
tl.fromTo('#turb',
  { attr: { baseFrequency: '0.012 0.020' } },
  { attr: { baseFrequency: '0.020 0.010' }, duration: 2.4, ease: 'none' }, 0);
```

### The cut itself

No transition object. Two `set`s and a palette swap.

```js
tl.set('#shotA', { opacity: 0 }, 1.1);
tl.set('#shotB', { opacity: 1 }, 1.1);
```

## Transfer to Remotion

```tsx
import { AbsoluteFill, Img, useCurrentFrame, interpolate, staticFile } from 'remotion';

export const CollageShot: React.FC<{ subject: string; paper: string }> = ({ subject, paper }) => {
  const frame = useCurrentFrame();

  // continuous internal churn: nothing rests, which is what static_ratio 0.0 means
  const push = interpolate(frame, [0, 225], [1.0, 1.09], { extrapolateRight: 'clamp' });
  const freq = interpolate(frame, [0, 225], [0.012, 0.020], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: paper, overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        <Img src={staticFile(subject)}
             style={{ position: 'absolute', left: '50%', bottom: 0, height: '62%',
                      transform: 'translateX(-50%)',
                      filter: 'drop-shadow(18px 18px 0 rgba(0,0,0,.35))' }} />
        <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 1080 1920">
          <filter id="warp">
            <feTurbulence type="fractalNoise"
                          baseFrequency={`${freq} 0.020`} numOctaves={2} seed={7} />
            <feDisplacementMap in="SourceGraphic" scale={46} />
          </filter>
          <g filter="url(#warp)" fill="none" stroke="#c8102e" strokeWidth={26}>
            <ellipse cx={540} cy={860} rx={360} ry={430} />
            <ellipse cx={540} cy={860} rx={450} ry={540} />
          </g>
        </svg>
      </AbsoluteFill>
      <Grain /><Vignette />
    </AbsoluteFill>
  );
};
```

Two Remotion specifics:

- **`feTurbulence` must be frame-driven.** A CSS animation on `baseFrequency` renders the same
  filter value for every captured frame.
- **`staticFile()` for assets.** Absolute paths break at bundle time; put subject PNGs in
  `public/`.

## Emotion → motion mapping

| Feeling | Parameter | Value |
|---|---|---|
| Loud, scroll-stopping | cut count | 2 cuts in 10 s — few and brutal, not many and gentle |
| Constant churn | internal motion | scale 1.00 → 1.09 across the shot, `ease:'none'` |
| Crude on purpose | easing family | `power4.out` for slams, `none` for drift. **No `sine`, no `power2.out`** — smoothness reads corporate and kills the look |
| Meme-literate | type weight | 900, letter-spacing −6 px, solid plate behind |
| Printed, analogue | grain opacity | 0.24–0.32 with `mix-blend-mode: multiply`; below 0.2 invisible, above 0.4 muddy |
| Composed, not empty | vignette | clear to 38%, then to `rgba(0,0,0,.62)` at the edge |

**Contrast with our premium work.** Brand films use `power3.out`, 0.55 s reveals, and keep
`static_ratio` low by *camera* motion. This look keeps it at 0.0 by *churn* — grain, warp,
drift. Same metric, opposite mechanism. Do not mix them in one edit: a `power3.out` caption
over a grainy collage reads as a mistake.

## Timing rules extracted

- Shot lengths **1.1 / 7.5 / 1.4 s** — `measured` (cut times 1.1 and 8.6)
- No transition between shots; the palette change is the transition — `measured` (delta 43.97
  with only 2 cuts means the jumps happen inside shots, not between them)
- Internal drift 1.00 → 1.09 across a shot — `judged`
- Grain opacity 0.24–0.32 — `judged`
- Extrusion 6–10 `text-shadow` stops — `judged`
- Audio at **−13.91 LUFS**, LRA **1.9** — `measured`. Extremely narrow dynamic range: this is
  mastered loud and flat, with no quiet moment to breathe in.

## Caption implications

- Type here is the **primary** element, not a subtitle: 190 px on a plate, one line, centred.
  Treat it as a title treatment in our system, not as caption chrome.
- If a caption must coexist with collage, give it its own opaque plate at the bottom. Never
  place text directly over grain — grain at 0.28 opacity destroys edge contrast and the linter
  will (correctly) flag the result.
- **Devanagari caveat:** stacked `text-shadow` extrusion works, but every shadow layer is an
  offset copy of the *shaped cluster*. At 6+ stops the layers of a conjunct fuse into a blob
  and matras smear into the shadow. Cap extrusion at **3–4 stops** for Devanagari, never below
  ~60 px. The `300`-on-a-plate treatment is safe; the three-line extruded headline is Latin-only.

## Caveats

- The aesthetic dates fast. It is a 2025–26 short-form idiom; on a brand film it reads as
  borrowed.
- `feTurbulence` + `feDisplacementMap` is CPU-expensive. On a 2-core box, a full-frame
  displacement at 1080×1920 can dominate render time — keep the filtered region to the rings,
  not the whole frame, and measure before committing.
- `static_ratio 0.0` is not automatically good. It means *nothing rests*: right for this
  format, wrong for anything the viewer must read for more than a second.
- The hard shadow is `0 18px 0` — zero blur. A blurred shadow instantly reads as "designed"
  rather than "cut out".
- 16 fps source. Do not copy 16 fps; it is a re-encode artifact of the upload, not a style
  choice.

## Reusable snippet

`snippets/hyperframes/collage-stack.js` — layer-stack builder, grain and vignette overlays,
and `hardCut(tl, fromSel, toSel, at)`.
