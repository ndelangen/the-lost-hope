# Campaign data rules

Files below this directory are structured campaign canon, not formatted documents. Rendering
belongs in `src/components/`; derivations and reference resolution belong in
`src/lib/campaign.ts`. Follow `docs/product-goals.md` for the product intent behind these rules.

## Hard rule: structured content, never Markdown

- A `Content` value is a list of paragraph arrays, for example
  `[['One paragraph.'], ['Another paragraph.']]`.
- Do not put Markdown syntax in data strings. Use nested arrays for paragraphs and `refs.*` tokens
  for entity links.
- Import references only from `#/data/generated/refs.ts`. Do not import another entity or its `_index.ts`
  registry just to create a relationship.
- Every named entity in prose should be a reference when a canonical entity exists.

## Hard rule: one fact, one canonical owner

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
- Every registered event must belong to exactly one session. Never leave an event orphaned or list
  it in multiple sessions.
- When the source does not identify an event's session, make the best provisional judgment from
  chronology, nearby events, participating characters, and known session context. Record the
  uncertainty in `QUESTIONS.md` when it remains materially ambiguous, but still assign the event to
  the most likely session.
- Campaign days may be absent when no event was recorded. A session may span several campaign days,
  and a campaign day may eventually span sessions.

## DM prep

- Arcs own their plots. A plot links to at most one prepared scene and may link to several played
  events. Use the same event reference wherever it advances another plot or arc.
- Scenes own the location, setup, and possible outcomes. Events own what happened in play. Linking
  an event leaves the plot open until the DM closes it.
- A scene has no list of related records: what it mentions is derived from its fields and the refs
  in its text, so link a record by writing it into the text where it matters.
- A scene's `npcs` is its cast. A scene that can turn into a fight lists who fights and how many in
  `opponents`, which seeds the encounter. Do not restate those counts in prose.
- When a fight comes in stages (room by room, or help that turns up), each stage belongs to the
  beat where it happens: the beat's `fight` lists the `opponents` who join, any `allies` who join
  on the party's side, whether the group `repeats`, and the `tactics` for playing them. The
  encounter lists those fights and brings one in on a click. Scene-level `opponents` are only
  those present from the start. The counts and tactics live in the `fight`, not in the beat's
  lines or the scene's `combat` notes.
- Aboard a vessel under fire, a fight's `where` places it on the ship: a `deck` (the deck map's
  location), a `slice` counted from the bow, and a `side` when it is in one room only. Without a
  slice it is anywhere on that deck. A fight with no `where` follows the party. The ship's
  schematic then shows the fight in its rooms, so the room is not repeated in the beat's lines.
- A plot lists only NPCs its scene does not already cast. The plot's full cast is derived.
- A vessel's layout (`hull` sectors and their escape pods) lives on its item. A deck map's
  location names its vessel (`deck`). A scene fought aboard a vessel names it in `aboard`, and the
  room board shows the rooms, so the scene text does not repeat them.
- A save that many characters make at the same moment is a beat's `groupSave`: who rolls, the
  ability, the DC and the bonus for a good reason. Someone whose outcome is fixed is listed as
  `{ who, always }`. The tracker and the player screen show the list and the numbers, so the
  beat's lines do not repeat them. The player screen names everyone listed, met or not, so list
  only those the players may see. The rolls made at the table stay in the
  DM's browser until they are written up as an event.
- NPCs own their motivations. Reference the NPC from prep so you can read the motivation alongside
  the scene. Arc and scene references come from the generated `refs.arcs` and `refs.scenes` namespaces.
- When scene prose sends the DM to another prepared scene, reference it (`'Run ', refs.scenes.x`)
  instead of quoting its name. Scene prose is `DmContent`, the only content that may hold
  `refs.scenes.*`; player-facing content never can.
- When importing a played session, read `bun run dm:brief` first, link each new event to the plots
  it advanced, and update those plots' `notes`. The `$plan-campaign-entity` skill has the steps.

## Promises and foretellings

- Something promised, foretold, or bound to happen later (a delivery, a vow, a prophecy, a lock that
  opens under a full moon) is a `foretold` entry on the event that made it, or on the item when it
  is the item's own nature. The entry owns the text and the timing; do not repeat either in `notes`.
- `when` is `within` or `after` a span counted from the event's day, or `fullMoon`. Omit it when no
  time was set. Write `what` without the timing: the pages and the DM dashboard show it.
- Once it happens, set `cameTrue` to that event. Do not delete the entry.
- The DM dashboard derives the list of what is still to come. Only canon goes here: a hint or
  question counts when an NPC said it in play, never a guess about what it means.

## Effects

- A lasting effect on a PC, NPC, or beast (a curse, a card's boon or bane, a bargain, a
  transformation) is an `effect` record in `src/data/effects/`. The effect owns its rules, duration,
  obligations, DM reminders, and removal conditions. Events and items reference it with
  `refs.effects.*` and never restate its mechanics.
