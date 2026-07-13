import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan interrogates and kills Roberto',
  day: 15,
  location: refs.locations.verdant_haven_forest,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      refs.pcs.devan,
      ' lured ',
      refs.npcs.roberto,
      ' into the forest under the guise of showing him something, interrogated him, and ultimately killed him with a rock. ',
      refs.pcs.devan,
      ' kept the rock as ',
      refs.items.steve_the_interrogation_rock,
      ' because of his fond memories of the interrogation.',
    ],
    [
      refs.npcs.roberto,
      ' claimed that ',
      refs.organizations.the_eyeless_hand,
      ' had been steadily gaining control of ',
      refs.locations.fairhaven,
      ' and that ',
      refs.npcs.mortimer_mafioso,
      ' was involved.',
    ],
    [
      'He also claimed that a splinter cell of ',
      refs.organizations.the_eyeless_hand,
      ' destroyed the city and that ',
      refs.npcs.the_father,
      ' may neither have ordered nor approved the attack. The reliability of the interrogation remains uncertain.',
    ],
    [
      refs.npcs.roberto,
      ' also spoke of a ',
      refs.locations.continent_of_the_dead,
      ' across the ',
      refs.locations.sea_of_unknown,
      '.',
    ],
  ],
})
