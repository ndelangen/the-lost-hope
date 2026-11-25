# DM Library portrait checkpoint

## Completed

All 14 Castles and Crowns entries that lacked local art now have 1254 × 1254 parchment portraits from built-in ImageGen. The Animated Artillery and Reanimator have credited source alternates from the Fantasy Grounds preview. The Snake Whisperer portrait follows the printed illustration visible in the public page-through. The other 11 portraits are interpretations based on the public listing.

All 14 entries have verified size, terrain, type, and challenge rating from Kobold Press. The Animated Artillery, Reanimator, and Snake Whisperer have labeled published rules excerpts. Their full rules are still to be verified, as are the stat blocks of the other 11. The work remains local.

## Verification

- The portrait audit verified 14 distinct WebPs and two alternates. There are 242 monster entries still missing local art.
- `bun output/dm-library/review/check-castles-art.mjs` verified the portraits, alternates, all 14 index records, and all three rule excerpts. It opened six galleries in Chromium. Before and after screenshots are in `output/dm-library/review/`.
- `bun run verify` passed all 883 tests and the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Export the queue with `bun output/dm-library/monster-portraits/export-queue.ts`. Select missing monster portraits whose first publication is `Volo's Guide to Monsters`. It is the largest batch remaining, with 13 entries.

Save those 13 entries in `batches/volos-guide-to-monsters/queue-at-start.json`. Use the existing Volo's Guide source links and local base-creature art to check the beholder variant, illithilich, and 11 yuan-ti variants. Give each yuan-ti variant an image that shows its particular trait, such as changing color, shedding skin, or secreting acid, while keeping the underlying creature recognizable. Save a new checkpoint once the art and local library checks pass.
