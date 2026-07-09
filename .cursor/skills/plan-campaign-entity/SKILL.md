---
name: plan-campaign-entity
description: >-
  Plans and validates campaign entities (NPC, PC, location, event, quest, session)
  before creation or reference. Searches for duplicates, disambiguates generic
  names, and confirms entity type. Use when adding or editing src/data entities,
  importing campaign notes, or when the user mentions a character, place, or
  event by name.
---

# Plan Campaign Entity

Before creating or linking any campaign entity, **stop and plan**. Do not create files or wire references until ambiguity is resolved.

## When this applies

- User asks to add an NPC, PC, location, event, quest, or session
- User mentions a name in session notes, events, or markdown content
- Importing or transcribing campaign material into `src/data/`
- User says "add", "create", "meet", "visit", "new character", etc.

## Step 1 — Search before you create

Search the existing data for the name (and close variants):

```bash
rg -i "bob|gate troll" src/data/
```

Also check all six registries in `src/lib/campaign.ts`:

| Kind       | Registry                       | Slug derived from   |
| ---------- | ------------------------------ | ------------------- |
| `pc`       | `src/data/pcs/_index.ts`       | `name` → kebab-case |
| `npc`      | `src/data/npcs/_index.ts`      | `name` → kebab-case |
| `location` | `src/data/locations/_index.ts` | `name` → kebab-case |
| `event`    | `src/data/events/_index.ts`    | `name` → kebab-case |
| `session`  | `src/data/sessions/_index.ts`  | `name` → kebab-case |
| `quest`    | `src/data/quests/_index.ts`    | `name` → kebab-case |

**Slugs are global.** `findEntityBySlug()` searches `session → event → location → npc → pc → quest`. Two entities with the same slug will collide — the earlier kind wins.

## Step 2 — Ask questions (use AskQuestion when available)

When a name appears, ask until you know:

1. **Is this new or existing?** Show close matches from search.
2. **What entity type?** PC, NPC, location, event, quest, or session — never guess.
3. **Is the name specific enough?** Generic names need disambiguation (see naming rules).
4. **If PC vs NPC is unclear:** Does a player control them? One-shot guest or recurring?

### Record open questions in QUESTIONS.md

When you have questions about **what happened**, **when**, **who**, or **missing details** — write them to [`QUESTIONS.md`](../../../QUESTIONS.md) at the project root.

- **Add** a question when ambiguity blocks entity creation, dating, or wiring.
- **Remove** a question when the author answers it or new data resolves it.
- **Update** entity files with canon when answers arrive; then prune `QUESTIONS.md`.
- Do not let questions live only in chat — `QUESTIONS.md` is the shared backlog.

**Every question must be specific.** Include what we already know — many questions go unanswered for sessions. The author needs enough context to answer later without re-reading the whole codebase.

Required fields per question:

| Field          | Purpose                                                         |
| -------------- | --------------------------------------------------------------- |
| **Question**   | Clear, specific ask                                             |
| **Context**    | Known facts: who, where, session number, linked entities/events |
| **Why asking** | What decision or file this unblocks                             |
| **Session**    | Play session number when known                                  |

```markdown
- **What is The Tavern's proper name?**
  - _Context:_ Fajanet tavern, session 1 night 1. William's detour; tentacles grabbed Revin upstairs; owner boards windows (routine). Links: [the-tavern](/locations/the-tavern), n2-e005–e008.
  - _Why asking:_ Slug `the-tavern` will collide if another tavern is added.
  - _Session:_ 1 — name not yet revealed in play.
```

Vague questions like "What is the tavern's name?" are **not allowed** — always attach context.

### PC vs NPC decision

| Signal                                            | Entity                                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| Has a player, character sheet, party membership   | `pc`                                                                              |
| World character, monster, shopkeeper, quest-giver | `npc`                                                                             |
| Guest player for one session                      | `pc` with `status: 'occasional'` or `'retired'` — **not** a duplicate `npc` entry |
| Unclear (e.g. Victor the lumberjack)              | **Ask** before creating either                                                    |

**Never file the same person in both `pcs/` and `npcs/`.** Pick one canonical kind.

### Questions to ask for ambiguous references

- "When you say **Bob**, do you mean the **gate troll in Fajanet** we already have, or someone new?"
- "Is **Victor** a player character or an NPC the party met?"
- "Is **The Tavern** a named establishment (needs a proper name) or the generic location we already have?"
- "Should **Abraham** be his own NPC (donkey) or stay noted under Victor?"

## Step 3 — Naming rules

