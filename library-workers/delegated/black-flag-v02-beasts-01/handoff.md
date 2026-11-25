# Black Flag v0.2 beasts

This batch covers the first 20 of the 49 Beast entries marked for source lookup in Kobold Press's Black Flag Roleplaying Reference Document v0.2. I chose this publication because the original, publicly accessible supports exact-printing checks for a larger batch. The Monster Vault catalog has more gaps, but its publisher index alone does not establish the rules in that printing.

## Rules and sources

The publisher and the library copy are byte-identical. The credit on page 1 identifies the printing as **Black Flag Roleplaying Reference Document v0.2, © Open Design LLC d/b/a Kobold Press**. Every CR matched the catalog. The handoff includes the exact page for each block and accounts for rules that continue onto the next page. The rules patch leaves the existing source column alone because the catalog's TSV validator excludes addresses. The exact page links are in the evidence file and the table below. [Publisher ]() · [Exact catalog IDs, page links, and evidence](source-evidence.json)

| Beast | CR | Publisher pages |
| --- | ---: | --- |
| Black Bear | 1/2 | [353]() |
| Blood Hawk | 1/8 | [359]() |
| Brown Bear | 1 | [353]() |
| Constrictor Snake | 1/4 | [369–370]() |
| Dire Wolf | 1 | [374]() |
| Draft Horse | 1/4 | [359]() |
| Flying Snake | 1/8 | [370]() |
| Giant Ape | 7 | [350]() |
| Giant Badger | 1/4 | [352]() |
| Giant Bat | 1/4 | [352]() |
| Giant Boar | 2 | [354]() |
| Giant Centipede Insect | 1/4 | [360–361]() |
| Giant Constrictor Snake | 2 | [370]() |
| Giant Crab | 1/4 | [355]() |
| Giant Crocodile | 5 | [355]() |
| Giant Eagle | 1 | [356]() |
| Giant Elk | 2 | [357]() |
| Giant Fire Beetle Insect | 0 | [361]() |
| Giant Frog | 1/4 | [357–358]() |
| Giant Goat | 1/2 | [358–359]() |

- Black Flag uses fixed Perception and Stealth values and prints ability modifiers. The profiles preserve those values. Condition resistance and vulnerability affect checks or saves against the condition. Giant Crab's damage defenses stay in the damage fields. [Publisher rules for monster numbers and condition defenses]()
- The Giant Ape and Giant Crocodile keep their printed attack rolls and damage even where those values differ from the printed Strength modifier. Both constrictor Crush notes explain the missing word “save.” Giant Eagle's conditional swimming stays with Seabird. Draft Horse keeps its three-times carrying-capacity rule without deriving a weight from a modifier.
- The 's blocks give no habitat line. The search tags are encounter suggestions drawn from the equivalent creature in Monster Manual (2024), with a separate citation per record. Appearance describes the selected creature portraits. The rules and CRs come from Black Flag v0.2.
- The existing ordinary Ape profile appears to include the Giant Ape's Fist and Rock beneath its own attacks. The Giant Ape profile in this batch uses its own block, and the ordinary Ape record remains for a separate audit.

## Generated portrait coverage

I checked all 20 square images and their hashes. Giant Centipede Insect and Giant Fire Beetle Insect already have generated portraits for their catalog entries. The other 18 have verified generated art under the noun-first name for the same physical form in Monster Vault. The staged additions point those entries at the existing images and keep the credited alternates. The 18 reused portraits have noticeably orange paper and remain candidates for a style pass. They are older images, and this batch contains no newly generated drafts. [Selected portrait comparison](portrait-contact-sheet.jpg) · [Image provenance and hashes](portrait-reuse.json)

## Integration and verification

Apply the [rules patch](rules.patch), or append the [profile objects](book-profiles.json) to the catalog by exact printing. Merge the [18 portrait index additions](portrait-index-additions.json) by entry ID after checking for any intervening portraits. The additions reuse files already present in the working library and leave the two existing target portraits in place.

I applied the rules and portrait changes in a temporary copy and loaded the library. All 20 versions came back as combat summaries. I checked their exact keys, CRs, attacks, mechanics, habitat and appearance searches, primary portrait hashes, and all gallery images and credits. The primary checkout and R2 received no changes. [Before](catalog-before.json) · [After](catalog-after.json) · [Verification](verification.json)
