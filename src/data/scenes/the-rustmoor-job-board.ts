import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The Rustmoor job board',
  location: refs.locations.rustmoor_guildhall,
  npcs: [refs.npcs.hex],
  setup: [
    [
      'Day two in ',
      refs.locations.rustmoor,
      '. The guildhall is up and its job board is out, with four simple jobs pinned to it. This is filler for the day, and the bait for ',
      refs.npcs.hex,
      ': taking a job is exactly the kind of simple adventure that makes him lose his patience.',
    ],
    ['Every job is short and shallow on purpose. The rewards are proposals.'],
  ],
  beats: [
    {
      title: 'The board',
      lines: [
        {
          do: [
            ['Four notices are pinned to the new board, the ink barely dry:'],
            ['ESCORT WANTED. Salvage crew hauling a cannon barrel out of the field. 60 gp.'],
            ['MILL WHEEL STUCK. Something living in the sludge. Clear it. 80 gp.'],
            [
              'THIEVES. Building materials going missing from this site at night. Catch them. 40 gp.',
            ],
            ['RATS. Clear a crashed ship’s hold before my crew goes in. 30 gp and first pick.'],
          ],
        },
        {
          note: [
            [
              refs.npcs.hex,
              ' watches them read the board, and gets visibly irritated when they pick one.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiPathDistance',
          when: [['They take the escort job.']],
          response: [['Run ', refs.scenes.salvage_escort, '.']],
        },
        {
          icon: 'gi/GiPathDistance',
          when: [['They take the mill job.']],
          response: [['Run ', refs.scenes.the_clogged_mill, '.']],
        },
        {
          icon: 'gi/GiPathDistance',
          when: [['They take the thieves job.']],
          response: [['Run ', refs.scenes.thieves_on_the_building_site, '.']],
        },
        {
          icon: 'gi/GiPathDistance',
          when: [['They take the rats job.']],
          response: [['Run ', refs.scenes.rats_in_the_hold, '.']],
        },
      ],
    },
    {
      title: 'Back at the guildhall',
      lines: [
        {
          do: [
            [
              'When they come back pleased with themselves, ',
              refs.npcs.hex,
              ' is waiting for them.',
            ],
          ],
        },
        { note: [['Run ', refs.scenes.hex_loses_patience, '.']] },
      ],
    },
  ],
})
