---
id: HVTuxncA9JU
title: "SaaS Explainer video"
source_url: https://www.youtube.com/watch?v=HVTuxncA9JU
form: short
depth: deep
duration_s: 19.0
resolution: 608x1080
aspect: "9:16 wrapper / 16:9 content band"
fps: 30/1
primitives:
  - letterbox-wrapper
  - gradient-field
  - silhouette-icon
  - card-grid
  - loading-end-card
emotion:
  - calm
  - technical
  - reassuring
tags:
  - saas
  - explainer
  - ui
  - gradient
  - end-card
easing:
  - sine.inOut
  - power2.out
has_captions: false
caption_script: none
measured:
  cuts: 2
  median_cut_s: 4.5
  mean_frame_delta: 8.362
  static_ratio: 0.243
---

# SaaS Explainer video

- **id** `HVTuxncA9JU`
- **url** https://www.youtube.com/watch?v=HVTuxncA9JU
- **duration** 19.0 s · **30 fps** · 608×1080 (9:16) · av1 · 241 kbps
- **audio** opus · **−16.98 LUFS** · TP −1.69 dBTP · **LRA 19.1**
- **extracted** 2026-10-21 · 35 keyframes across the full duration

## 1. Motive

A technical product reel for a B2B telecom/SaaS feature — SIP trunking — built to feel
*engineered* rather than *sold*. It awards the viewer a single feature name, then spends the
rest of the runtime in abstract confidence-building. There is **no voiceover, no CTA, no brand
lockup and no contact point**: the piece ends on a loading metaphor and stops. As a reference
it is valuable precisely because it is a *mood* piece with almost no information — the visual
system carries everything.

---

## 2. Global specification

| Field | Value | Source |
|---|---|---|
| Mood | calm · technical · reassuring | judged |
| Lighting | emissive only — every bright area is a light source, no directional key | judged |
| Colour grading | near-black ground, high-chroma accents, heavy bloom; contrast carried by luminance not hue | judged |
| Camera | no camera at all. Every move is a 2D scale/translate on a flat plane | measured (static_ratio 0.243, no perspective change across 35 frames) |
| Finish | gaussian bloom, soft-edged gradients, zero grain, zero chromatic aberration | judged |
| Resolution / aspect | 608×1080 container; content letterboxed to **608×342 = 16:9** | measured (369 px flat bands top and bottom, both mean 23.9) |
| FPS | 30 | measured |
| Duration | 19.0 s, six beats, two hard cuts | measured |
| Palette | `#131314` 86% · `#d1cff0` 6% · `#3d7cfa` 3% · `#6f6c7c` 3% · `#e93be7` 2% | measured |
| Type system | geometric grotesque, one family, weight 700–800, tracking −1% to −2%, Title Case | judged |
| Audio | −16.98 LUFS, **LRA 19.1** — real dynamic range, so there is music with build/release. No VO. | measured |

The LRA is the tell that separates this from the loop-Shorts in the corpus: `Q6H_fYhn3x0`
measures LRA **1.1** (flat-mastered loop), this measures **19.1** (composed audio with
dynamics). Same format, opposite audio philosophy.

### The letterbox finding

This is the most important structural fact and it is measurable:

```
top flat band   369 px   mean 23.9
content band    342 px
bottom flat band 369 px  mean 23.9
```

342 px in a 608 px-wide frame is **exactly 16:9**. So the piece is a **9:16 wrapper around
16:9 content** — a repost/compilation structure, not native vertical. The only native-vertical
element is the title card (beat 1), which has no letterbox.

Consequence for any rebuild: you cannot "make it 9:16" without redesigning it. The composition
is landscape and the black bands are load-bearing negative space.

---

## 3. Shot-by-shot breakdown

Boundaries marked `measured` came from keyframe-delta peaks; `inferred` from the delta profile.

### Beat 1 — 0.00 – 1.10 s (1.1 s · 5.8%) · boundary `measured` (Δ 0.00 then 83.33)

**Composition** — perfect central vertical symmetry. Three stack: Ae badge → **SaaS** → FULL
TUTORIAL. Focal point `0.50, 0.52`.

