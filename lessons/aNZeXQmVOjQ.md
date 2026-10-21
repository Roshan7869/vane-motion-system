---
id: aNZeXQmVOjQ
title: "How to Use HyperFrames in HeyGen's AI Video Agent"
source_url: https://www.youtube.com/watch?v=aNZeXQmVOjQ
form: short
depth: deep
duration_s: 66.5
resolution: 1920x1080
aspect: "16:9"
fps: 30000/1001
primitives:
  - candy-frame-black-card
  - editorial-data-card
  - ui-demo-card
  - whip-blur-transition
  - glitch-wordmark
emotion:
  - confident
  - editorial
  - product-led
tags:
  - hyperframes
  - heygen
  - editorial
  - data-viz
  - ui-demo
  - transition
easing:
  - power3.out
  - linear
has_captions: false
caption_script: none
measured:
  cuts: 10
  median_cut_s: 8.18
  mean_frame_delta: 26.172
  static_ratio: 0.091
---

# How to Use HyperFrames in HeyGen's AI Video Agent

- **id** `aNZeXQmVOjQ`
- **url** https://www.youtube.com/watch?v=aNZeXQmVOjQ
- **duration** 66.5 s · **29.97 fps** · **1920×1080 (16:9 landscape)** · av1 720 kbps
- **audio** opus · **−19.61 LUFS** · TP −5.84 dBTP · **LRA 15.8**
- **extracted** 2026-10-21 · 33 keyframes · **7 read** (0.1 / 10.6 / 15.9 / 34.3 / 47.9 / 55.8 / 66.3)

**Not a Short.** This sits in HeyGen's `/shorts` tab but measures **1920×1080 landscape** at
66.5 s. The shorts tab is not a reliable format filter — a correction to `SHORTS-INVENTORY.md`,
whose counts assume tab membership means vertical.

## 1. Motive

A **product demo that doubles as a style reel**. HeyGen asks their own HyperFrames agent, on
camera, to add a motion graphic — then shows seven finished graphic styles in sequence. The pitch
is "one prompt, many looks", and the proof is the variety of cards.

This makes it the most valuable single reference in our set: it is HeyGen publishing what *their
own* tool produces, at a quality bar they attach their brand to. We run the same engine.

## 2. Global specification

| Field | Value | Source |
|---|---|---|
| Mood | confident, editorial, product-led | judged |
| The system | **candy frame, black card** — a large rounded near-black card inset on a white canvas, bright pastel shapes peeking from the edges | judged, consistent across 5 of 7 frames read |
| Lighting | flat graphic; no directional light, no cast shadows. The only "light" is the pastel canvas behind the card | judged |
| Colour grading | none — vector, not footage, except the talking-head beat | judged |
| Camera | no camera. Every move is 2D transform or a whip-blur transition | measured (no perspective change across frames) |
| Finish | clean vector, bloom on cyan, zero grain except the glitch card | judged |
| Resolution / aspect | 1920×1080 | measured |
| FPS | 29.97 | measured |
| Duration | 66.5 s, 10 cuts | measured |
| Palette | `#060604` 29% (card black) · `#eef7f6` 28% (canvas white) · `#4f4331` 18% (talking-head wood) · `#accfb9` 13% (sage) · `#92826a` 12% (taupe) | measured |
| Audio | −19.61 LUFS, LRA **15.8** — wide dynamic range, so there is a real music bed with build and release, plus speech in beat 2 | measured |
| Type system | exactly two registers — see below | judged |

### The motion signature — the important measurement

```
mean frame delta   26.17
median              4.71     ← most of the time is nearly still
p95               108.35     ← the top 5% moves violently
max               246.40
static_ratio        0.091
```

A low median with an extreme p95 is **hold-and-burst**, not continuous churn. Three signatures now
exist in this repo for the same nominal format:

| piece | median | p95 | static | mechanism |
|---|---|---|---|---|
| viral collage (`ISV9R4fYWik`) | 42.37 | 83.12 | 0.00 | constant churn |
| 3D camera text (`Q6H_fYhn3x0`) | 83.69 | 127.42 | 0.00 | looped, always moving |
| **editorial cards (this)** | **4.71** | **108.35** | **0.091** | **hold still, then snap** |

