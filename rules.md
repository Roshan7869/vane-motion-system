# rules.md — the minimum a builder must know

Load this before any style card. ~450 tokens.

**1. Every animated value is a pure function of time.**
HyperFrames captures by seeking; Remotion renders frame N in isolation.
- HyperFrames: `window.__timelines[compId] = tl` — omitting it costs a 45s timeout per render
  (measured 48.7s vs 2.7s on the same 2s clip).
- Remotion: `useCurrentFrame()` + `interpolate()`. Never GSAP or CSS animation inside Remotion —
  that is what produces "animation finishes in 1s then black frames".

**2. Transform-only animation.** `x/y/scale/rotate/opacity/filter`.
Never `letter-spacing`, `width`, `height`, `top/left`, `font-size` — they trigger layout and snap to
integer pixels, which reads as stutter under frame capture.

**3. Complex scripts are word-level, never glyph-level.** Devanagari reorders pre-base matras and
fuses conjuncts. One `<span>` per word. No uppercase (no case exists). Line-height 1.5–1.7.
Per-character animation renders wrong text while still looking like text.

**4. Easing comes from the material, not the mood.**
```
pen stroke, wipe, typewriter     linear
type, card, caption              power3.out
chip, badge, tick                back.out(2)
exit, wind-up                    power2.in
never on type or captions        elastic, back
```
The fastest tell of a template edit is that everything springs.

**5. A held frame must still move.** Any hold over ~1s needs a 1.000 → 1.015 `sine.inOut` drift.
A completely frozen frame reads as a stalled render.

## Classify motion from median and p95, never the mean
```
mean ≈ median, both high        continuous
mean >> median (>2x), p95 high  hold-and-burst  (the stillness IS the design)
mean ≈ median, both low         static          (a defect in short-form)
```

## Never
- Bulk-load `lessons/` (189,729 tokens). Load one style card.
- Cite a rule that is not in `rules.md` or the loaded card. If you need a threshold and it is not
  stated, say "this number is mine, not from the repo."
- Present an unverified lesson as a rule. Only 6 of 137 are visually verified.
