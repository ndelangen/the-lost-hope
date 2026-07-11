import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Mr. Peace',
  player: 'unknown',
  url: '',
  avatar: '/assets/pcs/mr-peace.png',
  status: 'occasional',
  species: 'unknown',
  class: 'unknown',
  notes: [
    ['A guest ally who cannot cause any harm and can conjure flowers by magic.'],
    [
      '"Mr. Peace" is a moniker; his real name is unknown, and whether he returns is an open thread.',
    ],
  ],
})
