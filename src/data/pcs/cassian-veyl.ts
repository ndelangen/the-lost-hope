import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Cassian Veyl',
  player: 'Jareign',
  url: 'https://www.dndbeyond.com/characters/167740681',
  avatar: '/assets/pcs/cassian.jpg',
  status: 'active',
  species: 'Sheep-like humanoid',
  class: 'Warlock',
  subclass: 'Great Old One Patron',
  level: 5,
  combat: { ac: 16, maxHp: 43, passivePerception: 13, spellSaveDc: 15 },
  languages: ['Sylvan', 'Undercommon'],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'active',
      rank: 'Member',
    },
  ],
  notes: [
    ['Can understand and answer ', refs.beasts.wolfie, ' in wolf speech.'],
    [
      'Cassian asked ',
      refs.npcs.light_13th_marshal,
      ' to use his guild favor to cure his lactose intolerance and believed the favor had been fulfilled. The condition remains; Light has not yet delivered the cure.',
    ],
    [
      'A new adventurer who had only just met ',
      refs.npcs.light_13th_marshal,
      ' before signing a contract to watch over ',
      refs.organizations.beasts_and_dwarf,
      ' and prevent further deaths.',
    ],
  ],
  background: [
    ['From the player’s own backstory. The other players do not know it.'],
    [
      'Cassian, 39, was once a charming fraud: a tavern medium, spiritual consultant, and seller of comforting lies. He told grieving widows what they wanted to hear, read fortunes from marked cards, and forged ancestral records for people desperate to feel important.',
    ],
    [
      'During one of his fake séances, something answered. Since that night he has heard the Voice Behind the Veil, a calm, ancient presence that speaks through dreams, reflections, and half-formed thoughts. He follows it instead of any formal faith and believes it is a benevolent mentor guiding him toward a greater purpose. He is probably wrong.',
    ],
    [
      'He still tells people what they need to hear, but sometimes the lies come true. He lies too easily when he thinks it will help, and often mistakes manipulation for kindness. He believes people deserve comfort, hope, and the truth, though not always in that order.',
    ],
    [
      'He carries a small, smooth stone whose pale natural lines resemble a tiny map, etched with G on top, Q below, C on the left, and V on the right. His old mentor Gamora Quill, a traveling fraud and false medium, gave it to him after his first truly successful con. She told him that a map is just a story people agree to believe, but roads, towns, and people are real, and he should not forget the difference.',
    ],
    [
      'Allies: former clients who still believe he helped them, and a few tavern owners who remember him fondly. He was once tied to traveling tavern performers, false mediums, and small-time confidence artists.',
    ],
    [
      'Enemies: former victims of his false medium act, occult scholars who suspect his visions are real, and anyone who knows one of his old aliases.',
    ],
  ],
})
