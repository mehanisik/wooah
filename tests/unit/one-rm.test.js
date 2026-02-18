import { describe, it, expect } from 'vitest';
import { calcOneRM } from '../../src/ui/one-rm.js';

describe('calcOneRM', () => {
  it('applies Epley formula: 100×5 → 116.7', () => {
    expect(calcOneRM(100, 5)).toBe(116.7);
  });

  it('applies Epley formula: 80×10 → 106.7', () => {
    expect(calcOneRM(80, 10)).toBe(106.7);
  });

  it('applies Epley formula: 200×3 → 220', () => {
    expect(calcOneRM(200, 3)).toBe(220);
  });

  it('returns weight when reps=1', () => {
    expect(calcOneRM(150, 1)).toBe(150);
  });

  it('returns 0 when reps <= 0', () => {
    expect(calcOneRM(100, 0)).toBe(0);
    expect(calcOneRM(100, -1)).toBe(0);
  });

  it('returns 0 when weight <= 0', () => {
    expect(calcOneRM(0, 5)).toBe(0);
    expect(calcOneRM(-50, 5)).toBe(0);
  });

  it('returns 0 when both are negative', () => {
    expect(calcOneRM(-10, -5)).toBe(0);
  });
});
