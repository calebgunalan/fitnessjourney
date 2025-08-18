import { Navigation } from "@/components/ui/navigation";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { BodyMeasurements } from "@/components/BodyMeasurements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings as SettingsIcon, 
  Palette, 
  Scale, 
  Bell,
  Shield,
  Download,
  Trash2
} from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your FitTracker experience</p>
        </div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="measurements" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Body Tracking
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <ThemeCustomizer />
            
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show workout difficulty badges</Label>
                    <p className="text-sm text-muted-foreground">Display difficulty indicators on workout cards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact view mode</Label>
                    <p className="text-sm text-muted-foreground">Show more content in less space</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Animation effects</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measurements" className="space-y-6">
            <BodyMeasurements />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workout Reminders</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Stay motivated with customizable workout notifications
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily workout reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified to maintain your streak</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rest day reminders</Label>
                    <p className="text-sm text-muted-foreground">Gentle reminders to take recovery days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Achievement notifications</Label>
                    <p className="text-sm text-muted-foreground">Celebrate your milestones and PRs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly progress summary</Label>
                    <p className="text-sm text-muted-foreground">Get a summary of your weekly performance</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Friend activity updates</Label>
                    <p className="text-sm text-muted-foreground">See when friends complete workouts</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Challenge invitations</Label>
                    <p className="text-sm text-muted-foreground">Get notified about fitness challenges</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Control how your fitness data is used and shared
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public profile</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your fitness achievements</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share workout data</Label>
                    <p className="text-sm text-muted-foreground">Help improve the app with anonymous data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Third-party integrations</Label>
                    <p className="text-sm text-muted-foreground">Allow connections to other fitness apps</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Export workout data</Label>
                    <p className="text-sm text-muted-foreground">Download all your fitness data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Delete account</Label>
                    <p className="text-sm text-muted-foreground">Permanently remove your account and data</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;