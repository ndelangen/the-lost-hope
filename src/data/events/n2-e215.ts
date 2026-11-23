import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party reunites and helps rescue Nimbus residents',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'icon', name: 'gi/GiLifeBuoy' },
  illustrations: [
    '/assets/scenes/the-party-reunites-and-helps-rescue-nimbus-residents-novel.png',
    '/assets/scenes/the-party-reunites-on-the-docks.png',
  ],
  notes: [
    [
      refs.items.little_purple,
      ' reached ',
      refs.pcs.swift_starblade,
      ' at the damaged harbor. He told ',
      refs.pcs.devan,
      ' and ',
      refs.pcs.cassian_veyl,
      ' that ',
      refs.pcs.jim,
      ' was gone and his belongings had been left on the ground.',
    ],
    [
      refs.pcs.devan,
      ' helped rescue residents and fight the fires. ',
      refs.npcs.captain_garran,
      ' disembarked from the pursuing cruiser with soldiers, looking for ',
      refs.organizations.beasts_and_dwarf,
      '.',
    ],
    [
      'The party urged the troops to help the civilians, and ',
      refs.pcs.cassian_veyl,
      ' supported the appeal with Suggestion. ',
      refs.npcs.captain_garran,
      ' and his soldiers joined the rescue effort.',
    ],
  ],
})
