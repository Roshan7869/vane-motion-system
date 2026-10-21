---
id: JNMtnj4-q1U
title: "Hyperframes vs Remotion"
source_url: https://www.youtube.com/watch?v=JNMtnj4-q1U
form: short
depth: deep
kind: architecture-note
duration_s: 91.0
resolution: 608x1080
aspect: "9:16"
fps: 30/1
primitives:
  - talking-head
  - split-screen-comparison
emotion:
  - analytical
  - opinionated
tags:
  - architecture
  - remotion
  - hyperframes
  - decision
  - correction
easing:
  - linear
has_captions: true
caption_script: latin
measured:
  cuts: 1
  mean_frame_delta: 7.565
  median_frame_delta: 4.616
  p95_frame_delta: 26.656
  static_ratio: 0.061
---

# Hyperframes vs Remotion

**Lesson type: architecture note, not a shot breakdown.** This is a 91 s vertical talking head
(1 cut, median frame delta 4.62). There is no motion-design technique to extract — the value is the
*argument*, and whether it holds. It partly does, and the part where it doesn't is the useful part.

- **id** `JNMtnj4-q1U` · 608×1080 · 30 fps · −17.36 LUFS · LRA 2.5
- **source** transcript (auto-captions), 2 keyframes read

## 1. What the video claims

Quoting the transcript, which is the whole payload:

> "Two tools are fighting for the same job… after weeks of testing, I made my decision based on one
> core reason."

> "Hyperframe plays it exactly right. Let us fly in, hold, and then fall away. With Remotion, the
> animation burns through in the first second, and the rest, black frames."

> "Remotion runs on React, a more powerful framework built before the AI agents hit the consumer
> wave. Hyperframe runs on HTML, which most LLMs and AI agents speak fluently."

> "Both tools capture frame by frame. Hyperframe, however, **pauses the GSAP animation between
> shots, so it lasts the entire sequence**. Remotion, on the other hand, **lets it keep playing**,
> and so it results in an empty stage."

The observed symptom is real and it is the single most common failure in this stack. The stated
cause is wrong.

## 2. Why the diagnosis is imprecise

**"Remotion lets it keep playing" is not how Remotion works.** Remotion is frame-deterministic by
construction: a composition is a function of `useCurrentFrame()`, and the renderer captures frames
as fast as the CPU allows — **faster than realtime**. Nothing "plays".

What actually produces the reported symptom:

1. You drop a **CSS animation or a GSAP timeline** into a Remotion component.
2. Both of those advance on **wall-clock time**, not on Remotion's frame clock.
3. The renderer captures frame 0, then frame 1 — and wall-clock time has jumped forward by far more
   than 1/30 s because rendering is slower than playback.
4. The animation has already completed by the time the second frame is captured.
5. Everything after that is an empty stage, exactly as described.

So the failure is **putting a time-based animation library inside a frame-based renderer without
seeking it**. It is a misuse pattern, not a property of Remotion. The video describes the bug
correctly and attributes it to the wrong thing.

**"HyperFrames pauses the GSAP animation between shots"** is also an outside description of
something with a precise mechanism: HyperFrames gives every composition a **seekable timeline**, and
a GSAP timeline must be registered (`window.__timelines[compId] = tl`, or `data-no-timeline`) for the
capture to seek it. When it is registered, the capture drives the timeline by timestamp. That is the
"pause" the video is seeing — it is a seek contract, not a pause.

## 3. Our own counter-evidence

This repo already contains the test. `/home/roshan/hyperframes/stack-lab/remotion-demo/out.mp4`:

```
width=1920  height=1080  r_frame_rate=30/1
nb_frames=210  duration=7.000000
```

210 frames at 30 fps is **exactly** 7.000 s. Not 1 s of animation followed by 6 s of black — a
frame-exact render. And the frame at t=4 s was visually verified to contain the full composition
(eyebrow, headline, rule, body copy, no clipping).

