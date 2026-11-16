import { createFileRoute } from '@tanstack/react-router'

import { JimsLetterSheet } from '#/components/handout/jims-letter-sheet'
import { JimsLetterWordForm } from '#/components/handout/jims-letter-word-form'
import { useJimsLetterWords, useUnsealedLetter } from '#/components/handout/use-jims-letter-words'

export const Route = createFileRoute('/letters/jim')({
  head: () => ({
    meta: [
      { title: 'A letter from Jim | The Lost Hope' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: JimsLetterPage,
})

/** Jim's sealed farewell letter: speaking each recipient's word brings that part's ink back. */
function JimsLetterPage() {
  const [words, setWords] = useJimsLetterWords()
  const unsealed = useUnsealedLetter(words)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 py-6">
      <JimsLetterSheet unsealed={unsealed} />
      <JimsLetterWordForm words={words} unsealed={unsealed} onChange={setWords} />
    </div>
  )
}
