import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Who is Light, and what is his bidding?',
  notes: [['Who is Light, and what is his bidding?']],
  status: 'open',
  clues: [
    [refs.npcs.light_13th_marshal, ' invited all three of us personally, with a letter.'],
    [refs.npcs.light_13th_marshal, " runs the Adventurers' Guild in this city."],
    [refs.npcs.light_13th_marshal, ' offered each of us one favor.'],
    [
      'Session 4: ',
      refs.npcs.light_13th_marshal,
      ' gave ',
      refs.pcs.jim,
      " a 'letter of passage' for the mountain top residents.",
    ],
    [
      'Session 4: ',
      refs.npcs.light_13th_marshal,
      ' told ',
      refs.pcs.jim,
      ' to bring the rest of the party to meet him in the morning.',
    ],
    [
      'Session 4: ',
      refs.npcs.light_13th_marshal,
      ' instructed the party to take a trapdoor, lock it behind them, and head for the mountain.',
    ],
    [
      'Session 4: the ',
      refs.npcs.angel_of_the_mountain,
      ' burned ',
      refs.npcs.light_13th_marshal,
      "'s letter of passage; passage was granted via truth-telling, not the letter.",
    ],
    [
      'The ',
      refs.npcs.angel_of_the_mountain,
      ' and ',
      refs.npcs.dragon_of_the_mountain,
      ' did not seem to like ',
      refs.npcs.light_13th_marshal,
      ' — the letter-burning read as contempt for it (and him), not ceremony.',
    ],
    [
      refs.npcs.light_13th_marshal,
      ' reportedly has to do something every so often to appease the ',
      refs.npcs.dragon_of_the_mountain,
      ' and the ',
      refs.beasts.dragon_children,
      '. What the recurring obligation is, and what happens if he stops, is unknown.',
    ],
    [
      'The ',
      refs.npcs.angel_of_the_mountain,
      ' revealed they had once been a member of the ',
      refs.organizations.adventurers_guild,
      ' — the same guild ',
      refs.npcs.light_13th_marshal,
      ' now leads. How and why they left is unknown.',
    ],
    [
      'Open: what does ',
      refs.npcs.light_13th_marshal,
      ' owe the mountain-top residents, why do they dislike him, and what is the bidding he needs outside adventurers for?',
    ],
  ],
  conclusion: [],
})
