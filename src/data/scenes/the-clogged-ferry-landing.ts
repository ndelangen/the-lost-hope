import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The clogged ferry landing',
  illustration: '/assets/scenes/the-clogged-ferry-landing.png',
  location: refs.locations.skynet_sky_bridge_landing,
  battleMaps: [refs.locations.skynet_sky_bridge_landing, refs.locations.sky_bridge_ferry],
  npcs: [refs.npcs.maren_of_fairhaven, refs.npcs.sergeant_bruna_kell, refs.npcs.tempest_soldier],
  references: [
    refs.pcs.auren,
    refs.npcs.esia,
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
      'The ferry will not lift. The bounce of the beam drained its crystal, and the soldiers have sent for ',
      refs.npcs.esia,
      '’s technician. ',
      refs.pcs.auren,
      ', a warforged in runic plating, stands in the open engine hatch on the quay side of the rope line, coaxing the crystal back to life. This is where the new player joins.',
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
    [
      refs.pcs.auren,
      ' is behind the rope line, so he can help from the inside: claim one of the party as hands he needs at the engine, or stall the crystal until the soldiers let them board. Let his player roll for the party like anyone else.',
    ],
  ],
  outcomes: [
    {
      when: [['Three successes.']],
      response: [
        [
          'They get aboard as the ramp lifts. ',
          refs.pcs.auren,
          ' jump-starts the crystal and swings aboard after them, because nobody else can keep it running. In the middle of the crossing the battle-cruiser bears down on the ferry. Run ',
          refs.scenes.running_from_the_battle_cruiser,
          ' on the ferry deck.',
        ],
      ],
    },
    {
      when: [['Three failures.']],
      response: [
        [
          'The ferry leaves without them. ',
          refs.pcs.auren,
          ' gets the crystal running, and the soldiers shove him off the ramp: they want no war machine aboard. Stranded on the quay with the party, he tells them the shipyard still has hulls the army has not taken, and he knows the way. Run ',
          refs.scenes.the_ents_hold_the_shipyard,
          ', and he is already with them.',
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
