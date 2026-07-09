import { refs } from '#/data/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Victor the Badesh lumberjack',
  player: 'unknown',
  url: 'https://www.dndbeyond.com/characters/162336996',
  avatar: '/assets/pcs/victor.png',
  status: 'occasional',
  species: 'Human',
  notes: [['A lumberjack from ', refs.locations.badesh, '.']],
})
