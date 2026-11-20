/**
 * The running fight's turn order as the players may see it: who acts in which order and whose turn
 * it is. Enemies the party has not met get a letter, never a name, and nobody's HP is shown beyond
 * an enemy being bloodied. Enemies out of the fight leave the list.
 */

export type TurnOrderInput = {
  id: string
  side: 'party' | 'enemy'
  name: string
  avatar?: string
  /** Whether the party has met this record, so naming it gives nothing away. */
  met: boolean
  hp?: number
  maxHp?: number
  out: boolean
}

export type TurnOrderRow = {
  id: string
  side: 'party' | 'enemy'
  label: string
  avatar?: string
  current: boolean
  bloodied: boolean
}

/** A, B, … Z, then AA, AB, … for the n-th unnamed enemy, counted from 0. */
export function enemyLetter(index: number): string {
  const letter = String.fromCharCode(65 + (index % 26))
  return index < 26 ? letter : enemyLetter(Math.floor(index / 26) - 1) + letter
}

/**
 * The letter of each enemy the party has not met, by combatant id, in turn order. Letters stay put
 * when an enemy falls, so players keep track of which is which.
 */
export function enemyLetters(combatants: readonly TurnOrderInput[]): ReadonlyMap<string, string> {
  const hidden = combatants.filter((combatant) => combatant.side === 'enemy' && !combatant.met)
  return new Map(hidden.map((combatant, index) => [combatant.id, enemyLetter(index)]))
}

export function playerTurnOrder(
  combatants: readonly TurnOrderInput[],
  active: string | undefined,
): TurnOrderRow[] {
  const letters = enemyLetters(combatants)
  return combatants.flatMap((combatant) => {
    const letter = letters.get(combatant.id)
    const hidden = letter !== undefined
    if (combatant.out && combatant.side === 'enemy') return []
    return [
      {
        id: combatant.id,
        side: combatant.side,
        label: letter ?? combatant.name,
        avatar: hidden ? undefined : combatant.avatar,
        current: combatant.id === active,
        bloodied:
          combatant.side === 'enemy' &&
          combatant.hp !== undefined &&
          combatant.maxHp !== undefined &&
          combatant.hp <= combatant.maxHp / 2,
      },
    ]
  })
}
