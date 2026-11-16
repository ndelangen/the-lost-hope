import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: "Adventurers' Guild",
  icon: 'gi/GiCrossedSwords',
  notes: [
    ['A guild that recruits wandering heroes and sends them on adventures.'],
    ['A recognized regional authority whose membership tattoos can serve as credentials.'],
    ['The guild in ', refs.locations.fajanet, ' is led by ', refs.npcs.light_13th_marshal, '.'],
    [
      'Each recruit is inducted with a guild-mark tattoo and granted a single favor from the guildmaster.',
    ],
    ['The guild tattoo depicts a grim reaper strangling a shadow.'],
  ],
  background: [
    [
      'The guild tattoo resists getting lost. It is a record of the member written on the body, so no tattooed guild member can fall under the control of ',
      refs.npcs.the_father,
      '.',
    ],
  ],
})
