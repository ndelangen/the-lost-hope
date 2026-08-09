import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'What Is Up with Bob the Merchant?',
  icon: 'gi/GiSkeletonInside',
  type: 'mystery',
  notes: [
    [
      'What is ',
      refs.npcs.bob_the_merchant,
      ', how does he travel and obtain his magical stock, and why must the party deny what they see?',
    ],
  ],
  status: 'open',
  clues: [
    [
      refs.events.n2_e103,
      ' — the party first met Bob during the festival in ',
      refs.locations.fajanet,
      ', where he gave every party member a different special magical dagger.',
    ],
    [
      refs.events.n2_e094,
      ' — the party later found Bob aboard ',
      refs.locations.sylvias_flying_bazaar,
      ' with an enormous stock inside the ',
      refs.beasts.mimic_chest,
      '. He could combine existing magical objects into a new item.',
    ],
    [
      refs.events.n2_e095,
      ' — Bob offered unpredictable permanent magic, altered ',
      refs.beasts.wolfie,
      ', and produced a divine contract that allowed him to locate ',
      refs.pcs.jim,
      '.',
    ],
    [
      refs.events.n2_e107,
      ' — the party saw Bob as a skeleton with blue flames in his eye sockets. When they acknowledged that appearance or called him undead, they saw a single eye staring from the abyss and time reversed by five seconds. They received a final warning to treat Bob as alive and not acknowledge what they saw.',
    ],
    [
      refs.events.n2_e108,
      ' — Bob reached ',
      refs.locations.nimbus_s_second_best_inn,
      ', took its cook, entered the kitchen, and hid the ',
      refs.items.jaded_amulet,
      ' in Jim’s pie. The inn staff described him as a normal, exceptionally handsome human man with black hair.',
    ],
    [
      'Open: what is Bob’s actual nature, why does the party perceive him differently, who or what enforces the demand to deny his skeletal form, how does he travel with or beyond his stall, where does his stock come from, and what does he ultimately want?',
    ],
  ],
  conclusion: [],
})
