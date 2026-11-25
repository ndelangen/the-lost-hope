# Encounter-ready library checkpoint

## Batch 1

Local commit `b3b15fe`. The batch adds local encounter rules for 50 publication records.

- Five full stat summaries for Adranach, Master Adranach, Vos'skyriss Serpentfolk, Vos'skyriss Serpentfolk Ghost and Wraithroot Tree from Tal'Dorei Campaign Setting Reborn, pp. 224–225 and 258–259. The adranachs and serpentfolk link to their related versions. The book gives both adranachs a Charisma score of 11 with a +1 modifier. The library displays the standard +0 and records the discrepancy.
- Forty-five compact combat profiles for Waterdeep: Dungeon of the Mad Mage. Each adventure entry shares the exact creature URL, edition and kind of the existing Monster Manual (2014) record. The library explains that the linked creature entry has the complete traits and action rules.

Chromium verified all 50 versions and their gallery snapshots, including artwork order and credits. The comparison images for Wraithroot Tree and Beholder are in `review/`. All 897 tests and the production build passed. The full entry list is in `encounter-batches/01/results.json`.

## Batch 2

Local commit `d0a8c51`. Eight stat blocks finish all 46 cataloged Tal'Dorei Reborn creatures. The additions cover Champion of Ravens, Doty X, Grog Strongjaw, Keyleth, Percival de Rolo, Pike Trickfoot, Scanlan Shorthalt and Taryon Darrington. Keyleth's three named forms link to their 2014 Monster Manual versions, and Doty and Taryon link to each other. Pike's Healing Word keeps the book's +6 value. Doty's note records the ambiguity around the printed saves and the Dedicated Servant bonus.

The other 42 entries share exact 2014 Monster Manual profiles. Eleven are from Waterdeep: Dungeon of the Mad Mage, 28 from Icewind Dale: Rime of the Frostmaiden and three from Ghosts of Saltmarsh. Their library views show Combat summary and retain the linked source for full traits and actions.

Chromium verified all 50 versions and matched their artwork and credits to the baseline. It checked spell tooltips and followed Keyleth's form links and the Doty–Taryon links. Both reviewers finished. All 897 tests and the production build passed. The full entry list is in `encounter-batches/02/results.json`. The Keyleth and Doty before-and-after comparisons are in `review/`.

## Batch 3

Local commit `2f92b35`. The batch adds rules to 50 publication records: eight runnable Saltmarsh stat blocks, 20 Saltmarsh combat summaries and 22 Tomb of Annihilation combat summaries. All summaries match the same 2014 Monster Manual creature URL, edition, kind and challenge rating. The summaries point readers to the adventure for any encounter overrides.

The runnable Saltmarsh blocks are Bodak, Deep Scion, Dolphin, Kraken Priest, Maw Demon, Sea Lion, Storm Giant Quintessent and Swarm of Rot Grubs. The 2014 Kraken Priest has AC 10. Its 2022 printing has AC 15 and remains a separate version. Storm Giant includes lair and regional rules. The Swarm includes the separate single-grub hazard. The shared profiles include the official Goblin Boss and Monodrone javelin errata and the Orc War Chief greataxe erratum.

All 50 records gained appearance notes and 48 gained habitats. Bone Naga and Crawling Claw lack a verified habitat in this batch. Forty-eight versions include an indexed rules link alongside the publisher URL. Generic Bone Naga and generic Yuan-ti Malison have no exact indexed version. The browser verified local link targets and publication identity. External access varies: several official URLs redirected when checked signed out, and automated requests to 5e.tools hit a Cloudflare challenge.

All 897 tests and the build passed. Both reviews are complete. Chromium checked 50 versions and their artwork and credit snapshots, and found Kraken Priest by tentacles and coast, Kuo-toa by rubbery skin and Underdark, and Swarm of Rot Grubs by corpses and swamps. The record list is in `encounter-batches/03/results.json`. Before-and-after screenshots are in `review/`.

## Batch 4

Local commit `26a6a49`. Ten new runnable blocks close the remaining Saltmarsh source-only gaps. The adventure now has local encounter rules for all 98 cataloged entries. The batch also adds 20 Waterdeep: Dragon Heist and 20 Phandelver and Below combat summaries by matching the exact 2014 Monster Manual source, name, kind, edition and CR.