**Camera** — none. Flat graphic. Full-bleed, **no letterbox** (measured: only 102 px of flat
rows at the top, none at the bottom).

**Elements**

| # | element | type | shape / style | position | size | notes |
|---|---|---|---|---|---|---|
| 1 | magenta disc | shape | upper semicircle of a covered circle, `#FF3CE9` | 0.50, 0.34 | 62% w | sits behind the black dome |
| 2 | black dome | shape | lower semicircle, `#0B0B0B`, rounded bottom | 0.50, 0.42 | 66% w | overlaps the disc on a curved horizon |
| 3 | Ae badge | icon | rounded square r≈18%, `#1A1A1A` fill, white "Ae", soft drop shadow | 0.50, 0.27 | 13% w | Adobe mark; decorative, not a claim |
| 4 | blue ground | gradient | linear, vertical, `#6FA8FF → #175DFF → #003BFF` | full | 100% | occupies lower ~40% |

**Text**

| text | role | weight | size | tracking | case | colour |
|---|---|---|---|---|---|---|
| `SaaS` | headline | 900 | ~180 px | −3% | Title | metallic `#FFFFFF/#D8D8D8/#8F8F8F` bevel |
| `FULL TUTORIAL` | sub | 300 | ~34 px | +14% | UPPER | `#F2F2F2` |

Hierarchy ratio **5.3:1**. `SaaS` is beveled: highlight on the top edge, midtone face, dark
bevel below, soft drop shadow — a metallic treatment, not a flat fill.

**Colour** — magenta against blue is the only chromatic contrast in the piece; it belongs to
this beat alone. Gradient is a plain vertical 3-stop.

**Lighting / shadow** — synthetic. Badge has a glossy top and soft shadow; `SaaS` has an
embossed highlight; `FULL TUTORIAL` has a faint glow.

**Texture** — none. Clean vector.

**Motion** — static hold for the full 1.1 s (`measured`: k00 → k01 delta **0.00**, an exact
still). This is a hard-cut title card, not an animation.

**Transition out** — hard cut at 1.10 s, Δ **83.33** — the largest single change in the piece.
Carried by a full-frame content replacement, not by a match.

**Audio** — music enters. No SFX noted at this resolution.

### Beat 2 — 1.10 – 5.60 s (4.5 s · 23.7%) · boundary `measured` (Δ 45.79)

**Composition** — 16:9 band. Two soft orbs enter diagonally opposite: cyan from bottom-left,
magenta from top-right, meeting on an S-curve. By ~5.0 s they have overlapped into a
horizontal lens with a black **vesica piscis** at centre. Focal `0.50, 0.50`.

**Camera** — none; the orbs scale and translate. No depth of field (all soft by gradient, not
by lens).

**Elements**

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | cyan orb | 2D glow | radial, `#FFFFFF → #7DF9FF → #1F51FF`, heavily blurred | 0.25, 0.55 → drifts | 55% |
| 2 | magenta orb | 2D glow | radial, `#FFFFFF → #FF43FF → #BF00FF`, heavily blurred | 0.75, 0.40 → drifts | 55% |
| 3 | black lens | shape | vesica piscis, `#000000`, sharp edges | 0.50, 0.50 | 12% |
| 4 | violet pill | UI | rounded rect, `#9D4EDD` with `#C77DFF` glow centre | 0.50, 0.50 | 4% |

**Text** — none in this beat.

**Colour** — the whole beat is two gradients on an off-white negative space (`#E1E5EC`). No
type, so no contrast requirement.

**Motion** — orbs travel toward each other and overlap; the lens and pill resolve at the
crossing. Sine-like drift, no snap.

**Transition out** — hard cut at 5.60 s, Δ **45.79**.

### Beat 3 — 5.60 – 8.40 s (2.8 s · 14.7%) · start `measured`, end `inferred`

**Composition** — a 3×3 matrix of rounded rectangles centred in the band, equal gutters.
Focal `0.50, 0.50`.

**Elements**

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | 8 cards | UI | rounded rect r≈12–16 px, `#000000` fill, 1–2 px stroke with faint neon edge glow (magenta on the top row, cyan on the bottom) | 3×3 grid | 22% each |
| 2 | centre button | UI | same radius, linear horizontal gradient `#C000FF → #00C3FF`, strong outward neon glow matching the gradient | 0.50, 0.50 | 22% |

