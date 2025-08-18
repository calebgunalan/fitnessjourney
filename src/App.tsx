import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import WorkoutSession from "./pages/WorkoutSession";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import WorkoutBuilder from "./pages/WorkoutBuilder";
import Settings from "./pages/Settings";
import AIWorkout from "./pages/AIWorkout";
import Nutrition from "./pages/Nutrition";
import Social from "./pages/Social";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/workout/:id" element={<WorkoutSession />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/workout-builder" element={<WorkoutBuilder />} />
      <Route path="/ai-workout" element={<AIWorkout />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/social" element={<Social />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
    <Sonner />
  </BrowserRouter>
);

export default App;
