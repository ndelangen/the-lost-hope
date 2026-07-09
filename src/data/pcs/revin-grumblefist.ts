import { refs } from '#/data/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Revin "klapper" Grumblefist',
  player: 'matthijsdeelen',
  url: '',
  avatar: '/assets/pcs/revin.png',
  status: 'retired',
  species: 'Dwarf',
  class: 'Monk',
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
  ],
  notes: [['Monk subclass never established.']],
})
