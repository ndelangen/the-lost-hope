# DM Library portrait checkpoint

## Completed

All 12 previously unillustrated entries from Waterdeep: Dungeon of the Mad Mage now have original 1254 × 1254 parchment portraits from built-in ImageGen. Four galleries also contain adventure tokens located under alternate catalog names, and six contain community portraits shared by their artist, Jru247. Violence and Turbulence share the community portrait of both sisters. [Waterdeep: Dungeon of the Mad Mage](https://www.dndbeyond.com/sources/dnd/wdotmm) · [Jru247's Undermountain portraits](https://imgur.com/a/SNO27pN)

The four matches are Animated Staff of Frost and Animated Staff, Astyrranthor and Ashtyrranthor, Gelatinous Cube (Giant Ooze variant) and Giant Gelatinous Cube, and Statue of Lolth and Animated Statue of Lolth. The batch matched their artwork. The records still have their separate catalog IDs. The generated portraits follow the adventure descriptions, including the staff's chiseled ice, Darribeth's toad, and the sisters' black and red robes.

The worktree advanced to `d0eff23`. I regenerated the icon usage catalog on that base and saved a backup of its earlier local changes. The portraits and source images remain local.

## Verification

- The local audit verified 12 distinct WebPs and 10 credited alternates. The monster queue has 205 entries without local art.
- Chromium opened and verified all 12 galleries and their alternates. Before and after screenshots are in `output/dm-library/review/`.
- `bun run verify` passed 884 tests and the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Refresh the queue with `bun output/dm-library/monster-portraits/export-queue.ts`.

Select the 10 missing Dungeons and Ruins entries, the largest batch left. Save the queue in `batches/dungeons-and-ruins/queue-at-start.json`. Start with the publisher's monster index and look for product gallery images and public sample descriptions. Keep the batch local. [Kobold Press monster index](https://koboldpress.com/tools/search-tov-kobold-press-monsters/)

## Campaign artwork migration

The standing campaign instruction for PR #324 is in `output/dm-library/monster-portraits/campaign-artwork-migration.md`. At campaign branch merge readiness, fetch and merge current main, then run `bun run media:sync --adopt` on the Mac. Verify and commit the lockfile and tracked asset changes. After adoption, use the `campaign-images` skill and register new art in `scripts/image-sources.ts` before running `bun run media:sync`.
