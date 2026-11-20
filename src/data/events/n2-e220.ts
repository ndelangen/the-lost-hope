import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Onana sends the party to recover Ride the Lightning',
  day: 24,
  location: refs.locations.master_of_puppets_commanders_office,
  mark: { type: 'icon', name: 'gi/GiChecklist' },
  notes: [
    [
      refs.npcs.onana_tempest,
      ' said that ',
      refs.organizations.the_eyeless_hand,
      ' had taken control of ten of the ',
      refs.organizations.tempest_family,
      '’s twenty battle-cruisers. He asked the party to recover the experimental ',
      refs.items.ride_the_lightning,
      ' intact, describing it as faster than any other ship and different from the usual crystal-powered vessels.',
    ],
    [
      'The party agreed to help. Further payment was left for later discussion. ',
      refs.npcs.onana_tempest,
      ' said that the shipwright’s favors meant nothing during the war, but ',
      refs.npcs.esia,
      ' was absent, and the party did not learn whether she still expected the favors.',
    ],
    [
      'Below, ',
      refs.npcs.captain_garran,
      ' supplied ',
      refs.items.long_rest_in_a_bottle,
      ' and healing potions for the mission. ',
      refs.beasts.wolfie,
      ' and ',
      refs.npcs.crowy,
      ' stayed behind aboard ',
      refs.items.little_purple,
      ', with ',
      refs.beasts.sir_fabulous_divine_steed,
      ' watching over them.',
    ],
    [
      'Before boarding, ',
      refs.pcs.cassian_veyl,
      ' cast Armor of Agathys and Mage Armor, then drank his ',
      refs.items.long_rest_in_a_bottle,
      ' to recover his spell slots.',
    ],
  ],
  foretold: [
    {
      what: [
        [
          refs.npcs.onana_tempest,
          ' returns and repairs ',
          refs.items.little_purple,
          ' in exchange for the party helping recover ',
          refs.items.ride_the_lightning,
          '.',
        ],
      ],
    },
  ],
})
