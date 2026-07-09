# Campaign questions

Open questions for the author. Also used by the agent when editing data.

**Maintenance:** Remove a line when answered. Add new lines with full context (see format below). Record canon in `src/data/` when answered.

**Play sessions:** Sessions **1–6** documented so far; more material coming.

---

## How to write a question

Every question must include **what we already know** — many sit unanswered across sessions.

```markdown
- **What did the tentacles want?**
  - _Context:_ Session 1, The Nest. Voices compelled Revin; tentacles tried to drag him out; party saved him; evil laughter; PCs slept. Light had no clue when asked. Festival nights later seemed safe.
  - _Why asking:_ Tentacle Night quest still open.
  - _Session:_ 1
```

---

## Naming and entities

- **Mr. Peace — real name, species, class, player?**
  - _Context:_ Session 4 guest PC, one day only, guild/Light arrangement. Flower magic; goblin incident. Not missing.
  - _Session:_ 4

- **Should the NPC be renamed off "Third Marshal Light"?**
  - _Context:_ Author confirmed Light's rank is **13th Marshal**; "Third Marshal" was an artifact of modeling Fajanet and the Citadel of Reve as two places (now merged — [Fajanet](/locations/fajanet), alias "Citadel of Reve"). The NPC's canonical `name` is still "Third Marshal Light" (slug `third-marshal-light`, key `third_marshal_light`), referenced in ~15 files.
  - _Why asking:_ A rename (e.g. to "13th Marshal Light" or just "Light") touches the file, `_index.ts`, `registry-keys.ts`, and every `refs.npcs.third_marshal_light`. Left as-is for now to avoid an unrequested wide refactor.

- **Is "Reve" a deliberate clue (French for "dream")?**
  - _Context:_ "Citadel of Reve" is an alias of [Fajanet](/locations/fajanet), Light's seat of authority. Possible authorial wordplay.
  - _Session:_ Pre-campaign

- **Eyeless Hand organization — file as entity?**
  - _Context:_ Samantha at The Nest trades illegal/semi-illegal drugs for them. William sought The Nest session 1.
  - _Why asking:_ Recurring org may need index entry if it grows.

---

## Session 1

- **What did the tentacles want?**
  - _Context:_ The Nest night 1. Resolved: party saved Revin, closed window, laughter, PCs slept. Light clueless. Festival later suppressed incidents.
  - _Session:_ 1

- **What favor did Revin ask at the guild tattoo ritual?**
  - _Context:_ Jim: left alone by past (unfulfilled). William: tramp stamp. Revin: **something was requested — author forgot**.
  - _Session:_ 1 ([n2-e011](/events/the-guild-tattoo-ritual))

---

## Session 2 — Rare-animal quest

- **What is the third missing animal?**
  - _Context:_ Dealer missing 3; party returned phoenix + displacer beast. Third was **mentioned when quest accepted** — author does not remember.
  - _Session:_ 2 ([n2-e012](/events/bulletin-board-pick-a-quest), [n2-e019](/events/return-to-the-guildhall-with-2-of-3-animals))

- **Rare-animal dealer — personal name and quest details at pick-up?**
  - _Context:_ Bulletin board job; 2 of 3 animals recovered.
  - _Session:_ 2

---

## Session 3

- **Who sent Jim's final-warning letter?**
  - _Context:_ Slipped into Jim's hand/pocket; deliverer unknown; **only Jim saw it**. "Meet us at the green light near the mountain tonight." Jim spoke with Light instead.
  - _Linked:_ [Green Light](/locations/the-green-light), Jim's pursuers
  - _Session:_ 3

- **What is "the green light"?**
  - _Context:_ Named in Jim's warning letter ("the green light near the mountain"). [Location filed](/locations/the-green-light), but its nature is unknown — signal fire, magical beacon, person, or place.
  - _Session:_ 3

---

## Session 5 — Mountain journey

- **Cliff sign — what did it say?** (Author does not remember.) ([n2-e030](/events/reach-a-cliff-with-a-sign))
- **Holy site — whose faith, deity, form?** ([n2-e031](/events/pass-through-a-holy-site-into-the-mountains))
- **Shadow realm chase — same as session 1 tentacles?**
  - _Context:_ Phoenix feather **bright light** guided party; official **shadow monster** shown as failed-chase consequence; feather **burned up and dissolved**.
  - _Session:_ 5 ([n2-e029](/events/lost-in-the-shadow-realm))
- **Do the Fajanet tunnels connect to the shadow realm?**
  - _Context:_ Both reached via a trapdoor — the [tunnels](/locations/fajanet-tunnels) (session 2) and the [shadow realm](/locations/shadow-realm) (session 5). Open thread on whether they are the same underground space.
  - _Session:_ 5
- **Puzzle room — what 5 elements? How solved?** ([n2-e032](/events/puzzle-room-with-5-elements-chasing-each-other))
- **Angel and dragon — names? Exact dragon-child count?** (Possibly hundreds.) ([n2-e033](/events/meet-the-angel-and-the-dragon-husband-and-wife))
- **Zone of truth — what did Devan and Swift Starblade say?** William/Revin were present but William left, Revin's player left. ([n2-e034](/events/zone-of-truth-each-pc-questioned))
- **Why did the angel burn Jim's letter of passage?** ([n2-e034](/events/zone-of-truth-each-pc-questioned))

---

## Session 6 — Dinos

- **Dino raid — what kind? Who riding? Why Fairhaven?**
  - _Context:_ Large group ridden toward Fairhaven; DM called it a **raid**; party **assumed hostility**. Small group later chased party; Abraham's cart escape.
  - _Session:_ 6 ([n2-e038](/events/dinos-ridden-toward-fairhaven))

- **Revin — what actually happened?**
  - _Context:_ Presumed eaten by dragon children after flight. **Player left the group.** DM may provide closure later. Swift returned separately.
  - _Session:_ 6+

---

## Characters — still open

| Who                     | Question                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Jim**                 | Sorcerer bloodline. Real name/face. Pursuers vs. Green Light letter. Will Light fulfill "left alone by past"? |
| **Revin**               | Monk subclass. Guild favor (forgotten). DM closure after player left.                                         |
| **Cassian Veyl**        | Personality, appearance, secrets.                                                                             |
| **Swift Starblade**     | Rhys Greenleaf rename — when/why? Where did he fly when he returned?                                          |
| **Devan**               | Paladin subclass/oath. Zone of truth answer.                                                                  |
| **Third Marshal Light** | Species. Why these PCs. Favor costs. Angel/dragon tie. Dino migration.                                        |
| **Angel / Dragon**      | Names, ranks, zone-of-truth purpose.                                                                          |
| **Phoenix**             | Jim wants to return to phoenix left at dealer.                                                                |
| **Victor**              | Player name; sheet details from D&D Beyond.                                                                   |

---

## Quests (open)

- **The Tentacle Night** — what did tentacles want? (Rest of night 1 resolved.)
- **Jim's Warning Letter** — sender identity.
- **Help the Rare-Animal Dealer** — third animal.
- **Through the Shadow Realm** — relation to tentacle night.
- **The Dinosaur Migration** — riders, species, destination motive.

---

## Data housekeeping

- Fix broken `.md` suffix links in markdown bodies.
