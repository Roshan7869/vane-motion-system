# Creators — verified list

Who is actually building motion graphics with Claude + HyperFrames / Remotion, and what to
extract from each.

**Method.** Discovered via web search (Exa-backed) targeting HyperFrames, Claude+Remotion and
wave-motion queries. **Every channel below was verified with `yt-dlp --dump-json`** — real
channel id, real subscriber count, real upload date, real view count. Nothing here comes from
a search snippet alone. Machine-readable: `creators.json`.

**Verification disclaimer.** A channel being listed means *the video exists and the metadata is
real*. It does not mean the tutorial is good, nor that the workflow is reproducible on a 2-core
machine. Each entry carries a trust note where it matters.

---

## Tier 1 — HyperFrames-native (the tool we actually run)

These are the only creators whose subject is the exact engine in our stack.

| # | channel | subs | video | date | what to extract |
|---|---|---|---|---|---|
| 1 | **HeyGen** (official) | 114,000 | "Replace Your Video Editor With AI: HeyGen Hyperframes Full Tutorial (2026)" | 2026-05-06 | the canonical install path (`npx skills add heygen-com/hyperframes`), and the avatar-combination workflow. Authoritative by definition — it is the vendor. |
| 2 | **Brandon Melville** | 7,020 | "Claude Code + HyperFrames = Cheapest AI Video Editor EVER" | 2026-10-14 | **highest value single source.** He built a reusable Claude Code *skill* around HyperFrames and published the system: `github.com/lmbrandon/Site-to-Promo-Starter`. Site-scan → promo trailer. This is the closest existing thing to what we are building. |
| 3 | **Reliablesoft Academy** | 21,400 | "How to Create Motion Graphics With AI (Claude + HyperFrames)" | 2026-08-25 | the widest technique spread in one video: animated title card, **bar chart race**, SRT→full animated sequence, website-URL→product launch, and the "100+ ready-made components" claim we should verify against our own 447-block catalog. |
| 4 | **Artificial Quotient** | 10,800 | "Hyperframes + Claude = Insane AI Motion Graphics In Minutes! (Full Tutorial)" | 2026-06-18 | dramatic text reveal, **map animation**, data-visualisation graphic, and the model-setting discipline (Opus, high effort) that actually affects output quality. |
| 5 | **Learning By Tutorials** | 1,590 | "HeyGen HyperFrames: Complete Usage Guide" | 2026-10-19 | the most *technical* of the set: deterministic HTML→video, **seekable animation timelines**, `npx hyperframes preview`, `skills update`, and **batch rendering from reusable templates with injected data**. Directly relevant to our template-extraction goal. |
| 6 | **TECH DROP** | 1,780 | "I Used AI for This Motion Graphics Tutorial with HeyGen Hyperframes — No After Effects Needed" | 2026-08-10 | three finished styles in one pass: Apple-style intro, podcast edit with auto-captions + zooms, high-end **SaaS product launch**. The SaaS one maps onto our CG client work. |
| 7 | **Pixel Prophets** | 1,420 | "Claude + Hyperframes = Anyone Can Make Motion Graphics Now — (Beginner Step by Step)" | 2026-06-17 | the cleanest *cold-start* install sequence (Claude desktop → Node → FFmpeg → project → render at 4K). Use it as our onboarding script, not as technique. |
| 8 | **Creatubers** | 347,000 | "Hyperframes: ¡la IA crea motion graphics por ti! ¿Se merece el hype?" | 2026-04-28 | a **critical review**, not a tutorial — includes the dependency install matrix and the honest "is it worth the hype" test. Large channel, so the verdict is a useful outside read on the tool. |

Language variants of the same material — same technique, different pedagogy:

