import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Victor the Badesh lumberjack',
  player: 'Ryan',
  url: 'https://www.dndbeyond.com/characters/162336996',
  avatar: '/assets/pcs/victor.png',
  status: 'retired',
  species: 'Human',
  notes: [
    ['A lumberjack from ', refs.locations.badesh, '.'],
    [
      'Ryan’s final session with the campaign was Session 7. Victor’s in-fiction departure is unknown.',
    ],
  ],
})
