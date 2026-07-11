import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: "Jim's Past",
  notes: [["Jim's Past"]],
  status: 'open',
  clues: [
    [
      refs.pcs.jim,
      " received a letter at the guildhall. The letter was a 'final warning': 'meet us at the ",
      refs.locations.the_green_light,
      " near the mountain tonight!'",
    ],
    ['The warning was sent specifically to ', refs.pcs.jim, '.'],
    [
      refs.pcs.jim,
      " disregarded the letter's demand and instead spoke with ",
      refs.npcs.light_13th_marshal,
      ' 1:1.',
    ],
    [
      refs.npcs.light_13th_marshal,
      ' was understanding and told ',
      refs.pcs.jim,
      ' to meet him (Light) with the rest of the party in the morning.',
    ],
    [
      'Open: someone from ',
      refs.pcs.jim,
      "'s past is after him. Who sent the warning, and what does the party not yet know about him?",
    ],
  ],
  conclusion: [],
})
