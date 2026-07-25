// PROTOTYPE — Three questions-page interactions, switchable via ?variant= on this throwaway route.
import { createFileRoute } from '@tanstack/react-router'
import {
  Check,
  ChevronRight,
  CircleAlert,
  KeyRound,
  LoaderCircle,
  MessageSquareText,
  RotateCcw,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { type FormEvent, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

import { PrototypeSwitcher } from '#/components/prototype-switcher'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Inline, Stack } from '#/components/ui/layout'
import { cn } from '#/lib/utils'

import questionsMarkdown from '../../QUESTIONS.md?raw'

const variantSchema = z.object({
  variant: z.enum(['a', 'b', 'c']).optional().catch('a'),
})

export const Route = createFileRoute('/questions-prototype')({
  validateSearch: variantSchema,
  component: QuestionsPrototypePage,
})

const VARIANTS = ['a', 'b', 'c'] as const
type Variant = (typeof VARIANTS)[number]
type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error'

const VARIANT_NAMES: Record<Variant, string> = {
  a: 'Card stack',
  b: 'Living document',
  c: 'Compact board',
}

const questionBlocks = questionsMarkdown
  .split(/\n\s*---\s*\n/g)
  .map((block) => block.trim())
  .filter(Boolean)

function QuestionsPrototypePage() {
  const { variant = 'a' } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [unlocked, setUnlocked] = useState(false)
  const [drafts, setDrafts] = useState<Record<number, string>>({})
  const [statuses, setStatuses] = useState<Record<number, SubmissionStatus>>({})
  const [failNextSubmission, setFailNextSubmission] = useState(false)
  const sentCount = Object.values(statuses).filter((status) => status === 'success').length

  function changeVariant(nextVariant: Variant): void {
    void navigate({ search: { variant: nextVariant }, replace: true, resetScroll: false })
  }

  function submit(itemNumber: number): void {
    setStatuses((current) => ({ ...current, [itemNumber]: 'sending' }))
    window.setTimeout(() => {
      setStatuses((current) => ({
        ...current,
        [itemNumber]: failNextSubmission ? 'error' : 'success',
      }))
      setFailNextSubmission(false)
    }, 450)
  }

  const sharedProps: QuestionsVariantProps = {
    blocks: questionBlocks,
    drafts,
    statuses,
    onDraftChange: (itemNumber, answer) =>
      setDrafts((current) => ({ ...current, [itemNumber]: answer })),
    onSubmit: submit,
  }

  return (
    <>
      {!unlocked ? (
        <UnlockGate variant={variant} onUnlock={() => setUnlocked(true)} />
      ) : variant === 'a' ? (
        <CardStackVariant {...sharedProps} />
      ) : variant === 'b' ? (
        <LivingDocumentVariant {...sharedProps} />
      ) : (
        <CompactBoardVariant {...sharedProps} />
      )}

      <PrototypeSwitcher
        variants={VARIANTS}
        current={variant}
        names={VARIANT_NAMES}
        stateLabel={`${unlocked ? 'unlocked' : 'locked'} · ${sentCount} sent · ${Object.keys(drafts).length} drafts`}
        failNextSubmission={failNextSubmission}
        onChange={changeVariant}
        onToggleFailure={() => setFailNextSubmission((current) => !current)}
      />
    </>
  )
}

type UnlockGateProps = {
  variant: Variant
  onUnlock: () => void
}

function UnlockGate({ variant, onUnlock }: UnlockGateProps) {
  const [code, setCode] = useState('')
  const [showError, setShowError] = useState(false)

  function unlock(event: FormEvent): void {
    event.preventDefault()
    if (!code.trim()) {
      setShowError(true)
      return
    }
    onUnlock()
  }

  const form = (
    <form onSubmit={unlock} className="w-full">
      <Stack gap="md">
        <label className="text-sm font-medium" htmlFor={`access-code-${variant}`}>
          Shared access code
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id={`access-code-${variant}`}
            type="password"
            autoComplete="current-password"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setShowError(false)
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
        {showError ? (
          <p role="alert" className="text-destructive flex items-center gap-2 text-sm">
            <CircleAlert className="size-4" />
            Enter the shared code to continue.
          </p>
        ) : null}
        <p className="text-muted-foreground text-xs">
          Prototype: any non-empty code unlocks the page.
        </p>
      </Stack>
    </form>
  )

  if (variant === 'a') {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg items-center">
        <Card className="w-full">
          <CardHeader className="text-center">
            <span className="bg-secondary text-primary grid size-12 place-items-center self-center rounded-full">
              <KeyRound className="size-5" />
            </span>
            <CardTitle className="text-2xl">Campaign questions</CardTitle>
            <p className="text-muted-foreground text-sm">Enter the code shared with your party.</p>
          </CardHeader>
          <CardContent>{form}</CardContent>
        </Card>
      </div>
    )
  }

  if (variant === 'b') {
    return (
      <Stack gap="3xl" className="mx-auto max-w-3xl py-12">
        <header className="border-border border-b pb-8">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            The Lost Hope
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Campaign questions</h1>
          <p className="text-muted-foreground mt-3 max-w-xl text-lg">
            Help fill gaps and correct details in the campaign archive.
          </p>
        </header>
        <section className="bg-muted/50 border-border rounded-xl border p-5 sm:p-6">{form}</section>
      </Stack>
    )
  }

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
      <section className="bg-card flex items-center p-8 sm:p-12">{form}</section>
    </div>
  )
}