| channel | subs | lang | note |
|---|---|---|---|
| **G-CREATOR** | 14,300 | ko | Claude Code + HyperFrames, 15 s motion graphic end to end, HyperFrames **Studio** preview loop. Cleanest demonstration of the preview→revise cycle. |
| **AI Universo** | 9,690 | it | introduces a `/regia` ("direction") skill that **interviews you before building** — a brief-first pattern. Worth copying. |
| **Luan Matos \| Traduz AI** | 64 | pt | "prompts as creative direction"; covers hierarchy, timing, movement, pre-render validation. Small channel, methodical. |

---

## Tier 2 — Claude + Remotion (our second runtime)

| # | channel | subs | video | date | what to extract |
|---|---|---|---|---|---|
| 9 | **Ripple Training** | 113,000 | "Using Remotion for AI Generated Motion Graphics" | 2026-02-25 | **the only source that states the limits.** Chapters include "What Remotion Can't Do" and "Thing Remotion can do better than Motion". Also: generating *multiple animations from a spreadsheet*. Professional training channel, not hype. |
| 10 | **Maciej Dziuba** | 8,060 | "Remotion - Full Tutorial for Beginners" | 2026-07-07 | 41 min, the most complete. Includes **"Debugging issues (missing timeline fix)"** — the exact failure we hit, where an unregistered timeline costs 45 s per render. Also style→reusable-skill, easing curves, bloom cleanup, MCPs (Mapbox, Playwright, ElevenLabs). |
| 11 | **Matt Loui** | 244,000 | "Claude Opus 5.5 Animated Every Motion Graphic in This Video (I Didn't Keyframe a Thing)" | 2026-10-15 | **the methodology.** Three prompting modes — *record it, screenshot it, reference it* — which is a cleaner framing than "describe what you want". Claude Code + Remotion → CapCut. |
| 12 | **Esther** | 5,930 | "Create Insane Motion Graphics with Claude Code + Remotion (No After Effects)" | 2026-09-29 | SaaS/UI motion: animated bar chart, before/after UI transitions, **Dribbble designs as visual references**. Closest to our client-facing work. |
| 13 | **Harshit Agarwal** | 2,970 | "Remotion AI Tutorial 2026 \| Programmatic Animated Videos, Infographics & Intros" | 2026-02-24 | animated KPI cards, explainer flows, side-by-side comparison graphics, **cinematic map animation (globe → zoom to Dubai)**. Strong on design patterns for data-driven video. |
| 14 | **Stack n Spark** | 103 | "Create Free Motion Graphics using any AI Agents \| Remotion Motion Graphics using AI" | 2026-09-19 | **the only source matching our multi-model stack** — explicitly Claude / ChatGPT / Copilot / DeepSeek / Kimi against the same Remotion workflow. Relevant because we run DeepSeek + Kimi + GLM. |
| 15 | **100x Engineers** | 287,000 | "Claude Edited This Video (And I'll Teach You How)" | 2026-10-20 | full-video editing rather than graphics-only: what a 40–50 s first draft costs in time, and where the agent fails. |
| 16 | **Maitis** | 192 | "Claude Edits Videos Like a Pro Now (Anyone Can Do This)" | 2026-10-18 | **trains Claude on your own editing style**, distils it into one reusable skill, generates 30+ layout/type/motion variations. The skill-distillation pattern is directly transplantable. |

---

## Tier 3 — Claude Design / adjacent (check before trusting)

| channel | subs | video | note |
|---|---|---|---|
| **Saddam Kassim** | 1,060,000 | "Create Motion Graphics in Claude within Minutes" | **Hindi.** Huge audience. But the description shows idea-generation and prompt-planning, not rendering — treat as audience research, not technique. |
| **Blog With Ben** | 498,000 | "Make Stunning Motion Graphics In Minutes With Claude Design" | Claude **Design** (browser), transcript→graphic. Different product from Claude Code; verify it can export frame-accurate MP4 before adopting. |
| **Sanji Nai-Chien** | 60,500 | "Motion Graphics Without Plugins: The New Claude Method" | Claude Design + Higgsfield Recraft (flat logo → animatable SVG). The SVG-conversion trick is genuinely useful for our logo work. |
| **Softgirlnocode** | 16,500 | "How I use AI to edit my videos (Exact Process: Easy)" | HyperFrames + Codex, **11 Labs transcript → animations mapped to spoken timestamps**. This is the mechanism our caption pipeline needs. |
| **Samrin_edits** | 7 | "I Made Insane Motion Graphics with Claude Opus 5.5 (No After Effects)" | paper-cutout channel intro, 6-step beat-first process. Tiny channel, clear method. |

