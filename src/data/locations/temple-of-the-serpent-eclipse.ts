import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Temple of the Serpent Eclipse',
  icon: 'gi/GiTempleGate',
  type: 'dungeon',
  parent: refs.locations.nimbus,
  at: [0, 0],
  notes: [
    [
      'One of ',
      refs.locations.nimbus,
      '’s two known dungeons, entered with authorization from a noble authority or the ',
      refs.organizations.adventurers_guild,
      '.',
    ],
    [
      'The ancient serpent-themed complex hangs over an abyss. Its known interior includes the ',
      refs.locations.serpent_eclipse_reception_hall,
      ', the ',
      refs.locations.serpent_eclipse_three_door_chamber,
      ', and the ',
      refs.locations.serpent_eclipse_left_door_passage,
      ' leading to the ',
      refs.locations.serpent_eclipse_shadow_arena,
      '.',
    ],
    [
      'The dungeon claims the essence of people who die inside and returns them as its assassins. Its operators retain ten percent of recovered treasure.',
    ],
  ],
})
