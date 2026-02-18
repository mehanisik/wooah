import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockState = { plateSettings: null };

vi.mock('../../src/state/store.js', () => ({
  state: mockState,
  debouncedSave: vi.fn(),
}));

const { calcPlates, getPlateSettings } = await import('../../src/ui/plate-calc.js');

describe('calcPlates', () => {
  beforeEach(() => {
    mockState.plateSettings = null;
  });

  it('returns null for weight=0', () => {
    expect(calcPlates(0, 'Bench Press')).toBeNull();
  });

  it('returns null for negative weight', () => {
    expect(calcPlates(-10, 'Bench Press')).toBeNull();
  });

  it('returns empty plates when weight equals bar', () => {
    const result = calcPlates(20, 'Bench Press');
    expect(result).toEqual({ barWeight: 20, plates: [], remainder: 0 });
  });

  it('returns empty plates when weight < bar', () => {
    const result = calcPlates(15, 'Bench Press');
    expect(result).toEqual({ barWeight: 20, plates: [], remainder: 0 });
  });

  it('calculates 60kg: bar(20) + 20 per side', () => {
    const result = calcPlates(60, 'Bench Press');
    expect(result.barWeight).toBe(20);
    expect(result.plates).toEqual([20]);
    expect(result.remainder).toBe(0);
  });

  it('calculates 100kg: bar(20) + 25+15 per side', () => {
    const result = calcPlates(100, 'Bench Press');
    expect(result.barWeight).toBe(20);
    expect(result.plates).toEqual([25, 15]);
    expect(result.remainder).toBe(0);
  });

  it('calculates 22.5kg (EZ curl bar=10): 5+1.25 per side', () => {
    const result = calcPlates(22.5, 'EZ Curl');
    expect(result.barWeight).toBe(10);
    expect(result.plates).toEqual([5, 1.25]);
    expect(result.remainder).toBe(0);
  });

  it('detects EZ bar for curl exercises', () => {
    const result = calcPlates(30, 'Barbell Curl (EZ/straight)');
    expect(result.barWeight).toBe(10);
  });

  it('handles odd remainders', () => {
    const result = calcPlates(21, 'Bench Press');
    expect(result.barWeight).toBe(20);
    expect(result.remainder).toBeGreaterThan(0);
  });
});

describe('getPlateSettings', () => {
  beforeEach(() => {
    mockState.plateSettings = null;
  });

  it('initializes defaults when null', () => {
    const settings = getPlateSettings();
    expect(settings.barWeight).toBe(20);
    expect(settings.unit).toBe('kg');
    expect(settings.plates).toEqual([25, 20, 15, 10, 5, 2.5, 1.25]);
  });

  it('returns existing settings', () => {
    mockState.plateSettings = { barWeight: 15, unit: 'kg', plates: [20, 10, 5] };
    const settings = getPlateSettings();
    expect(settings.barWeight).toBe(15);
  });
});
