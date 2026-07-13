import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Theron',
  player: 'Felicity',
  url: '',
  avatar: 'https://www.dndbeyond.com/avatars/52821/990/1581111423-155753427.jpeg',
  status: 'retired',
  species: 'Human',
  class: 'Druid',
  subclass: 'Circle of Wildfire',
  level: 5,
  notes: [
    [
      'Came from ',
      refs.locations.verdant_haven,
      ' across the ',
      refs.locations.sea_of_unknown,
      '.',
    ],
  ],
})
