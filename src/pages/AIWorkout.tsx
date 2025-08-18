import { Navigation } from "@/components/ui/navigation";
import { AIWorkoutGenerator } from "@/components/AIWorkoutGenerator";

const AIWorkout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Workout Generator</h1>
          <p className="text-muted-foreground">Get personalized workouts tailored to your goals, equipment, and preferences</p>
        </div>

        <AIWorkoutGenerator />
      </div>
    </div>
  );
};

export default AIWorkout;