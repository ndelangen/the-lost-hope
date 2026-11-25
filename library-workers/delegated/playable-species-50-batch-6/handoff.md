# DM library batch 6

This batch stages 50 rules profiles, 50 linked NPCs, and 50 original portraits from the reviewed roster. The patch adds 50 publication and edition records against catalog commit `8ba3607`.

[Catalog patch](rules.patch) · [Source and ownership manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json) · [Reviewed roster](claims.tsv)

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Amoeboid to Kesh](portraits-1.jpg) · [Mandrake to Zern](portraits-2.jpg)

Each source handoff links to its generation prompts and image comparisons. The manifest locates the original PNGs. The portrait index preview gives the destination asset path and exact version for each image.

## Source notes

- Android uses its original printed traits. Gillfolk and Tengu use their attributed open-content rules because the original trait pages fall outside the available previews. [Heroic Races evidence](parts/six_heroic/handoff.md)
- Esper Genesis keeps the 2018 publication key and records the editions and errata consulted. Fiend Folio uses the original 3.0 player rules, including source-specific ECL calculations. [Esper Genesis evidence](parts/six_esper_a/handoff.md) · [Fiend Folio evidence](parts/six_fiend_a/handoff.md)
- Monster Manual IV prints dedicated player rules for Varag and Windblade. The other Monster Manual IV and V profiles give published monster rules and classed NPC examples. A numeric LA or ECL can guide a DM-approved conversion. Briarvex's entry explicitly advises against normal player use. The individual notes record the Windscythe LA conflict and other source rulings. [Monster Manual IV evidence](parts/six_mm4_a/handoff.md) · [Monster Manual V evidence](parts/six_mm5_b/handoff.md)
- Yuan-ti Anathema and Bladerager Troll sit under the existing Yuan-ti and Troll entries. Their NPCs and portraits point to the exact printings. Corruptor of Fate keeps its standalone species entry because the catalog has no Yugoloth species parent.
- Geppettin retains Matryoshka as a searchable development name. [Mage Hand Press developer post](https://magehandpress.com/2021/08/spire-of-secrets-one-week-away/)

## Manual review

I applied the patch and copied the 50 version-specific portraits into a disposable copy of catalog commit `8ba3607`. I used the local DM Library to check search, the portrait image, source printing, and NPC links.

- Nautilid returned zero entries before staging and one afterward. Its 2024-rules detail showed the portrait and Brine Sill's linked build. [Before and after](search-comparison.jpg) · [Nautilid detail](nautilid-detail.jpg)
- Searching for Matryoshka returned Geppettin.
- Bladerager Troll opened its Monster Manual V printing and Brakk Rivetjaw's build. Yuan-ti Anathema opened its Fiend Folio printing and Sevath Coil-of-Ash's build. Both portraits loaded at 1254 × 1254. Following Sevath's link opened the ECL 29 NPC stat block. [Bladerager Troll detail](bladerager-detail.jpg) · [Yuan-ti Anathema detail](anathema-detail.jpg)

The browser console showed no warnings or errors in these checks. The authors manually checked the source rules, NPC calculations, and portraits. Two independent reviewers sampled rules and build arithmetic and checked catalog grouping and image routing. The Keeper now includes its full immunity list, and the catalog links to publication pages where its URL rules exclude direct . The manifest preserves the exact pages and scans. No automated tests ran. The primary checkout and R2 were left alone.

## Source handoffs and prompts

- Amoeboid, Avia-Ra, Nautilid, Skathári, Vect. [Mage Hand Press, first group](parts/six_mhp_a/handoff.md)
- Fetchling, Mousefolk, Myconid, Sirine. [Mage Hand Press, second group](parts/six_mhp_b/handoff.md)
- Geppettin, Mandrake, Spirithost. [Valda’s Spire of Secrets](parts/six_valda/handoff.md)
- Android, Gillfolk, Tengu. [Book of Heroic Races](parts/six_heroic/handoff.md)
- Ashenforged, Belare, Dendus, Eldori. [Esper Genesis, first group](parts/six_esper_a/handoff.md)
- Kesh, Matokai, Promethean, Valna. [Esper Genesis, second group](parts/six_esper_b/handoff.md)
- Mohrg, Vampire Spawn, Wight. [Libris Mortis](parts/six_libris/handoff.md)
- Canomorph, Dark Creeper, Ethergaunt, Fensir. [Fiend Folio, first group](parts/six_fiend_a/handoff.md)
- Keeper, Rilmani, Yuan-ti Anathema. [Fiend Folio, second group](parts/six_fiend_b/handoff.md)
- Briarvex, Corruptor of Fate, Nagatha, Varag, Windblade. [Monster Manual IV, first group](parts/six_mm4_a/handoff.md)
- Joystealer, Verdant Prince, Wizened Elder, Zern. [Monster Manual IV, second group](parts/six_mm4_b/handoff.md)
- Arcadian Avenger, Banshrae, Elemental Magi, Ethereal Defiler. [Monster Manual V, first group](parts/six_mm5_a/handoff.md)
- Bladerager Troll, Greenspawn Zealot, Shaedling, Ushemoi. [Monster Manual V, second group](parts/six_mm5_b/handoff.md)
