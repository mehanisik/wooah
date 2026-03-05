import type { Messages } from './en'

const pl: Messages = {
  // Common
  loading: 'Ładowanie...',
  noDataYet: 'Brak danych',

  // Header
  deload: 'DELOAD',
  streak: 'seria',
  prs: 'Rekordy',
  settingsAriaLabel: 'Ustawienia',
  ofN: '/{total}',

  // Nav
  navMon: 'P',
  navTue: 'W',
  navWed: 'Ś',
  navThu: 'C',
  navFri: 'P',
  navSat: 'S',
  navSun: 'NDZ',
  calSun: 'N',
  navInfo: 'INFO',
  navStats: 'STAT',
  navCal: 'KAL',
  navPics: 'FOT',

  // Greeting
  greetingLateNight: 'NOCNA SESJA',
  greetingMorning: 'DZIEŃ DOBRY',
  greetingAfternoon: 'DOBRE POPOŁUDNIE',
  greetingEvening: 'WIECZORNY TRENING',
  greetingRestDay:
    'Dzień odpoczynku. {completed}/{total} treningów w tym tygodniu.',
  greetingDone:
    'Dzisiejszy {name} ukończony. {completed}/{total} w tym tygodniu.',
  greetingToday: 'Dziś: {name} — {focus}',

  // Workout
  addExercise: 'DODAJ ĆWICZENIE',
  finishWorkout: 'ZAKOŃCZ TRENING',
  editProgram: 'Edytuj program',

  // Exercise Card
  setLabel: 'SERIA',
  kgLabel: 'KG',
  repsLabel: 'POW.',
  addSet: 'DODAJ SERIĘ',
  remove: 'USUŃ',
  supersetBadge: 'SS',
  supersetWith: 'z {name}',
  showExerciseDemo: 'Pokaż demo ćwiczenia',
  closeDemo: 'Zamknij demo',

  // Set Row
  kgPlaceholder: 'kg',
  repsPlaceholder: 'pow.',
  undoSet: 'Cofnij serię',
  completeSet: 'Ukończ serię',

  // Rest Timer
  go: 'START!',
  dismissTimer: 'Zamknij timer',

  // Celebration
  workoutDone: 'TRENING UKOŃCZONY',
  durationLabel: 'CZAS',
  setsLabel: 'SERIE',
  volumeLabel: 'OBJĘTOŚĆ',
  howWasIt: 'JAK BYŁO?',
  continueLabel: 'KONTYNUUJ',

  // Cardio
  absCardio: 'Brzuch / Kardio',

  // Session Strip
  energy: 'Energia',
  sleep: 'Sen',
  mood: 'Nastrój',
  sorenessLabel: 'Zakwasy',
  energyLow: 'Niska',
  energyNormal: 'Normalna',
  energyHigh: 'Wysoka',
  energyPeak: 'Szczytowa',
  sleepUnder5: '<5h',
  sleep56: '5-6h',
  sleep78: '7-8h',
  sleepOver8: '8+h',
  moodRough: 'Kiepski',
  moodMeh: 'Taki sobie',
  moodGood: 'Dobry',
  moodGreat: 'Świetny',
  sorenessVerySore: 'Bardzo bolą',
  sorenessModerate: 'Umiarkowane',
  sorenessMild: 'Lekkie',
  sorenessNone: 'Brak',

  // Exercise Notes
  addANote: 'Dodaj notatkę...',
  addNote: 'Dodaj notatkę',
  pinNote: 'Przypnij notatkę',

  // Plate Breakdown
  perSide: '/stronę',

  // Warmup
  warmupBased: 'Rozgrzewka (na podstawie {weight}kg)',
  warmupPlates: 'TALERZE',
  warmupPercent: '%',
  warmupBar: 'gryf',
  warmupBarLabel: 'Gryf',
  warmupRest: 'Odpoczynek 45s między seriami rozgrzewki',

  // 1RM
  est1rm: 'Szac. 1RM:',

  // Exercise Swap / Add
  searchExercises: 'Szukaj ćwiczeń...',
  noExercisesFound: 'Nie znaleziono ćwiczeń.',
  defaultLabel: 'domyślne',
  addExerciseTitle: 'Dodaj ćwiczenie',
  searchToAdd: 'Wyszukaj ćwiczenie do dodania',

  // Bodyweight
  bodyweight: 'MASA CIAŁA',

  // Stats - Journey
  journey: 'PODSUMOWANIE',
  sessionsLabel: 'TRENINGI',
  weekLabel: 'TYDZIEŃ',
  avgTime: 'ŚR. CZAS',
  sinceLabel: 'OD',

  // Stats - Volume
  weeklyVolume: 'OBJĘTOŚĆ TYGODNIOWA',
  push: 'Push',
  pull: 'Pull',
  legs: 'Legs',

  // Stats - Personal Records
  personalRecords: 'REKORDY OSOBISTE',

  // Stats - Frequency
  frequency: 'CZĘSTOTLIWOŚĆ',
  tot: 'SUM',

  // Stats - 1RM Compare
  compare1rm: 'PORÓWNANIE 1RM',
  exerciseA: 'Ćwiczenie A',
  exerciseB: 'Ćwiczenie B',

  // Stats - Progression
  progression: 'PROGRESJA',
  exercise: 'Ćwiczenie',

  // Stats - Muscle Volume
  muscleVolume: 'OBJĘTOŚĆ MIĘŚNI',
  under: 'Poniżej',
  optimal: 'Optymalnie',
  pushing: 'Intensywnie',
  over: 'Za dużo',

  // Calendar
  streakLabel: 'SERIA',
  best: 'NAJL.',
  total: 'łącznie',

  // Info Page
  progressiveOverload: 'PROGRESYWNE OBCIĄŻANIE',
  compoundLifts: 'Wielostawowe:',
  compoundLiftsDesc:
    'Jeśli osiągniesz górny zakres powtórzeń w serii AMRAP, dodaj 2,5kg w następnym treningu. Jeśli nie, utrzymaj ten sam ciężar.',
  accessoriesLabel: 'Izolowane:',
  accessoriesDesc:
    'Kiedy osiągniesz górny zakres powtórzeń we wszystkich seriach, zwiększ ciężar o najmniejszy możliwy przyrost.',
  deloadInfo: 'Deload:',
  deloadInfoDesc:
    'Co 4-5 tygodni zmniejsz objętość o 40-50% i intensywność o 10-15%. Skup się na technice i regeneracji.',
  restPeriods: 'PRZERWY MIĘDZY SERIAMI',
  exerciseTypeHeader: 'Typ ćwiczenia',
  restHeader: 'Przerwa',
  restHeavyCompound: 'Ciężkie wielostawowe',
  restHeavyCompoundTime: '2-3 min',
  restModerateCompound: 'Umiarkowane wielostawowe',
  restModerateCompoundTime: '90-120s',
  restAccessory: 'Izolowane / Dodatki',
  restAccessoryTime: '60-90s',
  restSupersetTransition: 'Superseria (przejście)',
  restSupersetTransitionTime: '~15s',
  restSupersetAfter: 'Superseria (po parze)',
  restSupersetAfterTime: '90s',
  recoveryNutrition: 'REGENERACJA I ODŻYWIANIE',
  infoSleep: 'Sen',
  infoSleepDesc: '7-9 godzin/noc',
  infoProtein: 'Białko',
  infoProteinDesc: '1,6-2,2g/kg/dzień',
  infoCalories: 'Kalorie',
  infoCaloriesDesc: 'Nadwyżka do wzrostu',
  infoHydration: 'Nawodnienie',
  infoHydrationDesc: '2-3L wody/dzień',
  terminology: 'TERMINOLOGIA',
  rirDef: 'Reps In Reserve — ile powtórzeń mógłbyś jeszcze zrobić przed awarią',
  amrapDef: 'As Many Reps As Possible — wykonaj ostatnią serię blisko awarii',
  supersetDef: 'Dwa ćwiczenia jedno po drugim z minimalną przerwą między nimi',
  deloadDef:
    'Zaplanowany tydzień regeneracyjny ze zmniejszoną objętością i intensywnością',
  oneRmDef:
    'One Rep Max — najcięższy ciężar, który mógłbyś podnieść na 1 powtórzenie',
  rpeDef: 'Rate of Perceived Exertion — jak ciężka była seria (skala 1-10)',

  // Rest Day
  restDay: 'DZIEŃ ODPOCZYNKU',
  sundayRecovery: 'Niedziela — Pełna regeneracja',
  thisWeek: '/ {total} w tym tygodniu',

  // Photos
  photos: 'ZDJĘCIA',
  newPhoto: 'NOWE ZDJĘCIE',
  uploading: 'PRZESYŁANIE...',
  noPhotosYet: 'Brak zdjęć postępów',
  trackVisualProgress: 'Rób zdjęcia, aby śledzić swoje postępy',
  closeFullscreen: 'Zamknij pełny ekran',
  confirmDeletePhoto: 'Usunąć to zdjęcie?',

  // Auth
  pplTracker: 'Push Pull Legs Tracker',
  emailPlaceholder: 'Adres e-mail',
  sendCode: 'WYŚLIJ KOD',
  sending: 'WYSYŁANIE...',
  waitSeconds: 'CZEKAJ {seconds}s',
  verify: 'ZWERYFIKUJ',
  verifying: 'WERYFIKACJA...',
  codeSentTo: 'Kod wysłany na {email}',
  enterCode: 'Wprowadź kod',
  useDifferentEmail: 'Użyj innego adresu e-mail',
  or: 'LUB',
  signInWithGoogle: 'ZALOGUJ SIĘ PRZEZ GOOGLE',
  failedSendCode: 'Nie udało się wysłać kodu',
  invalidCode: 'Nieprawidłowy kod',
  googleSignInFailed: 'Logowanie przez Google nie powiodło się',

  // Install
  installApp: 'ZAINSTALUJ APLIKACJĘ',
  addToHomeScreen: 'DODAJ DO EKRANU GŁÓWNEGO',
  iosInstallTap: 'Dotknij',
  iosInstallThen: 'a następnie „Dodaj do ekranu głównego", aby zainstalować.',
  browserInstallHint:
    'Otwórz menu przeglądarki i wybierz „Zainstaluj aplikację" lub „Dodaj do ekranu głównego".',

  // Update
  newVersionAvailable: 'Dostępna jest nowa wersja',
  update: 'AKTUALIZUJ',

  // Error Pages
  somethingWentWrong: 'COŚ POSZŁO NIE TAK',
  unexpectedError: 'Wystąpił nieoczekiwany błąd.',
  tryAgain: 'Spróbuj ponownie',
  pageNotFound: 'NIE ZNALEZIONO STRONY',
  pageDoesntExist: 'Ta strona nie istnieje.',
  backToWorkout: 'Powrót do treningu',

  // Program Editor
  editDayTitle: 'EDYTUJ {day} — {name}',
  save: 'ZAPISZ',
  resetLabel: 'RESETUJ',

  // Program Picker / Browser
  programLabel: 'PROGRAM',
  programs: 'PROGRAMY',
  changeProgram: 'ZMIEŃ PROGRAM',
  selectProgram: 'WYBIERZ PROGRAM',
  currentProgram: 'Aktualny: {name}',
  browseProgramsAriaLabel: 'Przeglądaj programy',
  nExercises: '{count} ćwiczeń',
  daysPerWeek: '{count} dni/tydzień',
  programSwitchWarning: 'Zmiana programu zresetuje twoje dostosowania ćwiczeń.',
  confirmSwitch: 'POTWIERDŹ',
  cancel: 'ANULUJ',
  allFilter: 'Wszystkie',
  beginnerFilter: 'Początkujący',
  intermediateFilter: 'Średniozaaw.',
  advancedFilter: 'Zaawansowany',
  womensFilter: 'Damskie',
  selectTrainingDays: 'WYBIERZ DNI TRENINGOWE',
  trainingDaysHelper: 'Wybierz {count} dni, w których chcesz trenować',
  trainingDays: 'Dni treningowe',
  daysSelected: '{selected}/{required} wybranych',
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
  dayPreview: 'Dzień {n}: {name}',
  myPrograms: 'MOJE PROGRAMY',
  templates: 'SZABLONY',
  forkProgram: 'KOPIUJ',
  deleteProgram: 'USUŃ',
  confirmDeleteProgram: 'Na pewno? Tej operacji nie można cofnąć.',
  forkNamePlaceholder: 'Nazwij swoją kopię...',

  // Settings
  settings: 'USTAWIENIA',
  theme: 'MOTYW',
  light: 'Jasny',
  dark: 'Ciemny',
  system: 'Systemowy',
  plateCalculator: 'KALKULATOR TALERZY',
  barWeight: 'Waga gryfu',
  unitLabel: 'Jednostka',
  data: 'DANE',
  exportData: 'EKSPORT',
  importData: 'IMPORT',
  account: 'KONTO',
  signOut: 'WYLOGUJ SIĘ',
  language: 'JĘZYK',

  // Mesocycle
  deloadWeek: 'TYDZIEŃ DELOAD',
  deloadReduce: 'Zmniejsz objętość do 60%, skup się na regeneracji. RIR {rir}',
  mesoWeek: 'MEZO TYDZIEŃ {week}/{total}',
  mesoTargetRir: 'Docelowy RIR: {rir} · Rampa +{rate} serii/mięsień',
  mesocycle: 'MESOCYKL',
  mesoStartDesc:
    'Rozpocznij {length}+{deload} mesocykl progresywnego przeciążania',
  startMesocycle: 'ROZPOCZNIJ MESOCYKL',
  dismiss: 'ODRZUĆ',

  // Readiness
  readinessRest: 'Odpoczynek',
  readinessLight: 'Lekki dzień',
  readinessNormal: 'Trenuj normalnie',
  readinessPush: 'Daj z siebie więcej',

  // Circuit
  circuitGetReady: 'PRZYGOTUJ SIĘ',
  circuitWork: 'PRACA',
  circuitRest: 'ODPOCZYNEK',
  circuitComplete: 'OBWÓD UKOŃCZONY',
  circuitUpNext: 'Następnie',
  circuitNext: 'Dalej',
  circuitLast: 'Ostatnie ćwiczenie!',

  // Dashboard Nav
  navToday: 'DZIŚ',
  navProgress: 'POSTĘPY',
  navMe: 'JA',

  // Dashboard
  startWorkout: 'ROZPOCZNIJ TRENING',
  todayWorkout: 'DZISIEJSZY TRENING',
  workoutCompleted: 'UKOŃCZONY',
  exercisesCount: '{count} ćwiczeń',
  estDuration: '~{minutes} min',
  thisWeekProgress: 'TEN TYDZIEŃ',
  recentPRs: 'OSTATNIE REKORDY',
  noWorkoutToday: 'Brak treningu na dziś',
  profile: 'PROFIL',
  trainingInfo: 'INFORMACJE O TRENINGU',

  // Day Picker / Switch
  chooseWorkout: 'WYBIERZ TRENING',
  scheduledToday: 'Zaplanowany na dziś',
  switchDay: 'ZMIEŃ DZIEŃ',
  trainAnyway: 'TRENUJ MIMO WSZYSTKO',

  // Freestyle
  startFreestyle: 'DOWOLNY',
  freestyleDesc: 'Zbuduj własny trening na bieżąco',
  freestyleTitle: 'TRENING DOWOLNY',
  addFirstExercise: 'DODAJ PIERWSZE ĆWICZENIE',
  noExercisesYet: 'Brak ćwiczeń. Dotknij aby dodać!',
  removeExercise: 'USUŃ ĆWICZENIE',
  freestyleComplete: 'Trening dowolny',

  // Misc
  redirecting: 'Przekierowywanie…',
  invalidDay: 'Nieprawidłowy dzień',
}

