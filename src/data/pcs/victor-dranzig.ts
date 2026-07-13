import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Victor Dranzig',
  player: 'Ryan',
  url: 'https://www.dndbeyond.com/characters/162336996',
  status: 'retired',
  species: 'Human',
  class: 'Barbarian',
  level: 4,
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'former',
      rank: 'Member',
    },
  ],
  notes: [
    ['A lumberjack from ', refs.locations.badesh, '.'],
    ['His last currently recorded appearance is Session 8. His in-fiction departure is unknown.'],
  ],
})
