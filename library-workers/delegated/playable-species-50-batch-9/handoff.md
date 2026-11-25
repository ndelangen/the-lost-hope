# DM library batch 9

The patch adds 50 player profiles and 50 linked NPCs against catalog commit `41d0241`. The separate staging area contains 50 original plain-parchment portraits.

[Catalog patch](rules.patch) · [Source and ownership manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json) · [Approved roster](claims.tsv)

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Aurochs to Remorhaz](portraits-1.jpg) · [Roc to Yeti](portraits-2.jpg)

The manifest locates the original square PNGs. The part handoffs include the built-in ImageGen prompts and thumbnail comparisons.

## Sources and grouping

- Tyler Kamstra's two DMs Guild volumes supply 35 and 15 profiles, respectively. All use the 2014 fifth-edition rules. Each profile identifies the consulted printing and folio. The first volume uses v2. [Monstrous Races](https://www.dmsguild.com/product/230312/Monstrous-Races) · [Monstrous Races 2](https://www.dmsguild.com/en/product/248038/monstrous-races-2)
- Printed forms share their species profile, including Fungi, Mephit, Modron, Slaad, Sea Spawn, Vegepygmy and Cattle. The Vegepygmy Chief remains a feat. Each profile has one NPC and one portrait. Separate encounter entries retain their catalog kind.
- The part handoffs distinguish printed traits from design commentary and record table rulings, including the Yeti's incomplete Chilling Gaze DC and the Elder Brain's Mind Blast shape wording. The Shield Guardian build uses the printed player creature that has broken its amulet bond. [Yeti notes](parts/nine_mr1_f/handoff.md) · [Elder Brain notes](parts/nine_mr2_a/handoff.md) · [Shield Guardian notes](parts/nine_mr1_d/handoff.md)

## Manual review

I applied the batch and copied its version-specific portraits into a disposable copy of catalog commit `41d0241`. I checked the following in the local DM Library.

- Owlbear search went from zero playable results to one. Its v2 p. 168 detail showed Tyler Kamstra's credit, the portrait, and Briarwatch's linked NPC. Following that link opened the NPC's stats and actions. The Monsters tab still returned the separate Owlbear record. [Before and after](search-comparison.jpg) · [Owlbear detail](owlbear-detail.jpg)
- Ogre Mage search opened the playable Oni profile, its p. 161 locator, and Rusk Toll's linked build. [Oni detail](oni-detail.jpg)
- Deep Rothe and Bovine searches both found the Cattle profile. The detail showed its sequel publication, grouped forms, and Flintmoss's linked NPC. [Cattle detail](cattle-detail.jpg)

All three sampled portraits loaded at 1254 × 1254. The browser console showed no warnings or errors. Existing inline glossary links can still open shared fifth-edition compendium entries. Use each profile's selected printing and locator to identify its rules.

The authors checked source rules, NPC arithmetic, and portraits manually. Independent reviewers sampled builds and checked publication scopes, grouping, and portrait identities. No automated tests ran. The primary checkout and R2 were left alone.

## Source handoffs and prompts

- Bullywug, Fomorian, Fungi, Gorgon, Hell Hound. [Monstrous Races v2, group A](parts/nine_mr1_a/handoff.md)
- Mephit, Modron, Nightmare, Oni, Owlbear. [Monstrous Races v2, group B](parts/nine_mr1_b/handoff.md)
- Pegasus, Piercer, Pseudodragon, Purple Worm, Remorhaz. [Monstrous Races v2, group C](parts/nine_mr1_c/handoff.md)
- Roc, Roper, Scarecrow, Shield Guardian, Slaad. [Monstrous Races v2, group D](parts/nine_mr1_d/handoff.md)
- Specter, Stirge, Tarrasque, Unicorn, Water Weird. [Monstrous Races v2, group E](parts/nine_mr1_e/handoff.md)
- Will-o’-Wisp, Wraith, Wyvern, Xorn, Yeti. [Monstrous Races v2, group F](parts/nine_mr1_f/handoff.md)
- Awakened Shrub, Axe Beak, Blink Dog, Death Dog, Giant Fire Beetle. [Monstrous Races v2, group G](parts/nine_mr1_g/handoff.md)
- Elder Brain, Quickling, Sea Spawn, Shadow Mastiff, Slithering Tracker. [Monstrous Races 2, group A](parts/nine_mr2_a/handoff.md)
- Spawn of Kyuss, Trapper, Vargouille, Vegepygmy, Xvart. [Monstrous Races 2, group B](parts/nine_mr2_b/handoff.md)
- Aurochs, Cattle, Dolphin, Rot Grub, Yeth Hound. [Monstrous Races 2, group C](parts/nine_mr2_c/handoff.md)
