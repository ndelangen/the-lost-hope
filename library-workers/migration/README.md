# Text library to typed library

One-off migration tools that turn the text printings of the original catalog into typed modules
under `src/data/library/`. The typed modules are the source of truth once written; edit them
directly.

Run them against the catalog as it was imported (commit `1ecdb3a8`), not the current one: the
current catalog has the statistics of converted printings removed.

```bash
mkdir -p /tmp/library && for f in entries monsters-a-f monsters-g-p monsters-q-z; do git show 1ecdb3a8:src/lib/published-library-catalog/$f.json > /tmp/library/$f.json; done
export LIBRARY_JSON_DIR=/tmp/library MIGRATION_OUT=/tmp/library
python3 -I library-workers/migration/parse5e.py beasts
python3 -I library-workers/migration/emit.py beasts
bunx oxfmt src/data/library src/lib/published-library-catalog && bun run generate:refs
```

- `parse5e.py <types>` parses fifth-edition printings into stat-block JSON. It recomputes every
  printed number (hit points, to-hit, damage averages, save DCs, skills, saves, passive
  Perception) from the base stats, structures common saving throws, and turns save DCs, sibling
  abilities and conditions in the text into tokens. A printing is held for review when any number
  does not derive, when printed numbers are left in prose, when languages were not recorded, or
  when it has a section the conversion does not read.
- `emit.py <types>` writes one module per publication plus the `_index.ts` registry, keeps one key
  per monster across publications (renamed reprints use the 2024 name), folds identical reprints
  into `reprintedIn`, writes `publications.ts`, and strips the statistics of each converted
  printing from the catalog, leaving a `typed` ref to its typed printing.
