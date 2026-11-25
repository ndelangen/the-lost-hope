# Beast batch 06

Staged 50 Beast encounter records against catalog commit `ca9833a`. The batch covers 27 *Monster Manual* records, 15 November 2018 *Basic Rules* records, and eight from the August 8, 2014 first version of the *Hoard of the Dragon Queen Online Supplement*. The roster preserves existing variant names and exact publication scopes. [Roster](roster.tsv) · [Source and portrait manifest](manifest.json) · [Rules patch](rules.patch) · [Portrait index](portrait-index-preview.json)

The seven barded warhorses use the printed armor classes and the official +6 Hooves correction. The swarm entries apply the official grappled immunity. Each insect swarm keeps its printed variant changes and shares art across its alternate catalog names. The Hoard records use the supplement's own rules, including the Stirge's separate initial piercing damage and ongoing hit point loss. [Monster Manual errata]() · [Basic Rules ]() · [Hoard Online Supplement v1]()

The bundle reuses 35 portraits. Cave Bear uses the dark-coated parchment portrait from the earlier AD&D *Monstrous Manual* bundle. It was missed in the initial art scan, and the extra draft was excluded from this bundle. The reused portraits keep their original files and earlier runtime paths. [Comparison with Big Linda](portrait-comparison.jpg) · [Portrait sheet 1](portraits-1.jpg) · [Portrait sheet 2](portraits-2.jpg)

In a temporary Library copy, I found Cave Bear by name and verified the 2014 portrait, darkvision, and swim speed. Both spider swarm names showed the same portrait, and I checked the web traits and grappled immunity. The Hoard Stirge loaded its portrait and showed the separate damage and blood-loss triggers. The browser console showed no errors or warnings. The independent catalog review matched all 50 runtime index rows and all 35 image hashes. [Cave Bear before and after](cave-bear-before-after.jpg) · [Hoard Stirge](stirge-hoard-preview.jpg)

To use the local bundle, apply the rules patch to a compatible catalog and append the preview index rows. Each image path in that index is relative to `output/dm-library/5etools`. The manifest pairs each path with a packaged source and SHA-256.