Why did ours work? Because the composition used `useCurrentFrame()` + `interpolate()` — a pure
function of frame number. No GSAP, no CSS animation, no wall clock.

Both tools behave identically under the same discipline. The difference the video measured is not
Remotion vs HyperFrames; it is **frame-driven vs wall-clock-driven animation**, and both frameworks
punish the second one.

## 4. The same bug, in this repo, twice

This is not hypothetical. We hit both halves of it:

| Where | Symptom | Cause | Fix |
|---|---|---|---|
| HyperFrames | `[sub_timeline_readiness_timeout]` — 48.7 s render for a 2 s clip | GSAP timeline not registered | `window.__timelines[id] = tl` → 2.7 s |
| Remotion | would have produced "burn through then black" | (avoided) | `useCurrentFrame()` + `interpolate()`, never GSAP inside Remotion |

The first row is *our* version of the exact failure the video reports against Remotion — and it
happened in **HyperFrames**. That is the strongest argument that the framework is not the variable.

## 5. What the video gets right

- **HTML is a better substrate for LLM-authored video than React.** Correct and important. HTML +
  CSS + GSAP is what an LLM writes most reliably; React component trees, hooks and bundling are a
  larger surface for it to get wrong. This is the real reason HyperFrames feels better with agents,
  and it is a *developer-experience* advantage, not a rendering one.
- **"Time-bound animations, captions, motion graphics, transitions all need to be synced to a
  script."** This is the actual requirement, and it is what our own seek contract exists to satisfy.
- **The two-video-same-prompt test is a good method.** Comparing identical prompts across tools is
  the right experimental design; only the causal reading is off.
- **"It depends on your use case."** Correct, though it retreats from the earlier claim.

## 6. The decision rule this actually supports

Not "HyperFrames renders better than Remotion". The rule:

```
Use HyperFrames when the author is an AI agent, or when the piece is
HTML/CSS/DOM-shaped (typography, layout, captions, editorial cards, UI demo).

Use Remotion when the piece is data- or React-shaped (parameterised templates
across hundreds of variants, typed props, shared component libraries, per-frame
computed charts), and when the author is comfortable in React.

In BOTH: every animated value must be a pure function of time.
  HyperFrames → register the timeline so capture can seek it
  Remotion    → useCurrentFrame() + interpolate(), never GSAP/CSS animation
```

Our stack already reflects this: HyperFrames is primary, Remotion is the second runtime for
frame-deterministic React output. This video does not change that decision — it gives a reason people
get it wrong.

## 7. Caveats

- **This is one creator's test, with one prompt, and the tooling was not inspected.** "Weeks of
  testing" is asserted, not shown. No code, no render settings, no reproduction.
- **I did not watch the compared videos in the piece.** The claim that Remotion "burns through in
  the first second" may be an accurate description of *that* author's composition — I cannot verify
  their code, only the mechanism they describe.
- **The launch dates in the transcript are unverified** (Remotion 2021, HyperFrames April 2026).
  Not load-bearing for the argument.
- **Transcript-derived, not frame-derived.** The quotes come from auto-captions and may contain
  transcription errors (e.g. "the Hit and Team", "Johnny Burger" are clearly mis-transcribed names).
- **Do not let this note become a licence to skip testing.** The correct response to a comparison
  video is to run the comparison, which is what the 210-frame render above is.

## 8. Reusable snippet — the discipline, both runtimes

```js
// HyperFrames — seekable. Without registration the capture times out.
const tl = gsap.timeline({ paused: true });
tl.to('.title', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0);
window.__timelines['my-comp'] = tl;          // ← the whole contract
```

```tsx
// Remotion — frame-derived. Never a GSAP timeline, never a CSS animation.
const frame = useCurrentFrame();
const y = interpolate(frame, [0, 18], [40, 0], {
  extrapolateRight: 'clamp',
  easing: Easing.out(Easing.cubic),
});
return <div style={{ transform: `translateY(${y}px)`, opacity: frame / 18 }} />;
```

The two snippets are the same idea expressed twice. That is the point the video was reaching for.
