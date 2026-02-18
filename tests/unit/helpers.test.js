import { describe, it, expect } from 'vitest';
import { parseRepRange, formatRest, formatDuration } from '../../src/ui/helpers.js';

describe('parseRepRange', () => {
  it('parses range "8-12"', () => {
    expect(parseRepRange('8-12')).toEqual({ low: 8, high: 12 });
  });

  it('parses single value "5"', () => {
    expect(parseRepRange('5')).toEqual({ low: 5, high: 5 });
  });

  it('parses empty string', () => {
    expect(parseRepRange('')).toEqual({ low: 0, high: 0 });
  });

  it('parses range with text "10-12 reps"', () => {
    expect(parseRepRange('10-12 reps')).toEqual({ low: 10, high: 12 });
  });

  it('parses single with plus "5+"', () => {
    expect(parseRepRange('5+')).toEqual({ low: 5, high: 5 });
  });
});

describe('formatRest', () => {
  it('formats 0 seconds', () => {
    expect(formatRest(0)).toBe('0s');
  });

  it('formats seconds only', () => {
    expect(formatRest(45)).toBe('45s');
  });

  it('formats minutes + seconds', () => {
    expect(formatRest(90)).toBe('1m 30s');
  });

  it('formats exact minutes', () => {
    expect(formatRest(120)).toBe('2 min');
  });

  it('formats 180 seconds', () => {
    expect(formatRest(180)).toBe('3 min');
  });
});

describe('formatDuration', () => {
  it('formats 0 seconds', () => {
    expect(formatDuration(0)).toBe('0:00');
  });

  it('formats seconds only', () => {
    expect(formatDuration(45)).toBe('0:45');
  });

  it('formats minutes + seconds', () => {
    expect(formatDuration(65)).toBe('1:05');
  });

  it('formats with hours', () => {
    expect(formatDuration(3661)).toBe('1:01:01');
  });

  it('formats exact hour', () => {
    expect(formatDuration(3600)).toBe('1:00:00');
  });
});
