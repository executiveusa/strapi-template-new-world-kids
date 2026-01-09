'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DashboardConfig {
  theme: 'light' | 'dark' | 'auto';
  sidebarCollapsed: boolean;
  sidebarPosition: 'left' | 'right';
  cardStyle: 'minimal' | 'filled' | 'outlined';
  spacing: 'compact' | 'comfortable' | 'spacious';
  animationsEnabled: boolean;
}

interface DashboardSettings {
  general: {
    title: string;
    description: string;
    refreshInterval: number;
    autoRefresh: boolean;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
  privacy: {
    dataCollection: boolean;
    analytics: boolean;
    shareMetrics: boolean;
  };
}

export function DashboardConfig() {
  const [config, setConfig] = React.useState<DashboardConfig>({
    theme: 'auto',
    sidebarCollapsed: false,
    sidebarPosition: 'left',
    cardStyle: 'outlined',
    spacing: 'comfortable',
    animationsEnabled: true,
  });

  const [settings, setSettings] = React.useState<DashboardSettings>({
    general: {
      title: 'New World Kids Dashboard',
      description: 'Campaign Management & Analytics',
      refreshInterval: 30,
      autoRefresh: true,
    },
    notifications: {
      enabled: true,
      sound: false,
      desktop: true,
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      shareMetrics: false,
    },
  });

  const handleConfigChange = (key: keyof DashboardConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem('dashboardConfig', JSON.stringify({ ...config, [key]: value }));
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Display Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">Theme</label>
              <select
                value={config.theme}
                onChange={(e) => handleConfigChange('theme', e.target.value)}
                className="w-full rounded border border-input bg-background px-2 py-1 text-xs"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Card Style</label>
              <select
                value={config.cardStyle}
                onChange={(e) => handleConfigChange('cardStyle', e.target.value)}
                className="w-full rounded border border-input bg-background px-2 py-1 text-xs"
              >
                <option value="minimal">Minimal</option>
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Spacing</label>
              <select
                value={config.spacing}
                onChange={(e) => handleConfigChange('spacing', e.target.value)}
                className="w-full rounded border border-input bg-background px-2 py-1 text-xs"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Data Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Auto Refresh</label>
              <input
                type="checkbox"
                checked={settings.general.autoRefresh}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    general: { ...prev.general, autoRefresh: e.target.checked },
                  }))
                }
                className="h-3 w-3 rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Refresh Interval (seconds)</label>
              <input
                type="number"
                value={settings.general.refreshInterval}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    general: { ...prev.general, refreshInterval: parseInt(e.target.value) },
                  }))
                }
                className="w-full rounded border border-input bg-background px-2 py-1 text-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Enabled</label>
              <input
                type="checkbox"
                checked={settings.notifications.enabled}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, enabled: e.target.checked },
                  }))
                }
                className="h-3 w-3 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Sound</label>
              <input
                type="checkbox"
                checked={settings.notifications.sound}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, sound: e.target.checked },
                  }))
                }
                className="h-3 w-3 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Desktop</label>
              <input
                type="checkbox"
                checked={settings.notifications.desktop}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, desktop: e.target.checked },
                  }))
                }
                className="h-3 w-3 rounded"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Configuration</CardTitle>
          <CardDescription>Fine-tune your dashboard experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sidebar" className="w-full">
            <TabsList>
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            <TabsContent value="sidebar" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Collapsed by default</label>
                  <input
                    type="checkbox"
                    checked={config.sidebarCollapsed}
                    onChange={(e) => handleConfigChange('sidebarCollapsed', e.target.checked)}
                    className="h-3 w-3 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Position</label>
                  <select
                    value={config.sidebarPosition}
                    onChange={(e) => handleConfigChange('sidebarPosition', e.target.value)}
                    className="rounded border border-input bg-background px-2 py-1 text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable Animations</label>
                <input
                  type="checkbox"
                  checked={config.animationsEnabled}
                  onChange={(e) => handleConfigChange('animationsEnabled', e.target.checked)}
                  className="h-3 w-3 rounded"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Animations may impact performance on slower devices
              </div>
            </TabsContent>
            <TabsContent value="privacy" className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Data Collection</label>
                <input
                  type="checkbox"
                  checked={settings.privacy.dataCollection}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, dataCollection: e.target.checked },
                    }))
                  }
                  className="h-3 w-3 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Analytics</label>
                <input
                  type="checkbox"
                  checked={settings.privacy.analytics}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, analytics: e.target.checked },
                    }))
                  }
                  className="h-3 w-3 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Share Anonymous Metrics</label>
                <input
                  type="checkbox"
                  checked={settings.privacy.shareMetrics}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, shareMetrics: e.target.checked },
                    }))
                  }
                  className="h-3 w-3 rounded"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardConfig;
