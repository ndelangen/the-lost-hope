import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The green beam over the sky islands',
  location: refs.locations.skynet_s_second_best_inn,
  npcs: [refs.npcs.abraham, refs.npcs.esia],
  references: [
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.beasts.wolfie,
    refs.pcs.jim,
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
      ' see a bright green beam strike the docks of ',
      refs.locations.nimbus,
      '.',
    ],
    [
      'Everyone who knows ',
      refs.pcs.jim,
      ' rolls a DC 11 History check. On a failure they lose all interest in ',
      refs.pcs.jim,
      ', unless the player convinces the DM otherwise.',
    ],
    [
      'The populations of all three sky islands are in chaos. The normally calm streets are packed, and the usual links between the islands are clogged.',
    ],
  ],
  outcomes: [
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
