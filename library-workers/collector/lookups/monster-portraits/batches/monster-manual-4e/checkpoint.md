# DM Library portrait checkpoint

## Completed

The 4e Monster Manual retailer preview batch has eight original square parchment portraits. Aboleth Overseer and Servitor share the preview's group illustration. The Lasher and Slime Mage show that group illustration as related art. Angel of Battle, Astral Stalker, Blood Fiend and Phane each have their own source alternate. The local galleries use 1254 × 1254 WebPs for the new portraits, backed by registered PNG originals in R2.

Chromium verified the eight galleries and their eight labeled alternates. The contact sheet and before-and-after screenshots are in `output/dm-library/review/`. The backup outside the worktree holds eight generated originals and five source images, each checked byte for byte. See the backup's `sha256.json` for the recorded hashes. The earlier pre-adoption backup is intact.

## Resume here

There are 178 monster entries without local art. The largest remaining groups are Humblewood Campaign Setting, Waterdeep: Dragon Heist and Where Evil Lives, with seven each. Fetch `origin main`, verify the worktree base and refresh the queue using `bun output/dm-library/monster-portraits/export-queue.ts`.

Use `campaign-artwork-migration.md` for the R2 workflow. Copy each new ImageGen result to the batch and to its backup as it arrives. Keep published alternate images local. Run `bun run media:sync` and stage the registry and generated lock for the local commit.
