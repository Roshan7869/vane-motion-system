# Master learnings

Rules that have held across every video examined. This file is the distilled layer — if a
lesson in `lessons/` contradicts something here, this file wins until proven otherwise.

Every rule is stated as **rule → why → how to apply**. No rule here exists without a
failure it prevents.

---

## 1. Motion must be a pure function of time

**Why.** HyperFrames captures by *seeking* to a time and screenshotting. Remotion renders
frame N in isolation. Neither replays your timeline in real time. Anything driven by
`setTimeout`, `requestAnimationFrame`, `Date.now()`, or mutable state that advances
independently will desync, freeze, or render a different result on a re-run.

**Apply.** Express motion as `f(t) → style`. In GSAP, build a paused timeline and register
it so the renderer can seek it:

```js
window.__timelines = window.__timelines || {};
window.__timelines['<composition-id>'] = tl;   // id must match data-composition-id
```

Skipping that registration costs a **45-second timeout on every render** — measured:
48.7 s vs 2.7 s on the same 2-second clip.

In Remotion, drive from `useCurrentFrame()` and `interpolate()`. Never `useState` as a clock.

---

## 2. Animate transforms, never layout properties

**Why.** `letter-spacing`, `width`, `height`, `top`, `left`, `font-size` trigger layout and
snap to integer device pixels. Under frame-by-frame capture that reads as stutter, and on
an ease-out tail it is unmistakable.

**Apply.** Only `x`, `y`, `scale`, `rotate`, `opacity`, `filter`. The linter enforces this
(`gsap_non_transform_motion`) — treat a failure as a real defect, not a nag.

Measured case: a `letterSpacing` tween was rejected and replaced with `{x: -14, scale: 1.015}`.
Same visual intent, zero stutter.

---

## 3. Complex scripts are word-level, never character-level

**Why.** Devanagari reorders pre-base matras and fuses conjuncts. Per-character animation
severs clusters and renders wrong text — and it still looks like text to a non-reader.

**Apply.** One `<span>` per **word**. Never per glyph. Never `text-transform: uppercase` on
Devanagari (no case exists). Line-height 1.5–1.7. Full detail in
`patterns/devanagari-constraints.md`.

Corollary: the only valid acceptance test is a **native reader looking at a still**. Two
independent vision passes disagreed on the same correctly-rendered frame in this project
(`मोर` vs `मेरे`). A model that cannot read it cannot certify it.

---

## 4. Spring is for plastic, linear is for human

**Why.** Overshoot encodes elasticity. Ink does not bounce off paper; light does not bounce
onto a screen. A plastic chip does.

**Apply.**

| Object | Curve |
|---|---|
| Pen stroke, wipe, typewriter | `linear` / `none` |
| Headline, card, caption | `power3.out` |
| Chip, pill, badge, tick | `back.out(2)` |
| Logo sting, single accent | `elastic.out(1, 0.5)` |
| Held frame, ambient | `sine.inOut` |
| Exit, wind-up, tension | `power2.in` |

The fastest tell of a template edit is that **everything springs**. Pick the curve from the
material, not from the mood.

---

## 5. Stagger is rhythm; a clean queue is a tell

**Why.** Sequential starts with no overlap read as a machine processing a list. Humans and
good motion design overlap.

**Apply.** Drawing/stroke sequences: **30–40% overlap** (0.9 s tween on a 0.55 s stagger).
UI groups: 0.05–0.14 s. Text lines: 0.12–0.18 s. Never stagger more than 6 items at once —
split into a second group.

---

## 6. Tutorial cadence is not ad cadence

**Why.** Measured median cut interval on a 5m27s tutorial: **14.0 s** — one concept per
shot. Copying that into a 30 s ad produces a slideshow.

**Apply.** Ad edits run 2–4 s per beat and hold only at the CTA. Copy the *shape* of a
tutorial (fast opening montage, then long explanation) — never its absolute numbers. Take
cadence from Shorts (see below), not from long-form.

---

## 7. A held frame must still move

**Why.** "Hold the CTA for 2.5 s" is a reading requirement, not permission to freeze. A
frame that goes completely still reads as a stalled render.

**Apply.** On any hold longer than ~1 s, add a 1.00 → 1.015 `sine.inOut` scale drift and
let one element breathe (a glow, a pulse). Measured failing case: the original ad's last
5.23 s was `in-place, 0.0px` — the end card was dead exactly where the viewer reads.

---

## 8. The largest motionless stretch is where you lose the viewer

**Why.** Measured across a 32 s template ad: **86.3% of frames moved less than 1.0** on a
0–255 scale (median delta 0.133). It was a slideshow with a progress bar.

**Apply.** Track `static_ratio` as a quality metric. Above ~0.6 on a short-form piece means
you have a slideshow, not an edit. Every shot should carry at least a 1.05 → 1.13 push-in.

---

## 9. Vendored assets, no CDN at render time

**Why.** A render that depends on a CDN fails when the CDN is slow, and fails confusingly
when it is down. Renders must be reproducible offline.

**Apply.** Vendor `gsap`, `three`, `lottie` and every font into `vendor/`. Bundle the font
and declare it with `@font-face` — HyperFrames rejects a bare family name
(`font_family_without_font_face`) and will otherwise fall back to a generic face.

---

## 10. Emotional parameters are numbers

**Why.** "Make it feel premium" is not executable. A curve from audio analysis is.

**Apply.** Drive these from a measured valence/arousal signal, clamped:

```js
const dur     = 0.75 - 0.45 * arousal;      // 0.30 .. 0.75 s
const ease    = arousal > 0.66 ? 'power3.out'
              : valence > 0.55 ? 'sine.inOut'
              : 'power2.out';
const stagger = 0.18 - 0.11 * arousal;      // 0.07 .. 0.18 s
```

One curve per **scene**, not per element — per-element curves destroy coherence.

---

## Open questions this corpus has not answered

- Whether karaoke per-word highlight survives Devanagari at small sizes on mobile
  recompression. Needs a real phone test.
- Minimum legible word-highlight duration for Hindi (words are longer than English, so the
  per-word dwell should be longer — no measurement yet).
- Whether `sine.inOut` drift on a 9:16 held frame is perceptible at 24 fps as opposed to
  30 fps.
