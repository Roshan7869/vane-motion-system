---
id: NoGRmd2qaPY
title: "HYPERFRAMES PRESENTS: THE BORING REPORT"
source_url: https://www.youtube.com/watch?v=NoGRmd2qaPY
form: short
depth: deep
kind: broll-assembly
duration_s: 86.4
resolution: 608x1080
aspect: "9:16"
fps: 30/1
primitives:
  - ai-broll-assembly
  - teal-orange-grade
  - fast-cut
  - end-card-lockup
emotion:
  - cinematic
  - weary
  - aspirational
tags:
  - broll
  - ai-generation
  - grading
  - narrative
  - end-card
easing:
  - linear
has_captions: false
caption_script: none
measured:
  cuts: 18
  median_cut_s: 3.27
  mean_frame_delta: 25.458
  median_frame_delta: 19.221
  p95_frame_delta: 73.959
  static_ratio: 0.029
---

# HYPERFRAMES PRESENTS: THE BORING REPORT

**Lesson type: b-roll assembly, not motion graphics.** Despite the title, there is no HyperFrames
UI, no vector graphics and no HTML in this piece. It is **AI-generated imagery cut together** — a
narrative essay visual. Its value to this repo is as the *opposite* strategy to the editorial cards,
and as evidence of when the team behind the tool chooses not to use it.

- **id** `NoGRmd2qaPY` · 608×1080 · 30 fps · 86.4 s · −19.09 LUFS · LRA 10.8 · 34 keyframes, **5 read**
  (0.1 / 30.5 / 46.5 / 86.3)

## 1. Motive

A brand-produced narrative short — "HYPERFRAMES PRESENTS" — about the grind of work. It creates a
mood rather than teaching anything, and it closes on a HeyGen logo lockup. The choice that matters:
**for narrative content, even the HyperFrames team used AI-generated b-roll instead of their own
graphic engine.** That is a useful admission about fit.

## 2. Global specification

| Field | Value | Source |
|---|---|---|
| Mood | cinematic, weary, aspirational | judged |
| Lighting | chiaroscuro — warm practical key (desk lamp, window), cool screen fill | judged |
| Colour grading | **teal and orange**, consistently across every shot | judged |
| Camera | shallow depth of field, 3/4 angles, hands and faces cropped tight | judged |
| Finish | photoreal / stylised-3D hybrid; smooth skin and perfect materials are the tells that these are generated | judged |
| Resolution / aspect | 608×1080 (9:16 portrait — a **true Short**) | measured |
| FPS | 30 | measured |
| Duration | 86.4 s, 18 cuts | measured |
| Palette | `#16171a` 32% · `#4e4443` 21% · `#7c7374` 18% · `#ada5a2` 16% · `#d9dee7` 12% | measured |
| Audio | −19.09 LUFS, LRA **10.8** — real dynamics, music-led | measured |
| Captions | **none anywhere** | measured (5 frames read, zero text overlays) |

### Motion signature

```
mean 25.458 · median 19.221 · p95 73.959 · max 105.875 · static_ratio 0.029
mean/median = 1.32  →  CONTINUOUS
```

Unlike the editorial piece (mean/median 5.56×), this is genuinely continuous — the median is high
because the imagery is always moving. It is not graphics animation; it is **camera drift, subject
motion and cuts**. Per rule 13, the ratio is what separates the two.

### The cut rhythm

```
intervals: 6.0 · 2.9 · 1.5 · 1.7 · 8.0 · 13.9 · 1.1 · 3.3 · 4.3 · 3.4
           · 1.2 · 1.8 · 2.2 · 8.5 · 5.1 · 2.1 · 4.4 · 8.2
median 3.27 s
```

A clear pattern: **long establishing holds (8.0, 13.9, 8.5, 8.2 s) punctuated by bursts of
1.1–2.2 s.** The holds let a shot breathe; the bursts land a sequence of related images. This is
essay pacing, not ad pacing — much closer to the tutorial cadence (median 14 s) than to the viral
reel (median 1 cut total).

## 3. Shot evidence

