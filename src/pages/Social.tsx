import { Navigation } from "@/components/ui/navigation";
import { SocialFeatures } from "@/components/SocialFeatures";

const Social = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Social Hub</h1>
          <p className="text-muted-foreground">Connect with friends, join challenges, and compete on leaderboards</p>
        </div>

        <SocialFeatures />
      </div>
    </div>
  );
};

export default Social;