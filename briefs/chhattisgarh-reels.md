# Chhattisgarh viral reels — market brief

> **Not a repo rule.** Nothing here is measured motion technique except where tagged `[repo]`.
> See `briefs/README.md` for the boundary.

```
[client]    supplied for this brief
[external]  platform/market claim, unsourced here — attribute it, never cite as repo
[repo]      measured in this repo — safe as a rule
[verify]    needs checking before it is repeated
```

---

## 0. Core principle `[client]`

Chhattisgarh me dance nahi, identity viral hoti hai. Jab viewer ko lage ye uski bhasha, uska sheher
hai, toh wo apne community me share karta hai.

> The Tulsi Village figure ("25% of 4000 residents are full-time creators") is `[verify]`. It is a
> strong claim used to justify a strategy. Get a source or drop the number — the strategy does not
> depend on it.

---

## 1. 2026 Instagram Reels algorithm — ALL `[external]`

**None of this is measured in this repo.** It is a market model. Treat it as the brief's operating
assumption, not as engineering fact.

**Ranking signals, claimed priority:**
```
Shares + DM sends  >  Saves  >  Watch time  >  Comments  >  Likes
```
Claim: DM sends now outweigh likes for non-follower reach; a like is a weak signal.

**Cold start:** first 30 minutes of watch time and engagement decide whether the reel expands.

**Reels SEO:** captions are indexed for search — keyword-rich sentence beats hashtag spam.

**Consistency:** ~5 reels/week; predictable creators favoured.

**Timing (IST)** — claimed strongest 7–9 AM, 12–2 PM, 7–10 PM; recommended for CG **8:00–9:30 PM**.

**Practical rule the brief derives:** post at 8 PM, seed to 3 close contacts and WhatsApp groups,
ask for **save + DM** rather than a like, reply to every comment in the first hour.

> Why this matters to the motion work: if shares/DMs outrank watch time, then **the shareable moment
> matters more than the retention curve** — which is a real design consequence, and it argues for one
> unmistakably local beat (the map) rather than a long polished build.

---

## 2. CG cultural layer `[client]` / `[verify]`

**Language.** Open with a Chhattisgarhi marker: *"Sangwari ho"*, *"Jai Johar"*, *"Mor dukan"*,
*"Bahut badhiya"*. Mirror the phrases that repeat in comments (*"Jai Johar Jai Chhattisgarh"*,
*"Mor tola"*, *"Turi"*). VO: Hindi with one CG word per sentence.

**Visual identity — real people, real shop, never stock.** Reference patterns supplied:

```
girl in blue-white striped sari with pink trim · rural dry grass + utility pole · expressive face
three women, white wall, wooden-beamed ceiling, dancing to a Chhattisgarhi song
couple on bright green artificial turf, duet
golden hour, long hair, yellow/pink top, red wristbands
local pride locations: Gol Bazaar bokeh · Smriti Nagar Bhilai traffic · BLOCK-H courtyard · rocky waterfall
attire: saree · kurta · floral pink kurta · black zip-up + sari
```

**Audio.** Trending CG songs named: *"Maya Preet ga"*, *"Aama Ke Kahara"*, *"Ae tura re"*,
*"Nai Mane mor khana la"*. For business videos the brief specifies **folk fusion at 95 BPM**
(dholak + bansuri + trap 808) with SFX + VO rather than the full trending track — that avoids
licensing exposure on a paid ad. `[client]`

**SFX map** `[client]`: dholak hit 0.2 s · tick for UI · whoosh for map · ding at the end.

**Hashtags** — formula 3 broad + 2 city + 1 niche:

```
broad  #cgreels #cgsong #viralreels #cg #chhattisgarh
city   #raipurviral #hamarchhattisgarh #durg #bilaspur #bastar #raipur #bhilai
niche  #cgmemes #cgstatus #cgarts #mor36garh
```

**Caption SEO** — a sentence, not a tag dump:
*"Raipur me cafe dhoondh rahe ho? Bhilai boutique ka promotion? …"*

> **Chhattisgarhi and Hindi copy cannot be certified from inside this repo.** A native reader must
> check every line before publish. Two vision passes disagreed on the same correct frame in this
> project's history (`मोर` vs `मेरे`) — a model that cannot read the script cannot approve it.

---

## 3. 30-second blueprint

Motion values below are `[repo]` / card spec. Every algorithm claim attached to a beat is
`[external]`.

### Emotion → easing

