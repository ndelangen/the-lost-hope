import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Borris shutters the casino',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.borris],
  references: [
    refs.pcs.swift_starblade,
    refs.pcs.devan,
    refs.pcs.jim,
    refs.organizations.the_eyeless_hand,
  ],
  setup: [
    [
      refs.npcs.borris,
      '’s casino is closing its doors. Guards carry strongboxes out the back, the snail racetrack is being crated up, and ',
      refs.npcs.borris,
      ' stands in the middle of it with fresh blood on his knuckles, shouting orders.',
    ],
  ],
  notes: [
    [
      'Use this wherever the party is on ',
      refs.locations.nimbus,
      ', most likely ',
      refs.pcs.swift_starblade,
      ' after the docks. ',
      refs.npcs.borris,
      ' knew ',
      refs.pcs.jim,
      ', so he rolls the DC 11 History check too.',
    ],
  ],
  outcomes: [
    {
      when: [['They ask about the cloaked men.']],
      response: [
        [
          '“Those weren’t customers. The Hand doesn’t gamble, it collects.” He knows who they are, but not who sent them.',
        ],
      ],
    },
    {
      when: [['They need a way off the island.']],
      response: [
        [
          'As a friend of ',
          refs.pcs.devan,
          ', he offers a seat on his own boat out, for a favour later.',
        ],
      ],
    },
    {
      when: [['The new player chose to be the prisoner from his back room.']],
      response: [
        [
          'He drags them out by the collar: “Take this one off the islands for me. I’m done asking questions, and I don’t want them found here.”',
        ],
      ],
    },
  ],
})
