# Style card — 3d-camera-text
`use_when`: a title/logo piece that must feel cinematic and hypersonic. Verified source: `Q6H_fYhn3x0`.

```
shape 1:1 (1080 sq) · 16.5s · 14 cuts BUT see loop below · continuous
mean 73.09 median 83.685 p95 127.42 static 0.00
palette #484c4f 30% | #b3b6b7 26% | #eaeaea 21% | #6c747b 20% | #0d0d0d 4%  (neutral only)
```

**It is a loop, not 14 shots.** 5.5s sequence × 3. Cut intervals cycle `1.8 / 1.0 / 0.5 / 0.5 / 1.7` = 5.5s. Keyframes 5.5s apart differ by 0.4-0.9 while consecutive differ 58.45. **Author one cycle, repeat it.**

**Look** — extruded beveled type, near-frontal, floating in a soft radial grey field, heavy vignette, nothing sharp anywhere. Word off-centre at `left:14% top:52%`.

**Motion**
```
camera       x = 260*sin(t*2.1) · rotY = 34*sin(t*1.7) · z = -120*cos(t*2.1)
             TWO incommensurate frequencies — one reads mechanical
blur         5 ghosts, 12ms lag, 1.6px blur per step, opacity .30→.08
cycle        author 5.5s once, repeat ×3
```

**Code skeleton** — CSS has no velocity blur; fake it with lagged ghosts
```js
const path = (t) => ({ x: 260*Math.sin(t*2.1), rotY: 34*Math.sin(t*1.7), z: -120*Math.cos(t*2.1) });
for (let g = 0; g < 5; g++) {
  const el = document.querySelector(`[data-ghost="${g}"]`);
  const obj = { t: 0 };
  tl.to(obj, { t: 5.5, duration: 5.5, ease: 'none', onUpdate() {
    const p = path(obj.t - g*0.012);
    el.style.transform = `translate3d(${p.x}px,0,${p.z}px) rotateY(${p.rotY}deg)`;
  }}, 0);
}
window.__timelines['comp'] = tl;
```

**Do** — pure function of time (the ghost lag only works if `path()` is pure); neutral palette only, zero chroma.
**Never** — a single-frequency camera path; a sharp focal plane; more than ~5 blurred glyph layers on a 2-core box.
**Devanagari** — stacked DOM copies of a conjunct render as a solid block. Rasterise the glyph to a texture and displace that. Never extrude under 80px.
Snippet: `snippets/hyperframes/camera-text-loop.js`
