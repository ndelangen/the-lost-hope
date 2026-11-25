# DM Library batch 10

The staged patch adds 50 playable profiles and 50 linked NPCs against catalog commit `22216c4`. Each species has a version-specific plain-parchment portrait. The batch uses 35 profiles for the 2014 rules and 15 for the 2024 rules.

[Catalog patch](rules.patch) · [Source and ownership manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json) · [Reviewed roster](claims.tsv)

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Portraits 1–25](portraits-1.jpg) · [Portraits 26–50](portraits-2.jpg)

The manifest lists the square PNG originals. Each source handoff includes its generation prompts and portrait review.

## Source decisions

- Dara and Nakudama use the 5.5e , July 2025 second printing, ISBN 978-1-954777-16-3. The final Dara profile groups both colors and records how the NPC handles the talisman wording. The Nakudama uses the printed 30-foot speed. [Obojima handoff](parts/ten_obojima/handoff.md)
- The final Ryoko book headings read Fuyōren and Ryokido. The original roster spellings remain searchable, as does Lion Turtle. The final Gobboc art follows Heliana’s printed chicken-like anatomy.
- The creature-name matches from Kamstra’s v2 are independent playable rules. Their beast and monster encounter records keep their own catalog entries and stat blocks.

## Manual review

I applied the staged patch and copied the version-specific portraits into a disposable archive of catalog commit `22216c4`. The checks below used the local DM Library in a browser.

- Nakudama went from zero playable results to one. Its 2024 rules detail showed the 5.5e printing, p. 168, and Wick Tidecup’s portrait and NPC link. The link opened the 2024 Fighter 1 build, including Amphibious and Standing Leap. [Search before and after](search-comparison.jpg) · [Nakudama detail](nakudama-detail.jpg) · [Wick Tidecup](wick-tidecup-detail.jpg)
- Lion Turtle found Ryokido, and Fuyohren found Fuyōren. Both opened their final Ryoko v1.00 profiles. Shimmerskin found the first-printing Cnidaran profile, which groups Shimmerskin and Nematocyst. [Ryokido detail](ryokido-detail.jpg) · [Cnidaran detail](cnidaran-detail.jpg)
- Giant Venomous Snake found Kamstra’s playable Giant Poisonous Snake. A search in Beasts still found the existing Giant Poisonous Snake encounter entry with five versions. [Playable snake detail](giant-poisonous-snake-detail.jpg)
- Dreamlands Cat and Relicborn opened their respective 2014 and 2024 profiles with the expected printings and linked NPCs. [Relicborn detail](relicborn-detail.jpg)

All seven sampled species portraits loaded at 1254 × 1254. The browser console showed no warnings or errors during the final pass. Every portrait was also reviewed at full size and at thumbnail size. Independent reviewers sampled rules and NPC arithmetic, and checked the catalog’s edition, source and portrait wiring. The rules checks were manual.

## Integrating this stage

Apply the patch to a compatible catalog snapshot. The portrait index gives the destination relative to `output/dm-library/5etools`, and the manifest gives the corresponding file in this staging folder. Copy each portrait into that destination and append the new index rows during the integration pass.

## Source handoffs

- Cnidaran, Cyclopian, Gobboc, Golynn, Lotol. [Heliana’s Guide to Monster Hunting (first printing)](parts/ten_heliana_a/handoff.md)
- Mycelian, Ombrask, Oozekin, Opteran, Rakin. [Heliana’s Guide to Monster Hunting (first printing)](parts/ten_heliana_b/handoff.md)
- Blood Hawk, Flying Snake, Giant Centipede, Shadow. [Monstrous Races (2018)](parts/ten_kamstra_a/handoff.md)
- Giant Eagle, Giant Frog, Giant Hyena, Giant Octopus. [Monstrous Races (2018)](parts/ten_kamstra_b/handoff.md)
- Giant Owl, Giant Poisonous Snake, Giant Spider, Giant Wasp. [Monstrous Races (2018)](parts/ten_kamstra_c/handoff.md)
- Dara, Nakudama. [Obojima: Tales from the Tall Grass (5.5e )](parts/ten_obojima/handoff.md)
- Enkoh, Fuyōren, Hanamori, Haniwa, Isetsu. [Ryoko’s Guide to the Yokai Realms (v1.00)](parts/ten_yokai_a/handoff.md)
- Kitsune, Oniborne, Ryokido, Tatsumi. [Ryoko’s Guide to the Yokai Realms (v1.00)](parts/ten_yokai_b/handoff.md)
- Dreamlands Cat, Gnorri, Mythos Ghoul, Zoog. [Sandy Petersen’s Cthulhu Mythos for 5e](parts/ten_mythos/handoff.md)
- Ashborn, Azureborn, Bogborn, Curseborn, Deepborn. [The Crooked Moon (2024 Player v1.1)](parts/ten_moon_a/handoff.md)
- Gnarlborn, Graveborn, Harvestborn, Plagueborn. [The Crooked Moon (2024 Player v1.1)](parts/ten_moon_b/handoff.md)
- Relicborn, Silkborn, Stoneborn, Threadborn. [The Crooked Moon (2024 Player v1.1)](parts/ten_moon_c/handoff.md)
