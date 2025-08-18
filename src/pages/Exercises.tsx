import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { exerciseLibrary } from "@/data/workouts";
import { Search, Filter, Target, Zap, Heart } from "lucide-react";

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");

  const categories = ["All", "Strength", "Cardio", "Flexibility"];
  const allMuscles = ["All", ...Array.from(new Set(exerciseLibrary.flatMap(ex => ex.targetMuscles)))];

  const filteredExercises = exerciseLibrary.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    const matchesMuscle = selectedMuscle === "All" || exercise.targetMuscles.includes(selectedMuscle);
    
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  const categoryIcons = {
    Strength: Target,
    Cardio: Heart,
    Flexibility: Zap,
  };

  const categoryColors = {
    Strength: "bg-strength",
    Cardio: "bg-cardio", 
    Flexibility: "bg-accent",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Exercise Library</h1>
            <p className="text-muted-foreground">Comprehensive collection of exercises with detailed instructions</p>
          </div>
          <Button className="bg-gradient-to-r from-energy to-accent">
            <Target className="w-4 h-4 mr-2" />
            Add Custom Exercise
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-strength/10 rounded-lg">
                  <Target className="w-5 h-5 text-strength" />
                </div>
                <div>
                  <p className="font-medium">{exerciseLibrary.filter(ex => ex.category === 'Strength').length} Strength</p>
                  <p className="text-sm text-muted-foreground">Exercises</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cardio/10 rounded-lg">
                  <Heart className="w-5 h-5 text-cardio" />
                </div>
                <div>
                  <p className="font-medium">{exerciseLibrary.filter(ex => ex.category === 'Cardio').length} Cardio</p>
                  <p className="text-sm text-muted-foreground">Exercises</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">{exerciseLibrary.filter(ex => ex.category === 'Flexibility').length} Flexibility</p>
                  <p className="text-sm text-muted-foreground">Exercises</p>
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
              Filter Exercises
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <div>
                <label className="text-sm font-medium mb-2 block">Target Muscle</label>
                <div className="flex gap-2 flex-wrap max-h-20 overflow-y-auto">
                  {allMuscles.slice(0, 8).map((muscle) => (
                    <Badge
                      key={muscle}
                      variant={selectedMuscle === muscle ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs"
                      onClick={() => setSelectedMuscle(muscle)}
                    >
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => {
            const CategoryIcon = categoryIcons[exercise.category];
            const categoryColor = categoryColors[exercise.category];
            
            return (
              <Card key={exercise.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {exercise.name}
                    </CardTitle>
                    <div className={`p-2 ${categoryColor}/10 rounded-lg`}>
                      <CategoryIcon className={`w-5 h-5 ${categoryColor.replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                  <Badge 
                    className={`${categoryColor} text-white w-fit`}
                  >
                    {exercise.category}
                  </Badge>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {exercise.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span>{exercise.sets} sets × {exercise.reps}</span>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Target Muscles:</p>
                      <div className="flex gap-1 flex-wrap">
                        {exercise.targetMuscles.map((muscle) => (
                          <Badge key={muscle} variant="outline" className="text-xs py-0">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4 group-hover:bg-accent group-hover:text-accent-foreground">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No exercises found matching your criteria
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedMuscle("All");
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

export default Exercises;