# Agent rebuild prompt

The deliverable of every deep read: a single block an agent can paste and build from, with no
access to the source video.

Design principle: **a prompt is a contract, not a description.** Every line must either
constrain the build or supply a number. Prose that a builder cannot act on gets cut.

---

## Required shape

````
ROLE
  You are a motion graphics director building one video.

TARGET
  Runtime:  {runtime}
  Engine:   {HyperFrames (HTML + GSAP) | Remotion (React)}
  Deliver:  {file, codec, resolution, fps}

HARD CONSTRAINTS — violate none
  1. Every animated value is a pure function of time. No setTimeout, no rAF, no Date.now,
     no state that advances on its own.
  2. HyperFrames: register the timeline -> window.__timelines[COMP_ID] = tl.
     Remotion: drive from useCurrentFrame() + interpolate().
  3. Transform-only animation: x/y/scale/rotate/opacity/filter. Never letter-spacing,
     width/height, top/left, or font-size.
  4. Vendor GSAP and every font into vendor/. Declare fonts with @font-face. No CDN.
  5. Complex scripts (Devanagari, Tamil, Bengali): animate word or line, never character.
  6. {palette rule}
  7. {aspect/safe-area rule}

GLOBAL SPEC
  mood:        {3 adjectives}
  lighting:    {direction, hardness, ratio, temperature}
  grade:       {lift/gamma/gain character, contrast, saturation}
  camera:      {the single rule the camera obeys}
  finish:      {grain %, bloom, CA, vignette stops, sharpness}
  palette:     {hex coverage list}
  type system: {families, weights, size ramp, tracking, case, alignment}
  audio:       {LUFS, LRA, VO present?, music genre, SFX inventory with times}

BEAT GRID
  {n} beats. Durations must sum to {runtime}.
  | beat | in–out | duration | palette | focal point | transition out |

BEATS
  For each beat, in the order built:
  ---
  BEAT {n}  {in}–{out}s
  composition: {grid, focal point as 0-1 fractions}
  camera:      {framing, angle, move, axis, magnitude, ease, DOF}
  elements:    {table: element | type | shape/style | pos | size% | depth}
  text:        {exact strings + font/weight/size/tracking/case/colour/position}
  colour:      {hex, accents, gradients with stops and angle, colour animation}
  light:       {direction, hardness, shadow treatment per element}
  texture:     {type, opacity, blend mode}
  motion:      {property | from -> to | start | duration | ease | trigger}
  transition:  {type, duration, what carries the eye}
  audio:       {music state, SFX at exact times, VO line}

FINAL FRAME
  {exact description of the last held frame, hold length, loop verdict}

OVERRIDES
  {see below}

ACCEPTANCE
  - Renders end to end with no linter failures.
  - Rendered duration equals {runtime} within one frame.
  - First and last frame match the described specs.
  - {metric gate, e.g. mean frame delta in range X–Y}
````

---

## The override block

Applied last, and it wins over everything above it. Anything not named here is inherited
unchanged from the analysis — that is the point of listing them explicitly, so an omission is
a deliberate default rather than an accident.

```
OVERRIDES — apply, then keep everything unspecified exactly as analysed
  brand_name:      {replaces every instance of the source brand string}
  logo:            {path or brief; if absent, keep the analysed mark or omit the lockup}
  palette:         {hex set or "keep analysed"}
  text:            {per-beat replacement string map}
  duration:        {new runtime, or "keep"}
  aspect:          {new ratio, or "keep"}
  type_style:      {new family/weight, or "keep analysed"}
  add_element:     {shape/element to introduce, with beat placement}
  remove_element:  {element to drop}
  locale:          {language + script; triggers the complex-script constraints}
```

Rules for overrides:

- **A duration change re-times the beat grid, it does not stretch beats.** Recompute each
  beat proportionally, then snap to the nearest musical sub-beat. Never stretch a 0.5 s beat
  to 0.8 s — it stops reading as a beat.
- **A palette change does not change contrast ratios.** Re-check text/background contrast
  after substitution; the source palette's *relative* luminance structure must be preserved or
  the type stops being legible.
- **A text change can break a layout.** Longer strings overflow; complex scripts are wider at
  the same nominal size. Re-measure, do not assume.
- **An added element must be given a beat and a motion row**, or it will sit still and read as
  a mistake.

---

## Parameter block

What an agent may vary without re-analysing, and the safe range:

| Parameter | Source value | Safe range | Effect of exceeding |
|---|---|---|---|
| beat duration | {x}s | {±40%} | stops reading as a beat |
| push-in magnitude | {x%} | 3–13% | below 3% invisible, above 13% nauseating |
| stagger | {x}s | 0.04–0.18 | above 0.2 reads as lag |
| grain opacity | {x} | 0.15–0.35 | above 0.4 muddy |
| vignette stop | {x}% | 30–55% | below 30% crushes centre |
| easing | {family} | same family only | crossing families breaks the mood |

---

## Anti-patterns that make a rebuild look wrong

These are the failures observed repeatedly in this corpus and in our own builds:

1. **Everything springs.** `back.out` on type, icons and transitions. Pick the curve from the
   material.
2. **A frozen final frame.** Hold with a 1.00 → 1.015 drift, or the render looks stalled.
3. **Text over grain.** Edge contrast collapses; put type on a plate.
4. **Per-character animation on Devanagari.** Silent corruption of conjuncts.
5. **Copying the tutorial's cadence.** A 14 s median cut on a tutorial is not an ad cadence.
6. **Centring everything.** The reference pieces are off-centre on purpose.
7. **Adding cuts to buy energy.** Add motion inside the shot instead.
