# DM library batch 8

This patch adds 50 player conversions and 50 linked NPC builds. The 50 original plain-parchment portraits are staged by exact catalog version. The patch is based on commit `49079cd`.

[Catalog patch](rules.patch) · [Source and ownership manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json) · [Approved roster](claims.tsv)

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Banderhobb to Guard Drake](portraits-1.jpg) · [Helmed Horror to Wood Woad](portraits-2.jpg)

The manifest locates every original PNG. Part handoffs contain the built-in ImageGen prompts and thumbnail comparisons.

## Sources and grouping

- The two volumes supply 25 profiles each. Both are Tyler Kamstra's DMs Guild player conversions for 2014 fifth edition. The catalog locators and manifest identify the v2 text of the 2018 volume, the second volume's printed folios, or the official sample where used. [Monstrous Races](https://www.dmsguild.com/product/230312/Monstrous-Races) · [Monstrous Races 2](https://www.dmsguild.com/en/product/248038/monstrous-races-2) · [Second volume preview]()
- The published v2 trait blocks give Flumph and Homunculus Small size. The roster was corrected to match. The Hydra portrait depicts the chosen build's number of heads. [Flumph evidence](parts/eight_mr1_a/handoff.md) · [Homunculus and Hydra evidence](parts/eight_mr1_c/handoff.md)
- The two Boggle oils, five Guard Drake colors, and the Hatchling and Adult Neogi options stay in their own grouped profiles. Neogi Master and Darkling Elder remain feats. Printed table rulings and omissions are recorded in the individual handoffs. [Boggle evidence](parts/eight_mr2_a/handoff.md) · [Guard Drake evidence](parts/eight_mr2_c/handoff.md) · [Neogi evidence](parts/eight_mr2_e/handoff.md)

## Manual review

I applied the batch and copied its version-specific portraits into a disposable copy of catalog commit `49079cd`. I checked the following in the local DM Library.

- Giant Strider search went from zero playable results to one. Firenewt Giant Strider found the same profile. Its detail showed the sequel printing, p. 33, Tyler Kamstra's credit, the portrait, and Emberstep's linked build. [Before and after](search-comparison.jpg) · [Giant Strider detail](giant-strider-detail.jpg)
- Black Guard Drake found the shared Guard Drake profile. The detail showed its chromatic options, portrait, and Brinejaw's NPC build. [Guard Drake detail](guard-drake-detail.jpg)
- The playable Hydra showed the v2 pp. 122–123 locator and its two-headed portrait. Splitreed's link opened the NPC's stats and actions. The Monsters tab still returned the separate Hydra record. [Hydra detail](hydra-detail.jpg)

All three sampled portraits loaded at 1254 × 1254. The browser console showed no warnings or errors. Existing inline glossary links can still open shared fifth-edition compendium entries. The selected printing and locator identify the rules used for these profiles.

The authors checked rules, NPC arithmetic, and portraits manually. Independent reviewers sampled builds and checked grouping, source locators and portrait identifiers. No automated tests ran. The primary checkout and R2 were left alone.

## Source handoffs and prompts

- Empyrean, Ettin, Faerie Dragon, Flameskull, Flumph. [Monstrous Races v2, group A](parts/eight_mr1_a/handoff.md)
- Galeb Duhr, Gargoyle, Gibbering Mouther, Grell, Grick. [Monstrous Races v2, group B](parts/eight_mr1_b/handoff.md)
- Helmed Horror, Hippogriff, Homunculus, Hook Horror, Hydra. [Monstrous Races v2, group C](parts/eight_mr1_c/handoff.md)
- Intellect Devourer, Invisible Stalker, Jackalwere, Kraken, Manticore. [Monstrous Races v2, group D](parts/eight_mr1_d/handoff.md)
- Nothic, Otyugh, Peryton, Rust Monster, Shambling Mound. [Monstrous Races v2, group E](parts/eight_mr1_e/handoff.md)
- Banderhobb, Bodak, Boggle, Catoblepas, Cave Fisher. [Monstrous Races 2, group A](parts/eight_mr2_a/handoff.md)
- Cranium Rat, Darkling, Devourer, Draegloth, Firenewt. [Monstrous Races 2, group B](parts/eight_mr2_b/handoff.md)
- Flail Snail, Froghemoth, Giant Strider, Girallon, Guard Drake. [Monstrous Races 2, group C](parts/eight_mr2_c/handoff.md)
- Ki-rin, Korred, Leucrotta, Meenlock, Mindwitness. [Monstrous Races 2, group D](parts/eight_mr2_d/handoff.md)
- Morkoth, Neogi, Neothelid, Tlincalli, Wood Woad. [Monstrous Races 2, group E](parts/eight_mr2_e/handoff.md)
