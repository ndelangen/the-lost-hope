# DM Library portrait checkpoint

## Completed

All 10 previously unillustrated Dungeons & Ruins monsters now have original 1254 × 1254 parchment portraits from built-in ImageGen. The Brittler portrait follows the published design and its gallery includes the credited Fantasy Grounds preview. The other nine portraits use the creature descriptions in Appendix A. [Kobold Press book listing](https://koboldpress.com/kpstore/product/campaign-builder-dungeons-ruins/) · [Fantasy Grounds preview](https://www.fantasygrounds.com/store/product.php?id=KPFGCBLDDNR)

The ten library entries have short descriptions, size, type, terrain, and challenge rating. The Brittler also has verified armor class, hit points, and speed. These entries still need complete runnable profiles. All changes are local. [Kobold Press creature index](https://koboldpress.com/tools/search-tov-kobold-press-monsters/)

## Verification

- The local audit verified 10 distinct WebPs and the Brittler source image. There are 195 monsters without local art.
- Chromium verified all 10 galleries, their descriptions and facts, and the Brittler alternate. Before and after screenshots are in `output/dm-library/review/`.
- `bun run verify` passed 884 tests and the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Refresh the queue with `bun output/dm-library/monster-portraits/export-queue.ts`.

Select the nine missing DDEP2 Mulmaster Undone V2 monsters, the largest remaining batch. Save them in `batches/mulmaster-undone/queue-at-start.json`. Read the relevant passages from the local adventure and look for publisher art to use as references and alternates. The queue also has one missing beast from the same adventure, Young Bulette (Rhinoceros). The current portrait pass prioritizes monsters.

## Campaign artwork migration

The standing campaign instruction for PR #324 is in `output/dm-library/monster-portraits/campaign-artwork-migration.md`. At campaign branch merge readiness, fetch and merge current main, then run `bun run media:sync --adopt` on the Mac. Verify and commit the lockfile and tracked asset changes. After adoption, use the `campaign-images` skill and register new art in `scripts/image-sources.ts` before running `bun run media:sync`.
