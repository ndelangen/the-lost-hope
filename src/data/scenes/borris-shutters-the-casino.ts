import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Borris shutters the casino',
  illustration: '/assets/scenes/borris-shutters-the-casino.png',
  location: refs.locations.borris_s_gambling_den,
  battleMaps: [refs.locations.borris_s_gambling_den],
  npcs: [refs.npcs.borris, refs.npcs.crowy],
  setup: [
    [
      'On their way to the docks, ',
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.jim,
      ' pass ',
      refs.npcs.borris,
      '’s casino again, with ',
      refs.npcs.crowy,
      ' along. It is shut in the middle of the afternoon: the shutters are down, and two guards stand at the door.',
    ],
  ],
  beats: [
    {
      title: 'Before you start',
      lines: [
        {
          say: [
            ['Tonight opens with a big event. After that, it is yours again.'],
            [
              'We also have a new player tonight. Please do not reject their character: that would make things exceptionally hard for all of us.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The view below',
      lines: [
        {
          say: [
            [
              'It is about four in the afternoon, and the weather has cleared. For the first time, you can see what lies beneath the sky islands, and watch it slide slowly past below you. It has always been cloudy down there. Now the view is clear, and it is all… ocean. The islands hover over a vast, vast ocean.',
            ],
          ],
        },
        {
          note: [
            ['Keep this short. The goal of the session is to bring the party back together.'],
            [
              refs.pcs.jim,
              ' barely speaks: the voices from his past are getting louder. Give him a muttered word or two at most.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The crate in the alley',
      lines: [
        {
          do: [
            [
              refs.npcs.borris,
              ' is in the alley beside the casino, wiping fresh blood off his knuckles. He places a canister over a crate.',
            ],
          ],
        },
        {
          note: [
            [
              'He has put the body of ',
              refs.pcs.fix,
              ' into that crate. The players do not see it. It is up to ',
              refs.pcs.swift_starblade,
              ' and ',
              refs.pcs.jim,
              ' to investigate.',
            ],
          ],
        },
        {
          note: [
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
          ],
        },
        {
          note: [
            [
              refs.npcs.crowy,
              ' can call attention to ',
              refs.npcs.borris,
              ': a squawk of his name, or a flap towards the alley. Use it if the players look set to walk past.',
            ],
          ],
        },
        {
          note: [
            [
              refs.npcs.borris,
              ' is not thrilled to talk and volunteers nothing. If they talk to him, he passes the warning along: someone came asking about their party. Then he makes an excuse to get back inside.',
            ],
            ['Nobody talks about war yet. The war starts with the pulse, in the next scene.'],
          ],
        },
      ],
      outcomes: [
        {
          when: [['They greet ', refs.npcs.borris, ' or ask how he is.']],
          response: [
            [
              '“I sense more trouble brewing. I’m closing the casino for the rest of the day.” He does not invite them in.',
            ],
          ],
          followUps: [
            {
              when: [['They ask about the crate or the blood.']],
              response: [
                [
                  '“Some delusional bounty hunter. Kept asking about someone in your party. A kenku, if you can believe it. Too persistent, and now too dead.” Then, grudgingly: “Watch your backs. Where one comes asking, more follow.”',
                ],
              ],
              followUps: [
                {
                  when: [['They press him about the bounty hunter or the kenku.']],
                  response: [
                    [
                      'He shrugs: “Didn’t say who was paying. Didn’t get the chance.” A guard calls him, and he goes back inside.',
                    ],
                  ],
                },
              ],
            },
          ],
        },
        {
          when: [['They stand still long enough.']],
          response: [
            [
              'The crate briefly gets darker. Then a big gasp, then mumbling, and clearly someone inside the crate is trying to get out.',
            ],
          ],
          followUps: [
            {
              when: [['They open the crate.']],
              response: [
                [
                  refs.pcs.fix,
                  ' climbs out, coughing blood. Lines: “Not again…” “You didn’t see me. You didn’t see anything.” On spotting ',
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
          ],
        },
      ],
    },
    {
      title: 'Walking on',
      lines: [
        {
          note: [
            [
              refs.pcs.fix,
              ' does not stay dead. Through their necromancer connection they come to a minute later, get out of the crate, and follow ',
              refs.pcs.jim,
              ' and ',
              refs.pcs.swift_starblade,
              ' to the docks.',
            ],
          ],
        },
        {
          do: [
            [
              'Once they walk on, ',
              refs.npcs.crowy,
              ' can also warn them that they are being followed, and urge them to run.',
            ],
          ],
        },
      ],
      outcomes: [
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
    },
  ],
})
