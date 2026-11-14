import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Onana calls the party to war',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.onana_tempest],
  references: [
    refs.npcs.the_father,
    refs.organizations.tempest_family,
    refs.locations.fairhaven,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.beasts.wolfie,
  ],
  setup: [
    [
      'The same Tempest soldiers who once escorted the party pick them up: “Come with us, beasts and dwarf! Not a request, I’m afraid!” A floating battle-cruiser carries them to ',
      refs.locations.nimbus,
      '.',
    ],
    [
      refs.npcs.onana_tempest,
      ' tells them ',
      refs.npcs.the_father,
      ' has escalated: supposedly an extremely high-level traitor was here. The ',
      refs.organizations.tempest_family,
      ' had cooperated, but no deal could be made, and now it is all-out war.',
    ],
    [
      '“But we’re not as defenceless or as unprepared as ',
      refs.locations.fairhaven,
      ' was. Are you with me, beasts and dwarf? Where is the rest of your party?”',
    ],
  ],
  outcomes: [
    {
      when: [['They join the Tempests.']],
      response: [
        ['', refs.npcs.onana_tempest, ' wants to know everything they know about the traitor.'],
      ],
    },
    {
      when: [['They ask about the rest of the party.']],
      response: [['His soldiers saw a half-elf near the docks when the beam struck.']],
    },
  ],
})
