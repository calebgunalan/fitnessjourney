import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Clock, 
  Target, 
  Zap,
  RefreshCw,
  Save,
  Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIWorkoutParams {
  goal: string;
  timeAvailable: number;
  fitnessLevel: string;
  equipment: string[];
  targetMuscles: string[];
  workoutType: string;
  intensity: string;
  previousInjuries: string;
}

interface GeneratedWorkout {
  title: string;
  description: string;
  estimatedDuration: number;
  difficulty: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    rest: number;
    instructions: string;
    targetMuscles: string[];
  }>;
  warmup: string[];
  cooldown: string[];
  tips: string[];
}

const mockGeneratedWorkout: GeneratedWorkout = {
  title: "AI-Generated Upper Body Power",
  description: "A personalized upper body workout designed specifically for your goals and available equipment.",
  estimatedDuration: 45,
  difficulty: "Intermediate",
  exercises: [
    {
      name: "Push-ups (Diamond Variation)",
      sets: 3,
      reps: "8-12",
      rest: 60,
      instructions: "Form diamond shape with hands, focus on triceps engagement",
      targetMuscles: ["Chest", "Triceps", "Core"]
    },
    {
      name: "Pike Push-ups",
      sets: 3,
      reps: "6-10",
      rest: 90,
      instructions: "Create inverted V shape, target shoulders",
      targetMuscles: ["Shoulders", "Triceps"]
    },
    {
      name: "Bodyweight Rows",
      sets: 4,
      reps: "10-15",
      rest: 75,
      instructions: "Use resistance band or table edge, pull chest to bar",
      targetMuscles: ["Back", "Biceps"]
    }
  ],
  warmup: [
    "Arm circles - 30 seconds each direction",
    "Shoulder rolls - 10 forward, 10 backward",
    "Light push-ups - 5-8 reps"
  ],
  cooldown: [
    "Chest doorway stretch - 30 seconds",
    "Overhead tricep stretch - 30 seconds each arm",
    "Cross-body shoulder stretch - 30 seconds each arm"
  ],
  tips: [
    "Focus on controlled movements rather than speed",
    "Maintain proper form throughout all exercises",
    "Increase difficulty by slowing down the negative phase"
  ]
};

