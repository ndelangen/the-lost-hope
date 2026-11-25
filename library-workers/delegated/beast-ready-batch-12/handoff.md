# Beast readiness batch 12

This batch stages 50 Beast publication versions. It covers the last 46 unfinished *Monster Vault* entries in the current catalog and four *Monsters of the Multiverse* dinosaurs. The archived preview baseline is `6a35857`.

The *Monster Vault* rules come from Nosolorol's licensed Spanish *Cubil de Monstruos* , copyright 2025, ISBN 979-13-87882-04-4. The Kobold Press English index confirms names and lists challenge ratings, and we checked the publisher's errata. The original English book was outside this rules check. The Giant Octopus uses the Spanish block's 30 ft. swim speed, and the Rhinoceros uses the Spanish block's Large size. The Giant Rat and Giant Weasel both use CR 1/4 from their Spanish stat blocks despite conflicting entries in that book's overview. [Nosolorol edition](https://www.nosolorol.com/talesofthevaliant) · [Kobold Press catalog](https://koboldpress.com/tools/search-tov-kobold-press-monsters/) · [Kobold Press errata](https://koboldpress.com/errata/)

We checked Brontosaurus, Deinonychus, Dimetrodon, and Velociraptor against pp. 95–96 of the original *Monsters of the Multiverse* first printing, dated October 2021 in its credits. D&D Beyond's index lists all four, and the full entries require purchase. [D&D Beyond source index](https://www.dndbeyond.com/sources/dnd/motm) · [Dinosaur source evidence](parts/b12_10/source-evidence.json)

- [Beast-only roster](roster.tsv) and [manifest](manifest.json) record the exact publication scopes, source evidence, and portrait paths. A separate review checked all 50 against the baseline and prior stages.
- [Rules patch](rules.patch) adds 50 stat blocks. The catalog TSV is byte-for-byte identical to the archive. The profile displays its printed challenge rating.
- [Preview portrait index](portrait-index-preview.json) maps the 50 versions to 50 verified files. We reused 49 portraits and selected muted alternatives for 20. Four swarm portraits retain warmer parchment.
- [Seal portrait](parts/b12_05/portraits/seal.png) is a new 1254 × 1254 original from built-in ImageGen. We checked the face and hind flippers in a 64 px round crop. The [Seal generation prompt and part handoff](parts/b12_05/handoff.md) record the references and final prompt.
- [Big Linda style comparison](portrait-comparison.jpg) · [Contact sheet 1](portraits-1.jpg) · [Contact sheet 2](portraits-2.jpg)

Manual browser checks in the disposable copy covered Beast search, publication selection, stat blocks, and square portrait loading for Seal, Giant Octopus, and Velociraptor. Seal displayed CR 1/4 and Charming Escape. Giant Octopus displayed its 30 ft. swim speed. Velociraptor displayed Pack Tactics and Multiattack. The browser console showed zero warnings or errors. [Seal before and after](seal-before-after.jpg)

The bundle is staged locally and the preview runs in a disposable copy. The primary checkout's tracked files and R2 were left alone.