export default pl

export const MOTIVATIONAL_PL = [
  'Żelazo nigdy nie kłamie. Albo je podnosisz, albo nie.',
  'Dyscyplina to wybór między tym, czego chcesz teraz, a tym, czego chcesz najbardziej.',
  'Jedyny zły trening to ten, który się nie odbył.',
  'Twoje ciało zniesie prawie wszystko. To umysł musisz przekonać.',
  'Znoś ból dyscypliny albo znoś ból żalu.',
  'Nie musisz być ekstremalny, wystarczy konsekwencja.',
  'Trudne dni czynią cię silniejszym.',
  'Sukces to nie zawsze wielkość. To konsekwencja.',
  'Zakochaj się w procesie, a wyniki przyjdą same.',
  'Opór, z którym walczysz na siłowni, wzmacnia cię wszędzie indziej.',
  'Dzisiejszy ból to jutrzejsza siła.',
  'Różnica między próbą a triumfem to odrobina więcej wysiłku.',
  'Motywuj się, bo nikt inny tego za ciebie nie zrobi.',
  'Siła nie pochodzi ze zwycięstw. Pochodzi ze zmagań.',
  'Ciało osiąga to, w co umysł wierzy.',
]

export const REST_QUOTES_PL = [
  'Mięśnie rosną podczas odpoczynku, nie treningu. Zasłużyłeś na to.',
  'Regeneracja to nie lenistwo. To tam zachodzi adaptacja.',
  'Najsilniejsi sportowcy wiedzą, kiedy się wysilić, a kiedy odpocząć.',
  'Sen to najbardziej anaboliczna rzecz, jaką możesz dziś zrobić.',
  'Zaufaj procesowi. Twoje mięśnie odbudowują się właśnie teraz.',
]