**These labels are card-local, not corpus values.** `joyful`, `celebratory`, `proud`, `curious`,
`awe` and `trust` do not exist in `capabilities.json` — all six are card-local only. That is fine;
just do not expect a `jq` on `emotion` to find them.

| intent | easing | duration | use |
|---|---|---|---|
| urgent / hook | `power4.out` | 0.40 s, scale 1.05→1.00 + 2 px shake | 0–3 s |
| trust / proud | `power3.out` | 0.80 s, stagger 60 ms | shopkeeper |
| joyful / celebratory | `back.out(1.7)` | 0.60 s, stagger 80 ms | pills pop |
| curiosity / search | `power2.out` | 0.50 s, y 20→0 | chips |
| awe / map | `expo.out` | 1.20 s, pulse rings | map |

> Note the card (`styles/clean-bold.md`) specifies `back.out(2)` at **0.08 s** for pops and
> `back.out(1.7)` at **0.60 s** here. Both are valid; they are different feels. The 0.08 s is a
> UI tick, the 0.60 s is a celebratory bounce. Pick per beat and say which.

### Shot by shot — `f(t)` only, transform/opacity only `[repo]`

| beat | in–out | visual | motion | text |
|---|---|---|---|---|
| 1 HOOK | 0.0–3.0 | face CU, Gol Bazaar night bokeh, hand forward | `scale 1.05→1.00 power4.out 0.40s` + 2 px shake; typewriter word-level 80 ms | "अरे संगवारी हो, सुनना ज़रा" — **सुनना ज़रा** `#FFD60A` |
| 2 PROBLEM | 3.0–8.0 | cafe owner, green shirt/black apron, warm bulbs, menu board | parallax `x -5% power3.out 0.80s`; captions 2 lines max | "अपने धंधे की सुन लो ज़रा" |
| 3 CATEGORY | 8.0–13.0 | boutique owner, pink floral kurta, embroidered dress | pills `1.10→1.00 back.out(1.7) 0.60s` stagger 120 ms + tick | "दुकान हो या अपना ब्रांड" |
| 4 SEARCH | 13.0–17.0 | phone glowing on dark, teal glow, hand holding | chips `y 20→0 power2.out 0.50s`; tap ripple ring | chips in Hindi: "रायपुर में कैफे" "भिलाई बुटीक" "मोर दुकान" "नज़दीकी सैलून" |
| 5 MAP | 17.0–22.0 | dark CG map, Raipur skyline silhouette at low opacity, 4 pins | pulse rings every 0.8 s; light trails; slow zoom out | "रायपुर • भिलाई • दुर्ग • बिलासपुर में दिखो" |
| 6 CTA | 22.0–30.0 | phone steady, sponsored listing, big CTA + WhatsApp | breathing `y −5→5 sine 2.0s`; button bounce at 28 s; **hold 2.5 s with 1.000→1.015 drift** | "ChatGPT Ads से पहचान बढ़ाओ" + "Ads बनवाना है? हमको बताओ" |

**Pills:** CAFE / BOUTIQUE (selected teal) / SALON / LOCAL SERVICES + **PAN THELA** — the last one is
a genuine inclusivity move for CG, not a filler option.

**One effect per beat.** Two effects and it reads as a template.

### Transitions `[client]`

```
0→1  cut on action (hand forward)
1→2  whip pan right (lights blur)
2→3  match cut on smile
3→4  zoom into phone (scale morph)
4→5  phone expands into map (morph)
5→6  map pins collapse into the phone result (reverse morph) — gives a loopable feel
```

### Two claims inside the blueprint that need attribution

```
"motion at 0.5s else 3-sec hold drops 60%"     [external]
"no blurred border = -40% quality"             [external]
"VO coverage > 70%"                            [external]
"68% watch mute"                               [external]
```

The motion principle underneath the first one is directionally true and is already a `[repo]` rule:
a static opening loses viewers. But the **60% figure is not from this repo** and must not be cited
as measured. Same for the border percentage — the repo's evidence is different and stronger: a
blurred-border filler is a repost artefact, and the composition suffers because the content is no
longer native (see `lessons/HVTuxncA9JU.md`).

### Cut cadence — a real conflict, flagged

The blueprint's six beats over 30 s average **5 s per beat**. That sits inside the corpus corridor:
median cut interval **4.0 s across 86 lessons** `[repo]`.

But other documents in this project specify *"cut every 1.2–1.8 s"*. That is **double the fastest
quartile** of the corpus (18 of 86 lessons under 2 s) and contradicts `MASTER-LEARNINGS` rule 11 —
Shorts earn energy from continuous motion *inside* shots, not cut density.

