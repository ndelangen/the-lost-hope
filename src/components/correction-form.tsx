import { CircleAlert, LoaderCircle, RotateCcw, Send } from 'lucide-react'
import type { ReactNode } from 'react'

import { Stack } from '#/components/ui/layout'

export type CorrectionFormStatus = 'idle' | 'sending' | 'success' | 'error'

export function correctionTextLength(value: string): number {
  return Array.from(value.trim()).length
}

export function CorrectionForm({
  id,
  label,
  description,
  placeholder,
  value,
  status,
  successFeedback,
  errorMessage,
  submitLabel,
  onChange,
  onSubmit,
}: {
  id: string
  label: string
  description?: ReactNode
  placeholder?: string
  value: string
  status: CorrectionFormStatus
  successFeedback?: ReactNode
  errorMessage: string
  submitLabel: string
  onChange: (value: string) => void
  onSubmit: () => void
}) {
  const characterCount = correctionTextLength(value)
  const valid = characterCount >= 20 && characterCount <= 16_384
  const sending = status === 'sending'

  return (
    <Stack gap="sm">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {description}
      <textarea
        id={id}
        value={value}
        disabled={sending}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/30 min-h-24 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2"
      />
      {status === 'success' ? (
        successFeedback
      ) : status === 'error' ? (
        <p role="alert" className="text-destructive flex items-center gap-2 text-sm">
          <CircleAlert className="size-4 shrink-0" />
          {errorMessage}
        </p>
      ) : null}
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-xs">
          Minimum 20 characters · {characterCount.toLocaleString()} / 16,384
        </p>
        <button
          type="button"
          disabled={!valid || sending}
          onClick={onSubmit}
          className="bg-primary text-primary-foreground inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45"
        >
          {sending ? (
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
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </Stack>
  )
}
