import { state, getExtraSets, getLog, getEffectiveProgram } from '../state/store.js';
import { getExerciseSwap } from '../state/store.js';

export const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Quads',
  'Hamstrings',
  'Glutes',
  'Side Delts',
  'Rear Delts',
  'Front Delts',
  'Biceps',
  'Triceps',
  'Calves',
  'Abs',
  'Traps',
];

export const VOLUME_LANDMARKS = {
  Chest: { mev: 10, mav: 16, mrv: 22 },
  Back: { mev: 10, mav: 18, mrv: 25 },
  Quads: { mev: 8, mav: 15, mrv: 22 },
  Hamstrings: { mev: 6, mav: 12, mrv: 18 },
  Glutes: { mev: 4, mav: 12, mrv: 18 },
  'Side Delts': { mev: 8, mav: 18, mrv: 25 },
  'Rear Delts': { mev: 8, mav: 18, mrv: 25 },
  'Front Delts': { mev: 0, mav: 6, mrv: 12 },
  Biceps: { mev: 6, mav: 14, mrv: 20 },
  Triceps: { mev: 6, mav: 12, mrv: 18 },
  Calves: { mev: 8, mav: 14, mrv: 20 },
  Abs: { mev: 0, mav: 12, mrv: 20 },
  Traps: { mev: 0, mav: 12, mrv: 20 },
};

