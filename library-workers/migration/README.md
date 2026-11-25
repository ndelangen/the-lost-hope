# Text library to typed library

One-off migration tools that turn the text printings in `src/lib/published-library-catalog/` into
typed modules under `src/data/library/`. The typed modules are the source of truth once written;
edit them directly and do not re-run the migration over them.

- `parse5e.py <types>` parses fifth-edition printings into stat-block JSON and recomputes every
  printed number (hit points, to-hit, damage averages, save DCs, skills, passive Perception) from
  the base stats. A printing with any mismatch is held for review instead of being converted.
- `emit.py <types>` writes one module per publication for the clean printings, folds identical
  reprints into `reprintedIn`, and writes `publications.ts`. Run `bun run generate:refs` after.
