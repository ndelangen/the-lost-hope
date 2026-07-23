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
      ', ',
      refs.pcs.devan,
      ', and ',
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
      'Sylvia said Swift’s sister was probably with one of Sylvia’s brothers and promised to spare her if the party brought her back alive. The relatives’ names, exact locations, and the reliability of Sylvia’s account remain unconfirmed.',
    ],
  ],
})
