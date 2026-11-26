---
name: extract-effects
description: Turn what a creature's ability leaves on someone (a condition, a curse, "can't regain hit points") into `effects` sub-entities of the ability, and point the ability's text at them. Use for one batch file of candidate abilities from library-workers/effects/export-candidates.ts; the output goes through library-workers/effects/apply-results.ts.
---

# Extract effects from ability text

You get a JSON batch of abilities. For each one, decide whether it leaves an **effect** on
someone, and if so write the effect as data and rewrite the ability's text to point at it. You do
not edit any source files. You write one JSON result file.

The schema is `AbilityEffect` in `src/definitions/stat-block.ts`, built from
`src/definitions/status-effect.ts`. Read both before you start.

## What counts as an effect

An effect is something that **lands on another creature and lasts**: a condition, a curse, a
disease, a grapple, "can't take reactions until the end of its next turn", "its speed is 0 for
1 minute". It must be applied to a target the DM picks.

Skip the ability (write `skip` with a short reason) when it:

- only deals damage, moves a creature, or makes a one-off roll ("pushed 10 feet", "knocked
  back") with nothing that lasts;
- only affects the creature itself (Legendary Resistance, Regeneration, Pack Tactics, immunities,
  "has Advantage on…");
- only mentions a condition without imposing it ("if the target is Prone", "a Charmed creature",
  "immune to the Frightened condition", "not Incapacitated");
- is Multiattack or another ability that only points at abilities.

When in doubt, skip. A missing effect costs the DM a click. A wrong one misleads them at the
table.

## Writing an effect

```jsonc
{
  "key": "ghoul-paralysis",            // lowercase-hyphenated, unique in the whole stat block
  "name": "Ghoul paralysis",           // what a DM would call it; sentence case
  "lands": { "on": "save", "save": "con", "dc": "con" },
  "conditions": [{ "ref": "rule", "key": "paralyzed" }],
  "lasts": { "kind": "turn", "boundary": "end", "whose": "target" }
}
```

- `lands`, how it gets onto someone:
  - `{ "on": "hit" }`: the attack hits (the ability must have an `attack`).
  - `{ "on": "failed-save" }`: the target fails the ability's own structured `save`.
  - `{ "on": "save", "save": <ability the target rolls>, "dc": <ability in the text's `{dc}` token>, "printed"?: n }`:
    the text calls for a save (copy `dc` and `printed` from the `{ "dc": … }` token; `save` is the
    token's `save` if it has one, else the same as `dc`).
  - `{ "on": "use" }`: it just happens, with no roll.
- `conditions`: only conditions (blinded, charmed, deafened, exhaustion, frightened, grappled,
  incapacitated, invisible, paralyzed, petrified, poisoned, prone, restrained, stunned,
  unconscious), as rule refs, copied from the text's rule tokens.
- `text`: what it does **beyond** its conditions, as tokens (full sentences, the book's own words).
  Leave it out when the conditions say it all.
- `lasts`, how long it lasts before anything ends it early:
  - `{ "kind": "until-removed" }`: no stated length (prone, a grapple, a condition "until it
    escapes").
  - `{ "kind": "turn", "boundary": "end" | "start", "whose": "target" | "source" }`: "until the end
    of its next turn" is `target`; "until the start of the ogre's next turn" or "your next turn"
    is `source`.
  - `{ "kind": "time", "amount": "1" | "10" | "1d4", "unit": "round" | "minute" | "hour" | "day" }`.
  - `{ "kind": "until", "text": [...] }`: an ending in words, e.g. `["the aboleth dies or is on a different plane of existence from the target"]`.
- `ends`, optional, what ends it early:
  - `"repeatSave": ["end-of-turn" | "start-of-turn" | "damaged" | "every-24-hours" | "long-rest"]`:
    the target repeats the same save at these moments and ends it on a success. Only when `lands`
    is a save.
  - `"escape": { "dc": "str" }`: "escape DC 14" from a `{ "dc": "str" }` token (copy `printed` too).
  - `"cure": [...]`: what removes it, in the book's words, e.g. `["any magic that cures disease"]`.

## Nothing the book says may be lost

Every word of the old text must end up somewhere: kept in the text, or inside an effect's `text`,
`lasts.text` or `ends.cure`. Only wording that the effect's structure now says may go (its
duration, the grapple and escape wording, the repeat save, the condition itself).

- An effect that is not a condition ("has Disadvantage on attack rolls", "its Hit Point maximum is
  reduced") needs `text` with the book's sentence, rule refs kept as tokens. An effect with neither
  `conditions` nor `text` is rejected.
- Rule terms that are not conditions (Disadvantage, Advantage, damage types) never go in
  `conditions`.
- What happens on a success ("takes half damage and isn't frightened") stays in the ability's
  text: it is not part of the effect.

## Rewriting the text

Replace the words the effect now holds with one `{ "effect": "<key>" }` token. The app shows it as
a chip reading e.g. "Paralyzed until the end of its next turn". Keep every other word and token
exactly as it was. Don't paraphrase. Join with the smallest connecting words ("is ", ": ").

Before:
```json
["A creature other than an Undead or an elf makes a ", { "dc": "con" }, " Constitution save after the hit. On failure, it is ", { "ref": "rule", "key": "paralyzed" }, " until the end of its next turn."]
```
After:
```json
["A creature other than an Undead or an elf makes a ", { "dc": "con" }, " Constitution save after the hit. On failure, it is ", { "effect": "ghoul-paralysis" }, "."]
```

Grapple (the escape DC moves into the effect):
```json
"text": ["A Medium or smaller target is ", { "effect": "grabbed" }, "."],
"effects": [{ "key": "grabbed", "name": "Grabbed", "lands": { "on": "hit" }, "conditions": [{ "ref": "rule", "key": "grappled" }], "lasts": { "kind": "until-removed" }, "ends": { "escape": { "dc": "str" } } }]
```

Repeat saves move into `ends.repeatSave`, and that sentence leaves the text:
"…or have the Frightened condition for 1 minute. The target repeats the save at the end of each of
its turns, ending the effect on itself on a success." becomes `lasts: time 1 minute`,
`ends: { repeatSave: ["end-of-turn"] }`, and the text keeps only "…or be ", effect, ".".

### Abilities with a structured `save`

When the ability has a `save` whose `onFail` lists `conditions` or `also`, the effect lands with
`{ "on": "failed-save" }` and takes over **all** of `onFail.conditions` and whatever `onFail.also`
says about it (how long it lasts, repeat saves, what ends it, what else it does). Give the
failure's new `also` instead of `text`: usually just `[{ "effect": "<key>" }]`, plus any sentence of
the old `also` that is not about the effect. Leave `text` out unless it changes too. Damage stays
where it is.

```jsonc
// Grasping Roots: save { ability: "str", dc: "str", onFail: { conditions: [restrained], also: ["It lasts until the end of its next turn."] } }
{ "ability": "entangle",
  "also": [{ "effect": "rooted" }],
  "effects": [{ "key": "rooted", "name": "Rooted", "lands": { "on": "failed-save" },
                "conditions": [{ "ref": "rule", "key": "restrained" }],
                "lasts": { "kind": "turn", "boundary": "end", "whose": "target" } }] }
```

One ability can leave several effects (a bite that poisons, and a second failure that knocks
unconscious): one effect each, each pointed at from the text.

## Output

Write a JSON array to the result path you were given, one entry per input ability, in input
order:

```jsonc
{ "file": "<as given>", "creature": "<as given>", "ability": "<ability key>", "effects": [...], "text": [...] }
{ "file": "<as given>", "creature": "<as given>", "ability": "<ability key>", "effects": [...], "also": [...] }
{ "file": "<as given>", "creature": "<as given>", "ability": "<ability key>", "skip": "only damage" }
```

Copy every token you keep exactly as given, including `{ "ref": "spell", … }` and `{ "ability": … }`
tokens. Then run

```bash
bun library-workers/effects/apply-results.ts <your result file> --dry
```

and fix every entry it reports, until it reports no failures. Do not run it without `--dry`.
