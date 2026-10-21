# Style card — collage-reel
`use_when`: 9:16 short-form, loud, meme-literate, scroll-stopping. Verified source: `ISV9R4fYWik`.

```
shape 9:16 · 10.0s · 2 cuts at 1.1 / 8.6 · continuous
mean 43.97 median 42.37 p95 83.12 static 0.00    <- never rests
palette #1c1e1d 26% | #394a5b 24% | #958e89 21% | #d7d7d3 15% | #721c19 14%
```

**The formula** — collage, not motion design. Constant churn inside shots; cuts are rare and brutal; the palette jump *is* the transition.
Structure: **1.1s interrupt → 7.5s body → 1.4s loop-out.**

**Layer stack (this is the technique)**
```
distressed bg → cutouts with HARD shadow (0 blur) → paper shapes
  → oversized type on a solid plate → grain (multiply .28) → vignette
```

**Type** — weight 900, tracking -6px, 190px, on a solid white plate. One line. Centred.

**Motion**
```
churn      scale 1.00→1.09 across the shot, ease none
glitch     slice displacement, 2-4 FRAME cadence, not a smooth tween
cut        two sets, no transition object
grain      0.24-0.32 opacity, mix-blend multiply
```

**Code skeleton**
```css
.cutout{ position:absolute; left:50%; bottom:0; transform:translateX(-50%); height:62%;
         filter:drop-shadow(18px 18px 0 rgba(0,0,0,.35)); }  /* HARD: zero blur */
.grain{ position:absolute; inset:0; mix-blend-mode:multiply; opacity:.28; }
.vignette{ position:absolute; inset:0;
           background:radial-gradient(ellipse at 50% 46%, transparent 38%, rgba(0,0,0,.62) 100%); }
```
```js
tl.set('#a', {opacity:0}, 1.1); tl.set('#b', {opacity:1}, 1.1);   // hard cut
gsap.fromTo('#b', {scale:1.0}, {scale:1.09, duration:6.4, ease:'none'});  // churn
```

**Do** — one palette world per shot; a pun or a number on a plate; grain over everything.
**Never** — `sine` or `power2.out` (smoothness reads corporate and kills it); a blurred shadow (reads designed, not cut out); more than 2 cuts in 10s.
**Devanagari** — stacked text-shadow extrusion fuses conjuncts at 6+ stops. Cap at 3-4 stops, never under 60px. Rasterise and extrude the texture instead.
Snippet: `snippets/hyperframes/collage-stack.js`
