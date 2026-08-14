import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim poisons forty-one guests and is fired as ship’s cook',
  day: 19,
  location: refs.locations.flying_bazaar_kitchen,
  mark: { type: 'avatar', url: '/assets/pcs/jim-kenku.jpg' },
  notes: [
    [
      'At the end of the previous evening, ',
      refs.pcs.jim,
      ' offered his services as a cook and received a trial shift after claiming that he could make cheesecake.',
    ],
    [
      'The following morning, forty-one guests were food-poisoned during the trial shift. The exact cause remains unknown; the ',
      refs.locations.flying_bazaar_kitchen,
      ' itself was not at fault.',
    ],
    [
      refs.npcs.sylvia,
      ' fired ',
      refs.pcs.jim,
      ' on his first day, refused to pay him, and returned him to the status of an ordinary passenger.',
    ],
  ],
})
