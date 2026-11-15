import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The green beam over the sky islands',
  location: refs.locations.skynet_s_second_best_inn,
  npcs: [refs.npcs.abraham, refs.npcs.esia],
  references: [
    refs.npcs.maren_of_fairhaven,
    refs.npcs.old_pell,
    refs.npcs.sergeant_bruna_kell,
    refs.npcs.tempest_soldier,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.beasts.wolfie,
    refs.pcs.jim,
    refs.npcs.the_father,
    refs.organizations.the_eyeless_hand,
    refs.pcs.fix,
    refs.locations.nimbus,
  ],
  setup: [
    [
      'From ',
      refs.locations.skynet,
      ', ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.pcs.devan,
      ' feel a green pulse wash over the islands, then see a bright green beam strike the docks of ',
      refs.locations.nimbus,
      ' and part of it explode outwards across the harbour.',
    ],
    [
      'Everyone who cared about ',
      refs.pcs.jim,
      ' rolls a DC 11 History check. On a failure they lose all interest in ',
      refs.pcs.jim,
      ', unless the player convinces the DM otherwise.',
    ],
    [
      'Anyone who did not care about ',
      refs.pcs.jim,
      ' does not roll: the beam cannot make someone stop caring who never did. ',
      refs.npcs.the_father,
      ' is immune. Agents of ',
      refs.organizations.the_eyeless_hand,
      ', such as ',
      refs.pcs.fix,
      ', can be affected, but they will be re-instructed eventually.',
    ],
    [
      'The populations of all three sky islands are in chaos. The normally calm streets are packed, and the usual links between the islands are clogged.',
    ],
    [
      'There are few civilians left on the streets. ',
      refs.npcs.old_pell,
      ' boards up his shop, and ',
      refs.npcs.maren_of_fairhaven,
      ' pushes towards the ferries with her child. ',
      refs.npcs.sergeant_bruna_kell,
      ' shouts for recruits from a crate while ',
      refs.npcs.tempest_soldier,
      's drill and load supplies for the rollout.',
    ],
  ],
  outcomes: [
    {
      when: [['They help ', refs.npcs.maren_of_fairhaven, ' or ', refs.npcs.old_pell, '.']],
      response: [
        ['A friendly face in the chaos, and someone who points them through the back streets.'],
      ],
    },
    {
      when: [['They talk to ', refs.npcs.sergeant_bruna_kell, '.']],
      response: [
        ['She tries to sign them up. Signing gets them a pass through the clogged links.'],
      ],
    },
    {
      when: [['They head to the shipyard.']],
      response: [['They try to get their airship from ', refs.npcs.esia, ' early.']],
    },
    {
      when: [['They push through the crowds.']],
      response: [
        [
          'Persuasion or Intimidation to clear the way, or they try to make their way anyway. Either way, the Tempest soldiers find them first.',
        ],
      ],
    },
  ],
})
