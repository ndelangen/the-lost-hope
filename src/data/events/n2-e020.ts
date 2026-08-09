import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim receives a final-warning letter',
  day: 2,
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'lucide/MailWarning' },
  notes: [
    [
      'Back at the ',
      refs.locations.fajanet_guildhall,
      ', ',
      refs.pcs.jim,
      ' found a letter slipped into his hand/pocket.',
    ],
    [
      'The letter was a final warning: meet "us" at the ',
      refs.locations.the_green_light,
      ' near the mountain tonight.',
    ],
    ['The deliverer was not identified. Only Jim saw the letter.'],
    [
      'Although Jim was disguised and inside the guildhall, whoever delivered the letter knew exactly where to reach him and whom to give it to.',
    ],
    ["Jim disregarded the letter's demand."],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
