import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Trash2, Target, Weight } from "lucide-react";

interface Set {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

interface ExerciseTrackerProps {
  name: string;
  targetSets: number;
  targetReps: string;
  category: "Strength" | "Cardio" | "Flexibility";
  onComplete?: () => void;
}

export function ExerciseTracker({ 
  name, 
  targetSets, 
  targetReps, 
  category,
  onComplete 
}: ExerciseTrackerProps) {
  const [sets, setSets] = useState<Set[]>([
    { id: '1', reps: 0, weight: 0, completed: false }
  ]);

  const addSet = () => {
    const newSet: Set = {
      id: Date.now().toString(),
      reps: 0,
      weight: 0,
      completed: false
    };
    setSets([...sets, newSet]);
  };

  const removeSet = (id: string) => {
    setSets(sets.filter(set => set.id !== id));
  };

  const updateSet = (id: string, field: 'reps' | 'weight', value: number) => {
    setSets(sets.map(set => 
      set.id === id ? { ...set, [field]: value } : set
    ));
  };

  const toggleSetComplete = (id: string) => {
    setSets(sets.map(set => 
      set.id === id ? { ...set, completed: !set.completed } : set
    ));
  };

  const completedSets = sets.filter(set => set.completed).length;
  const isExerciseComplete = completedSets >= targetSets;

  const categoryColors = {
    Strength: "bg-strength",
    Cardio: "bg-cardio",
    Flexibility: "bg-accent",
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge className={`${categoryColors[category]} text-white`}>
                {category}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                {targetSets} sets × {targetReps}
              </Badge>
            </div>
          </div>
          {isExerciseComplete && (
            <Badge className="bg-success text-white animate-scale-in">
              <Check className="w-3 h-3 mr-1" />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {sets.map((set, index) => (
            <div key={set.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <span className="font-medium text-sm w-8">#{index + 1}</span>
              
              <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Weight"
                  value={set.weight || ''}
                  onChange={(e) => updateSet(set.id, 'weight', Number(e.target.value))}
                  className="w-20 h-8"
                />
                <span className="text-xs text-muted-foreground">lbs</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Reps"
                  value={set.reps || ''}
                  onChange={(e) => updateSet(set.id, 'reps', Number(e.target.value))}
                  className="w-16 h-8"
                />
              </div>
              
              <Button
                size="sm"
                variant={set.completed ? "default" : "outline"}
                onClick={() => toggleSetComplete(set.id)}
                className={set.completed ? "bg-success hover:bg-success/90" : ""}
              >
                <Check className="w-4 h-4" />
              </Button>
              
              {sets.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeSet(set.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={addSet} className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Set
          </Button>
          {isExerciseComplete && (
            <Button onClick={onComplete} className="bg-success hover:bg-success/90">
              <Check className="w-4 h-4 mr-2" />
              Complete Exercise
            </Button>
          )}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {completedSets}/{targetSets} sets completed
        </div>
      </CardContent>
    </Card>
  );
}