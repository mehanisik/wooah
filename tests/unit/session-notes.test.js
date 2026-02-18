import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockState = {
  currentWeek: 1,
  sessionNotes: {},
  exerciseNotes: {},
  pinnedNotes: {},
};

vi.mock('../../src/state/store.js', () => ({
  state: mockState,
  debouncedSave: vi.fn(),
}));

const { getSessionNotes, setSessionNote, getExerciseNote, getPinnedNote, setPinnedNote, clearPinnedNote } =
  await import('../../src/ui/session-notes.js');

describe('getSessionNotes', () => {
  beforeEach(() => {
    mockState.currentWeek = 1;
    mockState.sessionNotes = {};
  });

  it('returns empty object for missing notes', () => {
    expect(getSessionNotes(0)).toEqual({});
  });

  it('reads correct week-day key', () => {
    mockState.sessionNotes['w1-d0'] = { energy: 'High', sleep: '7-8h' };
    expect(getSessionNotes(0)).toEqual({ energy: 'High', sleep: '7-8h' });
  });

  it('uses current week', () => {
    mockState.currentWeek = 3;
    mockState.sessionNotes['w3-d2'] = { mood: 'Good' };
    expect(getSessionNotes(2)).toEqual({ mood: 'Good' });
  });

  it('initializes sessionNotes if undefined', () => {
    mockState.sessionNotes = undefined;
    expect(getSessionNotes(0)).toEqual({});
    expect(mockState.sessionNotes).toBeDefined();
  });
});

describe('setSessionNote', () => {
  beforeEach(() => {
    mockState.currentWeek = 1;
    mockState.sessionNotes = {};
  });

  it('sets a field', () => {
    setSessionNote(0, 'energy', 'Peak');
    expect(mockState.sessionNotes['w1-d0'].energy).toBe('Peak');
  });

  it('preserves existing fields', () => {
    mockState.sessionNotes['w1-d0'] = { energy: 'High' };
    setSessionNote(0, 'sleep', '7-8h');
    expect(mockState.sessionNotes['w1-d0'].energy).toBe('High');
    expect(mockState.sessionNotes['w1-d0'].sleep).toBe('7-8h');
  });
});

describe('getPinnedNote', () => {
  beforeEach(() => {
    mockState.pinnedNotes = {};
  });

  it('returns empty string for missing note', () => {
    expect(getPinnedNote(2, 3)).toBe('');
  });

  it('reads correct day-exercise key', () => {
    mockState.pinnedNotes['d2-e3'] = 'Keep elbows tucked';
    expect(getPinnedNote(2, 3)).toBe('Keep elbows tucked');
  });

  it('initializes pinnedNotes if undefined', () => {
    mockState.pinnedNotes = undefined;
    expect(getPinnedNote(0, 0)).toBe('');
    expect(mockState.pinnedNotes).toBeDefined();
  });
});

describe('getExerciseNote', () => {
  beforeEach(() => {
    mockState.currentWeek = 1;
    mockState.exerciseNotes = {};
  });

  it('returns empty string for missing note', () => {
    expect(getExerciseNote(0, 1)).toBe('');
  });

  it('reads correct week-day-exercise key', () => {
    mockState.exerciseNotes['w1-d0-e1'] = 'Felt strong today';
    expect(getExerciseNote(0, 1)).toBe('Felt strong today');
  });
});

describe('setPinnedNote / clearPinnedNote', () => {
  beforeEach(() => {
    mockState.pinnedNotes = {};
  });

  it('sets a pinned note', () => {
    setPinnedNote(0, 0, 'Grip wider');
    expect(mockState.pinnedNotes['d0-e0']).toBe('Grip wider');
  });

  it('clears a pinned note', () => {
    mockState.pinnedNotes['d0-e0'] = 'Some note';
    clearPinnedNote(0, 0);
    expect(mockState.pinnedNotes['d0-e0']).toBeUndefined();
  });
});
