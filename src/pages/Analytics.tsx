import { Navigation } from "@/components/ui/navigation";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Advanced Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your fitness journey and performance trends</p>
        </div>

        <AdvancedAnalytics />
      </div>
    </div>
  );
};

export default Analytics;