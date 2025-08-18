import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Crown, 
  Flame, 
  Target,
  Zap,
  Award,
  Medal,
  Calendar,
  Clock
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "strength" | "endurance" | "consistency" | "social" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt?: string;
  progress?: {
    current: number;
    target: number;
  };
}

interface Level {
  level: number;
  title: string;
  xpRequired: number;
  xpCurrent: number;
  rewards: string[];
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first workout",
    icon: Star,
    category: "consistency",
    rarity: "common",
    unlockedAt: "2024-01-15"
  },
  {
    id: "2", 
    title: "Week Warrior",
    description: "Complete 7 workouts in a week",
    icon: Flame,
    category: "consistency",
    rarity: "rare",
    unlockedAt: "2024-01-22"
  },
  {
    id: "3",
    title: "Strength Seeker",
    description: "Lift 10,000 lbs total weight",
    icon: Trophy,
    category: "strength",
    rarity: "epic",
    progress: { current: 8500, target: 10000 }
  },
  {
    id: "4",
    title: "Cardio King",
    description: "Burn 5,000 calories in cardio workouts",
    icon: Zap,
    category: "endurance",
    rarity: "rare",
    progress: { current: 3200, target: 5000 }
  },
  {
    id: "5",
    title: "Social Butterfly",
    description: "Add 10 friends to your network",
    icon: Award,
    category: "social",
    rarity: "common",
    progress: { current: 7, target: 10 }
  },
  {
    id: "6",
    title: "Perfect Month",
    description: "Complete all planned workouts in a month",
    icon: Crown,
    category: "consistency",
    rarity: "legendary",
    progress: { current: 28, target: 30 }
  }
];

const currentLevel: Level = {
  level: 12,
  title: "Fitness Enthusiast",
  xpRequired: 15000,
  xpCurrent: 12350,
  rewards: ["Custom Profile Badge", "Priority Support", "Advanced Analytics"]
};

const nextLevel: Level = {
  level: 13,
  title: "Workout Warrior",
  xpRequired: 18000,
  xpCurrent: 0,
  rewards: ["Exclusive Themes", "Workout Builder Pro", "Social Features+"]
};

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500", 
  epic: "bg-purple-500",
  legendary: "bg-yellow-500"
};

const categoryIcons = {
  strength: Trophy,
  endurance: Zap,
  consistency: Flame,
  social: Award,
  special: Crown
};

export function GamificationSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredAchievements = selectedCategory === "all" 
    ? mockAchievements 
    : mockAchievements.filter(a => a.category === selectedCategory);

  const unlockedCount = mockAchievements.filter(a => a.unlockedAt).length;
  const totalXP = currentLevel.xpCurrent;
  const xpToNext = nextLevel.xpRequired - currentLevel.xpRequired - (currentLevel.xpCurrent - currentLevel.xpRequired);
  const levelProgress = ((currentLevel.xpCurrent - (currentLevel.xpRequired - (nextLevel.xpRequired - currentLevel.xpRequired))) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100;

  return (
    <div className="space-y-6">
      {/* Player Level & XP */}
      <Card className="bg-gradient-to-r from-accent/10 to-energy/10 border-accent/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-energy rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Level {currentLevel.level}</h3>
                <p className="text-lg text-muted-foreground">{currentLevel.title}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">{totalXP.toLocaleString()} XP</div>
              <div className="text-sm text-muted-foreground">{xpToNext} XP to next level</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Level {nextLevel.level}</span>
                <span>{Math.round(levelProgress)}%</span>
              </div>
              <Progress value={levelProgress} className="h-3" />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Next Level Rewards:</h4>
              <div className="flex flex-wrap gap-2">
                {nextLevel.rewards.map((reward, index) => (
                  <Badge key={index} variant="outline" className="border-accent text-accent">
                    {reward}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-energy mx-auto mb-2" />
            <div className="text-2xl font-bold">{unlockedCount}</div>
            <div className="text-sm text-muted-foreground">Achievements Unlocked</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">2,350</div>
            <div className="text-sm text-muted-foreground">Points This Week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-energy mx-auto mb-2" />
            <div className="text-2xl font-bold">14</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Medal className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">4th</div>
            <div className="text-sm text-muted-foreground">Leaderboard Rank</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-energy" />
            Achievements ({unlockedCount}/{mockAchievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {Object.keys(categoryIcons).map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-1"
                >
                  <Icon className="w-4 h-4" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const isUnlocked = !!achievement.unlockedAt;
              
              return (
                <Card 
                  key={achievement.id} 
                  className={`relative transition-all duration-200 hover:scale-105 ${
                    isUnlocked ? "border-accent/20" : "opacity-60"
                  }`}
                >
                  {/* Rarity Indicator */}
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${rarityColors[achievement.rarity]}`} />
                  
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        isUnlocked ? "bg-accent/10" : "bg-muted"
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isUnlocked ? "text-accent" : "text-muted-foreground"
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            className={`${rarityColors[achievement.rarity]} text-white text-xs`}
                          >
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                          </Badge>
                          
                          {isUnlocked ? (
                            <div className="text-xs text-success flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(achievement.unlockedAt!).toLocaleDateString()}
                            </div>
                          ) : achievement.progress && (
                            <div className="text-xs text-muted-foreground">
                              {achievement.progress.current}/{achievement.progress.target}
                            </div>
                          )}
                        </div>
                        
                        {!isUnlocked && achievement.progress && (
                          <div className="mt-2">
                            <Progress 
                              value={(achievement.progress.current / achievement.progress.target) * 100} 
                              className="h-1"
                            />
                            <div className="text-xs text-muted-foreground mt-1">
                              {Math.round((achievement.progress.current / achievement.progress.target) * 100)}% Complete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-energy" />
            Weekly Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-accent/5 border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Consistency Champion</h4>
                <Badge className="bg-accent text-white">500 XP</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Complete 5 workouts this week
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>4/5 workouts</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </Card>
            
            <Card className="p-4 bg-energy/5 border-energy/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Calorie Crusher</h4>
                <Badge className="bg-energy text-white">300 XP</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Burn 2,500 calories this week
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>1,840/2,500 calories</span>
                </div>
                <Progress value={74} className="h-2" />
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}