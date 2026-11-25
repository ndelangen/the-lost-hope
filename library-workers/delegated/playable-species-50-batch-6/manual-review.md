I applied the patch and copied the 50 version-specific portraits into a disposable copy of catalog commit `8ba3607`. I used the local DM Library to check search, the portrait image, source printing, and NPC links.

- Nautilid returned zero entries before staging and one afterward. Its 2024-rules detail showed the portrait and Brine Sill's linked build. [Before and after](search-comparison.jpg) · [Nautilid detail](nautilid-detail.jpg)
- Searching for Matryoshka returned Geppettin.
- Bladerager Troll opened its Monster Manual V printing and Brakk Rivetjaw's build. Yuan-ti Anathema opened its Fiend Folio printing and Sevath Coil-of-Ash's build. Both portraits loaded at 1254 × 1254. Following Sevath's link opened the ECL 29 NPC stat block. [Bladerager Troll detail](bladerager-detail.jpg) · [Yuan-ti Anathema detail](anathema-detail.jpg)

The browser console showed no warnings or errors in these checks. The authors manually checked the source rules, NPC calculations, and portraits. Two independent reviewers sampled rules and build arithmetic and checked catalog grouping and image routing. The Keeper now includes its full immunity list, and the catalog links to publication pages where its URL rules exclude direct . The manifest preserves the exact pages and scans. No automated tests ran. The primary checkout and R2 were left alone.
