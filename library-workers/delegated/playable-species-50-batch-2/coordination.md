# Production handoff

Use the approved rows in claims.tsv. One owner per species and its listed publication, one original NPC concept and runnable build per profile, and one original square raster portrait per species. Ownership is limited to playable profiles and linked examples. Leave both Git checkouts and R2 alone. Work only in your own parts subfolder or temporary directory. Never run automated tests, bun verify, or git apply checks. The parent creates the aggregate patch.

Read original player rules, record the printed pages and links, paraphrase the traits, and check NPC numbers and artwork manually. For Savage Species, use the explicitly printed monster class progression and label the 3.0 publication accurately. Use the class tier needed for the role, or adjust the role to suit a lower published tier. Keep edition and publication keys from the roster unless evidence requires a correction, in which case notify the parent.

Use the imagegen and campaign-images skills for original portraits, with Big Linda at  as the rendering reference. Make one individual ImageGen call per original portrait. Plain warm tan parchment, entire isolated subject, naturalistic muted pigment, faint contact shadow, no backdrop scenery. Review at full size and thumbnail size.

Stage book-species.json (array, name/kind species/publication/edition/traits), npc-builds.json (builds and concepts arrays, exact speciesPublication and edition on concepts), source-evidence.json (array, exact name/publication/edition/publisher/url, pages and distinctions), portrait-files.json (array, name/file/sha256/width/height/credit) and handoff.md. Use the first batch's parts for examples. Apply unslop to prose. Send the parent completion status and any source or art blockers.
