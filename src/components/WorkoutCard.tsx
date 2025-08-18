import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Flame, Play } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  calories: number;
  exercises: number;
  category: "Strength" | "Cardio" | "Flexibility";
  completed?: boolean;
}

const difficultyColors = {
  Beginner: "bg-success",
  Intermediate: "bg-energy",
  Advanced: "bg-destructive",
};

const categoryColors = {
  Strength: "bg-strength",
  Cardio: "bg-cardio", 
  Flexibility: "bg-accent",
};

export function WorkoutCard({
  title,
  duration,
  difficulty,
  calories,
  exercises,
  category,
  completed = false
}: WorkoutCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-accent transition-colors">
            {title}
          </CardTitle>
          <Badge 
            className={`${difficultyColors[difficulty]} text-white`}
          >
            {difficulty}
          </Badge>
        </div>
        <Badge 
          variant="outline" 
          className={`${categoryColors[category]} text-white border-0 w-fit`}
        >
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>{exercises} exercises</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Flame className="w-4 h-4" />
            <span>{calories} cal</span>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          variant={completed ? "secondary" : "default"}
        >
          <Play className="w-4 h-4 mr-2" />
          {completed ? "Workout Complete" : "Start Workout"}
        </Button>
      </CardContent>
    </Card>
  );
}