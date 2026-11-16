import { useState } from 'react'

import { HAND_FONT, HandoutFonts, PRINT_FONT } from '#/components/handout/handout-fonts'
import { recipientName } from '#/components/handout/jims-letter-sheet'
import { OldPaper } from '#/components/handout/old-paper'
import { JIMS_LETTER, type LetterWords, type UnsealedLetter } from '#/lib/jims-letter'
import { cn } from '#/lib/utils'

/** The four word fields for Jim's letter; pressing Speak flags any word that opens nothing. */
export function JimsLetterWordForm({
  words,
  unsealed,
  onChange,
}: {
  words: LetterWords
  unsealed: UnsealedLetter
  onChange: (words: LetterWords) => void
}) {
  const [flagged, setFlagged] = useState(false)

  return (
    <OldPaper className="px-7 py-8 sm:px-12">
      <HandoutFonts />
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          setFlagged(true)
        }}
      >
        <h2 style={PRINT_FONT} className="text-2xl">
          Speak the words
        </h2>
        {JIMS_LETTER.sections.map((section) => {
          const word = words[section.id] ?? ''
          const open = Boolean(unsealed.sections[section.id])
          const wrong = flagged && word.trim() !== '' && !open
          return (
            <label key={section.id} className="flex flex-col gap-1">
              <span style={PRINT_FONT} className="text-lg">
                {recipientName(section)}’s word {open ? '· the ink returns' : null}
              </span>
              <input
                value={word}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => {
                  setFlagged(false)
                  onChange({ ...words, [section.id]: event.target.value })
                }}
                style={HAND_FONT}
                className={cn(
                  'h-12 rounded-md border border-[#7a5a32]/50 bg-[#fbf3df]/70 px-3 text-2xl text-[#2a1a0c] outline-none focus-visible:ring-2 focus-visible:ring-[#7a2e12]/40',
                  open && 'border-[#3f6b2a]/60',
                  wrong && 'ink-shake border-[#7a2e12]',
                )}
              />
              {wrong ? (
                <span style={PRINT_FONT} className="text-sm text-[#7a2e12] italic">
                  The ink does not stir.
                </span>
              ) : null}
            </label>
          )
        })}
        <p style={PRINT_FONT} className="text-base italic opacity-80">
          The part for all four of you returns once every word is spoken.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            style={PRINT_FONT}
            className="rounded-md bg-[#5a2a10] px-5 py-2 text-lg text-[#f6e8c8] shadow-md hover:bg-[#6e3414]"
          >
            Speak
          </button>
          <button
            type="button"
            style={PRINT_FONT}
            onClick={() => {
              setFlagged(false)
              onChange({})
            }}
            className="rounded-md border border-[#5a2a10]/60 px-5 py-2 text-lg text-[#5a2a10] hover:bg-[#5a2a10]/10"
          >
            Seal it again
          </button>
        </div>
      </form>
    </OldPaper>
  )
}
