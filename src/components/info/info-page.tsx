'use client'

const REST_TABLE = [
  { type: 'Heavy Compound', rest: '2-3 min' },
  { type: 'Moderate Compound', rest: '90-120s' },
  { type: 'Accessory / Isolation', rest: '60-90s' },
  { type: 'Superset (transition)', rest: '~15s' },
  { type: 'Superset (after pair)', rest: '90s' },
]

const TERMS = [
  {
    abbr: 'RIR',
    def: 'Reps In Reserve — how many reps you could still do before failure',
  },
  {
    abbr: 'AMRAP',
    def: 'As Many Reps As Possible — push the last set to near-failure',
  },
  {
    abbr: 'SUPERSET',
    def: 'Two exercises back-to-back with minimal rest between them',
  },
  {
    abbr: 'DELOAD',
    def: 'A planned recovery week with reduced volume and intensity',
  },
  {
    abbr: '1RM',
    def: 'One Rep Max — the heaviest weight you could lift for 1 rep',
  },
  {
    abbr: 'RPE',
    def: 'Rate of Perceived Exertion — how hard a set felt (1-10 scale)',
  },
]

export function InfoPage() {
  return (
    <div className="space-y-4 pb-4">
      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          PROGRESSIVE OVERLOAD
        </h3>
        <div className="space-y-2 font-body text-muted-foreground text-xs">
          <div>
            <span className="font-semibold text-foreground">
              Compound lifts:
            </span>{' '}
            If you hit the top of your rep range on the AMRAP set, add 2.5kg
            next session. If not, keep the same weight.
          </div>
          <div>
            <span className="font-semibold text-foreground">Accessories:</span>{' '}
            When you can hit the top of the rep range on all sets, increase
            weight by the smallest increment.
          </div>
          <div>
            <span className="font-semibold text-foreground">Deload:</span> Every
            4-5 weeks, reduce volume by 40-50% and intensity by 10-15%. Focus on
            form and recovery.
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          REST PERIODS
        </h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="py-1 text-left font-body text-muted-foreground">
                Exercise Type
              </th>
              <th className="py-1 text-right font-body text-muted-foreground">
                Rest
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
          RECOVERY & NUTRITION
        </h3>
        <div className="grid grid-cols-2 gap-2 font-body text-xs">
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">Sleep</div>
            <div className="text-muted-foreground">7-9 hours/night</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">Protein</div>
            <div className="text-muted-foreground">1.6-2.2g/kg/day</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">Calories</div>
            <div className="text-muted-foreground">Surplus to grow</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1.5">
            <div className="font-semibold text-foreground">Hydration</div>
            <div className="text-muted-foreground">2-3L water/day</div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="mb-2 font-display text-sm tracking-wider">
          TERMINOLOGY
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {TERMS.map((t) => (
            <div key={t.abbr} className="rounded-md bg-muted px-2 py-1.5">
              <div className="font-mono font-semibold text-foreground text-xs">
                {t.abbr}
              </div>
              <div className="font-body text-[10px] text-muted-foreground">
                {t.def}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
