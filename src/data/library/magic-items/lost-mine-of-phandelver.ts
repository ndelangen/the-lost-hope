import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  dragonguard_lost_mine_of_phandelver: {
    name: 'Dragonguard',
    category: 'Armor',
    rarity: 'rare',
    text: [
      ['Weight · 20 lb'],
      ['You have a +1 bonus to AC while wearing this armor.'],
      [
        'This +1 breastplate has a gold dragon motif worked into its design. Created for a human hero of Neverwinter named Tergon, it grants its wearer advantage on saving throws against the breath weapons of creatures that have the dragon type.',
      ],
    ],
    publication: refs.publications.lost_mine_of_phandelver,
  },
  hew_lost_mine_of_phandelver: {
    name: 'Hew',
    category: 'Weapon',
    detail: 'Battleaxe',
    rarity: 'unknown',
    text: [
      ['Weight · 4 lb'],
      [
        "This +1 battleaxe deals maximum damage when the wielder hits a plant creature or an object made of wood. The axe's creator was a dwarf smith who feuded with the dryads of a forest where he cut firewood. Whoever carries the axe feels uneasy whenever he or she travels through a forest.",
      ],
    ],
    publication: refs.publications.lost_mine_of_phandelver,
  },
  lightbringer_lost_mine_of_phandelver: {
    name: 'Lightbringer',
    category: 'Weapon',
    detail: 'Mace',
    rarity: 'uncommon',
    text: [
      ['Weight · 4 lb'],
      [
        'This +1 mace was made for a cleric of Lathander, the god of dawn. The head of the mace is shaped like a sunburst and made of solid brass. Named Lightbringer, this weapon glows as bright as a torch when its wielder commands. While glowing, the mace deals an extra 1d6 radiant damage to undead creatures.',
      ],
    ],
    publication: refs.publications.lost_mine_of_phandelver,
  },
  spider_staff_lost_mine_of_phandelver: {
    name: 'Spider Staff',
    category: 'Staff',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'The top of this black, adamantine staff is shaped like a spider. The staff weighs 6 pounds. You must be attuned to the staff to gain its benefits and cast its spells. The staff can be wielded as a quarterstaff. It deals 1d6 extra poison damage on a hit when used to make a weapon attack.',
      ],
      [
        "The staff has 10 charges, which are used to fuel the spells within it. With the staff in hand, you can use your action to cast one of the following spells from the staff if the spell is on your class's spell list: spider climb (1 charge) or web (2 charges, spell save DC 15). No components are required.",
      ],
      [
        "The staff regains 1d6 + 4 expended charges each day at dusk. If you expend the staff's last charge, roll a d20. On a 1, the staff crumbles to dust and is destroyed.",
      ],
    ],
    publication: refs.publications.lost_mine_of_phandelver,
  },
  staff_of_defense_lost_mine_of_phandelver: {
    name: 'Staff of Defense',
    category: 'Staff',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'This slender, hollow staff is made of glass yet is as strong as oak. It weighs 3 pounds. You must be attuned to the staff to gain its benefits and cast its spells.',
      ],
      ['While holding the staff, you have a +1 bonus to your Armor Class.'],
      [
        "The staff has 10 charges, which are used to fuel the spells within it. With the staff in hand, you can use your action to cast one of the following spells from the staff if the spell is on your class's spell list: mage armor (1 charge) or shield (2 charges). No components are required.",
      ],
      [
        "The staff regains 1d6 + 4 expended charges each day at dawn. If you expend the staff's last charge, roll a d20. On a 1, the staff shatters and is destroyed.",
      ],
    ],
    publication: refs.publications.lost_mine_of_phandelver,
  },
})
