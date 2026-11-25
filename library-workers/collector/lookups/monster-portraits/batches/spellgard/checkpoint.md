# DM Library portrait checkpoint

## Completed

Scepter Tower of Spellgard is complete. All 16 monsters or NPC entries that lacked local art now have a 1254 × 1254 parchment portrait made with built-in ImageGen. Four entries also have credited source art. All 16 have 4e combat summaries with the original defenses, action timing, and powers. Their movement fields now display squares, including climb and fly speeds.

The approved prompts, credits, and starting queue are in this batch directory. The in-app galleries use the installed copies in the local creature folders.

## Verification

- The portrait audit verified 16 distinct WebPs, four gallery alternates, and 271 monster entries still missing local art.
- `bun output/dm-library/review/check-spellgard-art.mjs` verified all installed assets and the 16 original 4e entries. It opened six galleries in Chromium and saved before and after screenshots under `output/dm-library/review/`.
- `bun run verify` passed all 883 tests and finished the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Run `bun output/dm-library/monster-portraits/export-queue.ts`. Select monsters with status `missing artwork` whose first source publication is `Blood Spawn: Creatures of Light and Shadow`. It is the largest remaining publication batch, with 15 entries.

Save those rows as the starting queue in `batches/blood-spawn/`. Use the copy in the user's local AD&D 2e book collection to verify creature designs and original rules. Keep identifiable source art as credited alternates. Keep the book file and any path or link to it out of the app. Use the same square parchment style and save a checkpoint after verification.
