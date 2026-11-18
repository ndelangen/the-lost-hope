import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Ride the Lightning',
  icon: 'gi/GiGalleon',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  hull: {
    sectorHitPoints: 5,
    // Matches the deck maps, bow to the left: the helm's wheel is at the starboard stern, the
    // bunks and the stern cargo are on the port side. The crystal room in the centre is never hit.
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
  notes: [['A flying battle-cruiser of the ', refs.organizations.tempest_family, '.']],
  background: [
    [
      'Its crew answers to ',
      refs.organizations.the_eyeless_hand,
      '. It is the cruiser the party is asked to take back.',
    ],
    ['It is experimental. A new, unique type of crystal makes it the fastest ship that exists.'],
  ],
})
