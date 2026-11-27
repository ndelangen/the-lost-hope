import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.domains_of_delight,
  monsters: {
    yarnspinner: {
      name: 'Yarnspinner',
      tags: ['archfey'],
      alignment: 'lawful good',
      languages: ['Common', 'Druidic', 'Sylvan'],
      stats: {
        size: 'huge',
        type: 'fey',
        cr: '10',
        ac: 16,
        armor: 'natural armor',
        hitDice: '12d12',
        speed: { walk: 40, climb: 40 },
        scores: { str: 24, dex: 16, con: 21, int: 18, wis: 21, cha: 19 },
        saves: { con: 'proficient', wis: 'proficient', cha: 'proficient' },
        skills: { perception: 'expert', stealth: 'proficient' },
        senses: { truesight: 120 },
        conditionImmunities: [rules.charmed, rules.frightened],
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            text: [
              'Yarnspinner casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save ',
              { dc: 'wis' },
              '): At will: ',
              refs.spells.faerie_fire_srd_5_1,
              ', ',
              refs.spells.speak_with_animals_srd_5_1,
              '; 2/day each: ',
              refs.spells.animal_friendship_srd_5_1,
              ', ',
              refs.spells.create_food_and_water_srd_5_1,
              ', ',
              refs.spells.revivify_srd_5_1,
              '; 1/day each: ',
              refs.spells.awaken_srd_5_1,
              ' (as an action), ',
              refs.spells.pass_without_trace_srd_5_1,
            ],
          },
          {
            key: 'fey-rebirth',
            name: 'Fey Rebirth',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If Yarnspinner dies in his Domain of Delight, he revives with all his hit points 1d4 days later in a safe location in that domain.',
            ],
          },
          {
            key: 'legendary-resistance',
            name: 'Legendary Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['If Yarnspinner fails a saving throw, he can choose to succeed instead.'],
            uses: 3,
            recharge: 'Long rest',
          },
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'Yarnspinner can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
            ],
          },
          {
            key: 'web-walker',
            name: 'Web Walker',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['Yarnspinner ignores movement restrictions caused by webbing.'],
          },
          {
            key: 'web-weaver',
            name: 'Web Weaver',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: [
              'Yarnspinner can take 1 minute to craft one of the following structures out of webbing: A 3-inch-thick, opaque wall of webbing consisting of up to three 10-foot-square sections, each of which must be anchored on at least two sides by other walls or surfaces. Each section has AC 12; 20 hit points; vulnerability to fire damage; and immunity to bludgeoning, poison, and psychic damage. A hut small enough to fit in a 10-foot cube. The hut comes with a closable door and a comfortable bed made of webbing, sized for a Tiny, Small, or Medium creature. A message consisting of no more than twenty-five characters, anchored at various points so it hangs in the air.',
            ],
            uses: 3,
            recharge: 'Long rest',
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Yarnspinner makes two ',
              { ability: 'bite' },
              ' attacks and uses ',
              { ability: 'spellcasting' },
              ' or Web once.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [
                { dice: '3d6', type: rules.piercing, addModifier: true },
                { dice: '2d10', type: rules.poison },
              ],
            },
          },
          {
            key: 'web',
            name: 'Web',
            timing: 'action',
            icon: 'gi/GiSpiderWeb',
            text: [
              'Yarnspinner shoots webbing at one creature he can see within 120 feet of himself. The target must succeed on a ',
              { dc: 'wis', save: 'str' },
              ' Strength saving throw or be ',
              rules.restrained,
              ' for 1 hour. The target can repeat the save at the end of each of its turns, ending the effect on itself on a success.',
            ],
          },
        ],
      },
    },
  },
})