Refrum and Master Refrum use one block and keep their own entries and galleries. The Styes prints AC 10, unarmed equipment and Speak with Dead in place of the generic Priest stats. The compendium alias also uses the corrected rules. Both Saltmarsh Amphisbaena labels share one block. The Tales from the Yawning Portal form is separate. Demilich uses the errata’s 80 HP and the 2014 lair rules.

All 50 updated entries have searchable appearances, and 46 have habitat notes. Four entries lacked a verified habitat in their rules context. Chromium confirmed search and publication navigation, the corrected Refrum compendium view, and existing artwork and credits. All 897 tests and the production build passed. The full batch list is in `encounter-batches/04/results.json`. Refrum and Grell visual comparisons are in `review/`.

## Batch 5

Local commit `1c45c6e`. Fifty adventure rows now show their exact 2014 Monster Manual combat summaries. Three are from Phandelver and Below, 15 from Journeys through the Radiant Citadel, 14 from Planescape: Adventures in the Multiverse, 11 from Dragonlance: Shadow of the Dragon Queen and seven from Curse of Strahd.

All 50 rows have searchable appearance text. Forty-five have verified habitat notes and 49 link to the indexed rules beside the publisher URL. The generic Bone Naga keeps its publisher link and the note about its two variants. Four distinct profiles lacked a verified habitat: Bone Naga, Crawling Claw, Helmed Horror and Slaad Tadpole.

The audit restored eight missing attacks, fixed five Intelligence saves and added the Umber Hulk's Confusing Gaze, the Empyrean's Bolt and 50,000 XP erratum, the Thri-kreen's Bite effects and the Yochlol's damage by form. Hobgoblin Captain keeps the early printed Greatsword damage type and notes the different indexed type.

Two reviewers checked the source matches, appearance and combat details. Chromium compared artwork and credits on all 50 adventure versions, followed the publication picker, and passed four habitat and appearance searches and their rules tooltips. All 897 tests and the production build passed. The batch list is in `encounter-batches/05/results.json`. Umber Hulk and Empyrean comparisons are in `review/`.

## Batch 6

Local commit `0a161ea`. Fifty adventure entries now have combat summaries. Thirty reuse exact 2014 Monster Manual printings, and 20 reuse exact printings from Explorer's Guide to Wildemount, Volo's Guide to Monsters, Ghosts of Saltmarsh, Curse of Strahd and Mordenkainen's Tome of Foes. Reuse checks the creature name, kind, edition, challenge and publisher URL. The original rules stay in one catalog entry and the adventure keeps its own publication, URLs and gallery.

All 50 have searchable appearance notes. Forty-nine have verified habitats and 49 have indexed original rules links. Crawling Claw has no verified habitat, and the generic younger Faerie Dragon has a publisher link and notes for the red, orange and yellow forms. The audit corrected the Bugbear Chief's printed attacks, Faerie Dragon breath and spells, Quaggoth passive Perception, and the printed Stomp, Royal Spear, Grasping Root, bonus Bite and Constrict attacks in the original books.

Both reviewers checked the source matches and corrections. Chromium verified the 50 versions and gallery snapshots, plus four appearance and habitat searches, term tooltips and original-book references. All 897 tests and the production build passed. The entry list is in `encounter-batches/06/results.json`. The Bristled Moorbounder and Tree Blight comparisons are in `review/`.

## Batch 7

Local commit `706cedd`. Fifty new encounter summaries comprise 30 exact 2014 Monster Manual variant versions and 20 exact profiles from other books. All 50 have searchable appearance and habitat notes. The original publisher links remain, and 30 versions have an exact indexed original beside them. The corresponding source entries keep their own editions and rules. Key corrections include Bone Devil Hooked Polearm, the older Faerie Dragon's cumulative spells, Poltergeist's Thrust, the Hag Coven and Loathsome Limbs rules, and missing attacks on both Gazers and the Grung Elite Warrior.

All 50 publication versions have generated primary art. There are 34 new originals, two previously generated portraits for equivalent entries, and 14 additional placements of the same originals across publication versions. The original artwork stays in the gallery as credited alternates. The 34 new originals are backed up and verified against the R2 lock. Both Bone Devil and Giff Shipmate use the event-style revisions. The 32 other new originals still follow the earlier pencil treatment and are queued for the event-style pass. All 897 tests, the production build, exact version navigation, four searches, rules tooltips and image decoding passed. The global media gate reported failed lookups on older files, and targeted retries confirmed the sampled older files and all 34 new ones are readable.

