import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Two new PCs join on the last day in Fajanet',
  date: new Date('2026-08-16T18:00'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaUserPlus' },
  parts: [
    ['On the last day in ', refs.locations.fajanet, ', two new PCs joined the party:'],
    [refs.pcs.devan, ' — Half-Orc Paladin. Session notes called him "an orc paladin."'],
    [refs.pcs.swift_starblade, ' — Half-Elf Rogue. Session notes called him "a human-elf pirate."'],
    "The player's session-12 account used role descriptors before names were confirmed. Both are active roster PCs.",
  ],
})
