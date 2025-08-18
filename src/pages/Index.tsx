import { Navigation } from "@/components/ui/navigation";
import { WorkoutCard } from "@/components/WorkoutCard";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Zap,
  Clock,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/gym-hero.jpg";

const recentWorkouts = [
  {
    title: "Upper Body Strength",
    duration: "45 min",
    difficulty: "Intermediate" as const,
    calories: 320,
    exercises: 8,
    category: "Strength" as const,
  },
  {
    title: "HIIT Cardio Blast",
    duration: "30 min", 
    difficulty: "Advanced" as const,
    calories: 280,
    exercises: 6,
    category: "Cardio" as const,
  },
  {
    title: "Full Body Beginner",
    duration: "35 min",
    difficulty: "Beginner" as const,
    calories: 250,
    exercises: 10,
    category: "Strength" as const,
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-[500px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-foreground mb-4">
                Transform Your 
                <span className="bg-gradient-to-r from-energy to-accent bg-clip-text text-transparent"> Fitness Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Track workouts, monitor progress, and achieve your fitness goals with our advanced workout application.
              </p>
              <div className="flex gap-4">
                <Link to="/workouts">
                  <Button size="lg" className="text-lg px-8">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Workout
                  </Button>
                </Link>
                <Link to="/progress">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    View Progress
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Workouts This Week"
            value="12"
            change="+20% from last week"
            icon={Calendar}
            trend="up"
          />
          <StatsCard
            title="Total Calories Burned"
            value="3,240"
            change="+15% from last month"
            icon={Flame}
            trend="up"
          />
          <StatsCard
            title="Personal Records"
            value="8"
            change="2 new this week"
            icon={Trophy}
            trend="up"
          />
          <StatsCard
            title="Current Streak"
            value="14 days"
            change="Best streak: 21 days"
            icon={Target}
            trend="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Workouts */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recent Workouts</h2>
              <Link to="/workouts">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid gap-6">
              {recentWorkouts.map((workout, index) => (
                <Link key={index} to={`/workout/${workout.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <WorkoutCard
                    title={workout.title}
                    duration={workout.duration}
                    difficulty={workout.difficulty}
                    calories={workout.calories}
                    exercises={workout.exercises}
                    category={workout.category}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Progress & Goals */}
          <div className="space-y-6">
            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Workouts</span>
                      <span>4/5</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Calories</span>
                      <span>2,100/2,500</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-energy" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <Trophy className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-sm">7-Day Streak</p>
                      <p className="text-xs text-muted-foreground">Completed yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-energy/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-energy" />
                    <div>
                      <p className="font-medium text-sm">New PR: Bench Press</p>
                      <p className="text-xs text-muted-foreground">185 lbs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cardio/10 rounded-lg">
                    <Clock className="w-5 h-5 text-cardio" />
                    <div>
                      <p className="font-medium text-sm">Fastest 5K</p>
                      <p className="text-xs text-muted-foreground">22:15</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;