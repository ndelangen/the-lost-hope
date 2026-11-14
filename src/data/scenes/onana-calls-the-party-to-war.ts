import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Onana calls the party to war',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.onana_tempest],
  references: [
    refs.npcs.the_father,
    refs.organizations.tempest_family,
    refs.organizations.beasts_and_dwarf,
    refs.locations.fairhaven,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.beasts.wolfie,
    refs.pcs.jim,
    refs.items.beasts_and_dwarf_s_airship,
  ],
  setup: [
    [
      'The same Tempest soldiers who once escorted the party pick them up: “Come with us, ',
      refs.organizations.beasts_and_dwarf,
      '! Not a request, I’m afraid!” A floating battle-cruiser carries them to ',
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
      ' was. Are you with me, ',
      refs.organizations.beasts_and_dwarf,
      '? Where is the rest of your party?”',
    ],
    [
      'According to ',
      refs.npcs.onana_tempest,
      ', ',
      refs.npcs.the_father,
      ' is aboard the flying fortress: “I hope he’s on there, because we’re about to bring it down.”',
    ],
  ],
  notes: [
    [
      'Attacking the fortress may be the biggest and final mistake the ',
      refs.organizations.tempest_family,
      ' makes.',
    ],
  ],
  outcomes: [
    {
      when: [['', refs.npcs.onana_tempest, ' learns they travelled with ', refs.pcs.jim, '.']],
      response: [
        [
          refs.pcs.jim,
          '’s presence and hiding brought this war to the sky islands. ',
          refs.npcs.onana_tempest,
          ' sends them away with their completed ',
          refs.items.beasts_and_dwarf_s_airship,
          ': ',
          refs.pcs.jim,
          '’s final departing gift.',
        ],
      ],
    },
    {
      when: [['', refs.pcs.cassian_veyl, ' or ', refs.pcs.devan, ' bring up reuniting the party.']],
      response: [
        [
          refs.npcs.onana_tempest,
          ' wants them gone either way, so his soldiers bring ',
          refs.pcs.swift_starblade,
          ' to the airship before it leaves.',
        ],
      ],
    },
    {
      when: [['They ask about the rest of the party.']],
      response: [['His soldiers saw a half-elf near the docks when the beam struck.']],
    },
  ],
})
