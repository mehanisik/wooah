'use client'

import { useT } from '@/lib/i18n'

export function InfoPage() {
  const t = useT()

  const REST_TABLE = [
    { type: t('restHeavyCompound'), rest: t('restHeavyCompoundTime') },
    { type: t('restModerateCompound'), rest: t('restModerateCompoundTime') },
    { type: t('restAccessory'), rest: t('restAccessoryTime') },
    {
      type: t('restSupersetTransition'),
      rest: t('restSupersetTransitionTime'),
    },
    { type: t('restSupersetAfter'), rest: t('restSupersetAfterTime') },
  ]

  const TERMS = [
    { abbr: 'RIR', def: t('rirDef') },
    { abbr: 'AMRAP', def: t('amrapDef') },
    { abbr: 'SUPERSET', def: t('supersetDef') },
    { abbr: 'DELOAD', def: t('deloadDef') },
    { abbr: '1RM', def: t('oneRmDef') },
    { abbr: 'RPE', def: t('rpeDef') },
  ]

  return (
    <div className="space-y-4 pb-4">
      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          {t('progressiveOverload')}
        </h3>
        <div className="space-y-2 font-body text-muted-foreground text-xs">
          <div>
            <span className="font-semibold text-foreground">
              {t('compoundLifts')}
            </span>{' '}
            {t('compoundLiftsDesc')}
          </div>
          <div>
            <span className="font-semibold text-foreground">
              {t('accessoriesLabel')}
            </span>{' '}
            {t('accessoriesDesc')}
          </div>
          <div>
            <span className="font-semibold text-foreground">
              {t('deloadInfo')}
            </span>{' '}
            {t('deloadInfoDesc')}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          {t('restPeriods')}
        </h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="py-1 text-left font-body text-muted-foreground">
                {t('exerciseTypeHeader')}
              </th>
              <th className="py-1 text-right font-body text-muted-foreground">
                {t('restHeader')}
              </th>
            </tr>
          </thead>
          <tbody>
            {REST_TABLE.map((row) => (
              <tr key={row.type} className="border-border/50 border-b">
                <td className="py-1 font-body">{row.type}</td>
                <td className="py-1 text-right font-mono text-muted-foreground">
                  {row.rest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          {t('recoveryNutrition')}
        </h3>
        <div className="grid grid-cols-2 gap-2 font-body text-xs">
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">
              {t('infoSleep')}
            </div>
            <div className="text-muted-foreground">{t('infoSleepDesc')}</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">
              {t('infoProtein')}
            </div>
            <div className="text-muted-foreground">{t('infoProteinDesc')}</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">
              {t('infoCalories')}
            </div>
            <div className="text-muted-foreground">{t('infoCaloriesDesc')}</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">
              {t('infoHydration')}
            </div>
            <div className="text-muted-foreground">
              {t('infoHydrationDesc')}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          {t('terminology')}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {TERMS.map((term) => (
            <div key={term.abbr} className="rounded-md bg-muted px-2 py-1.5">
              <div className="font-mono font-semibold text-foreground text-xs">
                {term.abbr}
              </div>
              <div className="font-body text-[10px] text-muted-foreground">
                {term.def}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
