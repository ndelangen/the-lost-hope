import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Sylvia reveals the Starblade family's bloody history",
  day: 18,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'icon', name: 'gi/GiSecretBook' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' and ',
      refs.pcs.jim,
      ' asked ',
      refs.npcs.sylvia,
      ' why she hated ',
      refs.pcs.swift_starblade,
      '.',
    ],
    [
      'Sylvia said the Starblades were a multigenerational pirate family that broke the pirate code, began an unsanctioned war for power, lost, and then burned the pirate king’s wife and children rather than accepting defeat.',
    ],
    [
      'She described Swift as a formerly good man who became a notorious plunderer. She claimed that he took her father’s ship and abducted her mother, and that he was searching for relatives scattered among islands near ',
      refs.locations.continent_of_the_dead,
      '.',
    ],
    [
      refs.npcs.sylvia,
      ' gave ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.pcs.jim,
      ' a private quest: find ',
      refs.pcs.swift_starblade,
      '’s younger sister and bring her alive to Sylvia to marry one of Sylvia’s brothers. Sylvia said the marriage would settle the dispute between their families. The sister’s name and exact whereabouts, and the identity of the intended brother, remain unconfirmed.',
    ],
    [
      'Sylvia said a special magical suit of armour can be made by collecting twelve daggers like the ',
      refs.items.dagger_of_passive_aggression,
      '. She had one such dagger and offered it for 1,000 GP.',
    ],
    [
      'Only Cassian and Jim were present for Sylvia’s account, and they are the only party members who know about the quest. At the same time, ',
      refs.pcs.swift_starblade,
      ' was talking with ',
      refs.npcs.alberto,
      ', while ',
      refs.pcs.devan,
      ' spent the night with ',
      refs.npcs.bessy,
      '.',
    ],
  ],
})
