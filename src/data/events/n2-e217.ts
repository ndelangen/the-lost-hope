import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party decodes Jim’s farewell and warning about Light',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'icon', name: 'gi/GiSecretBook' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ', ',
      refs.pcs.cassian_veyl,
      ', and ',
      refs.pcs.devan,
      ' decoded messages that ',
      refs.pcs.jim,
      ' had written on ',
      refs.items.robertos_map_pages,
      '. Personal memories supplied the cipher keys.',
    ],
    [
      'In his shared farewell, ',
      refs.pcs.jim,
      ' wrote that he had considered himself already dead when he left ',
      refs.organizations.the_eyeless_hand,
      ' and joined the ',
      refs.organizations.adventurers_guild,
      ' in defiance. Getting to know ',
      refs.organizations.beasts_and_dwarf,
      ' had given him the best days of his life. He thanked them and apologized for the damage he had caused.',
    ],
    [
      refs.pcs.jim,
      ' warned them not to trust ',
      refs.npcs.light_13th_marshal,
      ', saying that he knew more than he told the party. The letter did not establish what ',
      refs.npcs.light_13th_marshal,
      ' was hiding or whether ',
      refs.pcs.jim,
      ' was now dead.',
    ],
  ],
  illustrations: ['/assets/scenes/the-party-decodes-jim-s-farewell-and-warning-about-light.png'],
})
