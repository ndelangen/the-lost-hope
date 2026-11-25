# Savage Coast beasts

Three encounter profiles cover the remaining beast entries from TSR’s 1996 *Savage Coast Monstrous Compendium Appendix*. The profiles use AD&D 2e Hit Dice, XP and THAC0 where printed. Each has searchable habitat and appearance, rules for running the encounter, and a new full-color portrait on plain gray-tan parchment.

| Beast | Difficulty in the appendix | Original rules |
| --- | --- | --- |
| Forest Ray | 8–11 HD, 3,000–6,000 XP, plus 1,000 XP with a Legacy | [pp. 93–94]() |
| Saragón Lyra Bird | 1 HP, 65 XP for a significant encounter | [pp. 71–72]() |
| Skinwing | 4–7 HD, 175–650 XP or 270–975 XP with a Legacy | [pp. 96–97]() |

The local appendix and the linked scan share SHA-256 `23842cf99946ca1fe98c367774e290075fab1ac757c15dbe9985a34daf9f17ac`. The viewer counts one page ahead of the printed folios. The example Legacies are on [printed pp. 7–8]().

The Forest Ray’s swallow rule follows the prose threshold of more than two above the required roll. The printed example accepts 16 when 14 was required, and the profile records that conflict. The Lyra Bird profile keeps the printed Tiny category and uses the prose’s hummingbird size for the portrait. Its table also gives a conflicting length of four to five feet. Resolve its named charm and protection spells with AD&D 2e spell rules.

Apply [rules.patch](rules.patch) to the library’s book catalog or add the three entries from [book-profiles.json](book-profiles.json) if the catalog has moved. [Source evidence](source-evidence.json) maps the profiles to the exact version keys, printed pages and credited original artwork. [Portrait files](portrait-files.json) gives the staged PNG paths and hashes. [Portrait comparison](portrait-comparison.jpg) shows the original art and the drafts for review.

The isolated library check uses the regular loader and search, with a temporary portrait index. It verifies the original TSR art stays in each gallery when a new portrait is selected and checks the separate *Monsters of Drakkenheim* Skinwing version. See [verification.json](verification.json) and the [before](catalog-before.json) and [after](catalog-after.json) records. The batch is staged locally for review.
