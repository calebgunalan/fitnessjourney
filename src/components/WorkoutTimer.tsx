import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

interface WorkoutTimerProps {
  initialTime?: number; // in seconds
  isRest?: boolean;
  onComplete?: () => void;
}

export function WorkoutTimer({ initialTime = 60, isRest = false, onComplete }: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <Card className={`${isRest ? 'border-cardio' : 'border-strength'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Timer className={`w-4 h-4 ${isRest ? 'text-cardio' : 'text-strength'}`} />
          {isRest ? 'Rest Timer' : 'Exercise Timer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className={`text-4xl font-bold ${isCompleted ? 'text-success animate-pulse-strong' : isRest ? 'text-cardio' : 'text-strength'}`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className={`w-full bg-secondary rounded-full h-2`}>
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${isRest ? 'bg-cardio' : 'bg-strength'}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              variant={isRunning ? "secondary" : "default"}
              onClick={() => setIsRunning(!isRunning)}
              disabled={isCompleted}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          
          {isCompleted && (
            <div className="text-success font-medium animate-fade-in">
              {isRest ? 'Rest Complete!' : 'Time Up!'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}