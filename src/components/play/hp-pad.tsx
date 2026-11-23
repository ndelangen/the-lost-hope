import { Delete, HeartPlus, ShieldPlus, Sword, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import type { LiveStats } from '#/lib/encounter'
import { cn } from '#/lib/utils'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const

/**
 * A number pad that rises from the bottom of the screen: type an amount, then say what it is.
 * It never opens the phone's keyboard, so the buttons stay in reach of a thumb.
 */
export function HpPad({
  live,
  onClose,
  onDamage,
  onHeal,
  onTemp,
}: {
  live: LiveStats
  onClose: () => void
  onDamage: (amount: number) => void
  onHeal: (amount: number) => void
  onTemp: (amount: number) => void
}) {
  const [digits, setDigits] = useState('')
  const amount = digits ? Number(digits) : 0
  const hp = live.hp ?? 0
  const temp = live.temp ?? 0

  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (/^\d$/.test(event.key)) setDigits((current) => (current + event.key).slice(0, 3))
      else if (event.key === 'Backspace') setDigits((current) => current.slice(0, -1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const apply = (action: (amount: number) => void) => {
    if (!amount) return
    action(amount)
    onClose()
  }

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- a tap on the backdrop closes it; Escape already does
    <dialog
      ref={dialog}
      aria-label="Change hit points"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="text-foreground m-0 mx-auto mt-auto w-full max-w-md bg-transparent p-0 backdrop:bg-black/40 md:my-auto"
    >
      <div className="bg-card grid w-full gap-3 rounded-t-3xl border p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl md:rounded-3xl">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            <RuleTerm rule={refs.rules.hit_points}>Hit Points</RuleTerm>{' '}
            <span className="text-foreground font-bold tabular-nums">
              {hp} / {live.maxHp}
            </span>
            {temp ? (
              <span className="ml-1.5 font-semibold text-sky-600 tabular-nums dark:text-sky-400">
                +{temp} Temp HP
              </span>
            ) : null}
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted grid size-10 place-items-center rounded-full"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <output
          aria-label="Amount"
          className={cn(
            'bg-muted/50 grid h-16 place-items-center rounded-2xl text-4xl font-bold tabular-nums',
            !digits && 'text-muted-foreground/60',
          )}
        >
          {digits || '0'}
        </output>

        <div className="grid grid-cols-3 gap-2">
          {KEYS.map((key) => (
            <PadKey key={key} onPress={() => setDigits((current) => (current + key).slice(0, 3))}>
              {key}
            </PadKey>
          ))}
          <PadKey label="Clear" onPress={() => setDigits('')}>
            <span className="text-base font-semibold">Clear</span>
          </PadKey>
          <PadKey
            onPress={() => setDigits((current) => (current ? `${current}0`.slice(0, 3) : ''))}
          >
            0
          </PadKey>
          <PadKey label="Delete last digit" onPress={() => setDigits((c) => c.slice(0, -1))}>
            <Delete aria-hidden className="size-6" />
          </PadKey>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Apply
            tone="border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400"
            icon={<Sword aria-hidden />}
            label="Damage"
            // Temporary hit points take the damage first.
            result={amount ? `${hp} → ${Math.max(0, hp - Math.max(0, amount - temp))}` : undefined}
            disabled={!amount}
            onPress={() => apply(onDamage)}
          />
          <Apply
            tone="border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            icon={<HeartPlus aria-hidden />}
            label="Heal"
            result={
              amount ? `${hp} → ${Math.min(live.maxHp ?? hp + amount, hp + amount)}` : undefined
            }
            disabled={!amount}
            onPress={() => apply(onHeal)}
          />
          <Apply
            tone="border-sky-500/50 bg-sky-500/10 text-sky-700 dark:text-sky-300"
            icon={<ShieldPlus aria-hidden />}
            label="Temp HP"
            result={amount ? (temp ? `${temp} → ${amount}` : `+${amount}`) : undefined}
            disabled={!amount}
            onPress={() => apply(onTemp)}
          />
        </div>
        {temp ? (
          <button
            type="button"
            className="text-muted-foreground justify-self-center text-sm underline underline-offset-4"
            onClick={() => {
              onTemp(0)
              onClose()
            }}
          >
            Remove the {temp} Temp HP
          </button>
        ) : null}
      </div>
    </dialog>
  )
}

function PadKey({
  children,
  label,
  onPress,
}: {
  children: ReactNode
  label?: string
  onPress: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onPress}
      className="bg-muted/60 active:bg-muted grid h-14 place-items-center rounded-2xl text-2xl font-semibold tabular-nums select-none"
    >
      {children}
    </button>
  )
}

function Apply({
  tone,
  icon,
  label,
  result,
  disabled,
  onPress,
}: {
  tone: string
  icon: ReactNode
  label: string
  /** What the number becomes, shown before the player commits. */
  result?: string
  disabled: boolean
  onPress: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPress}
      className={cn(
        'grid h-16 place-items-center content-center gap-0.5 rounded-2xl border-2 font-semibold disabled:opacity-40 [&_svg]:size-5',
        tone,
      )}
    >
      <span className="flex items-center gap-1.5">
        {icon} {label}
      </span>
      <span className="text-xs font-medium tabular-nums opacity-80">{result ?? ' '}</span>
    </button>
  )
}
