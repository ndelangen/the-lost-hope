import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Who Is Giggles?',
  notes: [[refs.npcs.giggles, ' appears to be more than an ordinary goblin quest giver.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e043,
      ' — the potion-shop investigation on the ',
      refs.locations.fairhaven_guildhall,
      ' board was posted by ',
      refs.npcs.giggles,
      '.',
    ],
    [
      refs.events.n2_e044,
      ' — ',
      refs.npcs.giggles,
      ' delivered most of the briefing inside ',
      refs.locations.mortimer_s_shop,
      ', yet nobody the party asked in ',
      refs.locations.fairhaven,
      ' appeared to know who ',
      refs.npcs.giggles,
      ' was. Some confused the name with ',
      refs.locations.giggles_and_gadgets,
      '.',
    ],
    [
      refs.events.n2_e060,
      ' — ',
      refs.npcs.penelope,
      ' said only she knew the formula for the laughing potion that made heads explode. One uncertain recollection is that ',
      refs.npcs.giggles,
      ' had already described such a potion.',
    ],
    [
      refs.events.n2_e061,
      ' — the explosive given to the party by ',
      refs.npcs.giggles,
      ' may later have become the time bomb beneath ',
      refs.locations.mortimer_s_shop,
      ', although who placed it remains unconfirmed.',
    ],
  ],
  conclusion: [],
})
