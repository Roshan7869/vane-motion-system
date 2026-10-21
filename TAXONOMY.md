# TAXONOMY — ingestibility and retrieval

Two separate questions, and conflating them is why motion-knowledge repos fail in practice:

1. **Can an LLM ingest it?** — a size question. Measured below.
2. **Can an LLM find the right piece?** — a structure question. Answered by the facet taxonomy.

The answers are: *not all at once, and yes if you use the router.* Both are quantified here.

---

## Part 1 — Ingestibility

### Real sizes

Measured from `git ls-files` on `main`, not from the working directory:

| What | Files | Bytes | ≈ Tokens |
|---|---|---|---|
| **Whole tracked repo** | 155 | 893,697 | **~248,000** |
| `lessons/` only | 137 | 687,577 | ~191,000 |
| `capabilities.json` (router) | 1 | 92,577 | **~25,700** |
| `index.json` (router) | 1 | 102,688 | ~28,500 |
| `MASTER-LEARNINGS.md` + `SCHEMA.md` + `patterns/` | 5 | 43,000 | ~12,000 |

**The 248 MB you see locally is not the repo.** That is `frames/` — 3,718 JPEG keyframes kept on
disk for audit and excluded by `.gitignore`. Zero frame files are tracked. What a model receives is
**0.85 MB**.

### What actually fits

| Context window | Verdict |
|---|---|
| 128 K | Repo does not fit. Router + 3–4 lessons does. |
| 200 K (Claude Sonnet/Opus standard) | Whole repo does **not** fit. `lessons/` alone is 191 K and leaves no room to think. |
| 1 M (Claude Sonnet 1M / GPT-4.1-class) | Whole repo fits with room to spare. |

So the honest answer to "are all 137 lessons ingestible": **not in one standard context, and you
should not want that anyway.** Bulk ingest of 137 lessons is worse than retrieval of 3 — the model
drowns in 131 metadata-only entries and cannot tell them from the 6 verified ones.

### How the connectors actually behave

Neither Claude's GitHub integration nor ChatGPT's connector dumps a repository into the context
window. Both **index and retrieve** — the model gets file listings and pulls what it asks for. That
is why the router file matters more than total size: it is what the model asks for first.

**But retrieval is keyword-driven.** If the repo does not state, in indexable plain language, what
each lesson *can do*, the connector will not surface it for "I need animated captions" no matter how
good the lesson is. That is the gap `capabilities.json` closes.

---

## Part 2 — The facet taxonomy

A flat tag list makes an LLM guess. Seven orthogonal facets make it filter.

Every one of the 137 lessons carries exactly these:

| Facet | Values | Why the LLM needs it |
|---|---|---|
| `capability` | 22 controlled values (below) | the technique it can supply — the primary filter |
| `format` | `reel-example` · `channel-episode` · `demo-walkthrough` · `talking-head` · `comparison` · `course-promo` | stops it recommending a 98 s tutorial when you asked for a 10 s reference |
| `pacing` | `continuous` · `hold-and-burst` · `static` | derived from mean/median/p95 — picks the motion engine |
| `shape` | `9:16` · `16:9` · `1:1` | measured, not tab-inferred |
| `system` | `editorial-card` · `collage-reel` · `3d-camera-text` · `broll-essay` · `saas-ui` · null | the five design systems actually reverse-engineered |
| `basis` | `visual-read` · `metadata-only` | **the trust boundary** — 6 verified, 131 inferred from titles |
| `runtime` | `hyperframes` · `remotion` · [] | whether usable code exists in the lesson |

### The capability vocabulary

`type-system` · `captions` · `lower-thirds` · `transitions` · `camera-and-depth` · `data-viz` ·
`map-animation` · `wave-motion` · `liquid-glass` · `logo-animation` · `grid-and-layout` ·
`color-and-mask` · `grain-and-texture` · `glitch-and-distortion` · `extrude-and-3d` ·
`loop-construction` · `beat-sync` · `storyboard-and-structure` · `editing-cadence` ·
`ai-video-generation` · `workflow-invocation` · `export-and-technical` · `ui-and-product-motion`

`animation-principles` is deliberately generic and low priority — if a piece has a specific
capability it does not also get the generic one.

### Current coverage

```
capability present : 129 / 137   (8 are finished examples with no stated technique — honest null)
format            : reel-example 93 · channel-episode 19 · demo-walkthrough 16 · talking-head 4 · course-promo 3 · comparison 2
pacing            : continuous 76 · static 37 · hold-and-burst 24
shape             : 9:16 105 · 16:9 30 · 1:1 2
basis             : metadata-only 131 · visual-read 6
```

