# Encounter preparation

Run these commands from the repository root with Bun.

```sh
bun dm-library/bestiary/catalog.ts encounter beast wolf
bun dm-library/bestiary/catalog.ts encounter beast 'The Lost Hope DM Library'
bun dm-library/bestiary/catalog.ts encounter species 'Pallid Elf'
bun dm-library/bestiary/catalog.ts npcs dragonborn
bun dm-library/bestiary/catalog.ts coverage
```

| Encounter status           | What is available                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `local-stat-block`         | Combat statistics, traits, and actions in the command output.                            |
| `homebrew-stat-block`      | Original local rules for the named creature or character.                                |
| `linked-access-unverified` | An online creature listing. Some publisher pages require access to the underlying rules. |
| `source-lookup`            | The publication name and edition for looking up the original rules.                      |

`coverage` counts publication records for beasts and playable species. The same named creature can have different rules across editions. For example, the 2014 wolf's knockdown uses a Strength save. The 2024 wolf's bite applies Prone to a Medium or smaller target on a hit. Use the encounter-building rules for the selected edition.

## Monster Manual (2014)

Search the book without a creature kind to include its beasts as well as its other monsters.

```sh
bun dm-library/bestiary/catalog.ts manual-coverage
bun dm-library/bestiary/catalog.ts encounter 'Monster Manual (2014)'
bun dm-library/bestiary/catalog.ts encounter 'Acererak'
bun dm-library/bestiary/catalog.ts manual-rules 'Rogue Modron'
bun dm-library/bestiary/catalog.ts manual-rules template
```

- `manual-combat-profile` gives AC, hit points, Hit Dice, speed, and challenge. It also gives ability scores, saves, and attack rolls where those numbers could be verified. Inferred size is labeled. Some entries have extra table notes. Use the edition rules for effects the profile omits, including some spells, damage defenses, and legendary actions.
- `manual-variant` names the base creature and lists the adjustments. A variant with one base inherits its numeric profile. A Rogue Modron can use any of five ranks, so choose the rank first.
- `srdAlternative` offers a runnable SRD 5.1 block when the name, AC, HP, and challenge match. It identifies the SRD as its publication because this check covers those fields alone.
- `manual-rules` includes four templates and group options such as dragon spellcasting, hag covens, and summoning.

The printed index has 445 page-addressed entries. This audit separates the age groups of the faerie dragon and the three yuan-ti malison forms. It also includes in-chapter variants and the seven index aliases. The Dust Devil has a standalone Basic Rules (2014) stat block. The 2014 Monster Manual describes it under the blue dragon’s regional effects.

## Other books

```sh
bun dm-library/bestiary/catalog.ts book-coverage
bun dm-library/bestiary/catalog.ts encounter 'DDEX1-04'
bun dm-library/bestiary/catalog.ts encounter monster 'Aboleth'
bun dm-library/bestiary/catalog.ts encounter species 'Ghostwise Halfling'
bun dm-library/bestiary/catalog.ts book-rules 'Half-Dragon'
```

- `local-stat-block` includes complete creature blocks from the two fifth-edition SRDs. The catalog has 317 blocks from SRD 5.1 and 331 from SRD 5.2.1. A few creature entries depend on a spell or item and still require a lookup.
- `book-combat-profile` gives the verified combat numbers in the original ruleset. Check `bookRuleset` before using them. For example, AD&D profiles can use descending AC, and fourth-edition profiles give level, role, and defenses. Check the original rules where a profile omits powers or effects.
- `srdAlternative` gives a separate, edition-matched SRD block for a fifth-edition profile when its name, AC, HP, and challenge match. Other rules can differ between the two printings.
- `local-summary` lists available playable species traits. Some options inherit abilities from a base species or class.
- `book-rules` lists templates and variants with their eligible creatures and adjustments. An index-only rule identifies a book's version for lookup.

The book pass added 1,823 combat profiles, 60 playable options, and 26 template or variant records. It screened 762 publications for text, including 156 with too little extracted text for a reliable scan. The two Ravenloft _Denizens_ books also have 260 creature index records. Index entries help find a creature by name and can still require a lookup for its stats. The catalog counts printings separately when a creature appears in several books.

Six original fifth-edition-compatible blocks have provisional challenge ratings. Each has behavior a DM can show before combat, and the matching entry in the [idea library](../ideas.txt) gives a way to interact with it.

The NPC concepts include a motive, hook, and encounter role. Each reusable build states which rulesets it supports. Player-species traits appear separately as an SRD summary where one is available. The encounter ideas and NPC concepts are available for prep. They become campaign canon when the DM uses them.

See the [publication coverage](publications.md) and [rules and image credits](sources/README.md) for the scope of the catalog.

## 5e.tools comparison

```sh
bun dm-library/bestiary/catalog.ts search 5e.tools
bun dm-library/bestiary/catalog.ts encounter monster Roper
bun dm-library/bestiary/catalog.ts encounter species Kenku
```

The first pass compared names across the 2014 and 2024 Monster Manuals and _Monsters of the Multiverse_. It added 15 profiles for the 2024 rules and 11 playable species summaries. Ten of the profiles have a runnable SRD 5.2.1 alternative. Creature profiles also include encounter ideas, such as giving the party a route around a roper's reach.

| Creature        | 2014        | 2024       |
| --------------- | ----------- | ---------- |
| Aboleth         | 135 HP      | 150 HP     |
| Galeb Duhr      | 85 HP       | 123 HP     |
| Gelatinous Cube | 84 HP       | 63 HP      |
| Roper           | Monstrosity | Aberration |
| Rust Monster    | 27 HP       | 33 HP      |