## Artwork backfill

The audit of batches 1–6 found 133 distinct creatures with source artwork but no generated primary. The spot-checked styles are shown in `review/event-art-style-comparison.png` and `review/event-style-portrait-trials.png`. The event images guide color, material depth, highlights and shadows. The shop images guide the neutral paper. The new style is documented in `dm-library/bestiary/image-prompts.md`.

Forty-six earlier pencil-style drafts are backed up in `monster-portraits/batches/encounters-backfill-01/` and in the user's separate Artwork Backups folder. They are not installed. Start the next artwork batch from the missing records in `encounter-batches/portrait-audit.json`. Use the event references and compare before installing. Reuse portraits only for matching visual forms, such as a Gray Slaad with an internal control gem. Keep independent originals and verify the live gallery and R2 lock before marking coverage complete.

## Next encounter batch

Audit exact, attackless 2014 Monster Manual matches for Demilich, Piercer and Pixie. Demilich has a complete 2014 block already filed under Ghosts of Saltmarsh. Verify shared identity and keep encounter-specific overrides separate. Check the matching Flee, Mortals! and Where Evil Lives blocks in print. Include generated portrait coverage and credited alternates in the verification for every new encounter batch.

## Batch 8

Local commit `aa8e37d`. Added runnable rules for 31 publication versions. Nineteen Flee, Mortals! entries use the published Where Evil Lives block for the same publisher creature record. Four Demilich adventure entries use the verified 2014 rules already filed under Ghosts of Saltmarsh. Two Piercer and two Pixie adventure entries share new 2014 Monster Manual blocks. Lightbender, Overmind, Xorannox and Skitterling have separately labeled Flee, Mortals! public playtest versions. No final-version rules were inferred for those four.

All 31 versions have searchable appearance, habitats and a generated portrait. There are 22 new registered originals, with 24 generated files backed up. The existing credited galleries, R2 objects, four searches, two rules tooltips and owner-publication creature link passed verification. All 897 tests and the production build passed. The recent portrait audit now covers 381 publication records with no gaps. See `encounter-batches/08/results.json` and `encounter-batches/08/checkpoint.json`.

## Batch 9

Local commit `d91f302`. Matched 50 Planescape boxed-set entries to their exact Morte’s Planar Parade creature rules. Eight have full runnable stat blocks, and 42 have combat summaries with links to their indexed source rules. All 50 have searchable appearance and lore-based encounter locations.

All 50 new portraits were generated in the event style, backed up and verified in R2. The browser checked the rules, credited galleries, four searches and three tooltips. It also verified 49 additional publisher artwork links on the exact owner publications. All 897 tests and the build passed. See `encounter-batches/09/results.json` and `encounter-batches/09/checkpoint.json`.

## Next Planescape batch

Eight boxed-set versions still need local rules. Check Adult and Ancient Time Dragon with their legendary and lair rules. Verify Mind’s Eye Matter Smith against its apostrophe variant. Check both Planar Incarnate forms before assigning type and spells. Then check Eyestalk of Gzemnid, Larva, and Morte against their actual rules source. Include generated portrait coverage and verify the credited galleries.

## Batch 10

Local commit `6bc86f9`. The last eight Planescape boxed-set entries now have runnable stat blocks. The time dragons have separate CR, reactions and lair effects. The two incarnate forms retain their own type and damage. The Eyestalk uses the adventure’s changes to the Purple Worm. Larva uses the 2014 Dungeon Master’s Guide printing. Morte and the Matter Smith use their index editions.

All 76 boxed-set creature versions now have local rules and generated art. The eight new originals were backed up and verified in R2. The browser checked exact version statistics, credited galleries, four searches and three tooltips. All 897 tests and the build passed. See `encounter-batches/10/results.json` and `encounter-batches/10/checkpoint.json`.

## Next non-delegated encounter batch

The 18 source-only Mordenkainen’s Fiendish Folio Volume 1 entries are the next candidate set. Each has a same-name and same-CR indexed MFF block. Confirm publisher URL ownership and edition, summon or lair mechanics where present, searchable habitat and appearance, and each generated portrait. The exact candidate list is in the batch 10 checkpoint.

## Batch 11

Local commit `42bfb17`. All 18 indexed Fiendish Folio creatures have runnable fifth-edition stat blocks. Each exact Volume 1 record reuses its matched Folio source. The Ancient Time Dragon’s Time Gate now clarifies that either portal opening can be entered from the front.

