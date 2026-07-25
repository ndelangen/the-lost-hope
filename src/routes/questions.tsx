import { createFileRoute } from '@tanstack/react-router'

import { QuestionsPage } from '#/components/questions-page'
import { splitQuestionsMarkdown } from '#/lib/questions'

import questionsMarkdown from '../../QUESTIONS.md?raw'

export const Route = createFileRoute('/questions')({
  component: QuestionsRoute,
})

const items = splitQuestionsMarkdown(questionsMarkdown)

function QuestionsRoute() {
  return <QuestionsPage items={items} expectedAccessCodeHash={CORRECTIONS_ACCESS_CODE_DIGEST} />
}
