import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'Tempest Family',
  icon: 'gi/GiCrown',
  notes: [['A noble trading family with power over the ', refs.locations.three_sky_kingdoms, '.']],
  background: [
    [
      'The family may seem powerful, but it is a tiny independent nation state, and a single raid has just destroyed its military. It is not much of a player on the world stage.',
    ],
    ['It is an important ally to ', refs.npcs.light_13th_marshal, ' regardless.'],
  ],
})