Those counts are the real state of the corpus and they are lopsided. Read them as a warning:

- **`captions` has 2.** For a Hindi-caption business that is the most serious gap in the repo.
- **`wave-motion` appears 0 times.** No lesson supplies the wave primitive you asked about.
- **131 of 137 are `metadata-only`.** Their capability tags come from titles. A title saying "3D
  Animation" does not prove the lesson teaches extrude-and-3d.

---

## Part 3 — The retrieval protocol

### For an agent (copy this into its system prompt)

```
You have access to a motion-design knowledge base at Roshan7869/vane-motion-system.

NEVER read lessons in bulk. Follow this order:

1. Load capabilities.json  (~26K tokens). It is the only routing file you need.
2. Filter it. Do not read it linearly. Example filters:
     capability contains "captions"        -> lessons that supply captions
     shape == "9:16" and pacing == "continuous"
     system != null                         -> the 5 reverse-engineered design systems
3. Sort the survivors with basis == "visual-read" FIRST. Those have verified
   measurements and working code. basis == "metadata-only" is a title inference.
4. Open at most 3 lesson files. If more than 3 match, tighten the facets.
5. Only if no capability matches, read MASTER-LEARNINGS.md and patterns/ —
   those hold the cross-cutting rules (easing, Devanagari, mean-vs-median).

If a lesson says depth: structural, it has numbers and keyframes but NO written
technique. Do not claim it taught you a method. Say what it measured.
```

### Worked retrievals

**"I need animated captions for a Hindi short."**

```
filter: capability contains "captions"
  → VAbbjYzmPEE  Ep 39: Embed or Burn In Captions in FCP    16:9 static  (metadata-only)
  → Yn6uug_qBhM  Embed or Burn In Captions in Final Cut Pro 9:16 static  (metadata-only)
then: patterns/devanagari-constraints.md   ← word-level only, never per glyph
then: patterns/caption-systems.md          ← capsule, 1–2 lines, reveal patterns
honest gap: neither caption lesson is a visual read, and neither covers Devanagari.
```

**"16:9 product demo with data cards."**

```
filter: system == "editorial-card"  OR  (capability contains "data-viz" AND shape == "16:9")
  → aNZeXQmVOjQ  16:9 hold-and-burst  VISUAL-READ  ← the answer
  → qSv_P_acE_o / Pawe7hLSW9o        16:9 static    metadata-only typography lessons
open: lessons/aNZeXQmVOjQ.md + snippets/hyperframes/editorial-card.js
```

**"Looping 9:16 with continuous motion."**

```
filter: capability contains "loop-construction" AND pacing == "continuous" AND shape == "9:16"
  → 17 matches
then: bias to basis == "visual-read"  → Q6H_fYhn3x0 (and that one is a LOOP, not 14 cuts)
read loop_analysis.json for the 5 confirmed loops
```

**"Apple-style liquid glass UI."**

```
filter: capability contains "liquid-glass"
  → fHZidlnJIV4  Liquid glass animation like Apple   9:16 continuous
  → P9qT6XtgSI4  UI animation like Apple Style       9:16 continuous
both metadata-only — the technique is named in the title, not verified in the body
```

### What the taxonomy deliberately does not do

- **It does not merge pacing into capability.** A piece can supply `type-system` at any pacing;
  conflating them is how you get an editorial card recommended for a 10 s loop.
- **It does not trust `system` outside the 5.** Only five pieces have a named system, because only
  five were reverse-engineered. Guessing a sixth would be fabrication.
- **It does not hide the `basis` split.** 131 of 137 are unverified. A taxonomy that presents them
  as equivalent to the 6 verified ones would be the most damaging thing in this repo.

---

## Part 4 — What to do about the gaps

Ranked by damage to the stated goal (Hindi captions, motion templates for agents):

1. **`captions` = 2, neither Devanagari.** The single biggest hole. Needs a dedicated capture pass
   on caption-teaching sources — not more of this corpus.
2. **`wave-motion` = 0.** The primitive you asked about has no lesson. It exists only as a recipe in
   `MASTER-LEARNINGS`-adjacent notes and two After Effects tutorials that were never ingested.
3. **131 metadata-only lessons.** Each deep read is ~25 minutes and upgrades one row from inferred
   to verified. There is no shortcut; the ratio is the work.
4. **`type-system` = 5, of which 2 are "Typography Components" lessons in 16:9.** Thin for a repo
   meant to drive type.
