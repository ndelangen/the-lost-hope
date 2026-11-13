# Encounter trackers and monster sources

The Lost Hope can import a versioned SRD stat block into a campaign record during prep. During play,
the DM tracker can use that saved record and store damage and remaining uses per combatant in
`localStorage`. I would use an existing tracker at the table for comparison and build the small
integrated tracker around the campaign's own records.

## Open-source trackers

| Project                                                                       | What to try or borrow                                                                                                                                                                                                         | Fit                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [D&D Battle Tracker](https://github.com/Paul-Ladyman/dnd-battle-tracker)      | Offline React app with HP controls and [save and resume tests](https://github.com/Paul-Ladyman/dnd-battle-tracker/blob/master/test-integration/auto-save-load.test.js) for browser storage.                                   | MIT. The closest code reference for persistence. Try it standalone to see how much setup a fight takes.                                                                                                                     |
| [Improved Initiative](https://github.com/cynicaloptimist/improved-initiative) | Its [combatant model](https://github.com/cynicaloptimist/improved-initiative/blob/development/client/Combatant/Combatant.ts) separates an encounter participant's identity and current HP from its reusable character record. | MIT for the app. A candidate for selective code reuse after checking the dependencies. Its bundled game content has separate terms.                                                                                         |
| [OpenFray](https://github.com/OpenFrayApp/console)                            | Shows the current combatant's stat block beside the roster and tracks reactions, legendary actions, and ability recharge. [Turn workflow](https://openfray.app/docs/guides/encounters/)                                       | AGPL-3.0. The best interface reference for limited abilities. Anonymous encounters use `sessionStorage`, so test it as a separate app and use its interface as inspiration. [Storage policy](https://openfray.app/privacy/) |

## Monster data

- **5e Bits SRD API** is the first source I would try. It exposes separate 2014 and 2024 routes.
  I fetched both Owlbear records and both Adult Red Dragon records. All four returned HTTP 200.
  The Owlbear's AC is 13 in both responses, with different JSON shapes. Both dragon records
  express Fire Breath recharge with a die and a threshold. Use an adapter for each version.
  [API docs](https://docs.dnd5eapi.co/2024/introduction) ·
  [2014 Owlbear](https://www.dnd5eapi.co/api/2014/monsters/owlbear) ·
  [2024 Adult Red Dragon](https://www.dnd5eapi.co/api/2024/monsters/adult-red-dragon)
- **Open5e** is worth a second look for third-party creatures. Its v2 creature API identifies the
  source document for each result and can filter by document. Choose sources deliberately and
  check each document's terms before importing its content. My test requests returned HTTP 403
  from this environment, so I verified the documented filter only.
  [Open5e API docs](https://open5e.com/api-docs/)
- **Wizards' SRDs** are the authority for the licensed game text. SRD 5.1 and 5.2.1 are available
  under CC BY 4.0 with attribution. They cover a subset of the official catalog. Save the source
  document, version, entry ID, and attribution with an import. Review artwork rights separately.
  [Wizards' SRD page](https://www.dndbeyond.com/srd) ·
  [Creator FAQ](https://www.dndbeyond.com/creator-faq)

## First import to try

Have Codex fetch one SRD entry during prep and propose a normalized stat block on the NPC or beast
record. Review the source and any campaign changes before saving. Keep the saved values available
without an internet connection at the table. Start with the fields the DM will read or change,
including AC, maximum HP, action descriptions, and explicit use or recharge rules where present.

For a local test, add two combatants from the same saved dragon stat block. Apply damage and mark
Fire Breath used on one, then reload and check that the other retains its starting state. Confirm
that the source record stays intact. The campaign README identifies the game as homebrew D&D 5e.
The DM later chose 2024 by default, with 2014 available on request. [Import decision](https://github.com/ndelangen/the-lost-hope/issues/167#issuecomment-6857117053)
