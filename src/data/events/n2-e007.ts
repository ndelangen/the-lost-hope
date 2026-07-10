import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Shadowy tentacles grab the dwarf',
  day: 1,
  location: refs.locations.the_nest,
  mark: { type: 'icon', name: 'gi/GiWaveCrest' },
  notes: [
    [
      'The party got rooms at ',
      refs.locations.the_nest,
      '. In the night, ',
      refs.pcs.revin_grumblefist,
      ' opened the window of his room — voices compelled him — and shadowy tentacles grabbed him, trying to drag him out.',
    ],
    ['The party woke up, rushed to help, prevented the abduction, and closed the window.'],
    ['Evil laughter sounded outside afterward. The PCs went back to their rooms to sleep.'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
