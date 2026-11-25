# Revised v3.5 SRD beast batch

This batch covers all 18 remaining beasts marked for source lookup in this printing after the Huge Shark and three-viper trials. Each profile gives the published stats, encounter mechanics and searchable habitat and appearance. [Exact entry IDs, version keys and source rows](source-evidence.json)

| Beast | CR | Encounter detail |
| --- | ---: | --- |
| Bat | 1/10 | Blindsense 20 ft. and conditional Listen and Spot bonuses |
| Cat | 1/4 | Two claws and a bite on a full attack |
| Dog | 1/3 | Tracking by scent. The source fills a blank catalog CR |
| Giant Constrictor Snake | 5 | Improved Grab and 1d8+10 Constrict |
| Heavy Horse | 1 | Secondary hooves, no attacks while carrying a rider |
| Heavy Warhorse | 2 | Two hooves and a bite, mounted combat |
| Huge Viper Snake | 3 | Injury poison, Fortitude DC 14 |
| Large Shark | 2 | Underwater blindsense and keen scent |
| Large Viper Snake | 2 | Injury poison, Fortitude DC 11 |
| Light Horse | 1 | Secondary hooves, no attacks while carrying a rider |
| Light Warhorse | 1 | Two hooves and a bite, mounted combat |
| Lizard | 1/6 | Climb movement and Dexterity-based Climb checks |
| Medium Shark | 1 | Underwater blindsense and keen scent |
| Rat | 1/8 | Climb and swim movement with Dexterity-based checks |
| Raven | 1/6 | Both claws resolve as one attack |
| Roc | 9 | Talons and bite, Snatch, Flyby Attack and Wingover |
| Toad | 1/10 | Amphibious, 5 ft. land speed, no listed attack |
| Weasel | 1/4 | Attach, automatic bite damage while attached, AC 12 |

## Sources and discrepancies

The profiles follow the library's exact `Revised v3.5 SRD (Monsters)` and `3.5 edition` rows. I extracted the original `MonstersAnimals.rtf` and `MonstersO-R.rtf` from the local SRD archive, checked the linked HTML tables, and recorded the viewer page and printed fields for each beast. The runnable notes also use the SRD's general rules for natural weapons, minimum damage, poison, mounted combat and grappling. [SRD Monsters ]() · [Animals reprint](https://olimot.github.io/srd-v3.5/monsters/monsters-animals.html) · [Roc reprint](https://olimot.github.io/srd-v3.5/monsters/monsters-o-r.html#roc)

- **Cat, Lizard, Rat, Raven and Weasel.** The later Monster Manual errata makes Weapon Finesse a bonus feat and adds Stealthy, Alertness or Agile as applicable. The profiles keep the original SRD skills and list the errata values in table notes. The errata would raise Rat's Move Silently to +12. The d20srd.org Rat page retains +10 even though it adds Stealthy and raises Hide. [Wizards' collected errata, ``, p. 1](https://media.wizards.com/2014/downloads/dnd/3ECollectedErrata.ZIP) · [Rat reprint](https://www.d20srd.org/srd/monsters/rat.htm)
- **Huge Viper Snake.** The RTF, and both HTML reprints give flat-footed AC 15. Subtracting the listed +2 Dexterity bonus from AC 15 gives 13. The profile keeps the printed 15 and explains the discrepancy. [SRD, printed p. 265]() · [Linked HTML table](https://olimot.github.io/srd-v3.5/monsters/monsters-animals.html#viper-snake) · [d20srd.org table](https://www.d20srd.org/srd/monsters/snake.htm#viperSnake)
- **Bat and Rat.** The Bat's blindsense leaves the normal total-concealment rules in force. Rat's text repeats its +8 racial Swim bonus. The printed Swim +10 uses that bonus once. [Bat, printed p. 244]() · [Blindsense rules](https://www.d20srd.org/srd/specialAbilities.htm#blindsightAndBlindsense) · [Rat, printed p. 261]()
- **Mounts, grabs and flight.** The profiles include the warhorse rider's DC 10 Ride check, the Constrictor's hold and squeeze, and the Roc's Snatch, release and fling options. Large and Huge Viper each use the printed poison DC, with the second save due after one minute even when the first succeeds. [Ride](https://www.d20srd.org/srd/skills/ride.htm) · [Improved Grab](https://www.d20srd.org/srd/specialAbilities.htm#improvedGrab) · [Monster feats](https://www.d20srd.org/srd/monsterFeats.htm) · [Poison](https://www.d20srd.org/srd/specialAbilities.htm#poison)

## Portrait review

**Six missing generated beast portraits.** Bat, Cat, Giant Constrictor Snake, Lizard, Rat and Weasel each have a revised square 1254 × 1254 draft. The first drafts put the animals in scenes. The revisions follow the approved creature portraits with a single full-color subject on plain muted gray-tan paper. The event art guides the lighting and texture on the animals. I checked that the constrictor's head, coils and tail tip read clearly in the square. The original drafts are retained for comparison. [Labeled before and after](portrait-before-after.jpg) · [Revised drafts](portraits/revised/) · [Prompts and direct references](portrait-prompts-revised.json)

**Twelve existing generated portraits.** Eleven are registered parchment portraits. Raven has a generated local portrait and flight study, with a softer outdoor treatment. I kept the existing portraits as coverage and recorded the style differences separately. The source-art queue also lists shared Allosaurus files under several entries, including Bat and Rat. Those associations predate this batch and remain for the artwork audit. [Existing portrait contact sheet](existing-portrait-contact-sheet.jpg) · [Per-entry portrait evidence and hashes](portrait-evidence.json)

## Integration and checks

1. Append the 18 objects in [book-profiles.json](book-profiles.json) to the `profiles` array in `dm-library/bestiary/book-catalog.json`.
2. Replace the 18 matching rows in `entries.tsv` using [entries-source.tsv](entries-source.tsv). The source column changes for all 18 and the CR column changes for Dog.
3. Review the six revised portraits in `portraits/revised/` before registration. The staged rules work independently of portrait approval.

The library loader returned a **Combat summary** for each proposed version in a temporary copy. I checked the rendered fields, attacks, mechanics, exact IDs, search results for each habitat and appearance phrase, and the existing galleries. A fingerprint of 28,138 other versions' IDs, status, source and art matched before and after. The shared checkout, registry and R2 received no changes. [Before](catalog-before.json) · [After](catalog-after.json)
