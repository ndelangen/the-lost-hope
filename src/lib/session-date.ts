const SESSION_DATE_FORMATTERS = {
  long: new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }),
  medium: new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }),
} as const

export function formatSessionDate(date: Date, style: keyof typeof SESSION_DATE_FORMATTERS): string {
  return SESSION_DATE_FORMATTERS[style].format(date)
}