Reading `mean_frame_delta` alone ranks this piece *above* the collage — and hides that it is mostly
motionless. **Use median and p95 together, never the mean.** That is a correction to how our index
presents motion.

### Typography — two registers, never a third

**Register 1 — editorial micro-label.** All-caps, wide tracking (+8 to +14%), weight 700,
`#8E8E93`, 12–16 px at 1080p. Carries `FIG. 01`, `IPO · JUNE`, `UBS PRICE TARGET`,
`CREW DRAGON · ISS`, `T-02:00:00:00 · LAUNCH WINDOW`. This register does the **credibility** work.

**Register 2 — display.** Weight 800–900, tight tracking (−2%), white, 90–160 px. Carries
`WEEK 1? IT ROCKETS`, `STARSHIP / FLIES THURSDAY`, `$210`, `$135`. This register does the
**impact** work.

Hierarchy ratio **~10:1**. That gap *is* the editorial look — add a third mid-size weight and the
card becomes a slide deck.

## 3. Shot-by-shot breakdown

Boundaries are the 10 measured cut times:
`1.6 · 10.6 · 18.8 · 33.9 · 34.9 · 37.5 · 39.0 · 47.5 · 48.6 · 63.3`

### Beat 1 — 0.00 – 1.60 s (1.6 s · 2.4%) · `measured`

**Composition** — full-bleed 16:9, black margin to the frame edge, rounded card inside holding
translucent folded 3D planes. Focal `0.50, 0.62`.

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | folded planes | 3D | translucent smoked-glass sheets, cyan rim light on every edge, heavy bloom | fills card | 90% |
| 2 | wordmark `HyperFrame` | type | white, heavy, wide grotesque, **destroyed by glitch** — vertical slice displacement, horizontal smear, ghosting, scanline banding | 0.50, 0.62 | 30% w |
| 3 | card | shape | rounded rect r≈3% of width, `#060604` | inset 2% | 96% |

**Palette** — `#000000` → `#042A33` → `#0A5966` → `#0E8898` planes → `#14C8DA` rim → `#71F2FF`
glow → `#F2F4F4` text.

**Motion** — the glitch *is* the motion: slice displacement on a 2–4 frame cadence, not a smooth
tween. The only beat with grain.

**Transition out** — hard cut at 1.60 s.

### Beat 2 — 1.60 – 10.60 s (9.0 s · 13.5%) · `measured`

**Composition** — talking head inside a large rounded card, that card floating on a pastel
gradient canvas. Focal on the face, `0.50, 0.45`.

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | presenter card | shape | rounded rect r≈4%, video inside | 0.50, 0.48 | 78% |
| 2 | cyan banner | shape | gradient band across the card's top, `#A7F3F8` → `#25D5F2` | top 20% | 100% w |
| 3 | pink arcs | shape | two curved accents top-left and top-right, `#F5A8E8` | corners | 12% |
| 4 | mint arc | shape | large sweep from bottom-left, `#50E3B3` | 0.15, 0.90 | 40% |
| 5 | purple/blue wedge | shape | angled triangle bottom-right | 0.85, 0.88 | 22% |
| 6 | mark | icon | rounded triangle pointing right, `#25D5F2`, thick white outline, **two white dots as eyes** | 0.09, 0.10 | 6% |

**Text** — none legible; the presenter name/URL at top centre is destroyed by motion blur in the
sampled frame.

**Motion** — the 10.6 s frame shows **heavy vertical motion blur across the entire card and
presenter**. That is a whip transition mid-execution, not a static composition: everything is
travelling vertically as the cut lands.

**Transition out** — whip/smear, hard cut at 10.60 s. Blur duration **< 0.5 s** — one keyframe
catches it in flight.

### Beat 3 — 10.60 – 18.80 s (8.2 s · 12.3%) · `measured`

**Composition** — same candy frame, now a UI demo. Focal on the prompt bar, `0.50, 0.82`.

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | prompt bar | UI | white pill, full radius, thin cyan border `#12CBC4` | 0.50, 0.82 | 52% w |
| 2 | cursor | icon | cyan rounded triangle with two white dots — the same mark as beat 2 | right edge of bar | 4% |
| 3 | ticker | UI | dark rounded box, 80% opacity, flush to the card's left edge | 0.14, 0.86 | 22% w |

