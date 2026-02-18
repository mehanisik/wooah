import { describe, it, expect } from 'vitest';
import { getReadinessZone } from '../../src/ui/readiness.js';

describe('getReadinessZone', () => {
  it('returns rest/red for 0-40', () => {
    expect(getReadinessZone(0)).toEqual({ zone: 'rest', label: 'Rest', color: 'red' });
    expect(getReadinessZone(20)).toEqual({ zone: 'rest', label: 'Rest', color: 'red' });
    expect(getReadinessZone(40)).toEqual({ zone: 'rest', label: 'Rest', color: 'red' });
  });

  it('returns light/yellow for 41-60', () => {
    expect(getReadinessZone(41)).toEqual({ zone: 'light', label: 'Light day', color: 'yellow' });
    expect(getReadinessZone(50)).toEqual({ zone: 'light', label: 'Light day', color: 'yellow' });
    expect(getReadinessZone(60)).toEqual({ zone: 'light', label: 'Light day', color: 'yellow' });
  });

  it('returns normal/green for 61-80', () => {
    expect(getReadinessZone(61)).toEqual({ zone: 'normal', label: 'Train normally', color: 'green' });
    expect(getReadinessZone(70)).toEqual({ zone: 'normal', label: 'Train normally', color: 'green' });
    expect(getReadinessZone(80)).toEqual({ zone: 'normal', label: 'Train normally', color: 'green' });
  });

  it('returns push/blue for 81-100', () => {
    expect(getReadinessZone(81)).toEqual({ zone: 'push', label: 'Push hard', color: 'blue' });
    expect(getReadinessZone(90)).toEqual({ zone: 'push', label: 'Push hard', color: 'blue' });
    expect(getReadinessZone(100)).toEqual({ zone: 'push', label: 'Push hard', color: 'blue' });
  });

  it('handles exact boundaries correctly', () => {
    expect(getReadinessZone(40).zone).toBe('rest');
    expect(getReadinessZone(41).zone).toBe('light');
    expect(getReadinessZone(60).zone).toBe('light');
    expect(getReadinessZone(61).zone).toBe('normal');
    expect(getReadinessZone(80).zone).toBe('normal');
    expect(getReadinessZone(81).zone).toBe('push');
  });
});