---

## Tier 4 — Wave motion (the primitive you asked about)

**This is the gap, and it is worth stating plainly.** I found *nobody* in the Claude /
HyperFrames / Remotion cluster teaching wave motion as a technique. Wave tutorials are all
After Effects era. That means it is white space: we would be writing the reference, not
copying one.

| channel | subs | video | what transfers |
|---|---|---|---|
| **neon motions** | 2,290 | "Make Waves With the Displacement Map" | the best structural explanation of the primitive, and the one that ports: displacement map + fractal-noise gradient + **phase shift** to drive the travelling wave + cycle repetitions for the number of bends + horizontal-only blur. Every term maps to `feDisplacementMap` or a shader uniform. |
| **Manas** | 8,780 | "Faceless Clean Motion Graphics" | wave warp on a shape layer with the anchor at centre, speed 0.5 — the "cheap but correct" version. Shows the pacing: slow wave, not a fast flicker. |
| **simonswiss** | 12,000 | "Motion.dev – 01: Effortless Animation For The Web" | not wave-specific, but it is the correct animation substrate for waves in our engine: springs, independent transforms (`x`/`rotate` separately), SVG path and WebGL from one API. |

Transferable recipe, assembled from the above and stated so it can be built:

```
wave(t) = A * sin(k*x - w*t + phase)
  A      amplitude      → the only value a viewer reads as "energy"
  k      spatial freq   → number of visible bends across the frame
  w      temporal freq  → speed; keep low (0.5x felt right in the AE refs)
  phase  offset         → the travelling illusion; must advance linearly in t
```

In HyperFrames: an SVG `feDisplacementMap` whose `scale` and turbulence `baseFrequency` are
functions of `t`, or a Three.js plane with a vertex shader. **Never a CSS animation** — it will
not seek, and every render will differ.

---

## What this list is missing (stated, not hidden)

- **No creator teaches wave motion inside an agent workflow.** Tier 4 is AE-era knowledge that
  must be translated by us.
- **Subscriber counts are not quality.** `Stack n Spark` has 103 subs and is more relevant to our
  multi-model setup than `Saddam Kassim` with 1.06 M.
- **Most Tier 1 videos are install walkthroughs.** Only Brandon Melville and Learning By
  Tutorials go beyond "here is how to install it" into reusable systems. Those two are the
  priority.
- **Descriptions and transcripts were read, not videos watched end to end.** Claims about what a
  video covers are from its own description/chapters. Before extracting technique from any of
  these, the video itself must go through our own pipeline (`vane_extract.py`) — download,
  measure, keyframe, delete.

---

## Priority extraction order

If we only process five, these five:

1. **Brandon Melville** — the reusable HyperFrames skill + Site-to-Promo starter. Nearest
   existing implementation of our repo.
2. **Learning By Tutorials** — deterministic timelines and batch rendering from templates.
3. **Reliablesoft Academy** — the widest technique surface (bar chart race, SRT→sequence).
4. **Maciej Dziuba** — Remotion depth, including the missing-timeline fix.
5. **Matt Loui** — the three-mode prompting method (record / screenshot / reference).

The last one is a *methodology* import, not a technique import, and it may be the most valuable
of the five: it tells us how to brief an agent with a reference video, which is exactly what our
motion-system repo is for.
