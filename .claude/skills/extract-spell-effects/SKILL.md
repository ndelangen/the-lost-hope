---
name: extract-spell-effects
description: Write what a spell leaves on its targets (a condition, a curse, a lasting penalty or boon) as `effects` sub-entities of the spell, for one batch file from library-workers/effects/spells.ts export; results go through `spells.ts apply`.
---

# Extract effects from spells

You get a JSON batch of spells: key, name, duration and printed text (paragraphs of strings and
`{ "ref": "rule", "key": … }` terms). For each spell, decide whether it leaves an **effect** on its
targets. If it does, write the effect as data. The spell's text is **not** changed: effects sit
beside it, so the encounter tracker can apply them to the creatures the spell targets.

Read `src/definitions/status-effect.ts` and `SpellEffect` in `src/definitions/library.ts` first.

## What counts as an effect

An effect is a **reminder for later**: the tracker keeps it on the creature so the DM is reminded
while it lasts. Anything that happens once and is over (damage, healing, a push, a forced move,
a single roll) needs no reminder, so it is never an effect: skip it.

Something that **lands on a creature the caster targets and lasts**: Hold Person's Paralyzed,
Bane's −1d4, Bless's +1d4, Faerie Fire's outline, Slow, Hideous Laughter, Hex. It may help or
harm.

Skip the spell (give `skip` with a short reason) when it only deals damage or heals once; only
affects the caster (Shield, Mage Armor on yourself is still an effect if it can target another
creature, so keep that one); creates an object, area, summon or light without a lasting effect on
a creature; or is purely utility (Detect Magic, Knock, Comprehend Languages). An area spell that
puts a condition on creatures in it (Web, Entangle, Stinking Cloud) **is** an effect. When in
doubt, skip.

## Writing an effect

```jsonc
{
  "key": "held", // lowercase-hyphenated, unique in the spell
  "name": "Held", // what a DM would call it
  "lands": { "on": "failed-save", "save": "wis" }, // or { "on": "hit" } (spell attack), { "on": "use" } (no roll)
  "conditions": [{ "ref": "rule", "key": "paralyzed" }],
  "text": ["…the book's own sentence for what else it does…"], // optional
  "lasts": { "kind": "time", "amount": "1", "unit": "minute" },
  "ends": { "repeatSave": ["end-of-turn"] }, // optional
}
```

- `conditions`: only real conditions (blinded, charmed, deafened, exhaustion, frightened, grappled,
  incapacitated, invisible, paralyzed, petrified, poisoned, prone, restrained, stunned,
  unconscious) **that the spell imposes**, never ones it protects against or ends ("immune to
  being Frightened", "ends the Charmed condition"). Use a rule ref even when the book wrote the
  name as plain text.
- `text`: what it does beyond its conditions, copied word for word from the spell's text (whole
  sentences or clauses). Rule terms the text has as refs stay as refs. An effect needs
  `conditions` or `text`. Keep the spaces between pieces: `["…the ", { rule }, " condition. ", "Its…"]`;
  the checker rejects pieces glued together ("conditions.Its", "the[prone]").
- `lasts`: from the spell's **duration line** and text:
  - `{ "kind": "time", "amount": "1", "unit": "minute" }` for "Concentration, up to 1 minute" or "1 hour";
  - `{ "kind": "turn", "boundary": "end" | "start", "whose": "target" | "source" }` for "until the end
    of its next turn" (target) or "until the start of your next turn" (source = the caster);
  - `{ "kind": "until", "text": [...] }` for an ending in the book's words;
  - `{ "kind": "until-removed" }` when it lasts until dispelled or removed.
    Concentration comes from the spell's duration; do not restate it.
- `ends.repeatSave`: moments the target repeats the save ("at the end of each of its turns" →
  `end-of-turn`, "whenever it takes damage" → `damaged`). Only when `lands` is a failed save.
- `ends.escape`: `{ "dc": "spell" }` when it can escape with a check against the spell save DC.
- `ends.cure`: what removes it early, in the book's words.

A spell with options (Bestow Curse, Blindness/Deafness, Command) gets one effect per option the DM
picks from, each named for the option.

Ignore the "Using a Higher-Level Spell Slot" / "At Higher Levels" paragraph.

## Effects that get worse: `becomes`

Some effects turn into a worse one when the target keeps failing its repeat save: the Basilisk's
gaze restrains first and petrifies on a second failure, Flesh to Stone petrifies after three
failures. Write **one** effect for the first stage, with the repeat save in `ends.repeatSave`, and
put the worse stage in its `becomes`. Never write the second stage as a sibling effect.

```jsonc
{
  "key": "gaze-restrained",
  "name": "Restrained",
  "lands": { "on": "failed-save", "save": "con" },
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
- `outlastsConcentration: true` on the stage when it stays after the caster stops
  concentrating (Petrify: "lasts until the creature is freed by the greater restoration spell").
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

Write a JSON array to the result path you were given, one entry per input spell, in input order:

```jsonc
{ "file": "<as given>", "spell": "<spell key>", "effects": [...] }
{ "file": "<as given>", "spell": "<spell key>", "skip": "only damage" }
```

Then run `bun library-workers/effects/spells.ts apply <your result file> --dry` from the repo root
and fix every entry it reports until it reports no failures. Never run it without `--dry`. Write
no other files.
