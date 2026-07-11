import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'World',
  icon: 'gi/GiWorld',
  notes: [
    ['The campaign world of The Lost Hope, with a typical medieval-fantasy character.'],
    [
      'Dwarven technology exists but is generally available only to the wealthy; most people live simple lives.',
    ],
  ],
})
