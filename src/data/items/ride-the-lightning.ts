import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Ride the Lightning',
  icon: 'gi/GiGalleon',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
  controlledBy: refs.organizations.the_eyeless_hand,
  hull: {
    // Matches the deck maps, bow to the left: the helm's wheel is at the starboard stern, the
    // bunks and the stern cargo are on the port side. The crystal room sits in the centre.
    port: [
      { name: 'Port bow', escapePods: true },
      { name: 'Port battery', escapePods: true },
      { name: 'Barracks', escapePods: true },
      { name: 'Stern hold', escapePods: true },
    ],
    starboard: [
      { name: 'Starboard bow', escapePods: true },
      { name: 'Starboard battery', escapePods: true },
      { name: 'Control room', escapePods: false },
      { name: 'Helm', escapePods: false },
    ],
  },
  background: [
    ['It is the cruiser the party is asked to take back.'],
    [
      'The vessel draws its exceptional speed from a unique propulsion crystal. Around it, time runs much faster than in the rest of the world: a time warp. The closer to the crystal, the faster. Whoever spends time in the crystal room, even a ',
      refs.rules.long_rest,
      ', comes out to find that almost no time has passed outside.',
    ],
  ],
})
