import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Giant Spider',
  avatar: '/assets/npcs/giant-spider.png',
  location: refs.locations.fajanet_tunnels,
  species: 'Giant Spider',
  notes: [
    [
      'A giant spider in the ',
      refs.locations.fajanet_tunnels,
      ', guarding the ',
      refs.beasts.phoenix_chick,
      ' in a cocoon. Why it was guarding a phoenix — its own prey, or on behalf of someone like the missing-animal dealer — is unexplained.',
    ],
  ],
})
