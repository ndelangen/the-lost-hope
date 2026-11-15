import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Borris shutters the casino',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.borris],
  references: [
    refs.pcs.fix,
    refs.pcs.swift_starblade,
    refs.pcs.jim,
    refs.pcs.devan,
    refs.organizations.the_eyeless_hand,
  ],
  setup: [
    [
      'Read aloud: It is about four in the afternoon, and the weather has cleared. For the first time, you can see what lies beneath the sky islands, and watch it slide slowly past below you. It has always been cloudy down there. Now the view is clear, and it is all… ocean. The islands hover over a vast, vast ocean.',
    ],
    [
      'On their way to the docks, ',
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.jim,
      ' pass ',
      refs.npcs.borris,
      '’s casino again. It is closing its doors: guards carry strongboxes out, and the snail racetrack is being crated up.',
    ],
    [
      'Two guards drag a body out of the back room and dump it in the alley. It is ',
      refs.pcs.fix,
      '. ',
      refs.npcs.borris,
      ' follows, wiping fresh blood off his knuckles.',
    ],
  ],
  notes: [
    [
      refs.pcs.fix,
      ' was hunting ',
      refs.pcs.jim,
      ' and tried to intimidate ',
      refs.npcs.borris,
      ' into giving him up. It did not go well, and ',
      refs.npcs.borris,
      ' killed her.',
    ],
    [
      'She does not stay dead. Through her necromancer connection she rises again after the party moves on, with ',
      refs.pcs.jim,
      ' in her sights. Bring her back whenever the hunt for him needs a new face.',
    ],
    [
      'Play this before the docks ambush. ',
      refs.npcs.borris,
      ' knew ',
      refs.pcs.jim,
      ', so he rolls the DC 11 History check too once the beam strikes.',
    ],
  ],
  outcomes: [
    {
      when: [['They ask what happened.']],
      response: [
        [
          '“She came asking about your ghost friend. Pushed too hard.” He looks straight at ',
          refs.pcs.jim,
          ': “People are looking for you. Get off this rock.”',
        ],
      ],
    },
    {
      when: [['They ask about the people hunting ', refs.pcs.jim, '.']],
      response: [
        [
          '“The Hand doesn’t gamble, it collects.” He knows the cloaked men around the docks are the Hand, but not who sent them.',
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
  ],
})
