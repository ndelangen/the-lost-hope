import { Check, Lock } from 'lucide-react'

import { recipientName } from '#/components/handout/jims-letter-sheet'
import { useJimsLetterWords, useUnsealedLetter } from '#/components/handout/use-jims-letter-words'
import { JIMS_LETTER } from '#/lib/jims-letter'
import { cn } from '#/lib/utils'

/**
 * The players' words for Jim's letter, typed from the DM's dock while the letter is on the player
 * screen. Each part of the letter opens there live as its word is right.
 */
export function JimsLetterWordsControl() {
  const [words, setWords] = useJimsLetterWords()
  const unsealed = useUnsealedLetter(words)

  return (
    <section aria-label="Words for Jim’s letter" className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Players’ words
        </h3>
        <button
          type="button"
          onClick={() => setWords({})}
          disabled={Object.values(words).every((word) => !word)}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Lock className="size-3.5" aria-hidden />
          Seal it again
        </button>
      </div>
      {JIMS_LETTER.sections.map((section) => {
        const open = Boolean(unsealed.sections[section.id])
        const name = recipientName(section)
        return (
          <label key={section.id} className="flex h-9 items-center gap-2">
            <span className="w-16 shrink-0 truncate text-xs font-medium">{name}</span>
            <input
              value={words[section.id] ?? ''}
              autoComplete="off"
              spellCheck={false}
              placeholder={`${name}’s word`}
              onChange={(event) => setWords({ ...words, [section.id]: event.target.value })}
              className={cn(
                'border-border bg-background h-9 min-w-0 flex-1 rounded-md border px-2 text-sm outline-none focus-visible:ring-2',
                open && 'border-emerald-600',
              )}
            />
            <span className="grid w-5 shrink-0 place-items-center" aria-live="polite">
              {open ? (
                <Check className="size-4 text-emerald-600" aria-label={`${name}’s part is open`} />
              ) : null}
            </span>
          </label>
        )
      })}
      <p className="text-muted-foreground text-xs">
        {unsealed.shared
          ? 'All four words are right, so the shared part is open too.'
          : 'The part for all four opens once every word is right.'}
      </p>
    </section>
  )
}
