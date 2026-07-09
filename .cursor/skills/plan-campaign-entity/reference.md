# Campaign entity inventory

Snapshot of `src/data/` for duplicate and naming review. Re-run `rg` before acting — this file may drift.

## Entity counts

| Kind      | Count | Index                          |
| --------- | ----- | ------------------------------ |
| Events    | 40    | `src/data/events/_index.ts`    |
| Locations | 17    | `src/data/locations/_index.ts` |
| NPCs      | 17    | `src/data/npcs/_index.ts`      |
| PCs       | 11    | `src/data/pcs/_index.ts`       |
| Quests    | 7     | `src/data/quests/_index.ts`    |
| Sessions  | 2     | `src/data/sessions/_index.ts`  |

## Slug collisions (same slug, different kinds)

`findEntityBySlug()` returns the first match in order: session → event → location → **npc** → pc → quest.

| Slug               | NPC                      | PC  | Notes                                        |
| ------------------ | ------------------------ | --- | -------------------------------------------- |
| `mr-peace`         | yes                      | yes | Guest PC, session 12. Should be **pc only**. |
| `orc-paladin`      | yes                      | yes | Pick one kind; clarify if party member.      |
| `human-elf-pirate` | yes (`Human-Elf Pirate`) | yes | Same name both sides.                        |
| `victor`           | yes                      | yes | Lumberjack from Badesh; type TBD in notes.   |

## Generic or weak names

### NPCs

| Current name       | Slug                 | Risk                          | Suggested direction                         |
| ------------------ | -------------------- | ----------------------------- | ------------------------------------------- |
| Bob                | `bob`                | **High** — common name        | Bob the gate troll                          |
| Light              | `light`              | Medium — also a quest subject | Third Marshal Light (matches event wording) |
| Victor             | `victor`             | High — PC/NPC duplicate       | Victor the Badesh lumberjack                |
| Abraham            | `abraham`            | Medium — common name          | Abraham (Victor's donkey)                   |
| Tavern Owner       | `tavern-owner`       | Medium — role not name        | Ask for character name                      |
| Orc Paladin        | `orc-paladin`        | Medium                        | Ask for character name                      |
| Mystery Girl       | `mystery-girl`       | Low until revealed            | Rename when identity known                  |
| Rare-Animal Dealer | `rare-animal-dealer` | Low                           | Acceptable until named                      |

### Locations

| Current name          | Slug                  | Risk             | Suggested direction        |
| --------------------- | --------------------- | ---------------- | -------------------------- |
| The Tavern            | `the-tavern`          | Medium — unnamed | Ask for tavern proper name |
| The Boat              | `the-boat`            | Medium           | Name the vessel or route   |
| Holy Site (mountains) | `holy-site-mountains` | Low              | OK with parenthetical      |
| The Trapdoor          | `the-trapdoor`        | Low              | OK if only one             |

### PCs

| Current name | Slug      | Risk   | Notes                                            |
| ------------ | --------- | ------ | ------------------------------------------------ |
| William      | `william` | High   | Also `William Greenhoove` — confirm relationship |
| Jim          | `jim`     | Medium | Common; consider surname if known                |
| Devan        | `devan`   | Low    |                                                  |

## Well-named examples (follow these)

- `Revin "klapper" Grumblefist` → `revin-klapper-grumblefist`
- `Cassian Veyl` → `cassian-veyl`
- `Dragon of the Mountain` / `Angel of the Mountain`
- `Fajanet Tunnels`, `Forest Near Badesh`
- Events: `Meet Bob the gate troll` (event name is descriptive even if NPC name is not)

## Open questions

See [QUESTIONS.md](../../../QUESTIONS.md) for the full backlog. Remove items there when resolved.

## Reference wiring pattern

Entities embed as imported objects in event `parts`, not bare strings:

```typescript
import npcs from '#/data/npcs/_index.ts'
import pcs from '#/data/pcs/_index.ts'
import locations from '#/data/locations/_index.ts'

parts: [
  'Prose...',
  pcs.jim,
  npcs.bob, // update key after rename
  locations.fajanet,
  '# Markdown notes...',
]
```

Markdown body links use slug paths: `[Bob](/npcs/bob)` — must stay in sync with renames.
