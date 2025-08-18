import { Navigation } from "@/components/ui/navigation";
import { WorkoutBuilder as WorkoutBuilderComponent } from "@/components/WorkoutBuilder";

const WorkoutBuilder = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Workout Builder</h1>
          <p className="text-muted-foreground">Create custom workouts tailored to your fitness goals</p>
        </div>

        <WorkoutBuilderComponent />
      </div>
    </div>
  );
};

export default WorkoutBuilder;