import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Check, RefreshCw } from "lucide-react";

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    preview: string[];
  };
}

const themeOptions: ThemeOption[] = [
  {
    id: "default",
    name: "Energy Orange",
    description: "Bold and energetic with vibrant orange accents",
    colors: {
      primary: "220 50% 15%",
      accent: "25 95% 58%",
      background: "220 20% 7%",
      preview: ["bg-orange-500", "bg-slate-800", "bg-slate-900"]
    }
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    description: "Modern and cool with electric blue highlights",
    colors: {
      primary: "220 50% 15%",
      accent: "200 100% 50%",
      background: "220 20% 7%",
      preview: ["bg-blue-500", "bg-slate-800", "bg-slate-900"]
    }
  },
  {
    id: "neon-green",
    name: "Neon Green",
    description: "Fresh and vibrant with neon green energy",
    colors: {
      primary: "220 50% 15%",
      accent: "120 100% 50%",
      background: "220 20% 7%",
      preview: ["bg-green-500", "bg-slate-800", "bg-slate-900"]
    }
  },
  {
    id: "sunset-red",
    name: "Sunset Red",
    description: "Intense and powerful with sunset red tones",
    colors: {
      primary: "220 50% 15%",
      accent: "0 100% 60%",
      background: "220 20% 7%",
      preview: ["bg-red-500", "bg-slate-800", "bg-slate-900"]
    }
  },
  {
    id: "purple-power",
    name: "Purple Power",
    description: "Mystical and strong with deep purple accents",
    colors: {
      primary: "220 50% 15%",
      accent: "270 100% 60%",
      background: "220 20% 7%",
      preview: ["bg-purple-500", "bg-slate-800", "bg-slate-900"]
    }
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "Warm and motivating with golden yellow highlights",
    colors: {
      primary: "220 50% 15%",
      accent: "45 100% 50%",
      background: "220 20% 7%",
      preview: ["bg-yellow-500", "bg-slate-800", "bg-slate-900"]
    }
  }
];

interface ThemeCustomizerProps {
  onThemeChange?: (theme: ThemeOption) => void;
}

export function ThemeCustomizer({ onThemeChange }: ThemeCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);

  const applyTheme = (theme: ThemeOption) => {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--energy', theme.colors.accent);
    
    // Update gradients
    const primaryColor = `hsl(${theme.colors.primary})`;
    const accentColor = `hsl(${theme.colors.accent})`;
    
    root.style.setProperty('--gradient-energy', `linear-gradient(135deg, ${accentColor} 0%, ${accentColor} 100%)`);
    root.style.setProperty('--gradient-hero', `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`);
    
    setSelectedTheme(theme);
    onThemeChange?.(theme);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-accent" />
          Theme Customizer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose your preferred color scheme to personalize your workout experience
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themeOptions.map((theme) => (
            <Card 
              key={theme.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedTheme.id === theme.id 
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => applyTheme(theme)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{theme.name}</h3>
                  {selectedTheme.id === theme.id && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Check className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {theme.description}
                </p>
                
                {/* Color Preview */}
                <div className="flex gap-2 mb-3">
                  {theme.colors.preview.map((color, index) => (
                    <div 
                      key={index}
                      className={`w-6 h-6 rounded-full ${color} border border-border`}
                    />
                  ))}
                </div>
                
                {/* Theme Preview Card */}
                <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Preview</span>
                    <div className={`w-3 h-3 rounded-full ${theme.colors.preview[0]}`} />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded w-full" />
                    <div className="h-2 bg-muted rounded w-3/4" />
                  </div>
                  <Button 
                    size="sm" 
                    className={`w-full h-6 text-xs ${theme.colors.preview[0]} hover:opacity-90`}
                  >
                    Sample Button
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => applyTheme(themeOptions[0])}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}