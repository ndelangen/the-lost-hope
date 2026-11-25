# Batch 144

Local commit `0930f1b` adds the 50 encounter profiles in claims.tsv. Each is a Monster from the 2014 Monster Manual. The library opens to the corrected 2014 profile by default and retains alternate printings. The local catalog now has 103 full 2014 profiles and 329 rows at other levels of coverage.

The Banshee, Vampire, and Nothic have new 1254 × 1254 parchment portraits. The original PNGs are backed up in art/ and listed in art-manifest.json. The dev app served identical bytes for all three. All 47 other entries keep their existing generated portraits, and all 50 keep credited alternates. These PNGs are local.

Spot-checked nine library entries, including the Drider variant, the Half-Red Dragon Veteran, both Drow spellcasters, and the Kuo-toa Archpriest and Monitor. The screenshots in this folder show the default publication and the displayed rules. The review also confirmed that the local printing differs from the index for the Hobgoblin Captain's greatsword and the Drow Mage's Deception. The Poltergeist entry flags the unspecified damage type for collisions.

Applied four errata corrections to prior profiles for Demilich, Grell, Gray Slaad, and Hook Horror. Automated tests were skipped as requested.
