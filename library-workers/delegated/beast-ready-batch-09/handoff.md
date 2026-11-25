# Beast batch 09

Staged 50 Beast encounter profiles against `42d31ef`. Each cites its public D&D Beyond *Monster Manual* stat block and printed page. The Library uses the catalog label *Monster Manual (2024)* for the revised rules. The book and its errata were released in 2025. The overlays keep native initiative, proficiency, six saving throws, and action timing. [Roster](roster.tsv) · [Source and portrait manifest](manifest.json) · [Rules patch](rules.patch) · [Portrait index](portrait-index-preview.json)

Giant Frog uses the official +3 Bite correction. Giant Centipede's Bite applies Poisoned until the start of its next turn. Allosaurus uses the printed 30-ft. approach and Large-or-smaller size limit for automatic Prone and one follow-up Bite. [Official Monster Manual errata](https://www.dndbeyond.com/sources/dnd/sae/monster-manual) · [Giant Centipede](https://www.dndbeyond.com/monsters/5195014-giant-centipede) · [Allosaurus](https://www.dndbeyond.com/monsters/5194879-allosaurus)

Hunter Shark fills the slot initially scoped to Giant Squid. The latter's D&D Beyond entry redirects during anonymous access. Its printed stat block was located on p. 360 for a later batch. [Hunter Shark](https://www.dndbeyond.com/monsters/5195083-hunter-shark) · [Giant Squid print, facsimile sheet 363](https://anyflip.com/acscv/ypya/mobile/index.html#p=363)

All 50 portraits reuse verified files from earlier bundles or the existing index. Giant Seahorse and Giant Venomous Snake use their earlier matching subjects under the previous spellings. The independent catalog check matched all 50 version keys and portrait hashes. [Comparison with Big Linda](portrait-comparison.jpg) · [Portrait sheet 1](portraits-1.jpg) · [Portrait sheet 2](portraits-2.jpg)

In a temporary Library copy, I found Allosaurus by name and by “curling balancing tail,” checked its portrait and 2024 Claws follow-up, and verified Giant Frog's +3 Bite and end-of-next-turn acid damage. Hunter Shark loaded the reused portrait and showed its 2024 Bite and swim speed. The browser console was clean. [Allosaurus before and after](allosaurus-before-after.jpg) · [Giant Frog preview](giant-frog-errata-preview.jpg)

To use the local bundle, apply the rules patch and append the preview index rows. Each index image path is relative to `output/dm-library/5etools`. The manifest identifies the packaged source and SHA-256 for each path.
