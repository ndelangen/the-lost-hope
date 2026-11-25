# Beast-only integration manifest

The manifest inventories the Frilled Deathspitter pilot and batches 01–17 against catalog `a4e908e`. It includes 810 fixed stat blocks, 18 scalable recipe updates, eight new portrait files for nine portrait-only versions, and 100 mappings to existing art. Each rules entry identifies its source bundle, authored patch, exact printing, and record hash. [Integration manifest](manifest.json)

## Integration order

1. Apply Batch 14’s two Netherdeep source URL corrections and remove the two inherited Wildemount book links. Review the existing Volo book links for *Tomb of Annihilation* Brontosaurus and Quetzalcoatlus before merging the Batch 08 exact blocks. Those inherited links can still supply Volo combat data and references during display.
2. Merge the 810 fixed records in pilot and batch order, keyed by name and publication. Use the pilot’s standalone stat block and extract the other blocks against each patch’s authored commit. On the reference commit, the pilot’s raw patch misses its original context. Without the pilot, the raw sequence applied through batch 11 and stopped at batch 12.
3. Apply Batch 16’s runtime changes and merge its 18 existing recipes by exact printing. The 2024 Beast of the Sea gains the printed bludgeoning or piercing choice.
4. Apply the gallery alternate patch after Batch 16’s loader edits. The two runtime changes applied in that order in a temporary copy. The gallery patch must precede the 50 alternate index rows.
5. Verify the portrait source hashes and resolve the 359 runtime files. Append the rule-linked and portrait-only index rows, followed by mapping bundles 01 and 02. The exact index key is entry, version, and placement. The first mapping bundle supplies primary portraits, and the second appends credited alternates.

## Duplicate targets and holds

The 828 rules scopes and 937 portrait index keys are unique. None conflicts with an exact live or registered key or with a separate staged bundle. The 150 repeated runtime destinations refer to identical bytes. Preserve the credit on each mapping, since 33 shared files have more than one recorded credit label. Of the 359 runtime files, 85 already exist locally with matching hashes. The manifest records a verified source for each file.

The 43 rules holds remain open. They comprise 21 *Monster Vault 2* entries, 18 *Humblewood Tales* entries, and one each for Ghamoo-Ra, the Dark Pyramid Boar, the final Drakkenheim Swarm of Contaminated Insects, and Spiderfrog. The standalone SRD Giant Insect is an earlier claim. [Source pages needed](../beast-portrait-coverage-01/needed-source-pages.md) · [Source recheck](../beast-source-recheck-18.md)

Relative patch, portrait, and evidence paths in the JSON start at its `stagingRoot`. Runtime paths start at `output/dm-library/5etools` in the catalog copy. The review read existing files and applied patch probes in disposable directories. The primary checkout and R2 were untouched.