**Text**

| text | role | font | weight | size | case | colour |
|---|---|---|---|---|---|---|
| `SIP Trunking` | button label | geometric grotesque (Inter/SF-like) | 700 | ~34 px | Title Case | `#FFFFFF` |

No text shadow — legibility comes from the bright gradient behind it.

**Colour** — `#1C1C1E` ground, magenta/cyan accents. The neon edge lighting on the eight
satellite cards is what makes the grid read as depth rather than a table.

**Motion** — this is the **near-static section** of the piece: keyframe deltas here are
**1.08, 3.73, 3.70, 2.74, 2.72** (`measured`) — the lowest sustained stretch before the tail.
The grid essentially lands and holds. That is a deliberate hold on the only word the video
actually teaches.

**Transition out** — inferred soft change at ≈8.40 s (delta steps up to 11.5).

### Beat 4 — 8.40 – 11.70 s (3.3 s · 17.4%) · `inferred`

**Composition** — dead-centre silhouette on a radial white glow. Monochrome, no colour at all
— the only grayscale beat in the piece, which is how it registers as a "reveal" without any
colour cue. Focal `0.50, 0.50`.

**Elements**

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | radial glow | 2D | `#FFFFFF` centre → `#CCCCCC` → `#333333` → band edges | 0.50, 0.50 | 100% |
| 2 | open padlock | icon | solid black silhouette. Body = rounded rect, heavy radius. Shackle = thick arc from the top-left, terminating short of the body on the right (open). Blunt-cut end. | 0.50, 0.50 | 18% |

**Text** — none.

**Icon spec, precise enough to redraw** — body 120×86 px at 1×, corner radius 18 px, shackle
stroke 16 px, arc spanning roughly 200°, gap of ~14 px between the shackle's right terminus and
the body. The open state is the entire message.

**Lighting** — pure chiaroscuro: a white light behind a black object. No shadow is cast.

**Motion** — the padlock resolves as the glow blooms (`measured` deltas 11.54, 11.52 at 8.4–8.9 s).

**Transition out** — inferred change ≈11.70 s (delta 16.36).

### Beat 5 — 11.70 – 15.10 s (3.4 s · 17.9%) · `inferred`

**Composition** — a single luminous orb with a dark, blurred core, ringed by five gold stars
arranged in a loose U (three left, two right, one clipped by the band edge). Focal `0.50, 0.50`.

**Elements**

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | orb | 2D | radial bloom `#9B9B9B → #E5E5E5` around a heavily blurred `#1F1F1F` core | 0.50, 0.50 | 46% |
| 2 | 5 stars | icon | five-pointed, `#FFD700 → #FDE047`, sharp edges | ring r≈0.26 | 4% each |

**Text** — none.

**Colour** — the stars are the only warm colour in the entire piece. That is why they read as
"rating/award" without a word of copy.

**Texture** — the orb is gaussian-blurred; the stars are crisp. The contrast between soft and
sharp is the whole design.

**Motion** — slow bloom; `measured` deltas drop to 1.43, 0.57 by 13.4–14.0 s.

### Beat 6 — 15.10 – 19.00 s (3.9 s · 20.5%) · `inferred`

**Composition** — `99.9%` centred with a pill progress bar beneath, both centred in a pure-black
band. Focal `0.50, 0.47`.

**Text**

| text | role | weight | case | treatment |
|---|---|---|---|---|
| `99.9%` | final statistic | 800 | as set | vertical gradient `#FFFFFF → #79C4F1 → #3A94E8`; glossy meniscus on the lower half; the decimal is a **square**, not a round dot |

**Elements**

| # | element | type | shape / style | position | size |
|---|---|---|---|---|---|
| 1 | progress bar | UI | pill, rounded caps, `#FFFFFF` → `#9D4EDD` → `#7B2CBF`, subtle violet ambient glow | 0.50, 0.55 | 52% w |

**Motion** — essentially static: deltas 1.14, 1.00, 1.14, 0.72, 0.55, 0.90 (`measured`). The bar
implies a fill that has already completed. **No CTA, no brand, no URL.**

