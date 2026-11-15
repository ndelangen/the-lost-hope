import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The clogged ferry landing',
  location: refs.locations.skynet,
  npcs: [refs.npcs.maren_of_fairhaven, refs.npcs.sergeant_bruna_kell, refs.npcs.tempest_soldier],
  references: [
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.pcs.swift_starblade,
    refs.locations.nimbus,
    refs.organizations.tempest_family,
  ],
  setup: [
    [
      'The ferry landing on ',
      refs.locations.skynet,
      ' is a wall of people. One ferry is gone: the bounce of the beam hit it in the middle of its crossing. The last one sits at the quay while ',
      refs.npcs.tempest_soldier,
      's load it with troops and turn civilians away.',
    ],
    [
      refs.npcs.maren_of_fairhaven,
      ' is at the rope line with her child, begging for a single place.',
    ],
    [
      'Skill challenge: the party needs three successes before three failures to get aboard. Each player says how they help, then rolls a fitting skill against DC 13. Each character can use a skill only once.',
    ],
  ],
  notes: [
    [
      'A skill challenge settles a scene with several checks instead of one. Let any sensible idea count: ',
      refs.rules.athletics,
      ' to force a path, ',
      refs.rules.persuasion,
      ' or ',
      refs.rules.intimidation,
      ' on the soldiers, ',
      refs.rules.stealth,
      ' to slip in with the cargo, ',
      refs.rules.insight,
      ' to calm the crush.',
    ],
    [
      'If they signed up with ',
      refs.npcs.sergeant_bruna_kell,
      ', her pass counts as one success before anyone rolls.',
    ],
  ],
  outcomes: [
    {
      when: [['Three successes.']],
      response: [
        [
          'They get aboard as the ramp lifts. In the middle of the crossing the battle-cruiser comes alongside and boards the ferry. Run “Boarded by the battle-cruiser” on the ferry deck.',
        ],
      ],
    },
    {
      when: [['Three failures.']],
      response: [
        [
          'The ferry leaves without them. Someone in the crowd shouts that the shipyard still has hulls the army has not taken. Run “The ents hold the shipyard”.',
        ],
      ],
    },
    {
      when: [['They ask what happened.']],
      response: [
        [
          'People say a green light struck the docks of ',
          refs.locations.nimbus,
          ' and jumped to the ferry. Nobody aboard was seen again, and the docks took the worst of it. That is where ',
          refs.pcs.swift_starblade,
          ' was heading.',
        ],
      ],
    },
    {
      when: [['They help ', refs.npcs.maren_of_fairhaven, '.']],
      response: [
        [
          'If the party gets aboard, she and her child come with them. She does not forget who got her off the island.',
        ],
      ],
    },
  ],
})
