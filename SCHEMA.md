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
