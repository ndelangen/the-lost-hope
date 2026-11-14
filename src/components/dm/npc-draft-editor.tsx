import { LoaderCircle, Save, Sparkles } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'

import {
  NpcDraft,
  paragraphsToText,
  textToParagraphs,
  type NpcDraft as NpcDraftValue,
} from '#/lib/npc-authoring'

const STORAGE_KEY = 'the-lost-hope:dm-npc-draft'

const buttonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 text-base font-semibold disabled:opacity-50'
const fieldClass = 'border-border bg-background rounded-lg border px-3 py-2 text-base'

/** The draft as the form edits it: rules text as plain text with `[[kind:key]]` references. */
type Form = {
  name: string
  species: string
  location: string
  languages: string
  notes: string
  motivations: string
  background: string
  creature: string
  portrait: string
}

/** `pending` holds the name being saved: Vite reloads the page when the new record lands. */
type Saved = { request: string; location: string; form?: Form; pending?: string }

type Context = {
  creatures: { key: string; name: string; cr: string }[]
  locations: { key: string; name: string }[]
}

function toForm(draft: NpcDraftValue): Form {
  return {
    name: draft.name,
    species: draft.species ?? '',
    location: draft.location ?? '',
    languages: draft.languages.join(', '),
    notes: paragraphsToText(draft.notes),
    motivations: paragraphsToText(draft.motivations),
    background: paragraphsToText(draft.background),
    creature: draft.creature,
    portrait: draft.portrait,
  }
}

function fromForm(form: Form): NpcDraftValue {
  return {
    name: form.name.trim(),
    species: form.species.trim() || null,
    location: form.location || null,
    languages: form.languages
      .split(',')
      .map((language) => language.trim())
      .filter(Boolean),
    notes: textToParagraphs(form.notes),
    motivations: textToParagraphs(form.motivations),
    background: textToParagraphs(form.background),
    creature: form.creature,
    portrait: form.portrait.trim(),
  }
}

function load(): Saved | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Saved) : undefined
  } catch {
    return undefined
  }
}

function store(saved: Saved | undefined) {
  try {
    if (saved) localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // The draft also lives in the form; storage only survives a reload.
  }
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const result = (await response.json()) as T & { error?: string }
  if (!response.ok) throw new Error(result.error ?? `Request failed (${response.status})`)
  return result
}

/**
 * Local dev only: ask Codex for an NPC, edit the draft, and save it as a campaign record. The
 * request and edits survive a failed draft, a failed save, and a reload.
 */
