import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Starblade family',
  direction: [
    ['What is ', refs.pcs.swift_starblade, '’s family history, and who became her enemy?'],
  ],
  quests: [
    refs.quests.bring_swift_s_sister_to_sylvia,
    refs.quests.who_became_swift_starblade_s_enemy,
    refs.quests.inside_swift_s_silver_container,
  ],
  plots: [
    {
      name: 'Warnings from Alberto and Sylvia',
      status: 'closed',
      npcs: [refs.npcs.alberto, refs.npcs.sylvia],
      events: [refs.events.n2_e098, refs.events.n2_e099],
    },
    {
      name: 'Bring Swift’s sister to Sylvia',
      hook: [
        [
          '',
          refs.npcs.sylvia,
          ' wants ',
          refs.npcs.swift_starblade_s_younger_sister,
          '. Where is she now?',
        ],
      ],
      npcs: [refs.npcs.swift_starblade_s_younger_sister, refs.npcs.sylvia],
    },
  ],
})
