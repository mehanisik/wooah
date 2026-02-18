import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockProgram = [
  {
    day: 'MON',
    name: 'Push A',
    type: 'push',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '5', rest: 180 },
      { name: 'Incline DB Press', sets: 3, reps: '8-12', rest: 120 },
    ],
  },
  {
    day: 'TUE',
    name: 'Pull A',
    type: 'pull',
    exercises: [{ name: 'Deadlift', sets: 3, reps: '5', rest: 180 }],
  },
];

vi.mock('../../src/data/program.js', () => ({
  PROGRAM: mockProgram,
}));

const { state, logKey, historyKey, finishedKey, getLog, getEffectiveProgram, getExtraSets } = await import(
  '../../src/state/store.js'
);

describe('logKey', () => {
  beforeEach(() => {
    state.currentWeek = 3;
  });

  it('formats correctly', () => {
    expect(logKey(0, 1, 2)).toBe('w3-d0-e1-s2');
  });

  it('uses current week', () => {
    state.currentWeek = 7;
    expect(logKey(0, 0, 0)).toBe('w7-d0-e0-s0');
  });
});

describe('historyKey', () => {
  it('formats correctly', () => {
    expect(historyKey(2, 3)).toBe('d2-e3');
  });

  it('formats day 0, ex 0', () => {
    expect(historyKey(0, 0)).toBe('d0-e0');
  });
});

describe('finishedKey', () => {
  it('formats correctly', () => {
    state.currentWeek = 5;
    expect(finishedKey(2)).toBe('w5-d2');
  });
});

describe('getLog', () => {
  beforeEach(() => {
    state.currentWeek = 1;
    state.logs = {};
  });

  it('returns defaults for missing log', () => {
    expect(getLog(0, 0, 0)).toEqual({ weight: '', reps: '', done: false });
  });

  it('returns stored log', () => {
    state.logs['w1-d0-e0-s0'] = { weight: '100', reps: '5', done: true };
    expect(getLog(0, 0, 0)).toEqual({ weight: '100', reps: '5', done: true });
  });
});

describe('getEffectiveProgram', () => {
  beforeEach(() => {
    for (const k of Object.keys(state)) delete state[k];
    Object.assign(state, {
      currentWeek: 1,
      activeTab: -1,
      logs: {},
      history: {},
      finishedDays: {},
      totalSessions: 0,
      personalRecords: {},
      startDate: null,
      workoutTimers: {},
      extraSets: {},
      exerciseSwaps: {},
      bodyweight: [],
      oneRmHistory: {},
      cardioLogs: {},
    });
  });

  it('returns PROGRAM[day] when no overrides', () => {
    const result = getEffectiveProgram(0);
    expect(result.name).toBe('Push A');
    expect(result.exercises).toHaveLength(2);
    expect(result.exercises[0].name).toBe('Bench Press');
  });

  it('merges overrides with original exercises', () => {
    state.programOverrides = {
      0: [{ originalIdx: 0, sets: 5 }, { originalIdx: 1 }],
    };
    const result = getEffectiveProgram(0);
    expect(result.exercises[0].sets).toBe(5);
    expect(result.exercises[0].name).toBe('Bench Press');
    expect(result.exercises[1].sets).toBe(3);
  });

  it('includes custom exercises', () => {
    state.programOverrides = {
      0: [{ originalIdx: 0 }, { custom: true, name: 'Dips', sets: 3, reps: '10-12', rest: 90 }],
    };
    const result = getEffectiveProgram(0);
    expect(result.exercises).toHaveLength(2);
    expect(result.exercises[1].name).toBe('Dips');
    expect(result.exercises[1].custom).toBe(undefined);
  });

  it('skips invalid originalIdx', () => {
    state.programOverrides = {
      0: [{ originalIdx: 99 }],
    };
    const result = getEffectiveProgram(0);
    expect(result.exercises).toHaveLength(0);
  });
});

describe('getExtraSets', () => {
  beforeEach(() => {
    state.currentWeek = 1;
    state.extraSets = {};
  });

  it('returns 0 for no extra sets', () => {
    expect(getExtraSets(0, 0)).toBe(0);
  });

  it('returns stored extra sets', () => {
    state.extraSets['w1-d0-e0'] = 2;
    expect(getExtraSets(0, 0)).toBe(2);
  });
});
