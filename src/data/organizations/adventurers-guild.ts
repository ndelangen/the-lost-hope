import { refs } from '#/data/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: "Adventurers' Guild",
  summary: 'A guild that recruits wandering heroes and sends them on adventures.',
  notes: [
    [
      'Led through a Marshal hierarchy: ',
      refs.npcs.third_marshal_light,
      ' holds the rank of 13th Marshal over ',
      refs.locations.fajanet,
      '.',
    ],
    'Each recruit is inducted with a guild-mark tattoo and granted a single favor from the guildmaster.',
  ],
})
