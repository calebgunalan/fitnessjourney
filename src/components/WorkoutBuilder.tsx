import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exerciseLibrary } from "@/data/workouts";
import { 
  Plus, 
  Trash2, 
  Save, 
  Search,
  GripVertical,
  Timer,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkoutExercise {
  id: string;
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  restTime: number;
  notes?: string;
}

interface CustomWorkout {
  id: string;
  title: string;
  description: string;
  category: "Strength" | "Cardio" | "Flexibility";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: number;
  exercises: WorkoutExercise[];
}

export function WorkoutBuilder() {
  const { toast } = useToast();
  const [workout, setWorkout] = useState<CustomWorkout>({
    id: '',
    title: '',
    description: '',
    category: 'Strength',
    difficulty: 'Beginner',
    estimatedDuration: 30,
    exercises: []
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const filteredExercises = exerciseLibrary.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addExercise = (exercise: typeof exerciseLibrary[0]) => {
    const newExercise: WorkoutExercise = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      restTime: 60,
      notes: ''
    };

    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));

    setShowExerciseLibrary(false);
    setSearchTerm("");
  };

  const removeExercise = (exerciseId: string) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    }));
  };

  const updateExercise = (exerciseId: string, field: keyof WorkoutExercise, value: any) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const saveWorkout = () => {
    if (!workout.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please add a title for your workout",
        variant: "destructive"
      });
      return;
    }

    if (workout.exercises.length === 0) {
      toast({
        title: "No Exercises",
        description: "Please add at least one exercise to your workout",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database
    toast({
      title: "Workout Saved!",
      description: `"${workout.title}" has been saved to your custom workouts.`,
    });
  };

  const calculateDuration = () => {
    const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const totalRestTime = workout.exercises.reduce((sum, ex) => sum + (ex.restTime * ex.sets), 0);
    const estimatedExerciseTime = workout.exercises.length * 120; // 2 minutes per exercise
    return Math.round((totalRestTime + estimatedExerciseTime) / 60);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-energy" />
            Workout Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Workout Title</Label>
              <Input
                id="title"
                value={workout.title}
                onChange={(e) => setWorkout(prev => ({ ...prev, title: e.target.value }))}
                placeholder="My Custom Workout"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={workout.category} onValueChange={(value: any) => setWorkout(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Strength">Strength</SelectItem>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={workout.description}
              onChange={(e) => setWorkout(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your workout goals and focus areas..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={workout.difficulty} onValueChange={(value: any) => setWorkout(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Estimated Duration</Label>
              <div className="flex items-center gap-2 mt-2">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{calculateDuration()} minutes</span>
                <span className="text-sm text-muted-foreground">({workout.exercises.length} exercises)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Exercises ({workout.exercises.length})</CardTitle>
            <Button onClick={() => setShowExerciseLibrary(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {workout.exercises.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No exercises added yet. Click "Add Exercise" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <Card key={exercise.id} className="border-l-4 border-l-accent">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeExercise(exercise.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs">Sets</Label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, 'sets', Number(e.target.value))}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Reps</Label>
                        <Input
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                          className="h-8"
                          placeholder="8-12"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Rest (seconds)</Label>
                        <Input
                          type="number"
                          value={exercise.restTime}
                          onChange={(e) => updateExercise(exercise.id, 'restTime', Number(e.target.value))}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Notes</Label>
                        <Input
                          value={exercise.notes || ''}
                          onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                          className="h-8"
                          placeholder="Optional notes"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exercise Library Modal */}
      {showExerciseLibrary && (
        <Card className="fixed inset-4 z-50 bg-background shadow-lg animate-scale-in">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Add Exercise</CardTitle>
              <Button variant="ghost" onClick={() => setShowExerciseLibrary(false)}>
                ✕
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="grid gap-3">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary cursor-pointer"
                  onClick={() => addExercise(exercise)}
                >
                  <div>
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps} | {exercise.category}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-accent" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex gap-4">
        <Button onClick={saveWorkout} className="bg-gradient-to-r from-success to-energy">
          <Save className="w-4 h-4 mr-2" />
          Save Workout
        </Button>
        <Button variant="outline">
          Save as Template
        </Button>
      </div>
    </div>
  );
}