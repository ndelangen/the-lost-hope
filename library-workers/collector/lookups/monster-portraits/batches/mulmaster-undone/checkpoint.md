# DM Library portrait checkpoint

## Completed

All nine previously unillustrated Mulmaster Undone monsters have original 1254 × 1254 parchment portraits from built-in ImageGen. The portraits follow the adventure descriptions. Six galleries include credited illustrations of the base creature or a related creature from the same faction. The adventure itself illustrated maps. The published alternates are labeled with the creatures they depict.

The nine PNG originals are saved under `batches/mulmaster-undone/originals/`. The local portrait index registers the WebP versions used by the library. The nine originals are also locked in R2, with local copies outside Git staging. The worktree is based on `c9c75eb`, which includes the campaign artwork storage change. [PR #324](https://github.com/ndelangen/the-lost-hope/pull/324)

## Verification

- The local audit verified nine distinct WebPs and six source alternates. There are 186 monster entries without local art.
- Chromium opened all nine galleries and verified every portrait and alternate. Before and after screenshots are in `output/dm-library/review/`.
- `bun run verify` passed 887 tests and the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Refresh the queue with `bun output/dm-library/monster-portraits/export-queue.ts`.

Select the eight missing entries labeled Monster Manual (4e) retailer preview. Save them in `batches/monster-manual-4e/queue-at-start.json`. Check the local retailer preview for exact names, art, and species variants before generating the portraits or reusing an illustration. Keep book files and their links and paths out of code.

## Verified backup and R2 adoption

A checksum-verified backup outside the worktree holds 2,394 generated images, the full local library folder, the earlier bestiary art, and registered campaign artwork. The nine Mulmaster Undone originals are locked in R2. See `output/dm-library/monster-portraits/campaign-artwork-migration.md` for the current workflow.
