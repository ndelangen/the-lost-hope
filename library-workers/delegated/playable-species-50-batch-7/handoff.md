# DM library batch 7

The staged patch adds 50 player profiles and 50 linked NPCs against catalog commit `ac1dddd`. It includes 50 original plain-parchment portraits.

[Catalog patch](rules.patch) · [Source and ownership manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json) · [Approved roster](claims.tsv)

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Aboleth to Demilich](portraits-1.jpg) · [Displacer Beast to Zevite](portraits-2.jpg)

The manifest locates the square PNGs. The part handoffs link to the ImageGen prompts and thumbnail comparisons. The portrait index preview records the exact entry and version keys.

## Sources and grouping

- Twenty-seven EN Publishing heritages use native Level Up rules. Birdfolk uses its original Gazette #5 options. Voidrunner characters use the sci-fi classes, equipment, and traits from their own book. [Level Up heritage index](https://a5e.tools/rules/heritages)
- Twenty-three player conversions use Tyler Kamstra's 2018 *Monstrous Races* for 2014 fifth edition. Each catalog profile names the author and describes the consulted source in its printed locator. The manifest links the exact pages and specifies the DMs Guild preview, v2, or the other printed scan used. [DMs Guild publication](https://www.dmsguild.com/product/230312/Monstrous-Races) · [Publisher preview]()
- Animated Armor, Flying Sword, and Rug of Smothering share the Animated Object profile. Eye Tyrant, Death Tyrant, and Spectator share Beholder. Needle, Twig, and Vine Blight share Blight. Each grouped species has one NPC and one portrait. The existing encounter entries remain in their own catalog kind.

## Manual review

I applied the patch and copied the version-specific portraits into a disposable copy of catalog commit `ac1dddd`. I checked these flows in the local DM Library.

- Bulette search went from zero playable results to one. Searching for land shark found the same playable profile, which showed the v2 locator, Tyler Kamstra credit, portrait, and Marl's NPC build. The existing monster search still returned the separate Bulette entry. [Before and after](search-comparison.jpg) · [Bulette detail](bulette-detail.jpg)
- Flying Sword found the shared Animated Object profile with the DMs Guild preview locator, portrait, and Brass Sentry build. [Animated Object detail](animated-object-detail.jpg)
- Gray found the Voidrunner's Codex Grey profile and portrait. I followed Iri Vale's link to the NPC's actions and stats. [Grey detail](grey-detail.jpg)

All three sampled portraits loaded at 1254 × 1254. The browser console showed no warnings or errors in these checks. Existing inline glossary links can still open shared fifth-edition compendium entries. Use the selected printing, printed locator, and source link for profile provenance.

The authors manually checked the source rules, NPC arithmetic, and artwork. Independent reviewers sampled build rules and checked canonical grouping, publication keys, and portrait files and identifiers. No automated tests ran. The primary checkout and R2 were left alone.

## Source handoffs and prompts

- Birdfolk, Cervid, Chrysalian, Constructed, Dreamborn. [Gate Pass Gazette, first group](parts/seven_gazette_a/handoff.md)
- Dryadborn, Galeoni, Garoul, Madrai, Oxfolk. [Gate Pass Gazette, second group](parts/seven_gazette_b/handoff.md)
- Pantheran, Pode, Shadowcast, Spiderfolk, Zevite. [Gate Pass Gazette, third group](parts/seven_gazette_c/handoff.md)
- Motley, Mycelial, Oozefolk, Ratling, Rockborn. [Dungeon Delver's Guide](parts/seven_delver/handoff.md)
- Axon, Grey, Houseki, Hurroc. [Voidrunner's Codex, first group](parts/seven_void_a/handoff.md)
- Keridani, Naato, Sipher. [Voidrunner's Codex, second group](parts/seven_void_b/handoff.md)
- Aboleth, Animated Object, Ankheg, Banshee. [Monstrous Races, first group](parts/seven_monstrous_a/handoff.md)
- Basilisk, Behir, Beholder, Blight. [Monstrous Races, second group](parts/seven_monstrous_b/handoff.md)
- Bulette, Cambion, Carrion Crawler, Chimera. [Monstrous Races, third group](parts/seven_monstrous_c/handoff.md)
- Chuul, Cloaker, Cockatrice, Couatl. [Monstrous Races, fourth group](parts/seven_monstrous_d/handoff.md)
- Crawling Claw, Cyclops, Darkmantle, Demilich. [Monstrous Races, fifth group](parts/seven_monstrous_e/handoff.md)
- Displacer Beast, Dragon Turtle, Mimic. [Monstrous Races, sixth group](parts/seven_monstrous_f/handoff.md)