| text (verbatim) | role | treatment |
|---|---|---|
| `Can we add a motion graphic to this scene` | the prompt | sentence case, Inter-like, black on white, ~26 px |
| `STOCK UPDATE` / `31.40` / `DAY 32` | ticker | micro-label caps grey, bold white number, caps grey |

The ticker's left edge is **clipped by the card edge** — `STOCK UPDATE` renders as `CK UPDATE`.
That is deliberate: it reads as a feed already running, not an element placed for the shot.

**Transition out** — hard cut at 18.80 s.

### Beat 4 — 18.80 – 33.90 s (15.1 s · 22.7%) · `measured` boundary, **NOT READ**

The longest beat. Keyframes exist at 26.6 / 29.2 / 31.9 s but were not opened in this pass, so I
will not describe content I did not see. By position — between the prompt beat and the data-card
burst cluster — it is most likely the main data build.

**This is the one gap in this lesson. It is 77% covered, not complete.** Filling it means reading
three frames.

### Beat 5 — 33.90 – 47.50 s (13.6 s) · `measured` boundaries, burst cluster

Cut times `33.9 · 34.9 · 37.5 · 39.0 · 47.5` — intervals of **1.0, 2.6, 1.5, 8.5 s**. A rapid
burst of card variants, then a long hold.

**The IPO card (sampled 34.3 s):**

**Composition** — black rounded card filling the frame with a thin white margin. Left half: a
landscape photo with **white L-shaped crop marks at all four corners**. Right half: one bar chart.
Focal `0.50, 0.90`.

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | photo | image | Starship at the orbital launch mount, vapour, cool grey-blue | 0.06–0.57 x | 51% w |
| 2 | crop marks | graphic | white L-shapes, 2 px, at each photo corner | photo corners | 3% |
| 3 | chart bar | data | solid `#5C5C5C` vertical rect | x≈0.76 | 8% w |
| 4 | axis | data | 1 px grey line at the bar's base | y≈0.66 | 27% w |
| 5 | edge accents | shape | cyan `#63F5FF`, mint `#73FFB0`, lavender `#C18AFF` peeking at the canvas edge | edges | — |

| text (verbatim) | register | position |
|---|---|---|
| `BIGGEST IPO IN HISTORY` | micro-label caps grey | upper right |
| `$135` | display, off-white | above the bar |
| `IPO · JUNE` | micro-label | under the axis |
| `STARSHIP · ORBITAL LAUNCH MOUNT · STARBASE` | micro-label | under the photo, left |
| `FIG. 01` | micro-label | under the photo, right |
| `WEEK 1? IT ROCKETS` | display, heavy caps white | bottom centre |

**The editorial move** — `WEEK 1? IT ROCKETS` puns the rocket against stock performance. A literal
photo plus one financial label plus one pun headline turns a news image into an argument. That is
the whole technique, and it is the hardest part to copy.

**Transition out** — hard cuts at 34.9 / 37.5 / 39.0 s (card variants), then hold to 47.5.

### Beat 6 — 47.50 – 63.30 s (15.8 s) · `measured` boundaries

**The news card (sampled 47.9 s):**

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | astronaut | image | Crew Dragon IVA suit, profile facing right, gloved arm reaching right | 0.30, 0.55 | 45% |
| 2 | caption chip | UI | translucent dark rounded rect | 0.45, 0.86 | 18% |

| text (verbatim) | register |
|---|---|
| `CREW DRAGON · ISS` | micro-label, top right |
| `STARSHIP` / `FLIES THURSDAY` | display, two lines, bottom left |
| `T-02:00:00:00 · LAUNCH WINDOW` | micro-label |
| `this thing hits $210.` | lowercase, in a chip |
| `$210` | display, largest element |
| `UBS PRICE TARGET` | micro-label, right-aligned |

`$210` uses a **slashed zero** — a deliberate finance-data cue, not a default glyph.

**The X UI card (sampled 55.8 s)** — same candy frame, but the card now holds a **screenshot of
X/Twitter desktop in dark mode**: `x.com/compose/post` in the chrome, compose modal open, sidebars,
a soccer scores rail. Three flat vector stickers float on top: a cyan map-pin cursor with a face, a
pale-blue media tile with a play triangle, and a purple circular plus. Bezel `#202124`.

