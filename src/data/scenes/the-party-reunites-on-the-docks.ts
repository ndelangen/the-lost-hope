import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The party reunites on the docks',
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
      title: 'Auren and the swords',
      lines: [
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
              ' would not touch, and merges with them on the spot.',
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
      title: 'Garran runs out of patience',
      lines: [
        { do: [['Use this at any point, whenever you want to move on.']] },
        {
          speaker: refs.npcs.captain_garran,
          say: [['DIDN’T I FUCKING TELL YOU THAT WE’RE SHORT ON TIME?!?!']],
        },
        {
          do: [
            [
              'He leads them to ',
              refs.locations.master_of_puppets_commanders_office,
              ' without saying who is waiting. Run ',
              refs.scenes.onana_calls_the_party_to_war,
              '.',
            ],
          ],
        },
        {
          note: [
            ['If they report back on their own before he yells, skip the yell.'],
            [
              'That ',
              refs.npcs.onana_tempest,
              ' is aboard is the reveal that opens the next scene. Until then he is only a name behind the orders.',
            ],
          ],
        },
      ],
    },
  ],
})
