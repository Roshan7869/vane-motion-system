# Caption systems

Captions are the highest-leverage element in short-form. 60–90% of viewers watch muted, so
the caption *is* the audio track for most of your audience. Treat it as the primary design
element, not an accessibility afterthought.

## The timing rule that matters most

> **Caption in at the word, out before the silence.**

- Word lands **0–2 frames before** the spoken word, never after. Late captions read as
  broken sync; early captions read as confident.
- Clear the caption **within 3 frames** of the last word ending. A caption that lingers
  into silence steals attention from the next shot.
- Never let a caption cross a cut. Cut, then re-enter.

Measured against our own work: a 32s template ad had captions changing on a 4-second clock
rather than on speech, which is the single clearest signature of a generated template.

## Structure: 1–2 lines, word groups, never a wall

| Property | Value | Why |
|---|---|---|
| Lines | 1–2 max | 3 lines on 9:16 covers the subject |
| Chars per line | ≤ 22 Latin, ≤ 14 Devanagari | Devanagari words are longer per concept |
| Font size | 76–90 px at 1080×1920 | 90 for hooks, 76 for body |
| Weight | 800 | Regular loses to a moving background |
| Line height | 1.2 Latin, 1.5–1.7 Devanagari | marks stack above and below |
| Capsule height | ~15% of frame height (≈288 px at 1920) | smaller disappears on a phone |
| Safe inset | 44 px sides, 148 px bottom | clears platform UI |
| Contrast | ≥ 4.5:1 on the darkest frame behind it | not on the average frame |

## Caption placement — three valid options, pick by footage, not by taste

There is no single correct placement. What matters is whether you can **guarantee contrast on the
worst frame behind the caption**, not the average frame. Three placements, in order of guarantee:

### 1. Capsule (plate behind text) — the guarantee

```css
#capsule{
  position:absolute; left:44px; right:44px; bottom:148px;
  height:288px; border-radius:34px;
  background:rgba(6,9,16,.84);
  border:1px solid rgba(120,200,255,.20);
  box-shadow:0 26px 90px rgba(0,0,0,.72), inset 0 1px 0 rgba(255,255,255,.06);
  display:flex; align-items:center; justify-content:center;
}
```

Holds contrast regardless of what the footage does — a bright window, a dark interior, a busy
crowd. Use when the edit cuts across uncontrolled footage and the caption must survive all of it.

**Costs:** ~15% of a 9:16 frame, and it reads *produced*. On a beauty or lifestyle piece it fights
the image.

### 2. Scrim (partial gradient) — the middle path

```css
#scrim{
  position:absolute; left:0; right:0; bottom:0; height:38%;
  background:linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.38) 45%, transparent 100%);
  pointer-events:none;
}
```

Text sits directly on footage, but a gradient guarantees the bottom third is dark enough. This is
what most cinematic and creator-style references actually do — it looks like direct placement and
behaves like a plate.

### 3. Direct overlay with shadow — the editorial choice

Text straight onto the image, held by a soft drop shadow or a 1 px stroke.

**Preconditions — do not skip these:**

- the caption sits in a zone that is dark or clean **on every frame it appears over**
- you have checked the worst frame, not a representative one
- contrast still measures ≥ 4.5:1 there

Use when the composition is built around the type — a brand piece, a controlled set, a graphic
frame. It is the most confident-looking option and the most fragile: one bright cut and the caption
vanishes.

### How to choose

| Situation | Placement |
|---|---|
| Uncontrolled footage, many cuts, must always read | capsule |
| Real footage, cinematic feel, bottom third can be darkened | scrim |
| Composed frame, type is part of the design | direct overlay + shadow |
| Brand references show direct overlay | **follow the brand** — then verify the worst frame |

**Brand references override this file.** If the references place type directly on footage, that is
the house style; the repo's job is to tell you what to check (worst-frame contrast), not to
overrule the art direction.

Why any of this matters: contrast is measured on the **darkest frame behind the caption**, never the
average. A caption that passes on a mid-tone frame and fails on a white cut is broken, and it is the
single most common caption defect in generated video.

## Emphasis: one word per line, and it must be a colour not a size

Highlight **one** word per line. Two highlights is no highlight.

```html
<div class="cap">अपने <span class="hl">धंधे</span> की सुन लो ज़रा</div>
```

```css
.hl{ color:#FFD60A; }   /* warm accent on a cool palette */
```

Colour beats size-change: a size change reflows the line and (in Devanagari) can push a
matra into the line above. If you must scale, scale the **span** with a transform, never
`font-size`.

## Reveal patterns that work

| Pattern | Motion | Use |
|---|---|---|
| Line lift | `y:+60 → 0`, `power3.out`, 0.55–0.7s | default; works for every script |
| Word cascade | per-word `y:+34 → 0`, stagger 0.06–0.09s | energetic, still script-safe |
| Marker sweep | stroke under the word after it lands | emphasis, "this is the point" |
| Mask roll | clip-path reveal, `linear` | premium, no bounce |
| Slam | `scale:1.4 → 1`, 0.15s, `power4.out` | hooks only, once per video |

## Reveal patterns that fail

| Pattern | Why it fails |
|---|---|
| Per-character typewriter (Devanagari) | severs conjuncts; silent corruption |
| `back.out` / `elastic` on captions | ink does not bounce — instantly reads as template |
| Fade with no movement | invisible against a moving background |
| Word-by-word *opacity only* | reads as a flicker, no direction of reading |
| Rotating/flipping per word | unreadable at speed, and breaks cluster shaping |
| Caption crossing a cut | attention split, feels like a glitch |

## Karaoke highlight

Per-word highlight driven by one scalar, not per-word timelines — so audio can own it.

```js
// one scalar, 0..1 across the caption's duration
tl.to('#cap', { '--hl': 1, duration: capDur, ease: 'none' }, capStart);
```

```css
.cap span { color: rgba(255,255,255,.45); }
.cap span.on { color: #fff; }
```

Why a scalar: if the voiceover is re-timed, you change one number, not N tweens. This is
also the only caption mechanism that survives a re-edit without re-authoring.

## Bilingual layout

Not two stacked Latin lines. Devanagari's visual body is taller and its advance widths
differ at the same nominal px.

- Match by **optical size**, not by px value — same px, Devanagari reads smaller.
- Build vertical rhythm around the **taller** line.
- Hindi-first with secondary English needs one rhythm; genuinely interleaved needs another.
  Decide before building — retrofitting is a rebuild.
- Conjunct-heavy words overflow narrow 9:16 safe areas: allow more side padding.

## Verification

1. Linter gate: contrast ≥ 4.5:1, no text occlusion.
2. Render a line with a conjunct **and** a pre-base matra (`क्षत्रिय को शिक्षा`), read the
   still at full resolution.
3. A native reader checks wording. Models cannot certify copy.
4. Watch muted, on a phone, at arm's length. If you cannot read it there, it is wrong.
