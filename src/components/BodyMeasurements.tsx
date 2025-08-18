import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Ruler, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Plus,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Measurement {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscle?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
    neck?: number;
  };
}

const mockMeasurements: Measurement[] = [
  {
    id: "1",
    date: "2024-01-20",
    weight: 175,
    bodyFat: 15.2,
    muscle: 42.1,
    measurements: {
      chest: 42,
      waist: 32,
      hips: 38,
      arms: 15.5,
      thighs: 24,
      neck: 16
    }
  },
  {
    id: "2",
    date: "2024-01-13",
    weight: 177,
    bodyFat: 16.1,
    muscle: 41.3,
    measurements: {
      chest: 41.5,
      waist: 33,
      hips: 38.5,
      arms: 15,
      thighs: 24.5,
      neck: 16
    }
  }
];

export function BodyMeasurements() {
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState<Omit<Measurement, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    bodyFat: 0,
    muscle: 0,
    measurements: {}
  });

  const latestMeasurement = measurements[0];
  const previousMeasurement = measurements[1];

  const getTrend = (current: number | undefined, previous: number | undefined) => {
    if (!current || !previous) return null;
    const change = current - previous;
    return {
      value: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: Math.abs((change / previous) * 100)
    };
  };

  const addMeasurement = () => {
    if (!newMeasurement.weight) {
      toast({
        title: "Missing Weight",
        description: "Please enter your weight",
        variant: "destructive"
      });
      return;
    }

    const measurement: Measurement = {
      ...newMeasurement,
      id: Date.now().toString()
    };

    setMeasurements([measurement, ...measurements]);
    setShowAddForm(false);
    setNewMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: 0,
      bodyFat: 0,
      muscle: 0,
      measurements: {}
    });

    toast({
      title: "Measurement Added",
      description: "Your body measurements have been recorded",
    });
  };

  const updateMeasurement = (field: string, value: number, category?: string) => {
    if (category === 'measurements') {
      setNewMeasurement(prev => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [field]: value
        }
      }));
    } else {
      setNewMeasurement(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-energy" />
                <span className="font-medium">Weight</span>
              </div>
              {getTrend(latestMeasurement?.weight, previousMeasurement?.weight) && (
                <Badge 
                  variant="outline" 
                  className={`${
                    getTrend(latestMeasurement?.weight, previousMeasurement?.weight)?.direction === 'down' 
                      ? 'text-success border-success' 
                      : 'text-energy border-energy'
                  }`}
                >
                  {getTrend(latestMeasurement?.weight, previousMeasurement?.weight)?.direction === 'down' ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  )}
                  {getTrend(latestMeasurement?.weight, previousMeasurement?.weight)?.value} lbs
                </Badge>
              )}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{latestMeasurement?.weight} lbs</div>
              <div className="text-sm text-muted-foreground">Current weight</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cardio" />
                <span className="font-medium">Body Fat</span>
              </div>
              {getTrend(latestMeasurement?.bodyFat, previousMeasurement?.bodyFat) && (
                <Badge 
                  variant="outline" 
                  className={`${
                    getTrend(latestMeasurement?.bodyFat, previousMeasurement?.bodyFat)?.direction === 'down' 
                      ? 'text-success border-success' 
                      : 'text-energy border-energy'
                  }`}
                >
                  {getTrend(latestMeasurement?.bodyFat, previousMeasurement?.bodyFat)?.direction === 'down' ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  )}
                  {getTrend(latestMeasurement?.bodyFat, previousMeasurement?.bodyFat)?.value.toFixed(1)}%
                </Badge>
              )}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{latestMeasurement?.bodyFat}%</div>
              <div className="text-sm text-muted-foreground">Body fat percentage</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-strength" />
                <span className="font-medium">Muscle</span>
              </div>
              {getTrend(latestMeasurement?.muscle, previousMeasurement?.muscle) && (
                <Badge 
                  variant="outline" 
                  className={`${
                    getTrend(latestMeasurement?.muscle, previousMeasurement?.muscle)?.direction === 'up' 
                      ? 'text-success border-success' 
                      : 'text-energy border-energy'
                  }`}
                >
                  {getTrend(latestMeasurement?.muscle, previousMeasurement?.muscle)?.direction === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {getTrend(latestMeasurement?.muscle, previousMeasurement?.muscle)?.value.toFixed(1)} lbs
                </Badge>
              )}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{latestMeasurement?.muscle} lbs</div>
              <div className="text-sm text-muted-foreground">Muscle mass</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Body Measurements */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Body Measurements</CardTitle>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Measurement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: 'chest', label: 'Chest', unit: 'in' },
              { key: 'waist', label: 'Waist', unit: 'in' },
              { key: 'hips', label: 'Hips', unit: 'in' },
              { key: 'arms', label: 'Arms', unit: 'in' },
              { key: 'thighs', label: 'Thighs', unit: 'in' },
              { key: 'neck', label: 'Neck', unit: 'in' }
            ].map(({ key, label, unit }) => {
              const current = latestMeasurement?.measurements[key as keyof typeof latestMeasurement.measurements];
              const previous = previousMeasurement?.measurements[key as keyof typeof previousMeasurement.measurements];
              const trend = getTrend(current, previous);
              
              return (
                <div key={key} className="p-3 bg-secondary/30 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{label}</span>
                    {trend && (
                      <span className={`text-xs ${trend.direction === 'up' ? 'text-energy' : 'text-success'}`}>
                        {trend.direction === 'up' ? '+' : '-'}{trend.value.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-bold">
                    {current || '--'} {current ? unit : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Measurement Form */}
      {showAddForm && (
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Add New Measurement</CardTitle>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeasurement.date}
                  onChange={(e) => updateMeasurement('date', e.target.value as any)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (lbs) *</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={newMeasurement.weight || ''}
                  onChange={(e) => updateMeasurement('weight', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="bodyFat">Body Fat (%)</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  value={newMeasurement.bodyFat || ''}
                  onChange={(e) => updateMeasurement('bodyFat', Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'chest', label: 'Chest (in)' },
                { key: 'waist', label: 'Waist (in)' },
                { key: 'hips', label: 'Hips (in)' },
                { key: 'arms', label: 'Arms (in)' },
                { key: 'thighs', label: 'Thighs (in)' },
                { key: 'neck', label: 'Neck (in)' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <Label htmlFor={key}>{label}</Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={newMeasurement.measurements[key as keyof typeof newMeasurement.measurements] || ''}
                    onChange={(e) => updateMeasurement(key, Number(e.target.value), 'measurements')}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={addMeasurement} className="bg-gradient-to-r from-success to-energy">
                <Plus className="w-4 h-4 mr-2" />
                Add Measurement
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Measurement History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Measurement History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {measurements.map((measurement) => (
              <div key={measurement.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <div className="font-medium">{new Date(measurement.date).toLocaleDateString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {measurement.weight} lbs • {measurement.bodyFat}% BF • {measurement.muscle} lbs muscle
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}