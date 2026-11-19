import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The party reunites on the docks',
  illustration: '/assets/scenes/the-party-reunites-on-the-docks.png',
  location: refs.locations.nimbus_harbour,
  alternateLocations: [refs.locations.nimbus_sky_bridge_landing],
  battleMaps: [refs.locations.nimbus_harbour],
  npcs: [refs.npcs.crowy, refs.npcs.captain_garran],
  setup: [
    [
      'The whole party stands on the docks of ',
      refs.locations.nimbus,
      ', with orders to report back to ',
      refs.npcs.captain_garran,
      ' quickly. They have some time to discuss what has happened, until he runs out of patience.',
    ],
  ],
  beats: [
    {
      title: 'Back together',
      lines: [
        {
          do: [
            [
              'The party is in one place again for the first time since it split (',
              refs.events.n2_e203,
              '). ',
              refs.pcs.auren,
              ' and ',
              refs.pcs.swift_starblade,
              ' have not met: let their players introduce them.',
            ],
            [
              refs.pcs.swift_starblade,
              ' tells the others what happened here. Give his player the floor, and give the party some time to discuss it.',
            ],
          ],
        },
        {
          note: [
            [
              'Meanwhile ',
              refs.npcs.captain_garran,
              ' and his soldiers survey the site and help civilians, so the party has this moment to itself.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Jim’s letter',
      onlyIf: [['They wish to read it now. It can also wait until between sessions.']],
      lines: [
        {
          do: [
            [
              'Make some time to read the decrypted letter from ',
              refs.pcs.jim,
              '. If ',
              refs.pcs.swift_starblade,
              '’s player has not finished decoding it, hand them the letter decoded.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Auren and the swords',
      lines: [
        {
          note: [
            [
              'When this happens is up to the players, not you. Near the end suits you best, because the boom is your trigger to send them aboard. Play this beat the moment ',
              refs.pcs.auren,
              ' touches the blades, wherever you are in the scene.',
            ],
          ],
        },
        {
          do: [
            [
              refs.pcs.auren,
              ' is drawn to ',
              refs.items.dagger_of_the_zodiac_signs,
              ' and ',
              refs.items.shadow_sword,
              ', the two blades ',
              refs.pcs.swift_starblade,
              ' would not touch.',
            ],
            [
              'The moment he picks up ',
              refs.items.dagger_of_the_zodiac_signs,
              ', it deals 72 damage to him, and there is a sonic boom. He merges with the dagger and the sword on the spot.',
            ],
          ],
        },
        {
          note: [
            [
              'You need this to happen: the merge is what buffs ',
              refs.pcs.auren,
              ' up for the fight ahead.',
            ],
          ],
        },
        {
          do: [
            [
              'The boom draws the soldiers, and ',
              refs.npcs.captain_garran,
              ' with them. He is really upset: his people are trying to calm civilians down and get the situation under control, and here is this “automata” causing disruption.',
            ],
            ['The party has to explain it in a way he finds acceptable.'],
          ],
        },
        {
          speaker: refs.npcs.captain_garran,
          say: [
            [
              'That’s enough mucking around and looking at a pile of clothes! Get inside the command ship NOW! ',
              refs.npcs.onana_tempest,
              ' wants to see you, hurry up!',
            ],
          ],
        },
        {
          note: [
            [
              'This is the first time anyone says that ',
              refs.npcs.onana_tempest,
              ' is here. Until this line he was only a name behind the orders.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Garran runs out of patience',
      onlyIf: [['The boom has not already brought him over. Use it at any point to move on.']],
      lines: [
        {
          speaker: refs.npcs.captain_garran,
          say: [['DIDN’T I FUCKING TELL YOU THAT WE’RE SHORT ON TIME?!?!']],
        },
        {
          note: [
            [
              refs.pcs.auren,
              ' still has to merge before the fight. If he has not touched the blades by now, give him the chance before they go aboard.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Aboard',
      lines: [
        {
          do: [
            [
              refs.npcs.captain_garran,
              ' takes the whole party aboard, to ',
              refs.locations.master_of_puppets_commanders_office,
              '. Run ',
              refs.scenes.onana_calls_the_party_to_war,
              '.',
            ],
          ],
        },
      ],
    },
  ],
})
