import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rare-Animal Dealer',
  avatar: '/assets/npcs/rare-animal-dealer.png',
  location: refs.locations.fajanet,
  species: 'unknown',
  summary: [
    'An exotic animal dealer in ',
    refs.locations.fajanet,
    '. Filed under "Rare-Animal Trainer" from the bulletin-board posting, but referred to in play as the exotic animal dealer.',
    " The dealer's own name, species, and whereabouts are unestablished, as is the reward for the recovered animals.",
  ],
})
