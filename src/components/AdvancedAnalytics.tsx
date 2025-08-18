import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Target,
  Flame,
  Clock,
  Trophy,
  Activity
} from "lucide-react";

// Mock data for charts
const workoutVolumeData = [
  { week: 'Week 1', workouts: 3, calories: 1200, duration: 180 },
  { week: 'Week 2', workouts: 4, calories: 1400, duration: 220 },
  { week: 'Week 3', workouts: 5, calories: 1800, duration: 275 },
  { week: 'Week 4', workouts: 4, calories: 1500, duration: 240 },
  { week: 'Week 5', workouts: 6, calories: 2100, duration: 320 },
  { week: 'Week 6', workouts: 5, calories: 1900, duration: 285 },
];

const strengthProgressData = [
  { exercise: 'Bench Press', week1: 135, week2: 140, week3: 145, week4: 150, week5: 155, week6: 160 },
  { exercise: 'Squat', week1: 185, week2: 190, week3: 200, week4: 205, week5: 210, week6: 220 },
  { exercise: 'Deadlift', week1: 225, week2: 235, week3: 245, week4: 250, week5: 260, week6: 275 },
];

const workoutTypeDistribution = [
  { name: 'Strength', value: 45, color: '#8B5CF6' },
  { name: 'Cardio', value: 30, color: '#06B6D4' },
  { name: 'HIIT', value: 20, color: '#F59E0B' },
  { name: 'Flexibility', value: 5, color: '#10B981' },
];

const monthlyGoalProgress = {
  workouts: { current: 18, target: 20, percentage: 90 },
  calories: { current: 4800, target: 5000, percentage: 96 },
  strength: { current: 12, target: 15, percentage: 80 },
  cardio: { current: 8, target: 10, percentage: 80 }
};

export function AdvancedAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Workouts</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Activity className="w-8 h-8 text-energy" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+12% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Calories Burned</p>
                <p className="text-2xl font-bold">24.5K</p>
              </div>
              <Flame className="w-8 h-8 text-energy" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+8% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Hours</p>
                <p className="text-2xl font-bold">89.5</p>
              </div>
              <Clock className="w-8 h-8 text-cardio" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+15% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Personal Records</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">5 new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-energy" />
            Monthly Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Workouts</span>
                <span className="text-sm text-muted-foreground">
                  {monthlyGoalProgress.workouts.current}/{monthlyGoalProgress.workouts.target}
                </span>
              </div>
              <Progress value={monthlyGoalProgress.workouts.percentage} className="h-2" />
              <Badge className="bg-success text-white text-xs">
                {monthlyGoalProgress.workouts.percentage}% Complete
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Calories</span>
                <span className="text-sm text-muted-foreground">
                  {monthlyGoalProgress.calories.current}/{monthlyGoalProgress.calories.target}
                </span>
              </div>
              <Progress value={monthlyGoalProgress.calories.percentage} className="h-2" />
              <Badge className="bg-success text-white text-xs">
                {monthlyGoalProgress.calories.percentage}% Complete
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Strength Sessions</span>
                <span className="text-sm text-muted-foreground">
                  {monthlyGoalProgress.strength.current}/{monthlyGoalProgress.strength.target}
                </span>
              </div>
              <Progress value={monthlyGoalProgress.strength.percentage} className="h-2" />
              <Badge className="bg-accent text-white text-xs">
                {monthlyGoalProgress.strength.percentage}% Complete
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Cardio Sessions</span>
                <span className="text-sm text-muted-foreground">
                  {monthlyGoalProgress.cardio.current}/{monthlyGoalProgress.cardio.target}
                </span>
              </div>
              <Progress value={monthlyGoalProgress.cardio.percentage} className="h-2" />
              <Badge className="bg-cardio text-white text-xs">
                {monthlyGoalProgress.cardio.percentage}% Complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Volume Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Workout Volume Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workoutVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="workouts" 
                  stroke="hsl(var(--energy))" 
                  strokeWidth={2}
                  name="Workouts"
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="hsl(var(--cardio))" 
                  strokeWidth={2}
                  name="Calories (÷10)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Workout Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Workout Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={workoutTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workoutTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {workoutTypeDistribution.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm font-medium">{entry.name}</span>
                  <span className="text-sm text-muted-foreground">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strength Progress */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-strength" />
              Strength Progress (Last 6 Weeks)
            </CardTitle>
            <Button variant="outline" size="sm">
              View All Exercises
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strengthProgressData.map(item => ({
              exercise: item.exercise,
              'Week 1': item.week1,
              'Week 2': item.week2,
              'Week 3': item.week3,
              'Week 4': item.week4,
              'Week 5': item.week5,
              'Week 6': item.week6,
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exercise" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Week 1" fill="hsl(var(--muted))" />
              <Bar dataKey="Week 2" fill="hsl(var(--secondary))" />
              <Bar dataKey="Week 3" fill="hsl(var(--accent))" />
              <Bar dataKey="Week 4" fill="hsl(var(--energy))" />
              <Bar dataKey="Week 5" fill="hsl(var(--strength))" />
              <Bar dataKey="Week 6" fill="hsl(var(--success))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-success">💪 Strengths</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  Consistent workout frequency (+15% this month)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  Strong progression in compound movements
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  Excellent 14-day streak maintenance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  Balanced workout type distribution
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-energy">🎯 Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-energy rounded-full" />
                  Increase flexibility/mobility work (only 5%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-energy rounded-full" />
                  Consider longer rest periods for strength gains
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-energy rounded-full" />
                  Track nutrition data for better results
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-energy rounded-full" />
                  Add more progressive overload variation
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}