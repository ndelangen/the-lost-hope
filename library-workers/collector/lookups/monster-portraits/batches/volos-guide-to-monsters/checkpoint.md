# DM Library portrait checkpoint

## Completed

All 13 previously unillustrated entries from Volo's Guide to Monsters now have 1254 × 1254 parchment portraits. The beholder depicts the published chain lightning option. The 11 yuan-ti portraits show the variant traits and follow the anatomy of the five published base creatures. The illithilich illustration uses the base mind flayer for anatomy and depicts the lich form as an original interpretation.

Each entry has a credited base-creature illustration as a labeled alternate. The files and catalog changes are local. The illithilich still has a partial rules record.

## Verification

- The local audit verified 13 distinct WebPs and matched all 13 alternate files to their original illustrations. The monster queue has 229 entries without local art.
- Chromium opened all 13 galleries, switched to each alternate, and verified the assets against their checksums. Before and after screenshots are in `output/dm-library/review/`.
- `bun run verify` passed 883 tests and the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Refresh the queue with `bun output/dm-library/monster-portraits/export-queue.ts`.

Prioritize the 12 missing Dungeons of Drakkenheim entries, tied for the largest remaining batch with Waterdeep: Dungeon of the Mad Mage. Save the selected rows in `batches/dungeons-of-drakkenheim/queue-at-start.json`. Check the published [Dungeons of Drakkenheim appendix listing](https://www.dndbeyond.com/sources/dnd/dodr) and the library's Delerium Dreg and Haze Hulk galleries for references. Several entries have similarly named creatures in Monsters of Drakkenheim. Check the names and traits before using their art as a reference or alternate. Keep the batch local.
