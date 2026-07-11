import { Search } from 'lucide-react'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '#/lib/utils'

import { Input } from './input'

type SearchInputProps = ComponentPropsWithoutRef<'input'> & {
  containerClassName?: string
}

/** Search-specific field composition: one icon and one shared input. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, containerClassName, type = 'search', ...props },
  ref,
) {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden
      />
      <Input ref={ref} type={type} className={cn('pr-3 pl-9', className)} {...props} />
    </div>
  )
})
