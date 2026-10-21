# QUERIES — working recipes against `capabilities.json`

The router is ~30K tokens. Do not load it into context — **query it** and load only the ids that
come back.

`capabilities.json` is a JSON array. Fields: `id`, `title`, `system`, `capability[]`, `format`,
`pacing`, `shape`, `basis`, `emotion[]`, `easing[]`, `duration_s`, `cuts`, `median_cut_s`,
`primitives[]`, `use_when`, `measured{}`, `lesson`.

---

## The queries that work

```bash
# by capability  (the primary, most reliable filter)
jq -r '.[] | select(.capability | index("captions")) | .id' capabilities.json

# capability + shape + pacing
jq -r '.[] | select((.capability|index("loop-construction")) and .shape=="9:16" and .pacing=="continuous") | .id' capabilities.json

# only what someone actually verified
jq -r '.[] | select(.basis=="visual-read") | "\(.id)  \(.system)"' capabilities.json

# building from a known system
jq -r '.[] | select(.system=="editorial-card") | .lesson' capabilities.json

# exclude the saturated/generic labels
jq -r '.[] | select((.capability|index("animation-principles")|not) and (.capability|length)>0) | .id' capabilities.json
```

Python equivalent when `jq` is missing (it is missing on this host):

```bash
python3 -c "
import json
for x in json.load(open('capabilities.json')):
    if 'captions' in x['capability']: print(x['id'], x['title'][:60])
"
```

---

## The query that does NOT work — `emotion`

```bash
jq '.[] | select(.emotion | index("joyful"))' capabilities.json     # 0 results
```

`joyful` is not a value in this corpus. More importantly, **emotion is a bad routing facet** even
when you use a real value:

```
energetic     91 of 137 lessons
urgent        57
neutral       22
loud           1     <- only these came from a visual read
confident      1
```

91 of 137 are tagged `energetic` because the label was auto-derived from measured frame-delta at
scale time, not from watching. Routing on it returns a third of the corpus, which is the same as
returning nothing.

**Use `capability` + `shape` + `pacing`. Use `emotion` only to confirm, never to filter.**

The canonical vocabulary, if you need to validate input:

```
analytical · aspirational · calm · cinematic · confident · deliberate · editorial ·
energetic · hypnotic · loud · meme-literate · neutral · opinionated · product-led ·
reassuring · reflective · technical · urgent · weary
```

Five labels a build actually needs, and where they live:

| intent | label to use | source |
|---|---|---|
| hook, interrupt | `urgent` | corpus |
| shopkeeper, authority | `confident` | corpus (verified lesson) |
| category, tick, pop | *(not in corpus)* — use the card's `proud` | `styles/clean-bold.md` |
| search, reveal | *(not in corpus)* — use the card's `curious` | `styles/clean-bold.md` |
| map, expansion | *(not in corpus)* — use the card's `awe` | `styles/clean-bold.md` |

`styles/clean-bold.md` carries its own five-label emotion→easing table. Those five (`urgent`,
`trust`, `proud`, `curious`, `awe`) are the **card's** vocabulary, not the corpus's — a `jq` on
`emotion` will never find `proud`, `curious` or `awe`. That is expected, not a bug.

---

## Load discipline

```
1. query capabilities.json offline       0 tokens into context
2. take the ids                           0
3. if the best hit is basis=visual-read, load its style card   ~500-1,200
   if it has no card, load the lesson                            ~750-7,200
4. max 3 lessons. If more than 3 match, tighten the facets
```

Never pipe the whole router into the model. It is 30K tokens to answer a question a `jq` answers in
200 milliseconds.
