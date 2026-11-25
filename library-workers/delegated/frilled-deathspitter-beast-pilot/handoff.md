# Frilled Deathspitter Beast pilot

This pilot completes the existing Beast entry in the DM Library. It uses James Wyatt’s *Plane Shift: Ixalan*, January 2018 first printing, p. 30, under the 2014 fifth-edition rules. The patch adds one local stat block against catalog commit `aabd361`. [Official source, p. 30]() · [Printing evidence](source-evidence.json) · [Rules patch](rules.patch)

## Running the encounter

Small Beast, unaligned, CR 1/2 (100 XP). AC 13, 18 HP (4d6 + 4), 40-ft. speed. Multiattack is one Bite and two Claws. Spit Poison is a separate ranged attack at +5 to hit and 15/30 ft. On a hit, the target makes a DC 13 Constitution save. On a failure it takes 18 (4d8) poison damage and is blinded through the end of the deathspitter’s next turn. A success halves the damage and avoids blindness. The Library entry also gives the six ability scores, Perception, melee damage, and the effects of being blinded. [Full local block](stat-block.json) · [2014 blinded condition](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/appendix-a-conditions#Blinded)

The new appearance uses the printed illustration for the green scales and rust-orange frill. “Ixalan jungles” and “Jungle ruins” are search tags inferred from the setting and illustration. The printed block gives no formal habitat list. [Source evidence](source-evidence.json)

## Portrait and manual checks

The 1254 × 1254 local PNG shows the full subject on muted parchment. Big Linda supplied the paper and brushwork reference. The original Zoltan Boros illustration is available as the second image in the same gallery and still displays its credit. [Original PNG](portraits/frilled-deathspitter.png) · [96 px preview](portrait-96.png) · [Generation prompt](portrait-prompt.json) · [Credited gallery image](credited-art.jpg)

In a disposable copy, the old entry showed an encounter reference with the attack name, DC, and condition. The staged version displayed the full action sequence, including the failed-save blindness duration. The generated portrait loaded at native resolution. I switched to the credited illustration, then found the entry by “rust-orange feathers” and “jungle ruins” under Beasts. The browser console showed no warnings or errors. [Before and after](library-before-after.jpg) · [Full rules view](after-full.jpg) · [Habitat search](habitat-search.jpg)

During integration, apply the rules patch, copy the staged PNG to the path in the portrait index relative to `output/dm-library/5etools`, and append the version-specific index row. [Portrait index row](portrait-index-preview.json) · [PNG dimensions and hash](portrait-file.json)
