import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { FightSimReplay } from '#/components/dm/fight-sim-replay'
import { FlowDiagram } from '#/components/dm/flow-diagram'
import { EntityReference } from '#/components/entity-reference'
import { refs } from '#/data/generated/refs'
import { refLink } from '#/lib/campaign'
import {
  type SimScenario,
  REPLAY_FOES,
  REPLAY_MISTAKES,
  SIM_PCS,
  findReplays,
  findScenario,
  lossRooms,
  outcomeMatrix,
  percent,
  rideTheLightningSims as sims,
  scenarioFlow,
} from '#/lib/sims/fight-sims'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/dm/tools/fight-sims')({
  head: () => ({
    meta: [{ title: 'Fight sims | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: FightSimsPage,
})

const ship = refLink(refs.items.ride_the_lightning)

/** Status colours: a win, a fight still going after 20 rounds, and a party knocked out. */
const OUTCOMES = [
  { key: 'win', label: 'Party wins', fill: 'bg-[#0ca30c]' },
  { key: 'stall', label: 'Still fighting', fill: 'bg-[#fab219]' },
  { key: 'tpk', label: 'Party knocked out', fill: 'bg-[#d03b3b]' },
] as const

const PC_FILL: Record<string, string> = {
  Devan: 'bg-[#2a78d6] dark:bg-[#3987e5]',
  Auren: 'bg-[#eb6834] dark:bg-[#d95926]',
  Cassian: 'bg-[#1baf7a] dark:bg-[#199e70]',
  Swift: 'bg-[#eda100] dark:bg-[#c98500]',
}

const chipClass = (active: boolean) =>
  cn(
    'border-border rounded-md border px-2.5 py-1 text-sm',
    active ? 'bg-foreground text-background' : 'hover:bg-muted',
  )

function OutcomeBar({ scenario, className }: { scenario: SimScenario; className?: string }) {
  return (
    <div className={cn('flex h-2.5 gap-0.5 overflow-hidden rounded-full', className)}>
      {OUTCOMES.map((outcome) =>
        scenario[outcome.key] > 0 ? (
          <div
            key={outcome.key}
            className={cn('h-full first:rounded-l-full last:rounded-r-full', outcome.fill)}
            style={{ width: `${scenario[outcome.key] * 100}%` }}
            title={`${outcome.label}: ${percent(scenario[outcome.key])}`}
          />
        ) : null,
      )}
    </div>
  )
}

function FightSimsPage() {
  const [foes, setFoes] = useState('as-written')
  const [mistakes, setMistakes] = useState(0.1)
  const [party, setParty] = useState('scene')
  const [route, setRoute] = useState(sims.routes[0].key)
  const [crystal, setCrystal] = useState(sims.crystal[0].key)
  const [replayKind, setReplayKind] = useState<'win' | 'tpk'>('tpk')

  const matrix = outcomeMatrix(sims, { foes, party, mistakes })
  const scenario = findScenario(sims, { route, crystal, foes, party, mistakes })
  const replays = findReplays(sims, route, crystal, party)
  const replay = replays.find((r) => r.kind === replayKind) ?? replays[0]
  const routeOption = sims.routes.find((r) => r.key === route)
  const crystalOption = sims.crystal.find((c) => c.key === crystal)
  const foesOption = sims.foes.find((f) => f.key === foes)
  const partyOption = sims.party.find((p) => p.key === party)
  const replayParty = sims.party.find((p) => p.key === replay?.party)

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-6">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold">Fight sims</h1>
          <p className="text-muted-foreground max-w-3xl text-sm">
            The rest of the take-back of{' '}
            {ship ? <EntityReference kind={ship.kind} slug={ship.slug} /> : 'the cruiser'}, played
            turn by turn {sims.runs.toLocaleString()} times for every combination below. Every AC,
            hit point total, attack, save and DC comes from the stat blocks in the data. Mistakes
            are the chance that a player misplays a choice on a turn, such as forgetting Shield or
            hitting the wrong target.
          </p>
        </div>

        <section className="border-border bg-card grid gap-3 rounded-xl border p-3 text-sm sm:p-4">
          <div className="grid gap-1.5">
            <h2 className="font-semibold">How the enemies fight</h2>
            <div className="flex flex-wrap gap-1.5">
              {sims.foes.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={foes === option.key}
                  className={chipClass(foes === option.key)}
                  onClick={() => setFoes(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground">{foesOption?.detail}</p>
          </div>
          <div className="grid gap-1.5">
            <h2 className="font-semibold">Who the party goes for at the Helm</h2>
            <div className="flex flex-wrap gap-1.5">
              {sims.party.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={party === option.key}
                  className={chipClass(party === option.key)}
                  onClick={() => setParty(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground">{partyOption?.detail}</p>
          </div>
          <div className="grid gap-1.5">
            <h2 className="font-semibold">Player mistakes</h2>
            <div className="flex flex-wrap gap-1.5">
              {sims.mistakes.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  aria-pressed={mistakes === rate}
                  className={chipClass(mistakes === rate)}
                  onClick={() => setMistakes(rate)}
                >
                  {rate === 0 ? 'None' : `${Math.round(rate * 100)}% of choices`}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold">Route and crystal room</h2>
            <div className="text-muted-foreground flex flex-wrap gap-3 text-xs">
              {OUTCOMES.map((outcome) => (
                <span key={outcome.key} className="inline-flex items-center gap-1.5">
                  <span className={cn('size-2.5 rounded-sm', outcome.fill)} />
                  {outcome.label}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-separate border-spacing-1.5 text-sm">
              <thead>
                <tr>
                  <th className="w-44">
                    <span className="sr-only">Route</span>
                  </th>
                  {sims.crystal.map((option) => (
                    <th
                      key={option.key}
                      scope="col"
                      className="text-left align-bottom font-medium"
                      title={option.detail}
                    >
                      {option.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.route.key}>
                    <th
                      scope="row"
                      className="text-left align-top font-medium"
                      title={row.route.detail}
                    >
                      {row.route.label}
                    </th>
                    {row.cells.map(({ crystal: option, scenario: cell }) => {
                      const selected = route === row.route.key && crystal === option.key
                      return (
                        <td key={option.key} className="align-top">
                          {cell ? (
                            <button
                              type="button"
                              aria-pressed={selected}
                              onClick={() => {
                                setRoute(row.route.key)
                                setCrystal(option.key)
                              }}
                              className={cn(
                                'border-border bg-card hover:bg-muted grid w-full gap-1.5 rounded-lg border p-2 text-left',
                                selected && 'ring-foreground ring-2',
                              )}
                            >
                              <span className="flex items-baseline justify-between gap-2">
                                <span className="text-lg font-semibold tabular-nums">
                                  {percent(cell.tpk)}
                                </span>
                                <span className="text-muted-foreground text-xs">knocked out</span>
                              </span>
                              <OutcomeBar scenario={cell} />
                              <span className="text-muted-foreground text-xs tabular-nums">
                                {percent(cell.win)} win
                                {cell.stall > 0 ? ` · ${percent(cell.stall)} still fighting` : ''}
                              </span>
                            </button>
                          ) : null}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="text-muted-foreground grid gap-1 text-xs sm:grid-cols-2">
            {[...sims.routes, ...sims.crystal].map((option) => (
              <div key={option.key}>
                <dt className="text-foreground inline font-medium">{option.label}: </dt>
                <dd className="inline">{option.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        {scenario ? (
          <section className="border-border bg-card grid gap-4 rounded-xl border p-3 sm:p-4">
            <div className="grid gap-1">
              <h2 className="text-xl font-semibold">
                {routeOption?.label} · {crystalOption?.label}
              </h2>
              <p className="text-muted-foreground text-sm">
                {foesOption?.label} enemies, {partyOption?.label.toLowerCase()} at the Helm,{' '}
                {mistakes === 0 ? 'no mistakes' : `${Math.round(mistakes * 100)}% mistakes`}.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {OUTCOMES.map((outcome) => (
                <div key={outcome.key} className="bg-muted/40 grid gap-0.5 rounded-lg p-3">
                  <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
                    <span className={cn('size-2.5 rounded-sm', outcome.fill)} />
                    {outcome.label}
                  </span>
                  <span className="text-2xl font-semibold tabular-nums">
                    {percent(scenario[outcome.key])}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="font-semibold">Where it goes wrong</h3>
              {lossRooms(scenario).length === 0 ? (
                <p className="text-muted-foreground">Never, in these runs.</p>
              ) : (
                <ul className="grid gap-0.5">
                  {lossRooms(scenario).map((loss) => (
                    <li key={loss.room}>
                      {loss.room}: <span className="tabular-nums">{percent(loss.share)}</span> of
                      runs
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-muted-foreground">
                Per run they use {scenario.potions.toFixed(1)} potions and{' '}
                {scenario.bottles.toFixed(1)} Long Rest bottles ({scenario.bottlesPoured.toFixed(2)}{' '}
                of them poured into a friend who is down). The party lands{' '}
                {scenario.crits.pc.toFixed(1)} crits and takes {scenario.crits.foe.toFixed(1)}.
                Silas escapes in {percent(scenario.silasFled)} of runs. Someone dies in{' '}
                {percent(scenario.anyDead)} of runs.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <thead className="text-muted-foreground text-left text-xs">
                  <tr>
                    <th className="py-1 font-medium">Character</th>
                    <th className="py-1 font-medium">Goes down</th>
                    <th className="py-1 font-medium">Dies</th>
                    <th className="py-1 font-medium">Paralysed</th>
                    <th className="py-1 font-medium">Kills per run</th>
                    <th className="py-1 font-medium">Damage taken</th>
                    <th className="w-2/5 py-1 font-medium">Share of the damage</th>
                  </tr>
                </thead>
                <tbody>
                  {SIM_PCS.map((pc) => (
                    <tr key={pc} className="border-border border-t">
                      <td className="py-1.5 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={cn('size-2.5 rounded-sm', PC_FILL[pc])} />
                          {pc}
                        </span>
                      </td>
                      <td className="tabular-nums">{percent(scenario.down[pc])}</td>
                      <td className="tabular-nums">{percent(scenario.dead[pc])}</td>
                      <td className="tabular-nums">{percent(scenario.held[pc])}</td>
                      <td className="tabular-nums">{scenario.kills[pc].toFixed(1)}</td>
                      <td className="tabular-nums">{Math.round(scenario.taken[pc])}</td>
                      <td aria-label={`${percent(scenario.damageShare[pc])} of the damage`}>
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="bg-muted h-2 flex-1 overflow-hidden rounded-full"
                          >
                            <span
                              className={cn('block h-full rounded-full', PC_FILL[pc])}
                              style={{ width: `${scenario.damageShare[pc] * 100}%` }}
                            />
                          </span>
                          <span className="w-9 text-right tabular-nums">
                            {percent(scenario.damageShare[pc])}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-1">
              <h3 className="text-sm font-semibold">Who hits whom, per run on average</h3>
              <p className="text-muted-foreground text-xs">
                All rooms together. Hover a band for its number.
              </p>
              <FlowDiagram
                links={scenarioFlow(scenario)}
                label="Damage per run on average, from each kind of combatant to each other"
              />
            </div>
          </section>
        ) : null}

        {replay ? (
          <section className="border-border bg-card grid gap-3 rounded-xl border p-3 sm:p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="grid gap-0.5">
                <h2 className="text-xl font-semibold">Watch one run</h2>
                <p className="text-muted-foreground text-sm">
                  {routeOption?.label} · {crystalOption?.label} · {replayParty?.label}, with the
                  enemies as written and {Math.round(REPLAY_MISTAKES * 100)}% mistakes
                  {foes !== REPLAY_FOES ||
                  mistakes !== REPLAY_MISTAKES ||
                  replayParty?.key !== party
                    ? ' (runs are kept for those settings only)'
                    : ''}
                  .
                </p>
              </div>
              <div className="flex gap-1.5">
                {replays.map((r) => (
                  <button
                    key={r.kind}
                    type="button"
                    aria-pressed={replay.kind === r.kind}
                    className={chipClass(replay.kind === r.kind)}
                    onClick={() => setReplayKind(r.kind === 'tpk' ? 'tpk' : 'win')}
                  >
                    {r.kind === 'tpk' ? 'A run they lose' : 'A run they win'}
                  </button>
                ))}
              </div>
            </div>
            <FightSimReplay replay={replay} />
          </section>
        ) : null}
      </div>
      <aside className="order-first grid min-w-0 content-start gap-4 xl:sticky xl:top-20 xl:order-none">
        <DmQuickLinks stackAt="xl" />
      </aside>
    </div>
  )
}
