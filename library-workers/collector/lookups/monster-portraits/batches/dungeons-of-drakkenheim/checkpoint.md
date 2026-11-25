# DM Library portrait checkpoint

## Completed

All 12 previously unillustrated entries from Dungeons of Drakkenheim now have original 1254 × 1254 parchment portraits from built-in ImageGen. Raven and Grunt, the Gutbuster and Juggernaut at Kleinberg Estate, informed the two Haze Hulk variants. Saint Gresha has an original portrait based on her role and description in the adventure. [Dungeons of Drakkenheim](https://www.dndbeyond.com/sources/dnd/dodr) · [Kleinberg Estate and Crater Basin](https://runerollers.com/apps/platform/library/adventures/dungeons-of-drakkenheim-dungeonsdrakkenheim)

Eleven galleries have 16 credited alternates from the base creatures and related variants in Monsters of Drakkenheim. Each credit gives the illustrated creature's name and identifies related versions. The Animated Delerium Sludge gallery has an original portrait based on the description. All changes are local.

## Verification

- The local audit verified 12 distinct WebPs and matched all 16 alternates to their source files. The monster queue has 217 entries without local art.
- Chromium opened all 12 galleries, switched to each alternate, and verified the assets against their checksums. Before and after screenshots are in `output/dm-library/review/`.
- `bun run verify` passed 883 tests and the build. `git diff --check` passed.

## Resume here

Fetch `origin main` and verify the worktree base. Refresh the queue with `bun output/dm-library/monster-portraits/export-queue.ts`.

Select the 12 missing Waterdeep: Dungeon of the Mad Mage entries, the largest batch left. Save the selected rows in `batches/waterdeep-dungeon-of-the-mad-mage/queue-at-start.json`. Cross-check possible alternate names and duplicate entries against the adventure, including Astyrranthor and Ashtyrranthor, Statue of Lolth and Animated Statue of Lolth, and Animated Staff of Frost and Animated Staff. Check names and stat references before installing a new portrait or reusing published artwork. [Waterdeep: Dungeon of the Mad Mage](https://www.dndbeyond.com/sources/dnd/wdotmm)