The 15 sampled monsters kept their AC and challenge rating. Ten changed HP. Check the selected printing before using an attack or ability.

The full pass covers the bestiary and playable-species indexes in the pinned 5e.tools release, including named variants. It added 2,602 creature records and 242 species or lineage records. The 4,128 additional combat profiles include entries that were already listed by name. The 335 new species summaries give the physical traits and named abilities available in the source data.

The private `comparison.json` maps source entries to library records and records the original profile gaps.

`bookReference` gives the relevant source page or pages and verified image links. The library keeps multiple distinct illustrations when the source has them. It also keeps available tokens for entries without illustrations and for selected variants that only share their base creature's illustration. Private downloads are grouped by entity type and name under `output/dm-library/5etools/images`. The adjacent `image-credits.json` maps each record to its files and lists artists when the source names them.

## Resolved and scalable encounters

```sh
bun dm-library/bestiary/catalog.ts encounter 'Reduced-Threat Aboleth'
bun dm-library/bestiary/catalog.ts encounter 'Bestial Spirit'
bun dm-library/bestiary/catalog.ts scale-creature 'Bestial Spirit' --publication 'Player’s Handbook' --form Land --spell-level 4 --proficiency 3 --spell-attack 7
```

The follow-up added 109 full local blocks, 111 compact combat profiles, and 126 scalable entries. The full blocks use matching SRD creatures and apply the adventure adjustments. Compact profiles show defenses, ability scores, and available attack and save numbers. Named conditions or spells in those profiles can still require a rules lookup.

Use `encounter` to find a scalable creature's publication, forms, and required inputs. `--level` means the class level when the recipe comes from a class. Supply ability modifiers, rather than scores, to options such as `--wisdom` and `--intelligence`. `--spell-attack` takes your total spell attack bonus. A materialized profile gives the scaled numbers using your inputs. Check its source for targeting, timing, and conditional effects.

## Final seven entries

The library uses the printed challenge ratings for the two disputed creatures. The Boggle in _Volo's Guide to Monsters_ is CR 1/8 and awards 25 XP. The D&D Beyond legacy index displays CR 1/2. The Mossback Steward inherits the Horizonback Tortoise's CR 8 and 3,900 XP. Its adventure changes the tortoise's mental scores, skills, communication, and spells.

Elzerina Cassalanter, Terenzio Cassalanter, Nat, Jenks, and Squiddly each have a `homebrew-stat-block`. These are CR 0 noncombatants with actions for rescue, escape, or distraction scenes. The catalog keeps _Waterdeep: Dragon Heist_ as the character's publication and labels the mechanics as homebrew.

The private `encounter-follow-up.json` records the result for all 353 original gaps.

## Building a play-ready creature sheet

Open the [2014 Aboleth]() for the worked example. The same sheet renders every monster and beast. Edit the creature's printing in the catalog. The page derives its layout from that record.

A printing is play-ready when a DM can put the creature into initiative, choose a legal turn, resolve the target's response, and carry the consequences into the next round using the sheet and its linked rules. For a hazard or noncombatant, run its own procedure through its end condition.

- Identify the printing, edition, and page or source. Check the portrait, caption, and credits against the creature or named variant.
- Supply the numbers the ruleset uses for initiative, defenses, hit points, movement, saves, and attacks. Preserve fractional challenge and conditional values. Document a formula or required input when a fixed number would mislead.
- Put each named ability on its own line under the printed timing, such as `Actions`, `Reactions`, or `Legendary actions`. Give the trigger, legal targets, reach or range, roll or save, result on a hit or save, duration, and ending condition wherever they apply. State costs, recharge, and repeat-use restrictions. Link any spell, condition, summoned form, or base profile the DM needs.
- Give named abilities an `abilityDisplay` entry on the same stat block. Key it by the printed name without the usage suffix. For example, `"Tentacle": { "icon": "gi/GiTentacleStrike", "kind": "melee" }` also works when a printing calls it `Tentacle (1 action)`. Use the encounter tool’s ability kinds: `melee`, `ranged`, `attack`, `save`, `healing`, or `other`. The kind supplies the label and color. Search the icon catalog and choose an icon the sheet can render. Check the rendered ability, its rule links, and the six ability score icons on a narrow screen.
- Use `DM tactics` for an optional opening move, a response to a change in the fight, and a choice the players can make. Keep printed rules in their own sections. Record a ruling in `ruleNotes` when the book leaves a number or outcome to the DM.
- Open the page and run a turn. For the 2014 Aboleth, resolve three Tentacle attacks, follow the disease through its first minute, then spend two legendary actions on Psychic Drain against an eligible target. Try its lair action on initiative 20. Switch to the 2024 printing and check the 150 HP and different Multiattack. Return to 2014 and open a spell or condition link from the ability text.

After checking the complete procedure, set `"tableReviewed": true` on that exact local stat block. Review each printing independently. A partial summary keeps its coverage label and source link. Recheck the flag whenever rules change. Save a printing-specific URL for the worker reviewing the batch.

The live encounter tool tracks initiative, hit points, conditions, and spent uses for campaign combatants. The fight simulator executes prepared scenarios with modeled targeting, tactics, and effects. The library's Play-ready label records the tabletop walkthrough. A simulator integration needs executable mechanics and its own scenario test.
