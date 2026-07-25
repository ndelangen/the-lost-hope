import { ChevronRight, CircleAlert, MessageSquareText, ShieldCheck } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { CorrectionForm, type CorrectionFormStatus } from '#/components/correction-form'
import { Inline, Stack } from '#/components/ui/layout'
import { useCorrectionAccess } from '#/lib/correction-access'
import { submitCorrection as sendCorrection } from '#/lib/correction-submission'
import type { QuestionItem } from '#/lib/questions'

type QuestionsPageProps = {
  items: QuestionItem[]
  expectedAccessCodeHash: string
}

export function QuestionsPage({ items, expectedAccessCodeHash }: QuestionsPageProps) {
  const access = useCorrectionAccess(expectedAccessCodeHash)
  const [candidateCode, setCandidateCode] = useState('')
  const [accessError, setAccessError] = useState<string>()
  const [drafts, setDrafts] = useState<Record<number, string>>({})
  const [statuses, setStatuses] = useState<Record<number, CorrectionFormStatus>>({})

  async function unlock(event: FormEvent): Promise<void> {
    event.preventDefault()
    if (!(await access.unlock(candidateCode))) {
      setAccessError('That code does not match. Check it and try again.')
      return
    }

    setAccessError(undefined)
  }

  async function submitCorrection(item: QuestionItem): Promise<void> {
    const answer = drafts[item.itemNumber]?.trim() ?? ''
    const answerLength = Array.from(answer).length
    if (answerLength < 20 || answerLength > 16_384 || access.status !== 'unlocked') return

    setStatuses((current) => ({ ...current, [item.itemNumber]: 'sending' }))
    const result = await sendCorrection({
      accessCode: access.accessCode,
      context: {
        type: 'question',
        itemNumber: item.itemNumber,
        itemMarkdown: item.markdown,
      },
      text: answer,
    })
    if (!result.ok && result.code === 'access_denied') {
      access.revoke()
      setCandidateCode('')
      setAccessError('The saved access code is no longer accepted. Enter the current code.')
      setStatuses((current) => ({ ...current, [item.itemNumber]: 'idle' }))
      return
    }
    if (!result.ok) {
      setStatuses((current) => ({ ...current, [item.itemNumber]: 'error' }))
      return
    }

    setDrafts((current) => ({ ...current, [item.itemNumber]: '' }))
    setStatuses((current) => ({ ...current, [item.itemNumber]: 'success' }))
  }

  if (access.status !== 'unlocked') {
    return (
      <div className="grid min-h-[70vh] overflow-hidden rounded-2xl border lg:grid-cols-[0.85fr_1.15fr]">
        <section className="bg-primary text-primary-foreground flex flex-col justify-between gap-10 p-8 sm:p-12">
          <MessageSquareText className="size-10" />
          <div>
            <p className="text-sm font-semibold uppercase opacity-70">Party knowledge</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Correct the record.</h1>
            <p className="mt-4 max-w-md leading-relaxed opacity-80">
              Short answers from the table become reviewable corrections for the campaign archive.
            </p>
          </div>
          <p className="text-sm opacity-70">No account needed.</p>
        </section>

        <section className="bg-card flex items-center p-8 sm:p-12">
          <form className="w-full" onSubmit={(event) => void unlock(event)}>
            <Stack gap="md">
              <label className="text-sm font-medium" htmlFor="questions-access-code">
                Shared access code
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="questions-access-code"
                  type="password"
                  autoComplete="current-password"
                  value={candidateCode}
                  onChange={(event) => {
                    setCandidateCode(event.target.value)
                    setAccessError(undefined)
                  }}
                  placeholder="Enter code"
                  className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/30 h-11 min-w-0 flex-1 rounded-lg border px-3 outline-none focus-visible:ring-2"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 font-medium"
                >
                  Open questions
                  <ChevronRight className="size-4" />
                </button>
              </div>
              {accessError ? (
                <p role="alert" className="text-destructive flex items-center gap-2 text-sm">
                  <CircleAlert className="size-4" />
                  {accessError}
                </p>
              ) : null}
            </Stack>
          </form>
        </section>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl pb-24">
      <header>
        <Inline gap="sm" wrap className="mb-3">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            Open notebook
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
            {items.length} items
          </span>
        </Inline>
        <h1 className="text-4xl font-bold tracking-tight">What do you remember?</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-lg leading-relaxed">
          The campaign notes still have gaps. Add a correction directly where it belongs.
        </p>
      </header>

      <div className="border-border mt-10 border-t">
        {items.map((item) => {
          const answer = drafts[item.itemNumber] ?? ''
          const status = statuses[item.itemNumber] ?? 'idle'

          return (
            <section key={item.itemNumber} className="border-border border-b py-10">
              <p className="text-primary mb-5 text-sm font-semibold">Item {item.itemNumber}</p>
              <div className="prose prose-slate dark:prose-invert max-w-none break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.markdown}</ReactMarkdown>
              </div>
              <div className="bg-muted/45 mt-7 rounded-xl p-4 sm:p-5">
                <CorrectionForm
                  id={`answer-${item.itemNumber}`}
                  label="Your correction"
                  value={answer}
                  status={status}
                  successFeedback={
                    <output className="border-primary/25 bg-primary/5 text-primary rounded-lg border p-3 text-sm">
                      <ShieldCheck className="mr-2 inline size-4" />
                      Thank you! Your correction was submitted. The site owner will review it and
                      must apply any changes manually. You can submit as many corrections as you
                      like.
                    </output>
                  }
                  errorMessage="Could not send. Your answer is still here. You can try again."
                  submitLabel="Submit correction"
                  onChange={(value) => {
                    setDrafts((current) => ({
                      ...current,
                      [item.itemNumber]: value,
                    }))
                    setStatuses((current) => ({ ...current, [item.itemNumber]: 'idle' }))
                  }}
                  onSubmit={() => void submitCorrection(item)}
                />
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}
