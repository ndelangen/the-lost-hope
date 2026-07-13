import { Moon, Sun } from 'lucide-react'

import type { Theme } from './theme'

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const targetTheme = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${targetTheme} mode`

  return (
    <button
      type="button"
      onClick={onToggle}
      className="border-border text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 inline-flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none"
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </button>
  )
}
