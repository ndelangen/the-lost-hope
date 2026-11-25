# DM library worker records

These snapshots preserve work from the collector, the Beast integration checkpoint, and the workers' individual batches. They include source holds, encounter and species drafts, and profiles that were still being reviewed.

The app reads the catalog in `src/lib/published-library-catalog/`. Use this archive to recover a draft or compare source printings that could not be matched in the app. The worker notes describe what was verified at the time.

`artwork.json` maps logical artwork paths to the worker records that mention them. Each row lists the subject, entry ID, printing ID, credit, and collection. Blank IDs indicate an unassigned image. Look up the logical path in `scripts/library-image-sources.json` for the repository path, then use `assets/images.lock.json` to identify the original in R2. Run `bun run media:sync` to restore archived originals locally.