---

## 4. Visual effects timing

| effect | in | out | target | notes |
|---|---|---|---|---|
| orb drift / overlap | 1.10 | 5.60 | beats 2 | sine, no snap |
| neon edge glow | 5.60 | 8.40 | beat 3 grid | magenta top row, cyan bottom |
| gradient bloom on button | 5.60 | 8.40 | beat 3 centre | matches button gradient |
| radial bloom | 8.40 | 11.70 | beat 4 | white → charcoal |
| orb pulse | 11.70 | 15.10 | beat 5 | slow, low amplitude |
| end-card gradient text | 15.10 | 19.00 | beat 6 | static, not animated |

---

## 5. Final frame spec — the last held frame

- Text: `99.9%` centred, gradient `#FFFFFF → #3A94E8`, glossy lower half, square decimal.
- Pill bar beneath, `#FFFFFF → #7B2CBF`, ~52% of band width, centred.
- Ground: pure `#000000` band; charcoal `#1C1C1C` letterbox above and below.
- Composition: exact horizontal centre, focal `0.50, 0.47`.
- **Held, and still frozen**: measured deltas across 15.1–19.0 s are 0.55–1.14, i.e. effectively
  frozen. There is no drift and no breathing.
- **Loop verdict: does not loop.** It ends on a loading metaphor at 99.9% — a deliberate
  never-quite-finished joke — so a loop back to the magenta title card would destroy the gag.
  Frame-identity test: no lag produces a low-distance repeat (best lag distance well above the
  loop threshold), confirming a linear, non-cyclic structure.
- Duration of the hold: ~3.9 s, which is long, and with zero motion it is the weakest part of
  the piece by our own rule 7 (a held frame must still move).

---

## 6. Rebuild prompt — ready to paste

````
ROLE
  You are a motion graphics director. Build one 19 s technical product reel.

TARGET
  Runtime: 19.0 s
  Engine:  HyperFrames (HTML + GSAP)
  Deliver: 1080x1920 H.264, 30 fps

HARD CONSTRAINTS
  1. All motion is a pure function of time. No setTimeout/rAF/Date.now.
  2. Register: window.__timelines[COMP_ID] = tl.
  3. Circular easing only (sine.inOut / power2.out). This piece is calm - never
     back.out, never elastic.
  4. Vendor fonts + gsap. No CDN.
  5. NEVER animate a camera. There is no 3D in this piece; every move is 2D
     scale/translate/opacity on a flat plane.
  6. Content lives in a 16:9 band letterboxed inside the 9:16 frame. The black
     bars are load-bearing - do not fill them.

GLOBAL SPEC
  mood:      calm, technical, reassuring
  ground:    #131314 (86% of the frame)
  accents:   #3d7cfa blue / #e93be7 magenta / #d1cff0 pale / #FFD700 gold (beat 5 only)
  lighting:  emissive only - every bright area is its own light source; no key light
  finish:    gaussian bloom, soft gradients, ZERO grain, ZERO chromatic aberration
  type:      one geometric grotesque, weights 700-800, tracking -1%, Title Case
  audio:     -16.98 LUFS, LRA 19.1 (dynamics matter), music only, no VO

BEAT GRID  (durations must sum to 19.0)
  | beat | in-out      | dur  | content                        | out      |
  | 1    | 0.00-1.10   | 1.1  | full-bleed title card, STATIC  | hard cut |
  | 2    | 1.10-5.60   | 4.5  | two orbs drift -> lens + pill  | hard cut |
  | 3    | 5.60-8.40   | 2.8  | 3x3 grid, "SIP Trunking" held  | soft     |
  | 4    | 8.40-11.70  | 3.3  | open padlock on white bloom    | soft     |
  | 5    | 11.70-15.10 | 3.4  | orb + 5 gold stars             | soft     |
  | 6    | 15.10-19.00 | 3.9  | "99.9%" + pill bar, frozen     | end      |