Entity `name` drives the slug (`src/definitions/slug.ts`). Choose names that survive a long campaign.

### Avoid generic bare names

These collide easily and search poorly:

- Single common first names: Bob, Jim, Victor, William, Light
- Role-only labels: Tavern Owner, Orc Paladin, Mystery Girl
- Unnamed places: The Tavern, The Boat, Holy Site

### Prefer disambiguated names

Include **role**, **location**, or **epithet** in the canonical `name`:

| Weak         | Strong                                                |
| ------------ | ----------------------------------------------------- |
| Bob          | Bob the gate troll                                    |
| The Tavern   | The Rusty Anchor (TBD — ask user)                     |
| Victor       | Victor the Badesh lumberjack                          |
| Tavern Owner | [Name] — owner of The Rusty Anchor                    |
| Orc Paladin  | [Character name] — or keep role only if truly unnamed |

Display name can stay short in prose; **canonical `name` must be unique and specific**.

### File naming

- File: `src/data/{kind}/{slug-from-name}.ts` (e.g. `bob-the-gate-troll.ts`)
- Export key in `_index.ts`: snake_case of slug
- Events: `n2-e###.ts` sequential IDs; `name` is human-readable

## Step 4 — Plan the entity

Before writing code, state the plan:

```
Entity plan:
- Kind: npc
- Canonical name: Bob the gate troll
- Slug: bob-the-gate-troll
- File: src/data/npcs/bob-the-gate-troll.ts
- Location: locations.fajanet
- References: n2-e004 (update npcs.bob → npcs.bob_the_gate_troll)
- Collisions: none (retire slug "bob" if renaming)
```

Get user confirmation when:

- Renaming an existing entity (touches reverse links)
- Slug collision with another kind
- PC/NPC classification is uncertain
- Proper name is unknown (mark TBD in summary, not in `name`)

## Step 5 — Create and wire

Follow existing patterns:

```typescript
// NPC — src/data/npcs/example.ts
import locations from '#/data/locations/_index.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Specific Canonical Name',
  avatar: '/assets/npcs/specific-canonical-name.png',
  location: locations.fajanet,
  role: '...',
  species: '...',
  summary: '...',
  notes: '# ...',
})
```

Reference entities by import, not string:

```typescript
import npcs from '#/data/npcs/_index.ts'
// in event parts:
npcs.bob_the_gate_troll,
```

Register in the kind's `_index.ts`. Update every file that referenced the old export key or slug.

## Event timeline marks

Every event needs an explicit `mark` field for the `/events` storyline timeline (`src/definitions/event.ts`).

```typescript
mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
// or
mark: { type: 'icon', name: 'gi/GiSailboat' }, // react-icons id — see src/lib/event-icons.tsx
```

### Mark selection rules (encode in data)

Count unique `pcs.*` and `npcs.*` references in the event `parts` array only (not markdown prose):

| Condition                                        | `mark`                                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Exactly **one** PC in parts (any number of NPCs) | That PC's `avatar`                                                                                |
| Exactly **one** NPC in parts and **zero** PCs    | That NPC's `avatar`                                                                               |
| Otherwise                                        | Thematic **icon** from [react-icons](https://react-icons.github.io/react-icons/) (`set/IconName`) |

Add new icons to `src/lib/event-icons.tsx` before using them in data.

**Day starts** on the timeline use a fixed morning-sun icon (`tb/TbSunrise` via `DAY_MARK_ICON`) — not stored per event.

**Hover:** Event marks show the event `name` in a popover; day marks show `New day · {date}`.

### Example

```typescript
export default createEvent({
  name: 'Jim speaks with Light 1:1',
  // ...
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' }, // single PC in parts
  parts: ['...', pcs.jim, npcs.third_marshal_light],
})
```

When importing events (`scripts/import-campaign.ts`), set `mark` / `mark_type` / `mark_url` in frontmatter, or apply the rules above from `pcs` / `npcs` lists.

## Open questions backlog

Review [QUESTIONS.md](../../../QUESTIONS.md) for unresolved what/when/who questions.  
Review [reference.md](reference.md) for the entity inventory.

When importing session notes: scan for new answers → update entity files → **remove** resolved lines from `QUESTIONS.md`.

## Rename checklist

When renaming an entity:

- [ ] Update `name` (slug changes automatically)
- [ ] Rename data file and `_index.ts` export key
- [ ] `rg` for old slug, old export key, and display name across `src/data/`
- [ ] Update markdown links like `/npcs/bob` → `/npcs/bob-the-gate-troll`
- [ ] Verify in browser: entity page loads, reverse links intact
