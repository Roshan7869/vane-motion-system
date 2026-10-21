# Easing and emotion

The single highest-leverage table in this repo. Easing is not decoration — it is the
parameter that carries meaning. Get it wrong and a technically correct render still feels
like a template.

## The core rule

> **linear = human · spring = plastic · sine = breath · power.in = threat**

Everything below follows from that.

| Family | Reads as | Use for | Never use for |
|---|---|---|---|
| `linear` / `none` | human, mechanical-honest, unhurried | pen strokes, wipes, typewriter, marquees, scanlines | UI entrances (feels dead) |
| `power1.out` | calm settle | subtitles, soft reveals, slow camera drift | punchy hooks |
| `power2.out` | standard, trustworthy | most entrances, captions, overlays | nothing — this is the safe default |
| `power3.out` | confident, decisive | headlines, hero text, card landings | small elements (overshoots visually) |
| `power4.out` | abrupt, aggressive | hard hooks at 0–1 s, slam text | anything reflective |
| `power2.in` | threat, wind-up | exits, push-ins before a cut, tension builds | entrances |
| `power2.inOut` | considered, deliberate | underlines, rules, progress, morphs | fast cuts |
| `sine.inOut` | breath, alive | slow drift on a held frame, ambient float | anything with a deadline |
| `back.out(1.7)` | playful pop | chips, pills, badges, checklist ticks | text, strokes, anything ink |
| `back.out(2–3)` | bouncy, energetic | category pills, emoji, social UI | premium or corporate |
| `elastic.out(1, 0.5)` | springy, toy-like | logo sting, single accent | body copy, captions |
| `steps(n)` | mechanical, glitch, retro | typewriter variants, stop-motion cadence | anything organic |

## The spring trap

The fastest way to identify a template edit is that **everything springs**. Overshoot
implies a physical object with mass and elasticity bouncing against a surface. A pen does
not bounce off paper. A headline does not bounce onto a screen. A plastic chip does.

Rule: if the thing on screen is **ink or light**, use a power/sine curve. If it is a
**physical object with a bevel**, use `back` or `elastic`.

## Duration by weight

Perceived speed depends on travel distance as much as time. These are tuned for 1080p
where the element moves a meaningful fraction of frame height.

| Element | Travel | Duration | Easing |
|---|---|---|---|
| Caption line | +60px | 0.55–0.7 s | `power3.out` |
| Single word emphasis | scale 1.0→1.06 | 0.22 s out, 0.32 s back | `power2.out` / `power2.inOut` |
| Card / panel | +80px + scale 0.96→1 | 0.6–0.7 s | `power3.out` |
| Chip / pill entry | +34px + scale 0.9→1 | 0.4 s | `back.out(2)` |
| Full-screen slam | scale 1.4→1 | 0.15–0.2 s | `power4.out` |
| Stroke / marker reveal | full path | 0.55–2.0 s | `linear` |
| Slow drift on a hold | scale 1.00→1.015 | 2.5–4 s | `sine.inOut` |
| Camera push-in | scale 1.05→1.13 | whole shot | `none` |

## Stagger

Stagger is how a group becomes a rhythm instead of a batch.

- **UI groups** (chips, pills, checklist): 0.05–0.14 s. Below 0.05 reads as simultaneous;
  above 0.2 the user notices the wait.
- **Text lines**: 0.12–0.18 s.
- **Drawing / strokes**: 30–40% **overlap**. A 0.9 s reveal on a 0.55 s stagger leaves
  0.35 s of overlap — the second stroke starts before the first finishes. Fully sequential
  looks like a machine; a clean queue is the tell.
- **Never stagger more than 6 items on screen at once.** Past that, cut to a second group.

## Driving easing from a measured curve

This is the part that makes the system ours rather than a copy of the tutorials. Because
every parameter above is a number, an emotion curve can own them directly.

```js
// valence/arousal (from librosa) → motion parameters
function motionFor(valence, arousal) {
  // arousal 0..1 → speed; valence 0..1 → warmth of the curve
  const dur = 0.75 - 0.45 * arousal;          // 0.30s .. 0.75s
  const ease = arousal > 0.66
    ? 'power3.out'                            // decisive
    : valence > 0.55
      ? 'sine.inOut'                          // warm, breathing
      : 'power2.out';                         // neutral
  const stagger = 0.18 - 0.11 * arousal;      // 0.07s .. 0.18s
  return { dur, ease, stagger };
}
```

Rules that keep this honest:

1. **Clamp before you use it.** Curves overshoot; durations must not.
2. **Never let arousal choose a spring.** High arousal means fast and decisive, not bouncy.
3. **One curve per scene, not per element.** If every element gets its own curve the scene
   loses coherence — that is the failure mode of "reactive" motion.

## Anti-patterns

| Anti-pattern | Why it fails |
|---|---|
| `back.out` on a caption | Ink does not bounce. Reads as a template. |
| `elastic` on more than one element | Toy-like; kills premium instantly. |
| Easing a stroke reveal | Looks like a squashed vector, not a moving pen. |
| Same duration for every element | No hierarchy — the eye has nothing to follow. |
| Stagger > 0.2 s on a 3-item group | Feels broken, not considered. |
| `power1.in` on an entrance | Feels like the element is being dragged away. |
