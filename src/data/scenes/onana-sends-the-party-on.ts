import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Onana sends the party on',
  location: refs.locations.master_of_puppets_commanders_office,
  npcs: [refs.npcs.onana_tempest],
  setup: [
    [
      'The war was a defeat for the ',
      refs.organizations.tempest_family,
      '. Most of its warships are destroyed and ',
      refs.locations.nimbus,
      ' is badly damaged. Nobody could catch the flying fortress, and it is out of view. The family will rebuild, but it will take time.',
    ],
    [
      'The party handed ',
      refs.items.ride_the_lightning,
      ' over in ',
      refs.scenes.garran_comes_for_the_cruiser,
      '. ',
      refs.npcs.onana_tempest,
      ' sees them once more in his office aboard ',
      refs.items.master_of_puppets,
      '.',
    ],
  ],
  beats: [
    {
      title: 'Get out of here',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [['Get out of here. We’ll be rebuilding for a while.']],
        },
        {
          note: [
            [
              'He means it kindly. There is nothing left for them to do here: ',
              refs.locations.nimbus,
              ' is rubble, and the yards will be rebuilding the fleet for months.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Little Purple, as she is',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'You’ll have your ship back. I hope you don’t mind that we already started to ready it for combat. You can have it as-is.',
            ],
          ],
        },
        {
          do: [
            [
              refs.beasts.wolfie,
              ', ',
              refs.npcs.crowy,
              ' and ',
              refs.beasts.sir_fabulous,
              ' are aboard ',
              refs.items.little_purple,
              ', where the party left them.',
            ],
          ],
        },
        {
          note: [
            [
              'His crew got as far as two more cannons, four in all, and one boarding torpedo tube like the one the party rode in ',
              refs.scenes.boarding_ride_the_lightning,
              '. The tube came at the cost of cabin space and storage. She has no extra armour.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A debt',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'The ',
              refs.organizations.tempest_family,
              ' owes you a debt for returning ',
              refs.items.ride_the_lightning,
              ' to us.',
            ],
            ['But the real reward is it not falling into enemy hands.'],
          ],
        },
      ],
    },
    {
      title: 'A word of advice',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [['A word of advice, if you will have it: go to a guildhall.']],
        },
        {
          note: [
            [
              refs.npcs.hex,
              ' is waiting in that guildhall: run ',
              refs.scenes.hex_loses_patience,
              ' when they get there.',
            ],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiSunset',
      when: [
        ['They want to follow the smoke trail from ', refs.events.n2_e203, ' after the fortress.'],
      ],
      response: [['The sun is setting. It is getting too dark to follow trails of smoke.']],
    },
  ],
})
