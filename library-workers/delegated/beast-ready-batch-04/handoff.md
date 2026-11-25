# Beast batch 04

Staged 50 encounter records for 25 Beasts, with a separate rules overlay for the 2014 *Monster Manual* and November 2018 *Basic Rules*. Each pair shares one new 1254 × 1254 plain-parchment portrait. The 25 original PNGs are local and unchanged from the selected ImageGen outputs. The versioned index adds the new defaults while retaining credited art in the Library. [Roster](roster.tsv) · [Manifest](manifest.json) · [Rules patch](rules.patch) · [Portrait index](portrait-index-preview.json)

Brown Bear uses the Monster Manual errata's +6 attack bonus and records the first printing's +5. The Monster Manual Giant Lizard lists optional Hold Breath and Spider Climb. The first-print Giant Bat scan confirms Echolocation and Keen Hearing at the top of the right column, and both entries include them. [Basic Rules ]() · [Monster Manual errata]() · [Giant Bat page evidence](parts/b04_04/source-evidence.json)

I searched for Giant Crocodile by name and by “scuted back” in the temporary Library. Both versions loaded the same square portrait and showed the DC 16 Bite escape and Tail save. I switched between both Giant Bat versions and saw both traits in each. The browser console showed no warnings or errors. The independent catalog review matched all 25 portrait hashes between staging and the temporary app.

[Library before and after](giant-crocodile-before-after.jpg) · [Portraits 1–13](portraits-1.jpg) · [Portraits 14–25](portraits-2.jpg) · [Comparison with Big Linda](portrait-comparison.jpg)

Apply the rules patch to a compatible catalog snapshot. It applied cleanly to a temporary archive of catalog commit `c1f922a`. In that copy, put each unique manifest PNG at the path in `portrait-index-preview.json`, relative to `output/dm-library/5etools`, and append the index records.
