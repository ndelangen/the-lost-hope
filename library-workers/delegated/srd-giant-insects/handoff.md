# SRD giant insects

This batch stages **Giant Fly** from SRD 5.1 and the three forms of **Giant Insect** from SRD 5.2.1. Both creatures come from magic, and the sources give no natural habitat. The profiles describe the item or spell that brings them into play.

- **Giant Fly.** The 2014 Ebony Fly figurine becomes a Large mount with AC 11, 19 HP and a 60-ft. fly speed. It lasts up to 12 hours and takes two days to recharge. The 5.1 block leaves challenge blank, while the separate 5.2.1 block gives CR 0. [SRD 5.1, pp. 221–222]()
- **Giant Insect.** The selected centipede, spider, or wasp starts at AC 15 and 30 HP with a 4th-level slot. Each higher slot adds 1 AC and 10 HP. The printed challenge is None, with 0 XP. Web Bolt belongs to the spider, Venomous Spew to the centipede, and flight to the wasp. The HP formula matches the correction to the early *Player's Handbook* printing. [SRD 5.2.1, pp. 135–136]() · [Official errata]()

Apply [rules.patch](rules.patch) to stage the 5.1 book profile, the 5.2.1 scaling records, and their three SRD form rows. The [book profile](book-profiles.json) and [scaling recipes](scalable-recipes.json) are available separately if the catalog has moved. The library check records search, displayed printing and portrait coverage. The [scaling results](scale-validation.json) cover all three forms at slot levels 4–9 and include the resolved modifiers, movement, and actions. [Verification](verification.json) · [Before](catalog-before.json) · [After](catalog-after.json)

[Portrait comparison](portrait-comparison.jpg) shows the book references, four new plain-parchment drafts, and the reused centipede portrait. The reused centipede portrait has warmer paper than the new gray-tan drafts. Its source art remains intact. [Portrait files and hashes](portrait-files.json) · [ImageGen prompts](portrait-prompts.json) · [Temporary portrait index entries](portrait-index-preview.json)

The rules summaries adapt material from the System Reference Document 5.1 and System Reference Document 5.2.1 by Wizards of the Coast LLC, available on the [Wizards SRD page](https://www.dndbeyond.com/srd) under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/). [Independent source notes](independent-source-notes.md)
