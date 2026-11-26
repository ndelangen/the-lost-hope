import { DamageType } from '#/components/damage-type'
import { RuleTerm } from '#/components/rule-term'
import { type StatPart } from '#/lib/stat-block'

/**
 * Derived numbers such as "+5, 8 (1d10 + 3) piercing" with rules words explained in place and
 * damage types in their icon and colour. Inside another button, pass `interactive={false}`: the
 * words keep their look but don't open their own explanation.
 */
export function StatParts({
  parts,
  interactive = true,
}: {
  parts: readonly StatPart[]
  interactive?: boolean
}) {
  return (
    <>
      {parts.map((part, index) => {
        // oxlint-disable-next-line react/no-array-index-key -- parts are positional
        const key = index
        switch (part.kind) {
          case 'text':
            return <span key={key}>{part.text}</span>
          case 'value':
            return part.note ? (
              // The book prints this number differently from the formula; the DM sees which.
              <span
                key={key}
                title={part.note}
                className="tabular-nums underline decoration-amber-500 decoration-dotted underline-offset-4"
              >
                {part.text}
              </span>
            ) : (
              <span key={key} className="tabular-nums">
                {part.text}
              </span>
            )
          case 'term':
            return interactive ? (
              <RuleTerm key={key} rule={part.rule}>
                {part.label}
              </RuleTerm>
            ) : (
              <span key={key}>{part.label}</span>
            )
          case 'damage':
            return (
              <span key={key} className="tabular-nums">
                {part.amount}
                {part.roll === String(part.amount) ? null : ` (${part.roll})`}
                {part.type ? (
                  <>
                    {' '}
                    <DamageType type={part.type} interactive={interactive} />
                  </>
                ) : null}
              </span>
            )
        }
      })}
    </>
  )
}
