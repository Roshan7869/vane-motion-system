# PROJECT KNOWLEDGE — paste this, not the whole repo

This is the short bundle to put in a project's knowledge slot. It is ~4K tokens. The full repo is
~248K and must not be bulk-loaded.

Repo: https://github.com/Roshan7869/vane-motion-system (public)

---

## What this repo is, and what it is not

It is a **motion-design knowledge base** for two runtimes only — HyperFrames (HTML + GSAP) and
Remotion (React). No After Effects recipes.

It is **not a finished source of truth**. Of 137 lessons:

```
6    verified  — opened frame by frame, with code that runs
131  unverified — capability inferred from the title, nobody has checked
```

Treat the 131 as **leads about what to watch**, never as rules about what to build.

---

## The five rules that are actually load-bearing

Taken from the verified lessons and the patterns files. These are the only ones to apply by default.

**1. Every animated value is a pure function of time.**
HyperFrames captures by seeking; Remotion renders frame N in isolation. Anything driven by
`setTimeout`, `requestAnimationFrame`, `Date.now` or mutable state will desync or render differently
on a re-run.
- HyperFrames: `window.__timelines[compId] = tl` — omitting it costs a 45s timeout per render
  (measured: 48.7s vs 2.7s on the same 2s clip).
- Remotion: `useCurrentFrame()` + `interpolate()`. Never a GSAP timeline, never a CSS animation
  inside Remotion — that is what produces "animation finishes in 1s then black frames".

**2. Animate transforms only.** `x/y/scale/rotate/opacity/filter`. Never `letter-spacing`, `width`,
`height`, `top/left`, `font-size` — they trigger layout and snap to integer pixels, which reads as
stutter under frame capture.

**3. Complex scripts are word-level, never character-level.** Devanagari reorders pre-base matras
and fuses conjuncts. Per-character animation severs clusters and renders wrong text. One `<span>`
per **word**. No uppercase (the script has no case). Line-height 1.5–1.7.

**4. Spring is for plastic, linear is for human.** Pen strokes, wipes and typewriters use `linear`.
Type, cards and captions use `power3.out`. Chips and badges may use `back.out`. Nothing organic
bounces. The fastest tell of a template edit is that everything springs.

**5. A held frame must still move.** Any hold over ~1s needs a 1.000 → 1.015 `sine.inOut` drift.
A completely frozen frame reads as a stalled render.

### Motion classification — never judge by the mean

```
mean ≈ median, both high    -> continuous
mean >> median (>2x), p95 high -> hold-and-burst (stillness is the design)
mean ≈ median, both low     -> static (a defect in short-form)
```

---

## Brand overrides — fill this in, it wins over everything above

```
BRAND NAME:        <fill>
LOGO:              <path or brief>
PALETTE:           <hex set>
TYPE:              <family / weight / tracking>
CAPTION PLACEMENT: <capsule | scrim | direct-overlay>
CAPTION SCRIPT:    <latin | devanagari | mixed>
DURATION / ASPECT: <e.g. 1080x1920, 20s>
BANNED:            <e.g. no elastic easing, no grain, no black fade ending>
```

**Brand references override the repo wherever they conflict.** Specifically: the repo's caption file
offers three placements (capsule / scrim / direct overlay) and does **not** mandate a dark capsule.
If the brand's references show type directly on footage, that is correct for the brand — the repo's
only requirement is that contrast is checked on the **worst frame** behind the text, not the average.

---

## Task routing — which files a task should follow

Give the agent the row, not the repo.

| Task | Read exactly these | Do not read |
|---|---|---|
| Hindi / Chhattisgarh local-business ad | `rules.md`, `styles/clean-bold.md`, `styles/captions.md`, `prompts/chhattisgarh-30s.md` | lessons/ |
| Caption system | `patterns/caption-systems.md`, `styles/captions.md`, `patterns/devanagari-constraints.md` | lessons/ |
| Easing / pacing feel | `patterns/easing-and-emotion.md` | lessons/ |
| Editorial / data-card look | `styles/editorial-card.md` | lessons/ |
| Collage / viral-reel look | `styles/collage-reel.md` | lessons/ |
| 3D camera text | `styles/3d-camera-text.md` | lessons/ |
| SaaS / UI explainer | `styles/saas-ui.md` | lessons/ |
| AI b-roll essay | `styles/ai-broll.md` | lessons/ |
| Rebuilding a reference shot by shot | `templates/shot-breakdown.md`, `prompts/agent-rebuild.md` | lessons/ |
| Finding a capability | `QUERIES.md` — query `capabilities.json`, never load it | lessons/ |
| Whether the corpus covers X at all | `VERIFIED-INDEX.md` → "Known gaps" | — |

**Route with `capability` + `shape` + `pacing`. Never with `emotion`.** 91 of 137 lessons are tagged
`energetic` because the label was auto-derived at scale — filtering on it returns two-thirds of the
corpus and therefore nothing. `QUERIES.md` has the working recipes and the vocabulary.


---

## briefs/ is not knowledge

`briefs/` holds market and client context — platform algorithm claims, regional culture, hashtags,
posting times. **Nothing in `briefs/` is a repo rule.** If you cite something from there, attribute
it as a client or platform claim, never as measured technique.

---

## Known gaps — say so instead of improvising

| Capability | Status |
|---|---|
| **wave motion** | **0 lessons. Absent.** Build from first principles |
| **Hindi / Devanagari captions** | 2 lessons, both Final Cut Pro, neither Devanagari |
| data-viz | 3 lessons, 1 verified (a single bar chart) |
| lower-thirds, liquid-glass, logo-animation | 1 lesson each, unverified |
| transitions, camera-and-depth | 4 and 2, mostly unverified |

If a task needs something from this list, the correct move is to say the repo does not cover it, not
to extrapolate from an adjacent lesson.

---

## How to use it without inventing rules

1. **Never cite a rule that is not in this file or in a named file above.** If a threshold is needed
   and is not stated, say "this number is my own, not from the repo."
2. **Never present an unverified lesson as a rule.** Check `VERIFIED-INDEX.md` first.
3. **Never bulk-load `lessons/`.** Filter `capabilities.json`, take `basis == "visual-read"` first,
   open at most 3.
4. **The repo does not persist between chats.** Re-attach this file or re-clone each session.
