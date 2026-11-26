---
name: extract-item-effects
description: Write what a magic item leaves on a creature (a potion's boon, a weapon's poison, an item power's condition) as `effects` sub-entities of the item, for one batch file from library-workers/effects/items.ts export; results go through `items.ts apply`.
---

# Extract effects from magic items

You get a JSON batch of magic items: key, name, category and printed text (paragraphs of strings
and `{ "ref": "rule", "key": … }` terms). For each item, decide whether using it leaves an
**effect** on a creature. If it does, write the effect as data. The item's text is **not** changed:
effects sit beside it, so the encounter tracker can apply them to whoever drinks, wears or is hit
by the item.

Read `src/definitions/status-effect.ts` and `ItemEffect` in `src/definitions/library.ts` first.

## What counts as an effect

An effect is a **reminder for later**: the tracker keeps it on the creature so the DM is reminded
while it lasts. Anything that happens once and is over (damage, healing, a push, a forced move,
a single roll) needs no reminder, so it is never an effect: skip it.

Something that **lands on a creature and lasts**: Potion of Giant Strength's Strength score for
1 hour, Potion of Poison's Poisoned for 1 hour, Potion of Invisibility, Oil of Etherealness, a
dagger whose hit poisons, a wand that paralyzes on a failed save. It may help or harm.

Skip the item (give `skip` with a short reason) when it only heals or deals damage once, gives
the wielder a permanent bonus while worn or wielded (+1 armor, Ring of Protection: that is the
item, not an effect), creates an object, summons something, or is utility (Bag of Holding). When in
doubt, skip.

## Writing an effect

```jsonc
{
  "key": "poisoned", // lowercase-hyphenated, unique in the item
  "name": "Poisoned", // what a DM would call it
  "lands": { "on": "failed-save", "save": "con", "dc": 13 }, // or { "on": "use" } (drunk, applied, activated), { "on": "hit" }
  "conditions": [{ "ref": "rule", "key": "poisoned" }],
  "text": ["…the book's own words for what else it does…"], // optional
  "lasts": { "kind": "time", "amount": "1", "unit": "hour" },
}
```

- `lands`: `use` for a potion or oil on whoever drinks or is anointed, or a power that needs no
  roll; `hit` for a weapon's hit; `failed-save` with the item's printed save ability and DC number.
- `conditions`: only real conditions (blinded, charmed, deafened, exhaustion, frightened, grappled,
  incapacitated, invisible, paralyzed, petrified, poisoned, prone, restrained, stunned,
  unconscious) **that the item imposes**, never ones it protects against or ends. Use a rule ref
  even when the book wrote the name as plain text.
- `text`: what it does beyond its conditions, copied **word for word** from the item's text (whole
  sentences or clauses), keeping the spaces between pieces. An effect needs `conditions` or `text`.
- `lasts`: `{ "kind": "time", "amount": "1", "unit": "hour" }`; `{ "kind": "turn", "boundary": "end",
  "whose": "target" }` for "until the end of its next turn"; `{ "kind": "until", "text": [...] }` for
  an ending in the book's words; `{ "kind": "until-removed" }`.
- `ends`: optional `repeatSave` moments (only with a failed save), `escape: { "dc": 15 }`, or `cure`
  in the book's words.

An item with kinds or options that each do something different (Potion of Giant Strength by giant,
Potion of Resistance by damage type) gets **one effect** whose text says what varies, unless the
options impose different conditions.

## Effects that get worse: `becomes`

Some effects turn into a worse one when the target keeps failing its repeat save: the Basilisk's
gaze restrains first and petrifies on a second failure, Flesh to Stone petrifies after three
failures. Write **one** effect for the first stage, with the repeat save in `ends.repeatSave`, and
put the worse stage in its `becomes`. Never write the second stage as a sibling effect.

```jsonc
{
  "key": "gaze-restrained",
  "name": "Restrained",
  "lands": { "on": "failed-save", "save": "con", "dc": 12 },
  "conditions": [{ "ref": "rule", "key": "restrained" }],
  "lasts": { "kind": "until-removed" },
  "ends": { "repeatSave": ["end-of-turn"] },
  "becomes": {
    "failures": 1, // "Second Failure", "on a failure": 1; "fails three of these saves": 3
    "key": "gaze-petrified", // its own key, unique like any effect's
    "name": "Petrified",
    "conditions": [{ "ref": "rule", "key": "petrified" }],
    "lasts": { "kind": "until-removed" },
  },
}
```

- The stage **replaces** the first stage, so "instead of the Restrained condition" needs no
  words. It has no `lands` (it lands on the same save) and no `becomes` of its own; it may have its
  own `text`, `lasts` and `ends`.
- The repeat save must come at the end of the target's turn (`"end-of-turn"` in
  `ends.repeatSave`): that is when the tracker asks for it.
- `ends.successes`: when it takes more than one successful repeat save to end ("If it
  successfully saves against this spell three times, the spell ends"), give the count, e.g. `3`.
- Text may point at the stage by its key, like any effect: "Second Failure: the target is " +
  `{ "effect": "gaze-petrified" }`.
- Only a repeat of the **same** save can bring on a stage. When the later save is a different one
  (Prismatic Spray's Indigo ray lands on Dexterity, then repeats Constitution) or the effect
  landed without a save (a disease on a hit), keep the later stage in `text`.
- "Fails by 5 or more" is not a stage: it happens at once. Leave it in the text or `text` as
  before.

## Output

Write a JSON array to the result path you were given, one entry per input item, in input order:

```jsonc
{ "file": "<as given>", "item": "<item key>", "effects": [...] }
{ "file": "<as given>", "item": "<item key>", "skip": "only heals once" }
```

Then run `bun library-workers/effects/items.ts apply <your result file> --dry` from the repo root
and fix every entry it reports until it reports no failures. Never run it without `--dry`. Write no
other files.
