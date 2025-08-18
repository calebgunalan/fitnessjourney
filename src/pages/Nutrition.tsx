import { Navigation } from "@/components/ui/navigation";
import { NutritionTracker } from "@/components/NutritionTracker";

const Nutrition = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nutrition Tracker</h1>
          <p className="text-muted-foreground">Track your daily nutrition and reach your macro goals</p>
        </div>

        <NutritionTracker />
      </div>
    </div>
  );
};

export default Nutrition;