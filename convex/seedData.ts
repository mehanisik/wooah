export const SEED_PROGRAMS = [
  {
    "programId": "wooah-ppl",
    "name": "Wooah! PPL",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 6,
    "description": "Push/Pull/Legs twice per week with strength-first compounds and hypertrophy accessories.",
    "tags": [
      "hypertrophy",
      "strength",
      "ppl"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Push A",
        "type": "push",
        "focus": "Chest-dominant + Shoulders + Triceps",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP set",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Upper chest focus. 30-45 deg incline",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Cable Chest Fly",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze & control eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Fly",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Secondary shoulder work",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Landmine Press",
                "equipment": "barbell"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rope or V-bar",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              },
              {
                "name": "Diamond Push-ups",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "15-20",
            "rest": 60,
            "rir": "0",
            "superset": 7,
            "notes": "Light weight, strict form. Superset w/ #7",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0",
            "superset": 6,
            "notes": "Long head emphasis. Full stretch overhead. Superset w/ #6",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Pull A",
        "type": "pull",
        "focus": "Back-dominant (Deadlift) + Biceps",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "cardio": [
          {
            "name": "Hanging Leg Raises",
            "duration": "3 x 12-15"
          },
          {
            "name": "Cable Crunches",
            "duration": "3 x 15-20"
          },
          {
            "name": "Dead Bugs",
            "duration": "3 x 10 /side"
          },
          {
            "name": "LISS Cardio (walk/bike)",
            "duration": "10-15 min"
          }
        ],
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 240,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Pull to lower chest, retract scapulae",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff. Pull to forehead, externally rotate",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Rear Delt Cable",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Strict form, no swinging",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "superset": 7,
            "notes": "Brachialis & forearm development. Superset w/ #7",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              },
              {
                "name": "Reverse Curl",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0",
            "superset": 6,
            "notes": "Side delt volume on pull day. Superset w/ #6",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "WED",
        "name": "Legs A",
        "type": "legs",
        "focus": "Quad-dominant (Squat)",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "cardio": [
          {
            "name": "Hanging Leg Raises",
            "duration": "3 x 45s"
          },
          {
            "name": "Cable Crunches",
            "duration": "3 x 45s"
          },
          {
            "name": "Ab Wheel Rollouts",
            "duration": "3 x 45s"
          },
          {
            "name": "Dead Bugs",
            "duration": "3 x 45s"
          },
          {
            "name": "LISS Cardio (walk/bike)",
            "duration": "10-15 min"
          }
        ],
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring stretch at bottom, hinge at hips",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-15",
            "rest": 120,
            "rir": "1-2",
            "notes": "Mid-high foot placement for full ROM",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Slider Curl",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze quad at top, 1 sec hold",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 5,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Full stretch at bottom, 2 sec pause at top",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Cable Pull-Through",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Glute isolation. Squeeze at top, hinge at hips",
            "alternatives": [
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              },
              {
                "name": "Hip Thrust",
                "equipment": "barbell"
              },
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Push B",
        "type": "push",
        "focus": "Shoulder-dominant + Chest + Triceps",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP. Brace core",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "DB OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine OHP",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Close-Grip Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Tricep-focused compound. Grip just inside shoulder width",
            "alternatives": [
              {
                "name": "Dips (weighted)",
                "equipment": "bodyweight"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              },
              {
                "name": "Push-ups (weighted)",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Incline Cable/DB Fly",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Upper chest isolation",
            "alternatives": [
              {
                "name": "Incline DB Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Low Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "superset": 5,
            "notes": "Long head emphasis. Superset w/ #5",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              },
              {
                "name": "Skull Crusher",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Cable Lateral Raise (1-arm)",
            "equipment": "cable",
            "sets": 5,
            "reps": "15-20",
            "rest": 60,
            "rir": "0",
            "superset": 4,
            "notes": "Lean away for better stretch. Superset w/ #4",
            "alternatives": [
              {
                "name": "DB Lateral Raise",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "Plate Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Reverse Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0",
            "notes": "Rear delt balance",
            "alternatives": [
              {
                "name": "Face Pulls",
                "equipment": "cable"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Pull B",
        "type": "pull",
        "focus": "Row/Pull-up Focus + Biceps",
        "warmup": "1-2 light sets of pull-ups (bodyweight) + light row warm-up",
        "cardio": [
          {
            "name": "Weighted Planks",
            "duration": "3 x 45s"
          },
          {
            "name": "Pallof Press",
            "duration": "3 x 12 /side"
          },
          {
            "name": "Cable Woodchops",
            "duration": "3 x 12 /side"
          },
          {
            "name": "LISS Cardio (walk/bike)",
            "duration": "10-15 min"
          }
        ],
        "exercises": [
          {
            "name": "Pull-ups (weighted if possible)",
            "equipment": "bodyweight",
            "sets": 4,
            "reps": "AMRAP (6-12)",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Use band assist if needed. Full dead hang, chin over bar",
            "alternatives": [
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Lat Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Assisted Pull-ups",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Overhand grip, pull to lower chest",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Cable Pullover",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Lat isolation, keep arms slightly bent",
            "alternatives": [
              {
                "name": "DB Pullover",
                "equipment": "dumbbell"
              },
              {
                "name": "Straight-Arm Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pullover",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & external rotation",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Rear Delt Cable",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 60,
            "rir": "0-1",
            "superset": 7,
            "notes": "Long head stretch. Let arms hang back. Superset w/ #7",
            "alternatives": [
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Preacher Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Peak contraction bicep isolation",
            "alternatives": [
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Reverse Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0",
            "superset": 5,
            "notes": "Side delt volume on pull day. Superset w/ #5",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Legs B",
        "type": "legs",
        "focus": "Posterior Chain (Deadlift/RDL) + Quads",
        "warmup": "2-3 ramp-up sets of front squat (bar x10, 50% x8, 70% x5)",
        "cardio": [
          {
            "name": "Weighted Planks",
            "duration": "3 x 45s"
          },
          {
            "name": "Pallof Press",
            "duration": "3 x 45s"
          },
          {
            "name": "Decline Sit-ups",
            "duration": "3 x 45s"
          },
          {
            "name": "Reverse Crunches",
            "duration": "3 x 45s"
          },
          {
            "name": "Stairclimber / Cycling",
            "duration": "10 min"
          }
        ],
        "exercises": [
          {
            "name": "Front Squat / Hack Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 180,
            "rir": "1-2",
            "notes": "Quad dominant variation, upright torso",
            "alternatives": [
              {
                "name": "Hack Squat Machine",
                "equipment": "machine"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Zercher Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Sumo/Conv. Deadlift (lighter)",
            "equipment": "barbell",
            "sets": 3,
            "reps": "6-8",
            "rest": 180,
            "rir": "2",
            "notes": "Variation from Day 2. Submaximal -- technique focus",
            "alternatives": [
              {
                "name": "Deficit Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Block Pull",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Bulgarian Split Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12 /leg",
            "rest": 90,
            "rir": "1-2",
            "notes": "Single leg strength & stability",
            "alternatives": [
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Step-up",
                "equipment": "dumbbell"
              },
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Nordic Ham Curl / GHR",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Eccentric hamstring strength. Use negatives if needed",
            "alternatives": [
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Slider Curl",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Glute focus. Pause 2 sec at top",
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Pull-Through",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 5,
            "reps": "15-20",
            "rest": 60,
            "rir": "0",
            "notes": "Soleus emphasis. Full ROM, pause at stretch",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      6
    ]
  },
  {
    "programId": "upper-lower-4",
    "name": "Upper/Lower Split",
    "gender": "unisex",
    "difficulty": "beginner",
    "daysPerWeek": 4,
    "description": "Classic 4-day split alternating upper and lower body. Great for beginners and intermediates.",
    "tags": [
      "hypertrophy",
      "strength"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Upper A",
        "type": "upper",
        "focus": "Horizontal Press & Row strength + arm accessories",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP set",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Overhand grip, pull to lower chest. Match bench progression",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Secondary shoulder work. Controlled eccentric",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Landmine Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Cable Chest Fly",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze & control eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Fly",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Light weight, strict form. Side delt isolation",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff health. Pull to forehead, externally rotate",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "10-12",
            "rest": 15,
            "rir": "0-1",
            "superset": 9,
            "notes": "Strict form, no swinging. Superset w/ #9",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "superset": 8,
            "notes": "Rope or V-bar. Superset w/ #8",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Lower A",
        "type": "lower",
        "focus": "Squat-dominant + hamstrings & calves",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring stretch at bottom, hinge at hips",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Mid-high foot placement for full ROM",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze quad at top, 1 sec hold",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Full stretch at bottom, 2 sec pause at top",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Upper B",
        "type": "upper",
        "focus": "Hypertrophy pressing & pulling + shoulders & arms",
        "warmup": "1-2 light sets of dumbbell press + band pull-aparts",
        "exercises": [
          {
            "name": "DB Bench Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full ROM, control the dumbbells at bottom",
            "alternatives": [
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Pull to lower chest, retract scapulae",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Upper chest focus. 30-45 deg incline",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15-20",
            "rest": 90,
            "rir": "0",
            "notes": "Light weight, strict form. Side delt isolation",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff. Pull to forehead, externally rotate",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 15,
            "rir": "0-1",
            "superset": 8,
            "notes": "Brachialis & forearm development. Superset w/ #8",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "superset": 7,
            "notes": "Long head emphasis. Superset w/ #7",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              },
              {
                "name": "Skull Crusher",
                "equipment": "ez_bar"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Lower B",
        "type": "lower",
        "focus": "Deadlift-dominant + quads, glutes & calves",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Bulgarian Split Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-10 /leg",
            "rest": 120,
            "rir": "1-2",
            "notes": "Single leg strength & stability. Rear foot elevated",
            "alternatives": [
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Step-up",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Hack Squat",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Quad-focused, keep feet low on platform",
            "alternatives": [
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Soleus emphasis. Full ROM, pause at stretch",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Glute focus. Pause 2 sec at top",
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Pull-Through",
                "equipment": "cable"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      4,
      6
    ]
  },
  {
    "programId": "full-body-3",
    "name": "Full Body 3x",
    "gender": "unisex",
    "difficulty": "beginner",
    "daysPerWeek": 3,
    "description": "Three full-body sessions per week. Perfect for beginners or those with limited time.",
    "tags": [
      "hypertrophy",
      "strength",
      "beginner"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Full Body A",
        "type": "full",
        "focus": "Squat & Bench strength + posterior chain accessories",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main lower strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main upper strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Overhand grip, pull to lower chest",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Secondary shoulder work. Controlled eccentric",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff health. Pull to forehead, externally rotate",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "WED",
        "name": "Full Body B",
        "type": "full",
        "focus": "Deadlift strength + horizontal press & pull accessories",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "DB Bench Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full ROM, control the dumbbells at bottom",
            "alternatives": [
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Mid-high foot placement for full ROM",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15-20",
            "rest": 90,
            "rir": "0",
            "notes": "Light weight, strict form. Side delt isolation",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Strict form, no swinging",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Hamstring isolation. Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff. Pull to forehead, externally rotate",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Full Body C",
        "type": "full",
        "focus": "Squat hypertrophy + upper body pressing & pulling",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 70% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 180,
            "rir": "1-2",
            "notes": "Lighter squat day focused on hypertrophy rep range",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Front Squat / Hack Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Upper chest focus. 30-45 deg incline",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Pull to lower chest, retract scapulae",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring stretch at bottom, hinge at hips",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Full stretch at bottom, 2 sec pause at top",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rope or V-bar",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              },
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Dumbbell Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Alternating or simultaneous. Full supination at top",
            "alternatives": [
              {
                "name": "Barbell Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Hammer Curl",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      1,
      3,
      5,
      6
    ]
  },
  {
    "programId": "cbum-split",
    "name": "CBum Bro Split",
    "author": "Chris Bumstead",
    "gender": "male",
    "difficulty": "advanced",
    "daysPerWeek": 5,
    "description": "Classic bodybuilding bro split inspired by Chris Bumstead. One muscle group per day with high volume.",
    "tags": [
      "hypertrophy",
      "bodybuilding"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Chest",
        "type": "chest",
        "focus": "Chest mass with incline emphasis and pressing volume",
        "warmup": "2-3 ramp-up sets of incline bench (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Incline Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Upper chest priority. 30-45 deg incline, retract scapulae",
            "alternatives": [
              {
                "name": "Incline DB Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Incline Smith Press",
                "equipment": "smith"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Flat Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Full ROM, squeeze at top. Control the eccentric",
            "alternatives": [
              {
                "name": "Flat Barbell Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Weighted Dips",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Lean forward for chest emphasis. Add weight via belt",
            "alternatives": [
              {
                "name": "Dip Machine",
                "equipment": "machine"
              },
              {
                "name": "Decline DB Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Cable Fly",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Constant tension. Squeeze at peak, 3s eccentric",
            "alternatives": [
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Fly",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Push-Ups",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "failure",
            "rest": 60,
            "rir": "0",
            "notes": "Burnout finisher. Full ROM, chest to floor",
            "alternatives": [
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Cable Crossover",
                "equipment": "cable"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Back",
        "type": "back",
        "focus": "Back thickness & width with heavy pulling",
        "warmup": "2-3 ramp-up sets of deadlift (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Conventional or sumo. Brace hard, hinge at hips",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              },
              {
                "name": "Barbell Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Pull-Ups",
            "equipment": "bodyweight",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Add weight via belt when bodyweight is easy. Full dead hang",
            "alternatives": [
              {
                "name": "Chin-Ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Lat Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Assisted Pull-Ups",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Bent-Over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Overhand grip, pull to lower chest. Torso ~45 deg",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Wide grip, lean back slightly, pull to upper chest",
            "alternatives": [
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              },
              {
                "name": "Straight-Arm Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Close-grip handle, squeeze scapulae at contraction",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              },
              {
                "name": "Cable Pullover",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Shoulders",
        "type": "shoulders",
        "focus": "All three delt heads with heavy pressing and trap work",
        "warmup": "2-3 ramp-up sets of OHP (light DB x12, moderate x8)",
        "exercises": [
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Full lockout, controlled descent. Primary shoulder press",
            "alternatives": [
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Dumbbell Lateral Raise",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slight lean forward, lead with elbows. Light and strict",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Rear Delt Fly",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Bent over or on incline bench. Squeeze at contraction",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Cable Reverse Fly",
                "equipment": "cable"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Barbell Shrug",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Straight up, 2s hold at top. No rolling",
            "alternatives": [
              {
                "name": "DB Shrug",
                "equipment": "dumbbell"
              },
              {
                "name": "Smith Machine Shrug",
                "equipment": "smith"
              },
              {
                "name": "Trap Bar Shrug",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Face Pull",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "External rotation at top. Pull rope to forehead",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Legs",
        "type": "legs",
        "focus": "Quad & hamstring mass with squat focus and calf work",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main leg lift. Break at hips and knees together",
            "alternatives": [
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Mid foot placement, full depth without butt wink",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Hinge at hips, deep hamstring stretch, slight knee bend",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze quad at top, 1s hold",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3s). Full ROM",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Leg Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Full stretch at bottom, 2s pause at top",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Arms",
        "type": "arms",
        "focus": "Dedicated bicep & tricep hypertrophy",
        "warmup": "Light cable curls + pushdowns (2 x 15 each)",
        "exercises": [
          {
            "name": "Close-Grip Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Grip just inside shoulder width. Tricep compound",
            "alternatives": [
              {
                "name": "Weighted Dips",
                "equipment": "bodyweight"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              },
              {
                "name": "JM Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Barbell Curl",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Strict form, no swinging. Control the negative",
            "alternatives": [
              {
                "name": "EZ Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Skull Crushers",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Lower to forehead, keep elbows tucked",
            "alternatives": [
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "DB Skull Crushers",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Brachialis & forearm. Neutral grip, no momentum",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              },
              {
                "name": "Reverse Curl",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "V-bar or straight bar. Full lockout at bottom",
            "alternatives": [
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Diamond Push-Ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Concentration Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Peak contraction focus. Squeeze at top, slow negative",
            "alternatives": [
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              },
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      6
    ]
  },
  {
    "programId": "nippard-ppl",
    "name": "Nippard Fundamentals PPL",
    "author": "Jeff Nippard",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 6,
    "description": "Science-based PPL with balanced volume and progressive overload. Emphasizes compound movements with smart accessory work.",
    "tags": [
      "hypertrophy",
      "science-based"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Push A",
        "type": "push",
        "focus": "Chest-dominant + Shoulders + Triceps",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary chest builder. Add 2.5kg when you hit 8+ on AMRAP set",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Upper chest focus. 30 deg incline for optimal upper pec activation",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Cable Chest Fly",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Peak contraction at midline. Control the eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Fly",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Secondary pressing. Full ROM, control at bottom",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slight forward lean, lead with elbows. Light weight, strict form",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Long head emphasis. Full stretch overhead, lock out at top",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Pull A",
        "type": "pull",
        "focus": "Back width + Biceps",
        "warmup": "1-2 light sets of lat pulldown + band pull-aparts",
        "exercises": [
          {
            "name": "Pull-ups (weighted if possible)",
            "equipment": "bodyweight",
            "sets": 4,
            "reps": "6-10",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Add weight when you can do 10+ reps. Full dead hang, chin over bar",
            "alternatives": [
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Assisted Pull-ups",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Neutral or V-grip. Pull to lower chest, retract scapulae",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Wide overhand grip. Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              },
              {
                "name": "Straight-Arm Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rear delt & external rotation. Pull to forehead, spread the rope",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Strict form, no swinging. EZ bar reduces wrist strain",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Brachialis & forearm development. Neutral grip throughout",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              },
              {
                "name": "Zottman Curl",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "WED",
        "name": "Legs A",
        "type": "legs",
        "focus": "Quad-dominant + Posterior chain + Calves",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary quad builder. Add 2.5kg when you hit 8+ on AMRAP set",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat / Hack Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Mid-high foot placement for full ROM. Do not lock out knees",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze quad at top, 1 sec hold. Slow eccentric",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring stretch at bottom, hinge at hips. Keep bar close",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Full stretch at bottom, 2 sec pause at top. Gastrocnemius focus",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Push B",
        "type": "push",
        "focus": "Shoulder-dominant + Chest + Triceps",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary shoulder builder. Add weight when you hit 8+ on AMRAP",
            "alternatives": [
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Upper chest volume. 30 deg incline, full ROM",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Chest isolation. Squeeze at peak contraction, slow eccentric",
            "alternatives": [
              {
                "name": "Cable Chest Fly",
                "equipment": "cable"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Fly",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "15-20",
            "rest": 90,
            "rir": "0",
            "notes": "Higher volume side delt work. Light weight, strict form, lead with elbows",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "Cable Lateral Raise (1-arm)",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rope or V-bar. Elbows pinned to sides, full extension",
            "alternatives": [
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Skull Crushers",
            "equipment": "ez_bar",
            "sets": 2,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Lower to forehead, extend fully. Long head stretch at bottom",
            "alternatives": [
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Pull B",
        "type": "pull",
        "focus": "Back thickness + Biceps",
        "warmup": "1-2 light sets of rows + band pull-aparts",
        "exercises": [
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary back thickness builder. Overhand grip, 45 deg torso angle, pull to navel",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Close-Grip Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "V-grip or neutral handle. Full stretch at top, squeeze at bottom",
            "alternatives": [
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              },
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Chest-Supported Row",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Removes momentum. Focus on scapular retraction and squeeze",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Reverse Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "15-20",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rear delt isolation. Squeeze at contraction, control the negative",
            "alternatives": [
              {
                "name": "Face Pulls",
                "equipment": "cable"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Preacher Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Short head emphasis. Full stretch at bottom, squeeze at top",
            "alternatives": [
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Incline Dumbbell Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Reverse Curl (EZ/cable)",
            "equipment": "ez_bar",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Brachioradialis & forearm development. Overhand grip, strict form",
            "alternatives": [
              {
                "name": "Hammer Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Zottman Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Wrist Curl",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Legs B",
        "type": "legs",
        "focus": "Hamstring-dominant + Quads + Calves",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary posterior chain builder. Brace core, push floor away. Add 2.5kg when you hit 5+ on AMRAP",
            "alternatives": [
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Bulgarian Split Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Single leg strength & stability. Rear foot elevated, torso upright",
            "alternatives": [
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Step-up",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Hamstring isolation. Slow eccentric (3 sec), full ROM",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Quad isolation. Squeeze at top, 1 sec hold",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Soleus emphasis. Full ROM, pause at stretch, 2 sec at top",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      6
    ]
  },
  {
    "programId": "nippard-ul",
    "name": "Nippard Upper/Lower",
    "author": "Jeff Nippard",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Jeff Nippard's science-based Upper/Lower split. Wave-loaded progression with emphasis on lengthened partials and training close to failure.",
    "tags": [
      "hypertrophy",
      "science-based",
      "upper/lower"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Upper A",
        "type": "upper",
        "focus": "Bench press strength + back thickness + shoulders & arms",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5) + band pull-aparts",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary horizontal press. Wave-load: add 2.5kg when you hit 8+ on AMRAP. Use leg drive, retract scapulae, arch moderately",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Overhand grip, ~45 deg torso angle, pull to navel. Match bench press progression. Brace core to protect lower back",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Secondary vertical press. Full ROM from ear level to lockout. Control the eccentric for shoulder health",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Cable Lateral Raise",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Behind-the-body cable path for lengthened partial emphasis. Lean slightly away from cable to maximize stretch on side delts",
            "alternatives": [
              {
                "name": "DB Lateral Raise",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Long head bicep emphasis via stretch position. 45 deg incline, let arms hang straight, slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Barbell Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Long head tricep emphasis. Full stretch overhead, lock out at top. Rope attachment preferred for wrist-friendly position",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Overhead DB Extension",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Lower A",
        "type": "lower",
        "focus": "Squat strength + posterior chain + quad isolation + calves",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5) + leg swings",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary quad & glute builder. Wave-load: add 2.5kg when you hit 8+ on AMRAP. Hit depth (hip crease below knee), brace core hard",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring & glute lengthened position. Hinge at hips, keep bar close to legs. Feel a deep stretch in hamstrings before reversing",
            "alternatives": [
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Quad-focused secondary compound. Feet mid-low on platform, full depth without lumbar rounding. Do not lock out knees",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Hamstring isolation. Slow eccentric (3 sec) for lengthened partial overload. Dorsiflex ankles to bias hamstrings over calves",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "10-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Gastrocnemius focus (straight knee). Full stretch at bottom (2 sec), hard squeeze at top (1 sec). Research supports slower tempos for calves",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Upper B",
        "type": "upper",
        "focus": "OHP strength + back width + incline press + rear delts & arms",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5) + band pull-aparts",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary vertical press. Strict form — no leg drive. Wave-load: add 2.5kg when you hit 8+ on AMRAP. Squeeze glutes for stability",
            "alternatives": [
              {
                "name": "Seated DB OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Push Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Pull-ups (weighted if possible)",
            "equipment": "bodyweight",
            "sets": 4,
            "reps": "6-10",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Back width builder. Full dead hang at bottom, chin over bar at top. Add weight via belt when you can do 10+ reps",
            "alternatives": [
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Assisted Pull-ups",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Upper chest focus. 30 deg incline for optimal upper pec activation per EMG data. Full stretch at bottom",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Back thickness. Neutral V-grip, pull to lower chest, retract scapulae and hold 1 sec. Allow full protraction on eccentric for stretch",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Reverse Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "15-20",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rear delt isolation. Squeeze at peak contraction (1 sec), control negative. Important for shoulder balance and posture",
            "alternatives": [
              {
                "name": "Face Pulls",
                "equipment": "cable"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Short head bicep emphasis. Strict form — no swinging. EZ bar reduces wrist strain vs straight bar",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Lateral head emphasis. Elbows pinned to sides, full extension and squeeze. Rope or V-bar attachment",
            "alternatives": [
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Lower B",
        "type": "lower",
        "focus": "Deadlift strength + quad accessories + hamstring curl + calves",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3) + hip circles",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5-6",
            "rest": 210,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary posterior chain builder. Brace hard, push the floor away. Wave-load: add 2.5kg when you hit 6+ on AMRAP. Reset each rep",
            "alternatives": [
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Hack Squat",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Quad-dominant press after deadlift. Feet low on platform, full depth. Lengthened partials in bottom half if desired for extra stimulus",
            "alternatives": [
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Quad isolation. Squeeze at top for 1 sec, control eccentric. Lengthened partials in bottom range per Nippard recommendation",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Seated Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Hamstring isolation. Seated > lying per research for greater stretch under load. Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Bulgarian Split Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-10 /leg",
            "rest": 120,
            "rir": "1-2",
            "notes": "Unilateral quad & glute work. Rear foot elevated, torso upright. Addresses strength imbalances between sides",
            "alternatives": [
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Step-up",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Soleus emphasis (bent knee). Full ROM with 2 sec stretch at bottom, 1 sec squeeze at top. Pairs with standing calf from Lower A",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  },
  {
    "programId": "nippard-fundamentals",
    "name": "Nippard Fundamentals",
    "author": "Jeff Nippard",
    "gender": "unisex",
    "difficulty": "beginner",
    "daysPerWeek": 3,
    "description": "Jeff Nippard's beginner-friendly 3-day full body program. Science-based exercise selection with clear progression for building a muscle & strength foundation.",
    "tags": [
      "hypertrophy",
      "beginner",
      "full body",
      "science-based"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Full Body A",
        "type": "full",
        "focus": "Squat & bench strength + back, posterior chain, calves & biceps",
        "warmup": "5 min bike or walk, 2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "6",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Brace core, sit between hips, knees over toes. AMRAP on last set",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Retract scapulae, slight arch, feet flat. AMRAP on last set",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Wide-Grip Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Wide overhand grip, drive elbows down, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Assisted Pull-ups",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Hinge at hips, bar close to legs, deep hamstring stretch at bottom",
            "alternatives": [
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Assisted Dip",
            "equipment": "machine",
            "sets": 3,
            "reps": "8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Slight forward lean for chest emphasis. Progress to weighted dips",
            "alternatives": [
              {
                "name": "Weighted Dip",
                "equipment": "bodyweight"
              },
              {
                "name": "Tricep Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Full stretch at bottom, pause at top. Controlled tempo",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Dumbbell Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Strict form, no swinging. Controlled negative",
            "alternatives": [
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "EZ Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Hammer Curl",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "WED",
        "name": "Full Body B",
        "type": "full",
        "focus": "Deadlift strength + OHP, rows, quads, chest & triceps",
        "warmup": "5 min bike or walk, 2-3 ramp-up sets of deadlift (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Brace hard, push floor away, lock out with glutes. AMRAP on last set",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Machine Overhead Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Controlled press overhead, full lockout. Machine keeps stable path for beginners",
            "alternatives": [
              {
                "name": "Seated DB OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine OHP",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Chest-Supported Row",
            "equipment": "machine",
            "sets": 3,
            "reps": "12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Chest on pad removes lower back stress. Squeeze scapulae at top",
            "alternatives": [
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Quad isolation. Full lockout at top, slow eccentric",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Squeeze at midline, slow eccentric. Keep slight bend in elbows",
            "alternatives": [
              {
                "name": "Cable Fly",
                "equipment": "cable"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Crunch",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Curl ribcage toward pelvis. No pulling on neck",
            "alternatives": [
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              },
              {
                "name": "Hanging Leg Raise",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Skull Crusher",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Lower to forehead, elbows pointed up. Controlled eccentric",
            "alternatives": [
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              },
              {
                "name": "Tricep Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Full Body C",
        "type": "full",
        "focus": "Lunges, incline press, pulldown, hip thrust, rear delts & hamstrings",
        "warmup": "5 min bike or walk, light lunges x10 each leg, 1-2 ramp-up sets of incline press",
        "exercises": [
          {
            "name": "DB Walking Lunge",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "10 reps per leg. Long stride, upright torso, drive through front heel",
            "alternatives": [
              {
                "name": "Bulgarian Split Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Incline DB Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "30-45 deg incline, full ROM. Upper chest emphasis",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Underhand Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Supinated grip, shoulder-width. Emphasizes lower lats and biceps",
            "alternatives": [
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Upper back on bench, drive through heels, full hip extension at top",
            "alternatives": [
              {
                "name": "Glute Bridge",
                "equipment": "barbell"
              },
              {
                "name": "Hip Thrust Machine",
                "equipment": "machine"
              },
              {
                "name": "Cable Pull-Through",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Reverse Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Rear delt focus. Lead with elbows, squeeze at full contraction",
            "alternatives": [
              {
                "name": "Face Pulls",
                "equipment": "cable"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Slight forward lean, lead with elbows, raise to shoulder height",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Hamstring isolation. Slow eccentric, full ROM, squeeze at peak",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      1,
      3,
      5,
      6
    ]
  },
  {
    "programId": "gzclp",
    "name": "GZCLP",
    "gender": "unisex",
    "difficulty": "beginner",
    "daysPerWeek": 4,
    "description": "GZCL linear progression. Tiered approach: heavy T1, moderate T2, high-rep T3.",
    "tags": [
      "strength",
      "linear-progression",
      "beginner"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Day 1 — Squat/Bench",
        "type": "full",
        "focus": "T1 Squat + T2 Bench + T3 Lat Pulldown",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 5,
            "reps": "3",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "T1. Last set AMRAP. Add 2.5 kg when you hit 3+ reps",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2. Moderate weight, controlled tempo",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "amrap": true,
            "notes": "T3. Last set AMRAP. Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Day 2 — OHP/Deadlift",
        "type": "full",
        "focus": "T1 OHP + T2 Deadlift + T3 DB Row",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 5,
            "reps": "3",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "T1. Last set AMRAP. Add 2.5 kg when you hit 3+ reps",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2. Moderate weight, brace hard each rep",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Dumbbell Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "amrap": true,
            "notes": "T3. Last set AMRAP. Each arm, full stretch and squeeze",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Day 3 — Bench/Squat",
        "type": "full",
        "focus": "T1 Bench + T2 Squat + T3 Lat Pulldown",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 5,
            "reps": "3",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "T1. Last set AMRAP. Add 2.5 kg when you hit 3+ reps",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2. Moderate weight, full depth",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "amrap": true,
            "notes": "T3. Last set AMRAP. Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Day 4 — Deadlift/OHP",
        "type": "full",
        "focus": "T1 Deadlift + T2 OHP + T3 DB Row",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 5,
            "reps": "3",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "T1. Last set AMRAP. Add 2.5 kg when you hit 3+ reps",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2. Moderate weight, strict press",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Dumbbell Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "amrap": true,
            "notes": "T3. Last set AMRAP. Each arm, full stretch and squeeze",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  },
  {
    "programId": "nsuns-5day",
    "name": "nSuns 5/3/1",
    "gender": "male",
    "difficulty": "intermediate",
    "daysPerWeek": 5,
    "description": "High-volume 5/3/1 linear progression variant. Each day has a T1 main lift (9 sets at % TM) and a T2 supplemental lift (8 sets) plus 2-3 optional accessories. Add weight weekly based on AMRAP performance.",
    "tags": [
      "strength",
      "powerlifting",
      "linear progression"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Bench / OHP",
        "type": "upper",
        "focus": "T1 Bench Press 9 sets + T2 OHP 8 sets + accessories",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 9,
            "reps": "1-5",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP",
            "alternatives": [
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 8,
            "reps": "3-8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Suggested accessory. Back width balance for pressing volume",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Suggested accessory. Rear delt & shoulder health",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Squat / Sumo DL",
        "type": "lower",
        "focus": "T1 Squat 9 sets + T2 Sumo Deadlift 8 sets + accessories",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 9,
            "reps": "1-5",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Sumo Deadlift",
            "equipment": "barbell",
            "sets": 8,
            "reps": "3-8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation",
            "alternatives": [
              {
                "name": "Conventional Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Suggested accessory. Hamstring isolation",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Ab Wheel Rollout",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Suggested accessory. Core stability for squats",
            "alternatives": [
              {
                "name": "Hanging Leg Raise",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "OHP / Incline Bench",
        "type": "upper",
        "focus": "T1 OHP 9 sets + T2 Incline Bench 8 sets + accessories",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 9,
            "reps": "1-5",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Push Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline Barbell Press",
            "equipment": "barbell",
            "sets": 8,
            "reps": "3-8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation",
            "alternatives": [
              {
                "name": "Incline Dumbbell Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Incline Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Suggested accessory. Back work to balance pressing",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Suggested accessory. Side delt volume",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Deadlift / Front Squat",
        "type": "lower",
        "focus": "T1 Deadlift 9 sets + T2 Front Squat 8 sets + accessories",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 9,
            "reps": "1-5",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP",
            "alternatives": [
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Front Squat",
            "equipment": "barbell",
            "sets": 8,
            "reps": "3-8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Chin-ups",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "6-10",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Suggested accessory. Add weight when bodyweight is easy",
            "alternatives": [
              {
                "name": "Lat Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Hanging Leg Raise",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Suggested accessory. Core strength for deadlift bracing",
            "alternatives": [
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Bench / CGBP",
        "type": "upper",
        "focus": "T1 Bench Press 9 sets + T2 Close-Grip Bench 8 sets + accessories",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 9,
            "reps": "1-5",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Close-Grip Bench Press",
            "equipment": "barbell",
            "sets": 8,
            "reps": "3-8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "T2 supplemental. Sets follow % TM scheme. Tricep emphasis, hands shoulder-width",
            "alternatives": [
              {
                "name": "DB Floor Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "DB Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Suggested accessory. Back balance for bench volume",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Suggested accessory. Brachialis & forearm work",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      6
    ]
  },
  {
    "programId": "phul",
    "name": "PHUL",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Power Hypertrophy Upper Lower. Combines heavy strength work with high-volume hypertrophy for balanced growth.",
    "tags": [
      "hypertrophy",
      "strength",
      "powerbuilding"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Power Upper",
        "type": "upper",
        "focus": "Heavy compound pressing & rowing for upper-body strength",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "3-5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP set",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Overhand grip, pull to lower chest. Match bench progression",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 3,
            "reps": "6-8",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Secondary press. Strict press, brace core, full lockout",
            "alternatives": [
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full stretch at top, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Strict form, no swinging. Heavier than hypertrophy day",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Skull Crushers",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Lower to forehead, extend fully. Keep elbows tucked",
            "alternatives": [
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Power Lower",
        "type": "lower",
        "focus": "Heavy squat & deadlift for lower-body strength",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Main strength lift. Add 2.5kg when you hit 5+ on AMRAP set",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat / Hack Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Reset each rep. Add 2.5kg when you hit 5+ on AMRAP set",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Mid-high foot placement for full ROM. Secondary quad volume",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Slow eccentric (3 sec). Heavier than hypertrophy day",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 2,
            "reps": "6-10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Quad isolation. Squeeze at top, heavy and controlled",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Leg Press (narrow)",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Soleus emphasis. Full ROM, heavy. Bent-knee targets deeper calf",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Hypertrophy Upper",
        "type": "upper",
        "focus": "High-volume pressing, pulling & isolation for upper-body growth",
        "warmup": "1-2 light sets of dumbbell press + band pull-aparts",
        "exercises": [
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "30-45 deg incline. Control the eccentric, stretch at bottom",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Pull to lower chest, retract scapulae. Full stretch forward",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Flye",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Chest isolation. Slight elbow bend, deep stretch at bottom",
            "alternatives": [
              {
                "name": "Cable Fly",
                "equipment": "cable"
              },
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Machine Fly",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "One-Arm DB Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Brace on bench, pull to hip. Squeeze lat at top",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Light weight, strict form. Side delt isolation",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Alternating or simultaneous. Full supination at top",
            "alternatives": [
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Preacher Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Incline Dumbbell Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Long head emphasis. Full stretch overhead",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              },
              {
                "name": "Skull Crusher",
                "equipment": "ez_bar"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Hypertrophy Lower",
        "type": "lower",
        "focus": "High-volume quad, hamstring, glute & calf work for growth",
        "warmup": "5 min bike or light leg press x15 + bodyweight squats",
        "exercises": [
          {
            "name": "Front Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Quad-dominant squat variation. Upright torso, full depth",
            "alternatives": [
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring stretch at bottom, hinge at hips. Lighter than power day",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Squeeze quad at top, 1 sec hold",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3 sec). Higher reps than power day",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Glute focus. Pause 2 sec at top, squeeze hard",
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Pull-Through",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Soleus emphasis. Full ROM, pause at stretch",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      4,
      6
    ]
  },
  {
    "programId": "strong-curves",
    "name": "Strong Curves",
    "author": "Bret Contreras",
    "gender": "female",
    "difficulty": "beginner",
    "daysPerWeek": 3,
    "description": "Bootyful Beginnings phase — 3-day full body program focused on building glutes and overall strength. Progressive hip thrust emphasis with balanced upper body work.",
    "tags": [
      "glutes",
      "strength",
      "beginner"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Workout A",
        "type": "full",
        "focus": "Glute bridge focus + squat pattern + posterior chain",
        "warmup": "5 min walking + glute activation (banded clamshells x15, bodyweight glute bridges x10)",
        "exercises": [
          {
            "name": "Glute Bridge",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "20",
            "rest": 60,
            "rir": "2-3",
            "notes": "Squeeze glutes hard at top, 2 sec hold. Foundation movement",
            "alternatives": [
              {
                "name": "Banded Glute Bridge",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Goblet Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Hold DB at chest, sit back and down, knees track toes",
            "alternatives": [
              {
                "name": "Bodyweight Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "DB Step-Up",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "10/leg",
            "rest": 90,
            "rir": "1-2",
            "notes": "Use a bench or box. Drive through front heel, control descent",
            "alternatives": [
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Romanian Deadlift",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Hinge at hips, slight knee bend, feel stretch in hamstrings",
            "alternatives": [
              {
                "name": "BB Romanian Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Side-Lying Hip Abduction",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "15",
            "rest": 60,
            "rir": "1-2",
            "notes": "Lie on side, raise top leg. Keep hips stacked, slow tempo",
            "alternatives": [
              {
                "name": "Banded Lateral Walk",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Hip Abduction",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Plank",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "30s",
            "rest": 60,
            "rir": "1-2",
            "notes": "Keep body in straight line, brace core, breathe normally",
            "alternatives": [
              {
                "name": "Dead Bug",
                "equipment": "bodyweight"
              },
              {
                "name": "Bird Dog",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      },
      {
        "day": "WED",
        "name": "Workout B",
        "type": "full",
        "focus": "Single-leg glute work + pull emphasis",
        "warmup": "5 min walking + banded lateral walks x15/side, fire hydrants x10/side",
        "exercises": [
          {
            "name": "Single-Leg Glute Bridge",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "15",
            "rest": 60,
            "rir": "1-2",
            "notes": "One foot planted, other knee pulled to chest. Squeeze at top",
            "alternatives": [
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Walking Lunge",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "10/leg",
            "rest": 90,
            "rir": "1-2",
            "notes": "Bodyweight only. Long stride, upright torso, control each step",
            "alternatives": [
              {
                "name": "Reverse Lunge",
                "equipment": "bodyweight"
              },
              {
                "name": "Step-Up",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Hamstring isolation. Slow eccentric (3 sec)",
            "alternatives": [
              {
                "name": "Stability Ball Leg Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Wide grip, pull to upper chest, squeeze lats at bottom",
            "alternatives": [
              {
                "name": "Assisted Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Push-Up",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10",
            "rest": 60,
            "rir": "1-2",
            "notes": "From knees if needed. Full range of motion, chest to floor",
            "alternatives": [
              {
                "name": "Incline Push-Up",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Side Plank",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "20s",
            "rest": 60,
            "rir": "1-2",
            "notes": "Elbow under shoulder, hips lifted, hold each side",
            "alternatives": [
              {
                "name": "Pallof Press",
                "equipment": "cable"
              },
              {
                "name": "Copenhagen Plank",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Workout C",
        "type": "full",
        "focus": "Barbell hip thrust focus + compound movements",
        "warmup": "5 min walking + glute activation (banded squats x10, single-leg glute bridge x8/side)",
        "exercises": [
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 3,
            "reps": "12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Back on bench, drive through heels, full hip extension. Key movement of the program",
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Hip Thrust",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Goblet Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Slightly heavier than Workout A, same form cues",
            "alternatives": [
              {
                "name": "Barbell Back Squat",
                "equipment": "barbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Back Extension",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "15",
            "rest": 60,
            "rir": "1-2",
            "notes": "Squeeze glutes at top. Can hold DB at chest for progression",
            "alternatives": [
              {
                "name": "Reverse Hyper",
                "equipment": "machine"
              },
              {
                "name": "Superman",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "Controlled press, full lockout, elbows slightly forward",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10",
            "rest": 90,
            "rir": "1-2",
            "notes": "One arm at a time, brace on bench. Pull to hip",
            "alternatives": [
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "RKC Plank",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "20s",
            "rest": 60,
            "rir": "1-2",
            "notes": "Like regular plank but squeeze everything — glutes, quads, fists. Max tension",
            "alternatives": [
              {
                "name": "Plank",
                "equipment": "bodyweight"
              },
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      1,
      3,
      5,
      6
    ]
  },
  {
    "programId": "womens-upper-lower",
    "name": "Women's Upper/Lower",
    "gender": "female",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Balanced 4-day split designed for women. Emphasizes glutes and shoulders while building overall strength.",
    "tags": [
      "hypertrophy",
      "women",
      "balanced"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Upper A",
        "type": "upper",
        "focus": "Horizontal press & row with shoulder and arm accessories",
        "warmup": "1-2 light sets of dumbbell press + band pull-aparts",
        "exercises": [
          {
            "name": "DB Bench Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "alternatives": [
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Flat Barbell Bench Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "alternatives": [
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown (wide)",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Assisted Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "10-12",
            "rest": 15,
            "rir": "0-1",
            "superset": 6,
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "superset": 5,
            "alternatives": [
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff. Pull to forehead, externally rotate",
            "alternatives": [
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Lower A",
        "type": "lower",
        "focus": "Glute-dominant with squat and hip hinge",
        "warmup": "5 min walking + glute activation (banded clamshells, glute bridges)",
        "exercises": [
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "alternatives": [
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Upper B",
        "type": "upper",
        "focus": "Incline pressing & cable pulling with rear delt and arm work",
        "warmup": "1-2 light sets of incline press + band pull-aparts",
        "exercises": [
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Machine Shoulder Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Seated Dumbbell OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Close-Grip Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Reverse Pec Deck",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Face Pulls",
                "equipment": "cable"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 15,
            "rir": "0-1",
            "superset": 6,
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "superset": 5,
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Lower B",
        "type": "lower",
        "focus": "Unilateral and machine lower body with glute finishers",
        "warmup": "5 min walking + banded lateral walks, fire hydrants",
        "exercises": [
          {
            "name": "Bulgarian Split Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "alternatives": [
              {
                "name": "Reverse Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Cable Pull-Through",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Hip Thrust",
            "equipment": "barbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Glute focus. Drive through heels, full hip extension, 2 sec squeeze at top",
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Glute Bridge",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      4,
      6
    ]
  },
  {
    "programId": "bullmastiff",
    "name": "Bullmastiff",
    "author": "Alex Bromley",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Powerbuilding program from Base Strength by Alex Bromley. Uses 3-week wave loading on main lifts with AMRAP autoregulation, developmental variations for weak points, and targeted accessories.",
    "tags": [
      "strength",
      "powerbuilding"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Squat Day",
        "type": "legs",
        "focus": "Main squat with posterior chain developmental and accessories",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "Wave loading across 3-week waves. AMRAP final set to autoregulate progression",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Stiff-Leg Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Developmental lift. Build posterior chain to support squat. Slight knee bend, deep stretch",
            "alternatives": [
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "1-2",
            "notes": "Wide grip, pull to upper chest. Back width for squat shelf",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Quad isolation finisher. Squeeze at top, controlled eccentric",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Leg Press (narrow)",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hanging Leg Raise",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Core stability for squats. Control the movement, no swinging",
            "alternatives": [
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              },
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              },
              {
                "name": "Decline Sit-up",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Bench Day",
        "type": "upper",
        "focus": "Main bench press with overhead developmental and accessories",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "Wave loading across 3-week waves. AMRAP final set to autoregulate progression",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Behind-the-Neck Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Developmental lift. Seated or standing, wide grip. Builds overhead strength and delt mass",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "DB Shoulder Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Rope or bar attachment. Lockout emphasis for bench",
            "alternatives": [
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Lead with elbows, light and controlled. Side delt volume",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Face Pull",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt and shoulder health. Pull to forehead, external rotation",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Deadlift Day",
        "type": "legs",
        "focus": "Main deadlift with front squat developmental and accessories",
        "warmup": "2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "Wave loading across 3-week waves. AMRAP final set to autoregulate progression",
            "alternatives": [
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Block Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Front Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Developmental lift. Builds quad strength and upright posture for deadlift",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "1-2",
            "notes": "Neutral grip. Squeeze scapulae, controlled negative",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Seated or lying. Slow eccentric, full ROM",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Swiss Ball Curl",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Cable Crunch",
            "equipment": "cable",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Core bracing for deadlift. Crunch toward knees, hold contraction",
            "alternatives": [
              {
                "name": "Hanging Leg Raise",
                "equipment": "bodyweight"
              },
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              },
              {
                "name": "Decline Sit-up",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "OHP Day",
        "type": "upper",
        "focus": "Main overhead press with close-grip bench developmental and accessories",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6",
            "rest": 180,
            "rir": "0-1",
            "amrap": true,
            "compound": true,
            "notes": "Wave loading across 3-week waves. Strict press, no leg drive. AMRAP final set",
            "alternatives": [
              {
                "name": "Push Press",
                "equipment": "barbell"
              },
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Close-Grip Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Developmental lift. Builds lockout strength and triceps for pressing",
            "alternatives": [
              {
                "name": "Larsen Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Spoto Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Barbell Curl",
            "equipment": "barbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Strict form, no swinging. EZ bar acceptable",
            "alternatives": [
              {
                "name": "EZ Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Lead with elbows, light and controlled. Side delt volume",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Reverse Fly",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt balance. Bent over or incline bench supported",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Face Pull",
                "equipment": "cable"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  },
  {
    "programId": "reddit-ppl",
    "name": "Reddit PPL (Metallicadpa)",
    "author": "u/Metallicadpa",
    "gender": "unisex",
    "difficulty": "beginner",
    "daysPerWeek": 6,
    "description": "The classic r/Fitness PPL. Linear progression on compounds, 6 days/week. Best beginner hypertrophy + strength program on Reddit.",
    "tags": [
      "hypertrophy",
      "strength",
      "linear progression",
      "ppl"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Pull A",
        "type": "pull",
        "focus": "Deadlift + back & biceps (heavy)",
        "warmup": "2-3 ramp-up sets of deadlift (135 x5, 50% x5, 70% x3)",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 1,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Linear progression: add 5 kg/10 lbs each session. 1x5+ means one AMRAP set",
            "alternatives": [
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 5,
            "reps": "5",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "5x5 — overhand grip, pull to lower chest. Add weight when all sets done",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Wide grip, full stretch at top",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Neutral grip, squeeze scapulae",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 5,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff health. High reps, light weight",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Neutral grip. No swinging",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              },
              {
                "name": "Reverse Curl",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Dumbbell Curl",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Supinated grip. Control the negative",
            "alternatives": [
              {
                "name": "Barbell Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Push A",
        "type": "push",
        "focus": "Bench press + shoulders & triceps (heavy)",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 70% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 5,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Linear progression: add 2.5 kg/5 lbs each session. 4x5, 1x5+ (AMRAP last set)",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Strict press. Add weight when hitting 3x12",
            "alternatives": [
              {
                "name": "Seated Dumbbell OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "30 deg incline. Upper chest emphasis",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Straight bar or V-bar. Full lockout",
            "alternatives": [
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Diamond Push-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Long head emphasis. Full stretch overhead",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 6,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "High volume side delt work. Light weight, lead with elbows",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "WED",
        "name": "Legs A",
        "type": "legs",
        "focus": "Squat focus + hamstring & calf work",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 70% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Linear progression: add 2.5 kg/5 lbs each session. 2x5, 1x5+ (AMRAP)",
            "alternatives": [
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Hinge at hips, deep hamstring stretch",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full depth, mid foot placement",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (seated/lying)",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Controlled negative, full ROM",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 5,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Full stretch at bottom, pause at top",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Pull B",
        "type": "pull",
        "focus": "Row focus + back & biceps (volume)",
        "warmup": "Light band pull-aparts + lat stretches",
        "exercises": [
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 5,
            "reps": "5",
            "rest": 120,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Linear progression: add 2.5 kg/5 lbs each session. 4x5, 1x5+ AMRAP",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Pull-ups (weighted if possible)",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Add weight via belt when bodyweight is easy",
            "alternatives": [
              {
                "name": "Lat Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Assisted Pull-ups",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Different grip than Pull A. Wide or close grip",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Face Pulls",
            "equipment": "cable",
            "sets": 5,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rear delt & rotator cuff health",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Barbell Curl (EZ/straight)",
            "equipment": "ez_bar",
            "sets": 4,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Strict form, control the eccentric",
            "alternatives": [
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 4,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Neutral grip. Brachialis & forearm",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              },
              {
                "name": "Reverse Curl",
                "equipment": "ez_bar"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Push B",
        "type": "push",
        "focus": "OHP focus + chest & triceps (volume)",
        "warmup": "2-3 ramp-up sets of OHP (bar x10, 50% x8, 70% x5)",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 5,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Linear progression: add 2.5 kg/5 lbs each session. 4x5, 1x5+ AMRAP",
            "alternatives": [
              {
                "name": "Seated Dumbbell OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Push Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Volume bench. Add weight when hitting 3x12",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "30-45 deg incline",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Use different attachment than Push A",
            "alternatives": [
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Diamond Push-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Long head emphasis",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 6,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "High volume side delt work. Light and strict",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Legs B",
        "type": "legs",
        "focus": "Squat volume + hamstring & calf work",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 70% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Linear progression. 2x5, 1x5+ (AMRAP last set)",
            "alternatives": [
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Hinge at hips, deep hamstring stretch",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Full depth, different foot position than Legs A",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (seated/lying)",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Controlled negative, full ROM",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 5,
            "reps": "8-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Full stretch, pause at top",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      6
    ]
  },
  {
    "programId": "531-bbb",
    "name": "5/3/1 Boring But Big",
    "author": "Jim Wendler",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Jim Wendler's classic 5/3/1 with Boring But Big supplemental. 4 days/week with 5x10 volume work after main lifts. Simple, effective strength + size.",
    "tags": [
      "strength",
      "powerlifting",
      "periodization"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Squat",
        "type": "lower",
        "focus": "Heavy squat 5/3/1 + Boring But Big 5x10 squat volume & accessories",
        "warmup": "3 ramp-up sets of squat (bar x10, 40% x5, 60% x3) then 1-2 jumps or box jumps",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5/3/1+",
            "rest": 180,
            "rir": "0",
            "amrap": true,
            "compound": true,
            "notes": "5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Back Squat (BBB)",
            "equipment": "barbell",
            "sets": 5,
            "reps": "10",
            "rest": 120,
            "rir": "2-3",
            "compound": true,
            "notes": "Boring But Big supplemental. 50-60% of training max. Focus on controlled reps, not grinding. Superset with abs if needed",
            "alternatives": [
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Hanging Leg Raise",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Core work. Control the movement, no swinging. Bend knees to regress",
            "alternatives": [
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              },
              {
                "name": "Weighted Plank",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Bench Press",
        "type": "upper",
        "focus": "Heavy bench press 5/3/1 + Boring But Big 5x10 bench volume & upper accessories",
        "warmup": "3 ramp-up sets of bench press (bar x10, 40% x5, 60% x3) + band pull-aparts",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5/3/1+",
            "rest": 180,
            "rir": "0",
            "amrap": true,
            "compound": true,
            "notes": "5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Flat Barbell Bench Press (BBB)",
            "equipment": "barbell",
            "sets": 5,
            "reps": "10",
            "rest": 120,
            "rir": "2-3",
            "compound": true,
            "notes": "Boring But Big supplemental. 50-60% of training max. Keep arch and leg drive, accumulate volume",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Dumbbell Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Upper back balance for pressing. Pull to hip, squeeze lat at top",
            "alternatives": [
              {
                "name": "Barbell Bent-over Row",
                "equipment": "barbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              },
              {
                "name": "Seated Cable Row",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Deadlift",
        "type": "lower",
        "focus": "Heavy deadlift 5/3/1 + Boring But Big 5x10 deadlift volume & accessories",
        "warmup": "3 ramp-up sets of deadlift (bar x5, 40% x5, 60% x3) then 1-2 broad jumps",
        "exercises": [
          {
            "name": "Conventional Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5/3/1+",
            "rest": 180,
            "rir": "0",
            "amrap": true,
            "compound": true,
            "notes": "5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP. Reset each rep",
            "alternatives": [
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Conventional Deadlift (BBB)",
            "equipment": "barbell",
            "sets": 5,
            "reps": "10",
            "rest": 120,
            "rir": "2-3",
            "compound": true,
            "notes": "Boring But Big supplemental. 50-60% of training max. Maintain form, reset between reps if needed. Can sub RDL if back fatigue is high",
            "alternatives": [
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Ab Wheel Rollout",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Core stability. From knees to start, progress to standing. Brace hard, slow eccentric",
            "alternatives": [
              {
                "name": "Hanging Leg Raise",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              },
              {
                "name": "Decline Sit-ups",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Overhead Press",
        "type": "upper",
        "focus": "Heavy OHP 5/3/1 + Boring But Big 5x10 press volume & upper accessories",
        "warmup": "3 ramp-up sets of OHP (bar x10, 40% x5, 60% x3) + shoulder dislocates",
        "exercises": [
          {
            "name": "Standing Barbell OHP",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5/3/1+",
            "rest": 180,
            "rir": "0",
            "amrap": true,
            "compound": true,
            "notes": "5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP. Strict press, no leg drive",
            "alternatives": [
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Seated Dumbbell OHP",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Standing Barbell OHP (BBB)",
            "equipment": "barbell",
            "sets": 5,
            "reps": "10",
            "rest": 120,
            "rir": "2-3",
            "compound": true,
            "notes": "Boring But Big supplemental. 50-60% of training max. Maintain strict form, brace core each rep",
            "alternatives": [
              {
                "name": "Seated Dumbbell OHP",
                "equipment": "dumbbell"
              },
              {
                "name": "Seated Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Lat Pulldown",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Back width. Full stretch at top, squeeze lats at bottom. Shoulder-width or wide grip",
            "alternatives": [
              {
                "name": "Pull-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  },
  {
    "programId": "alberto-nunez-ul",
    "name": "Alberto Nunez Upper/Lower",
    "author": "Alberto Nunez",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Alberto Nunez's low-volume Upper/Lower split from 3DMJ. Intentionally uses 2 working sets per exercise — maximum stimulus with minimum junk volume. Alternates arms/delts and torso upper days with hip-dominant and quad-dominant lower days.",
    "tags": [
      "hypertrophy",
      "bodybuilding",
      "upper/lower"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Upper A — Arms/Delts",
        "type": "upper",
        "focus": "Arms & delts dominant — overhead press, lateral raise, direct arm work",
        "warmup": "Band pull-aparts x15, light OHP ramp-up set x10",
        "exercises": [
          {
            "name": "DB Overhead Press",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Seated or standing. Full lockout, controlled descent to ear level",
            "alternatives": [
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Strict form, slight forward lean. No momentum",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 2,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Long head emphasis. Full stretch overhead, keep elbows forward",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Overhead Extension",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Rear Delt Row",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Wide elbow angle to target rear delts. Squeeze at top",
            "alternatives": [
              {
                "name": "Face Pull",
                "equipment": "cable"
              },
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Rear Delt Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Cable Curl",
            "equipment": "cable",
            "sets": 2,
            "reps": "10-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Constant tension through full ROM. Pin elbows to sides",
            "alternatives": [
              {
                "name": "EZ Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Preacher Curl",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Lower A",
        "type": "lower",
        "focus": "Hip-dominant — RDL & leg press with hamstring and calf isolation",
        "warmup": "Hip circles, leg swings, light RDL ramp-up set x8",
        "exercises": [
          {
            "name": "Glute Bridge",
            "equipment": "bodyweight",
            "sets": 1,
            "reps": "15",
            "rest": 30,
            "rir": "3-4",
            "notes": "Warmup activation — not a working set",
            "alternatives": [
              {
                "name": "Banded Glute Bridge",
                "equipment": "bodyweight"
              },
              {
                "name": "Clamshell",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 2,
            "reps": "6-10",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Hinge until deep hamstring stretch. Bar close to body",
            "alternatives": [
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Press (hip-dominant)",
            "equipment": "machine",
            "sets": 2,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Feet high & wide on platform for glute/hamstring bias",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Leg Curl",
            "equipment": "machine",
            "sets": 2,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Slow eccentric (3 sec), full ROM. Squeeze at peak contraction",
            "alternatives": [
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Soleus emphasis. Full stretch at bottom (2 sec), squeeze at top",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Upper B — Torso",
        "type": "upper",
        "focus": "Torso dominant — horizontal & incline press, lat-focused row, arm finishers",
        "warmup": "Band dislocates x10, light DB bench ramp-up set x10",
        "exercises": [
          {
            "name": "DB Bench Press",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "6-10",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Full stretch at bottom, drive through chest. Control the eccentric",
            "alternatives": [
              {
                "name": "Flat Barbell Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Bench Press",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Cable Row (lat-dominant)",
            "equipment": "cable",
            "sets": 2,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Wider grip, pull to lower chest. Focus on lat stretch and squeeze",
            "alternatives": [
              {
                "name": "Chest-Supported Row",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline DB Press",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "30-45 deg incline. Upper chest focus, full stretch at bottom",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Neutral-Grip Lat Pulldown",
            "equipment": "cable",
            "sets": 2,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Full stretch at top, drive elbows down. Lean back slightly",
            "alternatives": [
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Tricep Extension",
            "equipment": "cable",
            "sets": 2,
            "reps": "10-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rope or straight bar. Full lockout, controlled eccentric",
            "alternatives": [
              {
                "name": "Tricep Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "10-12",
            "rest": 60,
            "rir": "0-1",
            "notes": "Neutral grip, strict form. Builds brachialis & forearm thickness",
            "alternatives": [
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Rope Curl",
                "equipment": "cable"
              },
              {
                "name": "Reverse Curl",
                "equipment": "ez_bar"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Lower B",
        "type": "lower",
        "focus": "Quad & glute balanced — leg press, hip thrust, isolation finishers",
        "warmup": "Leg swings, bodyweight squats x10, light leg press ramp-up set x8",
        "exercises": [
          {
            "name": "Leg Press (quad-dominant)",
            "equipment": "machine",
            "sets": 2,
            "reps": "8-12",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Feet mid-low on platform for quad bias. Full ROM, do not cut depth",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Barbell Back Squat",
                "equipment": "barbell"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "BB Hip Thrust",
            "equipment": "barbell",
            "sets": 2,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Pad the bar. Drive through heels, squeeze glutes 2 sec at top",
            "alternatives": [
              {
                "name": "Machine Hip Thrust",
                "equipment": "machine"
              },
              {
                "name": "Cable Pull-Through",
                "equipment": "cable"
              },
              {
                "name": "Glute Bridge",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Quad isolation. Squeeze at top (1 sec hold), slow eccentric",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 2,
            "reps": "10-12",
            "rest": 90,
            "rir": "0-1",
            "notes": "Hamstring isolation. Slow eccentric (3 sec), full ROM",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Gastrocnemius emphasis. Full stretch at bottom, squeeze at top. Straight knees",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  },
  {
    "programId": "maps-anabolic",
    "name": "MAPS Anabolic (Phase II)",
    "author": "Mind Pump",
    "gender": "unisex",
    "difficulty": "beginner",
    "daysPerWeek": 2,
    "description": "Phase II of Mind Pump's MAPS Anabolic program. Dumbbell-based 2-day alternating full body split focused on hypertrophy with controlled tempo and progressive overload.",
    "tags": [
      "hypertrophy",
      "full body",
      "dumbbell"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Workout A",
        "type": "full",
        "focus": "Quad-dominant squat, horizontal press, back thickness, shoulders, and arms",
        "warmup": "5 min light cardio, then 1-2 warm-up sets of DB squat with light weight. Focus on slow, controlled tempo throughout",
        "exercises": [
          {
            "name": "DB Squat",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Hold dumbbells at sides or racked at shoulders. Full depth, control the eccentric",
            "alternatives": [
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Incline DB Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "30-45 deg incline. Stretch at bottom, squeeze at top",
            "alternatives": [
              {
                "name": "Flat DB Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "DB Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "One arm at a time on bench. Pull to hip, squeeze shoulder blade back",
            "alternatives": [
              {
                "name": "Chest-Supported DB Row",
                "equipment": "dumbbell"
              },
              {
                "name": "Barbell Bent-over Row",
                "equipment": "barbell"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing DB Shrug",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Shrug straight up, hold at top for 1 sec. No rolling",
            "alternatives": [
              {
                "name": "Barbell Shrug",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Shrug",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shrug",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "DB Rear Delt Fly",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Bent over or chest-supported. Lead with elbows, pinch shoulder blades",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Face Pulls",
                "equipment": "cable"
              },
              {
                "name": "Band Pull-Aparts",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "DB Lateral Raise",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Slight forward lean. Raise to shoulder height, control the negative",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Supinating Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Start neutral grip, supinate (rotate palm up) as you curl. Squeeze at top",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "EZ Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Weighted Dips",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Add weight via belt or DB between legs. Slight forward lean for chest bias",
            "alternatives": [
              {
                "name": "Close-Grip DB Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Tricep Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Machine Dips",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Full stretch at bottom, pause at top. Slow eccentric",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Calf Raise",
                "equipment": "dumbbell"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Hanging Leg Raise",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "8-20",
            "rest": 60,
            "rir": "1-2",
            "notes": "Dead hang, raise legs to parallel or higher. Avoid swinging",
            "alternatives": [
              {
                "name": "Captain Chair Leg Raise",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Raise",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Workout B",
        "type": "full",
        "focus": "Hip-dominant pull, horizontal press, vertical pull, shoulders, and arms",
        "warmup": "5 min light cardio, then 1-2 warm-up sets of DB sumo deadlift with light weight. Brace core, hinge at hips",
        "exercises": [
          {
            "name": "DB Sumo Deadlift",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "4-8",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Wide stance, toes out. Hold one heavy DB between legs. Drive through heels",
            "alternatives": [
              {
                "name": "Sumo Barbell Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB Romanian Deadlift",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Physio Ball Leg Curl",
            "equipment": "bodyweight",
            "sets": 1,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Hips up in bridge, curl ball toward glutes. Slow eccentric back out",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Slider Leg Curl",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "DB Shrug",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Elevate shoulders straight up, 1 sec hold at top. Heavy weight OK",
            "alternatives": [
              {
                "name": "Barbell Shrug",
                "equipment": "barbell"
              },
              {
                "name": "Trap Bar Shrug",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shrug",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Flat DB Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Retract scapulae, slight arch. Full stretch at bottom, press to lockout",
            "alternatives": [
              {
                "name": "Flat Barbell Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor DB Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "DB Pullover",
            "equipment": "dumbbell",
            "sets": 1,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Lie across bench, deep stretch overhead. Feel lats and chest expand",
            "alternatives": [
              {
                "name": "Cable Pullover",
                "equipment": "cable"
              },
              {
                "name": "Straight-Arm Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pullover",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Chin-Up",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "6-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Supinated (underhand) grip. Full dead hang at bottom, chin over bar at top",
            "alternatives": [
              {
                "name": "Lat Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Assisted Chin-Up",
                "equipment": "machine"
              },
              {
                "name": "Band-Assisted Chin-Up",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "DB Shoulder Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Seated or standing. Press overhead to lockout, lower to ear level",
            "alternatives": [
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Barbell OHP",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "DB Curl",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Standing, alternating or simultaneous. Full extension at bottom, squeeze at top",
            "alternatives": [
              {
                "name": "EZ Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Hammer Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Close-Grip Push-Up",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Hands narrow, elbows tucked. Add weight plate on back for progression",
            "alternatives": [
              {
                "name": "Diamond Push-Up",
                "equipment": "bodyweight"
              },
              {
                "name": "Tricep Pushdown",
                "equipment": "cable"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Full stretch at bottom, pause at top. Slow eccentric",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Calf Raise",
                "equipment": "dumbbell"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Decline Sit-Up",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "30-100",
            "rest": 60,
            "rir": "1-2",
            "notes": "Decline bench, feet hooked. High rep endurance work, controlled pace",
            "alternatives": [
              {
                "name": "Crunch",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              },
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      1,
      2,
      4,
      5,
      6
    ]
  },
  {
    "programId": "phat",
    "name": "PHAT",
    "author": "Layne Norton",
    "gender": "unisex",
    "difficulty": "advanced",
    "daysPerWeek": 5,
    "description": "Layne Norton's Power Hypertrophy Adaptive Training. Combines power days (heavy compound lifts) with hypertrophy days (volume work + speed sets). 5 days/week for advanced lifters.",
    "tags": [
      "powerbuilding",
      "hypertrophy",
      "strength",
      "advanced"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Power Upper",
        "type": "power_upper",
        "focus": "Heavy compound pressing & rowing for maximal upper-body strength",
        "warmup": "2-3 ramp-up sets of barbell row (bar x10, 50% x8, 75% x5) then 2-3 ramp-up sets of bench press",
        "exercises": [
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 3,
            "reps": "3-5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary power pull. Overhand grip, torso ~45 deg, pull to lower chest. Add 2.5kg when you hit 5 reps on all sets",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Seal Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Weighted Pull-ups",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "6-10",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Add weight via belt or DB between feet. Full dead hang to chin over bar. Width builder",
            "alternatives": [
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Rack Chins",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Supinated grip chin-up from rack pins. Squeeze lats hard at top. Great for back thickness",
            "alternatives": [
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Neutral-Grip Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Flat Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "3-5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Heavy DB press for power. Retract scapulae, drive through chest. Add weight when you hit 5 reps on all sets",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Weighted Dips",
            "equipment": "bodyweight",
            "sets": 2,
            "reps": "6-10",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Add weight via belt or DB between feet. Slight forward lean for chest emphasis. Full lockout",
            "alternatives": [
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "Machine Dip",
                "equipment": "machine"
              },
              {
                "name": "Decline Barbell Press",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Secondary press. Controlled eccentric, drive through delts. Full lockout overhead",
            "alternatives": [
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Barbell Curl",
            "equipment": "barbell",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Strict form, no swinging. Heavier than hypertrophy day curls. Full ROM",
            "alternatives": [
              {
                "name": "EZ-Bar Curl",
                "equipment": "ez_bar"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Skull Crushers",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Lower to forehead, extend fully. Keep elbows tucked. Go heavier than hypertrophy day",
            "alternatives": [
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Power Lower",
        "type": "power_lower",
        "focus": "Heavy squat & deadlift for maximal lower-body strength",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5) + leg swings & hip circles",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "3-5",
            "rest": 180,
            "rir": "1-2",
            "amrap": true,
            "compound": true,
            "notes": "Primary power lift. Low bar preferred. Brace hard, sit back. Add 2.5kg when you hit 5 reps on all sets",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Hack Squat",
            "equipment": "machine",
            "sets": 2,
            "reps": "6-10",
            "rest": 150,
            "rir": "1-2",
            "compound": true,
            "notes": "Secondary quad builder. Deep ROM, feet mid-platform. Complements squat pattern",
            "alternatives": [
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 2,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Quad isolation. Squeeze at top, controlled eccentric. Heavier than hypertrophy day",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Stiff-Leg Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "5-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Primary posterior chain lift. Slight knee bend, hinge deep. Feel hamstring stretch at bottom",
            "alternatives": [
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Conventional Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 2,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Hamstring isolation. Slow eccentric (3 sec), squeeze at top. Heavier than hypertrophy day",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Gastrocnemius emphasis. Full stretch at bottom, 2 sec pause at top. Go heavy",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 2,
            "reps": "6-10",
            "rest": 120,
            "rir": "1-2",
            "notes": "Soleus emphasis. Bent-knee position targets deeper calf muscle. Full ROM",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Hypertrophy Back & Shoulders",
        "type": "back",
        "focus": "Speed work + high-volume back & shoulder training for muscle growth",
        "warmup": "1-2 light sets of bent-over row + band pull-aparts + shoulder dislocates",
        "exercises": [
          {
            "name": "Barbell Bent-over Row (speed)",
            "equipment": "barbell",
            "sets": 6,
            "reps": "3",
            "rest": 90,
            "rir": "3-4",
            "compound": true,
            "notes": "Speed work — use 65-70% of power day weight. Explosive concentric, controlled eccentric. Focus on bar speed",
            "alternatives": [
              {
                "name": "Pendlay Row (speed)",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row (speed)",
                "equipment": "barbell"
              },
              {
                "name": "Seal Row (speed)",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Rack Chins",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Supinated grip. Squeeze lats at top, full stretch at bottom. Higher reps than power day",
            "alternatives": [
              {
                "name": "Chin-ups",
                "equipment": "bodyweight"
              },
              {
                "name": "Close-Grip Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Neutral-Grip Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "V-handle or wide grip. Pull to lower chest, retract scapulae. Full stretch forward",
            "alternatives": [
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Dumbbell Row",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "One arm at a time, knee on bench. Pull to hip, squeeze lat. Higher rep back finisher",
            "alternatives": [
              {
                "name": "Meadows Row",
                "equipment": "barbell"
              },
              {
                "name": "Cable Row (single arm)",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Close-Grip Pulldown",
            "equipment": "cable",
            "sets": 2,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "V-handle or neutral grip. Pump set for lats — constant tension, no momentum",
            "alternatives": [
              {
                "name": "Straight-Arm Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              },
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Lighter than power day. Control the eccentric, drive through delts. Full lockout",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Upright Row",
            "equipment": "barbell",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "1-2",
            "notes": "Wide grip to reduce impingement risk. Pull to mid-chest level, elbows lead. Traps & side delts",
            "alternatives": [
              {
                "name": "Cable Upright Row",
                "equipment": "cable"
              },
              {
                "name": "DB Upright Row",
                "equipment": "dumbbell"
              },
              {
                "name": "Face Pulls",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Light weight, strict form. Slight forward lean, lead with elbows. Pump out side delts",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Hypertrophy Lower",
        "type": "legs",
        "focus": "Speed squats + high-volume quad, hamstring & calf work for growth",
        "warmup": "5 min bike or light leg press x15 + bodyweight squats + leg swings",
        "exercises": [
          {
            "name": "Barbell Back Squat (speed)",
            "equipment": "barbell",
            "sets": 6,
            "reps": "3",
            "rest": 90,
            "rir": "3-4",
            "compound": true,
            "notes": "Speed work — use 65-70% of power day weight. Explosive out of the hole, controlled descent. Focus on bar speed",
            "alternatives": [
              {
                "name": "Front Squat (speed)",
                "equipment": "barbell"
              },
              {
                "name": "Safety Bar Squat (speed)",
                "equipment": "barbell"
              },
              {
                "name": "Box Squat (speed)",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Hack Squat",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Deep ROM, feet mid-platform. Primary hypertrophy quad builder after speed work",
            "alternatives": [
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "Higher rep quad volume. Mid foot placement, full depth. Focus on mind-muscle connection",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Extension",
            "equipment": "machine",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Quad isolation pump set. Squeeze at top for 1 sec, controlled eccentric. Blood flow finisher",
            "alternatives": [
              {
                "name": "Sissy Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Spanish Squat",
                "equipment": "bodyweight"
              },
              {
                "name": "Reverse Nordic",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 120,
            "rir": "1-2",
            "compound": true,
            "notes": "Hamstring & glute hypertrophy. Deep stretch at bottom, hinge at hips. Lighter than power day stiff-leg",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "DB RDL",
                "equipment": "dumbbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Lying Leg Curl",
            "equipment": "machine",
            "sets": 2,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Hamstring isolation. Slow eccentric (3 sec), squeeze at top. Higher reps than power day",
            "alternatives": [
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Seated Leg Curl",
            "equipment": "machine",
            "sets": 2,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Hamstring pump set. Constant tension, no swinging. Complement lying curl angle",
            "alternatives": [
              {
                "name": "Lying Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "Cable Leg Curl",
                "equipment": "cable"
              },
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Donkey Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Gastrocnemius focus at stretched position. Full stretch at bottom, pause at top",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Soleus pump set. Full ROM, 2 sec pause at stretch. High reps for time under tension",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "SAT",
        "name": "Hypertrophy Chest & Arms",
        "type": "chest",
        "focus": "Speed bench + high-volume chest, bicep & tricep work for upper-body growth",
        "warmup": "1-2 light sets of DB press + band pull-aparts + tricep pushdowns x15",
        "exercises": [
          {
            "name": "Flat Dumbbell Press (speed)",
            "equipment": "dumbbell",
            "sets": 6,
            "reps": "3",
            "rest": 90,
            "rir": "3-4",
            "compound": true,
            "notes": "Speed work — use 65-70% of power day DB equivalent. Explosive press, controlled eccentric. Focus on speed & power",
            "alternatives": [
              {
                "name": "Flat Barbell Bench (speed)",
                "equipment": "barbell"
              },
              {
                "name": "Machine Chest Press (speed)",
                "equipment": "machine"
              },
              {
                "name": "Floor Press (speed)",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Incline Dumbbell Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "notes": "30-45 deg incline. Upper chest emphasis. Control the eccentric, stretch at bottom",
            "alternatives": [
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Hammer Strength Chest Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "12-15",
            "rest": 90,
            "rir": "0-1",
            "notes": "Chest volume on machine for safety at higher reps. Full ROM, squeeze at lockout",
            "alternatives": [
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Smith Machine Bench",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Incline Cable Fly",
            "equipment": "cable",
            "sets": 2,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Upper chest isolation pump. Low-to-high angle, squeeze at peak. Constant cable tension",
            "alternatives": [
              {
                "name": "Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "DB Fly",
                "equipment": "dumbbell"
              },
              {
                "name": "Incline DB Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Preacher Curl",
            "equipment": "ez_bar",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Primary bicep builder. Full stretch at bottom, squeeze at top. No swinging possible — strict form",
            "alternatives": [
              {
                "name": "Machine Preacher Curl",
                "equipment": "machine"
              },
              {
                "name": "DB Preacher Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Preacher Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "DB Concentration Curl",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Seated, elbow on inner thigh. Peak contraction focus. Supinate fully at top",
            "alternatives": [
              {
                "name": "Incline Dumbbell Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Hammer Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Spider Curl",
            "equipment": "ez_bar",
            "sets": 2,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Chest on incline bench, arms hanging. Bicep pump finisher. Constant tension throughout ROM",
            "alternatives": [
              {
                "name": "Cable Curl (high rep)",
                "equipment": "cable"
              },
              {
                "name": "Machine Curl",
                "equipment": "machine"
              },
              {
                "name": "Bayesian Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Tricep Extension",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Overhead DB extension. Full stretch at bottom, squeeze at lockout. Long head emphasis",
            "alternatives": [
              {
                "name": "Overhead Cable Extension",
                "equipment": "cable"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Cable Pushdown",
            "equipment": "cable",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Rope or V-bar attachment. Spread at bottom for full contraction. Lateral head emphasis",
            "alternatives": [
              {
                "name": "Tricep Pushdown (V-bar)",
                "equipment": "cable"
              },
              {
                "name": "Machine Dip",
                "equipment": "machine"
              },
              {
                "name": "Diamond Push-ups",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Cable Kickbacks",
            "equipment": "cable",
            "sets": 2,
            "reps": "15-20",
            "rest": 60,
            "rir": "0-1",
            "notes": "Tricep pump finisher. One arm at a time, squeeze at lockout. Lateral head emphasis",
            "alternatives": [
              {
                "name": "DB Kickback",
                "equipment": "dumbbell"
              },
              {
                "name": "Overhead Cable Extension",
                "equipment": "cable"
              },
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      6
    ]
  },
  {
    "programId": "natural-hypertrophy-guts",
    "name": "Natural Hypertrophy GUTS",
    "author": "Natural Hypertrophy",
    "gender": "male",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "Superset-based 4-day upper/lower program from the GUTS methodology. Pairs heavy compound lifts with antagonist or unrelated movements for training density, time efficiency, and metabolic stress. Includes dedicated neck work.",
    "tags": [
      "hypertrophy",
      "strength",
      "supersets"
    ],
    "days": [
      {
        "day": "MON",
        "name": "Upper 1 — Push",
        "type": "upper",
        "focus": "Heavy pressing with superset pairings for efficiency and metabolic stress",
        "warmup": "Ramp-up sets of bench press (bar x10, 50% x6, 75% x3), band pull-aparts x15",
        "exercises": [
          {
            "name": "Barbell Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "3-5",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Heavy strength work. Full arch, retract scapulae, leg drive. No superset — full rest between sets",
            "alternatives": [
              {
                "name": "Incline Barbell Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "Floor Press",
                "equipment": "barbell"
              },
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Dumbbell Pullover",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "6-10",
            "rest": 60,
            "rir": "1-2",
            "superset": 3,
            "notes": "Deep stretch at the bottom, pull with lats and chest. SS with Cable Crunch",
            "alternatives": [
              {
                "name": "Cable Pullover",
                "equipment": "cable"
              },
              {
                "name": "Machine Pullover",
                "equipment": "machine"
              },
              {
                "name": "Straight-Arm Pulldown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Cable Crunch",
            "equipment": "cable",
            "sets": 3,
            "reps": "6-10",
            "rest": 90,
            "rir": "1-2",
            "superset": 2,
            "notes": "Curl ribcage toward pelvis, squeeze abs hard. SS with DB Pullover",
            "alternatives": [
              {
                "name": "Ab Wheel Rollout",
                "equipment": "bodyweight"
              },
              {
                "name": "Decline Crunch",
                "equipment": "bodyweight"
              },
              {
                "name": "Kneeling Cable Crunch",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Seated Dumbbell OHP",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "6-10",
            "rest": 60,
            "rir": "1-2",
            "compound": true,
            "superset": 5,
            "notes": "Full lockout overhead, controlled descent to ear level. SS with Chin-Up w/ Knee Raise",
            "alternatives": [
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              },
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Chin-Up w/ Knee Raise",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "6-10",
            "rest": 90,
            "rir": "1-2",
            "compound": true,
            "superset": 4,
            "notes": "Supinated grip chin-up, raise knees at the top for core activation. SS with Seated DB OHP",
            "alternatives": [
              {
                "name": "Lat Pulldown",
                "equipment": "cable"
              },
              {
                "name": "Assisted Chin-Up",
                "equipment": "machine"
              },
              {
                "name": "Neutral-Grip Pull-Up",
                "equipment": "bodyweight"
              }
            ]
          },
          {
            "name": "Close-Hand Push-Up",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "25",
            "rest": 30,
            "rir": "1-2",
            "superset": 7,
            "notes": "High-rep pump finisher. Hands close together, elbows tight. SS with Cable Overhead Tricep Extension",
            "alternatives": [
              {
                "name": "Diamond Push-Up",
                "equipment": "bodyweight"
              },
              {
                "name": "Bench Dips",
                "equipment": "bodyweight"
              },
              {
                "name": "Dip Machine",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Cable Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "1-2",
            "superset": 6,
            "notes": "Long head emphasis. Full stretch overhead, lock out at the bottom. SS with Close-Hand Push-Up",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "DB Overhead Extension",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Neck Extension",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "15",
            "rest": 60,
            "rir": "2-3",
            "notes": "Use a plate or neck harness. Slow controlled reps, no jerking. Builds posterior neck thickness",
            "alternatives": [
              {
                "name": "Neck Harness Extension",
                "equipment": "bodyweight"
              },
              {
                "name": "Band Neck Extension",
                "equipment": "bodyweight"
              },
              {
                "name": "4-Way Neck Machine",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "TUE",
        "name": "Lower 1",
        "type": "lower",
        "focus": "Squat-focused lower day with weighted chin-ups and superset pairings for density",
        "warmup": "Ramp-up sets of squat (bar x10, 50% x6, 75% x3), leg swing x10 each side",
        "exercises": [
          {
            "name": "Weighted Chin-Up",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "3-5",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Heavy strength work. Add weight via belt. Full dead hang, chin over bar. No superset — full rest",
            "alternatives": [
              {
                "name": "Weighted Pull-Up",
                "equipment": "bodyweight"
              },
              {
                "name": "Lat Pulldown (heavy)",
                "equipment": "cable"
              },
              {
                "name": "Assisted Chin-Up",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 3,
            "reps": "6-10",
            "rest": 60,
            "rir": "1-2",
            "compound": true,
            "superset": 3,
            "notes": "Full depth, brace core, controlled eccentric. SS with Upright Row",
            "alternatives": [
              {
                "name": "Front Squat",
                "equipment": "barbell"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Upright Row",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 90,
            "rir": "1-2",
            "superset": 2,
            "notes": "Wide grip to target side delts, pull to chest height. SS with BB Squat",
            "alternatives": [
              {
                "name": "Cable Upright Row",
                "equipment": "cable"
              },
              {
                "name": "DB Upright Row",
                "equipment": "dumbbell"
              },
              {
                "name": "DB Lateral Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "superset": 5,
            "notes": "Mid foot placement, full depth without butt wink. SS with Calf Raise",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "1-2",
            "superset": 4,
            "notes": "Full stretch at the bottom, 2s hold at top. SS with Leg Press",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Landmine Oblique Twist",
            "equipment": "barbell",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Rotate from the hips, arms extended. Controlled side to side — no momentum",
            "alternatives": [
              {
                "name": "Cable Woodchop",
                "equipment": "cable"
              },
              {
                "name": "Russian Twist",
                "equipment": "bodyweight"
              },
              {
                "name": "Pallof Press",
                "equipment": "cable"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Upper 2 — Pull",
        "type": "upper",
        "focus": "Row-focused pulling day with pressing accessories and superset pairings",
        "warmup": "Light lat pulldown x12, band pull-aparts x15, light DB lateral raise x12",
        "exercises": [
          {
            "name": "Kroc Row",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "6-10",
            "rest": 120,
            "rir": "0-1",
            "compound": true,
            "notes": "Heavy single-arm DB row with slight body English allowed. Grip hard, full stretch at bottom. No superset",
            "alternatives": [
              {
                "name": "Barbell Bent-over Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "JM Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "superset": 3,
            "notes": "Hybrid between close-grip bench and skull crusher. Lower to chin/neck area. SS with DB Lateral Raise",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "French Press",
                "equipment": "ez_bar"
              }
            ]
          },
          {
            "name": "Dumbbell Lateral Raise",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "12",
            "rest": 90,
            "rir": "0-1",
            "superset": 2,
            "notes": "Slight forward lean, lead with elbows, light and strict. SS with JM Press",
            "alternatives": [
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              },
              {
                "name": "DB Y-Raise",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Close-Grip Bench Press",
            "equipment": "barbell",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "compound": true,
            "superset": 5,
            "notes": "Shoulder-width grip, elbows tight. Tricep and inner chest builder. SS with Face Pull",
            "alternatives": [
              {
                "name": "Dip Machine",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Close-Grip Bench",
                "equipment": "smith"
              },
              {
                "name": "Rope Pushdown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Face Pull",
            "equipment": "cable",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "0-1",
            "superset": 4,
            "notes": "Pull rope to forehead, externally rotate at peak. Shoulder health staple. SS with Close-Grip Bench",
            "alternatives": [
              {
                "name": "Reverse Pec Deck",
                "equipment": "machine"
              },
              {
                "name": "Band Pull-Apart",
                "equipment": "bodyweight"
              },
              {
                "name": "DB Reverse Fly",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Neck Curl",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "15",
            "rest": 60,
            "rir": "2-3",
            "notes": "Lie face up on bench, curl plate on forehead. Slow controlled reps for anterior neck",
            "alternatives": [
              {
                "name": "Plate Neck Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Band Neck Flexion",
                "equipment": "bodyweight"
              },
              {
                "name": "4-Way Neck Machine",
                "equipment": "machine"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Lower 2",
        "type": "lower",
        "focus": "Deadlift-focused lower day with machine work and superset pairings for volume",
        "warmup": "Ramp-up sets of deadlift (bar x8, 50% x5, 75% x3), hip circles x10 each side",
        "exercises": [
          {
            "name": "Barbell Deadlift",
            "equipment": "barbell",
            "sets": 3,
            "reps": "3",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Heavy triples. Conventional or sumo — be consistent. Brace hard, hinge at hips. No superset — full rest",
            "alternatives": [
              {
                "name": "Trap Bar Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Sumo Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Rack Pull",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Smith Machine Squat",
            "equipment": "smith",
            "sets": 3,
            "reps": "8-12",
            "rest": 60,
            "rir": "1-2",
            "compound": true,
            "superset": 3,
            "notes": "Feet slightly forward for quad emphasis, full depth. SS with Preacher Curl",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Preacher Curl",
            "equipment": "ez_bar",
            "sets": 4,
            "reps": "6-12",
            "rest": 90,
            "rir": "1-2",
            "superset": 2,
            "notes": "Full stretch at the bottom, squeeze at the top. No momentum. SS with Smith Machine Squat",
            "alternatives": [
              {
                "name": "Machine Preacher Curl",
                "equipment": "machine"
              },
              {
                "name": "Spider Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Leg Curl",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-15",
            "rest": 60,
            "rir": "0-1",
            "superset": 5,
            "notes": "Slow 3s eccentric, full ROM. Curl toes toward shins for stronger contraction. SS with Calf Raise",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              },
              {
                "name": "DB Leg Curl",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "15",
            "rest": 90,
            "rir": "1-2",
            "superset": 4,
            "notes": "Full stretch at the bottom, 2s hold at top. SS with Leg Curl",
            "alternatives": [
              {
                "name": "Seated Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Hanging Leg Raise",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "rir": "1-2",
            "notes": "Control the swing, curl pelvis up at top. Slow eccentric for maximum lower ab activation",
            "alternatives": [
              {
                "name": "Captain Chair Leg Raise",
                "equipment": "machine"
              },
              {
                "name": "Lying Leg Raise",
                "equipment": "bodyweight"
              },
              {
                "name": "Cable Crunch",
                "equipment": "cable"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  },
  {
    "programId": "lyle-mcdonald-gbr",
    "name": "Lyle McDonald GBR",
    "author": "Lyle McDonald",
    "gender": "unisex",
    "difficulty": "intermediate",
    "daysPerWeek": 4,
    "description": "The \"gold standard\" Upper/Lower bulking routine. Simple, effective, and proven. Heavy compounds first, moderate accessories second, light isolation last.",
    "tags": [
      "hypertrophy",
      "bulking",
      "upper/lower"
    ],
    "days": [
      {
        "day": "TUE",
        "name": "Upper A",
        "type": "upper",
        "focus": "Heavy horizontal press & row + moderate accessories + light isolation",
        "warmup": "2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "GBR primary lift. Heavy 6-8 range — when you can get 4x8, add 2.5kg next session",
            "alternatives": [
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Machine Chest Press",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Bench Press",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Overhand grip, pull to lower chest. Match bench press progression",
            "alternatives": [
              {
                "name": "Pendlay Row",
                "equipment": "barbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              },
              {
                "name": "Chest-Supported Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Incline DB Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Moderate range. 30-45 deg incline, control the eccentric. Can substitute machine fly",
            "alternatives": [
              {
                "name": "Machine Fly",
                "equipment": "machine"
              },
              {
                "name": "Incline Machine Press",
                "equipment": "machine"
              },
              {
                "name": "Low-to-High Cable Fly",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Cable Row",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Pull to lower chest, retract scapulae. Can substitute lat pulldown",
            "alternatives": [
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Machine Row",
                "equipment": "machine"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Lateral Raises",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Side delt isolation. Light weight, strict form. Can substitute upright row",
            "alternatives": [
              {
                "name": "Cable Upright Row",
                "equipment": "cable"
              },
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Machine Lateral Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Tricep Pushdown",
            "equipment": "cable",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Light isolation. Rope or V-bar. Keep elbows pinned, squeeze at bottom",
            "alternatives": [
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Overhead Tricep Extension",
                "equipment": "cable"
              },
              {
                "name": "Tricep Kickback",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Barbell Curl",
            "equipment": "ez_bar",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Light isolation. Strict form, no swinging. EZ or straight bar",
            "alternatives": [
              {
                "name": "DB Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Preacher Curl",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "MON",
        "name": "Lower A",
        "type": "lower",
        "focus": "Heavy squat & SLDL + moderate quad/hamstring work + calves",
        "warmup": "2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)",
        "exercises": [
          {
            "name": "Barbell Back Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "GBR primary lift. Heavy 6-8 range — when you can get 4x8, add 2.5kg next session",
            "alternatives": [
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              },
              {
                "name": "Goblet Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Smith Machine Squat",
                "equipment": "smith"
              }
            ]
          },
          {
            "name": "Stiff-Leg Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Slight knee bend, hinge at hips. Deep hamstring stretch at bottom. Straight back throughout",
            "alternatives": [
              {
                "name": "Romanian Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB Stiff-Leg Deadlift",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Leg Press",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Moderate range. Mid-high foot placement for full ROM. Secondary quad volume",
            "alternatives": [
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Pendulum Squat",
                "equipment": "machine"
              },
              {
                "name": "Belt Squat",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Slow eccentric (3 sec). Secondary hamstring volume",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "6-8",
            "rest": 120,
            "rir": "1-2",
            "notes": "Heavy calf work. Full stretch at bottom, 2 sec pause at top. Gastrocnemius focus",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Moderate range. Soleus emphasis. Full ROM, pause at stretch",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      },
      {
        "day": "FRI",
        "name": "Upper B",
        "type": "upper",
        "focus": "Heavy press & row variation + moderate shoulders & back + light isolation",
        "warmup": "1-2 light sets of bench press variation + band pull-aparts x15",
        "exercises": [
          {
            "name": "Flat Barbell Bench Press",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Same as Upper A, or use a variation (close-grip, incline). Keep progression consistent",
            "alternatives": [
              {
                "name": "Close-Grip Bench Press",
                "equipment": "barbell"
              },
              {
                "name": "Incline Barbell Press",
                "equipment": "barbell"
              },
              {
                "name": "DB Bench Press",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Barbell Bent-over Row",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Same as Upper A, or use a variation (underhand, DB row). Match pressing volume",
            "alternatives": [
              {
                "name": "Underhand Barbell Row",
                "equipment": "barbell"
              },
              {
                "name": "DB Row",
                "equipment": "dumbbell"
              },
              {
                "name": "T-Bar Row",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Seated DB Overhead Press",
            "equipment": "dumbbell",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Moderate range. Controlled eccentric, drive through delts. Anterior & medial delt focus",
            "alternatives": [
              {
                "name": "Machine Shoulder Press",
                "equipment": "machine"
              },
              {
                "name": "Arnold Press",
                "equipment": "dumbbell"
              },
              {
                "name": "Standing Barbell OHP",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Chin-ups",
            "equipment": "bodyweight",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Underhand grip, full dead hang at bottom. Add weight when bodyweight is easy. Can substitute pulldowns",
            "alternatives": [
              {
                "name": "Lat Pulldown (close-grip)",
                "equipment": "cable"
              },
              {
                "name": "Lat Pulldown (wide)",
                "equipment": "cable"
              },
              {
                "name": "Machine Pulldown",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Cable Fly",
            "equipment": "cable",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Chest stretch focus. Can substitute lateral raises for more shoulder work",
            "alternatives": [
              {
                "name": "Lateral Raises",
                "equipment": "dumbbell"
              },
              {
                "name": "Cable Lateral Raise",
                "equipment": "cable"
              },
              {
                "name": "Pec Deck",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Overhead Tricep Extension",
            "equipment": "cable",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Light isolation. Long head emphasis. Full stretch overhead, squeeze at lockout",
            "alternatives": [
              {
                "name": "French Press",
                "equipment": "ez_bar"
              },
              {
                "name": "Skull Crushers",
                "equipment": "ez_bar"
              },
              {
                "name": "Tricep Pushdown",
                "equipment": "cable"
              }
            ]
          },
          {
            "name": "Hammer Curl",
            "equipment": "dumbbell",
            "sets": 2,
            "reps": "12-15",
            "rest": 60,
            "rir": "0-1",
            "notes": "Light isolation. Brachialis & forearm development. Strict form, no swinging",
            "alternatives": [
              {
                "name": "Rope Cable Curl",
                "equipment": "cable"
              },
              {
                "name": "Cross-Body Curl",
                "equipment": "dumbbell"
              },
              {
                "name": "Incline DB Curl",
                "equipment": "dumbbell"
              }
            ]
          }
        ]
      },
      {
        "day": "THU",
        "name": "Lower B",
        "type": "lower",
        "focus": "Heavy squat variation & RDL + moderate quad/hamstring work + calves",
        "warmup": "2-3 ramp-up sets of front squat or leg press (light x10, 60% x8, 80% x5)",
        "exercises": [
          {
            "name": "Front Squat",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "GBR primary lift. Quad-dominant squat variation. Can substitute leg press if mobility limited",
            "alternatives": [
              {
                "name": "Leg Press",
                "equipment": "machine"
              },
              {
                "name": "Hack Squat",
                "equipment": "machine"
              },
              {
                "name": "Safety Bar Squat",
                "equipment": "barbell"
              }
            ]
          },
          {
            "name": "Romanian Deadlift",
            "equipment": "barbell",
            "sets": 4,
            "reps": "6-8",
            "rest": 180,
            "rir": "1-2",
            "compound": true,
            "notes": "Slightly more knee bend than SLDL. Deep hamstring stretch, hip hinge. Pairs with front squat",
            "alternatives": [
              {
                "name": "Stiff-Leg Deadlift",
                "equipment": "barbell"
              },
              {
                "name": "Good Morning",
                "equipment": "barbell"
              },
              {
                "name": "DB Romanian Deadlift",
                "equipment": "dumbbell"
              }
            ]
          },
          {
            "name": "Hack Squat",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 120,
            "rir": "1-2",
            "notes": "Moderate range. Quad-focused, keep feet low on platform. Can substitute lunges",
            "alternatives": [
              {
                "name": "Walking Lunge",
                "equipment": "dumbbell"
              },
              {
                "name": "Bulgarian Split Squat",
                "equipment": "dumbbell"
              },
              {
                "name": "Leg Press",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Leg Curl (lying/seated)",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Slow eccentric (3 sec). Secondary hamstring volume",
            "alternatives": [
              {
                "name": "Nordic Curl",
                "equipment": "bodyweight"
              },
              {
                "name": "GHR",
                "equipment": "bodyweight"
              },
              {
                "name": "Seated Leg Curl",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Standing Calf Raise",
            "equipment": "machine",
            "sets": 4,
            "reps": "6-8",
            "rest": 120,
            "rir": "1-2",
            "notes": "Heavy calf work. Full stretch at bottom, 2 sec pause at top. Gastrocnemius focus",
            "alternatives": [
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              },
              {
                "name": "Donkey Calf Raise",
                "equipment": "machine"
              }
            ]
          },
          {
            "name": "Seated Calf Raise",
            "equipment": "machine",
            "sets": 3,
            "reps": "10-12",
            "rest": 90,
            "rir": "1-2",
            "notes": "Moderate range. Soleus emphasis. Full ROM, pause at stretch",
            "alternatives": [
              {
                "name": "Standing Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Leg Press Calf Raise",
                "equipment": "machine"
              },
              {
                "name": "Smith Machine Calf Raise",
                "equipment": "smith"
              }
            ]
          }
        ]
      }
    ],
    "defaultRestDays": [
      2,
      5,
      6
    ]
  }
] as const
