import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Auren',
  player: 'matthieu16hollander',
  url: 'https://www.dndbeyond.com/characters/113079072',
  avatar: '/assets/pcs/auren.jpg',
  status: 'active',
  species: 'Warforged',
  class: 'Artificer / Wizard',
  subclass: 'Armorer',
  level: 5,
  languages: ['Common', 'Draconic', 'Giant'],
  notes: [['A rune carver who has studied the magic of giant runes.']],
  background: [
    ['From the player’s own backstory. The other players do not know it.'],
    [
      'Long ago Auren was Azrael Morvane, a human wizard and the apprentice of ',
      refs.npcs.magister_orrin_valdrek,
      ', a ruthless master who taught him the ancient art of rune magic and early wizardry. When the Second Great War between the dwarves and the elves broke out, his master betrayed him: to build the ultimate frontline weapon for the dwarves, he bound Azrael’s soul and mind into a heavy runic construct chassis and made him a living machine, the dwarven war machine KHAZ-THUR.',
    ],
    [
      'Carvings etched deep into his core stripped his free will and forced him to obey every command without hesitation. For years he was marched onto the bloodiest battlefields in the name of the dwarves, tearing through elven lines with his runic armour and thunderous gauntlets. He was awake behind his own eyes the whole time, watching his hands destroy a people he had no quarrel with, unable to stop.',
    ],
    [
      'When the war ended and the elves were nearly wiped out, his dwarven commanders had no further use for him. Damaged and obsolete, he was disbanded, powered down, and left to rust in ',
      refs.locations.foundry_nine,
      ', an abandoned factory in the far east of the world, a region that slowly became a desperate sanctuary for refugees fleeing the ruins of the conflict.',
    ],
    [
      'Years later ',
      refs.npcs.aeliana,
      ', a wandering elf mage, found his dormant frame in the factory. Despite the dwarven war markings on his plating she sensed the trapped, broken soul beneath the runes. Rather than destroy him for what his kind had done to her people, she shattered the binding runes on his core, repaired his body, restored his free will, and released him from the factory. She gave him his new name, Auren.',
    ],
    [
      'He is haunted by guilt for the atrocities he was forced to commit. He travels into the world’s most dangerous places with one purpose: to use the armour and magic forged for war to protect the innocent, hunt down the remnants of his master’s dark artifice, and make amends to the elves for as long as his core still beats. He calls himself the Last Bastion, the protector he has chosen to become. His enemies know him as the Iron Warden.',
    ],
    [
      'His defining thought: “I was created to obey. I was named to serve. But now, for the first time, I choose who I am.”',
    ],
    [
      'Before he joins the party he works for ',
      refs.npcs.esia,
      ' at her shipyard on ',
      refs.locations.skynet,
      ' as her test pilot and technician: he tests her airships and does the artificer work on them. The work is not steady, but he needs little, since he does not eat or sleep. That is why he is on the island, and why he knows ships well enough to jump-start the ferry.',
    ],
    [
      'Open for the DM: the backstory says the elves were nearly wiped out; the campaign so far only says they lost, and elves still live in the world.',
    ],
  ],
})
