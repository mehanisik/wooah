export const PROGRAM = [
  {
    day: 'MON', name: 'Push A', type: 'push', focus: 'Chest-dominant + Shoulders + Triceps',
    warmup: '2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)',
    exercises: [
      { name: 'Flat Barbell Bench Press', sets: 4, reps: '5', rest: 180, rir: '1-2', amrap: true, compound: true, notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP set' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '8-12', rest: 120, rir: '1-2', notes: 'Upper chest focus. 30-45 deg incline' },
      { name: 'Cable Chest Fly', sets: 3, reps: '12-15', rest: 90, rir: '0-1', notes: 'Squeeze & control eccentric (3 sec)' },
      { name: 'Seated Dumbbell OHP', sets: 3, reps: '10-12', rest: 120, rir: '1-2', notes: 'Secondary shoulder work' },
      { name: 'Tricep Pushdown', sets: 3, reps: '10-15', rest: 60, rir: '0-1', superset: 6, notes: 'Rope or V-bar. Superset w/ #6' },
      { name: 'Lateral Raises', sets: 3, reps: '15-20', rest: 60, rir: '0', superset: 5, notes: 'Light weight, strict form. Superset w/ #5' },
    ]
  },
  {
    day: 'TUE', name: 'Pull A', type: 'pull', focus: 'Back-dominant (Deadlift) + Biceps',
    warmup: '2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)',
    exercises: [
      { name: 'Conventional Deadlift', sets: 3, reps: '5', rest: 240, rir: '1-2', amrap: true, compound: true, notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP' },
      { name: 'Lat Pulldown (wide)', sets: 3, reps: '8-12', rest: 120, rir: '1-2', notes: 'Full stretch at top, squeeze lats at bottom' },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: 120, rir: '1-2', notes: 'Pull to lower chest, retract scapulae' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: 60, rir: '0-1', notes: 'Rear delt & rotator cuff. Pull to forehead, externally rotate' },
      { name: 'Barbell Curl (EZ/straight)', sets: 3, reps: '10-12', rest: 60, rir: '0-1', notes: 'Strict form, no swinging' },
      { name: 'Hammer Curl', sets: 3, reps: '10-15', rest: 60, rir: '0-1', notes: 'Brachialis & forearm development' },
    ]
  },
  {
    day: 'WED', name: 'Legs A', type: 'legs', focus: 'Quad-dominant (Squat)',
    warmup: '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)',
    cardio: 'Ab circuit (3 rounds, 45s each, 15s rest): hanging leg raises, cable crunches, ab wheel rollouts, dead bugs. Then 10-15 min LISS walk or bike to cool down.',
    exercises: [
      { name: 'Barbell Back Squat', sets: 4, reps: '5', rest: 180, rir: '1-2', amrap: true, compound: true, notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP' },
      { name: 'Romanian Deadlift', sets: 3, reps: '8-12', rest: 120, rir: '1-2', notes: 'Hamstring stretch at bottom, hinge at hips' },
      { name: 'Leg Press', sets: 3, reps: '10-15', rest: 120, rir: '1-2', notes: 'Mid-high foot placement for full ROM' },
      { name: 'Leg Curl (lying/seated)', sets: 3, reps: '10-15', rest: 90, rir: '0-1', notes: 'Slow eccentric (3 sec)' },
      { name: 'Leg Extension', sets: 3, reps: '12-15', rest: 90, rir: '0-1', notes: 'Squeeze quad at top, 1 sec hold' },
      { name: 'Standing Calf Raise', sets: 4, reps: '12-15', rest: 60, rir: '0-1', notes: 'Full stretch at bottom, 2 sec pause at top' },
    ]
  },
  {
    day: 'THU', name: 'Push B', type: 'push', focus: 'Shoulder-dominant + Chest + Triceps',
    warmup: '2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5)',
    exercises: [
      { name: 'Standing Barbell OHP', sets: 4, reps: '5', rest: 180, rir: '1-2', amrap: true, compound: true, notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP. Brace core' },
      { name: 'Dips (weighted if possible)', sets: 3, reps: '8-12', rest: 120, rir: '1-2', notes: 'Lean forward slightly for chest emphasis' },
      { name: 'Incline Cable/DB Fly', sets: 3, reps: '12-15', rest: 90, rir: '0-1', notes: 'Upper chest isolation' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '10-15', rest: 60, rir: '0-1', superset: 5, notes: 'Long head emphasis. Superset w/ #5' },
      { name: 'Cable Lateral Raise (1-arm)', sets: 4, reps: '15-20', rest: 60, rir: '0', superset: 4, notes: 'Lean away for better stretch. Superset w/ #4' },
      { name: 'Reverse Pec Deck', sets: 3, reps: '15-20', rest: 60, rir: '0', notes: 'Rear delt balance' },
    ]
  },
  {
    day: 'FRI', name: 'Pull B', type: 'pull', focus: 'Row/Pull-up Focus + Biceps',
    warmup: '1-2 light sets of pull-ups (bodyweight) + light row warm-up',
    exercises: [
      { name: 'Pull-ups (weighted if possible)', sets: 4, reps: 'AMRAP (6-12)', rest: 180, rir: '1-2', amrap: true, compound: true, notes: 'Use band assist if needed. Full dead hang, chin over bar' },
      { name: 'Barbell Bent-over Row', sets: 4, reps: '8-12', rest: 120, rir: '1-2', notes: 'Overhand grip, pull to lower chest' },
      { name: 'Cable Pullover', sets: 3, reps: '12-15', rest: 90, rir: '0-1', notes: 'Lat isolation, keep arms slightly bent' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: 60, rir: '0-1', notes: 'Rear delt & external rotation' },
      { name: 'Incline Dumbbell Curl', sets: 3, reps: '10-12', rest: 60, rir: '0-1', notes: 'Long head stretch. Let arms hang back' },
      { name: 'Reverse Curl (EZ/cable)', sets: 3, reps: '12-15', rest: 60, rir: '0', notes: 'Brachioradialis & forearm' },
    ]
  },
  {
    day: 'SAT', name: 'Legs B', type: 'legs', focus: 'Posterior Chain (Deadlift/RDL) + Quads',
    warmup: '2-3 ramp-up sets of front squat (bar x10, 50% x8, 70% x5)',
    cardio: 'Ab circuit (3 rounds, 45s each, 15s rest): weighted planks, pallof press, decline sit-ups, reverse crunches. Then 10 min stairclimber or cycling to finish.',
    exercises: [
      { name: 'Front Squat / Hack Squat', sets: 3, reps: '8-10', rest: 180, rir: '1-2', notes: 'Quad dominant variation, upright torso' },
      { name: 'Sumo/Conv. Deadlift (lighter)', sets: 3, reps: '6-8', rest: 180, rir: '2', notes: 'Variation from Day 2. Submaximal — technique focus' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12 /leg', rest: 90, rir: '1-2', notes: 'Single leg strength & stability' },
      { name: 'Nordic Ham Curl / GHR', sets: 3, reps: '8-12', rest: 90, rir: '0-1', notes: 'Eccentric hamstring strength. Use negatives if needed' },
      { name: 'Barbell Hip Thrust', sets: 3, reps: '10-15', rest: 90, rir: '0-1', notes: 'Glute focus. Pause 2 sec at top' },
      { name: 'Seated Calf Raise', sets: 4, reps: '15-20', rest: 60, rir: '0', notes: 'Soleus emphasis. Full ROM, pause at stretch' },
    ]
  },
  { day: 'SUN', name: 'REST', type: 'rest', focus: 'Full Recovery', exercises: [] }
];

export const MOTIVATIONAL = [
  "The iron never lies. You either lift it or you don't.",
  "Discipline is choosing between what you want now and what you want most.",
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Suffer the pain of discipline or suffer the pain of regret.",
  "You don't have to be extreme, just consistent.",
  "The hard days are what make you stronger.",
  "Success isn't always about greatness. It's about consistency.",
  "Fall in love with the process and the results will come.",
  "The resistance that you fight physically in the gym strengthens you elsewhere.",
  "Today's pain is tomorrow's power.",
  "The difference between try and triumph is a little umph.",
  "Push yourself because no one else is going to do it for you.",
  "Strength does not come from winning. It comes from struggles.",
  "The body achieves what the mind believes."
];

export const REST_QUOTES = [
  "Muscles grow during rest, not during training. You've earned this.",
  "Recovery is not laziness. It's where adaptation happens.",
  "The strongest athletes know when to push and when to rest.",
  "Sleep is the most anabolic thing you can do today.",
  "Trust the process. Your muscles are rebuilding right now."
];
