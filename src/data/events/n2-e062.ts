import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim tells the truth at the court hearing',
  day: 13,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'gi/GiBangingGavel' },
  notes: [
    [
      'Following ',
      refs.events.n2_e061,
      ', ',
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', and ',
      refs.pcs.swift_starblade,
      ' were interviewed in court.',
    ],
    [
      refs.pcs.jim,
      ' attempted to cast Friends, but the spell failed and rebounded. After being snapped out of its effect, he still chose to tell the whole truth.',
    ],
    [
      refs.pcs.jim,
      ' testified that the party were adventurers and had broken into ',
      refs.locations.mortimer_s_shop,
      ', but argued that the entry was justified: they were investigating a lead, had neither planted explosives nor destroyed the shop deliberately, and a closed door should not stop adventurers investigating a crime.',
    ],
    [
      'The court found the party not guilty of causing the explosion. They confessed to breaking and entering but were not charged because they had entered while investigating the job accepted in ',
      refs.events.n2_e044,
      '.',
    ],
  ],
})
