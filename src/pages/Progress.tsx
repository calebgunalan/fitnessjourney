import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { StatsCard } from "@/components/StatsCard";
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Target, 
  Flame, 
  Zap,
  Award,
  BarChart3,
  Clock,
  Dumbbell
} from "lucide-react";

const mockProgressData = {
  weeklyGoals: {
    workouts: { current: 4, target: 5, percentage: 80 },
    calories: { current: 2100, target: 2500, percentage: 84 },
    minutes: { current: 180, target: 200, percentage: 90 }
  },
  personalRecords: [
    { exercise: "Bench Press", weight: "185 lbs", date: "2024-01-15", improvement: "+10 lbs" },
    { exercise: "Squat", weight: "225 lbs", date: "2024-01-12", improvement: "+15 lbs" },
    { exercise: "Deadlift", weight: "275 lbs", date: "2024-01-10", improvement: "+20 lbs" },
    { exercise: "5K Run", time: "22:15", date: "2024-01-08", improvement: "-1:30" }
  ],
  recentAchievements: [
    { title: "7-Day Streak", description: "Completed workouts for 7 consecutive days", date: "Yesterday", type: "streak" },
    { title: "Strength Milestone", description: "Reached 500 lbs total on big 3 lifts", date: "3 days ago", type: "milestone" },
    { title: "Consistency Champion", description: "20 workouts completed this month", date: "1 week ago", type: "consistency" }
  ],
  monthlyStats: {
    totalWorkouts: 18,
    totalCalories: 4800,
    totalMinutes: 720,
    averageIntensity: 85
  }
};

const Progress = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your fitness journey and celebrate achievements</p>
          </div>
          <Button className="bg-gradient-to-r from-energy to-accent">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Monthly Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Workouts This Month"
            value={mockProgressData.monthlyStats.totalWorkouts}
            change="+12% from last month"
            icon={Dumbbell}
            trend="up"
          />
          <StatsCard
            title="Calories Burned"
            value={`${mockProgressData.monthlyStats.totalCalories.toLocaleString()}`}
            change="+8% from last month"
            icon={Flame}
            trend="up"
          />
          <StatsCard
            title="Total Minutes"
            value={mockProgressData.monthlyStats.totalMinutes}
            change="+15% from last month"
            icon={Clock}
            trend="up"
          />
          <StatsCard
            title="Avg. Intensity"
            value={`${mockProgressData.monthlyStats.averageIntensity}%`}
            change="+3% from last month"
            icon={Zap}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Goals */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Workouts</span>
                    <span className="text-sm text-muted-foreground">
                      {mockProgressData.weeklyGoals.workouts.current}/{mockProgressData.weeklyGoals.workouts.target}
                    </span>
                  </div>
                  <ProgressBar value={mockProgressData.weeklyGoals.workouts.percentage} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {mockProgressData.weeklyGoals.workouts.percentage}% complete
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Calories Burned</span>
                    <span className="text-sm text-muted-foreground">
                      {mockProgressData.weeklyGoals.calories.current.toLocaleString()}/{mockProgressData.weeklyGoals.calories.target.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar value={mockProgressData.weeklyGoals.calories.percentage} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {mockProgressData.weeklyGoals.calories.percentage}% complete
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Active Minutes</span>
                    <span className="text-sm text-muted-foreground">
                      {mockProgressData.weeklyGoals.minutes.current}/{mockProgressData.weeklyGoals.minutes.target}
                    </span>
                  </div>
                  <ProgressBar value={mockProgressData.weeklyGoals.minutes.percentage} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {mockProgressData.weeklyGoals.minutes.percentage}% complete
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Records */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-energy" />
                  Personal Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProgressData.personalRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">{record.exercise}</h4>
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{record.weight || record.time}</p>
                        <Badge className="bg-success text-white text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {record.improvement}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Insights */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-energy" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProgressData.recentAchievements.map((achievement, index) => {
                    const typeColors = {
                      streak: "bg-success/10 border-success/20",
                      milestone: "bg-energy/10 border-energy/20",
                      consistency: "bg-cardio/10 border-cardio/20"
                    };
                    
                    const typeIcons = {
                      streak: Flame,
                      milestone: Trophy,
                      consistency: Target
                    };
                    
                    const Icon = typeIcons[achievement.type as keyof typeof typeIcons];
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border ${typeColors[achievement.type as keyof typeof typeColors]} animate-fade-in`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5 text-energy" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground mb-1">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Workout History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Detailed Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Update Goals
                </Button>
              </CardContent>
            </Card>

            {/* Streak Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4 text-energy" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-energy mb-2">14</div>
                  <p className="text-sm text-muted-foreground mb-4">Days in a row</p>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-6 rounded-full ${i < 5 ? 'bg-success' : 'bg-secondary'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep going! Your best streak was 21 days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;