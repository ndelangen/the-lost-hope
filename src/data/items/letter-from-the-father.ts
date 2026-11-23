import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Letter from the Father',
  icon: 'gi/GiWaxSeal',
  currentOwner: null,
  carriedBy: null,
  craftedBy: refs.npcs.the_father,
  notes: [
    [
      'A recovered fragment. The ink is clean and the handwriting precise. It carries no signature beyond the title.',
    ],
    ['To the Eyes, the Fingers, and those who still understand silence,'],
    ['The situation regarding ', refs.pcs.jim, ' has escalated beyond simple utility.'],
    [
      'He is no longer to be considered a traveling asset or an informant with influence potential.',
    ],
    ['He is now a required recovery priority.'],
    ['Do not misunderstand this order as sentiment.'],
    ['It is structure.'],
    [
      refs.pcs.jim,
      ' must be returned intact, and without unnecessary damage to his ability to function within society. If he resists, restraint is acceptable. Excess is not.',
    ],
    ['We are not correcting a mistake.'],
    ['We are preserving a resource that has begun to attract external attention.'],
    [
      'There are indications that other powers—both mortal and otherwise—are attempting to reach him.',
    ],
    ['This cannot be allowed to continue.'],
    ['The Hand does not lose what it has already accounted for.'],
    [
      'If necessary, deploy Eyes authorization tiers to ensure retrieval is completed without delay. If conventional means fail, escalate.',
    ],
    ['But remember:'],
    ['Break the vessel, and you lose the contents.'],
    ['And the contents are what matters.'],
    ['Return him.'],
    ['— ', refs.npcs.the_father],
  ],
  background: [
    [
      'Addressed to ',
      refs.organizations.the_eyeless_hand,
      '. It is the reasoning behind ',
      refs.items.the_hand_s_directive_on_jim,
      '.',
    ],
  ],
})
