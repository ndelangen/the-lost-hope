import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { all, gain, ownedCreature, raise, withLevels } from '#/lib/owned-creature'

const { rules } = campaignRefs

/** Iriad, a sidekick: the stat block the book gives at each level from 1st to 11th. */
export default ownedCreature({
  follows: { by: 'class', of: 'Sidekick' },
  levels: { min: 1, max: 11 },
  stats: (printed, owner) => ({
    ...withLevels(printed, owner.level, [
      {
        level: 2,
        change: gain({
          key: 'cunning-action',
          name: 'Cunning Action',
          timing: 'bonus action',
          icon: 'gi/GiMagicSwirl',
          text: [
            "On Iriad's turn in combat, she can take the Dash, Disengage, or Hide action as a bonus action.",
          ],
        }),
      },
      {
        level: 3,
        change: (stats) => ({
          ...stats,
          skills: { ...stats.skills, stealth: 'expert', survival: 'expert' },
        }),
      },
      { level: 4, change: all(raise({ dex: 2 }), (stats) => ({ ...stats, ac: stats.ac + 1 })) },
      {
        level: 5,
        change: (stats) => ({ ...stats, printed: { ...stats.printed, proficiencyBonus: 3 } }),
      },
      {
        level: 6,
        change: gain({
          key: 'coordinated-strike',
          name: 'Coordinated Strike',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: [
            'When Iriad uses her Helpful feature to aid an ally in attacking a creature, that target can be up to 30 feet away from her, and she can deal an extra 2d6 damage to it the next time she hits it with an attack roll before the end of the current turn. The extra damage is the same type of damage dealt by the attack.',
          ],
        }),
      },
      {
        level: 7,
        change: gain({
          key: 'evasion',
          name: 'Evasion',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: [
            "When Iriad is subjected to an effect that allows her to make a Dexterity saving throw to take only half damage, she instead takes no damage if she succeeds on the saving throw, and only half damage if she fails. Iriad doesn't benefit from this feature while ",
            rules.incapacitated,
            '.',
          ],
        }),
      },
      { level: 8, change: raise({ str: 1, wis: 1 }) },
      {
        level: 9,
        change: (stats) => ({ ...stats, printed: { ...stats.printed, proficiencyBonus: 4 } }),
      },
      { level: 10, change: all(raise({ dex: 2 }), (stats) => ({ ...stats, ac: stats.ac + 1 })) },
      {
        level: 11,
        change: gain({
          key: 'inspiring-help',
          name: 'Inspiring Help',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: [
            "When Iriad takes the Help action, the creature who receives the help also gains a 1d6 bonus to the d20 roll. If that roll is an attack roll, the creature can forgo adding the bonus to it, and then if the attack hits, the creature can add the bonus to the attack's damage roll against one target.",
          ],
        }),
      },
    ]),
    // One hit die more than its level, as the book's table gives.
    hitDice: `${owner.level + 1}d8`,
  }),
})
