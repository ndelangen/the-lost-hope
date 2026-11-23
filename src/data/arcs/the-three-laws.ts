import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Three Laws',
  icon: 'gi/GiImprisoned',
  direction: [
    [
      'A nation under the sea, bred as an army and bound by three laws. Can the party find what the laws of ',
      refs.npcs.the_11th_marshal,
      ' do not say?',
    ],
  ],
  notes: [
    [
      'Loopholes the players might find, among others. A person carried out asleep took no action to leave. A soldier the Marshal orders out to war may go, and no law says they must come back. Saving the Marshal from harm outside its waters puts the First Law above the Third.',
    ],
    [
      'Where do the Marshal’s waters end? Is an airship above them still inside? Judge each case by what the person does and what they know.',
    ],
    [
      'The laws hold while the Marshal rests, and nobody watches the gaps. It may only find out when it calls its army and hears how few answer.',
    ],
  ],
  plots: [
    {
      name: 'A fleet on an empty sea',
      hook: [
        [
          'Over open ocean, the party spots a fishing fleet of strange iron ships. Do they go down with it?',
        ],
      ],
      scene: refs.scenes.a_fleet_on_an_empty_sea,
    },
    {
      name: 'Would you wish to leave?',
      hook: [
        [
          'The people of ',
          refs.locations.the_caves_of_steel,
          ' fall silent when asked if they would wish to leave. Who works out why?',
        ],
      ],
      npcs: [refs.npcs.caves_of_steel_fisher],
    },
    {
      name: 'Loopholes in the laws',
      hook: [['The laws are exact words. Can the party get someone out without breaking them?']],
    },
    {
      name: 'The Marshal’s table',
      hook: [
        [
          'Besides their own food, the fleet hunts sentient sea creatures for ',
          refs.npcs.the_11th_marshal,
          '. Does the party see what is in the nets?',
        ],
      ],
    },
    {
      name: 'Never in person',
      hook: [
        [
          refs.npcs.the_11th_marshal,
          ' never comes itself. It sends a mind-controlled minion. Who speaks for it when the party draws its attention?',
        ],
      ],
    },
  ],
})
