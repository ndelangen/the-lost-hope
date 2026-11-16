import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Warius',
  player: 'matthieu16hollander',
  url: 'https://www.dndbeyond.com/characters/113079072',
  status: 'active',
  species: 'Warforged',
  class: 'Artificer / Wizard',
  subclass: 'Armorer',
  level: 5,
  combat: { ac: 20, maxHp: 79, passivePerception: 14, spellSaveDc: 14 },
  languages: ['Common', 'Draconic', 'Giant'],
  notes: [['A rune carver who has studied the magic of giant runes.']],
  background: [
    ['From the player’s own backstory. The other players do not know it.'],
    [
      'Long ago Warius was the apprentice of a ruthless master who taught him the ancient art of rune magic and early wizardry. When the Second Great War between the dwarves and the elves broke out, his master betrayed him: to build the ultimate frontline weapon for the dwarves, he bound Warius’s soul and mind into a heavy runic construct chassis and made him a living machine.',
    ],
    [
      'Carvings etched deep into his core stripped his free will and forced him to obey every command without hesitation. For years he was marched onto the bloodiest battlefields in the name of the dwarves, tearing through elven lines with his runic armour and thunderous gauntlets. He was awake behind his own eyes the whole time, watching his hands destroy a people he had no quarrel with, unable to stop.',
    ],
    [
      'When the war ended and the elves were nearly wiped out, his dwarven commanders had no further use for him. Damaged and obsolete, he was disbanded, powered down, and left to rust in an abandoned factory in the far east of the world, a region that slowly became a desperate sanctuary for refugees fleeing the ruins of the conflict.',
    ],
    [
      'Years later Aeliana, a wandering elf mage, found his dormant frame in the factory. Despite the dwarven war markings on his plating she sensed the trapped, broken soul beneath the runes. Rather than destroy him for what his kind had done to her people, she shattered the binding runes on his core, repaired his body, restored his free will, and released him from the factory.',
    ],
    [
      'He is haunted by guilt for the atrocities he was forced to commit. He travels into the world’s most dangerous places with one purpose: to use the armour and magic forged for war to protect the innocent, hunt down the remnants of his master’s dark artifice, and make amends to the elves for as long as his core still beats.',
    ],
    [
      'Open for the DM: his master and the factory have no names yet, and how he joins the party is not settled. The backstory says the elves were nearly wiped out; the campaign so far only says they lost, and elves still live in the world.',
    ],
  ],
})
