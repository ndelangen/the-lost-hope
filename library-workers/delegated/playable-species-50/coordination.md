# Playable species batch

This batch owns playable species profiles, NPC builds that reference those profiles, and their portraits. Monster stat blocks and standalone encounters stay with the primary worker. Each canonical playable entry and its variations have one owner. Claims were checked against catalog commit `e90520f`. The integration baseline is recorded in the final manifest. Do all work under each assigned folder in `parts/` or outside the checkout in temporary storage. Keep checks manual and leave Git and R2 alone.

Before working, check the catalog in ``, existing staged handoffs in the parent directory, and `claims/assignments.tsv`. Write the exact canonical names and publication or variant names to `claims/<your-agent>.tsv` before editing or commissioning art. In case of a conflict, leave the existing claim in place and tell the parent which fallback you propose. Record publication variants on the same owner row. The parent owns integration.

Each folder should include these files, modeled on the existing Gray Orc handoff:

- `book-species.json` is an array of records with name, kind species, publication, edition, and traits as an array of strings. Use the catalog's exact publication for an existing entry. Keep a separate record per publication only when necessary for actual rules. Include a short original rules summary usable at the table.
- `npc-builds.json` is an object with builds and concepts arrays using the existing catalog shapes. Add original named encounter examples scoped to exact species publication and edition, with real play math. One carefully checked build per species is the required minimum.
- `source-evidence.json` is an array with each name, publication, edition, publisher, URL and actual source page or heading. Include the rules distinctions or print variants worth preserving. Use primary books or publisher texts. Note which exact existing profile is being filled if applicable.
- `portraits/<species-slug>.png` is one original square illustration per canonical species. Each agent owns the image for its claims. Use built-in imagegen and the imagegen and campaign-images skills. Use Big Linda at `` for style. Briefly review full art and thumbnail by eye. Keep plain warm parchment, isolated complete creature, soft earthy rendering, a tiny contact shadow, and no scenery or decorations. Save portrait mapping to `portrait-files.json` with name, file, sha256, width, height, and credit. Match portrait name to the species record.
- `handoff.md` names the deliverables, source distinctions, manual review status, and any pending work. Apply unslop. Keep prose concise.

Send the parent an early status with exact claims and explicit source blockers. Do not touch the primary checkout's tracked files, the integration worktree, shared catalogs or R2. Skip automated tests, temporary-copy suites, and `bun run verify`. Do not generate or apply a patch. The parent merges your standalone records into the batch patch.
