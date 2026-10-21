# Style card — editorial-card
`use_when`: 16:9 or 9:16 product/demo/news piece with data, a stat, or a claim. Verified source: `aNZeXQmVOjQ`.

```
shape 9:16|16:9 · 66.5s · 10 cuts median 8.18s · hold-and-burst
mean 26.17 median 4.71 p95 108.35 static 0.091   <- mostly STILL, few violent moves
palette #060604 card 29% | #eef7f6 canvas 28% | pastels cyan #25D5F2 mint #50E3B3 pink #F5A8E8 lavender #C18AFF
```

**Layout** — large rounded near-black card (`r`≈3% width) inset 2% on a white canvas. Pastel shapes live on the canvas, peeking at the edges only. Never put them inside the card.

**Type — exactly two registers, ~10:1**
```
micro:  caps, tracking +12%, weight 700, #8E8E93, 14px   → "FIG. 01" "IPO · JUNE" "UBS PRICE TARGET"
display: weight 900, tracking -2%, white, 96-132px      → "$210" "WEEK 1? IT ROCKETS"
```
A third mid-size weight turns the card into a slide deck. This is the main failure mode.

**Motion**
```
card entry   opacity 0→1 + y +40→0, power3.out, 0.5s
hold         8-15s, NO drift (median delta is 4.7 — stillness is the design)
whip out     y 0→-160, power3.in, 0.28s, then hard cut
chart bar    scaleY 0→1, power3.out, 0.7s, on reveal
```

**Code skeleton**
```js
const tl = gsap.timeline({ paused: true });
tl.set('.b5', { opacity: 1 }, 33.90);
tl.set('.b5', { opacity: 0 }, 47.50);
window.__timelines['comp'] = tl;            // REQUIRED or 45s timeout
```
```css
.card{ position:absolute; inset:2%; background:#060604; border-radius:34px; overflow:hidden; }
.micro{ font:700 14px/1 ui-monospace; letter-spacing:.12em; text-transform:uppercase; color:#8E8E93; }
.display{ font:900 132px/0.92 system-ui; letter-spacing:-.02em; color:#fff; }
```

**Do** — one bar chart only; white L crop marks at 2px on any photo; micro-labels even when nothing needs labelling.
**Never** — third type register; directional lighting or cast shadows; grain; a frozen final frame with no drift (add 1.000→1.008).
**Devanagari** — the caps+tracking register has no equivalent (no case). Rebuild it as word-level size/weight hierarchy.
Snippet: `snippets/hyperframes/editorial-card.js`
