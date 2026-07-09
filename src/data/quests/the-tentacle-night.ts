import { refs } from '#/data/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Tentacle Night',
  description: 'The Tentacle Night',
  status: 'open',
  clues: [
    [
      'Session 1, night 1 at ',
      refs.locations.the_nest,
      ', ',
      refs.locations.fajanet,
      ': voices compelled ',
      refs.pcs.revin_grumblefist,
      ' to open his window.',
    ],
    [
      'Shadowy tentacles grabbed ',
      refs.pcs.revin_grumblefist,
      ' and tried to drag him out. Party woke, rushed to help, prevented it, closed the window.',
    ],
    "Evil children's laughter outside afterward. Party went back to their rooms to sleep.",
    'Tavern boarding-up at nightfall seemed routine. Party in rooms before sounds.',
    [
      'Session 3: 5-day festival in ',
      refs.locations.fajanet,
      ' — festival nights had no tentacles; festival seemed to ensure safe nights.',
    ],
    [
      'Party asked ',
      refs.npcs.third_marshal_light,
      ' about tentacles and voices. Light had no clue.',
    ],
    [
      'Proprietor ',
      refs.npcs.samantha,
      ' (Eyeless Hand) runs illegal/semi-illegal drug trade at ',
      refs.locations.the_nest,
      '.',
    ],
    'What did the tentacles actually want?',
  ],
  conclusion: [],
})
