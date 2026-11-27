import { Loader2, Sparkles, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '#/components/ui/button'
import type { StockItem } from '#/definitions/shop'
import { makeLibraryItem } from '#/lib/dev-records'
import { useHoldReloadWhile } from '#/lib/dev-reload-guard'

/**
 * Asks an agent for a new item in the DM's own words. It goes into the campaign's own library book
 * and straight onto this shop's saved stock.
 */
export function NewItemPrompt({
  locationKey,
  shopType,
  initialRequest,
  onCreated,
  onCancel,
}: {
  locationKey: string
  shopType: string
  initialRequest: string
  onCreated: (item: StockItem) => void
  onCancel: () => void
}) {
  const [request, setRequest] = useState(initialRequest)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState<string>()
  useHoldReloadWhile(true)
  const field = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    field.current?.focus()
    field.current?.setSelectionRange(initialRequest.length, initialRequest.length)
  }, [initialRequest])

  const submit = () => {
    if (!request.trim() || working) return
    setWorking(true)
    setError(undefined)
    makeLibraryItem(request, locationKey, shopType)
      .then(({ ref, key }) => onCreated({ ref, key }))
      .catch((failure: unknown) => {
        setWorking(false)
        setError((failure as Error).message)
      })
  }

  return (
    <form
      aria-label="Create a new item for sale"
      className="border-border bg-muted/40 grid gap-3 rounded-xl border p-4"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <textarea
        ref={field}
        rows={3}
        aria-label="Describe the new item"
        disabled={working}
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 w-full rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2 disabled:opacity-60"
        placeholder="A sword which glows green and crackles like fire. It does 1d6 radiant and 1d6 fire damage and has +4 to attack."
        value={request}
        onChange={(event) => setRequest(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && !working) onCancel()
          if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            submit()
          }
        }}
      />
      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-300"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <p className="text-muted-foreground mr-auto text-xs" aria-live="polite">
          {working
            ? 'The agent is writing it into the library. This takes a minute or two.'
            : 'An agent adds it to the library, then it goes on this shelf.'}
        </p>
        <Button variant="ghost" onClick={onCancel} disabled={working}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={!request.trim() || working}>
          {working ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Sparkles className="size-4" aria-hidden />
          )}
          {working ? 'Creating…' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
