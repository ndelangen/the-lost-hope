import { EntityReference } from '#/components/entity-reference'
import { Stack } from '#/components/ui/layout'
import type { EffectText as EffectTextValue, EffectTextToken } from '#/definitions/effect'
import { refLink } from '#/lib/campaign'
import { cn } from '#/lib/utils'

/** Renders effect rules: text, campaign references, and damage rolls. */
export function EffectText({ text, className }: { text: EffectTextValue; className?: string }) {
  return (
    <Stack gap="sm" className={cn('text-sm leading-relaxed', className)}>
      {text.map((paragraph, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- rules paragraphs lack stable ids
        <EffectTokens key={index} tokens={paragraph} as="p" />
      ))}
    </Stack>
  )
}

/** One run of effect tokens, rendered inline. */
export function EffectTokens({
  tokens,
  as: Element = 'span',
}: {
  tokens: readonly EffectTextToken[]
  as?: 'p' | 'span'
}) {
  return (
    <Element>
      {tokens.map((token, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- rules tokens lack stable ids
        <EffectToken key={index} token={token} />
      ))}
    </Element>
  )
}

function EffectToken({ token }: { token: EffectTextToken }) {
  if (typeof token === 'string') return <span>{token}</span>
  if ('dice' in token) {
    return (
      <span className="bg-muted rounded px-1 py-0.5 font-mono text-[0.8125rem] font-semibold whitespace-nowrap">
        {token.dice} {token.type}
      </span>
    )
  }
  const link = refLink(token)
  return link ? <EntityReference kind={link.kind} slug={link.slug} label={link.name} /> : null
}
