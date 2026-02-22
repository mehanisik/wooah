'use client'

import { useState } from 'react'
import { InstallPrompt } from '@/components/layout/install-prompt'
import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/hooks/auth-context'
import { useT } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/types'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { signOut } from '@/lib/supabase/auth'

export function SettingsPageClient() {
  const t = useT()
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const plateSettings = useWorkoutStore((s) => s.plateSettings)
  const locale = useWorkoutStore((s) => s.locale)
  const setLocale = useWorkoutStore((s) => s.setLocale)
  const [barWeight, setBarWeight] = useState(String(plateSettings.barWeight))

  const handleBarWeightSave = () => {
    const w = Number.parseFloat(barWeight)
    if (w > 0 && w <= 50) {
      useWorkoutStore.setState((s) => ({
        plateSettings: { ...s.plateSettings, barWeight: w },
      }))
    }
  }

  const handleUnitChange = (unit: string) => {
    useWorkoutStore.setState((s) => ({
      plateSettings: { ...s.plateSettings, unit: unit as 'kg' | 'lbs' },
    }))
  }

  const exportData = () => {
    const state = useWorkoutStore.getState()
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ironppl-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        useWorkoutStore.getState().mergeState(data)
      } catch {
        // ignore invalid JSON
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-4 pb-4">
      <h2 className="font-display text-lg tracking-wider">{t('settings')}</h2>

      <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="font-display text-sm tracking-wider">{t('theme')}</h3>
        <Select
          value={theme}
          onValueChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light" className="text-xs">
              {t('light')}
            </SelectItem>
            <SelectItem value="dark" className="text-xs">
              {t('dark')}
            </SelectItem>
            <SelectItem value="system" className="text-xs">
              {t('system')}
            </SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="font-display text-sm tracking-wider">{t('language')}</h3>
        <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en" className="text-xs">
              English
            </SelectItem>
            <SelectItem value="pl" className="text-xs">
              Polski
            </SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="font-display text-sm tracking-wider">
          {t('plateCalculator')}
        </h3>
        <div className="flex items-center gap-2">
          <label
            htmlFor="bar-weight"
            className="w-20 font-body text-muted-foreground text-xs"
          >
            {t('barWeight')}
          </label>
          <Input
            id="bar-weight"
            type="number"
            value={barWeight}
            onChange={(e) => setBarWeight(e.target.value)}
            onBlur={handleBarWeightSave}
            className="h-8 w-20 font-mono text-xs"
          />
          <span className="text-muted-foreground text-xs">kg</span>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="plate-unit"
            className="w-20 font-body text-muted-foreground text-xs"
          >
            {t('unitLabel')}
          </label>
          <Select value={plateSettings.unit} onValueChange={handleUnitChange}>
            <SelectTrigger id="plate-unit" className="h-8 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg" className="text-xs">
                kg
              </SelectItem>
              <SelectItem value="lbs" className="text-xs">
                lbs
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <InstallPrompt />

      <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="font-display text-sm tracking-wider">{t('data')}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={exportData}
          >
            {t('exportData')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="relative flex-1 text-xs"
            asChild
          >
            <label>
              {t('importData')}
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={importData}
              />
            </label>
          </Button>
        </div>
      </section>

      {user && (
        <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
          <h3 className="font-display text-sm tracking-wider">
            {t('account')}
          </h3>
          <p className="truncate font-body text-muted-foreground text-xs">
            {user.email}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => signOut()}
          >
            {t('signOut')}
          </Button>
        </section>
      )}
    </div>
  )
}