type QuestionsVariantProps = {
  blocks: string[]
  drafts: Record<number, string>
  statuses: Record<number, SubmissionStatus>
  onDraftChange: (itemNumber: number, answer: string) => void
  onSubmit: (itemNumber: number) => void
}

function CardStackVariant({
  blocks,
  drafts,
  statuses,
  onDraftChange,
  onSubmit,
}: QuestionsVariantProps) {
  return (
    <Stack gap="2xl" className="mx-auto max-w-4xl pb-24">
      <PageIntro
        eyebrow="Campaign archive"
        title="Questions for the party"
        description="Read any open item and add what you remember. Each answer is reviewed before the archive changes."
        count={blocks.length}
      />
      {blocks.map((block, index) => {
        const itemNumber = index + 1
        return (
          <Card key={itemNumber}>
            <CardHeader className="border-border border-b pb-5">
              <Inline justify="between">
                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Item {itemNumber}
                </span>
                <ItemStatus status={statuses[itemNumber]} />
              </Inline>
            </CardHeader>
            <CardContent className="pt-6">
              <Stack gap="xl">
                <MarkdownBlock markdown={block} />
                <AnswerBox
                  itemNumber={itemNumber}
                  answer={drafts[itemNumber] ?? ''}
                  status={statuses[itemNumber]}
                  onChange={onDraftChange}
                  onSubmit={onSubmit}
                  roomy
                />
              </Stack>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )
}

function LivingDocumentVariant({
  blocks,
  drafts,
  statuses,
  onDraftChange,
  onSubmit,
}: QuestionsVariantProps) {
  return (
    <article className="mx-auto max-w-3xl pb-24">
      <PageIntro
        eyebrow="Open notebook"
        title="What do you remember?"
        description="The campaign notes still have gaps. Add a correction directly where it belongs."
        count={blocks.length}
        understated
      />
      <div className="border-border mt-10 border-t">
        {blocks.map((block, index) => {
          const itemNumber = index + 1
          return (
            <section key={itemNumber} className="border-border border-b py-10">
              <Inline justify="between" className="mb-5">
                <span className="text-primary text-sm font-semibold">Item {itemNumber}</span>
                <ItemStatus status={statuses[itemNumber]} />
              </Inline>
              <MarkdownBlock markdown={block} />
              <div className="bg-muted/45 mt-7 rounded-xl p-4 sm:p-5">
                <AnswerBox
                  itemNumber={itemNumber}
                  answer={drafts[itemNumber] ?? ''}
                  status={statuses[itemNumber]}
                  onChange={onDraftChange}
                  onSubmit={onSubmit}
                />
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}

function CompactBoardVariant({
  blocks,
  drafts,
  statuses,
  onDraftChange,
  onSubmit,
}: QuestionsVariantProps) {
  return (
    <Stack gap="xl" className="pb-24">
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8">
        <PageIntro
          eyebrow="Community corrections"
          title="Help complete the campaign archive"
          description="Answer one item or several. Every submission becomes a separate correction for review."
          count={blocks.length}
          inverted
        />
      </div>
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        {blocks.map((block, index) => {
          const itemNumber = index + 1
          return (
            <section
              key={itemNumber}
              className="border-border bg-card rounded-xl border p-4 shadow-sm sm:p-5"
            >
              <Inline justify="between" className="mb-4">
                <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs font-semibold">
                  Item {itemNumber}
                </span>
                <ItemStatus status={statuses[itemNumber]} />
              </Inline>
              <MarkdownBlock markdown={block} compact />
              <div className="border-border mt-5 border-t pt-4">
                <AnswerBox
                  itemNumber={itemNumber}
                  answer={drafts[itemNumber] ?? ''}
                  status={statuses[itemNumber]}
                  onChange={onDraftChange}
                  onSubmit={onSubmit}
                  compact
                />
              </div>
            </section>
          )
        })}
      </div>
    </Stack>
  )
}

function PageIntro({
  eyebrow,
  title,
  description,
  count,
  understated = false,
  inverted = false,
}: {
  eyebrow: string
  title: string
  description: string
  count: number
  understated?: boolean
  inverted?: boolean
}) {
  return (
    <header className={cn(!understated && !inverted && 'pt-3')}>
      <Inline gap="sm" wrap className="mb-3">
        <span
          className={cn(
            'text-xs font-semibold tracking-wider uppercase',
            inverted ? 'text-primary-foreground/70' : 'text-primary',
          )}
        >
          {eyebrow}
        </span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs',
            inverted ? 'bg-white/15' : 'bg-secondary text-secondary-foreground',
          )}
        >
          {count} items
        </span>
      </Inline>
      <h1
        className={cn(
          'font-bold tracking-tight',
          understated ? 'text-4xl' : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          'mt-3 max-w-2xl leading-relaxed',
          inverted ? 'text-primary-foreground/80' : 'text-muted-foreground',
          understated && 'text-lg',
        )}
      >
        {description}
      </p>
    </header>
  )
}

function MarkdownBlock({ markdown, compact = false }: { markdown: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        'prose prose-slate dark:prose-invert max-w-none break-words',
        compact ? 'prose-sm' : 'prose-sm sm:prose-base',
        '[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto',
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}

function AnswerBox({
  itemNumber,
  answer,
  status = 'idle',
  onChange,
  onSubmit,
  roomy = false,
  compact = false,
}: {
  itemNumber: number
  answer: string
  status?: SubmissionStatus
  onChange: (itemNumber: number, answer: string) => void
  onSubmit: (itemNumber: number) => void
  roomy?: boolean
  compact?: boolean
}) {
  const isSending = status === 'sending'
  const isSuccess = status === 'success'

  if (isSuccess) {
    return (
      <div className="border-primary/25 bg-primary/5 rounded-lg border p-4">
        <p className="text-primary flex items-center gap-2 font-medium">
          <ShieldCheck className="size-5" />
          Correction submitted
        </p>
        <p className="text-muted-foreground mt-1 text-sm">It is ready for campaign review.</p>
      </div>
    )
  }

  return (
    <Stack gap="sm">
      <label htmlFor={`answer-${itemNumber}`} className="text-sm font-semibold">
        Your correction
      </label>
      <textarea
        id={`answer-${itemNumber}`}
        value={answer}
        onChange={(event) => onChange(itemNumber, event.target.value)}
        placeholder="Write what you remember…"
        rows={compact ? 2 : roomy ? 5 : 3}
        disabled={isSending}
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 min-h-20 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2 disabled:opacity-60"
      />
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        {status === 'error' ? (
          <p role="alert" className="text-destructive flex items-center gap-1.5 text-sm">
            <CircleAlert className="size-4" />
            Could not send. Your answer is still here.
          </p>
        ) : (
          <p className="text-muted-foreground text-xs">Submitted without attribution.</p>
        )}
        <button
          type="button"
          disabled={!answer.trim() || isSending}
          onClick={() => onSubmit(itemNumber)}
          className="bg-primary text-primary-foreground inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45"
        >
          {isSending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Sending
            </>
          ) : status === 'error' ? (
            <>
              <RotateCcw className="size-4" />
              Try again
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit correction
            </>
          )}
        </button>
      </div>
    </Stack>
  )
}

function ItemStatus({ status }: { status?: SubmissionStatus }) {
  if (status === 'success') {
    return (
      <span className="text-primary inline-flex items-center gap-1 text-xs font-medium">
        <Check className="size-3.5" />
        Sent
      </span>
    )
  }
  if (status === 'error') {
    return (
      <span className="text-destructive inline-flex items-center gap-1 text-xs font-medium">
        <CircleAlert className="size-3.5" />
        Needs retry
      </span>
    )
  }
  return null
}
