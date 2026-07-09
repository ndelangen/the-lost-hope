import { refs } from '#/data/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Who is Light, and what is his bidding?',
  description: 'Who is Light, and what is his bidding?',
  status: 'open',
  clues: [
    [refs.npcs.third_marshal_light, ' invited all three of us personally, with a letter.'],
    [refs.npcs.third_marshal_light, " runs the Adventurers' Guild in this city."],
    [refs.npcs.third_marshal_light, ' offered each of us one favor.'],
    [
      'Session 12: ',
      refs.npcs.third_marshal_light,
      ' gave ',
      refs.pcs.jim,
      " a 'letter of passage' for the mountain top residents.",
    ],
    [
      'Session 12: ',
      refs.npcs.third_marshal_light,
      ' told ',
      refs.pcs.jim,
      ' to bring the rest of the party to meet him in the morning.',
    ],
    [
      'Session 12: ',
      refs.npcs.third_marshal_light,
      ' instructed the party to take a trapdoor, lock it behind them, and head for the mountain.',
    ],
    [
      'Session 12: the ',
      refs.npcs.angel_of_the_mountain,
      ' burned ',
      refs.npcs.third_marshal_light,
      "'s letter of passage; passage was granted via truth-telling, not the letter.",
    ],
    [
      'The ',
      refs.npcs.angel_of_the_mountain,
      ' and ',
      refs.npcs.dragon_of_the_mountain,
      ' did not seem to like ',
      refs.npcs.third_marshal_light,
      ' — the letter-burning read as contempt for it (and him), not ceremony.',
    ],
    [
      refs.npcs.third_marshal_light,
      ' reportedly has to do something every so often to appease the ',
      refs.npcs.dragon_of_the_mountain,
      ' and the ',
      refs.npcs.dragon_children,
      '. What the recurring obligation is, and what happens if he stops, is unknown.',
    ],
    [
      'The ',
      refs.npcs.angel_of_the_mountain,
      ' revealed they had once been a member of the ',
      refs.organizations.adventurers_guild,
      ' — the same guild ',
      refs.npcs.third_marshal_light,
      ' now leads. How and why they left is unknown.',
    ],
    [
      'Open: what does ',
      refs.npcs.third_marshal_light,
      ' owe the mountain-top residents, why do they dislike him, and what is the bidding he needs outside adventurers for?',
    ],
  ],
  conclusion: [],
})
