import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Fix delivers potions to Lord Malachar',
  day: 14,
  location: refs.locations.the_blackstone,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      'The next morning, ',
      refs.pcs.fix,
      ' used her official delivery to get the party through the guarded gates of ',
      refs.locations.the_blackstone,
      '.',
    ],
    [
      'Locals had shown fear when the party mentioned ',
      refs.npcs.lord_malachar,
      ', a warning they initially overlooked. In the stables, ',
      refs.pcs.devan,
      ' used Detect Evil and Good, and Malachar registered as evil. Malachar accepted the purple potions, which the party suspected were demon blood, and left the party unattended.',
    ],
  ],
})
