import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party kills the dungeon and escapes with the green rod',
  day: 22,
  location: refs.locations.serpent_eclipse_three_door_chamber,
  mark: { type: 'icon', name: 'gi/GiFallingRocks' },
  notes: [
    [
      'The final trial token was placed on the altar, completing a three-piece octagram. Red warnings appeared and the dungeon began collapsing. ',
      refs.npcs.sarogarth,
      ' said he had already taken its central dagger, leaving it without its heart.',
    ],
    [
      refs.pcs.devan,
      ' carried the weakened ',
      refs.pcs.jim,
      ' toward the exit. ',
      refs.pcs.jim,
      ' took the ',
      refs.items.obsidian_green_rod,
      " that appeared where the dagger had been. The party escaped and heard roughly a thousand souls released in the dungeon's death scream.",
    ],
    [
      'The party was told that nobody had previously been expected to kill a dungeon. Its loss would deprive the island of a source of income.',
    ],
    [
      'Outside, ',
      refs.npcs.sarogarth,
      ' transformed ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      ' into bracelets on his wrist, giving them access to his pocket dimension.',
    ],
  ],
})
