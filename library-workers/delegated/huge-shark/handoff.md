# Huge Shark encounter trial

The current catalog lists **Huge Shark** as CR 4 and sends the DM to look up the rules. The proposed profile adds the runnable **D&D 3.5** encounter, including the Bite, underwater senses, saves and Swim rules. It also makes the printed cold aquatic habitat and the shark's physical features searchable.

| Catalog field | Value |
| --- | --- |
| Entry ID | `beast-1f13dd88728903b1e148a76a` |
| Version key | `d5cbff43522bbf558ab79846` |
| Image key | `beast:huge-shark` |
| Exact printing | `Revised v3.5 SRD (Monsters)`, `3.5 edition` |
| Catalog kind / printed type | Beast / Huge Animal (Aquatic) |
| Challenge | 4 |

## Source evidence

- The Huge column of the shark table gives CR 4, AC 15, 65 HP, a 60 ft. swim speed and a single Bite at +10 for 2d6+7. The text after the table gives Blindsense, Keen Scent, Swim and hunting behavior. I cross-checked the against `MonstersAnimals.rtf` in the library's `SRD-3.5-RTF.zip`. [Revised v3.5 SRD, Animals, printed p. 263]()
- **Use Will +4 for this record.** The original RTF, the and the exact HTML reprint proposed for the catalog all print +4 and list Iron Will. The d20srd.org reprint lists +6, which matches the calculation of +3 base, +1 Wisdom and +2 Iron Will. The profile follows the printed SRD entry and records the difference in its table notes. [Revised v3.5 SRD, Animals, printed p. 263]() · [Proposed HTML reprint](https://olimot.github.io/srd-v3.5/monsters/monsters-animals.html#shark) · [d20srd.org reprint](https://www.d20srd.org/srd/monsters/shark.htm) · [SRD Iron Will feat](https://www.d20srd.org/srd/feats.htm#ironWill)
- The Animal type supplies low-light vision. The Aquatic subtype supplies water breathing and routine swimming. The general Blindsense rule preserves concealment. [Revised v3.5 SRD, Types, Subtypes and Abilities, printed p. 279]()
- The SRD compares the creature to a great white and says it can exceed 20 feet. I used the Smithsonian's description of the white shark's coloration and fins for the rest of the appearance line. The habitat uses the SRD's printed wording, "Cold aquatic." [Revised v3.5 SRD, Animals, printed p. 263]() · [Smithsonian Tropical Research Institute, great white shark identification](https://biogeodb.stri.si.edu/sftep/en/thefishes/species/49)

## Integration

Append the object in [book-profile.json](book-profile.json) to the `profiles` array in `dm-library/bestiary/book-catalog.json`. Set the empty source column on the exact Huge Shark row in `entries.tsv` to the [HTML reprint at the Shark heading](https://olimot.github.io/srd-v3.5/monsters/monsters-animals.html#shark). The TSV validator excludes URLs. The library presents the profile as **Combat summary**, with the source providing the full text.

## Portrait check

[Checked portrait](checked-portrait.webp) is a byte-identical copy of the existing 1254 × 1254 generated portrait. The derivative matches the portrait index SHA-256 `66b340e9ff068327ace5eebbd78c07eeb5a6a2ad0554dcdee10c437a3309e521`. The registered PNG at `assets/images/content/dm-library/revised-35-srd-beasts-05/huge-shark.png` matches its lock entry, `5fc5264564d6ee33a6fdee6f65012da195703f37030b2fa9516bb14472b43c80`.

Use the existing entry-level portrait. Its full silhouette, gray back, pale belly and crescent tail read clearly. The paper is yellower than the final Ice Cat reference. I kept the existing portrait for this rules trial.

## Verification

I loaded the current record and the proposed profile through the same library loader, with the profile and source link applied in a temporary copy. The version key, portrait and alternate artwork matched. The new record returned the correct source URL, CR, HP, speed, Bite and traits. Searches for `cold aquatic` and `crescent-shaped tail` found Huge Shark after the change.

[Current catalog output](catalog-before.json) · [Proposed catalog output](catalog-after.json)
