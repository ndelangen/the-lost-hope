# Playable species batch

This batch stages 50 playable species, 52 linked NPC builds, and 50 original portraits. It adds 35 species records and supplies rules for 15 existing records. Each addition identifies its exact source and edition. Some names already have profiles in other editions.

[Catalog patch](rules.patch) · [Source and ownership manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json)

The patch is based on catalog commit `3ebbe06`. It covers species entries, local rules, and NPCs tied to those profiles. The portrait preview names the destination keys. The manifest and individual handoffs locate the staged raster originals.

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Bearfolk to Kobold](portraits-1.jpg) · [Laneshi to Wilden](portraits-2.jpg)

## Source handoffs

- Daelkyr Half-Blood. [Magic of Eberron](parts/daelkyr/handoff.md)
- Deva, Githzerai, Minotaur, Shardmind, Wilden. [Fourth-edition Player’s Handbook 2 and 3](parts/batch4e_phb/handoff.md)
- Bladeling, Genasi, Kalashtar, Mul, Thri-kreen. [Fourth-edition settings and Manual of the Planes](parts/batch4e_settings/handoff.md)
- Doppelganger, Githyanki, Gnoll, Kobold, Warforged. [Fourth-edition Monster Manual player rules](parts/batch4e_monsters/handoff.md)
- Centaur, Hound Archon, Janni, Lizardfolk, Pixie. [Revised 3.5 SRD player rules](parts/batch_3e_mm/handoff.md)
- Karsite, Lumi, Maug, Nerra. [Tome of Magic, Monster Manual III, and Fiend Folio](parts/batch_3e_exotics/handoff.md)
- Corvum, Gallus, Luma, Raptor, Strig. [Humblewood birdfolk](parts/batch_humblewood_a/handoff.md)
- Cervan, Hedge, Jerbeen, Mapach, Vulpin. [Humblewood Humblefolk](parts/batch_humblewood_b/handoff.md)
- Bearfolk, Darakhul, Quickstep, Ratatosk, Shadow Goblin. [Book of Ebon Tides](parts/batch_ebon/handoff.md)
- Disembodied, Dreamer, Laneshi, Ogresh, Wechselkind. [Grim Hollow original 2021 rules](parts/batch_grimhollow/handoff.md)
- Dragonborn, Gearforged, Sapopova, Satyr, Syderean. [Tales of the Valiant](parts/batch_tov/handoff.md)

## Review

Authors checked the original rules, NPC mechanics, and portraits by hand. Separate spot reviews covered ownership, publication boundaries, representative rules, and encounter math. Catalog search, runtime portrait loading, and automated tests are deferred. No changes were made to the primary checkout or R2.
