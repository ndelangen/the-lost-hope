import { gain, ownedCreature, raise, withLevels } from '#/lib/owned-creature'

/** Levna Drakehorn, a sidekick: the stat block the book gives at each level from 1st to 11th. */
export default ownedCreature({
  follows: { by: 'class', of: 'Sidekick' },
  levels: { min: 1, max: 11 },
  stats: (printed, owner) => ({
    ...withLevels(printed, owner.level, [
      {
        level: 2,
        change: gain({
          key: 'second-wind',
          name: 'Second Wind',
          timing: 'bonus action',
          icon: 'gi/GiMagicSwirl',
          text: [
            "Levna can use a bonus action on her turn to regain hit points equal to 1d10 + her level. Once she uses this feature, she can't use it again until she finishes a short or long rest.",
          ],
        }),
      },
      {
        level: 3,
        change: gain({
          key: 'improved-critical',
          name: 'Improved Critical',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: ["Levna's attack rolls now score a critical hit on a roll of 19 or 20 on the d20."],
        }),
      },
      { level: 4, change: raise({ str: 2 }) },
      {
        level: 5,
        change: (stats) => ({ ...stats, printed: { ...stats.printed, proficiencyBonus: 3 } }),
      },
      {
        level: 6,
        change: gain({
          key: 'extra-attack',
          name: 'Extra Attack',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: [
            'Levna can attack twice, instead of once, whenever she takes the Attack action on her turn.',
          ],
        }),
      },
      {
        level: 7,
        change: gain({
          key: 'battle-readiness',
          name: 'Battle Readiness',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: ['Levna has advantage on initiative rolls.'],
        }),
      },
      { level: 8, change: raise({ str: 2 }) },
      {
        level: 9,
        change: (stats) => ({ ...stats, printed: { ...stats.printed, proficiencyBonus: 4 } }),
      },
      { level: 10, change: (stats) => ({ ...stats, ac: stats.ac + 1 }) },
      {
        level: 11,
        change: gain({
          key: 'indomitable',
          name: 'Indomitable',
          timing: 'trait',
          icon: 'gi/GiPaw',
          text: [
            "Levna can reroll a saving throw that she fails, but she must use the new roll. Once she uses this feature, she can't use it again until she finishes a long rest.",
          ],
        }),
      },
    ]),
    // One hit die more than its level, as the book's table gives.
    hitDice: `${owner.level + 1}d8`,
  }),
})
