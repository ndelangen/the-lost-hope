import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Giggles hires the party against a rival alchemist',
  day: 13,
  location: refs.locations.mortimer_s_shop,
  mark: { type: 'icon', name: 'gi/GiFizzingFlask' },
  notes: [
    [
      'The potion-shop posting at the guildhall had been placed by ',
      refs.npcs.giggles,
      '. At ',
      refs.locations.mortimer_s_shop,
      ', the party heard most of the briefing from ',
      refs.npcs.giggles,
      '. ',
      refs.npcs.mortimer_mafioso,
      ' appeared displeased that outsiders were becoming involved.',
    ],
    [
      'That reputation gave the accusation credibility. The shop carried shapeshifting and night-vision potions. ',
      refs.npcs.mortimer_mafioso,
      ' and ',
      refs.npcs.giggles,
      ' claimed that finding the same potions or recipes at a competing shop would prove theft.',
    ],
    [
      'One uncertain recollection is that ',
      refs.npcs.giggles,
      ' also described a laughing potion that made the drinker’s head explode.',
    ],
    [
      'When the party asked around town about ',
      refs.npcs.giggles,
      ', nobody seemed to know who they meant. People instead became confused about whether they were referring to ',
      refs.locations.giggles_and_gadgets,
      ', suggesting that something unusual was going on with the goblin.',
    ],
    [
      refs.npcs.giggles,
      ' offered a suspiciously large reward if the competing shop disappeared entirely and gave the party a glass bottle of goblin excrement said to be extremely explosive.',
    ],
    [
      refs.pcs.jim,
      ' was skeptical and insisted on collecting evidence rather than simply accepting the accusation.',
    ],
    [
      refs.npcs.mortimer_mafioso,
      ' was not identified as the author of the guildhall posting; the request and destructive instructions came from ',
      refs.npcs.giggles,
      '.',
    ],
  ],
})
