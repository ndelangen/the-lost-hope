---
name: plan-campaign-entity
description: >-
  Plan or implement structured campaign-canon changes under src/data without duplicate canon, slug
  collisions, dangling refs, or misplaced facts. Use for creating, editing, importing, or renaming
  beasts, PCs, NPCs, locations, events, sessions, quests, or organizations, including importing a
  played session from a transcript or AI notes and linking it to DM arcs and plots. Do not use for read-only
  lore questions or engineering changes outside campaign data.
---

# Plan Campaign Entity

Follow `src/data/AGENTS.md`; it owns data-modeling policy. Treat current schemas, registries, and
nearby entities as authoritative. Read `docs/product-goals.md` only when the change affects audience,
knowledge perspective, chronology, or the boundary between canon and quest synthesis.

## 1. Select mode and scope

- **Plan/review mode:** Inspect and report only when asked to plan, review, assess, or diagnose.
- **Change mode:** Edit only when the user requests a change. Implement the smallest coherent entity
  slice, including every reference, registry, consumer, and test required by that change.

Start from the requested entities and inspect their schema, kind registry, generated reference
namespace, relevant references, callers, and tests. Report adjacent canon or modeling issues
separately; do not change them without authorization.

## 2. Establish source of truth

For every proposed fact or relationship:

1. Name its canonical owner: structured entity field, event, session, location, quest synthesis, or
   `QUESTIONS.md`.
2. Search for an existing version before adding it.
3. Link the owner with `refs.*` instead of copying the fact, name, or inverse relationship.
4. Prefer a derived view such as reverse links over another stored list.

Treat quests as a soft exception: a clue or conclusion may repeat minimal context for narrative
clarity, but it must reference the relevant entities/events and never outrank them as canon.

## 3. Discover before creating

Search names, aliases, roles, and close variants across `src/data/`:

```bash
rg -i "name|alias|role" src/data
```

Inspect the relevant schema in `src/definitions/`, the kind's `_index.ts`, the generated namespace
in `src/data/generated/refs.ts`, and two nearby entity examples. Check every kind in
`src/definitions/kind.ts` because slugs are global.

Ask only when the request and repository search leave a material decision unresolved:

- PC versus NPC versus beast classification is uncertain.
- A proposed name or slug collides with an existing entity.
- The canonical name or requested rename target is ambiguous.
- Correct modeling depends on canon that is genuinely unknown.

A requested rename already authorizes its expected URL and reference updates; include them in the
plan rather than asking again. In change mode, record a concrete unresolved canon question in
`QUESTIONS.md` when the source material exposes it or it blocks correct modeling. Do not invent an
answer.

## 4. State the entity plan

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

In change mode, state this plan as a concise progress update before editing. Request user input only
for an unresolved decision that materially changes the model.

## 5. Implement the canonical shape

- Create `src/data/<kind-plural>/<slug>.ts` with the kind's `create` helper.
- Express prose as `Content` paragraphs (`[[...], [...]]`) and relationships as tokens from
  `#/data/generated/refs.ts`.
- Do not store inverse relationship lists, repeated labels, or retellings that the application can
  derive from canonical entities and references.
- Register the entity in its `_index.ts`, then run `bun run generate:refs`. Always regenerate after
  adding, removing, renaming, or re-keying a referenceable entity; never edit the generated file.
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

## 6. Import a played session

After play, the DM hands over a recording transcript or AI notes. Turn them into a session, its
ordered events, and links into the DM prep. Follow sections 2 to 5 for every record you touch.

1. **Read the prep first.** Run `bun run dm:brief`. It lists every open arc with its open plots,
   hooks, scenes and NPC motivations, the scenes the DM selected or pinned, and the ref to write for
   each. Read the full `src/data/arcs/<slug>.ts`, scene and NPC files for any thread the notes touch.
2. **Let the notes decide what happened.** Prep only helps you recognise a thread. Never record a
   prepared scene, outcome or hook as an event unless the source says it happened. When play went
   somewhere prep did not expect, record what happened; do not bend it toward the prep. Keep the
   source's uncertainty: say "seems", "claims" or "may" where the notes do, and add a
   `QUESTIONS.md` entry when an open fact matters.
3. **Create the session and its events** as section 5 describes: next `n2-e###` ids, campaign
   `day`, ordered references in the session, `mark`, and refs for every named record. New NPCs,
   places and items follow sections 3 to 5.
4. **Keep player-facing and DM-only apart.** Events listed in a session are public, so their
   `notes` hold only what happened at the table. What the DM revealed only to themselves, or what
   happens off-screen, goes into the owning record's `background` or the plot's `notes`. A
   discovery moves its paragraph from `background` into `notes` and is recorded as an event.
5. **Link events to plots.** Add each new event to the `events` of every plot it advanced, in
   play order. One event can advance plots in several arcs; reference it from each. Leave
   `status` alone: the DM closes plots.
6. **Update the DM notes on the plot.** Rewrite the plot's `notes` (and `hook` if the next step
   changed) to say what changed, what was revealed and what is still open. Replace stale
   statements instead of appending a diary; the events already hold the history.
7. **Handle new threads.** When play opened a thread no plot covers, add an open plot to the arc
   it belongs to. Propose a new arc (with a unique `icon`, see `src/lib/arc-icons.tsx`) instead of
   creating it when no arc fits, and let the DM decide.
8. **Keep unused prep.** Do not delete or rewrite scenes, plots or hooks that were not played.
   Update `src/data/dm/table.ts` only when the DM asks.
9. **Report back** to the DM in a few lines: the plots each event advanced, plots that look ready
   to close, prep that went unused, new threads or proposed arcs, and open questions.

## 7. Validate

- In plan/review mode, run only the non-mutating checks needed to support the result and state that
  no implementation validation was required.
- In change mode, run focused tests while iterating, then `bun run verify`. If UI behavior changed,
  exercise the affected flow in a browser and check the console after automated verification.

Before handoff, re-read the diff for dangling refs, registry drift, slug collisions, duplicated
facts, and relationships that should be references. Report the entity slice changed, checks run, and
adjacent findings deliberately left outside scope.
