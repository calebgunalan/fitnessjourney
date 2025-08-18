import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Target, 
  Trophy, 
  Calendar,
  Edit,
  Save,
  Camera,
  Activity,
  Clock,
  Flame
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  joinDate: "January 2024",
  avatar: "",
  bio: "Fitness enthusiast on a journey to build strength and endurance. Love pushing limits and trying new workout challenges!",
  stats: {
    totalWorkouts: 45,
    streakDays: 14,
    caloriesBurned: 12500,
    hoursActive: 67
  },
  goals: {
    weeklyWorkouts: 5,
    weeklyCalories: 2500,
    currentWeight: 175,
    targetWeight: 170
  },
  preferences: {
    units: "imperial", // metric or imperial
    notifications: true,
    publicProfile: false
  },
  achievements: [
    { title: "First Workout", date: "Jan 2024", icon: Activity },
    { title: "7-Day Streak", date: "Jan 2024", icon: Flame },
    { title: "50 Workouts", date: "Feb 2024", icon: Trophy },
    { title: "Consistency Pro", date: "Feb 2024", icon: Calendar }
  ]
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const updateField = (field: string, value: any, category?: string) => {
    setUserData(prev => ({
      ...prev,
      [category || field]: category ? { ...prev[category as keyof typeof prev], [field]: value } : value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your account and fitness preferences</p>
          </div>
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={isEditing ? "bg-success" : "bg-gradient-to-r from-energy to-accent"}
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-energy to-accent text-white">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                      >
                        <Camera className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-secondary/50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-secondary/50" : ""}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userData.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-secondary/50" : ""}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fitness Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Fitness Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weeklyWorkouts">Weekly Workouts</Label>
                    <Input
                      id="weeklyWorkouts"
                      type="number"
                      value={userData.goals.weeklyWorkouts}
                      onChange={(e) => updateField('weeklyWorkouts', Number(e.target.value), 'goals')}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-secondary/50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weeklyCalories">Weekly Calories Target</Label>
                    <Input
                      id="weeklyCalories"
                      type="number"
                      value={userData.goals.weeklyCalories}
                      onChange={(e) => updateField('weeklyCalories', Number(e.target.value), 'goals')}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-secondary/50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
                    <Input
                      id="currentWeight"
                      type="number"
                      value={userData.goals.currentWeight}
                      onChange={(e) => updateField('currentWeight', Number(e.target.value), 'goals')}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-secondary/50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetWeight">Target Weight (lbs)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      value={userData.goals.targetWeight}
                      onChange={(e) => updateField('targetWeight', Number(e.target.value), 'goals')}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-secondary/50" : ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Units</Label>
                      <p className="text-sm text-muted-foreground">Measurement system</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={userData.preferences.units === 'imperial' ? 'default' : 'outline'}
                        onClick={() => updateField('units', 'imperial', 'preferences')}
                        disabled={!isEditing}
                      >
                        Imperial
                      </Button>
                      <Button
                        size="sm"
                        variant={userData.preferences.units === 'metric' ? 'default' : 'outline'}
                        onClick={() => updateField('units', 'metric', 'preferences')}
                        disabled={!isEditing}
                      >
                        Metric
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Workout reminders and achievements</p>
                    </div>
                    <Button
                      size="sm"
                      variant={userData.preferences.notifications ? 'default' : 'outline'}
                      onClick={() => updateField('notifications', !userData.preferences.notifications, 'preferences')}
                      disabled={!isEditing}
                    >
                      {userData.preferences.notifications ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Achievements */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-strength" />
                    <span className="text-sm">Total Workouts</span>
                  </div>
                  <span className="font-semibold">{userData.stats.totalWorkouts}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-energy" />
                    <span className="text-sm">Current Streak</span>
                  </div>
                  <span className="font-semibold">{userData.stats.streakDays} days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-cardio" />
                    <span className="text-sm">Calories Burned</span>
                  </div>
                  <span className="font-semibold">{userData.stats.caloriesBurned.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-success" />
                    <span className="text-sm">Hours Active</span>
                  </div>
                  <span className="font-semibold">{userData.stats.hoursActive}h</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-energy" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {userData.achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={index}
                        className="p-3 bg-energy/10 rounded-lg text-center"
                      >
                        <Icon className="w-6 h-6 text-energy mx-auto mb-2" />
                        <p className="text-xs font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
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
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Export Data
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;