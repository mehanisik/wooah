import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/state/store.js', () => ({
  state: { plateSettings: null },
  getLastSession: vi.fn(),
  debouncedSave: vi.fn(),
}));

const { generateWarmupSets } = await import('../../src/ui/warmup-calc.js');

function isMultipleOf2_5(n) {
  return Math.abs(Math.round(n / 2.5) * 2.5 - n) < 0.01;
}

describe('generateWarmupSets', () => {
  it('returns empty for weight=0', () => {
    expect(generateWarmupSets(0, 'Bench Press')).toEqual([]);
  });

  it('returns empty for negative weight', () => {
    expect(generateWarmupSets(-10, 'Bench Press')).toEqual([]);
  });

  it('returns 2 sets for weight <= 60kg', () => {
    const sets = generateWarmupSets(50, 'Bench Press');
    expect(sets.length).toBe(2);
    expect(sets[0].weight).toBe(20);
    expect(sets[0].reps).toBe(10);
  });

  it('returns 3 sets for weight 60-100kg', () => {
    const sets = generateWarmupSets(80, 'Bench Press');
    expect(sets.length).toBe(3);
    expect(sets[0].weight).toBe(20);
  });

  it('returns 4 sets for weight 100-140kg', () => {
    const sets = generateWarmupSets(120, 'Bench Press');
    expect(sets.length).toBe(4);
  });

  it('returns 5 sets for weight > 140kg', () => {
    const sets = generateWarmupSets(200, 'Bench Press');
    expect(sets.length).toBe(5);
    expect(sets[4].pct).toBe(90);
    expect(sets[4].reps).toBe(1);
  });

  it('all weights are multiples of 2.5', () => {
    for (const w of [50, 80, 120, 200]) {
      const sets = generateWarmupSets(w, 'Bench Press');
      for (const s of sets) {
        expect(isMultipleOf2_5(s.weight), `${s.weight} not multiple of 2.5`).toBe(true);
      }
    }
  });

  it('uses bar=10 for curl exercises', () => {
    const sets = generateWarmupSets(30, 'EZ Curl');
    expect(sets[0].weight).toBe(10);
  });

  it('minimal warmup when weight <= bar', () => {
    const sets = generateWarmupSets(20, 'Bench Press');
    expect(sets.length).toBeGreaterThanOrEqual(1);
    expect(sets.every((s) => s.weight >= 20)).toBe(true);
  });
});
