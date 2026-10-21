# styles/ — compiled style cards

One card per design system, compiled from a verified lesson. **~400-600 tokens each.** Load ONE for
a video task instead of the 26K router or the 190K of lessons.

| card | use when | tokens |
|---|---|---|
| `editorial-card.md` | product/demo/news with data, a stat or a claim | ~584 |
| `collage-reel.md` | loud 9:16 short-form, meme-literate, scroll-stopping | ~575 |
| `3d-camera-text.md` | cinematic title/logo piece | ~548 |
| `saas-ui.md` | calm technical product reel, letterboxed | ~487 |
| `ai-broll.md` | narrative/mood piece, no design system, no budget | ~404 |
| `clean-bold.md` | **Hindi/Chhattisgarh local-business ad, CTA-led** — our own shipped build | ~700 |
| `captions.md` | any piece that must read muted (all 3 placements) | ~690 |

## Load pattern

```
rules      rules.md                        ~400 tokens   always
style      styles/<one-card>.md            ~500 tokens   one
captions   styles/captions.md              ~690 tokens   only if the piece has captions
           --------------------------------------------
           total                                         ~900-1,600 tokens per video task
```

Compare: this repo's 137 lessons are **189,729 tokens**. A single task needs **~1,500**.

## What these cards are not

Each is a distillation of exactly one verified lesson. They are not averages across the corpus and
they do not extrapolate. If a task needs something no card covers — wave motion, Devanagari
captions, lower-thirds — the card set will not help and the agent should say so.
