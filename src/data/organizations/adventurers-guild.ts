import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: "Adventurers' Guild",
  icon: 'gi/GiCrossedSwords',
  notes: [
    ['A guild that recruits wandering heroes and sends them on adventures.'],
    ['A recognized regional authority whose membership tattoos can serve as credentials.'],
    ['The guild in ', refs.locations.fajanet, ' is led by ', refs.npcs.light_13th_marshal, '.'],
    [
      'Each recruit is inducted with a guild-mark tattoo and granted a single favor from the guildmaster.',
    ],
    ['The guild tattoo depicts a grim reaper strangling a shadow.'],
  ],
  background: [
    [
      'The guild is real, runs real adventures, and spreads the influence of ',
      refs.npcs.light_13th_marshal,
      ' a little. That is the public front. The front is a test and a filter. The real organization lies underneath it.',
    ],
    [
      'Through the guild Light looks for people who can align with him: people willing to do a temporary evil, working against peace, so that he can then do a very great evil and end Arcane Dust for good. He needs them in the right places, to help keep the world balanced at the moment he stops writing and to make sure no united front forms against him.',
    ],
    [
      'The guild tattoo is how Light makes sure that only he writes a member’s thoughts and dreams. It is a record of the member written on the body, so it resists getting lost, and ',
      refs.npcs.the_father,
      ' cannot write in a tattooed member or bring one under his control.',
    ],
    [
      'The protection lasts only as long as the tattoo does. Once the tattooed flesh is cut away, the member can be written in like anyone else. That is the one way past it, and it gives ',
      refs.organizations.the_eyeless_hand,
      ' a reason to take members alive.',
    ],
  ],
})
