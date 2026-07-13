import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Monster-summoning wizards destroy Fairhaven',
  day: 14,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'gi/GiMonsterGrasp' },
  notes: [
    [
      'The festival was interrupted by an invasion unrelated to the dinosaurs connected to ',
      refs.quests.dino_migration,
      '. Wizards bearing the symbol of ',
      refs.organizations.the_eyeless_hand,
      ' summoned giant monsters into the city.',
    ],
    [
      'One recollection is that the DM said seven beholders appeared, but the exact number and creature type remain uncertain. The DM gave special attention to one wizard positioned atop an abomination.',
    ],
    [
      'With many citizens gathered for the festival, the invasion caused immediate chaos. Defenses collapsed quickly as fires spread, people died, and ',
      refs.locations.fairhaven,
      ' was devastated.',
    ],
  ],
})
