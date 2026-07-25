import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim poisons forty-one guests and is fired as ship’s cook',
  day: 19,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      'At the end of the previous evening, ',
      refs.pcs.jim,
      ' offered his services as a cook and received a trial shift after claiming that he could make cheesecake.',
    ],
    [
      'The following morning, forty-one guests were food-poisoned during the trial shift. The exact cause remains unknown; the ship’s kitchen itself was not at fault.',
    ],
    [
      refs.npcs.sylvia,
      ' fired Jim on his first day, refused to pay him, and returned him to the status of an ordinary passenger.',
    ],
  ],
})