export function AIWorkoutGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<GeneratedWorkout | null>(null);
  const [params, setParams] = useState<AIWorkoutParams>({
    goal: "",
    timeAvailable: 30,
    fitnessLevel: "Intermediate",
    equipment: [],
    targetMuscles: [],
    workoutType: "Strength",
    intensity: "Moderate",
    previousInjuries: ""
  });

  const equipmentOptions = [
    "Dumbbells", "Barbell", "Resistance Bands", "Pull-up Bar", 
    "Kettlebells", "Medicine Ball", "Bodyweight Only", "Yoga Mat"
  ];

  const muscleGroups = [
    "Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Glutes", "Full Body"
  ];

  const generateWorkout = async () => {
    if (!params.goal.trim()) {
      toast({
        title: "Missing Goal",
        description: "Please describe your workout goal",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // In a real app, this would call an AI API
      const customizedWorkout = {
        ...mockGeneratedWorkout,
        title: `AI-Generated ${params.workoutType} Workout`,
        description: `Personalized ${params.workoutType.toLowerCase()} workout for ${params.goal}`,
        estimatedDuration: params.timeAvailable,
        difficulty: params.fitnessLevel
      };
      
      setGeneratedWorkout(customizedWorkout);
      setIsGenerating(false);
      
      toast({
        title: "Workout Generated!",
        description: "Your personalized AI workout is ready",
      });
    }, 2000);
  };

  const updateEquipment = (equipment: string) => {
    setParams(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const updateMuscleGroups = (muscle: string) => {
    setParams(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.includes(muscle)
        ? prev.targetMuscles.filter(m => m !== muscle)
        : [...prev.targetMuscles, muscle]
    }));
  };

  return (
    <div className="space-y-6">
      {/* AI Generator Form */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            AI Workout Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Let AI create the perfect workout tailored to your goals, equipment, and preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">Fitness Goal *</Label>
                <Textarea
                  id="goal"
                  placeholder="E.g., Build upper body strength, lose weight, improve endurance..."
                  value={params.goal}
                  onChange={(e) => setParams(prev => ({ ...prev, goal: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Time Available (minutes)</Label>
                  <Input
                    id="time"
                    type="number"
                    value={params.timeAvailable}
                    onChange={(e) => setParams(prev => ({ ...prev, timeAvailable: Number(e.target.value) }))}
                    min={10}
                    max={120}
                  />
                </div>
                
                <div>
                  <Label htmlFor="level">Fitness Level</Label>
                  <Select value={params.fitnessLevel} onValueChange={(value) => setParams(prev => ({ ...prev, fitnessLevel: value }))}>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Workout Type</Label>
                  <Select value={params.workoutType} onValueChange={(value) => setParams(prev => ({ ...prev, workoutType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strength">Strength Training</SelectItem>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="HIIT">HIIT</SelectItem>
                      <SelectItem value="Flexibility">Flexibility</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="intensity">Intensity</Label>
                  <Select value={params.intensity} onValueChange={(value) => setParams(prev => ({ ...prev, intensity: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Light">Light</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Maximum">Maximum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Available Equipment</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {equipmentOptions.map((equipment) => (
                    <Badge
                      key={equipment}
                      variant={params.equipment.includes(equipment) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => updateEquipment(equipment)}
                    >
                      {equipment}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Target Muscle Groups</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {muscleGroups.map((muscle) => (
                    <Badge
                      key={muscle}
                      variant={params.targetMuscles.includes(muscle) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => updateMuscleGroups(muscle)}
                    >
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="injuries">Previous Injuries/Limitations</Label>
                <Textarea
                  id="injuries"
                  placeholder="Any injuries or physical limitations to consider..."
                  value={params.previousInjuries}
                  onChange={(e) => setParams(prev => ({ ...prev, previousInjuries: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={generateWorkout} 
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-accent to-energy"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Your Perfect Workout...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Workout
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Workout Display */}
      {generatedWorkout && (
        <Card className="animate-fade-in border-success/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-success" />
                  {generatedWorkout.title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">{generatedWorkout.description}</p>
              </div>
              <Badge className="bg-success text-white">
                AI Generated
              </Badge>
            </div>
            
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4" />
                {generatedWorkout.estimatedDuration} min
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Target className="w-4 h-4" />
                {generatedWorkout.difficulty}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Zap className="w-4 h-4" />
                {generatedWorkout.exercises.length} exercises
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Warmup */}
            <div>
              <h4 className="font-medium mb-2 text-accent">Warmup (5 minutes)</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {generatedWorkout.warmup.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Main Exercises */}
            <div>
              <h4 className="font-medium mb-3 text-accent">Main Workout</h4>
              <div className="space-y-4">
                {generatedWorkout.exercises.map((exercise, index) => (
                  <Card key={index} className="p-4 bg-secondary/30">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{exercise.name}</h5>
                      <Badge variant="outline">{exercise.sets} sets × {exercise.reps}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{exercise.instructions}</p>
                    <div className="flex gap-2">
                      {exercise.targetMuscles.map((muscle) => (
                        <Badge key={muscle} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Rest: {exercise.rest} seconds between sets
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cooldown */}
            <div>
              <h4 className="font-medium mb-2 text-accent">Cooldown (5 minutes)</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {generatedWorkout.cooldown.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* AI Tips */}
            <div>
              <h4 className="font-medium mb-2 text-accent">AI Training Tips</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {generatedWorkout.tips.map((tip, index) => (
                  <li key={index}>💡 {tip}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Start This Workout
              </Button>
              <Button variant="outline" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save to My Workouts
              </Button>
              <Button variant="outline" onClick={generateWorkout}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}