export const MUSCLE_MAP = {
  'Flat Barbell Bench Press': { primary: ['Chest'], secondary: ['Triceps', 'Front Delts'] },
  'DB Bench Press': { primary: ['Chest'], secondary: ['Triceps', 'Front Delts'] },
  'Machine Chest Press': { primary: ['Chest'], secondary: ['Triceps', 'Front Delts'] },
  'Floor Press': { primary: ['Chest'], secondary: ['Triceps'] },
  'Incline Dumbbell Press': { primary: ['Chest'], secondary: ['Front Delts', 'Triceps'] },
  'Incline Barbell Press': { primary: ['Chest'], secondary: ['Front Delts', 'Triceps'] },
  'Incline Machine Press': { primary: ['Chest'], secondary: ['Front Delts', 'Triceps'] },
  'Low-to-High Cable Fly': { primary: ['Chest'], secondary: ['Front Delts'] },
  'Cable Chest Fly': { primary: ['Chest'], secondary: [] },
  'Pec Deck': { primary: ['Chest'], secondary: [] },
  'DB Fly': { primary: ['Chest'], secondary: [] },
  'Machine Fly': { primary: ['Chest'], secondary: [] },
  'Incline Cable/DB Fly': { primary: ['Chest'], secondary: [] },
  'Incline DB Press': { primary: ['Chest'], secondary: ['Front Delts', 'Triceps'] },
  'Low Cable Fly': { primary: ['Chest'], secondary: [] },

  'Seated Dumbbell OHP': { primary: ['Front Delts'], secondary: ['Triceps', 'Side Delts'] },
  'Machine Shoulder Press': { primary: ['Front Delts'], secondary: ['Triceps', 'Side Delts'] },
  'Landmine Press': { primary: ['Front Delts'], secondary: ['Chest', 'Triceps'] },
  'Arnold Press': { primary: ['Front Delts'], secondary: ['Side Delts', 'Triceps'] },
  'Standing Barbell OHP': { primary: ['Front Delts'], secondary: ['Triceps', 'Side Delts'] },
  'Seated Barbell OHP': { primary: ['Front Delts'], secondary: ['Triceps', 'Side Delts'] },
  'DB OHP': { primary: ['Front Delts'], secondary: ['Triceps', 'Side Delts'] },
  'Machine OHP': { primary: ['Front Delts'], secondary: ['Triceps', 'Side Delts'] },

  'Dips (weighted if possible)': { primary: ['Chest', 'Triceps'], secondary: ['Front Delts'] },
  'Dip Machine': { primary: ['Chest', 'Triceps'], secondary: ['Front Delts'] },
  'Close-Grip Bench Press': { primary: ['Triceps'], secondary: ['Chest'] },
  'Push-ups (weighted)': { primary: ['Chest'], secondary: ['Triceps', 'Front Delts'] },

  'Tricep Pushdown': { primary: ['Triceps'], secondary: [] },
  'Skull Crushers': { primary: ['Triceps'], secondary: [] },
  'Diamond Push-ups': { primary: ['Triceps'], secondary: ['Chest'] },
  'Overhead Tricep Extension': { primary: ['Triceps'], secondary: [] },
  'French Press': { primary: ['Triceps'], secondary: [] },
  'Cable Overhead Extension': { primary: ['Triceps'], secondary: [] },
  'Skull Crusher': { primary: ['Triceps'], secondary: [] },

  'Lateral Raises': { primary: ['Side Delts'], secondary: [] },
  'Cable Lateral Raise': { primary: ['Side Delts'], secondary: [] },
  'Machine Lateral Raise': { primary: ['Side Delts'], secondary: [] },
  'DB Y-Raise': { primary: ['Side Delts'], secondary: ['Traps'] },
  'Cable Lateral Raise (1-arm)': { primary: ['Side Delts'], secondary: [] },
  'DB Lateral Raise': { primary: ['Side Delts'], secondary: [] },
  'Plate Raise': { primary: ['Front Delts'], secondary: ['Side Delts'] },

  'Reverse Pec Deck': { primary: ['Rear Delts'], secondary: [] },
  'Face Pulls': { primary: ['Rear Delts'], secondary: ['Traps'] },
  'Band Pull-Aparts': { primary: ['Rear Delts'], secondary: ['Traps'] },
  'Reverse Fly': { primary: ['Rear Delts'], secondary: [] },
  'Rear Delt Cable': { primary: ['Rear Delts'], secondary: [] },
  'DB Reverse Fly': { primary: ['Rear Delts'], secondary: [] },

  'Conventional Deadlift': { primary: ['Back', 'Hamstrings', 'Glutes'], secondary: ['Traps', 'Quads'] },
  'Trap Bar Deadlift': { primary: ['Back', 'Quads'], secondary: ['Hamstrings', 'Glutes', 'Traps'] },
  'Sumo Deadlift': { primary: ['Quads', 'Glutes'], secondary: ['Back', 'Hamstrings'] },
  'Rack Pull': { primary: ['Back'], secondary: ['Traps', 'Hamstrings'] },
  'Sumo/Conv. Deadlift (lighter)': { primary: ['Back', 'Hamstrings', 'Glutes'], secondary: ['Quads'] },
  'Deficit Deadlift': { primary: ['Back', 'Hamstrings'], secondary: ['Glutes', 'Quads'] },
  'Block Pull': { primary: ['Back'], secondary: ['Traps'] },

  'Lat Pulldown (wide)': { primary: ['Back'], secondary: ['Biceps'] },
  'Close-Grip Pulldown': { primary: ['Back'], secondary: ['Biceps'] },
  'Pull-ups': { primary: ['Back'], secondary: ['Biceps'] },
  'Machine Pulldown': { primary: ['Back'], secondary: ['Biceps'] },
  'Pull-ups (weighted if possible)': { primary: ['Back'], secondary: ['Biceps'] },
  'Chin-ups': { primary: ['Back', 'Biceps'], secondary: [] },
  'Assisted Pull-ups': { primary: ['Back'], secondary: ['Biceps'] },
  'Lat Pulldown': { primary: ['Back'], secondary: ['Biceps'] },

  'Seated Cable Row': { primary: ['Back'], secondary: ['Biceps', 'Rear Delts'] },
  'Machine Row': { primary: ['Back'], secondary: ['Biceps'] },
  'T-Bar Row': { primary: ['Back'], secondary: ['Biceps', 'Rear Delts'] },
  'DB Row': { primary: ['Back'], secondary: ['Biceps'] },
  'Barbell Bent-over Row': { primary: ['Back'], secondary: ['Biceps', 'Rear Delts'] },
  'Pendlay Row': { primary: ['Back'], secondary: ['Biceps'] },
  'Chest-Supported Row': { primary: ['Back'], secondary: ['Biceps', 'Rear Delts'] },

  'Cable Pullover': { primary: ['Back'], secondary: [] },
  'DB Pullover': { primary: ['Back'], secondary: ['Chest'] },
  'Straight-Arm Pulldown': { primary: ['Back'], secondary: [] },
  'Machine Pullover': { primary: ['Back'], secondary: [] },

  'Barbell Curl (EZ/straight)': { primary: ['Biceps'], secondary: [] },
  'DB Curl': { primary: ['Biceps'], secondary: [] },
  'Cable Curl': { primary: ['Biceps'], secondary: [] },
  'Preacher Curl': { primary: ['Biceps'], secondary: [] },
  'Hammer Curl': { primary: ['Biceps'], secondary: [] },
  'Cross-Body Curl': { primary: ['Biceps'], secondary: [] },
  'Rope Curl': { primary: ['Biceps'], secondary: [] },
  'Reverse Curl': { primary: ['Biceps'], secondary: [] },
  'Incline Dumbbell Curl': { primary: ['Biceps'], secondary: [] },
  'Spider Curl': { primary: ['Biceps'], secondary: [] },
  'Reverse Curl (EZ/cable)': { primary: ['Biceps'], secondary: [] },
  'Wrist Curl': { primary: ['Biceps'], secondary: [] },
  'Zottman Curl': { primary: ['Biceps'], secondary: [] },

  'Barbell Back Squat': { primary: ['Quads', 'Glutes'], secondary: ['Hamstrings'] },
  'Safety Bar Squat': { primary: ['Quads', 'Glutes'], secondary: ['Hamstrings'] },
  'Goblet Squat': { primary: ['Quads'], secondary: ['Glutes'] },
  'Smith Machine Squat': { primary: ['Quads', 'Glutes'], secondary: [] },
  'Front Squat / Hack Squat': { primary: ['Quads'], secondary: ['Glutes'] },
  'Hack Squat Machine': { primary: ['Quads'], secondary: ['Glutes'] },
  'Zercher Squat': { primary: ['Quads'], secondary: ['Glutes'] },

  'Romanian Deadlift': { primary: ['Hamstrings', 'Glutes'], secondary: ['Back'] },
  'Stiff-Leg Deadlift': { primary: ['Hamstrings', 'Glutes'], secondary: ['Back'] },
  'Good Morning': { primary: ['Hamstrings', 'Glutes'], secondary: ['Back'] },
  'DB RDL': { primary: ['Hamstrings', 'Glutes'], secondary: [] },

  'Leg Press': { primary: ['Quads'], secondary: ['Glutes'] },
  'Hack Squat': { primary: ['Quads'], secondary: ['Glutes'] },
  'Pendulum Squat': { primary: ['Quads'], secondary: ['Glutes'] },
  'Belt Squat': { primary: ['Quads'], secondary: ['Glutes'] },

  'Leg Curl (lying/seated)': { primary: ['Hamstrings'], secondary: [] },
  'Nordic Curl': { primary: ['Hamstrings'], secondary: [] },
  GHR: { primary: ['Hamstrings', 'Glutes'], secondary: [] },
  'Slider Curl': { primary: ['Hamstrings'], secondary: [] },
  'Nordic Ham Curl / GHR': { primary: ['Hamstrings'], secondary: ['Glutes'] },
  'Lying Leg Curl': { primary: ['Hamstrings'], secondary: [] },
  'Seated Leg Curl': { primary: ['Hamstrings'], secondary: [] },

  'Leg Extension': { primary: ['Quads'], secondary: [] },
  'Sissy Squat': { primary: ['Quads'], secondary: [] },
  'Spanish Squat': { primary: ['Quads'], secondary: [] },
  'Reverse Nordic': { primary: ['Quads'], secondary: [] },

  'Standing Calf Raise': { primary: ['Calves'], secondary: [] },
  'Seated Calf Raise': { primary: ['Calves'], secondary: [] },
  'Leg Press Calf Raise': { primary: ['Calves'], secondary: [] },
  'Smith Machine Calf Raise': { primary: ['Calves'], secondary: [] },
  'Donkey Calf Raise': { primary: ['Calves'], secondary: [] },

  'Bulgarian Split Squat': { primary: ['Quads', 'Glutes'], secondary: [] },
  'Reverse Lunge': { primary: ['Quads', 'Glutes'], secondary: [] },
  'Step-up': { primary: ['Quads', 'Glutes'], secondary: [] },
  'Walking Lunge': { primary: ['Quads', 'Glutes'], secondary: [] },

  'Barbell Hip Thrust': { primary: ['Glutes'], secondary: ['Hamstrings'] },
  'Machine Hip Thrust': { primary: ['Glutes'], secondary: ['Hamstrings'] },
  'Glute Bridge': { primary: ['Glutes'], secondary: ['Hamstrings'] },
  'Cable Pull-Through': { primary: ['Glutes'], secondary: ['Hamstrings'] },
};

