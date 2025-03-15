import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Settings,
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Save,
  User,
  Key,
  Mail,
} from "lucide-react";

export default function SettingsPage({ closeSettings }) {
  const [username, setUsername] = useState("JohnDoe");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        {/* Header */}
        <CardHeader className="bg-blue-500 text-white rounded-t-lg p-4 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-6 h-6" /> Settings
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 space-y-6">
          {/* Change Username */}
          <div>
            <Label className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" /> Username
            </Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          {/* Change Password */}
          <div>
            <Label className="text-lg flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-500" /> Change Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter new password"
            />
          </div>

          {/* Theme Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "light" ? (
                <Sun className="text-yellow-500 w-6 h-6" />
              ) : (
                <Moon className="text-gray-700 w-6 h-6" />
              )}
              <span className="text-lg font-medium">Theme</span>
            </div>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-40 bg-white border border-gray-300 p-2 rounded">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-medium">Enable Notifications</span>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

        

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
