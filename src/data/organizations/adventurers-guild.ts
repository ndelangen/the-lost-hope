import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: "Adventurers' Guild",
  icon: 'gi/GiCrossedSwords',
  notes: [
    ['A guild that recruits wandering heroes and sends them on adventures.'],
    ['The guild in ', refs.locations.fajanet, ' is led by ', refs.npcs.light_13th_marshal, '.'],
    [
      'Each recruit is inducted with a guild-mark tattoo and granted a single favor from the guildmaster.',
    ],
  ],
})
