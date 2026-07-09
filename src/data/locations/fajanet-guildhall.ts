import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: "Fajanet Adventurers' Guildhall",
  icon: 'gi/GiSwordsEmblem',
  type: 'building',
  parent: refs.locations.fajanet,
  at: [0, 0],
  description: [
    "The party's new home base.",
    [
      'Features a quest bulletin board, a ritual area for the ',
      refs.organizations.adventurers_guild,
      ' tattoo ceremony, and ',
      refs.npcs.third_marshal_light,
      "'s office.",
    ],
  ],
  map: { url: '/assets/locations/fajanet-guildhall.png', width: 1200, height: 700 },
})
