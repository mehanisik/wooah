'use client'

import { ChevronRight, Info } from 'lucide-react'
import Link from 'next/link'
import { SettingsPageClient } from '@/app/settings/client'
import { useT } from '@/lib/i18n'

export function MePage() {
  const t = useT()

  return (
    <div className="space-y-4 pb-4">
      <Link
        href="/me/info"
        className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-accent"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="font-display text-sm tracking-wider">
            {t('trainingInfo')}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>

      <SettingsPageClient />
    </div>
  )
}
