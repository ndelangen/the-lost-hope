# Beast readiness batch 11

This batch stages 50 Beast profiles from Kobold Press’s first *Monster Vault*. The rules were checked against Nosolorol’s licensed Spanish *Cubil de Monstruos* (2025, ISBN 979-13-87882-04-4) and rendered in English in the preview. The English publisher’s index confirms names and catalog challenge ratings. The original English printing was outside the rules check. [Nosolorol](https://www.nosolorol.com/talesofthevaliant) · [Kobold Press catalog](https://koboldpress.com/tools/search-tov-kobold-press-monsters/) · [Kobold Press errata](https://koboldpress.com/errata/)

- [Roster](roster.tsv) and [manifest](manifest.json) record the selected scopes, bilingual headings, source folios, and portrait hashes. A separate review matched all 50 rows to the licensed and the existing catalog.
- [Rules patch](rules.patch) applies to baseline `cf933f2`. It adds 50 stat blocks. The publisher’s rounded ratings remain in the catalog TSV, while the profile displays the exact printed rating.
- [Preview portrait index](portrait-index-preview.json) maps 50 versions to 49 reused files. Riding Horse and War Horse share one portrait. Fourteen entries use more muted parchment alternatives from earlier batches. A few retained portraits have warmer parchment. [Portrait comparison](portrait-comparison.jpg) · [Contact sheet 1](portraits-1.jpg) · [Contact sheet 2](portraits-2.jpg)
- The Crocodile profile uses the printed fixed 6 piercing damage and flags the missing die. Baboon uses CR 1/8 from the individual block, where the book’s summary table gives 0. The bear profiles flag the conflict between the printed attacks and their two-claw triggers. Individual part notes record the source discrepancies and any separately labeled table clarifications.

In the disposable Vite copy, search returned Giant Ape, Crocodile, and Baboon. Their Monster Vault profiles displayed the selected rules and loaded square portraits. Crocodile showed the missing-die note, Baboon displayed CR 1/8, and the browser console showed zero warnings or errors during the checks. An independent review matched all 49 portrait hashes and confirmed that the 50 preview lookup keys are unique. [Giant Ape before and after](giant-ape-before-after.jpg)

The bundle and preview are local. The primary checkout’s tracked files and R2 were left alone.
