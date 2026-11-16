import { JimsLetterSheet } from '#/components/handout/jims-letter-sheet'
import { useJimsLetterWords, useUnsealedLetter } from '#/components/handout/use-jims-letter-words'

/** Jim's letter on the player screen, opening as the DM types the words on /letters/jim. */
export function JimsLetterOnScreen() {
  const [words] = useJimsLetterWords()
  const unsealed = useUnsealedLetter(words)
  return <JimsLetterSheet unsealed={unsealed} className="h-full overflow-auto" />
}
