/**
 * The running fight's turn order as the players may see it: who acts in which order and whose turn
 * it is. Enemies the party has not met are numbered, never named, and nobody's HP is shown beyond
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

export function playerTurnOrder(
  combatants: readonly TurnOrderInput[],
  active: string | undefined,
): TurnOrderRow[] {
  let unknown = 0
  return combatants.flatMap((combatant) => {
    const hidden = combatant.side === 'enemy' && !combatant.met
    // Numbers stay put when an enemy falls, so players keep track of which is which.
    if (hidden) unknown += 1
    if (combatant.out && combatant.side === 'enemy') return []
    return [
      {
        id: combatant.id,
        side: combatant.side,
        label: hidden ? `Enemy ${unknown}` : combatant.name,
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
