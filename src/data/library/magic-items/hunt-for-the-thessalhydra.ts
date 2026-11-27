import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  winters_dark_bite: {
    name: "Winter's Dark Bite",
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'uncommon',
    text: [
      ['Weight · 6 lb'],
      ['You have a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        'This greatsword is made of an unknown black metal. In most cases, it works as a +1 greatsword. But when used against a thessalhydra, it works as a +3 greatsword. While in the Upside Down, it works as a +4 greatsword.',
      ],
    ],
    publication: refs.publications.hunt_for_the_thessalhydra,
  },
})
