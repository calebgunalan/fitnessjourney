import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Trophy, 
  Target, 
  MessageSquare,
  UserPlus,
  Search,
  Crown,
  Flame,
  Calendar,
  Share
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  currentStreak: number;
  weeklyWorkouts: number;
  totalWorkouts: number;
  isOnline: boolean;
  lastWorkout: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "weekly_workouts" | "total_calories" | "streak" | "specific_exercise";
  target: number;
  current: number;
  participants: number;
  endDate: string;
  prize: string;
  isJoined: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  change: "up" | "down" | "same";
}

const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "",
    currentStreak: 12,
    weeklyWorkouts: 4,
    totalWorkouts: 89,
    isOnline: true,
    lastWorkout: "2 hours ago"
  },
  {
    id: "2", 
    name: "Mike Johnson",
    avatar: "",
    currentStreak: 7,
    weeklyWorkouts: 3,
    totalWorkouts: 156,
    isOnline: false,
    lastWorkout: "Yesterday"
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "",
    currentStreak: 21,
    weeklyWorkouts: 6,
    totalWorkouts: 203,
    isOnline: true,
    lastWorkout: "1 hour ago"
  }
];

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "January Consistency Challenge",
    description: "Complete 20 workouts this month",
    type: "weekly_workouts",
    target: 20,
    current: 12,
    participants: 847,
    endDate: "2024-01-31",
    prize: "Exclusive Badge + 500 Points",
    isJoined: true
  },
  {
    id: "2",
    title: "5K Steps Daily",
    description: "Walk 5,000+ steps every day for a week",
    type: "streak",
    target: 7,
    current: 3,
    participants: 1205,
    endDate: "2024-01-28",
    prize: "Fitness Tracker Discount",
    isJoined: false
  },
  {
    id: "3",
    title: "Push-up Power Week",
    description: "Complete 500 total push-ups this week",
    type: "specific_exercise",
    target: 500,
    current: 280,
    participants: 623,
    endDate: "2024-01-26",
    prize: "Custom Workout Plan",
    isJoined: true
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "FitGuru_Alex", score: 2840, change: "same" },
  { rank: 2, name: "Emma Wilson", score: 2735, change: "up" },
  { rank: 3, name: "WorkoutWarrior", score: 2680, change: "down" },
  { rank: 4, name: "You", score: 2520, change: "up" },
  { rank: 5, name: "Sarah Chen", score: 2445, change: "down" },
];

export function SocialFeatures() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [friends] = useState<Friend[]>(mockFriends);
  const [challenges] = useState<Challenge[]>(mockChallenges);

  const joinChallenge = (challengeId: string) => {
    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the challenge. Good luck!",
    });
  };

  const shareWorkout = () => {
    toast({
      title: "Workout Shared!",
      description: "Your workout has been shared with your friends",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="friends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Friends
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-6">
          {/* Add Friends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-energy" />
                Find Friends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Add Friend</Button>
              </div>
            </CardContent>
          </Card>

          {/* Friends List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  My Friends ({friends.length})
                </span>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share Workout
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-energy to-accent text-white">
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{friend.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last workout: {friend.lastWorkout}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-energy" />
                          <span className="font-medium">{friend.currentStreak}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">streak</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{friend.weeklyWorkouts}/5</div>
                        <div className="text-xs text-muted-foreground">this week</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{friend.totalWorkouts}</div>
                        <div className="text-xs text-muted-foreground">total</div>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-energy" />
                Active Challenges
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Join challenges to compete with the community and earn rewards
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {challenge.participants} participants
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Ends {new Date(challenge.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={challenge.isJoined ? "bg-success" : "bg-accent"}>
                          {challenge.isJoined ? "Joined" : "Open"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.current}/{challenge.target}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Prize: </span>
                        <span className="font-medium text-accent">{challenge.prize}</span>
                      </div>
                      
                      {!challenge.isJoined ? (
                        <Button size="sm" onClick={() => joinChallenge(challenge.id)}>
                          Join Challenge
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-energy" />
                Weekly Leaderboard
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Top performers this week based on workout points
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      entry.name === "You" ? "bg-accent/10 border border-accent/20" : "bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        entry.rank === 1 ? "bg-yellow-500 text-yellow-900" :
                        entry.rank === 2 ? "bg-gray-400 text-gray-900" :
                        entry.rank === 3 ? "bg-amber-600 text-amber-900" :
                        "bg-secondary text-secondary-foreground"
                      }`}>
                        {entry.rank <= 3 ? <Crown className="w-4 h-4" /> : entry.rank}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${entry.name === "You" ? "text-accent" : ""}`}>
                            {entry.name}
                          </span>
                          {entry.name === "You" && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.score} points this week
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">#{entry.rank}</div>
                      {entry.change !== "same" && (
                        <div className={`text-xs flex items-center gap-1 ${
                          entry.change === "up" ? "text-success" : "text-destructive"
                        }`}>
                          {entry.change === "up" ? "↗" : "↘"}
                          {entry.change === "up" ? "+2" : "-1"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-energy">4th</div>
                <div className="text-sm text-muted-foreground">Your Rank</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">2520</div>
                <div className="text-sm text-muted-foreground">Points This Week</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">+150</div>
                <div className="text-sm text-muted-foreground">Points to 3rd Place</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}