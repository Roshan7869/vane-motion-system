# Devanagari and complex-script constraints

The hardest boundary in this repo. Half the motion vocabulary that works on Latin text
**cannot be applied to Devanagari**, and the failures are silent — they look like text to
anyone who cannot read the script.

Read this before generating any Hindi, Marathi, Nepali, Bengali, Tamil, Arabic or Thai
caption.

## Why it breaks

Devanagari is a complex script. Three mechanisms fight per-character animation:

1. **Pre-base matras.** The i-matra (ि) renders to the **left** of the consonant it
   logically follows. Logical order and visual order differ.
2. **Conjuncts.** क्ष, त्र, ज्ञ fuse multiple consonants into one shaped cluster that must
   be rendered as a unit.
3. **Stacked marks.** Half-forms and bearing marks above and below the baseline.

Split the string and you split the cluster. The renderer then draws dotted-circle
fallbacks or wrong glyph order — and it still *looks like text* at a glance.

## The rules

### Rule 1 — animate the word or the line, never the character

```html
<!-- WRONG: severs conjuncts -->
<span class="w">क</span><span class="w">्ष</span>

<!-- RIGHT: the whole word is the unit -->
<span class="w">क्षत्रिय</span>
<span class="w">को</span>
```

Same for Remotion — one `<span>` or `<div>` per **word**, mapped from a word array.

### Rule 2 — never stroke-reveal a glyph

A `stroke-dashoffset` reveal on Devanagari animates the whole shaped cluster as one path,
which is technically safe, but the *result* reads as a glitch: a reader expects the word to
appear, not to be traced. Pen-tracing is a Latin/monogram idiom.

For the "being written" feeling in Hindi, draw a **marker stroke underneath** the word
instead. The word appears; the stroke confirms it.

### Rule 3 — never use `text-transform`

Devanagari has no case. `uppercase` is a no-op at best and can trigger fallback behaviour.
Design caption styles that do not depend on case.

### Rule 4 — line height needs headroom

Marks stack above and below. Use **1.5–1.7** line-height where 1.2 looks correct in Latin.
A tight Devanagari line clips its own matras.

### Rule 5 — font stack

Bundle the font. Never rely on a system font you have not verified.

```css
@font-face {
  font-family: "NotoDev";
  src: url("./vendor/fonts/NotoSansDevanagari-Bold.ttf") format("truetype");
  font-weight: 700 900;
  font-display: block;
}
.hindi { font-family: "NotoDev", sans-serif; }
```

- Noto Sans Devanagari covers `hi, mr, ne, sa, hne` (hne = Chhattisgarhi).
- Ship **Regular and Bold**. Synthetic bold smears conjuncts.
- HyperFrames' linter rejects a bare `font-family: "Noto Sans Devanagari"` with no
  `@font-face` (`font_family_without_font_face`) — it will silently fall back otherwise.

### Rule 6 — bilingual is not two stacked Latin lines

Devanagari's visual body is taller and its advance widths differ at the same nominal size.

- Match by **optical size**, not by px value.
- Build the vertical rhythm around the taller line, or the Latin line crowds it.
- Conjunct-heavy words overflow narrow 9:16 safe areas — allow more side padding.

## What survives, what does not

| Technique | On Latin | On Devanagari |
|---|---|---|
| Word-level fade/slide | yes | **yes** |
| Line-level reveal | yes | **yes** |
| Per-character typewriter | yes | **no — severs clusters** |
| Stroke / pen reveal on glyphs | yes | **no — reads as glitch** |
| Marker stroke under a word | yes | **yes** |
| `text-transform: uppercase` | yes | **no-op / unsafe** |
| Scale pop per word | yes | **yes** |
| Letter-spacing animation | avoid (layout prop) | avoid (layout prop) |
| Camera move on the whole block | yes | **yes** |
| Karaoke highlight per word | yes | **yes** |

## Verification is not optional

The only acceptance test that works: **a native reader looks at a still frame.**

Model-based reading is unreliable here. In this project, two independent vision passes
disagreed on `मोर` vs `मेरे` and `सर्च` vs `सच्च` on the same correctly-rendered frame. If a
model cannot reliably read it, it certainly cannot certify it.

Practical check that does work without a speaker: render a line containing **both a
conjunct and a pre-base matra** — `क्षत्रिय को शिक्षा` — at full resolution and confirm the
conjunct is joined, the ि sits left of its consonant, and there are no dotted circles or
tofu boxes. That catches font-coverage failures. It does not catch wording failures.
