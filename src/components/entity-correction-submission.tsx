import { Link } from '@tanstack/react-router'
import { ChevronRight, CircleAlert, MessageSquarePlus, ShieldCheck } from 'lucide-react'
import { useId, useState } from 'react'

import { CorrectionForm, type CorrectionFormStatus } from '#/components/correction-form'
import { Inline, Stack } from '#/components/ui/layout'
import type { Entity } from '#/lib/campaign'
import { useCorrectionAccess } from '#/lib/correction-access'
import { submitCorrection } from '#/lib/correction-submission'
import { buildEntrySnapshot } from '#/lib/entry-snapshot'
import { cn } from '#/lib/utils'

export function EntityCorrectionSubmission({
  entity,
  expectedAccessCodeHash = CORRECTIONS_ACCESS_CODE_DIGEST,
}: {
  entity: Entity
  expectedAccessCodeHash?: string
}) {
  const inputId = useId()
  const panelId = useId()
  const access = useCorrectionAccess(expectedAccessCodeHash)
  const [expanded, setExpanded] = useState(false)
  const [text, setText] = useState('')
  const [status, setStatus] = useState<CorrectionFormStatus>('idle')

  if (access.status === 'checking' || access.status === 'locked') return null

  async function submit(): Promise<void> {
    const submittedText = text.trim()
    const length = Array.from(submittedText).length
    if (length < 20 || length > 16_384 || access.status !== 'unlocked') return

    setStatus('sending')
    let snapshot
    try {
      snapshot = buildEntrySnapshot(entity)
    } catch {
      setStatus('error')
      return
    }
    const result = await submitCorrection({
      accessCode: access.accessCode,
      context: {
        type: 'entry',
        snapshot,
      },
      text: submittedText,
    })

    if (!result.ok && result.code === 'access_denied') {
      access.revoke()
      setStatus('idle')
      return
    }
    if (!result.ok) {
      setStatus('error')
      return
    }

    setText('')
    setStatus('success')
  }

  return (
    <Stack as="section" gap="md" className="border-border border-t pt-6">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((current) => !current)}
        className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-2 text-sm font-medium"
      >
        <MessageSquarePlus className="size-4" />
        Submit corrections or additions
        <ChevronRight
          className={cn('size-4 transition-transform', expanded && 'rotate-90')}
          aria-hidden
        />
      </button>
      {expanded ? (
        <div id={panelId} className="bg-muted/45 rounded-xl p-4 sm:p-5">
          {access.status === 'revoked' ? (
            <div
              role="alert"
              className="border-destructive/30 bg-destructive/5 rounded-xl border p-4"
            >
              <Inline gap="sm" align="start">
                <CircleAlert className="text-destructive mt-0.5 size-4 shrink-0" />
                <Stack gap="xs">
                  <p className="font-medium">The saved access code is no longer accepted.</p>
                  <p className="text-muted-foreground text-sm">
                    Open the questions page to enter the current shared code.
                  </p>
                  <Link
                    to="/questions"
                    className="text-primary mt-1 w-fit text-sm font-medium underline"
                  >
                    Open questions
                  </Link>
                </Stack>
              </Inline>
            </div>
          ) : status === 'success' ? (
            <Stack gap="md">
              <output className="border-primary/25 bg-primary/5 text-primary rounded-xl border p-4 text-sm">
                <ShieldCheck className="mr-2 inline size-4" />
                Thank you! Your note about {entity.data.name} was submitted for review. The campaign
                record has not changed yet.
              </output>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-primary w-fit text-sm font-medium hover:underline"
              >
                Submit another note
              </button>
            </Stack>
          ) : (
            <CorrectionForm
              id={inputId}
              label="What should be corrected or added?"
              description={
                <p className="text-muted-foreground text-xs">
                  Your note will include a snapshot of {entity.data.name} for context.
                </p>
              }
              placeholder="Tell us what you remember…"
              value={text}
              status={status}
              errorMessage="Could not send. Your note is still here, so you can try again."
              submitLabel="Submit for review"
              onChange={(value) => {
                setText(value)
                setStatus('idle')
              }}
              onSubmit={() => void submit()}
            />
          )}
        </div>
      ) : null}
    </Stack>
  )
}
