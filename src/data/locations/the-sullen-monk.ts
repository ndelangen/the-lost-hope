import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Sullen Monk',
  icon: 'gi/GiBeerStein',
  type: 'building',
  parent: refs.locations.shadowpeak_residential_district,
  at: [500, 350],
  notes: [
    ['The only tavern in ', refs.locations.shadowpeak, '.'],
    [
      refs.npcs.borris,
      ' owned the tavern before gifting it to ',
      refs.npcs.knukkles,
      '. Borris still runs the operation, while Knukkles serves as its public face.',
    ],
  ],
})
