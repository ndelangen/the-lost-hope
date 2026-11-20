import { Check, Minus, PawPrint, Plus, UserPlus, UserRound, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { Input } from '#/components/ui/input'
import type { EntityRef } from '#/definitions/kind'
import type { EnemyCandidate as EnemyOption, PartyMember } from '#/lib/dm-encounter'
import type { Arrival, CreatureRef } from '#/lib/encounter'
import {
  DIFFICULTY_LABEL,
  difficultyBand,
  xpForCr,
  type DifficultyBand,
  type DifficultyBudget,
} from '#/lib/encounter-difficulty'
import { cn } from '#/lib/utils'

import { ActionButton, IconButton } from './icon-button'

export type EnemyPick = { source: CreatureRef; count: number }

const idOf = ({ ref, key }: CreatureRef) => `${ref}:${key}`

type Tab = 'groups' | 'pick'

/**
 * Everything that joins a fight, in one drawer: a prepared group of a scene, or a pick of party
 * members not in it yet, how many of each of the scene's enemies, or anyone found by search, when
 * they act, and how hard the fight becomes for the party.
 */
export function AddEnemiesSheet({
  open,
  onClose,
  sceneName,
  sceneEnemies,
  candidates,
  budget,
  standingXp,
  activeName,
  party,
  presets,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  sceneName: string | undefined
  sceneEnemies: readonly EnemyOption[]
  candidates: readonly EnemyOption[]
  budget: DifficultyBudget
  /** XP of the enemies still standing in the fight. */
  standingXp: number
  /** Whose turn it is, when the fight has started. */
  activeName: string | undefined
  /** Party members who are not in the fight yet. */
  party: readonly PartyMember[]
  /** The prepared groups to load, shown on a tab of their own. */
  presets?: ReactNode
  onAdd: (picks: EnemyPick[], pcs: EntityRef<'pc'>[], arrival: Arrival) => void
}) {
  const [tab, setTab] = useState<Tab>('groups')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const inputId = useId()
  const [counts, setCounts] = useState<ReadonlyMap<string, number>>(new Map())
  const [extra, setExtra] = useState<readonly EnemyOption[]>([])
  const [query, setQuery] = useState('')
  const [arrival, setArrival] = useState<Arrival>('end')
  const [pcs, setPcs] = useState<ReadonlySet<string>>(new Set())

  useEffect(() => {
    if (!open) return
    headingRef.current?.focus()
    setCounts(new Map())
    setExtra([])
    setQuery('')
    setPcs(new Set())
    setTab('groups')
  }, [open])

  if (!open) return null

  const listed = [
    ...sceneEnemies,
    ...extra.filter(
      (option) => !sceneEnemies.some((enemy) => idOf(enemy.source) === idOf(option.source)),
    ),
  ]
  const setCount = (option: EnemyOption, count: number) =>
    setCounts((current) => new Map(current).set(idOf(option.source), Math.max(0, count)))
  const pick = (option: EnemyOption) => {
    if (!listed.some((entry) => idOf(entry.source) === idOf(option.source)))
      setExtra((current) => [...current, option])
    setCount(option, (counts.get(idOf(option.source)) ?? 0) + 1)
    setQuery('')
  }
  const picks = listed.flatMap((option) => {
    const count = counts.get(idOf(option.source)) ?? 0
    return count > 0 ? [{ option, count }] : []
  })
  const total = picks.reduce((sum, { count }) => sum + count, 0)
  const pickedPcs = party.filter((member) => pcs.has(member.source.key))
  const togglePc = (key: string) =>
    setPcs((current) => {
      const next = new Set(current)
      if (!next.delete(key)) next.add(key)
      return next
    })
  const addedXp = picks.reduce((sum, { option, count }) => sum + xpForCr(option.cr) * count, 0)

  const needle = query.trim().toLocaleLowerCase()
  const matches = needle
    ? candidates.filter((candidate) => candidate.name.toLocaleLowerCase().includes(needle))
    : []

  return (
    <aside
      aria-labelledby="add-enemies-heading"
      className="border-border bg-background fixed inset-y-0 right-0 z-[155] flex w-[min(32rem,100vw)] flex-col border-l-2 shadow-2xl md:w-[min(32rem,calc(100vw-17rem))]"
    >
      <header className="border-border flex items-center justify-between gap-3 border-b px-5 py-3">
        <h2
          id="add-enemies-heading"
          ref={headingRef}
          tabIndex={-1}
          className="flex items-center gap-2 text-xl font-bold outline-none"
        >
          <UserPlus aria-hidden className="size-6" /> Add to the fight
        </h2>
        <IconButton label="Close (Esc)" onClick={onClose}>
          <X aria-hidden />
        </IconButton>
      </header>

      {presets ? (
        <div className="border-border bg-muted/40 mx-5 mt-4 grid grid-cols-2 gap-1 rounded-xl border-2 p-1">
          {(
            [
              ['groups', 'Prepared groups'],
              ['pick', 'Pick who joins'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                'min-h-11 rounded-lg px-3 text-sm font-medium',
                tab === value ? 'bg-background font-semibold shadow-sm' : 'hover:bg-background/60',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      {presets && tab === 'groups' ? (
        <div className="grid content-start gap-5 overflow-y-auto px-5 py-4">{presets}</div>
      ) : (
        <>
          <div className="grid content-start gap-5 overflow-y-auto px-5 py-4">
            {party.length > 0 ? (
              <section aria-labelledby={`${inputId}-party`} className="grid gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    id={`${inputId}-party`}
                    className="text-muted-foreground text-sm font-semibold"
                  >
                    The party
                  </h3>
                  <button
                    type="button"
                    className="text-sm font-medium hover:underline"
                    onClick={() =>
                      setPcs(
                        pickedPcs.length === party.length
                          ? new Set()
                          : new Set(party.map((member) => member.source.key)),
                      )
                    }
                  >
                    {pickedPcs.length === party.length ? 'None' : 'Everyone'}
                  </button>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {party.map((member) => {
                    const picked = pcs.has(member.source.key)
                    return (
                      <li key={member.source.key}>
                        <button
                          type="button"
                          aria-pressed={picked}
                          onClick={() => togglePc(member.source.key)}
                          className={cn(
                            'flex min-h-14 w-full items-center gap-3 rounded-xl border-2 px-3 text-left',
                            picked
                              ? 'border-amber-500/60 bg-amber-500/10'
                              : 'border-border hover:bg-muted',
                          )}
                        >
                          {member.avatar ? (
                            <Avatar
                              src={member.avatar}
                              sizes="36px"
                              maxWidth={64}
                              className="size-9"
                            />
                          ) : (
                            <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
                              <UserRound aria-hidden className="size-5" />
                            </span>
                          )}
                          <span className="grow font-semibold">{member.name}</span>
                          {picked ? <Check aria-hidden className="size-5 shrink-0" /> : null}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ) : null}

            <DifficultyMeter budget={budget} standingXp={standingXp} addedXp={addedXp} />

            <section aria-labelledby={`${inputId}-scene`} className="grid gap-2">
              <h3 id={`${inputId}-scene`} className="text-muted-foreground text-sm font-semibold">
                {sceneName ? `In ${sceneName}` : 'Picked'}
              </h3>
              {listed.length === 0 ? (
                <p className="text-muted-foreground text-sm">Search below for anyone to add.</p>
              ) : (
                <ul className="grid gap-2">
                  {listed.map((option) => (
                    <EnemyRow
                      key={idOf(option.source)}
                      option={option}
                      count={counts.get(idOf(option.source)) ?? 0}
                      onCount={(count) => setCount(option, count)}
                    />
                  ))}
                </ul>
              )}
            </section>

            <section className="grid gap-2">
              <label htmlFor={inputId} className="text-muted-foreground text-sm font-semibold">
                Anyone else
              </label>
              <Input
                id={inputId}
                type="search"
                placeholder="Search NPCs and beasts…"
                value={query}
                className="h-12 text-base"
                onChange={(event) => setQuery(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' || !matches[0]) return
                  event.preventDefault()
                  pick(matches[0])
                }}
              />
              {matches.length > 0 ? (
                <ul className="grid max-h-64 gap-1 overflow-y-auto">
                  {matches.slice(0, 30).map((option) => (
                    <li key={idOf(option.source)}>
                      <button
                        type="button"
                        onClick={() => pick(option)}
                        className="hover:bg-muted flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left"
                      >
                        <Plus aria-hidden className="text-muted-foreground size-5 shrink-0" />
                        <span className="grow font-medium">{option.name}</span>
                        <span className="text-muted-foreground text-sm">
                          {option.kind}
                          {option.cr ? ` · CR ${option.cr}` : ''}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : needle ? (
                <p className="text-muted-foreground text-sm">No NPC or beast by that name.</p>
              ) : null}
            </section>

            <fieldset className="grid gap-2">
              <legend className="text-muted-foreground mb-2 text-sm font-semibold">
                When do they act?
              </legend>
              <div className="border-border bg-muted/40 grid grid-cols-2 gap-1 rounded-xl border-2 p-1">
                {(
                  [
                    ['next', activeName ? `Right after ${activeName}` : 'Right after this turn'],
                    ['end', 'At the end of the round'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={arrival === value}
                    disabled={value === 'next' && !activeName}
                    onClick={() => setArrival(value)}
                    className={cn(
                      'min-h-12 rounded-lg px-3 text-sm font-medium disabled:opacity-35',
                      arrival === value
                        ? 'bg-background font-semibold shadow-sm'
                        : 'hover:bg-background/60',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                By the rules, newcomers roll one initiative for the group. Pick whichever is closer,
                or drag them in the turn order afterwards.
              </p>
            </fieldset>
          </div>

          <footer className="border-border border-t px-5 py-3">
            <ActionButton
              tone="primary"
              size="lg"
              disabled={total === 0 && pickedPcs.length === 0}
              className="w-full"
              onClick={() => {
                onAdd(
                  picks.map(({ option, count }) => ({ source: option.source, count })),
                  pickedPcs.map((member) => member.source),
                  arrival,
                )
                onClose()
              }}
            >
              <UserPlus aria-hidden />
              {addLabel(pickedPcs.length, total)}
            </ActionButton>
          </footer>
        </>
      )}
    </aside>
  )
}

/** What the add button says: who joins, counted. */
export function addLabel(pcs: number, enemies: number) {
  const parts = [
    pcs > 0 ? `${pcs} ${pcs === 1 ? 'PC' : 'PCs'}` : '',
    enemies > 0 ? `${enemies} ${enemies === 1 ? 'enemy' : 'enemies'}` : '',
  ].filter(Boolean)
  return parts.length > 0 ? `Add ${parts.join(' and ')}` : 'Pick who joins'
}

function EnemyRow({
  option,
  count,
  onCount,
}: {
  option: EnemyOption
  count: number
  onCount: (count: number) => void
}) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 rounded-xl border-2 px-3 py-2',
        count > 0 ? 'border-amber-500/60 bg-amber-500/10' : 'border-border',
      )}
    >
      {option.avatar ? (
        <Avatar src={option.avatar} sizes="40px" maxWidth={64} className="size-10" />
      ) : (
        <span className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
          {option.kind === 'Beast' ? (
            <PawPrint aria-hidden className="size-5" />
          ) : (
            <UserRound aria-hidden className="size-5" />
          )}
        </span>
      )}
      <span className="grid min-w-0 grow">
        <span className="truncate font-semibold">{option.name}</span>
        <span className="text-muted-foreground text-sm">
          {option.cr ? `CR ${option.cr} · ${xpForCr(option.cr)} XP each` : option.kind}
        </span>
      </span>
      <span className="flex items-center">
        <IconButton
          label={`One fewer ${option.name}`}
          disabled={count === 0}
          onClick={() => onCount(count - 1)}
          className="rounded-r-none"
        >
          <Minus aria-hidden />
        </IconButton>
        <span
          aria-live="polite"
          aria-label={`${count} ${option.name}`}
          className="border-border flex size-12 items-center justify-center border-y-2 text-xl font-bold tabular-nums"
        >
          {count}
        </span>
        <IconButton
          label={`One more ${option.name}`}
          onClick={() => onCount(count + 1)}
          className="rounded-l-none"
        >
          <Plus aria-hidden />
        </IconButton>
      </span>
    </li>
  )
}

const BAND_TONE: Readonly<Record<DifficultyBand, string>> = {
  none: 'text-muted-foreground',
  'below-low': 'text-muted-foreground',
  low: 'text-emerald-700 dark:text-emerald-400',
  moderate: 'text-amber-700 dark:text-amber-400',
  high: 'text-orange-700 dark:text-orange-400',
  'beyond-high': 'text-red-700 dark:text-red-400',
}

/**
 * How hard the fight is for the party now, and with the picked enemies added, against the
 * party's Low, Moderate, and High budgets.
 */
function DifficultyMeter({
  budget,
  standingXp,
  addedXp,
}: {
  budget: DifficultyBudget
  standingXp: number
  addedXp: number
}) {
  if (budget.high === 0)
    return (
      <p className="text-muted-foreground text-sm">
        Add the party to the fight to see how hard it is for them.
      </p>
    )
  const after = standingXp + addedXp
  const scale = Math.max(budget.high * 1.5, after)
  const at = (xp: number) => `${Math.min(100, (xp / scale) * 100)}%`
  const now = difficultyBand(standingXp, budget)
  const then = difficultyBand(after, budget)
  return (
    <section aria-label="How hard the fight is" className="grid gap-2">
      <p className="flex flex-wrap items-baseline gap-x-2 text-base">
        <span className="text-muted-foreground">Still standing:</span>
        <strong className={BAND_TONE[now]}>{DIFFICULTY_LABEL[now]}</strong>
        {addedXp > 0 ? (
          <>
            <span className="text-muted-foreground">→ with these:</span>
            <strong className={BAND_TONE[then]}>{DIFFICULTY_LABEL[then]}</strong>
          </>
        ) : null}
      </p>
      <div className="bg-muted relative h-4 overflow-hidden rounded-full">
        <div className="absolute inset-y-0 left-0 bg-slate-500" style={{ width: at(standingXp) }} />
        <div
          className="absolute inset-y-0 bg-amber-500"
          style={{ left: at(standingXp), width: `calc(${at(after)} - ${at(standingXp)})` }}
        />
        {(['low', 'moderate', 'high'] as const).map((band) => (
          <div
            key={band}
            aria-hidden
            className="bg-foreground/70 absolute inset-y-0 w-0.5"
            style={{ left: at(budget[band]) }}
          />
        ))}
      </div>
      <p className="text-muted-foreground flex justify-between gap-2 text-xs tabular-nums">
        <span>
          {after.toLocaleString()} XP
          {addedXp > 0 ? ` (+${addedXp.toLocaleString()})` : ''}
        </span>
        <span>
          Low {budget.low.toLocaleString()} · Moderate {budget.moderate.toLocaleString()} · High{' '}
          {budget.high.toLocaleString()}
        </span>
      </p>
    </section>
  )
}
