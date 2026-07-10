# Product goals

## Purpose

The Lost Hope is a player-first campaign memory and lore companion. It helps someone reconstruct
what happened, understand how the campaign's people, places, organizations, events, and mysteries
connect, and enjoy collecting the world's lore even when their notes or memory are incomplete.

The north-star questions are:

- What happened, and in what order?
- Where is the party now, and how did it get there?
- Who and what matters to the current story?
- What does the party know, suspect, or still not understand?
- What did a player miss or forget from an earlier session?

## Audience and scope

- The primary author is currently a player taking and reconciling notes.
- The intended future audience includes the other players and the DM.
- This is a retrospective memory and exploration tool, not a campaign-planning tool.
- DM preparation may be added later, but it should be a separate perspective rather than changing
  the player-facing history into a planning system.
- Shared hosting will eventually need to distinguish party knowledge, private character knowledge,
  and DM-only information. Information that an audience must not know cannot merely be hidden in
  the UI; it must not be delivered to that audience.

## Knowledge-model principles

### Reference first; do not duplicate canon

Every fact has one canonical owner. Other records point to that owner with typed `refs.*` tokens,
and the UI derives inverse relationships, labels, lists, and summaries whenever possible.

- Store identity and structured facts on the entity they describe.
- Store what happened on the event where it happened.
- Store a session's real-world date and ordered event references on the session.
- Store a place's identity, hierarchy, and geography on the location.
- Store organization membership on the member and derive the organization's member list.
- Link to existing entities and events instead of repeating their names or retelling their facts.
- When canon changes, update its owner; references and derived views should carry the change.

### Quests are the soft exception

A quest is a synthesis of a story thread, so its clues and conclusion may intentionally restate a
small amount of information to remain understandable as a narrative summary. That repetition is a
view of canon, not a second source of truth.

- Prefer references to the relevant events and entities inside each clue.
- Keep repeated wording short and focused on why the fact matters to the quest.
- Do not copy whole event accounts or maintain parallel quest-only versions of entity facts.
- If a quest summary conflicts with its referenced event or entity, the event or entity wins and
  the quest must be updated.

### Preserve uncertainty and perspective

Established canon, player recollection, inference, and unanswered questions are different kinds of
knowledge. Do not turn uncertainty into fact merely to make the archive look complete. As sharing
evolves, also preserve who knows a fact: the whole party, a particular character/player, or only
the DM.

## Two clocks

- A session uses a full real-world date: when the group played.
- An event uses an integer campaign day: when it happened in the fiction.
- Event order records chronology within a campaign day; do not invent precise in-world times when
  the notes do not provide them.
- A session may span several campaign days, and a campaign day may eventually span sessions.

`Event.day` is a positive, one-based integer. Campaign Day 1 is the first recorded day in the
fiction; skipped integers are valid when no event was recorded on those days. Sessions retain full
real-world dates and must never be used to infer fictional chronology.

## Change policy

This is a private, pre-release codebase used only by its authors. When the correct model is known,
move the whole repository directly to that model even when the refactor is disruptive.

- Do not preserve obsolete representations through backward compatibility, gradual migrations,
  compatibility aliases, redirects, adapters, shims, or parallel old/new shapes. This does not
  prohibit domain adapters, error handling, or operational fallbacks that belong to the final
  design.
- Change schemas, coded campaign data, reference resolution, derived views, UI, and tests in one
  atomic refactor.
- The campaign data is source code, so “migration” means editing all of that coded data to the final
  shape and deleting the obsolete shape.
