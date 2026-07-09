import { refs } from '#/data/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Jim',
  player: 'norbertdlangen',
  url: 'https://www.dndbeyond.com/characters/159958003',
  avatar: '/assets/pcs/jim.jpg',
  status: 'active',
  species: 'Human (rules) / Kenku (in-fiction appearance)',
  class: 'Bard / Sorcerer',
  summary:
    'Bard (College of Tragedy, TCSR) — flavor leans into grim, performative, tragic-hero roleplay.',
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
  ],
  notes: [
    [
      'Secret: Jim is a human hiding as a kenku, on the run from both the law and ',
      refs.organizations.the_eyeless_hand,
      ', the guild he betrayed. Nobody in the party knows.',
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
    'Source-of-truth split: this file is canonical for fiction (the kenku disguise and secrets); the D&D Beyond sheet is canonical for rules (Human, Bard/Sorcerer, College of Tragedy). When they conflict, the sheet wins for mechanics and this file wins for fiction.',
    "Still hidden from everyone: Jim's real name, face, and species, and why the law wants him.",
    'His Sorcerer origin/bloodline has not been disclosed.',
    'DM note: keep the disguise secret unless the player says otherwise.',
  ],
})
