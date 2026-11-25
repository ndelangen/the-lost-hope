# DM Library batch 11

The staged patch adds 50 playable profiles and 50 linked NPCs against catalog commit `5f228a2`. Each profile uses the 2014 fifth-edition player rules in Tyler Kamstra’s Monstrous Races v2 and has one square plain-parchment portrait.

[Catalog patch](rules.patch) · [Source and portrait manifest](manifest.json) · [Portrait index preview](portrait-index-preview.json) · [Reviewed roster](claims.tsv)

## Portraits

[Compare with Big Linda](portrait-comparison.jpg) · [Portraits 1–25](portraits-1.jpg) · [Portraits 26–50](portraits-2.jpg)

The manifest identifies each PNG original. The linked handoffs include generation prompts, thumbnail comparisons, and source folios.

## Printed forms

The book sends fourteen names to another player trait block. These names are searchable under the block they use. Brown Bear uses Black Bear, Mammoth uses Elephant, and Draft Horse, Riding Horse and Warhorse use Pony. Giant Lizard groups Gecko, Iguana and Salamander and has one NPC. Encounter entries keep their own catalog kind. [Printed cross-references](claim-list.md)

The source handoffs record omissions and wording differences in this printing. The Hunter Shark NPC uses Medium from the same book’s design note because the size line is blank. Wolf and Worg omit the damage dice mentioned in the design notes, so their monk NPCs use the class’s Martial Arts die. [Hunter Shark](parts/eleven_f/handoff.md) · [Wolf and Worg](parts/eleven_j/handoff.md)

## Manual review

I loaded the patch and portrait index in a disposable copy of catalog commit `5f228a2` and checked the Library in a browser.

- Mammoth went from zero playable results to one. It opened Elephant’s v2 p. 230 player profile, the p. 252 cross-reference and Kettlebrow’s portrait. The NPC link opened Kettlebrow’s stats and Trampling Charge. The Beasts search still returned the Mammoth encounter entry with seven versions. [Search before and after](search-comparison.jpg) · [Elephant](elephant-detail.jpg) · [Kettlebrow](kettlebrow-detail.jpg) · [Mammoth encounters](mammoth-beast-search.jpg)
- Brown Bear, Giant Shark and Dire Wolf opened Black Bear, Hunter Shark and Wolf, respectively. Each detail showed the linked NPC and the printed cross-reference. [Black Bear](black-bear-detail.jpg) · [Hunter Shark](hunter-shark-detail.jpg) · [Wolf](wolf-detail.jpg)
- Draft Horse, Riding Horse and Warhorse each found the same Pony profile. Iguana found Giant Lizard, whose rules group Iguana, Gecko and Salamander. [Pony](pony-detail.jpg) · [Giant Lizard](giant-lizard-detail.jpg)

All six sampled portraits loaded at 1254 × 1254. The browser console showed no warnings or errors. Each portrait was also reviewed at full size and at 96 pixels. The circular crop trims the outermost Elk antler and Giant Bat wing tips. The square originals retain the full subjects.

Independent reviewers sampled rules and NPC arithmetic, then checked the combined publication, edition, grouping and portrait keys. The rules and browser checks were manual.

## Integration files

Apply the patch to a compatible catalog snapshot. Use the manifest to locate the original for each portrait index row. Copy the PNG to that row’s path relative to `output/dm-library/5etools`, then append the new portrait index rows during integration.

## Source handoffs

- Ape, Awakened Tree, Baboon, Badger, Bat. [Rules and art handoff](parts/eleven_a/handoff.md)
- Black Bear, Boar, Camel, Cat, Constrictor Snake. [Rules and art handoff](parts/eleven_b/handoff.md)
- Crab, Crocodile, Deer, Eagle, Elephant. [Rules and art handoff](parts/eleven_c/handoff.md)
- Elk, Giant Badger, Giant Bat, Giant Crab, Giant Goat. [Rules and art handoff](parts/eleven_d/handoff.md)
- Giant Lizard, Giant Rat, Giant Scorpion, Giant Sea Horse, Giant Vulture. [Rules and art handoff](parts/eleven_e/handoff.md)
- Giant Weasel, Giant Wolf Spider, Hawk, Hunter Shark, Jackal. [Rules and art handoff](parts/eleven_f/handoff.md)
- Killer Whale, Lion, Mastiff, Mule, Octopus. [Rules and art handoff](parts/eleven_g/handoff.md)
- Owl, Panther, Phase Spider, Poisonous Snake, Polar Bear. [Rules and art handoff](parts/eleven_h/handoff.md)
- Pony, Quipper, Reef Shark, Rhinoceros, Scorpion. [Rules and art handoff](parts/eleven_i/handoff.md)
- Tiger, Weasel, Winter Wolf, Wolf, Worg. [Rules and art handoff](parts/eleven_j/handoff.md)
