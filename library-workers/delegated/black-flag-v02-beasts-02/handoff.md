# Black Flag v0.2 beasts, batch 2

This batch covers 20 more of the 29 Beast entries left after the first handoff. All 20 CRs match the original Black Flag Roleplaying Reference Document v0.2. Credits and exact entry IDs, printed pages, and source links are recorded per creature. [Publisher ]() · [Source evidence](source-evidence.json)

| Beast | CR | Publisher pages |
| --- | ---: | ---: |
| Giant Hyena | 1 | 360 |
| Giant Lizard | 1/4 | 363 |
| Giant Octopus | 1 | 364 |
| Giant Owl | 1/4 | 365 |
| Giant Poisonous Frog | 1 | 358 |
| Giant Poisonous Snake | 1/4 | 370 |
| Giant Rat | 1/4 | 367 |
| Giant Scorpion Insect | 3 | 361 |
| Giant Seahorse | 1/2 | 368 |
| Giant Shark | 5 | 369 |
| Giant Spider | 1 | 371–372 |
| Giant Vulture | 1 | 373 |
| Giant Wasp Insect | 1/2 | 361 |
| Giant Weasel | 1/4 | 374 |
| Giant Wolf Spider | 1/4 | 372 |
| Hunter Shark | 2 | 369 |
| Poisonous Snake | 1/8 | 370–371 |
| Polar Bear | 2 | 353 |
| Reef Shark | 1/2 | 369 |
| Riding Horse | 1/4 | 359 |

## Rules and source distinctions

- **Giant Rat.** Its v0.2 bite offers a GM choice of Rat Plague or short poisoning. The points to a Diseased Rats sidebar that it omits. The profile keeps the printed short-poisoning option ready to run and labels the earlier Rat Plague rules as a v0.1 supplement. The encounter's Bite save remains DC 13 from v0.2. [v0.2 Giant Rat]() · [v0.1 Diseased Rats sidebar]()
- **Variants and anatomy.** Giant Octopus keeps its 20-foot Ink Dash at recharge 4–6. Giant Spider's Web and Poisonous Snake's Reflexive Nip continue onto the next page. Giant Poisonous Frog's Bite and Giant Scorpion Insect's Sting apply both printed damage types on a hit. The scorpion's save determines the poisoned condition. Giant Poisonous Snake, Giant Seahorse and Giant Vulture retain their printed attack and damage values where the ability modifiers differ.
- **Search tags.** Black Flag supplies the combat rules and prints no habitat field for these blocks. Habitat tags come from corresponding Monster Manual (2024) forms as encounter suggestions. Giant Poisonous Frog uses the ordinary Giant Frog as an ecological analogue. The artwork supplies the searchable physical details. Exact links are in the source evidence because the catalog's TSV source field excludes addresses.

## Portraits

Giant Poisonous Frog, Giant Scorpion Insect and Giant Wasp Insect already have entry-level generated art. The other 17 use verified generated art from the same animal form under its noun-first Monster Vault name. Those 17 have the older orange parchment and are flagged for a separate style pass. The selected images and their hashes are listed by exact entry. The temporary installation kept the existing credited images in their original order. [Portrait sheet](portrait-contact-sheet.jpg) · [Portrait evidence](portrait-reuse.json)

## Integration and verification

The [rules patch](rules.patch) adds the 20 [profile objects](book-profiles.json). The [portrait index additions](portrait-index-additions.json) point to existing files and can be merged by entry ID after checking for intervening portraits. This batch stages no new raster drafts.

I applied both changes in a temporary copy and ran the library loader. It returned all 20 exact versions as combat summaries. I verified the attacks, mechanics, CRs, habitat and appearance searches, primary art hashes, and all gallery images and credits. The primary checkout and R2 are untouched. [Before](catalog-before.json) · [After](catalog-after.json) · [Verification](verification.json)

Nine source-lookup beasts remain in this printing. They are Saber-Toothed Tiger, Scorpion Insect, Swarm of Bats, Swarm of Insects, Swarm of Poisonous Snakes, Swarm of Quippers, Swarm of Rats, Swarm of Ravens, and War Horse.