The 18 new portraits use the muted parchment style and retain the existing credited galleries. All 21 drafts are backed up, and all approved originals were checked in R2. The browser verified the 18 rules views, four searches, two tooltips and Ygorl’s summon link. All 897 tests and the build passed. See `encounter-batches/11/results.json` and `encounter-batches/11/checkpoint.json`.

## Next non-delegated encounter batch

Check the 13 remaining Monsters of the Multiverse publisher entries against the exact 2022 variant rules. Confirm the five Guard Drake colors separately, along with the summoners, Giff, Gazer, Geryon and Drow Mother of Rebellion. Verify each variant’s rules and portrait before reusing any parent block or artwork. Black Flag v0.2 beasts remain with the delegated worker.

## Batch 12

Local commit `a08cdf1`. The last 13 source-only Monsters of the Multiverse variants now have runnable stat blocks. The five Guard Drake colors use their own movement and resistances. The nine older same-name entries retain their printed rules.

All 13 new portraits use the campaign event style on muted parchment. Fourteen drafts are backed up, and all approved originals were checked in R2. The browser verified the exact rules views, credited galleries, four searches, three tooltips and Amnizu's Barbed Devil link. All 897 tests and the build passed. The recent portrait audit covers 470 publication versions with no gaps. See `encounter-batches/12/results.json` and `encounter-batches/12/checkpoint.json`.

## Next encounter batch

Check the five source-only Mordenkainen's Tome of Foes summoner variants against the earlier printing. The list is in the batch 12 checkpoint. Verify the encounter rules, generated portrait coverage and alternate art for each publication version. Black Flag v0.2 beasts remain separately assigned.

## Batch 13

Local commit `03c17d4`. The five remaining Tome of Foes summoner variants have runnable 2018 rules. The Shadowblade uses its original darkness cubes, the Inquisitor keeps its cleric spell slots, and Geryon and Molydeus use the original damage types. All 154 indexed Tome of Foes versions now have local combat rules.

Four existing generated portraits already fit the variants. Geryon now sounds his horn on muted parchment. The new original and both formats of the previous image are backed up. The browser verified the exact primary image hashes, credited galleries, five searches and five tooltips. All 897 tests and the build passed. The portrait audit covers 475 recent publication versions with generated art. See `encounter-batches/13/results.json` and `encounter-batches/13/checkpoint.json`.

## Next encounter batch

Check the 14 source-only Dungeon of the Mad Mage entries against the adventure or an exact earlier stat block. Preserve encounter-specific changes, the adventure's credited artwork and any generated portraits. The exact source IDs are in the batch 13 checkpoint.

## Batch 14

Local commit `61d9765`. All 14 remaining source-only Dungeon of the Mad Mage entries now have runnable rules, searchable appearances, and encounter locations. The CR 3 Giant Mimic uses the verified Dragon Heist rules behind the shared publisher ID. Its rules view links to the separate CR 2 Large Mimic from the Mad Mage statue encounter. All 192 indexed Mad Mage monster records now have a local stat block, combat profile, or variant summary.

All 14 entries have new square portraits on muted parchment. Twelve replace earlier orange portraits, all backed up alongside the new drafts. The browser verified the exact delivered image hashes, credited galleries, 14 searches, five rules tooltips, and the separate Large Mimic link. All 14 new R2 objects, 897 tests and the build passed. The recent portrait audit covers 489 publication versions. See `encounter-batches/14/checkpoint.json`.

## Next encounter batch

Check the seven remaining source-only Dragon Heist entries. Confirm the exact printed variants, especially Manshoon's Simulacrum and the two halfling wererat entries. Compare generated portraits to the campaign event artwork and retain credited alternates. The publisher IDs are in the batch 14 checkpoint.

## Batch 15

Local commit `5bd8986`. The seven source-only Dragon Heist entries now have runnable stat blocks, searchable appearances, and encounter locations. The two wererats keep separate encounter notes. Havia and Mookie have the printed 49 HP and their teleporter rings. Manshoon's duplicate has 126 HP and spell slots through 5th level. The 124 indexed Dragon Heist records now all have local rules or summaries.

All seven new square portraits are backed up. Six replace older orange portraits, whose PNG and WebP files are also backed up. The browser verified the delivered portraits, credited galleries, seven searches, five tooltips, and the link from the simulacrum to Manshoon. All seven R2 images, all 897 tests, and the build passed. The recent portrait audit covers 496 publication versions.

