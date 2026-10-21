# Motion System — a knowledge base for AI video agents

A curated, machine-readable library of motion-design technique translated out of After
Effects tutorials and into the two runtimes we actually ship on:

- **HyperFrames** — HTML + GSAP, rendered by Chrome
- **Remotion** — React, frame-deterministic, rendered by Chrome

Every lesson is written so an agent can read one file and produce working code. There are
no After Effects recipes here, no "click this menu", no proprietary tooling. If a technique
could not be re-expressed in GSAP or React, it was dropped rather than recorded.

**Emotion is a first-class parameter**, not a mood board. Every lesson maps a feeling to an
easing family, a duration and a stagger value, so motion can be driven by a measured curve
(audio valence/arousal) instead of a designer's guess.

---

## How an agent should read this repo

Read in this order. Do not read `lessons/` first — it is 245 files of detail and you will
drown.

```
1. README.md              ← you are here: contract + routing table
2. SCHEMA.md              ← the shape of a lesson file
3. MASTER-LEARNINGS.md    ← cross-cutting rules that hold across the whole corpus
4. index.json             ← machine-readable index: query this, don't grep prose
5. patterns/*.md          ← one file per technique family
6. lessons/<id>.md        ← per-video detail, only the ones index.json points you at
7. snippets/              ← copy-pasteable implementations
```

### Routing table — start from the effect you need

| You need | Read |
|---|---|
| A text/caption reveal | `patterns/caption-systems.md` |
| To know which easing encodes which feeling | `patterns/easing-and-emotion.md` |
| A transition between two shots | `patterns/transitions.md` |
| Camera movement (push, parallax, whip) | `patterns/camera-and-depth.md` |
| To animate Hindi/Devanagari text | `patterns/devanagari-constraints.md` |
| A specific primitive's code | `snippets/hyperframes/` or `snippets/remotion/` |

### Querying `index.json`

```jsonc
// every entry
{
  "id": "8iXSoRfCqmA",
  "title": "Animate a Signature",
  "duration_s": 327.4,
  "form": "long",                  // long | short
  "primitives": ["stroke-offset", "path-stagger"],
  "emotion": ["hand-made", "ceremonial"],
  "tags": ["drawing", "logo", "reveal"],
  "easing": ["linear"],
  "has_captions": false,
  "lesson": "lessons/8iXSoRfCqmA.md",
  "snippets": ["snippets/hyperframes/marker-sweep.js"]
}
```

To find everything that teaches caption timing:

```bash
jq '[.[] | select(.tags | index("caption"))]' index.json
```

To find every linear-eased primitive (the "human" family):

```bash
jq '[.[] | select(.easing | index("linear"))]' index.json
```

---

## The three hard rules

These are not style preferences. They are constraints of the runtimes, and violating them
produces broken renders rather than ugly ones.

### 1. Motion must be a pure function of time

HyperFrames captures frames by seeking; Remotion renders frame N independently. Any motion
driven by `setTimeout`, `requestAnimationFrame`, elapsed wall-clock, or mutable state that
advances outside the timeline will desync or freeze. If a technique cannot be expressed as
`f(t) → style`, it does not belong in this repo.

### 2. Animate transforms, never layout properties

`x/y/scale/rotate/opacity` are safe. `letter-spacing`, `width`, `height`, `top/left`,
`font-size` trigger layout and snap to integer pixels — they stutter under frame capture.
The linter rejects them (`gsap_non_transform_motion`). This catches more bad motion than
any review.

### 3. Complex scripts are word-level, never character-level

Devanagari, Arabic, Thai, Tamil: animating per character severs conjuncts and reorders
pre-base matras. It renders wrong text, and the failure is invisible to anyone who cannot
read the script. Word or line only. See `patterns/devanagari-constraints.md`.

---

## What is deliberately absent

- **No After Effects instructions.** The source material is AE tutorials; the output is not.
- **No stock-footage advice.** We generate or source assets separately.
- **No plugin or script recommendations.** Only what ships in HyperFrames or Remotion.
- **No per-video prose for its own sake.** A lesson exists to change what an agent
  generates, not to summarise a video.

---

## Source and provenance

Derived from [@vanemotion](https://www.youtube.com/@vanemotion) — 245 videos, 123 hours,
200 long-form + 45 Shorts. Videos are downloaded, measured, keyframes sampled, lessons
written, then **deleted**. Nothing in this repo depends on having the source video: the
measured numbers and the translated code are the artifact.

Provenance per lesson is recorded in frontmatter (`source_id`, `source_url`, `measured`).
Where a number is measured rather than quoted, it is marked. Where a technique is inferred
from keyframes rather than stated in the video, the lesson says so.

---

## Status

| | |
|---|---|
| Shorts processed | see `index.json` where `"form": "short"` |
| Long-form processed | see `index.json` where `"form": "long"` |
| Total target | 245 |
| Patterns written | 5 |

See `MASTER-LEARNINGS.md` for the growing list of rules that have held across every video
examined so far.
