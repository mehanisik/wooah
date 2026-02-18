import { describe, it, expect } from 'vitest';
import { MUSCLE_GROUPS, VOLUME_LANDMARKS, MUSCLE_MAP, getVolumeZone } from '../../src/data/muscles.js';

describe('MUSCLE_GROUPS', () => {
  it('has 13 muscle groups', () => {
    expect(MUSCLE_GROUPS).toHaveLength(13);
  });

  it('includes expected groups', () => {
    expect(MUSCLE_GROUPS).toContain('Chest');
    expect(MUSCLE_GROUPS).toContain('Back');
    expect(MUSCLE_GROUPS).toContain('Quads');
    expect(MUSCLE_GROUPS).toContain('Biceps');
    expect(MUSCLE_GROUPS).toContain('Triceps');
    expect(MUSCLE_GROUPS).toContain('Calves');
  });
});

describe('VOLUME_LANDMARKS', () => {
  it('has entry for every muscle group', () => {
    for (const group of MUSCLE_GROUPS) {
      expect(VOLUME_LANDMARKS[group]).toBeDefined();
      expect(VOLUME_LANDMARKS[group]).toHaveProperty('mev');
      expect(VOLUME_LANDMARKS[group]).toHaveProperty('mav');
      expect(VOLUME_LANDMARKS[group]).toHaveProperty('mrv');
    }
  });

  it('mev <= mav <= mrv for all groups', () => {
    for (const group of MUSCLE_GROUPS) {
      const { mev, mav, mrv } = VOLUME_LANDMARKS[group];
      expect(mev).toBeLessThanOrEqual(mav);
      expect(mav).toBeLessThanOrEqual(mrv);
    }
  });
});

describe('MUSCLE_MAP', () => {
  it('maps bench press correctly', () => {
    const bench = MUSCLE_MAP['Flat Barbell Bench Press'];
    expect(bench.primary).toContain('Chest');
    expect(bench.secondary).toContain('Triceps');
  });

  it('maps squat correctly', () => {
    const squat = MUSCLE_MAP['Barbell Back Squat'];
    expect(squat.primary).toContain('Quads');
    expect(squat.primary).toContain('Glutes');
  });

  it('maps deadlift correctly', () => {
    const dl = MUSCLE_MAP['Conventional Deadlift'];
    expect(dl.primary).toContain('Back');
    expect(dl.primary).toContain('Hamstrings');
  });

  it('has primary arrays for all entries', () => {
    for (const [name, muscles] of Object.entries(MUSCLE_MAP)) {
      expect(Array.isArray(muscles.primary), `${name} missing primary`).toBe(true);
      expect(Array.isArray(muscles.secondary), `${name} missing secondary`).toBe(true);
    }
  });
});

describe('getVolumeZone', () => {
  const mev = 10;
  const mav = 16;
  const mrv = 22;

  it('under MEV → under', () => {
    expect(getVolumeZone(5, mev, mav, mrv)).toBe('under');
    expect(getVolumeZone(9, mev, mav, mrv)).toBe('under');
  });

  it('MEV to midpoint → maintenance', () => {
    expect(getVolumeZone(10, mev, mav, mrv)).toBe('maintenance');
    expect(getVolumeZone(13, mev, mav, mrv)).toBe('maintenance');
  });

  it('midpoint to MAV → optimal', () => {
    expect(getVolumeZone(14, mev, mav, mrv)).toBe('optimal');
    expect(getVolumeZone(16, mev, mav, mrv)).toBe('optimal');
  });

  it('MAV to MRV → pushing', () => {
    expect(getVolumeZone(17, mev, mav, mrv)).toBe('pushing');
    expect(getVolumeZone(22, mev, mav, mrv)).toBe('pushing');
  });

  it('over MRV → over', () => {
    expect(getVolumeZone(23, mev, mav, mrv)).toBe('over');
    expect(getVolumeZone(30, mev, mav, mrv)).toBe('over');
  });
});
