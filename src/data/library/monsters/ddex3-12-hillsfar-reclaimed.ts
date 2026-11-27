import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_12_hillsfar_reclaimed,
  monsters: {
    fiendish_doppelganger: {
      name: 'Fiendish Doppelganger',
      tags: ['shapechanger'],
      alignment: 'neutral evil',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'monstrosity',
        cr: '3',
        ac: 14,
        hitDice: '8d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 18, con: 14, int: 11, wis: 12, cha: 14 },
        skills: { deception: 'expert', insight: 'proficient' },
        senses: { darkvision: 60 },
        conditionImmunities: [rules.charmed],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed. It reverts to its true form if it dies.',
            ],
          },
          {
            key: 'ambusher',
            name: 'Ambusher',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The doppelganger has advantage on attack rolls against any creature it has surprised.',
            ],
          },
          {
            key: 'surprise-attack',
            name: 'Surprise Attack',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra ',
              { roll: '3d6' },
              ' damage from the attack.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The doppelganger makes two melee attacks.'],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'read-thoughts',
            name: 'Read Thoughts',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The doppelganger magically reads the surface thoughts of one creature within 60 feet of it. The effect can penetrate barriers, but 3 feet of wood or dirt, 2 feet of stone, 2 inches of metal, or a thin sheet of lead blocks it. While the target is in range, the doppelganger can continue reading its thoughts, as long as the doppelganger’s concentration isn’t broken (as if concentrating on a spell). While reading the target’s mind, the doppelganger has advantage on Wisdom (Insight) and Charisma (Deception, Intimidation, and Persuasion) checks against the target.',
            ],
          },
        ],
      },
    },
  },
})
