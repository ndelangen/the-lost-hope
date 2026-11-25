# Black Flag v0.2 beasts, final batch

These nine entries complete the 49 Black Flag v0.2 Beast records that required a source lookup. The publisher's supplies the CRs and combat rules. Each record's searchable habitat and appearance has its own provenance. [Exact IDs, source pages and habitat evidence](source-evidence.json)

| Beast | CR | Publisher pages |
| --- | ---: | --- |
| Saber-Toothed Tiger | 2 | [372–373]() |
| Scorpion Insect | 0 | [361]() |
| Swarm of Bats | 1/4 | [352–353]() |
| Swarm of Insects | 1/2 | [362]() |
| Swarm of Poisonous Snakes | 2 | [371]() |
| Swarm of Quippers | 1 | [366]() |
| Swarm of Rats | 1/4 | [367]() |
| Swarm of Ravens | 1/4 | [367–368]() |
| War Horse | 1/2 | [359–360]() |

## Rules and references

All six swarms retain the printed classification, Medium Swarm of Tiny Beasts, and the full Swarm and Swarm Resilience rules. Each has two piercing damage rolls and a printed half-HP threshold. Swarm of Poisonous Snakes keeps the separate DC 14 CON save against poison damage at either HP total. Swarm of Ravens keeps the printed 5-foot reach and the explicit requirement that its target be in the swarm's space. [Snake swarm, p. 371]() · [Raven swarm, p. 368]()

Swarm of Rats keeps the printed DC 9 CON save and the v0.2 option to poison the target through the end of its next turn. Its other option points to a Diseased Rats sidebar the v0.2 omits. The profile labels the older v0.1 sidebar separately, as in the Giant Rat profile. [v0.2 Swarm of Rats]() · [v0.1 Diseased Rats sidebar]()

The habitat tags are encounter suggestions drawn from corresponding Monster Manual (2024) creatures. Swarm of Quippers also prints Water Breathing and a swim speed in Black Flag. Wizards confirms that its 2024 counterpart is named Swarm of Piranhas, whose habitat is Underwater. Its combat statistics stay with its own printing. [2024 name crosswalk, p. 14]() · [Swarm of Piranhas habitat](https://www.dndbeyond.com/monsters/5195227-swarm-of-piranhas)

## Portraits

Scorpion Insect and War Horse keep their existing entry-level generated art. The six swarms and Saber-Toothed Tiger can use verified same-form portraits already available under their Monster Vault names. I checked the nine square images and their hashes. The tiger has saturated orange parchment. The six swarms have older yellow paper and softer pencil shading. Those are style gaps in existing art. The proposed assignments preserve the credited gallery images and add no new raster drafts. [Portrait sheet](portrait-contact-sheet.jpg) · [Per-entry provenance](portrait-reuse.json)

## Integration and verification

The [rules patch](rules.patch) adds the nine [profile objects](book-profiles.json). The [seven portrait index additions](portrait-index-additions.json) point to existing files. Merge by exact entry ID, checking for any intervening registrations. The source TSV stays unchanged because its source validator excludes URLs. The evidence file gives the exact page links.

I applied the rules and image index additions in a temporary copy. The nine versions loaded as combat summaries with searchable habitats and appearances and the expected primary portrait hashes. I checked the exact version keys, attacks, mechanics, and existing gallery order and credits. I then loaded all three batches together. All 49 verified, with seven existing generated portraits and 42 same-form portrait assignments. The primary checkout and R2 are untouched. [Final batch before](catalog-before.json) · [Final batch after](catalog-after.json) · [Verification across all three batches](verification-all-three-batches.json)
