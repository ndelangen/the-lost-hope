import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { InkReveal } from '#/components/handout/ink-reveal'
import { OldPaper } from '#/components/handout/old-paper'
import { SealedScrawl } from '#/components/handout/sealed-scrawl'
import { resolveRef } from '#/lib/campaign'
import { normalizePassword, sealedLength, unsealText } from '#/lib/sealed-text'
import { cn } from '#/lib/utils'

import { JIMS_LETTER, type LetterSection } from './-jims-letter'

const HANDWRITING_FONTS =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=IM+Fell+English:ital@0;1&display=swap'

export const Route = createFileRoute('/letters/jim')({
  head: () => ({
    meta: [
      { title: 'A letter from Jim | The Lost Hope' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: HANDWRITING_FONTS },
    ],
  }),
  component: JimsLetterPage,
})

const HAND = { fontFamily: "'Caveat', cursive" }
const PRINT = { fontFamily: "'IM Fell English', Georgia, serif" }

type Attempt = 'idle' | 'wrong'

function recipientName(section: LetterSection): string {
  return resolveRef(section.recipient)?.data.name.split(' ')[0] ?? section.id
}

/** Jim's sealed farewell letter: speaking each recipient's word brings that passage's ink back. */
function JimsLetterPage() {
  const [words, setWords] = useState<Record<string, string>>({})
  const [unsealed, setUnsealed] = useState<Record<string, string>>({})
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({})
  const [finale, setFinale] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  async function tryWord(section: LetterSection, word: string, announceWrong: boolean) {
    if (unsealed[section.id] || normalizePassword(word).length === 0) return
    const text = await unsealText(section.sealed, word)
    if (text === null) {
      // Quiet checks while typing never clear a wrong answer the reader asked about.
      if (announceWrong) setAttempts((current) => ({ ...current, [section.id]: 'wrong' }))
      return
    }
    setAttempts((current) => ({ ...current, [section.id]: 'idle' }))
    setUnsealed((current) => ({ ...current, [section.id]: text }))
    sectionRefs.current[section.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Typing the right word is enough; a short pause avoids testing every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      for (const section of JIMS_LETTER.sections) {
        const word = words[section.id]
        if (word) void tryWord(section, word, false)
      }
    }, 400)
    return () => clearTimeout(timer)
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  const allSpoken = JIMS_LETTER.sections.every((section) => unsealed[section.id])
  useEffect(() => {
    if (!allSpoken || finale !== null) return
    const key = JIMS_LETTER.sections.map((section) => words[section.id] ?? '').join('')
    void unsealText(JIMS_LETTER.finale.sealed, key).then((text) => {
      if (text === null) return
      setFinale(text)
      setTimeout(
        () => sectionRefs.current.finale?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        50,
      )
    })
  }, [allSpoken, finale, words])

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 py-6">
      <OldPaper className="px-7 py-12 sm:px-14 sm:py-16">
        <div
          style={HAND}
          className="flex flex-col gap-6 text-[1.7rem] leading-snug sm:text-[1.95rem]"
        >
          <p className="text-[2.1rem] font-bold sm:text-[2.4rem]">{JIMS_LETTER.greeting}</p>
          {JIMS_LETTER.opening.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {JIMS_LETTER.sections.map((section) => (
            <section
              key={section.id}
              ref={(node) => {
                sectionRefs.current[section.id] = node
              }}
              className="flex flex-col gap-1 border-t border-[#7a5a32]/30 pt-5"
            >
              <p style={PRINT} className="text-base italic opacity-75 sm:text-lg">
                {section.clue}
              </p>
              {unsealed[section.id] ? (
                <InkReveal text={unsealed[section.id] ?? ''} />
              ) : (
                <SealedScrawl length={sealedLength(section.sealed)} />
              )}
            </section>
          ))}

          <section
            ref={(node) => {
              sectionRefs.current.finale = node
            }}
            className="flex flex-col gap-1 border-t border-[#7a5a32]/30 pt-5"
          >
            <p style={PRINT} className="text-base italic opacity-75 sm:text-lg">
              {JIMS_LETTER.finale.clue}
            </p>
            {finale ? (
              <InkReveal text={finale} className="text-[1.85rem] sm:text-[2.1rem]" />
            ) : (
              <SealedScrawl length={sealedLength(JIMS_LETTER.finale.sealed)} />
            )}
          </section>
        </div>
      </OldPaper>

      <OldPaper className="px-7 py-8 sm:px-12">
        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            for (const section of JIMS_LETTER.sections) {
              const word = words[section.id]
              if (word) void tryWord(section, word, true)
            }
          }}
        >
          <h2 style={PRINT} className="text-2xl">
            Speak the words
          </h2>
          {JIMS_LETTER.sections.map((section) => {
            const done = Boolean(unsealed[section.id])
            const attempt = attempts[section.id] ?? 'idle'
            return (
              <label key={section.id} className="flex flex-col gap-1">
                <span style={PRINT} className="text-lg">
                  {recipientName(section)}’s word {done ? '· the ink returns' : null}
                </span>
                <input
                  value={words[section.id] ?? ''}
                  disabled={done}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(event) => {
                    const value = event.target.value
                    setWords((current) => ({ ...current, [section.id]: value }))
                    setAttempts((current) => ({ ...current, [section.id]: 'idle' }))
                  }}
                  style={HAND}
                  className={cn(
                    'h-12 rounded-md border border-[#7a5a32]/50 bg-[#fbf3df]/70 px-3 text-2xl text-[#2a1a0c] outline-none focus-visible:ring-2 focus-visible:ring-[#7a2e12]/40 disabled:opacity-70',
                    attempt === 'wrong' && 'ink-shake border-[#7a2e12]',
                  )}
                />
                {attempt === 'wrong' ? (
                  <span style={PRINT} className="text-sm text-[#7a2e12] italic">
                    The ink does not stir.
                  </span>
                ) : null}
              </label>
            )
          })}
          <button
            type="submit"
            style={PRINT}
            className="self-start rounded-md bg-[#5a2a10] px-5 py-2 text-lg text-[#f6e8c8] shadow-md hover:bg-[#6e3414]"
          >
            Speak
          </button>
        </form>
      </OldPaper>
    </div>
  )
}
