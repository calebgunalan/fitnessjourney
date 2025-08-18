export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  category: "Strength" | "Cardio" | "Flexibility";
  description: string;
  targetMuscles: string[];
}

export interface Workout {
  id: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  calories: number;
  category: "Strength" | "Cardio" | "Flexibility";
  description: string;
  exercises: Exercise[];
  restBetweenSets: number; // seconds
  restBetweenExercises: number; // seconds
}

export const workoutData: Workout[] = [
  {
    id: "upper-body-strength",
    title: "Upper Body Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    calories: 320,
    category: "Strength",
    description: "Build upper body strength with compound movements and isolation exercises targeting chest, back, shoulders, and arms.",
    restBetweenSets: 90,
    restBetweenExercises: 120,
    exercises: [
      {
        id: "bench-press",
        name: "Bench Press",
        sets: 4,
        reps: "8-10",
        category: "Strength",
        description: "Lie on bench, lower bar to chest, press up explosively",
        targetMuscles: ["Chest", "Triceps", "Shoulders"]
      },
      {
        id: "bent-over-rows",
        name: "Bent-Over Rows",
        sets: 4,
        reps: "8-10",
        category: "Strength",
        description: "Hinge at hips, pull bar to lower chest, squeeze shoulder blades",
        targetMuscles: ["Back", "Biceps", "Rear Delts"]
      },
      {
        id: "overhead-press",
        name: "Overhead Press",
        sets: 3,
        reps: "10-12",
        category: "Strength",
        description: "Press bar overhead from shoulder level, keep core tight",
        targetMuscles: ["Shoulders", "Triceps", "Core"]
      },
      {
        id: "pull-ups",
        name: "Pull-ups",
        sets: 3,
        reps: "6-12",
        category: "Strength",
        description: "Hang from bar, pull body up until chin clears bar",
        targetMuscles: ["Back", "Biceps", "Forearms"]
      },
      {
        id: "dips",
        name: "Dips",
        sets: 3,
        reps: "8-15",
        category: "Strength",
        description: "Lower body between parallel bars, push back up",
        targetMuscles: ["Triceps", "Chest", "Shoulders"]
      },
      {
        id: "bicep-curls",
        name: "Bicep Curls",
        sets: 3,
        reps: "12-15",
        category: "Strength",
        description: "Curl dumbbells to shoulders, control the negative",
        targetMuscles: ["Biceps", "Forearms"]
      }
    ]
  },
  {
    id: "hiit-cardio-blast",
    title: "HIIT Cardio Blast",
    duration: "30 min",
    difficulty: "Advanced",
    calories: 280,
    category: "Cardio",
    description: "High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.",
    restBetweenSets: 30,
    restBetweenExercises: 60,
    exercises: [
      {
        id: "burpees",
        name: "Burpees",
        sets: 4,
        reps: "30 sec",
        category: "Cardio",
        description: "Drop to push-up, jump back up, jump overhead",
        targetMuscles: ["Full Body", "Core", "Cardio"]
      },
      {
        id: "mountain-climbers",
        name: "Mountain Climbers",
        sets: 4,
        reps: "45 sec",
        category: "Cardio",
        description: "Plank position, alternate bringing knees to chest rapidly",
        targetMuscles: ["Core", "Cardio", "Shoulders"]
      },
      {
        id: "jump-squats",
        name: "Jump Squats",
        sets: 4,
        reps: "20",
        category: "Cardio",
        description: "Squat down, explode up into jump, land softly",
        targetMuscles: ["Legs", "Glutes", "Cardio"]
      },
      {
        id: "high-knees",
        name: "High Knees",
        sets: 4,
        reps: "30 sec",
        category: "Cardio",
        description: "Run in place bringing knees to waist level",
        targetMuscles: ["Legs", "Core", "Cardio"]
      },
      {
        id: "plank-jacks",
        name: "Plank Jacks",
        sets: 3,
        reps: "20",
        category: "Cardio",
        description: "Plank position, jump feet apart and together",
        targetMuscles: ["Core", "Shoulders", "Cardio"]
      }
    ]
  },
  {
    id: "full-body-beginner",
    title: "Full Body Beginner",
    duration: "35 min",
    difficulty: "Beginner",
    calories: 250,
    category: "Strength",
    description: "Perfect introduction to strength training with bodyweight and basic equipment exercises.",
    restBetweenSets: 60,
    restBetweenExercises: 90,
    exercises: [
      {
        id: "bodyweight-squats",
        name: "Bodyweight Squats",
        sets: 3,
        reps: "12-15",
        category: "Strength",
        description: "Feet shoulder-width apart, squat down, drive through heels",
        targetMuscles: ["Legs", "Glutes", "Core"]
      },
      {
        id: "push-ups",
        name: "Push-ups",
        sets: 3,
        reps: "8-12",
        category: "Strength",
        description: "Plank position, lower chest to ground, push back up",
        targetMuscles: ["Chest", "Triceps", "Shoulders"]
      },
      {
        id: "walking-lunges",
        name: "Walking Lunges",
        sets: 3,
        reps: "10 each leg",
        category: "Strength",
        description: "Step forward into lunge, alternate legs",
        targetMuscles: ["Legs", "Glutes", "Core"]
      },
      {
        id: "plank",
        name: "Plank",
        sets: 3,
        reps: "30-60 sec",
        category: "Strength",
        description: "Hold straight line from head to heels",
        targetMuscles: ["Core", "Shoulders", "Back"]
      },
      {
        id: "glute-bridges",
        name: "Glute Bridges",
        sets: 3,
        reps: "15-20",
        category: "Strength",
        description: "Lie on back, lift hips up, squeeze glutes",
        targetMuscles: ["Glutes", "Hamstrings", "Core"]
      },
      {
        id: "wall-sit",
        name: "Wall Sit",
        sets: 3,
        reps: "30-45 sec",
        category: "Strength",
        description: "Back against wall, slide down to 90 degrees",
        targetMuscles: ["Legs", "Glutes", "Core"]
      }
    ]
  },
  {
    id: "lower-body-power",
    title: "Lower Body Power",
    duration: "40 min",
    difficulty: "Advanced",
    calories: 300,
    category: "Strength",
    description: "Explosive lower body movements to build strength and power in legs and glutes.",
    restBetweenSets: 120,
    restBetweenExercises: 150,
    exercises: [
      {
        id: "squats",
        name: "Barbell Squats",
        sets: 4,
        reps: "6-8",
        category: "Strength",
        description: "Bar on upper traps, squat to parallel, drive up explosively",
        targetMuscles: ["Legs", "Glutes", "Core"]
      },
      {
        id: "deadlifts",
        name: "Romanian Deadlifts",
        sets: 4,
        reps: "8-10",
        category: "Strength",
        description: "Hinge at hips, lower bar along legs, drive hips forward",
        targetMuscles: ["Hamstrings", "Glutes", "Back"]
      },
      {
        id: "bulgarian-split-squats",
        name: "Bulgarian Split Squats",
        sets: 3,
        reps: "10 each leg",
        category: "Strength",
        description: "Rear foot elevated, lunge down on front leg",
        targetMuscles: ["Legs", "Glutes", "Core"]
      },
      {
        id: "box-jumps",
        name: "Box Jumps",
        sets: 4,
        reps: "8-10",
        category: "Cardio",
        description: "Jump onto box, land softly, step down",
        targetMuscles: ["Legs", "Glutes", "Power"]
      }
    ]
  }
];

export const exerciseLibrary: Exercise[] = [
  ...workoutData.flatMap(workout => workout.exercises),
  // Additional standalone exercises
  {
    id: "tricep-extensions",
    name: "Tricep Extensions",
    sets: 3,
    reps: "12-15",
    category: "Strength",
    description: "Overhead dumbbell extension, lower behind head",
    targetMuscles: ["Triceps"]
  },
  {
    id: "lateral-raises",
    name: "Lateral Raises",
    sets: 3,
    reps: "12-15",
    category: "Strength",
    description: "Raise dumbbells to shoulder height, control descent",
    targetMuscles: ["Shoulders"]
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    sets: 4,
    reps: "15-20",
    category: "Strength",
    description: "Rise up on toes, squeeze calves at top",
    targetMuscles: ["Calves"]
  }
];