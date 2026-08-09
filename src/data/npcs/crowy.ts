import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Crowy',
  species: 'Talking crow',
  languages: ['Common'],
  notes: [
    [
      'A talking crow sent indirectly by ',
      refs.npcs.light_13th_marshal,
      ' through ',
      refs.npcs.borris,
      '. The party unanimously chose the name Crowy.',
    ],
    [
      'Crowy can communicate directly with Light. Its contract requires the party to provide basic care; it can produce the paperwork by vomiting it out.',
    ],
    [
      'Crowy directly asked ',
      refs.npcs.light_13th_marshal,
      ' to become the “Bird of Gluttony,” and Light granted the request. The exact powers, duration, and limits of the granted form remain unknown. The party assumes Crowy can no longer sleep, but this has not been confirmed.',
    ],
  ],
})
