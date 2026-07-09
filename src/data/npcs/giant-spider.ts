import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Giant Spider',
  avatar: '/assets/npcs/giant-spider.png',
  location: refs.locations.fajanet_tunnels,
  species: 'Giant Spider',
  summary: [
    'A giant spider in the ',
    refs.locations.fajanet_tunnels,
    ', guarding the ',
    refs.npcs.phoenix_chick,
    ' in a cocoon. Why it was guarding a phoenix — its own prey, or on behalf of someone like the missing-animal dealer — is unexplained.',
  ],
})
