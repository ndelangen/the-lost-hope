import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Jim',
  player: 'norbertdlangen',
  url: 'https://www.dndbeyond.com/characters/159958003',
  avatar: '/assets/pcs/jim.jpg',
  status: 'active',
  species: 'Human (formerly disguised as a Kenku)',
  class: 'Bard / Sorcerer',
  subclass: 'College of Tragedy',
  level: 5,
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'former',
      rank: 'Finger',
    },
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'active',
      rank: 'Founder',
    },
  ],
  notes: [
    [
      'Jim is a human who hid as a kenku, on the run from both the law and ',
      refs.organizations.the_eyeless_hand,
      ', the guild he betrayed. ',
      refs.pcs.devan,
      ', ',
      refs.pcs.cassian_veyl,
      ', and ',
      refs.pcs.swift_starblade,
      ' learned his human identity and saw him without the kenku suit on ',
      refs.locations.nimbus,
      '.',
    ],
    [
      'Secret: Jim knows the true identity of ',
      refs.npcs.the_father,
      ' — likely why the Hand wants him back or dead.',
    ],
    [
      'He bears an ',
      refs.organizations.the_eyeless_hand,
      ' mark in an undisclosed location (separate from his tongue guild-mark).',
    ],
    [
      'Source-of-truth split: this file is canonical for fiction (the former kenku disguise and secrets); the D&D Beyond sheet is canonical for rules (Human, Bard/Sorcerer, College of Tragedy). When they conflict, the sheet wins for mechanics and this file wins for fiction.',
    ],
    [
      refs.pcs.fix,
      ' knows that Jim is his real name but has not learned his face or species. Why the law wants him remains hidden from the party.',
    ],
    [
      'Jim checks ',
      refs.items.robertos_map_pages,
      ' each evening when he is alone to look for new messages.',
    ],
    ['Jim carries party items when no other individual holder is identified.'],
    ['His Sorcerer origin/bloodline has not been disclosed.'],
    [
      'DM note: Jim’s human identity remains secret outside Devan, Cassian, and Swift unless the player says otherwise.',
    ],
    ['Ryan’s first notes described him as a quiet kenku bard.'],
  ],
})
