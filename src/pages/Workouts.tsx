import { Navigation } from "@/components/ui/navigation";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { workoutData } from "@/data/workouts";
import { useState } from "react";
import { Search, Filter, Plus, Zap, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const categories = ["All", "Strength", "Cardio", "Flexibility"];

  const filteredWorkouts = workoutData.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || workout.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "All" || workout.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Workouts</h1>
            <p className="text-muted-foreground">Choose from our curated workout programs</p>
          </div>
          <Button className="bg-gradient-to-r from-energy to-accent">
            <Plus className="w-4 h-4 mr-2" />
            Create Workout
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-energy/10 rounded-lg">
                  <Zap className="w-5 h-5 text-energy" />
                </div>
                <div>
                  <p className="font-medium">{workoutData.length} Total Workouts</p>
                  <p className="text-sm text-muted-foreground">Available programs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">12 Completed</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cardio/10 rounded-lg">
                  <Clock className="w-5 h-5 text-cardio" />
                </div>
                <div>
                  <p className="font-medium">480 Minutes</p>
                  <p className="text-sm text-muted-foreground">Total workout time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Workouts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <div className="flex gap-2 flex-wrap">
                  {difficulties.map((difficulty) => (
                    <Badge
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <Link key={workout.id} to={`/workout/${workout.id}`}>
              <WorkoutCard
                title={workout.title}
                duration={workout.duration}
                difficulty={workout.difficulty}
                calories={workout.calories}
                exercises={workout.exercises.length}
                category={workout.category}
              />
            </Link>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No workouts found matching your criteria
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedDifficulty("All");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;