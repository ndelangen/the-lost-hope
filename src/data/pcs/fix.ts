import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Fix',
  player: 'Eefiene',
  url: '',
  status: 'occasional',
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.lucky_palm,
      status: 'active',
      rank: 'Member',
    },
  ],
  secretMemberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Bounty Hunter',
    },
  ],
  notes: [
    ['A recurring adventurer.'],
    ['She travels with potion deliveries and is trusted to make official deliveries.'],
    [
      'Earlier notes referred to the player or character as “Afienna”; Fix is the confirmed character name.',
    ],
  ],
  background: [
    [
      'A bounty hunter sent by ',
      refs.organizations.the_eyeless_hand,
      ' to find ',
      refs.pcs.jim,
      '. She is actively hunting him.',
    ],
    [
      'She has a special connection to an unidentified organization of necromancers. Players suspect this connection prevented her from receiving a normal guild tattoo, and the player characters do not know about it.',
    ],
    [
      'The real reason she could not receive a guild tattoo is that she was already under the control of ',
      refs.npcs.the_father,
      ', which the tattoo of the ',
      refs.organizations.adventurers_guild,
      ' does not allow. Her fake tattoo gives her none of its protection.',
    ],
  ],
})
