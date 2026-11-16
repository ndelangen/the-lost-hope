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
    refs.items.jaded_amulet,
    refs.organizations.beasts_and_dwarf,
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
      '’s casino again. It is shut in the middle of the afternoon: the shutters are down, and two guards stand at the door.',
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
    ['Keep this short. The goal of the session is to bring the party back together.'],
    [
      refs.pcs.fix,
      ' was hunting ',
      refs.pcs.jim,
      ' and kept insisting that ',
      refs.organizations.beasts_and_dwarf,
      ' had a kenku companion. ',
      refs.npcs.borris,
      ' got annoyed, ',
      refs.pcs.fix,
      ' would not let it go, and ',
      refs.npcs.borris,
      ' killed them.',
    ],
    [
      refs.npcs.borris,
      ' does not know that ',
      refs.pcs.jim,
      ' is the one being hunted: when they met, ',
      refs.pcs.jim,
      ' was wearing the ',
      refs.items.jaded_amulet,
      ' and looked like a kenku. Let the players put it together themselves.',
    ],
    [
      refs.npcs.borris,
      ' is not thrilled to talk and volunteers nothing. If they talk to him, he passes the warning along: someone came asking about their party. Then he makes an excuse to get back inside.',
    ],
    ['Nobody talks about war yet. The war starts with the pulse, in the next scene.'],
    [
      refs.pcs.jim,
      ' barely speaks: the voices from his past are getting louder. Give him a muttered word or two at most.',
    ],
    [
      refs.pcs.fix,
      ' does not stay dead. Through their necromancer connection they come to a minute later, scurry off, and follow ',
      refs.pcs.jim,
      ' and ',
      refs.pcs.swift_starblade,
      ' to the docks.',
    ],
  ],
  outcomes: [
    {
      when: [['They greet ', refs.npcs.borris, ' or ask how he is.']],
      response: [
        [
          '“I sense more trouble brewing. I’m closing the casino for the rest of the day.” He does not invite them in.',
        ],
      ],
    },
    {
      when: [['They ask about the body.']],
      response: [
        [
          '“Some delusional bounty hunter. Kept asking about someone in your party. A kenku, if you can believe it. Too persistent, and now too dead.” Then, grudgingly: “Watch your backs. Where one comes asking, more follow.”',
        ],
      ],
    },
    {
      when: [['They press him about the bounty hunter or the kenku.']],
      response: [
        [
          'He shrugs: “Didn’t say who was paying. Didn’t get the chance.” A guard calls him, and he goes back inside.',
        ],
      ],
    },
    {
      when: [['They wait by the body.']],
      response: [
        [
          'After a minute, ',
          refs.pcs.fix,
          ' gasps back to life, coughing blood. Lines: “Not again…” “You didn’t see me. You didn’t see anything.” On spotting ',
          refs.pcs.jim,
          ', they stare a moment too long: “Funny. I could swear I know you.” Then they scurry off down the alley.',
        ],
        [
          refs.pcs.fix,
          ' follows ',
          refs.pcs.jim,
          ' and ',
          refs.pcs.swift_starblade,
          ' to the docks at a distance. A DC 13 Wisdom (Perception) check spots them.',
        ],
      ],
    },
    {
      when: [['They walk on.']],
      response: [
        [
          refs.pcs.fix,
          ' comes to behind them and follows to the docks unseen, unless someone looks back and passes a DC 13 Wisdom (Perception) check.',
        ],
      ],
    },
  ],
})
