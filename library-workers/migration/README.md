# Text library to typed library

One-off migration tools that turn the text printings of the original catalog into typed modules
under `src/data/library/`. The typed modules are the source of truth once written; edit them
directly.

Run them against the catalog as it was imported (commit `1ecdb3a8`), not the current one: the
current catalog has the statistics of converted printings removed.

```bash
mkdir -p /tmp/library && for f in entries monsters-a-f monsters-g-p monsters-q-z; do git show 1ecdb3a8:src/lib/published-library-catalog/$f.json > /tmp/library/$f.json; done
export LIBRARY_JSON_DIR=/tmp/library MIGRATION_OUT=/tmp/library
python3 -I library-workers/migration/parse5e.py beasts,monsters,npcs
python3 -I library-workers/migration/emit.py beasts-monsters-npcs
python3 -I library-workers/migration/merge_beasts.py
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
- `merge_beasts.py` folds the catalog's beasts into its monsters, so the library has one creature
  list filtered by creature type. A beast with a monster record gives it its printings, keeping one
  printing per publication. Old `/library/beasts/...` links redirect.
- `columns.sh <pdf> <out.txt>` extracts a two-column PDF in reading order (each page's left column,
  then its right), which plain `pdftotext` scrambles.
- `spells_srd521.py <text> <out.json>` and `emit_spells.py <json>` build `src/data/library/spells.ts`
  from the SRD 5.2.1 spell chapter. `parse5e.py` reads that file to turn spell names in spell lists
  (and after "cast") into spell refs, so build the spells before converting creatures.
- `srd521_monsters.py <srd521-cols.txt> <out.json>` reads the SRD 5.2.1 stat blocks straight from
  the PDF text into catalog-shaped printings. Pass the file to `parse5e.py` and `emit.py` with
  `EXTRA_PRINTINGS=<out.json>`; a printing read from the PDF wins over the worker's text of it.
- `srd51_monsters.py <cols.txt> <out.json> <label> <id>` reads 2014-format stat blocks the same way
  (SRD 5.1 and the 2018 Basic Rules work; the 2014 Monster Manual's layout does not yet). PDF
  printings take the catalog's own printing id and type, matched by slug and label.
- Adventure PDFs: list the held printings' books that have a PDF in `Books/output/Catalog.csv`, run
  `columns.sh` and `srd51_monsters.py <txt> <json> "<catalog label>" pdf-N` on each, and pass every
  JSON in `EXTRA_PRINTINGS`. Text PDFs (Adventurers League modules, online supplements) work; the
  hardcover adventures and the 2014 Monster Manual are scans without usable text. A PDF stat block
  converts only when the catalog has an entry for that creature and book.
- After `merge_beasts.py`, run `items_add_srd.py <srd-items.json>` (from `items_srd521.py`) and
  `species_srd521.py <srd521-cols.txt>`: they give items and species the SRD 5.2.1's printed rules.
- Open5e (openly licensed books): download `https://api.open5e.com/v2/{creatures,spells}/` with
  curl (paginate on `next`), then `spells_open5e.py <spells.json>` writes one spell module per book
  and `open5e_monsters.py <creatures.json> <out.json>` makes catalog-shaped printings to add to
  `EXTRA_PRINTINGS`. Creatures the catalog lacks become new library entries. Legendary uses are
  not in Open5e's data; Kobold Press creatures are given the 5e standard of three.
- `items_open5e.py <magicitems.json> <items.json>` (Open5e) gives items the rules Vault of Magic
  and the SRDs print, and adds the ones the catalog lacks; per-weapon copies of one magic item
  ("Flame Tongue Battleaxe", "… Club") with one text are kept once.
