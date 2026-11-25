# Revised v3.5 SRD viper encounters

The Tiny, Small and Medium Viper Snake entries currently require source lookup. The proposed profiles make each encounter playable from the library and make its marsh habitat and appearance searchable. All three records are beasts in the catalog and Animals in the rules.

| Entry | ID | Version key | CR | Bite | Poison save |
| --- | --- | --- | --- | --- | --- |
| Tiny Viper Snake | `beast-a6767b7ddec1098445fa5e65` | `fda9807f21a91185731edbb3` | 1/3 | +5, 1 damage, 0 ft. reach | Fortitude DC 10 |
| Small Viper Snake | `beast-b0d6ad3ff0c46ddc5176705c` | `445c645c2b2881f1719ac9c5` | 1/2 | +4, 1d2−2, 5 ft. reach | Fortitude DC 10 |
| Medium Viper Snake | `beast-b1ac8eb58291283ade8ea02e` | `15e7390872edd3ad0f71a6fb` | 1 | +4, 1d4−1, 5 ft. reach | Fortitude DC 11 |

## Rules evidence

- All three use the `3.5 edition` printing of `Revised v3.5 SRD (Monsters)`. I checked the family skills, the three stat columns and the poison DC table against the original `MonstersAnimals.rtf` in `output/dm-library/reference/SRD-3.5-RTF.zip`, the local , and the HTML reprint linked by the proposed entries. [Snake skills, printed p. 263]() · [Tiny and Small, printed p. 264]() · [Medium and poison, printed p. 265]() · [Catalog source link](https://olimot.github.io/srd-v3.5/monsters/monsters-animals.html#viper-snake)
- Use initiative **+3** and the listed Weapon Finesse for Tiny and Small in this SRD printing. The d20srd.org reprint gives both +7, adds Improved Initiative, and marks Weapon Finesse as a bonus feat. That matches the later Monster Manual errata for snakes that lack the feat's +1 base attack bonus prerequisite. Medium has +1 base attack bonus and keeps initiative +3 in both listings. The two affected profiles carry this note. [d20srd.org variant](https://www.d20srd.org/srd/monsters/snake.htm#viperSnake) · [Wizards of the Coast collected errata, ``, p. 1](https://media.wizards.com/2014/downloads/dnd/3ECollectedErrata.ZIP)
- Poison deals 1d6 Constitution damage for each failed save. Roll the first Fortitude save after a damaging bite and the second 1 minute later, even if the first succeeds. Small and Medium keep the printed damage dice with the general minimum of 1 before applying defenses. The Animal type supplies low-light vision and neutral alignment. [SRD poison rules](https://www.d20srd.org/srd/specialAbilities.htm#poison) · [SRD minimum damage rule](https://www.d20srd.org/srd/combat/combatStatistics#minimumDamage) · [SRD Animal and Scent rules](https://www.d20srd.org/srd/typesSubtypes.htm#animalType)

## Portraits and event art

All three generated portraits already exist. I inspected the full illustrations and verified the 1254 × 1254 WebP files against the portrait index and the registered PNG files against the lock. Their colors and markings describe the actual portraits. The SRD supplies the size classes and temperate marsh habitat and gives no fixed color or pattern. [Tiny portrait](portraits/tiny-viper-snake.webp) · [Small portrait](portraits/small-viper-snake.webp) · [Medium portrait](portraits/medium-viper-snake.webp) · [Image hashes and source paths](portrait-evidence.json)

The existing portraits use fine linework and a flat yellow parchment field. I compared them with four registered event illustrations. *The Hand Comes for Jim* sets warm sunlight and lanterns against a blue-gray ghost and dark cloth. *Onana Calls the Party to War* uses cool navy, deep shadows and local amber light. *Running from the Battle Cruiser* and *The Green Beam over the Sky Islands* use that same light and color in detailed settings with clear foreground and background depth. [The Hand Comes for Jim]() · [Onana Calls the Party to War]() · [Running from the Battle Cruiser]() · [The Green Beam over the Sky Islands]()

For a future replacement, use the event art as the reference for rendering and lighting. Keep the viper large enough for a square thumbnail and set it low among a few wet reeds, mud or shallow water. Use the light and shadows of that environment to model the scales and keep the background quiet. The existing portraits are coverage evidence for this batch. No replacement art was staged.

## Integration and verification

Append the three objects from [book-profiles.json](book-profiles.json) to the `profiles` array in `dm-library/bestiary/book-catalog.json`. Replace the three matching rows in `entries.tsv` with the rows in [entries-source.tsv](entries-source.tsv). Each replacement fills the source column. The library will label the results **Combat summary**.

I ran the same library loader on the current catalog and on a temporary copy with those edits. Each record kept its version key, portrait and alternate art. The proposed entries returned the correct CR, hit points, movement, attack and poison save. Searches for `temperate marshes` and each portrait's markings found the corresponding entries after the patch. [Current catalog](catalog-before.json) · [Proposed catalog](catalog-after.json)
