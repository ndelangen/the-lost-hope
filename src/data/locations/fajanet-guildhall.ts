import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: "Fajanet Adventurers' Guildhall",
  icon: 'gi/GiSwordsEmblem',
  type: 'building',
  parent: refs.locations.fajanet,
  at: [330, 230],
  notes: [
    ["The party's new home base."],
    [
      'Features a quest bulletin board, a ritual area for the ',
      refs.organizations.adventurers_guild,
      ' tattoo ceremony, and ',
      refs.npcs.light_13th_marshal,
      "'s office.",
    ],
  ],
  map: { url: '/assets/locations/fajanet-guildhall.png', width: 1200, height: 800 },
})
