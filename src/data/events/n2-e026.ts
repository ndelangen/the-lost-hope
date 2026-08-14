import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan joins while Swift continues with the party',
  day: 8,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiTeamUpgrade' },
  notes: [
    [
      'On the last day in ',
      refs.locations.fajanet,
      ', ',
      refs.pcs.devan,
      ' joined the party while ',
      refs.pcs.swift_starblade,
      ' continued from the previous session.',
    ],
    [refs.pcs.devan, ' — Half-Orc Paladin. Session notes called him "an orc paladin."'],
    [
      refs.pcs.devan,
      ' received his ',
      refs.organizations.adventurers_guild,
      ' tattoo on his collarbone. He used his favor from ',
      refs.npcs.light_13th_marshal,
      ' to ask to be handsome and became the most handsome orc.',
    ],
    [refs.pcs.swift_starblade, ' — Half-Elf Rogue. Session notes called him "a human-elf pirate."'],
    [
      'Session notes used role descriptors before names were confirmed. Both are active roster PCs.',
    ],
  ],
})