## Next encounter batch

The six remaining source-only Lost Mine of Phandelver entries are in the batch 15 checkpoint. Confirm the named encounter rules and verify portrait coverage. Use the original adventure and check for differences from later Phandelver printings.

## Batch 16

Local commit `5a0c3c8`. All six remaining Lost Mine of Phandelver monster entries now have runnable 2014 rules and searchable appearances and encounter locations. This includes Brughor's 30 HP, King Grol's 45 HP with his ordinary wolf companion, and Targor's optional returning war band. The 15 indexed monster entries now have local encounter rules. Snarl remains the adventure's one source-only beast.

All six updated portraits use muted square parchment. Backed up the six new originals and both PNG and WebP files for each prior portrait. Browser checks covered six searches, five tooltips, the exact Snarl link, and credited galleries. All six new and six previous R2 objects, 897 tests, and the build passed. The recent portrait audit covers 502 publication versions with generated art.

## Next encounter batch

Finish Snarl from the original King's Quarters encounter. Verify the adventure's 18 HP override, ordinary wolf rules, and portrait. The six Icewind Dale monster entries queued after Snarl are listed in the batch 16 checkpoint.

## Batch 17

Local commit `97c42ce`. Snarl now has a runnable 2014 Wolf stat block with the 18 HP specified in the King's Quarters encounter. His entry links to King Grol and the 2014 Wolf. All 16 indexed Lost Mine of Phandelver entries now have local encounter rules.

Snarl's portrait now matches the painted campaign style on muted square parchment. Both formats of his previous portrait and the new draft are backed up. The browser verified the exact portrait hash, credited gallery, beast search, Prone tooltip, and both directions of the King Grol link. Both R2 objects, 897 tests, and the build passed.

## Next encounter batch

Check the six Icewind Dale monster entries in the batch 17 checkpoint. Resolve the exact Crag Cat printing and the encounter-specific cultist, ice piercer, and spore servant rules. Verify their portrait coverage and keep credited artwork.

## Batch 18

Local commit `50d161a`. The six remaining source-only Icewind Dale monster entries now have runnable stat blocks and searchable appearance and encounter notes. The Crag Cat uses the corrected Monstrosity rules with a climb speed. The Ice Piercer uses the adventure's fixed piercing and cold damage. The Black Sword entries retain their own attacks, Icy Doom, and chardalyn amulets. The spore servants use their changed senses, abilities, immunities, and spear attack. All 108 indexed Icewind Dale monster records now have local rules.

All six portraits use muted square parchment. Brain in a Jar and Crag Cat use their new portraits as shared defaults when another printing has no generated portrait of its own. Existing rules and credited galleries stay with their specific printings. The six approved originals and both formats of the four replaced portraits are backed up. Browser checks covered six searches, five tooltips, the older Brain in a Jar printing, and credited galleries. All six new R2 objects, 897 tests, and the build passed.

## Next encounter batch

Verify the Sheep entry against the exact publisher record and the Icewind Dale adventure before closing the remaining beast gap. The five Animated Breath forms in Fizban's Treasury of Dragons follow in the batch 18 checkpoint.

## Batch 19

Local commit `5c6360f`. Sheep now has one runnable CR 0 stat block owned by Storm King's Thunder and shared with Icewind Dale. The Good Mead encounter is labeled in its own section. All 127 indexed Icewind Dale monster and beast entries now have local rules or summaries.

Both publication views use the new muted parchment portrait and retain the credited Storm King's Thunder token. Browser checks covered search, both rules views, the Prone tooltip, the exact Goat and Verbeeg Marauder links, and switching to the credited token. The portrait is backed up and verified in R2. All 897 tests and the build passed.

## Next encounter batch

Verify the five Animated Breath forms from Fizban's Treasury of Dragons. Check each printed damage type and form-specific effect and verify portrait coverage. The exact entries are in the batch 19 checkpoint.

## Batch 20

Local commit `73f3d84`. All five Animated Breath forms have runnable stat blocks with their printed Slam damage, resistance, armor class, aura, or Lightning Burst. The generic entry still holds the shared form rules. All 93 indexed Fizban's Treasury of Dragons monster and beast entries now have local rules or summaries.

