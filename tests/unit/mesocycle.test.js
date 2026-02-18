import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockState = {
  currentWeek: 5,
  mesocycleConfig: null,
};

vi.mock('../../src/state/store.js', () => ({
  state: mockState,
  saveState: vi.fn(),
}));

const { getTargetVolume, getMesoSuggestion, getMesoWeek, isDeloadWeek, getRIR } = await import(
  '../../src/ui/mesocycle.js'
);

describe('getTargetVolume', () => {
  beforeEach(() => {
    mockState.mesocycleConfig = { length: 4, deloadLength: 1, startWeek: 1, rampRate: 2 };
    mockState.currentWeek = 1;
  });

  it('week 1 = base volume', () => {
    mockState.currentWeek = 1;
    expect(getTargetVolume(10)).toBe(10);
  });

  it('week 2 = base + rampRate', () => {
    mockState.currentWeek = 2;
    expect(getTargetVolume(10)).toBe(12);
  });

  it('week 3 = base + 2*rampRate', () => {
    mockState.currentWeek = 3;
    expect(getTargetVolume(10)).toBe(14);
  });

  it('week 4 = base + 3*rampRate', () => {
    mockState.currentWeek = 4;
    expect(getTargetVolume(10)).toBe(16);
  });

  it('deload week = base * 0.6', () => {
    mockState.currentWeek = 5;
    expect(getTargetVolume(10)).toBe(6);
  });

  it('returns base when no mesocycle started', () => {
    mockState.mesocycleConfig = { length: 4, deloadLength: 1, startWeek: null, rampRate: 2 };
    expect(getTargetVolume(10)).toBe(10);
  });
});

describe('getMesoSuggestion', () => {
  it('suggests adding sets when target > current', () => {
    expect(getMesoSuggestion(3, 5)).toBe('Add 2 sets');
  });

  it('suggests removing sets when target < current', () => {
    expect(getMesoSuggestion(5, 3)).toBe('Remove 2 sets');
  });

  it('returns null when equal', () => {
    expect(getMesoSuggestion(5, 5)).toBeNull();
  });

  it('singular "set" for diff of 1', () => {
    expect(getMesoSuggestion(3, 4)).toBe('Add 1 set');
    expect(getMesoSuggestion(4, 3)).toBe('Remove 1 set');
  });
});

describe('getMesoWeek', () => {
  beforeEach(() => {
    mockState.mesocycleConfig = { length: 4, deloadLength: 1, startWeek: 1, rampRate: 2 };
  });

  it('returns null when not started', () => {
    mockState.mesocycleConfig.startWeek = null;
    expect(getMesoWeek()).toBeNull();
  });

  it('returns week 1 at start', () => {
    mockState.currentWeek = 1;
    expect(getMesoWeek()).toBe(1);
  });

  it('wraps around after cycle', () => {
    mockState.currentWeek = 6;
    expect(getMesoWeek()).toBe(1);
  });
});

describe('isDeloadWeek', () => {
  beforeEach(() => {
    mockState.mesocycleConfig = { length: 4, deloadLength: 1, startWeek: 1, rampRate: 2 };
  });

  it('not deload on week 4', () => {
    mockState.currentWeek = 4;
    expect(isDeloadWeek()).toBe(false);
  });

  it('deload on week 5', () => {
    mockState.currentWeek = 5;
    expect(isDeloadWeek()).toBe(true);
  });
});

describe('getRIR', () => {
  beforeEach(() => {
    mockState.mesocycleConfig = { length: 4, deloadLength: 1, startWeek: 1, rampRate: 2 };
  });

  it('week 1 → RIR 3', () => {
    mockState.currentWeek = 1;
    expect(getRIR()).toBe('3');
  });

  it('week 2 → RIR 2-3', () => {
    mockState.currentWeek = 2;
    expect(getRIR()).toBe('2-3');
  });

  it('week 3 → RIR 2', () => {
    mockState.currentWeek = 3;
    expect(getRIR()).toBe('2');
  });

  it('week 4 → RIR 1', () => {
    mockState.currentWeek = 4;
    expect(getRIR()).toBe('1');
  });

  it('deload → RIR 3-4', () => {
    mockState.currentWeek = 5;
    expect(getRIR()).toBe('3-4');
  });
});
