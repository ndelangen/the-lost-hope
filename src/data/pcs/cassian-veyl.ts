import { refs } from '#/data/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Cassian Veyl',
  player: 'Jareign',
  url: '',
  avatar: '/assets/pcs/cassian.jpg',
  status: 'active',
  species: 'Human',
  class: 'Warlock',
  subclass: 'Great Old One Patron',
  level: 4,
  notes: [
    'Stub — needs player input: personality, appearance, and any in-fiction secrets once more session notes come in.',
    [
      'Session 12 (mountain top): ',
      refs.events.n2_e031,
      ' — one of the party members who answered the zone of truth.',
    ],
  ],
})
