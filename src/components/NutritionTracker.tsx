import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Apple, 
  Plus, 
  Search, 
  Utensils,
  Target,
  Flame,
  Zap,
  Droplets
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface MealEntry {
  id: string;
  foodId: string;
  name: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: "breakfast" | "lunch" | "dinner" | "snacks";
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const mockFoodDatabase: FoodItem[] = [
  { id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  { id: "2", name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fat: 0.9, serving: "100g" },
  { id: "3", name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  { id: "4", name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, serving: "100g" },
  { id: "5", name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "100g" },
  { id: "6", name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  { id: "7", name: "Oats", calories: 389, protein: 17, carbs: 66, fat: 7, serving: "100g" },
  { id: "8", name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, serving: "100g" }
];

export function NutritionTracker() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner" | "snacks">("breakfast");
  const [todayEntries, setTodayEntries] = useState<MealEntry[]>([]);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  
  const [goals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 67
  });

  const filteredFoods = mockFoodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFood = (food: FoodItem, servings: number = 1) => {
    const entry: MealEntry = {
      id: Date.now().toString(),
      foodId: food.id,
      name: food.name,
      servings,
      calories: food.calories * servings,
      protein: food.protein * servings,
      carbs: food.carbs * servings,
      fat: food.fat * servings,
      meal: selectedMeal
    };

    setTodayEntries([...todayEntries, entry]);
    setShowFoodSearch(false);
    setSearchTerm("");
    
    toast({
      title: "Food Added",
      description: `${food.name} added to ${selectedMeal}`,
    });
  };

  const calculateTotals = () => {
    return todayEntries.reduce(
      (totals, entry) => ({
        calories: totals.calories + entry.calories,
        protein: totals.protein + entry.protein,
        carbs: totals.carbs + entry.carbs,
        fat: totals.fat + entry.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getMealEntries = (meal: string) => {
    return todayEntries.filter(entry => entry.meal === meal);
  };

  const getMealTotals = (meal: string) => {
    const entries = getMealEntries(meal);
    return entries.reduce(
      (totals, entry) => ({
        calories: totals.calories + entry.calories,
        protein: totals.protein + entry.protein,
        carbs: totals.carbs + entry.carbs,
        fat: totals.fat + entry.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totals = calculateTotals();

  const mealIcons = {
    breakfast: "🌅",
    lunch: "☀️", 
    dinner: "🌙",
    snacks: "🍎"
  };

  return (
    <div className="space-y-6">
      {/* Daily Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-energy" />
            Today's Nutrition Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Calories */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-energy" />
                  <span className="font-medium">Calories</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(totals.calories)}/{goals.calories}
                </span>
              </div>
              <Progress value={(totals.calories / goals.calories) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {goals.calories - Math.round(totals.calories)} remaining
              </div>
            </div>

            {/* Protein */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-strength" />
                  <span className="font-medium">Protein</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(totals.protein)}g/{goals.protein}g
                </span>
              </div>
              <Progress value={(totals.protein / goals.protein) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {Math.max(0, goals.protein - Math.round(totals.protein))}g remaining
              </div>
            </div>

            {/* Carbs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Apple className="w-4 h-4 text-cardio" />
                  <span className="font-medium">Carbs</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(totals.carbs)}g/{goals.carbs}g
                </span>
              </div>
              <Progress value={(totals.carbs / goals.carbs) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {Math.max(0, goals.carbs - Math.round(totals.carbs))}g remaining
              </div>
            </div>

            {/* Fat */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-accent" />
                  <span className="font-medium">Fat</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(totals.fat)}g/{goals.fat}g
                </span>
              </div>
              <Progress value={(totals.fat / goals.fat) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {Math.max(0, goals.fat - Math.round(totals.fat))}g remaining
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Logging */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(["breakfast", "lunch", "dinner", "snacks"] as const).map((meal) => {
          const mealTotals = getMealTotals(meal);
          const mealEntries = getMealEntries(meal);
          
          return (
            <Card key={meal} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{mealIcons[meal]}</span>
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(mealTotals.calories)} cal
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mealEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No foods logged yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {mealEntries.map((entry) => (
                      <div key={entry.id} className="text-sm p-2 bg-secondary/30 rounded">
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {entry.servings} serving • {Math.round(entry.calories)} cal
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSelectedMeal(meal);
                    setShowFoodSearch(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Food
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Food Search Modal */}
      {showFoodSearch && (
        <Card className="fixed inset-4 z-50 bg-background shadow-lg animate-scale-in max-h-[80vh] overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                Add Food to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowFoodSearch(false)}>
                ✕
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-96">
            <div className="space-y-3">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary cursor-pointer"
                  onClick={() => addFood(food)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{food.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {food.calories} cal, {food.protein}g protein per {food.serving}
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span>C: {food.carbs}g</span>
                      <span>F: {food.fat}g</span>
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-accent" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Add Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Quick Add
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mockFoodDatabase.slice(0, 8).map((food) => (
              <Button
                key={food.id}
                variant="outline"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => addFood(food)}
              >
                <span className="text-sm font-medium">{food.name}</span>
                <span className="text-xs text-muted-foreground">{food.calories} cal</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}