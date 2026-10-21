# briefs/ — market and client context, NOT motion knowledge

**The boundary rule:** nothing in `briefs/` is a repo rule.

| Folder | Contains | Provenance | May be cited as a rule? |
|---|---|---|---|
| `lessons/`, `styles/`, `patterns/`, `rules.md` | motion technique | measured or visually read | **yes** |
| `briefs/` | platform behaviour, regional culture, hashtags, posting times, client positioning | supplied by the client or claimed externally | **no** — attribute it |

The reason for the separation is simple: a motion technique can be verified by rendering it. A claim
that "68% of viewers watch mute" or "shorts at 8pm IST perform better" cannot be verified from inside
this repo, and mixing those into `MASTER-LEARNINGS` would let an agent cite a market guess as
engineering fact.

Every file in `briefs/` tags its claims:

```
[client]    supplied by the client for this brief
[external]  a platform/market claim, unsourced here — attribute it, do not cite as repo
[repo]      actually measured in this repo — safe to treat as a rule
[verify]    needs checking before it is repeated
```

## Current briefs

| file | scope |
|---|---|
| `chhattisgarh-reels.md` | CG market context + 30 s / 60 s reel blueprints |

## What a brief may never do

- override a repo rule without saying so
- introduce a metric threshold ("cut every 1.2 s", "hold 3 s or lose 60%") in repo voice
- assert a language or cultural claim as settled — **Chhattisgarhi copy cannot be certified from
  inside this repo and needs a native reader**
