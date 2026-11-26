/**
 * The running fight's turn order as the players may see it: who acts in which order and whose turn
 * it is. Every enemy has a letter, so the table can say "B is down"; enemies the party has not met
 * show only their letter, never a name. Nobody's HP is shown beyond an enemy being bloodied.
 * Enemies out of the fight leave the list.
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
  /** A named enemy's letter, shown beside its name. An unnamed enemy's label is its letter. */
  letter?: string
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
 * The letter of each enemy, by combatant id, in turn order, named or not. Letters stay put when an
 * enemy falls, so the table keeps track of which is which.
 */
export function enemyLetters(combatants: readonly TurnOrderInput[]): ReadonlyMap<string, string> {
  const enemies = combatants.filter((combatant) => combatant.side === 'enemy')
  return new Map(enemies.map((combatant, index) => [combatant.id, enemyLetter(index)]))
}

export function playerTurnOrder(
  combatants: readonly TurnOrderInput[],
  active: string | undefined,
): TurnOrderRow[] {
  const letters = enemyLetters(combatants)
  return combatants.flatMap((combatant) => {
    const letter = letters.get(combatant.id)
    const hidden = combatant.side === 'enemy' && !combatant.met
    if (combatant.out && combatant.side === 'enemy') return []
    return [
      {
        id: combatant.id,
        side: combatant.side,
        label: hidden && letter ? letter : combatant.name,
        ...(letter && !hidden ? { letter } : {}),
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