BEATS
  BEAT 1  0.00-1.10  full-bleed, no letterbox
    text: "SaaS" weight 900, ~180px, metallic bevel (white face, grey bevel,
          soft drop shadow); "FULL TUTORIAL" weight 300, ~34px, +14% tracking
    shapes: magenta #FF3CE9 upper disc, black #0B0B0B lower dome over it,
            blue ground linear #6FA8FF -> #175DFF -> #003BFF
    motion: NONE. Hold dead still for the full 1.1 s. This is a card, not an
            animation. Measured inter-frame delta here is exactly 0.00.
  BEAT 2  1.10-5.60  16:9 band
    shapes: cyan radial #FFFFFF->#7DF9FF->#1F51FF from bottom-left,
            magenta radial #FFFFFF->#FF43FF->#BF00FF from top-right,
            converging into a black vesica piscis at centre with a violet
            #9D4EDD pill inside it
    motion: scale 0.6->1.0, opacity 0->1, sine.inOut, 2.2 s, overlapping
    no text in this beat
  BEAT 3  5.60-8.40  16:9 band
    layout: 3x3 grid, equal gutters, card radius 14px of card width,
            8 satellite cards #000000 with 1.5px stroke, magenta glow top row,
            cyan glow bottom row
    centre: gradient #C000FF -> #00C3FF, strong matching outward glow
    text:   "SIP Trunking" 700, 34px, #FFFFFF, centred - no shadow
    motion: cards fade+scale in with 0.05 s stagger, then HOLD. Measured deltas
            here are 1-4: this is the quietest stretch in the piece.
  BEAT 4  8.40-11.70 16:9 band, grayscale ONLY
    bg:     radial #FFFFFF centre -> #CCCCCC -> #333333 -> band edge
    icon:   open padlock, solid #000000. Body 120x86, radius 18, shackle stroke
            16, arc ~200deg, gap ~14px on the right so it reads OPEN.
    motion: glow blooms while the lock resolves
    NOTE:   this is the only beat with no chroma. That is what makes it read as
            a reveal without any colour cue.
  BEAT 5  11.70-15.10 16:9 band
    shape:  orb at centre, radial #9B9B9B->#E5E5E5 around a blurred #1F1F1F core
    icons:  5 five-point stars #FFD700->#FDE047 on a ring r=0.26 - SHARP, while
            the orb is blurred. The soft/sharp contrast is the design.
    motion: slow bloom, then deltas fall to <1.5
    NOTE:   gold is the only warm colour in the whole video. Use it here and
            nowhere else.
  BEAT 6  15.10-19.00 16:9 band, black ground
    text:   "99.9%" weight 800, vertical gradient #FFFFFF -> #79C4F1 -> #3A94E8,
            glossy lower half, SQUARE decimal point
    bar:    pill, 52% band width, #FFFFFF -> #9D4EDD -> #7B2CBF, violet ambient glow
    motion: effectively frozen (measured 0.55-1.14). The bar reads as already full.

FINAL FRAME
  "99.9%" + full pill bar, frozen, held ~3.9 s, no drift. Does NOT loop.

