import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The shipwright explains the ents' final voyages",
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      'Asked why ents worked on ships made from the bodies of dead ents, ',
      refs.npcs.esia,
      ' explained that their clan had agreed to the practice. At home in the ',
      refs.locations.feywild,
      ', their bodies could return to nature; here, selected dead became ships for a final journey around the world.',
    ],
    [
      "She described it as a funerary custom rather than abuse of the dead. The conversation also mentioned hostile ents from a destroyed whispering forest, but the forest's name and location are unclear.",
    ],
  ],
})
