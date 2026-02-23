'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { useState } from 'react'
import { InstallPrompt } from '@/components/layout/install-prompt'
import { ProgramPicker } from '@/components/program/program-picker'
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
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/types'
import { api } from '../../../convex/_generated/api'

export function SettingsPageClient() {
  const t = useT()
  const { theme, setTheme } = useTheme()
  const { signOut } = useAuthActions()
  const prefs = useQuery(api.preferences.get)
  const upsertPrefs = useMutation(api.preferences.upsert)

  const plateSettings = prefs?.plateSettings ?? {
    barWeight: 20,
    unit: 'kg' as const,
  }
  const locale = (prefs?.locale ?? 'en') as Locale
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const activeTemplate = getTemplateOrDefault(activeProgramId)

  const [barWeight, setBarWeight] = useState(String(plateSettings.barWeight))
  const [pickerOpen, setPickerOpen] = useState(false)

  const handleBarWeightSave = () => {
    const w = Number.parseFloat(barWeight)
    if (w > 0 && w <= 50) {
      upsertPrefs({
        plateSettings: { ...plateSettings, barWeight: w },
      })
    }
  }

  const handleUnitChange = (unit: string) => {
    upsertPrefs({
      plateSettings: { ...plateSettings, unit: unit as 'kg' | 'lbs' },
    })
  }

  const handleLocaleChange = (v: string) => {
    upsertPrefs({ locale: v as Locale })
  }

  const handleSwitchProgram = (programId: string, trainingDays: number[]) => {
    upsertPrefs({ activeProgramId: programId, trainingDays })
  }

  return (
    <div className="space-y-4 pb-4">
      <h2 className="font-display text-lg tracking-wider">{t('settings')}</h2>

      <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="font-display text-sm tracking-wider">
          {t('programLabel')}
        </h3>
        <p className="font-body text-muted-foreground text-xs">
          {t('currentProgram', { name: activeTemplate.meta.name })}
          {' — '}
          {t('daysPerWeek', { count: activeTemplate.meta.daysPerWeek })}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => setPickerOpen(true)}
        >
          {t('changeProgram')}
        </Button>
      </section>

      <ProgramPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        currentProgramId={activeProgramId}
        onSelect={handleSwitchProgram}
      />

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
        <Select value={locale} onValueChange={handleLocaleChange}>
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
        <h3 className="font-display text-sm tracking-wider">{t('account')}</h3>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => signOut()}
        >
          {t('signOut')}
        </Button>
      </section>
    </div>
  )
}
