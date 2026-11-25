import type { SrdVersion } from '#/lib/published-library'

const sources = {
  'srd-5-1': {
    name: '5.1',
    url: 'https://dnd.wizards.com/resources/systems-reference-document',
  },
  'srd-5-2-1': {
    name: '5.2.1',
    url: 'https://www.dndbeyond.com/srd',
  },
} satisfies Record<SrdVersion, { name: string; url: string }>

export function LibraryAttribution({ versions }: { versions: readonly SrdVersion[] }) {
  return (
    <div className="text-muted-foreground grid gap-1 text-xs">
      {versions.map((version) => {
        const { name, url } = sources[version]
        return (
          <p key={version}>
            This work includes material from the{' '}
            <a className="underline" href={url}>
              System Reference Document {name}
            </a>{' '}
            by Wizards of the Coast LLC. The SRD {name} is licensed under the{' '}
            <a className="underline" href="https://creativecommons.org/licenses/by/4.0/legalcode">
              Creative Commons Attribution 4.0 International License
            </a>
            . The library summaries are adaptations.
          </p>
        )
      })}
    </div>
  )
}
