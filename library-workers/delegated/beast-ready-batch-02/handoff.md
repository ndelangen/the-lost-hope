# Beast encounter readiness, batch 02

This batch stages 50 existing Beast printings against catalog commit `467bc27`. It adds 38 native Black Flag v0.2 blocks and 12 from the 2014 Monster Manual. Each of the 12 paired animals shares one square parchment portrait across its two printings. The other 26 animals each have a portrait. [Roster](roster.tsv) · [Rules patch](rules.patch) · [Source and portrait manifest](manifest.json) · [Portrait index additions](portrait-index-preview.json)

The Black Flag entries keep their printed fixed Perception and Stealth, ability modifiers, and action rules. Their XP comes from the book’s p. 229 table. The native blocks omit ability scores and Hit Dice. The 2014 versions show their own scores, Hit Dice, and revised mechanics where official errata applies. [Black Flag v0.2]()

- Hyena’s Cackling Chorus gives both DC 10 and a scaling DC. The profile records both and uses 8 plus participating hyenas as a table ruling. [Hyena handoff](parts/b02_05/handoff.md)
- Pony’s Draft Animal text calls the beast a draft horse. The profile applies the printed three-times multiplier to the Pony and leaves its capacity in pounds unspecified. [Pony handoff](parts/b02_07/handoff.md)

In a disposable Library copy, I opened Black Flag Boar and switched to the 2014 Monster Manual printing. The portrait stayed the same while Charge changed from DC 12 to DC 11 and Relentless from a 4-damage threshold to 7. I also checked Hyena’s source note, Pony’s carrying rule, and Baboon’s CR 1/8 and CR 0 across the two editions. The browser console showed no warnings or errors. The source and browser checks were manual. [Boar before and after](boar-before-after.jpg) · [2014 Boar](boar-mm-2014.jpg) · [Hyena](hyena-black-flag.jpg) · [Pony](pony-black-flag.jpg)

[Portraits 1–19](portraits-1.jpg) · [Portraits 20–38](portraits-2.jpg) · [Comparison with Big Linda](portrait-comparison.jpg)

The square portraits retain full subjects. The circular crops trim a few outer tips, including on the Octopus. Each part handoff records its source folios and art prompts.

## Integration files

Apply the rules patch to a compatible catalog snapshot. Copy each unique PNG from the manifest to its destination in the index, relative to `output/dm-library/5etools`, and append the new index rows. Keep the originals local for the compression decision.

## Part handoffs

- [Ape and Axe Beak](parts/b02_01/handoff.md), [Baboon and Badger](parts/b02_02/handoff.md), [Boar](parts/b02_03/handoff.md), [Camel](parts/b02_04/handoff.md), [Cat](parts/b02_05/handoff.md)
- [Crocodile](parts/b02_06/handoff.md), [Elk](parts/b02_07/handoff.md), [Lion](parts/b02_08/handoff.md), [Mammoth](parts/b02_09/handoff.md), [Panther](parts/b02_10/handoff.md)
