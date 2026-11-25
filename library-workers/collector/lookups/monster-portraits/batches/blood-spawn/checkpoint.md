# DM Library portrait checkpoint

## Completed

Blood Spawn: Creatures of Light and Shadow is complete. All 15 missing entries now have a 1254 × 1254 parchment portrait made with built-in ImageGen and an AD&D 2e encounter summary. The entries retain the published variant profiles and their own rules. Cwn Annwn uses a labeled THAC0 of 13 from the edition's Hit Dice table because the book leaves that field blank. The source book and catalog entries provided no identifiable creature artwork for these portraits.

The prompt set, starting queue, and encounter summaries are in this batch directory. The images and data remain local.

## Verification

- The portrait audit verified all 15 distinct WebPs and their checksums. There are 256 monster entries still missing local art.
- `bun output/dm-library/review/check-blood-spawn-art.mjs` verified the 15 portraits and encounter sheets and 12 local cross-references. It opened six galleries, showed the Wild Hunt's Cwn Annwn hover preview, and followed that link in Chromium. Screenshots are in `output/dm-library/review/`.
- `bun run verify` passed all 883 tests and finished the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Run `bun output/dm-library/monster-portraits/export-queue.ts`. Select monsters with status `missing artwork` whose first publication is `Castles and Crowns`. It is the largest remaining batch, with 14 entries.

Save the selected entries in `batches/castles-and-crowns/queue-at-start.json`. Check the Kobold Press publication and artist sources, then generate and review the same square parchment portraits. Keep confirmed source art as credited alternates. Update the local encounter sheets where the published rules are available. Save a checkpoint after the batch passes the portrait audit, browser checks, and `bun run verify`.
