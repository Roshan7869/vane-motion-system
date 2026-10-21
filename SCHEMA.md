# Lesson file schema

Every `lessons/<id>.md` follows this contract. The structure is not cosmetic — agents
parse it, and `index.json` is generated from the frontmatter and the `## Transfer` headings.

---

## Frontmatter (required)

```yaml
---
id: MTXVNh3L7h4
title: "Viral Reel Animation"
source_url: https://www.youtube.com/watch?v=MTXVNh3L7h4
form: short                # short | long
duration_s: 17.0
resolution: 1080x1920
fps: 30
primitives:                # motion primitives demonstrated
  - camera-push
  - kinetic-type
emotion:                   # feelings the technique encodes
  - urgent
  - premium
tags:                      # free-form, used by index queries
  - reel
  - transition
  - caption
easing:                    # easing families used
  - power3.out
  - linear
has_captions: true
caption_script: latin      # latin | devanagari | none | mixed
measured:                  # numbers taken from the file, not quoted from the video
  cuts: 7
  median_cut_s: 2.4
  mean_frame_delta: 6.31
  static_ratio: 0.18
---
```

`measured` is the trust boundary. Anything in there was computed from the pixels. Anything
not in there is a reading of the frames and is labelled as such in prose.

---

## Two depth tiers

Every lesson is one of two kinds. The frontmatter records which, in `depth`.

| Tier | Meaning | What it contains |
|---|---|---|
| `structural` | the pipeline wrote it; no visual read | frontmatter, cut list, motion profile, palette, keyframe table, and `_pending visual read_` placeholders |
| `deep` | a full shot-by-shot read | everything below, in the order given by `templates/shot-breakdown.md` |

A `structural` lesson is honest but thin: it says what the video *measures*, not how to build
it. Only a `deep` lesson can rebuild the piece. Never present a structural lesson as if it
were deep — that is the one misrepresentation this schema exists to prevent.

### Required sections for a `deep` lesson

Full field list lives in **`templates/shot-breakdown.md`**. In order:

1. `## 1. Motive` — what the piece is for, who it targets, what it wants the viewer to do.
2. `## 2. Global specification` — mood, lighting, grade, camera language, finish, resolution,
   aspect, fps, duration, palette with coverage, type system, audio. A table, with a `source`
   column marking each row `measured` or `judged`.
3. `## 3. Shot-by-shot breakdown` — one block per beat, tiling the whole duration with no gaps.
   Each beat carries: timestamp range, composition and focal point, camera (framing, angle,
   move, DOF — or an explicit "none"), an element inventory table (type, shape, position, size,
   depth), exact text with font/weight/size/tracking/case/colour, colour and gradients with
   hex and stops, lighting and shadow per element, texture, a motion table
   (`property | from → to | start | duration | ease | trigger`), the transition into the next
   beat, and the audio state.
4. `## 4. Visual effects timing` — every effect with in/out points.
5. `## 5. Final frame spec` — the last held frame, its hold length, and an explicit loop
   verdict with the measurement behind it.
6. `## 6. Rebuild prompt` — a single self-contained pasteable block. Shape and the override
   block are defined in `prompts/agent-rebuild.md`.
7. `## 7. Caveats` — where it breaks.

Also required in a deep lesson: `## Transfer to HyperFrames`, `## Transfer to Remotion`,
`## Emotion → motion mapping`, `## Timing rules extracted`, `## Reusable snippet`.

### Rules specific to the shot-by-shot

- **Beat boundaries must state provenance**: `measured` (a keyframe-delta peak) or `inferred`
  (read from the delta profile). Soft transitions do not trip a 0.30 scene threshold, so a
  video with 6 visible beats may report only 2 cuts. Saying which is which is not optional.
- **A beat with no motion must say so.** "Static hold, measured inter-frame delta 0.00" is a
  finding. Leaving it blank reads as an oversight.
- **Reproduce source text verbatim, including errors**, and flag the error. Do not silently
  correct copy.
- **The override block keeps everything it does not name.** Brand, palette, text, duration,
  aspect, type style and added elements are all opt-in; anything unspecified is inherited from
  the analysis.

---

## Body sections (in this order)

### 1. `## What this video teaches`

Two to four sentences. Name the primitive, not the software. "A stroke reveal: the path
exists in full and only the painted fraction animates." Never "go to Effects > Trim Paths".

### 2. `## Frame evidence`

A table of the sampled keyframes and what each one shows. This is how a future reader can
audit the claim without the video.

| # | t | what it shows |
|---|---|---|
| 0 | 0.4s | cold open, single word centred, no logo |

### 3. `## Transfer to HyperFrames`

Real HTML + GSAP. Must run as written. Include the three things people get wrong.

```html
<svg viewBox="0 0 400 200">…</svg>
```

```js
gsap.to(el, { strokeDashoffset: 0, duration: 0.9, ease: 'none' });
```

### 4. `## Transfer to Remotion`

Real React. Frame-deterministic. No `useState` clocks. Shows `interpolate`/`spring` with
explicit frame ranges.

### 5. `## Emotion → motion mapping`

A table. Feeling → parameter → value. No adjectives without numbers.

| Feeling | Parameter | Value |
|---|---|---|
| urgent | duration | 0.18 s |
| premium | easing | `power3.out` |

### 6. `## Timing rules extracted`

Hard numbers an agent can paste: reveal duration, stagger, overlap, hold, cut cadence.
Mark each as `measured` or `judged`.

### 7. `## Caption implications`

What this means for caption systems, including the Devanagari constraint when relevant.
If the lesson does not touch captions, write "None — this primitive does not interact with
captions" rather than omitting the section, so the absence is explicit.

### 8. `## Reusable snippet`

One code block, or a pointer into `snippets/`. If the code lives in `snippets/`, the lesson
links to it and `index.json` records the path — do not duplicate the same code in two places.

### 9. `## Caveats`

Where the technique breaks. Runtimes it does not survive. Cases where it looks cheap. This
section is mandatory; a lesson with no caveats has not been examined closely enough.

---

## Rules for writing a lesson

1. **One primitive per lesson.** If a video teaches three things, write the dominant one and
   cross-reference the others by id. Detail beats coverage.
2. **Numbers over adjectives.** "0.18 s" not "snappy". "`power3.out`" not "smooth".
3. **Never invent a measurement.** If you did not compute it, it does not go in `measured`.
4. **Label inference.** If you concluded something from keyframes that the video never
   stated, say "inferred from keyframes".
5. **Dropped beats recorded beats.** If a technique could not be re-expressed in GSAP or
   React, write a `## Dropped` note explaining why, rather than silently omitting it.
6. **No software instructions.** If a sentence contains a menu path, it is wrong.
