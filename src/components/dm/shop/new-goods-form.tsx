import { Loader2, PackagePlus, TriangleAlert } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Select } from '#/components/ui/select'
import { EQUIPMENT_CATEGORIES, type Equipment } from '#/definitions/library'
import { COINS, type Coin } from '#/definitions/price'
import { createLibraryEntry } from '#/lib/dev-records'
import { useHoldReloadWhile } from '#/lib/dev-reload-guard'

type Category = Equipment['category']

/**
 * Makes up goods on the spot: the form writes a new entry into the campaign's own library
 * publication and hands back its key, so the shop can put it on the shelf.
 */
export function NewGoodsForm({
  initialName,
  onCreated,
  onCancel,
}: {
  initialName: string
  onCreated: (key: string) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initialName)
  const [category, setCategory] = useState<Category>('Adventuring Gear')
  const [amount, setAmount] = useState('')
  const [coin, setCoin] = useState<Coin>('gp')
  const [weight, setWeight] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()
  useHoldReloadWhile(true)
  const field = useRef<HTMLInputElement>(null)
  const id = useId()
  useEffect(() => field.current?.focus(), [])

  const price = Number.parseFloat(amount)
  const pounds = weight.trim() ? Number.parseFloat(weight) : undefined
  const valid =
    name.trim().length > 0 &&
    price > 0 &&
    (pounds === undefined || (Number.isFinite(pounds) && pounds >= 0))

  const submit = () => {
    if (!valid || saving) return
    setSaving(true)
    setError(undefined)
    const text = description.trim()
    createLibraryEntry('equipment', {
      name: name.trim(),
      category,
      price: { amount: price, coin },
      weight: pounds,
      text: text ? text.split(/\n\s*\n/u).map((paragraph) => [paragraph.trim()]) : [],
    })
      .then(({ key }) => onCreated(key))
      .catch((failure: unknown) => {
        setSaving(false)
        setError((failure as Error).message)
      })
  }

  return (
    <form
      aria-label="Make up new goods"
      className="border-border bg-muted/40 grid gap-3 rounded-xl border p-4"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className="flex items-center gap-2">
        <PackagePlus className="text-muted-foreground size-4" aria-hidden />
        <p className="text-sm font-semibold">New goods for the library</p>
        <p className="text-muted-foreground text-xs">
          Saved under The Lost Hope, then shelved here
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <label htmlFor={`${id}-name`} className="grid gap-1 text-xs font-medium">
          Name
          <Input
            id={`${id}-name`}
            ref={field}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && !saving) onCancel()
            }}
            className="h-10"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label htmlFor={`${id}-kind`} className="grid gap-1 text-xs font-medium">
          Kind
          <Select
            id={`${id}-kind`}
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
          >
            {EQUIPMENT_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <fieldset className="grid gap-1 text-xs font-medium">
          <legend className="mb-1">Price</legend>
          <div className="flex gap-2">
            <Input
              inputMode="decimal"
              aria-label="Price amount"
              className="h-10 w-24 tabular-nums"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <Select
              aria-label="Coin"
              containerClassName="w-20 shrink-0"
              value={coin}
              onChange={(event) => setCoin(event.target.value as Coin)}
            >
              {COINS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </fieldset>
        <label htmlFor={`${id}-weight`} className="grid gap-1 text-xs font-medium">
          Weight (lb, optional)
          <Input
            id={`${id}-weight`}
            inputMode="decimal"
            className="h-10 w-28 tabular-nums"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
      </div>
      <label className="grid gap-1 text-xs font-medium">
        What it is (optional)
        <textarea
          rows={2}
          className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 w-full rounded-lg border px-3 py-2 text-sm font-normal outline-none focus-visible:ring-2"
          placeholder="One or two sentences the DM can read out"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-300"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={!valid || saving}>
          {saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {saving ? 'Adding…' : 'Add to library and shelf'}
        </Button>
      </div>
    </form>
  )
}
