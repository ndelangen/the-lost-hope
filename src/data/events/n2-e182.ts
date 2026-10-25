import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Cassian proposes seeking Onana's backing",
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      'After leaving the shipyard, ',
      refs.pcs.cassian_veyl,
      ' proposed approaching ',
      refs.npcs.onana_tempest,
      ' to find out whether he would pay for action against ',
      refs.npcs.charles_tempest,
      ' or another relative. He hoped to earn a reward while fulfilling a shipwright favor.',
    ],
    [
      'The party debated how to phrase the approach without insulting or threatening the family. They had not returned to the estate or obtained a commission when the session ended.',
    ],
  ],
})