OVERRIDES - apply, then keep everything unspecified exactly as analysed
  brand_name:      KEEP (none present in source - do not invent a lockup)
  logo:            DELETE the Adobe "Ae" badge on beat 1 - it is a tutorial
                   artefact, not part of the design language
  palette:         keep analysed (#131314 / #3d7cfa / #e93be7 / #d1cff0 / #FFD700)
  text:            keep analysed
  duration:        keep 19.0 s
  aspect:          keep 9:16 wrapper + 16:9 band
  type_style:      keep analysed
  add_element:     a CTA on beat 6 - the source has none, which is its main
                   commercial defect. Put a single line + contact below the bar,
                   fading in at 18.2 s. This is the one place to improve on the
                   reference rather than copy it.
  remove_element:  the Ae badge (see logo)
  locale:          en

ACCEPTANCE
  - renders end to end, linter clean
  - total duration 19.0 s +/- 1 frame
  - beats 1, 3 and 6 are near-static (delta < 5); beats 2 and 5 carry the motion
  - no camera/3D transform anywhere
  - letterbox bands present from 1.10 s to the end, absent in beat 1
````

---

## 7. Caveats

- **Only 2 cuts are detectable but there are 6 beats.** The internal transitions are soft
  (gradient morphs), so the 0.30 scene threshold misses them. Beat boundaries 3–6 are
  *inferred* from the keyframe-delta profile, not measured from the video. An agent must not
  treat those times as exact.
- **The 16:9 letterbox is a repost artefact, not a design choice.** Rebuilding it natively in
  9:16 would be a different, better video; copying the letterbox copies a limitation.
- **The piece has no CTA, no brand and no contact point.** As an advert it is incomplete.
  Rule: copy the visual system, do not copy the commercial omission.
- **The Adobe "Ae" badge is a tutorial artefact.** Shipping it in a client video would be a
  trademark problem.
- **`99.9%` with no supporting claim is a credibility risk.** On a real product reel this needs
  a source or it should be replaced with a substantiated number.
- **The 3.9 s frozen end card violates our own rule 7** (a held frame must still move). If
  rebuilt, add a 1.000 → 1.008 drift to the bar so it does not look stalled.
- Beautiful bloom on a 2-core CPU is expensive: `filter: blur()` over full-frame gradients at
  1080×1920 is the main cost. Prefer a pre-rendered PNG bloom where the gradient is static
  (beats 2, 4, 5 are effectively static fields) and only animate what actually moves.
- Devanagari is not involved here, but if localised: `SIP Trunking` becomes a transliteration
  and the 3×3 grid labels will outgrow their cards. Re-measure, do not assume.

---

## Transfer to HyperFrames

```html
<div id="stage" data-composition-id="saas-reel" data-width="1080" data-height="1920">
  <section class="beat b1"> … title card, full-bleed … </section>
  <section class="beat b2"> … orbs … </section>
  <section class="beat b3"> … 3x3 grid … </section>
  <section class="beat b4"> … padlock … </section>
  <section class="beat b5"> … orb + stars … </section>
  <section class="beat b6"> … 99.9% … </section>
</div>
```

```css
/* the letterbox is structural: content never escapes the band */
.band{
  position:absolute; left:0; right:0; top:369px; height:342px;
  overflow:hidden;
}
/* beat 1 is the only full-bleed beat */
.b1{ position:absolute; inset:0; }
```

```js
const tl = gsap.timeline({ paused: true });

// beat 1: a card, not an animation — measured delta 0.00
tl.set('.b1', { opacity: 1 }, 0);

// hard cut at 1.10 — two sets, no tween
tl.set('.b1', { opacity: 0 }, 1.10);
tl.set('.b2', { opacity: 1 }, 1.10);

// beat 3 lands then holds; deltas here are 1-4, so do not add motion
tl.fromTo('.b3 .card', { scale: .92, opacity: 0 },
  { scale: 1, opacity: 1, duration: .5, stagger: .05, ease: 'power2.out' }, 5.60);

// beat 6 stays frozen on purpose
tl.set('.b6', { opacity: 1 }, 15.10);

window.__timelines['saas-reel'] = tl;   // without this every render pays a 45 s timeout
```

## Emotion → motion mapping

| Feeling | Parameter | Value |
|---|---|---|
| Calm | easing family | `sine.inOut` / `power2.out` only — never `back`, never `elastic` |
| Technical | cut count | 2 in 19 s, hard, full-frame |
| Reassuring | hold length | the only word taught (`SIP Trunking`) holds ~2.8 s |
| Engineered | bloom | gaussian, no grain, no CA — clean optics, not film |
| Restrained | colour count | one accent per beat; gold appears once |

## Timing rules extracted

- 2 hard cuts at **1.10 s** (Δ83.33) and **5.60 s** (Δ45.79) — `measured`
- 6 beats, boundaries 3–6 inferred — `inferred`
- Beat 1 static, delta **0.00** exactly — `measured`
- Quietest stretch 5.6–8.4 s, deltas 1.08–3.73 — `measured`
- Final 3.9 s frozen, deltas 0.55–1.14 — `measured`
- LRA **19.1** vs 1.1 on the loop-Shorts — `measured`, the audio tells you which family a piece belongs to

## Reusable snippet

`snippets/hyperframes/letterbox-band.js` — the 16:9-in-9:16 band helper, an emissive
`radialBloom()` utility, and `hardCut()`.
