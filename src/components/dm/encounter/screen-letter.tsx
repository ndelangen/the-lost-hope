/** The letter an unnamed enemy carries on the player screen, so the DM knows who players mean. */
export function ScreenLetter({ letter }: { letter: string | undefined }) {
  if (!letter) return null
  return (
    <span
      title={`Shown to players as ${letter}`}
      className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-red-700 px-1 text-sm font-bold text-white"
    >
      {letter}
    </span>
  )
}