| t | what it shows | system |
|---|---|---|
| 0.1 s | stylised 3D render: young man hunched at a desk at night, warm desk lamp, laptop glow on his face, coffee cups and crumpled paper, a sheet reading **`REPORT`** lying flat in perspective | 3D narrative illustration, teal-orange grade |
| 30.5 s | photoreal render: man in 3/4 profile at an iMac, trading terminal on screen (`Portfolio`, `Derivatives Search`, `Market Watch`, `Symbol`/`Metric`/`Change`/`Performance`), warm window light behind | AI-generated hyperrealism; **on-screen text is pseudo-text** — `Hostingbar`, `Kalgarita`, `Pendelion risk` are not words |
| 46.5 s | extreme close-up: a hand typing on a low-profile aluminium keyboard, shallow DOF, blurred monitor behind, **no text overlay at all** | photoreal, warm-cool contrast |
| 86.3 s | **end card**: pure white field, black `Hey` / `Gen` wordmark stacked and offset, multicolour faceted gem logo (green / lavender / magenta / cyan) to the right | brand lockup |

Two observations worth keeping:

- **The AI-generated screens contain believable-but-fake UI text.** `Pendelion risk`, `Hostingbar`,
  `Kalgarita`. At 9:16 on a phone this reads as "a trading terminal"; at full size it is gibberish.
  If we generate b-roll, any on-screen UI must be either unreadable by design or replaced with real
  HTML — never left to a generator.
- **The `REPORT` sheet in the opening frame is the only legible word in the whole piece** before the
  end card. That is the entire textual payload of 86 seconds.

## 4. What transfers, and what doesn't

**Transfers:**

1. **AI b-roll as a budget substitute for graphics.** When there is no design system and no time,
   generate stills and cut them with a consistent grade. The grade is what makes disparate generated
   images feel like one film — teal shadows, orange highlights, applied to every single shot.
2. **Burst-and-hold essay pacing** — 8–14 s holds, 1–2 s bursts. Reusable for any narrative piece.
3. **Close-up hands and faces as connective tissue.** Three of the five frames read are a hand, a
   face and a desk. Cheap to generate, and they carry more emotion than any graphic.
4. **A pure white end card with a black wordmark.** Maximum contrast, zero motion, total clarity.
   Better than the black fade in `aNZeXQmVOjQ`, which wasted 3.2 s on nothing.

**Doesn't transfer:**

1. **86 seconds with no captions and no graphics.** A muted viewer — most of short-form — gets an
   attractive mood and no information. Our caption pattern exists precisely to fix this.
2. **AI-generated UI.** Fake terminal text is a credibility hole. In our pipeline, UI is HTML.
3. **The narrative essay format** is not what we are building. We build product and brand pieces
   where the words are the payload.

## 5. Emotion → motion mapping

| Feeling | Parameter | Value |
|---|---|---|
| Weary, cinematic | grade | teal shadows `#16171a`, orange highlights `#ECA039` |
| Considered | hold length | 8–14 s |
| Momentum | burst length | 1.1–2.2 s |
| Intimate | DOF | shallow, subject sharp, background fully soft |
| Resolved | end card | pure white, zero motion, brand only |

## 6. Timing rules extracted

- 18 cuts, median **3.27 s** — `measured`
- Hold/burst structure: 8.0 / 13.9 / 8.5 / 8.2 s holds against 1.1–2.2 s bursts — `measured`
- mean 25.458 / median 19.221 → ratio **1.32**, continuous, not hold-and-burst — `measured`
- static_ratio **0.029** — almost nothing rests — `measured`
- LRA **10.8** — real dynamics — `measured`
- End card total duration ≈ 6.8 s (79.6 cut → 86.4 end) — `measured`

## 7. Caption implications

**There are no captions.** That is the finding, and it is a defect for our purposes:

- 86 s of visual with no text means the piece is unreadable muted.
- The only defence is that the audio carries it (LRA 10.8, music-led), which is fine for a mood
  film and wrong for anything informational.
- If we adopt the AI-b-roll approach, captions must be added on top in our own register — and the
  b-roll must be generated with a **safe zone** in mind, since generated compositions centre their
  subject. Reserve the bottom 15% before generating, or you will cut faces.

## 8. Caveats

- **Five frames read of 34.** Beats between them are inferred from the cut grid, not observed.
- **The piece is not a motion-graphics reference.** I include it because it is evidence about fit,
  and because the grade and pacing are genuinely reusable — not because it teaches HyperFrames.
- **AI-generated imagery dates fast** and carries known artifacts (malformed hands, pseudo-text).
  The frame at 30.5 s has a visibly malformed right hand on the keyboard.
- **Do not copy the no-caption decision.** It is the clearest defect in the piece.
- **The title is misleading.** "HYPERFRAMES PRESENTS: THE BORING REPORT" primed me to expect a
  HyperFrames graphic showcase. Reading the frames showed the opposite: zero HTML output. Titles are
  not evidence — which is exactly why this repo measures instead of trusting metadata.
