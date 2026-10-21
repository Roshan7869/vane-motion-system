# Style card — saas-ui
`use_when`: calm technical product/feature reel; "engineered", not sold. Verified source: `HVTuxncA9JU`.

```
shape 9:16 wrapper + 16:9 content band · 19.0s · 2 cuts at 1.10 / 5.60
mean 8.36 median 2.95 p95 22.9 static 0.243   <- quiet
palette #131314 86% | #d1cff0 6% | #3d7cfa 3% | #6f6c7c 3% | #e93be7 2% · gold #FFD700 once
audio -16.98 LUFS, LRA 19.1 (real dynamics)
```

**The letterbox is structural.** Measured: 369px flat bands top and bottom leave a 342px band in a 608px frame = **exactly 16:9**. Content never escapes the band. Beat 1 only is full-bleed.

**Motion — 6 beats, 2 hard cuts**
```
b1  static title card, delta 0.00 exactly        <- a card, not an animation
b2  orbs drift + scale 0.6→1.0, sine.inOut 2.2s
b3  3x3 card grid, stagger 0.05s, then HOLD (deltas 1-4)
b4  padlock silhouette on white radial bloom, monochrome ONLY
b5  orb + 5 gold stars, slow bloom
b6  "99.9%" + pill bar, frozen (deltas 0.55-1.14)
```

**Code skeleton**
```css
.band{ position:absolute; left:0; right:0; top:369px; height:342px; overflow:hidden; }
.b1{ position:absolute; inset:0; }        /* the only full-bleed beat */
```
```js
tl.set('.b1', { opacity: 0 }, 1.10); tl.set('.b2', { opacity: 1 }, 1.10);   // hard cut
tl.fromTo('.b3 .card', {scale:.92,opacity:0}, {scale:1,opacity:1,duration:.5,stagger:.05,ease:'power2.out'}, 5.60);
```

**Do** — `sine.inOut` / `power2.out` only; one accent per beat; gold exactly once; hold the one word you actually teach (~2.8s).
**Never** — `back.out` or `elastic`; a camera or 3D transform (there is none); grain or chromatic aberration.
**Devanagari** — `SIP Trunking` becomes a transliteration and will outgrow its card. Re-measure.
Snippet: `snippets/hyperframes/letterbox-band.js`
