import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim briefly incapacitates the serpent',
  day: 22,
  location: refs.locations.serpent_eclipse_flooded_cavern,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      refs.pcs.jim,
      ' cast Sleep on the ',
      refs.beasts.serpent_eclipse_lake_serpent,
      ' and used his College of Tragedy ability to change its first saving throw to Charisma. It failed and was briefly incapacitated, buying time for the party to swim toward the bank.',
    ],
    [
      'The serpent succeeded on its next Wisdom save before falling fully unconscious. ',
      refs.pcs.jim,
      ' then taunted it with Vicious Mockery, and it rose from the water in anger.',
    ],
  ],
})
