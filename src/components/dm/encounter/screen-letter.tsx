/**
 * The letter every enemy carries, here and on the player screen, so the DM and players can say
 * "B is down". Enemies the party hasn't met show players only this letter.
 */
export function ScreenLetter({ letter }: { letter: string | undefined }) {
  if (!letter) return null
  return (
    <span
      title={`Enemy ${letter} on the player screen`}
      className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-red-700 px-1 text-sm font-bold text-white"
    >
      {letter}
    </span>
  )
}
