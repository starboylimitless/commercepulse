
"use client";

import { Bell, User, Shield, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-2"><Bell size={16} /> Email Notifications</h3>
              <p className="text-muted-foreground text-sm">Receive important updates and summaries via email.</p>
            </div>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className="text-muted-foreground text-sm">Get real-time alerts on your devices.</p>
            </div>
            <input type="checkbox" className="toggle-switch" />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Appearance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-2"><Palette size={16} /> Theme</h3>
              <p className="text-muted-foreground text-sm">Choose between light, dark, and system mode.</p>
            </div>
            {mounted ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`px-4 py-2 rounded-lg transition-colors ${theme === "light"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                    }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`px-4 py-2 rounded-lg transition-colors ${theme === "dark"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                    }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`px-4 py-2 rounded-lg transition-colors ${theme === "system"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                    }`}
                >
                  System
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 opacity-50">
                <button className="px-4 py-2 rounded-lg bg-secondary">Light</button>
                <button className="px-4 py-2 rounded-lg bg-secondary">Dark</button>
                <button className="px-4 py-2 rounded-lg bg-secondary">System</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Account</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-2"><User size={16} /> Manage Profile</h3>
              <p className="text-muted-foreground text-sm">Update your personal information.</p>
            </div>
            <button className="text-sm text-primary hover:underline">Go to Profile</button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-2"><Shield size={16} /> Privacy & Security</h3>
              <p className="text-muted-foreground text-sm">Adjust your privacy settings and secure your account.</p>
            </div>
            <button className="text-sm text-primary hover:underline">Manage</button>
          </div>
        </div>
      </div>

    </div>
  );
}