Each fixed form has a distinct square portrait on muted parchment. The five drafts are backed up and all five R2 objects are verified. The browser checked search, published variant rules, the parent links, and the credited art as a selectable alternate in each gallery. All 897 tests and the build passed.

## Next encounter batch

Verify the five Explorer's Guide to Wildemount entries in the batch 20 checkpoint. Check the two Allowak yetis, Husk Zombie Burster, Lacedon, and the Sahuagin Warlock of Uk'otoa variant against their printed rules. Verify portrait coverage and preserve credited alternates.

## Batch 21

Local commit `33aa651`. Both Allowak yetis, Husk Zombie Burster, Lacedon, and the Sahuagin Warlock of Uk’otoa variant have runnable stat blocks. All 61 indexed Wildemount monster and beast records now have local rules or combat summaries.

All five have generated square portraits on muted parchment. Three received their first generated portrait, and two replace the earlier orange yeti portraits. Credited images stayed selectable in all five galleries. Browser checks covered search, condition or spell tooltips, and links to the exact base printings. The drafts and replaced images are backed up. The five new R2 objects, two prior R2 objects, 897 tests, and production build passed verification.

## Next encounter batch

Verify the Gazer Familiar, Guard Drake, and Mind Flayer Lich against their exact Volo’s Guide to Monsters entries. Check for existing portrait coverage and preserve the credited images. The next three candidates are listed in the batch 21 checkpoint.

## Batch 22

Local commit `f745de7`. Gazer Familiar, Guard Drake, and Mind Flayer Lich now have runnable stat blocks for Volo’s. The familiar keeps the 10-pound telekinetic limit. The Guard Drake includes its five chromatic variants. The Illithilich has innate and prepared spells, four legendary options, and the 2014 Lich lair actions. All 173 indexed Volo’s monsters and beasts now have local rules or combat summaries.

Three square parchment portraits are backed up and verified in R2. The Illithilich’s orange draft is archived. The Guard Drake portrait applies only to Volo’s printing. Tests confirmed that its six other printings kept their galleries. All three new portraits, credited alternates, searches, and exact reference links were checked in the browser. All 897 tests and the build passed.

## Next encounter batch

Check Shadow (Variant), Will-o’-Wisp (Variant), and Witchlight Hand against The Wild Beyond the Witchlight. The exact publications and links are in the batch 22 checkpoint.

## Batch 23

Local commit `516d3c5`. Shadow (Variant), Will-o’-Wisp (Variant), and Witchlight Hand now have runnable stat blocks. Gleam’s shadow has its carnival theft actions, the wisp has the Hither Magic Boon, and the Witchlight Hand includes both printed sizes. All 68 indexed Witchlight monster and beast records now have local combat rules or summaries.

All three portraits now use muted square parchment. The replacements and both formats of the previous portraits are backed up. Browser checks covered exact printings, search, tooltips, and all seven credited alternates. The three original uploads, previous R2 originals, 897 tests, and production build passed verification.

## Next encounter batch

Check the Hashalaq, Kalaraq, and Tsucora Inspired variants against Eberron: Rising from the Last War. The exact source records are in the batch 23 checkpoint.

## Batch 24

Local commit `4139746`. Hashalaq, Kalaraq, and Tsucora are runnable with their shared Inspired stat block and their printed quori vessel abilities. All 45 indexed Rising from the Last War monster and beast records now have local combat rules or summaries. Three imported aliases still carry a Wildemount tag even though their rules come from Eberron p. 294.

Each variant has a distinct square portrait on muted parchment. The publisher’s illustration stays selectable, and all three originals have two local copies and verified R2 hashes. Browser checks covered searches, spell tooltips, Eberron quori links, and the credited artwork. All 897 tests and the production build passed.

## Next encounter batch

Check Rose Durst, Thorn Durst, and Wereraven against Curse of Strahd. The exact publisher records are in the batch 24 checkpoint.

## Batch 25

Local commit `c980d5f`. Rose and Thorn Durst now have Death House’s possession rules and their full published names resolve to the runnable entries. Wereraven uses the original Curse of Strahd rules and a portrait specific to that printing. All 109 indexed Curse of Strahd monster and beast records now have local combat rules or summaries.

The three revised portraits use Meet Bob the Gate Troll, Children’s Laughter Outside, and the Serpent Eclipse Shadow Arena as direct style references. Keep the backgrounds light and lightly textured in future batches. The first and revised drafts are backed up, the new R2 objects were verified, and the credited artwork is still available in the galleries.

