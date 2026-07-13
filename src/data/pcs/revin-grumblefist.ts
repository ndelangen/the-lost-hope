import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Revin "klapper" Grumblefist',
  player: 'Matthijs',
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
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'former',
      rank: 'Founder',
    },
  ],
  notes: [['Monk subclass never established.']],
})
