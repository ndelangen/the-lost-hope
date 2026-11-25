# Beast encounter readiness, batch 01

This batch stages 50 existing Beast printings against catalog commit `5613de2`. It adds local rules for 45 Plane Shift printings and five Black Flag v0.2 printings. The 50 version lookups use 41 new square parchment PNGs and three existing portraits. Six minor variants share art with another entry in this batch. The original publisher galleries keep their credits. [Roster](roster.tsv) · [Rules patch](rules.patch) · [Manifest with printing and portrait evidence](manifest.json) · [Portrait index additions](portrait-index-preview.json)

## Source notes

- The Plane Shift books sometimes direct the DM to use a named base creature. The source records cite that book and its base block, then apply only the printed changes. Gnarlid’s reduced state halves its maximum HP and attack damage. The indexed Large and Small Aerosaur labels are retained while their printed base sizes are Huge and Medium. [Zendikar A](parts/zendikar_a/handoff.md) · [Ixalan A](parts/ixalan_a/handoff.md)
- Serpopard has a printed Bite and a Pounce that requires an undefined Claw. The entry flags the gap and gives the printed Bite as its default action. Amonkhet supplies no separate CR for the lightning-free behir variant of its giant River Serpent. [Amonkhet river and Dominaria kavu](parts/dunes_kavu/handoff.md)
- Sky Leviathan keeps the printed +9 Bite. Sky Whale uses an additive reading of the Giant Crocodile reference and keeps its walking and swimming speeds alongside hover flight. [Kaladesh](parts/kaladesh/handoff.md)
- The existing credited image indexed to Ammit depicts the neighboring Archfiend of Ifnir. The staged Ammit portrait follows the source description and appears first. [Amonkhet](parts/amonkhet/handoff.md)
- The Black Flag entries use the fixed values and modifiers from the v0.2 . Stirge’s outer wing tips clip slightly in a 96-pixel circular crop. Its square original shows the full creature. [Black Flag](parts/black_flag/handoff.md)

## Manual Library checks

In a disposable copy of the catalog, I checked Gnarlid before and after staging. Its detail gained the printed size-reduction rule and a new portrait. I also checked Sky Leviathan’s +9 Bite and swallow saves, the Serpopard’s source gap, and Black Flag Stirge’s drain timing and reaction. I switched between Drake printings and sizes, then opened Craig J. Spearing’s credited Aegisaur artwork from the same gallery as the new portrait. The browser console showed no warnings or errors. [Gnarlid before and after](gnarlid-before-after.jpg) · [Sky Leviathan](sky-leviathan.jpg) · [Serpopard](serpopard.jpg) · [Zendikar Drake](drake-zendikar.jpg) · [Stirge](stirge-black-flag.jpg) · [Aegisaur’s credited artwork](aegisaur-credited-art.jpg)

Independent reviewers checked the reskin rules, exact version keys, group mapping and final portrait hashes. Rules and UI checks were manual. [Portraits 1–21](portraits-1.jpg) · [Portraits 22–41](portraits-2.jpg) · [Comparison with Big Linda](portrait-comparison.jpg)

## Integration files

Apply the patch to a compatible catalog snapshot. The manifest gives the local PNG for each new portrait. Copy each one to its path in the index, relative to `output/dm-library/5etools`, and append the index rows. The three reused portraits already have files at their indexed paths. Keep the PNG originals local for the compression decision.

## Part handoffs

- [Ixalan A](parts/ixalan_a/handoff.md), [Ixalan B](parts/ixalan_b/handoff.md), [Ixalan C](parts/ixalan_c/handoff.md), [Ixalan D](parts/ixalan_d/handoff.md)
- [Zendikar A](parts/zendikar_a/handoff.md), [Zendikar B](parts/zendikar_b/handoff.md)
- [Amonkhet](parts/amonkhet/handoff.md), [Kaladesh](parts/kaladesh/handoff.md), [Amonkhet river and Dominaria kavu](parts/dunes_kavu/handoff.md), [Black Flag v0.2](parts/black_flag/handoff.md)
