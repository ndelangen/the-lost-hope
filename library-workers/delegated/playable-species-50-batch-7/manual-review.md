I applied the patch and copied the version-specific portraits into a disposable copy of catalog commit `ac1dddd`. I checked these flows in the local DM Library.

- Bulette search went from zero playable results to one. Searching for land shark found the same playable profile, which showed the v2 locator, Tyler Kamstra credit, portrait, and Marl's NPC build. The existing monster search still returned the separate Bulette entry. [Before and after](search-comparison.jpg) · [Bulette detail](bulette-detail.jpg)
- Flying Sword found the shared Animated Object profile with the DMs Guild preview locator, portrait, and Brass Sentry build. [Animated Object detail](animated-object-detail.jpg)
- Gray found the Voidrunner's Codex Grey profile and portrait. I followed Iri Vale's link to the NPC's actions and stats. [Grey detail](grey-detail.jpg)

All three sampled portraits loaded at 1254 × 1254. The browser console showed no warnings or errors in these checks. Existing inline glossary links can still open shared fifth-edition compendium entries. Use the selected printing, printed locator, and source link for profile provenance.

The authors manually checked the source rules, NPC arithmetic, and artwork. Independent reviewers sampled build rules and checked canonical grouping, publication keys, and portrait files and identifiers. No automated tests ran. The primary checkout and R2 were left alone.
