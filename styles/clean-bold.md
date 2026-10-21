# Style card — clean-bold (Hindi / Chhattisgarh local-business)
`use_when`: 9:16 Hindi/Devanagari local-business ad, CTA-led, price tags, pill categories.
**Provenance: OUR OWN BUILD, not a reverse-engineered reference.** Built and rendered locally:
`cg-reel-30s-final.mp4` — measured 1080×1920, 30 fps, exactly 30.000 s, 5.7 MB. Spec supplied by
the client; execution verified. It is the only card here whose numbers come from a render we shipped.

```
shape 1080x1920 (9:16) · 30.0s · 6 scenes · 30fps · H.264 · -g 30 -keyint_min 30
palette --bg #0A0A0A · --teal #00E5CC · --yellow #FFD60A · ink #F5F7FA
type    Noto Sans Devanagari Regular + Bold (bundled .ttf, NOT a CDN)
audio   95 BPM folk-fusion · LUFS -14 · VO -3 dB above music
```

**Font is mandatory, not optional.** `@font-face` must point at the bundled
`NotoSansDevanagari-{Regular,Bold}.ttf`. `src:local(...)` is rejected by the HyperFrames linter, and
a missing face silently falls back to a generic one — which breaks every matra.

**Emotion → easing (this card's own mapping, from the shipped build)**

Use these five labels — they exist in this card, not in the corpus's `emotion` values.

```
urgent        power4.out   0.40s   scale 1.05->1.00        hooks only
trust         power3.out   0.80s   parallax 5%             shopkeeper, authority
proud         back.out(2)  0.08s   pop 1.10->1.00          pills, ticks, category
curious       power2.out   0.50s   y 20->0                 chips, search, reveal
awe           expo.out     1.20s   pulse 0.8->1.5 loop     map, expansion
```

**Do not use `"joyful"` as a query value** — it does not exist in `index.json`. The corpus's
`emotion` vocabulary is: analytical, aspirational, calm, cinematic, confident, deliberate,
editorial, energetic, hypnotic, loud, meme-literate, neutral, opinionated, product-led, reassuring,
reflective, technical, urgent, weary. "Joyful" maps to `energetic` + `proud` easing.

**Motion spec**
```
hook zoom      scale 1.05 -> 1.00, power4.out, 0.40s   (hooks only, never mid-piece)
parallax       x/y 5%, power3.out, 0.80s
pop            scale 1.10 -> 1.00, back.out(2), 0.08s  (80ms)
pulse          scale 1.00 -> 1.04 -> 1.00, sine.inOut, 2.00s loop
typewriter     30 ms/char, WORD-level only
scene budget   ONE effect per scene. Two effects = it reads as a template
end hold       2.5s on the final CTA frame
transitions    cut-on-action, whip pan, match cut, zoom-into-object, morph, pins-collapse-to-loop
```

**Code skeleton**
```css
:root{ --bg:#0A0A0A; --teal:#00E5CC; --yellow:#FFD60A; --ink:#F5F7FA; }
@font-face{ font-family:"NotoDev"; src:url("vendor/fonts/NotoSansDevanagari-Bold.ttf") format("truetype"); font-weight:700; }
body{ background:var(--bg); }
.hi{ font-family:"NotoDev"; font-weight:700; line-height:1.6; }   /* 1.5-1.7 for Devanagari */
.hl{ color:var(--yellow); }                                       /* colour, never font-size */
```
```js
const tl = gsap.timeline({ paused: true });
tl.fromTo('#hook', {scale:1.05}, {scale:1.0, duration:0.40, ease:'power4.out'}, 0);
window.__timelines['cg-reel'] = tl;          // REQUIRED or 45s timeout per render
```

**Devanagari — non-negotiable**
- **Word-level only.** One `<span>` per word. Per-character animation severs conjuncts and renders
  wrong text while still looking like text.
- No uppercase. The script has no case.
- Line-height 1.5–1.7 — matras stack above and below.
- Caption highlight is **colour**, never a size change: a size change reflows the line and can push
  a matra into the line above.
- Verify with a native reader on a still. Two vision passes disagreed on the same correct frame in
  this project (`मोर` vs `मेरे`) — a model that cannot read it cannot certify it.

**Caption placement** — `direct overlay` is the house style for this brand (see `styles/captions.md`).
That is valid **only** with a worst-frame contrast check: measure the darkest frame behind the text,
not the average.

**Do** — one accent colour per scene; teal for progress/structure, yellow for the one keyword;
bundle the font; hold the CTA frame.
**Never** — `src:local()` fonts; per-glyph animation; more than one effect per scene; a blurred-border
filler instead of native 9:16; sparse keyframes (re-encode with `-g 30` or seeks freeze).

**Caveats from the actual build** — `libx264` needs even dimensions (1080×1275 failed silently,
zero-byte output; 1080×1270 worked). Sparse keyframes made the render 1m13s instead of 55.6s.