export function NpcDraftEditor({ partyLocation }: { partyLocation?: string }) {
  const [context, setContext] = useState<Context>()
  const [request, setRequest] = useState('')
  const [location, setLocation] = useState(partyLocation ?? '')
  const [form, setForm] = useState<Form>()
  const [busy, setBusy] = useState<'drafting' | 'saving'>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const saved = load()
    if (saved?.pending) void finishSave(saved.pending)
    if (saved) {
      setRequest(saved.request)
      setLocation(saved.location)
      setForm(saved.form)
    }
    void fetch('/__dm/npc/context')
      .then((response) => response.json() as Promise<Context>)
      .then(setContext)
      .catch(() =>
        setError('The local authoring server is not reachable. Is `bun run dev` running?'),
      )
  }, [])

  useEffect(() => {
    if (request || form) store({ request, location, form })
  }, [request, location, form])

  const draft = async () => {
    setBusy('drafting')
    setError(undefined)
    try {
      const result = await post<{ draft: NpcDraftValue }>('/__dm/npc/draft', { request, location })
      setForm(toForm(result.draft))
    } catch (failure) {
      setError((failure as Error).message)
    } finally {
      setBusy(undefined)
    }
  }

  const save = async () => {
    if (!form) return
    const parsed = NpcDraft.safeParse(fromForm(form))
    if (!parsed.success) {
      setError(
        parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),
      )
      return
    }
    setBusy('saving')
    setError(undefined)
    store({ request, location, form, pending: parsed.data.name })
    try {
      await post<{ key: string }>('/__dm/npc/save', parsed.data)
    } catch (failure) {
      // Saving restarts the dev server, which can cut the response; the check below decides.
      if (!(failure instanceof TypeError)) {
        store({ request, location, form })
        setError((failure as Error).message)
        setBusy(undefined)
        return
      }
    }
    await finishSave(parsed.data.name)
  }

  /** Opens the new NPC once it is registered, also after Vite reloaded this page mid-save. */
  async function finishSave(name: string) {
    setBusy('saving')
    /* oxlint-disable no-await-in-loop -- polling waits for the dev server between attempts */
    for (let attempt = 0; attempt < 20; attempt++) {
      try {
        const response = await fetch(`/__dm/npc/saved?name=${encodeURIComponent(name)}`)
        const { key } = (await response.json()) as { key?: string }
        if (key) {
          store(undefined)
          // A full navigation keeps this page in browser history.
          window.location.assign(`/dm/npcs/${key}`)
          return
        }
      } catch {
        // The dev server is restarting.
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    /* oxlint-enable no-await-in-loop */
    const saved = load()
    store(saved ? { ...saved, pending: undefined } : undefined)
    setError(`${name} was not saved. Your draft is still here; try again.`)
    setBusy(undefined)
  }

  const update = (field: keyof Form) => (value: string) =>
    setForm((current) => (current ? { ...current, [field]: value } : current))

  return (
    <div className="grid gap-5">
      <section className="border-border bg-card grid gap-3 rounded-xl border p-4">
        <Field label="Who do you need?">
          <textarea
            className={`${fieldClass} min-h-24`}
            placeholder="A nervous dock clerk who saw the smugglers last night"
            value={request}
            onChange={(event) => setRequest(event.target.value)}
          />
        </Field>
        <div className="flex flex-wrap items-end gap-3">
          <Field label="Where">
            <select
              className={`${fieldClass} min-h-12`}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="">Anywhere</option>
              {context?.locations.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.name}
                </option>
              ))}
            </select>
          </Field>
          <button
            type="button"
            className={`${buttonClass} border-transparent bg-indigo-600 text-white hover:bg-indigo-700`}
            disabled={!request.trim() || busy !== undefined}
            onClick={() => void draft()}
          >
            {busy === 'drafting' ? (
              <LoaderCircle aria-hidden className="size-5 animate-spin" />
            ) : (
              <Sparkles aria-hidden className="size-5" />
            )}
            {busy === 'drafting' ? 'Codex is drafting…' : form ? 'Draft again' : 'Draft with Codex'}
          </button>
        </div>
      </section>

      {error ? (
        <p
          role="alert"
          className="rounded-lg bg-red-500/10 p-3 text-sm text-red-800 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}

      {form ? (
        <section className="border-border bg-card grid gap-3 rounded-xl border p-4">
          <h2 className="text-xl font-bold">Draft</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <input
                className={`${fieldClass} min-h-12`}
                value={form.name}
                onChange={(event) => update('name')(event.target.value)}
              />
            </Field>
            <Field label="Species">
              <input
                className={`${fieldClass} min-h-12`}
                value={form.species}
                onChange={(event) => update('species')(event.target.value)}
              />
            </Field>
            <Field label="Home">
              <select
                className={`${fieldClass} min-h-12`}
                value={form.location}
                onChange={(event) => update('location')(event.target.value)}
              >
                <option value="">None</option>
                {context?.locations.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Stat block">
              <select
                className={`${fieldClass} min-h-12`}
                value={form.creature}
                onChange={(event) => update('creature')(event.target.value)}
              >
                {context?.creatures.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.name} (CR {option.cr})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Languages (comma separated)">
              <input
                className={`${fieldClass} min-h-12`}
                value={form.languages}
                onChange={(event) => update('languages')(event.target.value)}
              />
            </Field>
          </div>
          <p className="text-muted-foreground text-xs">
            Write campaign references as <code>[[npc:the_fiddler]]</code>. Leave a blank line
            between paragraphs.
          </p>
          <Field label="What players can learn">
            <textarea
              className={`${fieldClass} min-h-20`}
              value={form.notes}
              onChange={(event) => update('notes')(event.target.value)}
            />
          </Field>
          <Field label="Motivations (DM only)">
            <textarea
              className={`${fieldClass} min-h-20`}
              value={form.motivations}
              onChange={(event) => update('motivations')(event.target.value)}
            />
          </Field>
          <Field label="Background (DM only)">
            <textarea
              className={`${fieldClass} min-h-20`}
              value={form.background}
              onChange={(event) => update('background')(event.target.value)}
            />
          </Field>
          <Field label="Portrait">
            <textarea
              className={`${fieldClass} min-h-16`}
              value={form.portrait}
              onChange={(event) => update('portrait')(event.target.value)}
            />
          </Field>
          <button
            type="button"
            className={`${buttonClass} border-transparent bg-emerald-600 text-white hover:bg-emerald-700 sm:w-fit`}
            disabled={busy !== undefined}
            onClick={() => void save()}
          >
            {busy === 'saving' ? (
              <LoaderCircle aria-hidden className="size-5 animate-spin" />
            ) : (
              <Save aria-hidden className="size-5" />
            )}
            Save NPC
          </button>
        </section>
      ) : null}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}
