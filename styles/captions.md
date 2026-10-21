# Style card — captions
`use_when`: any piece that must read muted. Source: `patterns/caption-systems.md` + verified lessons.

## Universal rules (apply to every placement)
```
in      0-2 frames BEFORE the spoken word — never after
out     within 3 frames of the last word ending
cuts    a caption NEVER crosses a cut. Cut, then re-enter.
lines   1-2 max (3 lines on 9:16 covers the subject)
chars   <=22 Latin / <=14 Devanagari per line
weight  800 — regular loses to a moving background
contrast >=4.5:1 on the DARKEST frame behind it, never the average
inset   44px sides, 148px bottom (clears platform UI)
```

## Three placements — pick by footage, not taste
```
capsule  dark plate behind text. Guarantees contrast over anything.
         Costs ~15% of a 9:16 frame. Reads "produced". Use for uncontrolled footage + many cuts.
scrim    gradient over the bottom third. Looks direct, behaves like a plate. Use for real footage.
direct   type straight on image + soft shadow. Use only when the frame is composed for it,
         and you have checked the WORST frame, not a representative one.
```
**Brand references override this.** If they show direct overlay, that is the house style — the only
requirement is the worst-frame contrast check.

```css
/* capsule */
#capsule{ position:absolute; left:44px; right:44px; bottom:148px; height:288px; border-radius:34px;
          background:rgba(6,9,16,.84); display:flex; align-items:center; justify-content:center; }
/* scrim */
#scrim{ position:absolute; left:0; right:0; bottom:0; height:38%;
        background:linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.38) 45%, transparent 100%); }
/* direct */
#cap{ position:absolute; left:44px; right:44px; bottom:148px; text-align:center;
      text-shadow:0 2px 12px rgba(0,0,0,.85), 0 0 2px rgba(0,0,0,.9); }
```

## Reveal patterns
```
WORKS   line lift      y +60->0, power3.out, 0.55-0.7s
        word cascade   per-word y +34->0, stagger 0.06-0.09s
        marker sweep   stroke under the word after it lands
        mask roll      clip-path reveal, linear
        slam           scale 1.4->1, 0.15s, power4.out  (hooks only, once per video)
FAILS   per-character typewriter on Devanagari  -> severs conjuncts, silent corruption
        back.out / elastic                       -> ink does not bounce, reads template
        fade with no movement                    -> invisible over moving footage
        opacity-only per word                    -> flicker, no reading direction
        caption crossing a cut                   -> attention split
```

## Emphasis — one word per line
```html
<div class="cap">अपने <span class="hl">धंधे</span> की सुन लो ज़रा</div>
```
```css
.hl{ color:#FFD60A; }     /* colour, never font-size: a size change reflows the line */
```

## Karaoke — driven by one scalar, not N tweens
```js
tl.to('#cap', { '--hl': 1, duration: capDur, ease: 'none' }, capStart);
```
```css
.cap span{ color:rgba(255,255,255,.45); }  .cap span.on{ color:#fff; }
```

## Devanagari
Word-level only. One `<span>` per word. No uppercase (no case exists). Line-height 1.5-1.7.
Never animate per glyph. Verification is a native reader looking at a still — two vision passes
disagreed on the same correct frame in this project (`मोर` vs `मेरे`).
