// PROTOTYPE — disposable selective-hydration spike.
//
// Question: can a self-contained current feature hydrate on interaction while the surrounding
// campaign shell remains prerendered HTML that never downloads the canonical campaign graph?

import { useTheme } from './campaign-shell/theme'
import { ThemeToggle } from './campaign-shell/theme-toggle'

export function PrototypeMinimalJsTheme() {
  const { theme, toggleTheme } = useTheme()

  return <ThemeToggle theme={theme} onToggle={toggleTheme} />
}