This extends the system into **proof-of-work** — the editorial card becomes a UI screenshot, same
pastel surround, same micro-label discipline inside.

**Transition out** — hard cut at 63.30 s.

### Beat 7 — 63.30 – 66.50 s (3.2 s · 4.8%) · `measured`

**Final frame: pure `#000000`.** No text, no logo, no CTA, no grain.

- **Composition** — none. Total void.
- **Hold** — 3.2 s, absolutely static.
- **Loop verdict: does not loop.** A black fade is a terminal state, not a loop point.

## 4. Visual effects timing

| effect | in | out | target | notes |
|---|---|---|---|---|
| glitch / slice displacement | 0.0 | 1.6 | wordmark | 2–4 frame cadence |
| cyan rim bloom | 0.0 | 1.6 | 3D planes | heavy |
| whip / vertical motion blur | ~10.3 | 10.6 | whole card | <0.5 s, one keyframe catches it |
| prompt typing | ~14 | ~17 | prompt bar | cursor carries the eye |
| card variant cuts | 33.9 | 39.0 | data cards | 1.0 / 2.6 / 1.5 s |
| fade to black | ~66.0 | 66.5 | full frame | terminal |

## 5. Final frame spec

Pure black `#000000`, full frame, 3.2 s, no elements, no drift, **no loop**, no brand lockup, no
CTA. The piece simply stops. As an advert that is a miss; as a demo reel it is acceptable because
the product is the point.

## 6. Rebuild prompt — ready to paste

````
ROLE
  You are a motion graphics director building a 66 s 16:9 product demo reel in the
  "candy frame, black card" editorial system.

TARGET
  Runtime: 66.5 s
  Engine:  HyperFrames (HTML + GSAP)
  Deliver: 1920x1080 H.264, 29.97 fps

HARD CONSTRAINTS
  1. All motion a pure function of time. Register window.__timelines[COMP_ID] = tl.
  2. Transform-only animation (x/y/scale/rotate/opacity/filter).
  3. EXACTLY TWO type registers. Never a third.
     - micro-label: caps, tracking +8..14%, weight 700, #8E8E93, 12-16px
     - display:     weight 800-900, tracking -2%, white, 90-160px
     Ratio between them ~10:1.
  4. This piece HOLDS. Measured median frame delta 4.71 vs p95 108.35.
     Stillness is the default; movement is an event.
  5. Vendor fonts + gsap. No CDN.

