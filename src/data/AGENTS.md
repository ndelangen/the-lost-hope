# Campaign data rules

Files below this directory are structured campaign canon, not formatted documents. Rendering
belongs in `src/components/`; derivations and reference resolution belong in
`src/lib/campaign.ts`. Follow `docs/product-goals.md` for the product intent behind these rules.

## Content and references

- A `Content` value is a list of paragraph arrays, for example
  `[['One paragraph.'], ['Another paragraph.']]`.
- Do not put Markdown syntax in data strings. Use nested arrays for paragraphs and `refs.*` tokens
  for entity links.
- Import references only from `#/data/refs.ts`. Do not import another entity or its `_index.ts`
  registry just to create a relationship.
- Every named entity in prose should be a reference when a canonical entity exists.

## Reference first: one fact, one owner

- Every fact has exactly one canonical owner. Before adding prose or a field, identify that owner
  and search for an existing version of the fact.
- Structured fields (`species`, `class`, `level`, `status`, `location`, `languages`, `map`, and so
  on) own their facts. Do not restate them in `notes`.
- Events own what happened, when it happened, where it happened, and who participated. Do not
  retell an event in character or location notes; reverse links surface it automatically.
- Locations describe the place itself, not the events that occurred there.
- Characters own identity, mechanics, secrets, and memberships. Organization member lists are
  derived from character memberships and must not be copied onto organizations.
- Sessions own their real-world play date and ordered event references, never copies of event
  prose. Campaign ordering lives in `src/data/index.ts`.
- `notes` contains identity, flavor, secrets, or context with no better structured home. Omit it
  when there is nothing useful to add.
- Use references instead of maintaining inverse lists or repeated labels. Prefer `reverseLinks`
  and other derivations in `src/lib/campaign.ts` when the relationship can be computed.
- When moving or correcting a fact, update its owner and remove stale copies in the same change.
- Add a schema field in `src/definitions/` when a recurring fact has no structured home.

## Quest synthesis exception

Quests own the synthesis of a story thread in `clues` and `conclusion`. They may repeat the minimum
context needed to explain why a fact matters, but the repetition is a summary, not independent
canon.

- Link the relevant event and entity references in a clue whenever they exist.
- Do not copy a full event account or maintain a quest-only version of an entity fact.
- If quest wording conflicts with a referenced event or entity, the event or entity is canonical;
  update the quest summary.

## Chronology

- Sessions use full real-world dates: when the group played.
- Events use a positive integer `day`: the campaign day on which they happened in the fiction.
- The order of a session's event references records chronology within each campaign day. Do not
  invent precise in-world times when the notes do not provide them.
- Campaign days may be absent when no event was recorded. A session may span several campaign days,
  and a campaign day may eventually span sessions.

## Adding or changing an entity

- Search all of `src/data/` before creating an entity. Names and derived slugs must be unique across
  all eight kinds: beast, PC, NPC, location, event, session, quest, and organization.
- Use a specific canonical name. The name derives the slug; the filename is the kebab-case slug and
  the registry key is its snake_case form.
- Add the file to its kind's `_index.ts` and keep the matching key list in
  `src/data/registry-keys.ts` synchronized. Use the corresponding `refs.<kind-plural>.<key>`
  namespace everywhere else.
- Audit the change for copied facts, copied relationship lists, and bare names that should be
  references. For intentional quest synthesis, verify the canonical event/entity still owns the
  underlying fact.
- Events use sequential `n2-e###.ts` filenames and require `day`, `location`, `mark`, and `notes`.
- Record unresolved canon in `QUESTIONS.md` only when it blocks a correct model. Include the known
  context, why the answer matters, and the session number when known; remove resolved questions.
- Use the repo skill `$plan-campaign-entity` for entity creation, imports, renames, or ambiguous
  character/place/event references.
