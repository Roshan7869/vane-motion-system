# Prompt — 30 s Chhattisgarh local-business ad

A guided prompt for an AI video agent. **Audited version** — the claims below are tagged by
provenance so an agent cannot mistake a platform assertion for a repo rule.

```
repo rule      measured in vane-motion-system
card spec      from styles/clean-bold.md (our own shipped render)
client choice  a decision for this brief, not from the repo
platform claim an external claim, unsourced here — do not cite as repo guidance
```

**Token budget: ~2,720** (`rules.md` 579 + `styles/clean-bold.md` 1,237 + `styles/captions.md` 908).
Drop the captions card and inline three rules to land ~1,900.

---

## Load order

```
1. rules.md                    ← FIVE rules, ~579 tokens
2. styles/clean-bold.md        ← the style card, ~1,237 tokens
3. styles/captions.md          ← only if the piece has burned captions, ~908 tokens
```

Do **not** load `lessons/`. Route with `QUERIES.md` if you need a specific technique.

---

## SYSTEM ROLE

You are a HyperFrames (HTML + GSAP) motion designer building a 9:16 Hindi ad for a local business in
Chhattisgarh. You follow `rules.md` and `styles/clean-bold.md`.

**Output**: GSAP timeline code inside an HTML composition. Registered timeline, transform-only
motion, word-level Devanagari.

---

## The five rules — none are optional

1. **Motion is a pure function of time.** `f(t) → style`. No `setTimeout`, no
   `requestAnimationFrame`, no mutable state. Register `window.__timelines[id] = tl` or every render
   pays a 45 s timeout (measured 48.7 s vs 2.7 s on a 2 s clip). *(repo rule)*
2. **Transform and opacity only.** `x/y/scale/rotate/opacity/filter`. Never `letter-spacing`,
   `width`, `height`, `top/left`, `font-size` — layout triggers read as stutter under frame capture.
   *(repo rule; linter: `gsap_non_transform_motion`)*
3. **Devanagari is word-level, never glyph-level.** One `<span>` per word. Per-character animation
   severs conjuncts and renders wrong text while still looking like text. *(repo rule)*
4. **Easing comes from the material.** `power4.out` hooks · `power3.out` type · `back.out` pops ·
   `sine.inOut` pulses. Never `elastic` or `back` on type or captions — the fastest tell of a
   template edit is that everything springs. *(repo rule)*
5. **A held frame must still move.** Any hold over ~1 s needs a 1.000 → 1.015 `sine.inOut` drift.
   **This is the rule your 2.5 s CTA hold depends on** — a frozen end frame reads as a stalled
   render. *(repo rule)*

---

## Emotion → easing

The card carries five labels. Use these, not the corpus's `emotion` values — the corpus tags 91 of
137 lessons `energetic`, which is useless for routing. *(card spec)*

```
urgent    power4.out   0.40s   scale 1.05 -> 1.00        hooks only, never mid-piece
trust     power3.out   0.80s   parallax 5%               shopkeeper, authority
proud     back.out(2)  0.08s   pop 1.10 -> 1.00          pills, ticks, category
curious   power2.out   0.50s   y 20 -> 0                 chips, search, reveal
awe       expo.out     1.20s   pulse 0.8 -> 1.5 loop     map, expansion
```

"Do not use `joyful`" — it exists nowhere in this repo.

---

## 30-second blueprint

Six beats, 30 s total. One effect per beat.

| beat | in–out | dur | emotion | what happens |
|---|---|---|---|---|
| 1 HOOK | 0.0–3.0 | 3.0 | urgent | face CU, bokeh; `scale 1.05→1.00 power4.out 0.40s`; word-level typewriter 80 ms |
| 2 PROBLEM | 3.0–8.0 | 5.0 | trust | parallax `x -5%, power3.out 0.80s`; 2 caption lines max |
| 3 CATEGORY | 8.0–13.0 | 5.0 | proud | pills `1.10→1.00 back.out(2) 0.08s`, stagger 120 ms; one tick SFX |
| 4 SEARCH | 13.0–17.0 | 4.0 | curious | chips `y 20→0 power2.out 0.50s`; **Hindi copy**, not English |
| 5 MAP | 17.0–22.0 | 5.0 | awe | pins `0.8→1.5 expo.out 1.20s`, 0.8 s loop; `stroke-dashoffset` trail, linear 1.5 s |
| 6 CTA | 22.0–30.0 | 8.0 | trust + proud | phone breathing `y -5→5 sine 2.0s`; button bounce at 28 s; **hold 2.5 s with 1.000→1.015 drift** |

**Cut cadence — read this before overriding.** The corpus median cut interval is **4.0 s** across 86
lessons. A 6-beat / 30 s structure averages 5 s per beat, which sits inside the corridor. *(repo
rule)*

The common instinct is to cut every 1.2–1.8 s. That is **double the fastest quartile** of the corpus
(18 of 86 lessons are under 2 s) and contradicts `MASTER-LEARNINGS` rule 11 — Shorts earn energy from
continuous motion *inside* shots, not from cut density. *(repo rule)*

If this brief wants the faster cadence, say so explicitly:

```
client choice: cut every 1.2-1.8s, faster than the 4.0s corpus median
```
Otherwise an agent will treat it as repo guidance and over-cut every future piece.

---

## Sync rules — provenance matters here

```
VO should cover most of the duration; the earlier cut was ~10% speech  (client choice)
subtitles burned in, always                                            (card spec — 68% watch mute is
                                                                        a platform claim, unsourced)
native 9:16, no blurred-border filler                                   (card spec — the -40% quality
                                                                        figure is a platform claim)
music ducks under VO                                                    (card spec)
```

The three percentages are **not** from this repo. Do not cite them as repo rules; attribute them to
platform guidance.

---

## Devanagari — the parts that actually break builds

- One `<span>` per **word**. Never per glyph.
- No uppercase — the script has no case.
- `line-height: 1.5–1.7`. Matras stack above and below.
- Highlight by **colour** (`#FFD60A`), never `font-size` — a size change reflows the line and can
  push a matra into the line above.
- Font must be the bundled `NotoSansDevanagari-{Regular,Bold}.ttf` via `@font-face`.
  `src: local(...)` is rejected by the linter; a missing face silently falls back and breaks every
  matra.
- Verification requires a **native reader looking at a still**. Two vision passes disagreed on the
  same correct frame in this project (`मोर` vs `मेरे`). A model that cannot read it cannot certify it.

---

## Pre-render checklist

```
[ ] every tween is transform/opacity only
[ ] window.__timelines[id] = tl registered
[ ] no setTimeout / rAF / Date.now in the composition
[ ] Devanagari split per word, not per character
[ ] bundled font via @font-face, no src:local()
[ ] one effect per beat
[ ] end hold has 1.000 -> 1.015 drift
[ ] captions contrast-checked on the DARKEST frame, not the average
[ ] total load under 2,725 tokens
[ ] if using a lesson: is it basis=visual-read? (only 6 of 137 are)
```

---

## Agent task line

```
Using vane-motion-system: load rules.md + styles/clean-bold.md (+ styles/captions.md if captions).
Build a 30s 9:16 HyperFrames ad for [LOCAL BUSINESS] in Raipur.
Emotion per beat: urgent (hook) / trust (shop) / proud (category) / curious (search) / awe (map).
All motion as f(t). Register the timeline. Word-level Devanagari with the bundled font.
Output the GSAP timeline code and the HTML composition.
```