**Resolution:** the 30 s blueprint as written does **not** need 1.2 s cuts. It needs one effect per
beat and a moving image. If a faster cadence is wanted, write it as `[client]` so an agent does not
carry it into every future piece.

---

## 4. Posting checklist

```
[ ] native 9:16 · 1080x1920 · 30 fps · H.264 · no blurred border        [repo] + [external -40%]
[ ] captions burned, full duration, 2 lines max, Noto Sans Devanagari Bold 90px   [repo]
[ ] VO coverage high — treat ">70%" as [external]                      [external]
[ ] all motion transform/opacity only, pure f(t)                       [repo]
[ ] Devanagari word-level, never char-level                            [repo]
[ ] timeline registered — window.__timelines[id] = tl                  [repo]
[ ] end hold has 1.000 -> 1.015 drift                                  [repo]
[ ] font bundled via @font-face, no src:local()                        [repo]
```

**Caption template** `[client]` — the SEO caption plus the DM prompt
(*"Isko us sangwari ko DM kar jiska business hai"*) is the share mechanism the algorithm section
argues for. Keep it.

**Engagement loop** `[external]` — post 8 PM, seed 3 close contacts + WhatsApp groups, ask for
save + DM, reply in the first hour in Chhattisgarhi.

---

## 5. Vane system integration — corrected

The draft's load order and queries contained four errors. Corrected:

```
LOAD  rules.md                     579 tokens
      styles/clean-bold.md       1,237 tokens     (not 500)
      styles/captions.md           908 tokens     only if captions
      --------------------------------
      TOTAL                      2,724 tokens     (not 1,150)
```

`PROJECT-KNOWLEDGE.md` is **1,654** tokens, not 1.6K — it goes in a knowledge slot only, not per task.

### Finding a lesson — the query that works

```bash
# CORRECT — there is no .verified field
jq -r '.[] | select(.basis=="visual-read") | .id' capabilities.json

# capability-based (the primary filter)
jq -r '.[] | select(.capability | index("captions")) | .id' capabilities.json
```

```bash
# WRONG — returns 0 results, twice over
jq '.[] | select(.emotion | index("joyful")) | select(.verified)' capabilities.json
#   .verified does not exist          -> field filter fails
#   "joyful" is not a corpus value    -> emotion filter fails
```

**There is no `getSnippet()` tool.** Snippets are files; read the one you need:

```
snippets/hyperframes/collage-stack.js      layer stack, hardCut, churn, extrude
snippets/hyperframes/camera-text-loop.js   cameraPath, motionBlur, buildLoopCycle, extrude3d
snippets/hyperframes/editorial-card.js     buildEditorialStage, editorialCard, whipBlur
snippets/hyperframes/letterbox-band.js     bandGeometry, buildBand, radialBloom
```

There is no `cta-hold-bounce` snippet. The CTA hold is four lines — write it:

```js
// hold the CTA frame with drift so it does not read as a stalled render
tl.to('#cta', { scale: 1.015, duration: 2.5, ease: 'sine.inOut' }, 27.5);
tl.to('#cta-btn', { scale: 1.05, duration: 0.3, ease: 'back.out(2)' }, 28.0)
  .to('#cta-btn', { scale: 1.00, duration: 0.3, ease: 'power2.out' }, 28.3);
```

### Linter checklist — as specified, all `[repo]`

```
[ ] motion = f(t) only
[ ] no setTimeout / requestAnimationFrame
[ ] transforms only
[ ] word-level Devanagari
[ ] verified lesson only  <- use basis=="visual-read", 6 of 137
```

---

## 6. 60-second extension `[client]`

```
0–22 s   same as the 30 s cut through the map beat
22–35 s  testimonial: real customer, "Mor sales double ho gaya"
35–50 s  behind the scenes in the shop
50–60 s  CTA hold 3 s, then loop back to the hook visual
```

The testimonial is the strongest addition: it is the one beat that produces the share the algorithm
section claims matters most. In the 30 s version there is no human proof at all — that is the
structural weakness of the short cut.

---

## 7. A/B tests `[client]`

```
hook   A face + "Sangwari ho"   B map pulse   C text pop
audio  A folk fusion            B trending CG song at low volume
CTA    A "DM karo CG ADS"       B "WhatsApp karo"
```

Measure **share rate, DM sends, saves, 3-second hold** — not likes. That matches the ranking model
above, and it is the one place the brief's assumptions become testable.