GLOBAL SPEC
  system:  large rounded near-black card (#060604, r=3%) inset ~2% on a white canvas
           (#eef7f6); bright pastel shapes peek from the canvas edges only
  pastels: cyan #25D5F2 / #63F5FF, mint #50E3B3 / #73FFB0, pink #F5A8E8,
           lavender #C18AFF, pale blue #A7F3F8
  lighting: flat graphic, no directional light, no cast shadows
  finish:  clean vector; bloom on cyan only; grain ONLY on the glitch card
  micro-label habit: FIG. numbers, units, timestamps. Use this register even when
           nothing needs labelling - it is what makes the card read as evidence.

BEAT GRID (sums to 66.5)
  | 1 | 0.00-1.60   | 1.6  | glitch wordmark on 3D teal planes | hard cut  |
  | 2 | 1.60-10.60  | 9.0  | talking head in candy frame       | whip blur |
  | 3 | 10.60-18.80 | 8.2  | prompt bar + clipped ticker       | hard cut  |
  | 4 | 18.80-33.90 | 15.1 | main data build                   | hard cut  |
  | 5 | 33.90-47.50 | 13.6 | editorial IPO card + variants     | hard cut  |
  | 6 | 47.50-63.30 | 15.8 | news card, then X UI card         | hard cut  |
  | 7 | 63.30-66.50 | 3.2  | fade to black                     | end       |

BEATS
  BEAT 1 glitch wordmark
    white heavy wordmark on 3D translucent teal planes (#042A33..#0E8898), cyan rim
    #14C8DA, heavy bloom #71F2FF, black margin to the edge.
    glitch = vertical slice displacement + horizontal smear + ghost + scanline on a
    2-4 FRAME cadence, not a smooth tween. Only card with grain.
  BEAT 2 talking head
    rounded video card r=4%, 78% wide. Cyan gradient banner across its top
    (#A7F3F8 -> #25D5F2). Pink arcs top corners, mint arc bottom-left, purple/blue
    wedge bottom-right. Rounded-triangle mark, cyan, with TWO WHITE DOTS as eyes.
    EXIT: vertical whip blur across the whole card in <0.5 s, then hard cut.
  BEAT 3 the prompt
    white pill bar, full radius, thin cyan border, black text:
      "Can we add a motion graphic to this scene"
    cyan cursor with two white dots at its right edge.
    dark ticker flush to the card's LEFT EDGE and deliberately CLIPPED by it:
      "STOCK UPDATE" / "31.40" / "DAY 32"
    The clipping is intentional - the ticker must read as already running.
  BEAT 5 editorial data card (the core)
    left half: photo with WHITE L-SHAPED CROP MARKS at all four corners.
    under photo: micro-label caption left, "FIG. 01" right.
    right half: ONE bar, one axis line, value above, category below.
    headline: heavy caps display at the bottom, and it MUST be a pun that reframes
    the image (reference: rocket photo + "WEEK 1? IT ROCKETS").
  BEAT 6 news card, then UI card
    news: subject image left, caption chip, micro-label top-right, display headline
    bottom-left, giant number right with SLASHED ZERO, micro-label beneath.
    UI: dark browser window in a rounded bezel (#202124) on the pastel canvas, with
    three flat vector stickers floating over it.
  BEAT 7 pure #000000, 3.2 s, nothing.

FINAL FRAME
  Pure black, 3.2 s, no brand, no CTA, does not loop.

OVERRIDES - apply, then keep everything unspecified exactly as analysed
  brand_name:      keep the system, replace the product name with the client's
  logo:            the cyan two-dot triangle is HeyGen's mark - substitute or delete
  palette:         keep analysed pastels (they are the signature)
  text:            keep the pun-headline MECHANISM, replace the subject matter
  duration:        keep 66.5 s
  aspect:          keep 16:9 (the two-column card needs width)
  type_style:      keep the two-register discipline
  add_element:     a CTA on beat 7 - the source has none. Fade one line in over the
                   black instead of cutting to nothing.
  remove_element:  HeyGen's logo mark on beat 2
  locale:          en

ACCEPTANCE
  - linter clean, 66.5 s +/- 1 frame
  - exactly two type registers; assert the ~10:1 ratio
  - median frame delta < 8 while peak deltas exceed 90
  - one whip transition at 10.6 s
  - final frame pure black
````

## 7. Caveats

- **Beat 4 (18.8–33.9 s, 22.7% of runtime) was not read.** Three keyframes exist and were not
  opened. Treat this lesson as 77% coverage, not complete.
- **Not a Short.** 1920×1080 landscape, 66.5 s, from a `/shorts` tab. Our inventory counts must be
  re-checked against actual resolution, not tab membership.
- **It is a vendor demo.** The technique is real; the "look how fast" claims are marketing.
- **The pun headline is the hardest part to imitate.** `WEEK 1? IT ROCKETS` works because the photo
  is literal and the pun is financial. A pun that does not reframe the image is a dad joke.
- **Two-register discipline collapses easily.** A third mid-size weight turns the card into a slide
  deck. Most common failure mode of this look.
- **Hold-and-burst does not survive a short runtime.** 15 s beats inside 66.5 s are fine; a 15 s
  hold in a 20 s Short is 75% dead air.
- **The 3.2 s black fade is wasted.** Replace with a drifting CTA — MASTER-LEARNINGS rule 7.
- **Bloom cost.** `filter: blur()` over full-frame pastel gradients at 1920×1080 is the main render
  expense on a 2-core box. The pastel shapes are static — rasterise them once.
- **Devanagari cannot carry register 1.** Caps + wide tracking has no Devanagari equivalent: the
  script has no case, and tracking out matras breaks clusters. Localising this system means
  rebuilding the label register as word-level size/weight hierarchy. That is a design problem, not
  a font swap.

---

## Transfer to HyperFrames

```html
<div id="stage" data-composition-id="hf-demo" data-width="1920" data-height="1080">
  <div class="canvas">        <!-- #eef7f6 + pastel edge shapes -->
    <div class="card">        <!-- #060604, r=3%, inset 2% -->
      <section class="b1">…glitch…</section>
      <section class="b2">…talking head…</section>
      <section class="b3">…prompt bar…</section>
      <section class="b5">…editorial data card…</section>
      <section class="b6">…news card / UI card…</section>
    </div>
  </div>
</div>
```

```css
.canvas{ position:absolute; inset:0; background:#eef7f6; overflow:hidden; }
.card{ position:absolute; inset:2%; background:#060604; border-radius:34px; overflow:hidden; }

/* pastel shapes live on .canvas BEHIND the card, and only peek at the edges */
.accent{ position:absolute; border-radius:50% 50% 0 0; filter:blur(2px); opacity:.95; }

.microlabel{
  font:700 14px/1 var(--mono); letter-spacing:.12em;
  text-transform:uppercase; color:#8E8E93;
}
.display{ font:900 132px/0.92 var(--sans); letter-spacing:-.02em; color:#fff; }
```

```js
const tl = gsap.timeline({ paused: true });

// beat 5 HOLDS — median delta across this piece is 4.71
tl.set('.b5', { opacity: 1 }, 33.90);
tl.set('.b5', { opacity: 0 }, 47.50);

// the one violent move: whip out of beat 2
tl.to('.b2', { y: -160, duration: 0.28, ease: 'power3.in' }, 10.32);
tl.set('.b2', { opacity: 0 }, 10.60);
tl.set('.b3', { opacity: 1 }, 10.60);

window.__timelines['hf-demo'] = tl;   // without this, every render pays a 45 s timeout
```

## Transfer to Remotion

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

const CUTS = [0, 1.6, 10.6, 18.8, 33.9, 34.9, 37.5, 39.0, 47.5, 48.6, 63.3, 66.5];

const beatAt = (t: number) => {
  for (let i = CUTS.length - 2; i >= 0; i--) if (t >= CUTS[i]) return i;
  return 0;
};

export const EditorialReel: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 29.97;
  const beat = beatAt(t);

  // the whip: only beats 2→3 have movement; everything else holds
  const whip = beat === 2
    ? interpolate(t, [10.32, 10.6], [0, -160], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        easing: Easing.in(Easing.poly(3)),
      })
    : 0;

  return (
    <AbsoluteFill style={{ background: '#eef7f6' }}>
      <PastelEdgeShapes />
      <AbsoluteFill style={{ inset: '2%', background: '#060604', borderRadius: 34,
                             overflow: 'hidden', transform: `translateY(${whip}px)` }}>
        {beat === 1 && <GlitchWordmark />}
        {beat === 2 && <PresenterCard />}
        {beat === 3 && <PromptBar />}
        {beat === 5 && <EditorialDataCard />}
        {beat === 6 && <NewsThenUICard />}
        {beat === 7 && <AbsoluteFill style={{ background: '#000' }} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

Note the structure: `beatAt(t)` derives everything from the timestamp. No state, no timers — the
same discipline the HyperFrames version enforces via the registered timeline.

## Emotion → motion mapping

| Feeling | Parameter | Value |
|---|---|---|
| Editorial credibility | micro-label density | at least one per card, caps + 12% tracking |
| Product confidence | hold length | 8–15 s per card |
| Energy without churn | burst pattern | 1.0 / 2.6 / 1.5 s cuts, then 8.5 s hold |
| Precision | easing | `power3.out` for entries, `linear` for type-on |
| Analogue warmth | pastel bleed | 2 px blur, shapes peek at edges only |

## Timing rules extracted

- 10 cuts, median **8.18 s** — `measured`
- Burst cluster 33.9–39.0 at **1.0 / 2.6 / 1.5 s** — `measured`
- Whip blur **<0.5 s** at 10.3–10.6 — `measured` (one keyframe catches it mid-travel)
- median **4.71** vs p95 **108.35** → hold-and-burst — `measured`
- Type hierarchy **~10:1** — `judged` from measured px values
- Fade to black **3.2 s** — `measured`
- Audio LRA **15.8** — `measured`; wide dynamics, real music bed plus speech

## Reusable snippet

`snippets/hyperframes/editorial-card.js` — the candy-frame/black-card scaffold, the two type
registers as a class pair, `editorialCard()` for the photo + crop-marks + chart + pun layout, and
`whipBlur()`.
