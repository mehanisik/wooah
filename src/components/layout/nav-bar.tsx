'use client'

import { BarChart3, CalendarDays, Home, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/', icon: Home, labelKey: 'navToday' as const },
  { href: '/stats', icon: BarChart3, labelKey: 'navStats' as const },
  { href: '/progress', icon: CalendarDays, labelKey: 'navProgress' as const },
  { href: '/me', icon: User, labelKey: 'navMe' as const },
]

export function NavBar() {
  const t = useT()
  const pathname = usePathname()

  return (
    <nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-40 border-border border-t bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg">
        <div className="flex">
          {TABS.map(({ href, icon: Icon, labelKey }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-body font-semibold text-[10px] uppercase tracking-wider">
                  {t(labelKey)}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
