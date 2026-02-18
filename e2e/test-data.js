export function buildTestState() {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 21);
  const startISO = startDate.toISOString().split('T')[0];

  const week1Mon = new Date(startDate);
  const week1Tue = new Date(startDate);
  week1Tue.setDate(week1Tue.getDate() + 1);
  const week1Wed = new Date(startDate);
  week1Wed.setDate(week1Wed.getDate() + 2);

  const week2Mon = new Date(startDate);
  week2Mon.setDate(week2Mon.getDate() + 7);
  const week2Tue = new Date(startDate);
  week2Tue.setDate(week2Tue.getDate() + 8);
  const week2Wed = new Date(startDate);
  week2Wed.setDate(week2Wed.getDate() + 9);
  const week2Thu = new Date(startDate);
  week2Thu.setDate(week2Thu.getDate() + 10);
  const week2Fri = new Date(startDate);
  week2Fri.setDate(week2Fri.getDate() + 11);
  const week2Sat = new Date(startDate);
  week2Sat.setDate(week2Sat.getDate() + 12);

  return {
    currentWeek: 3,
    activeTab: 0,
    startDate: startISO,
    logs: {
      'w3-d0-e0-s0': { weight: '100', reps: '5', done: true },
      'w3-d0-e0-s1': { weight: '100', reps: '5', done: true },
      'w3-d0-e0-s2': { weight: '100', reps: '5', done: true },
      'w3-d0-e0-s3': { weight: '100', reps: '7', done: true },
      'w3-d0-e1-s0': { weight: '30', reps: '10', done: true },
      'w3-d0-e1-s1': { weight: '30', reps: '10', done: true },
      'w3-d0-e1-s2': { weight: '30', reps: '10', done: true },
    },
    history: {
      'd0-e0': [
        {
          week: 1,
          sets: [
            { weight: 90, reps: 5 },
            { weight: 90, reps: 5 },
            { weight: 90, reps: 5 },
            { weight: 90, reps: 8 },
          ],
        },
        {
          week: 2,
          sets: [
            { weight: 95, reps: 5 },
            { weight: 95, reps: 5 },
            { weight: 95, reps: 5 },
            { weight: 95, reps: 6 },
          ],
        },
      ],
    },
    finishedDays: {
      'w1-d0': week1Mon.getTime(),
      'w1-d1': week1Tue.getTime(),
      'w1-d2': week1Wed.getTime(),
      'w2-d0': week2Mon.getTime(),
      'w2-d1': week2Tue.getTime(),
      'w2-d2': week2Wed.getTime(),
      'w2-d3': week2Thu.getTime(),
      'w2-d4': week2Fri.getTime(),
      'w2-d5': week2Sat.getTime(),
    },
    totalSessions: 9,
    personalRecords: {
      'd0-e0': { volume: 700, date: '2026-02-10' },
    },
    workoutTimers: {},
    extraSets: {},
    exerciseSwaps: {},
    bodyweight: [
      { date: '2026-01-28', weight: 82 },
      { date: '2026-02-04', weight: 81.5 },
      { date: '2026-02-11', weight: 81 },
    ],
    oneRmHistory: {
      'd0-e0': [
        { date: '2026-01-28', value: 114, week: 1 },
        { date: '2026-02-04', value: 117.3, week: 2 },
        { date: '2026-02-11', value: 123.3, week: 3 },
      ],
    },
    cardioLogs: {},
    sessionNotes: {},
    exerciseNotes: {},
    pinnedNotes: {},
  };
}

export async function injectTestState(page, stateOverrides = {}) {
  const base = buildTestState();
  const merged = { ...base, ...stateOverrides };
  const json = JSON.stringify(merged);
  await page.addInitScript((data) => {
    localStorage.setItem('ironppl_state_v2', data);
  }, json);
}
