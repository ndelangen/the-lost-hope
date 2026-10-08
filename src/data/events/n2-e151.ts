import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Dax explains how the dungeon feeds on souls',
  day: 22,
  location: refs.locations.serpent_eclipse_crystal_oasis,
  mark: { type: 'icon', name: 'gi/GiPlantsAndAnimals' },
  notes: [
    [
      'The party introduced themselves to ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      '. ',
      refs.npcs.dax,
      ' explained that a dungeon is a separate, sentient plane that feeds on the life force and souls of people who die inside. Its growth and recovered equipment are tied to those victims.',
    ],
    [
      'According to ',
      refs.npcs.dax,
      ', ',
      refs.npcs.sarogarth,
      ' tried a ritual to keep the dungeon from consuming him, and the dungeon answered by imprisoning him in crystal. The tortoises had been unable to break him free.',
    ],
  ],
})
