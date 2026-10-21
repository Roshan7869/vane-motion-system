# Shorts inventory — how many we can actually extract

Counting Shorts-form videos across the creators in `CREATORS.md`, for extraction with the
`templates/shot-breakdown.md` deep-read prompt.

**Method.** Every channel enumerated with `yt-dlp --flat-playlist` on both `/videos` and
`/shorts`. Titles scored against motion-design and agent-video vocabulary, with an exclusion
list for off-topic hashtag spam (travel, blogging, income, WP/Replit, avatars, translation).
Deduplicated by video id. Videos-tab items over 180 s excluded.

**Caveat on the raw counts.** Five channels returned exactly 400 — the enumeration cap — so
`Learning By Tutorials`, `AI Universo`, `Saddam Kassim`, `100x Engineers` and `Ripple Training`
are floors, not totals.

---

## The number

| | Tier 1 + 3 | Tier 2 | All |
|---|---|---|---|
| Raw entries in Shorts tabs | **1,307** | **661** | **1,968** |
| Title-filtered as relevant | **59** | **33** | **92** |
| **Verified portrait (true Shorts)** | **50** | **11** | **61** |
| Landscape 1080p (not Shorts) | 8 | 22 | 30 |
| Square | 1 | 0 | 1 |

**Corrected answer: 50 true Shorts from Tier 1 + 3. 61 if Tier 2 is included.**

### Correction — the tab is not a format filter

The first pass reported 59 and 92 based on Shorts-tab membership plus title relevance. Every video
was then actually measured, and the resolution audit contradicts the tab:

```
portrait  (h > w)  : 61   ← true Shorts
landscape (w > h)  : 30   ← regular 1920x1080 videos parked in the Shorts tab
square             :  1
```

Tier 2 is the worst offender: **22 of its 33 are landscape.** Ripple Training's "Shorts" are its
regular Final Cut Pro episodes appearing in the tab — which is also why they scored so well on
craft. They are 16:9 broadcast-style tutorials, not vertical.

So the honest numbers are **50 and 61**, and the earlier 59 / 92 were overstated by 15% and 34%
respectively.

**Rule for future counts: resolution is authoritative, tab membership is not.**

---

## Per channel

### Tier 1 + Tier 3 — 1,307 raw, 59 relevant

| channel | shorts tab | relevant | note |
|---|---|---|---|
| HeyGen | 225 | 16 | vendor account; many are avatar/real-estate, not motion |
| Softgirlnocode | 182 | 4 | high volume, low hit rate |
| G-CREATOR | 111 | **0** | Canva / Apps Script / presentation tools — no motion shorts |
| Saddam Kassim | 91 | 3 | mostly hashtag reels |
| Artificial Quotient | 56 | 9 | AI animation *tools*, not technique |
| Sanji Nai-Chien | 56 | 8 | **best of this tier** — Claude motion design, UI smoothness, cut theory |
| AI Universo | 56 | 1 | |
| Creatubers | 42 | 6 | AE course promos |
| Brandon Melville | 34 | **0** | his Shorts are AI-engineering, not motion |
| Blog With Ben | 20 | 0 | |
| TECH DROP | 14 | 3 | Remotion + CapCut text automation — high value |
| Samrin_edits | 11 | 7 | editing reels, little teaching |
| Reliablesoft Academy | 9 | **0** | all marketing listicles |
| Pixel Prophets | 0 | 0 | no Shorts at all |
| Luan Matos | 0 | 0 | no Shorts at all |
| Learning By Tutorials | 400* | 2 | electronics channel; HyperFrames content is long-form |

### Tier 2 — 661 raw, 33 relevant

| channel | shorts tab | relevant | note |
|---|---|---|---|
| Ripple Training | 25 | 17 | **highest hit rate in the whole set** — captions, transitions, motion, alpha channels. Final Cut Pro, not our runtime, but the craft transfers |
| 100x Engineers | 400* | 5 | |
| Esther | 185 | 3 | typography component lessons |
| Harshit Agarwal | 22 | 0 | |
| Maitis | 20 | 2 | mostly off-topic |
| Maciej Dziuba | 8 | 4 | **high value** — "Claude Code can animate in After Effects?!", Blender+Claude |
| Matt Loui | 0 | 2 | Shorts tab empty; two sub-180 s videos found in /videos |
| Stack n Spark | 1 | 0 | |

---

## The structural finding that matters more than the count

**The creators who actually teach this well publish almost no Shorts.**

Brandon Melville (the reusable HyperFrames skill) — 0 relevant Shorts. Reliablesoft Academy
(the widest technique surface) — 0. Learning By Tutorials (deterministic timelines, batch
rendering) — 2, on a 400-video electronics channel. Pixel Prophets — no Shorts at all.

Conversely the channels with hundreds of Shorts (HeyGen 225, Softgirlnocode 182, G-CREATOR 111)
convert at 4–16 hits each, because their Shorts are marketing, not instruction.

So the ratio is the answer: **1,307 raw Shorts → 59 relevant, ~4.5%.** Shorts are a discovery
surface for these creators, not where the knowledge lives. The knowledge is in the 8–41 minute
long-form videos.

---

## Effort — what each tier of extraction actually costs

| Pass | Videos | Machine time | Human/model time |
|---|---|---|---|
| Structural (`vane_extract.py`, 36 keyframes) | 92 | ~40 min at 26 s each | none |
| Deep read (`templates/shot-breakdown.md`) | 92 | — | ~35–40 h at ~25 min each |
| Deep read, prioritised subset | 15–20 | — | ~6–8 h |

The pipeline can structurally process all 92 tonight. The template prompt is the expensive part:
it needs ~6 vision passes per video plus written code in both runtimes.

**Recommendation:** structural pass on all 92 (cheap, gives cuts/motion/palette/loop verdict for
each), then deep-read the 15–20 that score highest on the loop and caption axes. Doing all 92
deeply is a week of work for material that is 95% off-topic at the raw level.