The three misplaced Wildemount names are now searchable aliases for the Eberron Inspired variants. The underlying upstream version data still carries the false tag. Browser checks covered all five merged names, three stat blocks, search, linked rules, and credited alternates. All 897 tests and the production build passed.

## Next encounter batch

Check Aberrant Zealot and Goblin Boss variants against Phandelver and Below: The Shattered Obelisk. Exact source records are in the batch 25 checkpoint.

## Batch 26

Local commit `86ec013`. The tentacled Aberrant Zealot now has its Collectors’ Nook Mind Blast. The Archer Post Goblin Boss uses a shortbow and keeps its two scimitar strikes. The indexed names resolve to the exact publisher variants, and all 80 indexed Phandelver and Below monster records have local combat rules or summaries.

Both portraits use direct event and arena references and light, textured parchment. Their new originals are backed up and verified in R2. The earlier Zealot art is archived. Browser checks covered both variant searches, aliases, and credited galleries. All 897 tests and the build passed.

## Next encounter batch

Check Agony the Ghost and Flapjack the Flumph against Spelljammer: Adventures in Space. Exact publisher records are in the batch 26 checkpoint.

## Batch 27

Local commit `685641b`. Agony now has runnable Ghost rules and its ties to the Last Breath. Flapjack keeps the 2014 Flumph rules and gains its printed Light of Xaryxis spells and the Moondancer helm interaction. The short names resolve to the same entries. All 93 indexed Spelljammer monster and beast records have local combat rules or summaries.

Both portraits follow direct campaign event and stage references and retain light, textured parchment. The originals are backed up and verified in R2. The previous Agony portrait is archived, and source galleries retain the Agony token and Suzanne Helmigh’s Flapjack art. Browser checks covered searches, exact printings, tooltip links, aliases, and credited alternates. All 897 tests and the production build passed.

## Next encounter batch

Check Dracolich (Gargantuan) and Shadow Dragon (Large) against the 2024 Monster Manual. The exact source records are in the batch 27 checkpoint.

## Batch 28

Local commit `d20b7bf`. The Gargantuan Dracolich and Large Shadow Dragon have runnable 2024 rules with the printed hit points, legendary actions, and regional effects. Both size-specific entries keep their own publisher links. All 510 indexed monster and beast records in the 2024 Monster Manual have local combat rules or summaries.

The new square portraits use campaign event and arena references with light, textured parchment. The publisher artwork remains available in both galleries. The originals are backed up and their R2 hashes verified. Browser checks covered search, exact sizes and source links, and tooltips. All 897 tests and the build passed.

## Next encounter batch

Check the Sensa Prince against Journeys through the Radiant Citadel. Its exact source record is in the batch 28 checkpoint.

## Batch 29

Local commit `a56b146`. Sensa Prince now has the shared encounter rules for Kirina and Simbon in Gold for Fools and Princes. Each prince uses AC 11 and two longsword attacks, and takes Dodge at half hit points or lower in the scorpion fight. Both named character entries remain separate. All 89 indexed Radiant Citadel monster and beast records have local combat rules or summaries.

The new portrait follows the campaign event and arena art and uses light, textured parchment. The new original and its predecessors are backed up. The browser verified the encounter search, Dodge tooltip, links to both princes and the two base creatures, and both credited alternate images. The R2 objects, 897 tests, and production build were verified.

## Next encounter batch

Verify Dust Devil against its public 2014 source. The publisher page and the source-attribution question are in the batch 29 checkpoint.

## Batch 30

Local commit `0554b15`. Dust Devil now has a runnable CR 5 stat block under Basic Rules (2014), the source of the standalone publisher record. It links to the Air Elemental and two blue dragons in the 2014 Monster Manual. Whirlwind preserves its saving throws and separate collision damage. The earlier version link still opens the entry after the publication correction.

The new portrait uses the campaign event and arena art on light, textured parchment. The old WebP is backed up, the new original is verified in R2, and the gallery includes the Air Elemental image explicitly as related art. Search, the Prone tooltip, the source links, all 897 tests, and the production build passed.

## Next encounter batch

Verify the Lightbender and Overmind from Flee, Mortals! against the published rules. Both appear in MCDM’s official preview. Preserve the encounter roles and Villain Actions. Exact publisher records are in the batch 30 checkpoint.
