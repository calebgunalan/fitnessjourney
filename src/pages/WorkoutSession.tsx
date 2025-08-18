import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { ExerciseTracker } from "@/components/ExerciseTracker";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { workoutData } from "@/data/workouts";
import { 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowLeft,
  Trophy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WorkoutSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const workout = workoutData.find(w => w.id === id);
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!workout) {
      navigate("/workouts");
      return;
    }
  }, [workout, navigate]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = (currentExerciseIndex / workout.exercises.length) * 100;
  const isWorkoutComplete = completedExercises.length === workout.exercises.length;

  const startWorkout = () => {
    setIsWorkoutStarted(true);
    setWorkoutStartTime(new Date());
    toast({
      title: "Workout Started!",
      description: `Let's crush this ${workout.title} session!`,
    });
  };

  const completeCurrentExercise = () => {
    const exerciseId = currentExercise.id;
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
      
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setIsResting(true);
        toast({
          title: "Exercise Complete!",
          description: `Great job on ${currentExercise.name}. Time to rest!`,
        });
      } else {
        // Workout complete
        toast({
          title: "Workout Complete!",
          description: `Amazing work! You've completed ${workout.title}!`,
        });
      }
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsResting(false);
    }
  };

  const finishWorkout = () => {
    const endTime = new Date();
    const duration = workoutStartTime ? 
      Math.round((endTime.getTime() - workoutStartTime.getTime()) / 1000 / 60) : 0;
    
    toast({
      title: "Fantastic Work!",
      description: `You completed ${workout.title} in ${duration} minutes!`,
    });
    
    navigate("/progress");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/workouts")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workouts
          </Button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{workout.title}</h1>
            <p className="text-muted-foreground">{workout.description}</p>
          </div>
          
          <Badge className="bg-gradient-to-r from-energy to-accent text-white">
            {workout.difficulty}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Workout Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedExercises.length}/{workout.exercises.length} exercises
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {!isWorkoutStarted ? (
          /* Pre-workout Overview */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Workout Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-energy">{workout.exercises.length}</div>
                    <div className="text-sm text-muted-foreground">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cardio">{workout.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{workout.calories}</div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-strength">{workout.restBetweenExercises}s</div>
                    <div className="text-sm text-muted-foreground">Rest Time</div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-energy to-accent"
                  onClick={startWorkout}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Workout
                </Button>
              </CardContent>
            </Card>

            {/* Exercise List Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Exercise List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workout.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} sets × {exercise.reps} reps
                        </p>
                      </div>
                      <Badge variant="outline">{exercise.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : isWorkoutComplete ? (
          /* Workout Complete */
          <Card className="text-center">
            <CardContent className="p-8">
              <Trophy className="w-16 h-16 text-energy mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-2">Workout Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Amazing work! You've successfully completed {workout.title}.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-success">{completedExercises.length}</div>
                  <div className="text-sm text-muted-foreground">Exercises</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-energy">{workout.calories}</div>
                  <div className="text-sm text-muted-foreground">Calories Burned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cardio">
                    {workoutStartTime ? Math.round((new Date().getTime() - workoutStartTime.getTime()) / 1000 / 60) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-success to-energy"
                onClick={finishWorkout}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Active Workout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExerciseTracker
                name={currentExercise.name}
                targetSets={currentExercise.sets}
                targetReps={currentExercise.reps}
                category={currentExercise.category}
                onComplete={completeCurrentExercise}
              />
            </div>
            
            <div className="space-y-4">
              {isResting ? (
                <WorkoutTimer
                  initialTime={workout.restBetweenExercises}
                  isRest={true}
                  onComplete={() => setIsResting(false)}
                />
              ) : (
                <WorkoutTimer
                  initialTime={workout.restBetweenSets}
                  isRest={false}
                />
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{currentExercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentExercise.description}
                    </p>
                    <div className="flex gap-2">
                      {currentExercise.targetMuscles.map((muscle) => (
                        <Badge key={muscle} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex gap-2">
                {completedExercises.includes(currentExercise.id) && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={nextExercise}
                    disabled={currentExerciseIndex >= workout.exercises.length - 1}
                  >
                    <SkipForward className="w-4 h-4 mr-2" />
                    Next Exercise
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutSession;