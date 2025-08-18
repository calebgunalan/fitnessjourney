import { Navigation } from "@/components/ui/navigation";
import { GamificationSystem } from "@/components/GamificationSystem";

const Achievements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Achievements & Rewards</h1>
          <p className="text-muted-foreground">Track your progress, unlock achievements, and climb the levels</p>
        </div>

        <GamificationSystem />
      </div>
    </div>
  );
};

export default Achievements;