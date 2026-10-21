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

Read in this order. Do not read `lessons/` first — it is 137 files of detail and you will
drown.

```
0. rules.md               ← 5 non-negotiable rules (~580 tokens). Load with ANY style card
0b. styles/<one>.md       ← compiled style card, ~400-600 tokens. Load ONE
   (captions go in styles/captions.md, only if the piece has captions)
```

**For a normal video task that is the whole budget: ~1,150–2,100 tokens.** Do not load the rest.

```
1. PROJECT-KNOWLEDGE.md   ← paste bundle for a knowledge slot: rules + overrides + task routing (~1.6K)
2. VERIFIED-INDEX.md      ← what is measured vs inferred. Read before trusting any lesson (~1.4K)
3. README.md              ← you are here: contract + routing table
4. TAXONOMY.md            ← the 7 facets + ingestibility numbers (~2.4K)
5. capabilities.json      ← THE ROUTER: filter this, never read linearly (~26K)
6. SCHEMA.md              ← the shape of a lesson file
7. MASTER-LEARNINGS.md    ← 14 cross-cutting rules across the whole corpus (~3.2K)
8. patterns/*.md          ← one file per technique family (3 exist)
9. lessons/<id>.md        ← per-video detail, only the 1-3 your filter selected
10. snippets/             ← copy-pasteable implementations (~5K for all of them)
```

**Token budget, measured:**

| Load | Tokens |
|---|---|
| `rules.md` + one style card | **~1,150** |
| + `styles/captions.md` | ~2,070 |
| + one snippet | ~2,265 |
| `PROJECT-KNOWLEDGE.md` + router (capability search) | ~28,000 |
| MASTER-LEARNINGS + TAXONOMY + 2 cards | ~7,170 |
| all 137 lessons (do not do this) | **189,729** |


**Only 6 of 137 lessons are verified.** `VERIFIED-INDEX.md` lists which. The other 131 have their
capability inferred from their title — they are leads about what to watch, not rules about what to
build. Never present one as a rule.

**If you are putting this repo into a project's knowledge slot, use `PROJECT-KNOWLEDGE.md` alone.**
It carries the five load-bearing rules, the brand-override block and an explicit task→files table, so
an agent has no reason to invent its own thresholds.


### Routing table — start from the effect you need

| You need | Read |
|---|---|
| To find which lesson supplies a capability | `capabilities.json` — **query it via `QUERIES.md`, never load it** |
| Working `jq`/`python` recipes for the router | `QUERIES.md` |
| To know what a lesson verified vs inferred | `capabilities.json` — check `basis` |
| A ready-to-use brief | `prompts/chhattisgarh-30s.md` (audited) · `prompts/agent-rebuild.md` |
| A text/caption reveal | `patterns/caption-systems.md` · `styles/captions.md` |
| To know which easing encodes which feeling | `patterns/easing-and-emotion.md` |
| To animate Hindi/Devanagari text | `patterns/devanagari-constraints.md` · `styles/clean-bold.md` |
| A specific primitive's code | `snippets/hyperframes/` (4 snippets) |
| Whether a piece is a loop | `loop_analysis.json` |
| Who to learn from next | `CREATORS.md` |
| How many Shorts exist per tier | `SHORTS-INVENTORY.md` |
| Client/market context (CG reels, algorithm, hashtags) | `briefs/chhattisgarh-reels.md` — **market claims, never repo rules** |

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
