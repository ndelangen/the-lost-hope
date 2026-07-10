---
name: plan-campaign-entity
description: >-
  Plan, create, edit, import, or rename campaign entities while preventing duplicate names,
  duplicated canon, cross-kind slug collisions, dangling refs, and misplaced facts. Use for changes
  under src/data, campaign-note imports, or user requests involving a beast, PC, NPC, location,
  event, session, quest, or organization.
---

# Plan Campaign Entity

Follow `src/data/AGENTS.md`; it is the canonical data-modeling policy. Treat the current schemas,
registries, and nearby entities as authoritative instead of relying on remembered inventory counts.
Read `docs/product-goals.md` when a change affects audience, knowledge perspective, chronology, or
the boundary between canonical facts and quest synthesis.

This private pre-release codebase always moves directly to the correct final model. When a schema
or convention changes, update every coded entity, reference, derivation, UI consumer, and test in
the same change. Never add a gradual migration, dual representation, compatibility layer, alias, or
fallback for the obsolete shape.

## 1. Establish source of truth

For every proposed fact or relationship:

1. Name its canonical owner: structured entity field, event, session, location, quest synthesis, or
   `QUESTIONS.md`.
2. Search for an existing version before adding it.
3. Link the owner with `refs.*` instead of copying the fact, name, or inverse relationship.
4. Prefer a derived view such as reverse links over another stored list.

Treat quests as a soft exception: a clue or conclusion may repeat minimal context for narrative
clarity, but it must reference the relevant entities/events and never outrank them as canon.

## 2. Discover before creating

Search names, aliases, roles, and close variants across `src/data/`:

```bash
rg -i "name|alias|role" src/data
```

Inspect the relevant schema in `src/definitions/`, the kind's `_index.ts`,
`src/data/registry-keys.ts`, and two nearby entity examples. Check all entity kinds because slugs
are global.

Clarify before editing when any of these would change the model materially:

- PC versus NPC versus beast classification is uncertain.
- A proposed name or slug collides with an existing entity.
- A rename changes URLs and reverse links.
- The request depends on canon that is genuinely unknown.

When missing canon blocks the work, add a specific entry to `QUESTIONS.md` with context, why it
matters, and the session number when known. Do not invent an answer.

## 3. State the entity plan

Before writing, state:

```text
Entity plan:
- Kind:
- Canonical name and derived slug:
- File and registry key:
- Structured fields:
- Canonical owner for each new fact:
- References to add or update:
- Intentional quest synthesis, if any:
- Collision/search result:
```

Get user confirmation only for unresolved classification, collision, canon, or renaming decisions.

## 4. Implement the canonical shape

- Create `src/data/<kind-plural>/<slug>.ts` with the kind's `create` helper.
- Express prose as `Content` paragraphs (`[[...], [...]]`) and relationships as tokens from
  `#/data/refs.ts`.
- Do not store inverse relationship lists, repeated labels, or retellings that the application can
  derive from canonical entities and references.
- Register the entity in its `_index.ts` and add its key to the correct list in
  `src/data/registry-keys.ts`.
- Update `src/data/index.ts` when campaign quest/session ordering changes.
- Update every old key, slug, and display-name occurrence during a rename; do not add aliases or
  compatibility shims for old code or URLs.

For events, use the next sequential `n2-e###` ID and a positive integer `day`; sessions alone retain
full real-world dates. Session event-reference order records event order within a day. Choose `mark`
from references in `notes`:

- Exactly one PC: use that PC's avatar.
- Exactly one NPC and no PCs: use that NPC's avatar.
- Otherwise: use a thematic icon already supported by `src/lib/event-icons.tsx`, or add the icon
  there in the same change.

## 5. Validate

Run `bun run verify`. If the change affects UI behavior, also run the app, exercise the affected
flow in a browser, and check the console. Fix dangling refs, registry drift, slug collisions, type
errors, formatting, tests, and build failures before finishing. Re-read the diff for duplicate facts
and relationships that should be references; allow repetition only for deliberate quest synthesis.