function getExerciseName(dayIdx, exIdx) {
  const swap = getExerciseSwap(dayIdx, exIdx);
  return swap || getEffectiveProgram(dayIdx).exercises[exIdx].name;
}

function getMuscles(name) {
  return MUSCLE_MAP[name] || { primary: [], secondary: [] };
}

export function calcWeeklyVolume(currentWeek) {
  const volume = {};
  MUSCLE_GROUPS.forEach((g) => {
    volume[g] = 0;
  });

  for (let d = 0; d < 6; d++) {
    const day = getEffectiveProgram(d);
    if (!day.exercises.length) continue;

    const dayFinishedKey = `w${currentWeek}-d${d}`;
    if (!state.finishedDays[dayFinishedKey]) continue;

    day.exercises.forEach((ex, e) => {
      const name = getExerciseName(d, e);
      const muscles = getMuscles(name);
      const totalSets = ex.sets + getExtraSets(d, e);

      let completedSets = 0;
      for (let s = 0; s < totalSets; s++) {
        if (getLog(d, e, s).done) completedSets++;
      }

      muscles.primary.forEach((g) => {
        volume[g] = (volume[g] || 0) + completedSets;
      });
      muscles.secondary.forEach((g) => {
        volume[g] = (volume[g] || 0) + completedSets * 0.5;
      });
    });
  }

  return volume;
}

export function getVolumeZone(sets, mev, mav, mrv) {
  if (sets < mev) return 'under';
  if (sets <= (mev + mav) / 2) return 'maintenance';
  if (sets <= mav) return 'optimal';
  if (sets <= mrv) return 'pushing';
  return 'over';
}

export function calcDayVolume(dayIdx) {
  const volume = {};
  MUSCLE_GROUPS.forEach((g) => {
    volume[g] = 0;
  });

  const day = getEffectiveProgram(dayIdx);
  if (!day.exercises.length) return volume;

  day.exercises.forEach((ex, e) => {
    const name = getExerciseName(dayIdx, e);
    const muscles = getMuscles(name);
    muscles.primary.forEach((g) => {
      volume[g] = (volume[g] || 0) + ex.sets;
    });
    muscles.secondary.forEach((g) => {
      volume[g] = (volume[g] || 0) + ex.sets * 0.5;
    });
  });

  return volume;
}