- `began` and `ended` reference the events where it took hold and was lifted. Do not store a status:
  active, lifted, or expired is derived from those events and `duration`.
- Use `triggers` for reminders the DM tool fires (`newDay`, `encounterStart`, `longRest`,
  `wouldDie`) and `obligations` for "do this within a span or suffer a consequence". Write damage as
  `{ dice: '2d8', type: 'force' }` tokens.
- One-time gains (ability score increases, gold, languages, items) are not effects. Item properties
  stay on the item.
- The event that introduces an effect must reference it, so players meet it with that event.

## Stat blocks

- Every NPC and beast has a 5e stat block in `stats`; the schema rejects a record without one.
  Stat blocks are DM-only and stripped from the player site.
- Store base facts only: size, type, CR, AC, hit dice, speeds, scores, save and skill
  proficiencies, senses, defences, and abilities. Never store a derived number: proficiency
  bonus, HP, save and skill bonuses, passive Perception, to-hit bonuses, damage averages, and save
  DCs come from `src/lib/stat-block.ts`.
- Attacks use the structured `attack` field (ability, reach or range, damage dice and type).
  Ability `text` holds only what happens beyond the damage, as tokens: `{ ability: key }` for a
  sibling ability, `{ speed }`, `{ dc }`, `{ condition }`, and `{ action }`. Never name another
  ability, a DC, or a speed in plain prose.
- An ability that forces a saving throw uses the structured `save` field: the ability the targets
  save with, the ability its DC is built from, the target (an area shape and size from
  `refs.rules.cone`/`cube`/`line`/`sphere`/`emanation`, or a number of creatures in range),
  `onFail` damage and conditions, and `onSuccess` (`half` or `none`). `onFail.also` holds full
  sentences only for what the structure can't say, such as how long a condition lasts. Never write
  the save, the area, or the damage in prose; a data test rejects it.
- When two or more records are the same kind of creature (gang toughs, nobles, spies), put one stat
  block in `src/data/creatures/` and set `stats: refs.creatures.<key>` on each record. A creature
  with fewer than two users belongs inline on its record. A record that differs from the shared
  block gets its own.
- Prefer an SRD 5.2.1 creature (CC-BY-4.0) as the base. `source.adaptedFrom` lists its Open5e keys
  (`srd-2024_dire-wolf`), and `source.changes` says what differs. A creature that is not in the SRD
  is homebrew: leave `adaptedFrom` empty and describe the build in `changes`.
- Pitch new stat blocks at the party's current level and the creature's role in the story. Register
  each ability icon in `src/lib/ability-icons.tsx` and pick a catalog entry classified `useful`.

## What players see

- `notes` holds what the players know. It is shown on the public archive.
- `background` holds the DM-only truth about a record. NPC `motivations` are DM-only too. The
  player projection removes every field listed in `DM_FIELDS` (`src/lib/player-visibility.ts`);
  list any new DM-only field there.
- A membership the party has not discovered goes in `secretMemberships`, not `memberships`.
- Never write "Secret:" or "DM note:" prose into `notes`. Put the truth in `background` instead.
- When players discover part of a `background`, move that part into `notes` and record the
  discovery as an event. Move it; never keep both copies.
- Players see an event once a session lists it. An event outside every session is off-screen DM
  material that a plot owns.
- Players see an NPC, beast, item, organization, or location once a session event references it
  outside `background`. The DM can also mark a known landmark on a public map with
  `publicMapLandmark: true`. Player-facing content must only reference visible records.

## Adding or changing an entity

- Search all of `src/data/` before creating an entity. Names and derived slugs must be unique across
  every kind in `src/definitions/kind.ts`; never rely on a remembered kind count or inventory.
- Use a specific canonical name. The name derives the slug; the filename is the kebab-case slug and
  the registry key is its snake_case form.
- Add the file to its kind's `_index.ts`, then run `bun run generate:refs`. This is required after
  adding, removing, renaming, or re-keying any referenceable entity. Never edit
  `src/data/generated/refs.ts` by hand. Use the corresponding `refs.<kind-plural>.<key>` namespace
  everywhere else.
- Audit the change for copied facts, copied relationship lists, and bare names that should be
  references. For intentional quest synthesis, verify the canonical event/entity still owns the
  underlying fact.
- Events use sequential `n2-e###.ts` filenames and require `day`, `location`, `mark`, and `notes`.
- Register each new event and add its reference to the best-fitting session in the same change. The
  campaign chronology test enforces that every registered event appears exactly once.
- Record unresolved canon in `QUESTIONS.md` when the source material exposes a concrete unanswered
  fact or a missing answer blocks a correct model. Include the known context and session, plus why
  the answer matters when it drives a modeling decision. Do not add engineering work or unsupported
  speculation; remove resolved questions.
- Use the repo skill `$plan-campaign-entity` for entity creation, imports, renames, or ambiguous
  character/place/event references.
