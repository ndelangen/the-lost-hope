# Campaign questions

Open questions for the author. Also used by the agent when editing data.

**Maintenance:** Remove a line when answered. Add new questions with the known context and session;
include why the answer matters when it blocks a modeling or naming decision. Record confirmed canon
in `src/data/` when answered. Do not use this file as an engineering backlog.

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
  - _Context:_ Session 3 guest PC for one day by design, through a guild/Light arrangement. Flower magic; goblin incident.
  - _Session:_ 3

- **Should the NPC be renamed off "Third Marshal Light"?**
  - _Context:_ Author confirmed Light's rank is **13th Marshal**; "Third Marshal" was an artifact of modeling Fajanet and the Citadel of Reve as two places (now merged — [Fajanet](/locations/fajanet), alias "Citadel of Reve"). The NPC's canonical `name` is still "Third Marshal Light" (slug `third-marshal-light`, key `third_marshal_light`) and is widely referenced.
  - _Why asking:_ A rename (e.g. to "13th Marshal Light" or just "Light") touches the file, `_index.ts`, generated refs, and every `refs.npcs.third_marshal_light`. Left as-is for now to avoid an unrequested wide refactor.

- **Is "Reve" a deliberate clue (French for "dream")?**
  - _Context:_ "Citadel of Reve" is an alias of [Fajanet](/locations/fajanet), Light's seat of authority. Possible authorial wordplay.
  - _Session:_ Pre-campaign

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

- **Who sent Jim's final-warning letter?**
  - _Context:_ Slipped into Jim's hand/pocket that evening; deliverer unknown; **only Jim saw it**. "Meet us at the green light near the mountain tonight." Jim spoke with Light instead.
  - _Linked:_ [Green Light](/locations/the-green-light), Jim's pursuers
  - _Session:_ 2 ([n2-e020](/events/jim-receives-a-final-warning-letter))

- **What is "the green light"?**
  - _Context:_ Named in Jim's warning letter ("the green light near the mountain"). [Location filed](/locations/the-green-light), but its nature is unknown — signal fire, magical beacon, person, or place.
  - _Session:_ 2

---

## Session 4 — Mountain journey

- **Cliff sign — what did it say?**
  - _Context:_ The party reached a cliff with a sign; the author does not remember its wording.
  - _Session:_ 4 ([n2-e030](/events/reach-a-cliff-with-a-sign))

- **Puzzle room — what were the five elements, and how was the puzzle solved?**
  - _Context:_ Five elements chased one another in the room. The party solved the puzzle, but the elements and method were not recorded.
  - _Session:_ 4 ([n2-e032](/events/puzzle-room-with-5-elements-chasing-each-other))

- **Angel and dragon — names and exact dragon-child count?**
  - _Context:_ The married angel and dragon had many dragon children; one recollection suggests there may have been hundreds, but no exact count is canon.
  - _Session:_ 4 ([n2-e033](/events/meet-the-angel-and-the-dragon-husband-and-wife))

- **Zone of truth — what did Devan and Swift Starblade say?**
  - _Context:_ Each PC was questioned individually. William and Revin were also present, but only Jim's exchange is recorded; William later left, and Revin's player left the group.
  - _Session:_ 4 ([n2-e034](/events/zone-of-truth-each-pc-questioned))

- **Why did the angel burn Jim's letter of passage?**
  - _Context:_ Jim presented the letter from Light during his zone-of-truth questioning; the angel burned it without a recorded explanation.
  - _Session:_ 4 ([n2-e034](/events/zone-of-truth-each-pc-questioned))

---

## Session 5 — Dinos

- **Dino raid — what kind? Who riding? Why Fairhaven?**
  - _Context:_ Large group ridden toward Fairhaven; DM called it a **raid**; party **assumed hostility**. Small group later chased party; Abraham's cart escape.
  - _Session:_ 5 ([n2-e038](/events/dinos-ridden-toward-fairhaven))

- **Revin — what actually happened?**
  - _Context:_ Presumed eaten by dragon children after flight. **Player left the group.** DM may provide closure later. Swift returned separately.
  - _Session:_ 5+

---

## Session 6 — Fairhaven

- **What papers does Fairhaven require, and why did the guild tattoos satisfy the guards?**
  - _Context:_ Party arrived by boat from Badesh; gate guards demanded papers; the party had none but their [Adventurers' Guild](/organizations/adventurers-guild) tattoos were accepted. Whether the guild is recognized/authoritative in Fairhaven, or the guards simply deferred to the marks, is unstated.
  - _Session:_ 6 ([n2-e042](/events/guild-tattoos-pass-for-papers-at-the-gate))

- **Do Devan (and Victor) carry guild tattoos?**
  - _Context:_ Only Jim and William are recorded getting the [guild tattoo ritual](/events/the-guild-tattoo-ritual) (session 1). Devan and Swift joined in session 4; Victor is a Badesh local. "Our tattoos were enough" at the Fairhaven gate — unclear whose marks were checked.
  - _Session:_ 6

- **Did Victor and Abraham continue to Fairhaven, and did Swift rejoin?**
  - _Context:_ Party at Fairhaven modeled as [Jim](/pcs/jim), [William](/pcs/william-greenhoove), [Devan](/pcs/devan), and [Victor](/pcs/victor-the-badesh-lumberjack) (with [Abraham](/npcs/abraham)). Swift flew off separately in session 4 and "returned in a later session" — whether that was session 6 is unstated.
  - _Session:_ 6

- **How long is the Badesh → Fairhaven voyage?**
  - _Context:_ Modeled as an overnight trip (board Aug 19, arrive Aug 20). Actual duration not stated.
  - _Session:_ 6

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
- **Mountain Holy Site** — whose faith, deity, form?
- **Fajanet Tunnels and Shadow Realm** — same underground network?
- **Through the Shadow Realm** — relation to tentacle night.
- **The Dinosaur Migration** — riders, species, destination motive.
