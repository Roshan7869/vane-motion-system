# Style card — ai-broll
`use_when`: narrative/mood piece with no design system and no graphics budget. Verified source: `NoGRmd2qaPY`.

```
shape 9:16 · 86.4s · 18 cuts median 3.27s · continuous
mean 25.46 median 19.22 p95 73.96 static 0.029
palette #16171a 32% | #4e4443 21% | #7c7374 18% | #ada5a2 16% | #d9dee7 12%
audio -19.09 LUFS, LRA 10.8
```

**Pacing — burst and hold.** Holds of 8.0 / 13.9 / 8.5 / 8.2s against bursts of 1.1-2.2s. Essay rhythm, not ad rhythm.

**The grade is what holds it together.** One teal-orange pass on every shot: shadows → `#16171a`, highlights → `#ECA039`. Without it, unrelated generated images read as unrelated.

**Motion** — camera drift + subject motion + cuts. No graphics animation at all.

**Code skeleton**
```js
// grade as a final pass, not per shot
filter: 'contrast(1.06) saturate(0.92) sepia(0.08) hue-rotate(-8deg)'
// holds
tl.set('#s3', {opacity:1}, 20.1); tl.set('#s3', {opacity:0}, 34.0);   // 13.9s hold
```

**Do** — pick the grade BEFORE generating; reserve the bottom 15% for captions before generating; budget close-ups (hands, faces, desks) — cheapest emotion available.
**Never** — let a generator render on-screen text. The reference terminal reads `Pendelion risk`, `Hostingbar`, `Kalgarita`. Real UI is HTML. Also: never ship 86s with no captions — that is the clearest defect in the source.
**Devanagari** — captions must be added by us in our own register; generated b-roll has no text.
