# Shot breakdown template

The required structure for a deep-read lesson. A lesson that skips a field must say
`n/a — <reason>`; it may not silently omit. The purpose is that another creator can rebuild
the video without seeing it.

Two rules govern the whole document:

1. **Every number is marked `measured` or `judged`.** Measured = derived from pixels or audio
   by the pipeline. Judged = read visually by a model or a human. Never blend them silently.
2. **Cover the entire duration.** Frames must span the full runtime including the final frame.
   A breakdown that only describes the opening is not a breakdown.

---

## Header block

```
id / source_url / form / duration_s / resolution / aspect / fps / codec / bitrate
audio: codec · LUFS · true peak · LRA
measured: cuts · median_cut_s · mean_frame_delta · static_ratio · loop_period_s?
```

---

## 1. Motive — top line

One paragraph. What is this video *for*, who is it aimed at, and what does it want the viewer
to do or feel. Written before the shot list, because it decides what matters in the shots.

---

## 2. Global specification

Compressed, because it applies to every beat below.

| Field | Value |
|---|---|
| Mood | three adjectives, no more |
| Lighting | key/fill logic, direction, hardness, colour temperature |
| Colour grading | lift/gamma/gain character, contrast curve, saturation strategy |
| Camera language | the one rule the camera obeys across the piece |
| Finish quality | grain, bloom, chromatic aberration, vignette, sharpness, compression artefacts |
| Resolution / aspect | e.g. 1080×1920 (9:16) |
| FPS | and whether it is a real choice or an upload artefact |
| Duration | total, and the beat grid it follows |
| Palette | 3–5 hex values with coverage % |
| Typography system | families, weights, size ramp, tracking, case, alignment |
| Audio | LUFS, LRA, whether there is a voiceover, music genre, SFX inventory |

---

## 3. Shot-by-shot breakdown

One block per beat. Repeat for every beat; the blocks must tile the duration with no gaps.

### Beat N — `START – END s` (`duration`, `% of runtime`)

**Composition** — the underlying grid: rule of thirds / centre / golden / asymmetric /
full-bleed. Where the focal point sits, expressed as a fraction of frame (e.g. `0.38, 0.62`).

**Camera** — framing (ECU/CU/MS/WS/EWS), angle (eye/low/high/overhead/dutch), height,
distance, and the move: type, axis, magnitude, duration, easing. Depth of field: aperture
feel, what is in focus, falloff. If the camera does not move, say so — a static camera is a
decision, and it is the most common defect in template edits.

**Subject / object inventory** — one row per visible element:

| # | element | type | shape / style | position (x,y as 0–1) | size (% frame) | depth (z) | notes |
|---|---|---|---|---|---|---|---|
| 1 | | photo cutout / icon / illustration / 3D / UI / type | | | | fg/mid/bg | |

For icons and UI, describe them precisely enough to redraw: stroke weight, corner radius,
fill vs outline, and what the icon depicts. "A settings icon" is not a description; "outline
gear, 2 px stroke at 1×, 24 px box, 6 teeth" is.

For 3D elements: geometry, material (matte/satin/gloss/metal), lighting rig, extrusion depth,
bevel profile.

**Text** — exact strings, verbatim, including punctuation and any misspellings in the source
(reproduce them and flag them; do not silently fix). Per string:

| text (exact) | role | font | weight | size px | tracking | case | colour | position |
|---|---|---|---|---|---|---|---|---|

Size hierarchy: state the ratio between the largest and smallest type on screen.

**Colour** — palette for this beat specifically, approximate hex, plus background accents and
gradients (type, angle, stops). Note any colour *animation*: what changes hue, over what
duration, and on what trigger.

**Lighting and shadow** — direction, hardness, and the shadow treatment per element. Is it a
hard offset shadow (0 blur) or a soft cast? Contact shadow or floating?

**Texture** — grain, paper, halftone, noise, scan lines, glass, blur. Opacity and blend mode.

**Motion** — every animated property, as a table:

| property | from → to | start | duration | easing | trigger |
|---|---|---|---|---|---|

This table is the thing an agent actually builds from. Vague prose here is what makes a
rebuild look wrong.

**Transition into the next beat** — cut / dissolve / whip / match cut / morph / scale-through,
its duration, and what carries the eye across (a shape, a colour, a movement vector). If it is
a hard cut, say what makes the cut land: a palette jump, a positional match, or an audio hit.

**Audio for this beat** — music state, any SFX with its exact time, voiceover line if any.

---

## 4. Visual effects timing

Every effect, with in/out points, so none can drift:

| effect | in | out | duration | target | notes |
|---|---|---|---|---|---|

---

## 5. Final frame spec — the last held frame

The final frame is what the viewer is left with and what a loop returns to. Describe it fully:

- exact text and its position
- composition and focal point
- whether it is a still hold or still drifting
- how long it is held
- whether it loops cleanly back to frame 0, and if not, what breaks

State the loop verdict explicitly: `loops cleanly` / `does not loop` / `truncated mid-beat`,
with the measured evidence (frame-identity distance, or the cut-interval arithmetic).

---

## 6. Rebuild prompt — ready to paste

The deliverable. A single self-contained block an agent can consume with no other context. See
`prompts/agent-rebuild.md` for the required shape and the override block.

---

## 7. Caveats

Mandatory. Where the technique breaks: on complex scripts, at small sizes, on a slow CPU, in a
different aspect ratio, or when the brand palette is substituted. A lesson with no caveats has
not been examined, only described.
