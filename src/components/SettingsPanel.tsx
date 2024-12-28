import React from "react";
import { X, Save, Bell, Clock, Power } from "lucide-react";
import { Settings } from "../types";
import SettingsItem from "./SettingsItem";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";

interface SettingsPanelProps {
  settings: Settings;
  onClose: () => void;
  onSave: (settings: Settings) => void;
}

export default function SettingsPanel({
  settings,
  onClose,
  onSave,
}: SettingsPanelProps) {
  const [formData, setFormData] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="p-4 border-b bg-gray-900 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Settings</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto p-2 space-y-6">
        <div className="space-y-2">
          <SettingsItem
            icon={<Save className="w-5 h-5 text-gray-900" />}
            title="Auto-save Links"
            description="Automatically save links when generated">
            <Checkbox
              checked={formData.autoSave}
              onChange={(checked) =>
                setFormData({ ...formData, autoSave: checked })
              }
            />
          </SettingsItem>

          <SettingsItem
            icon={<Bell className="w-5 h-5 text-gray-900" />}
            title="Notifications"
            description="Show notifications for new links">
            <Checkbox
              checked={formData.notifications}
              onChange={(checked) =>
                setFormData({ ...formData, notifications: checked })
              }
            />
          </SettingsItem>

          <SettingsItem
            icon={<Power className="w-5 h-5 text-gray-900" />}
            title="Extension Status"
            description="Enable or disable the extension">
            <Checkbox
              checked={formData.enabled}
              onChange={(checked) =>
                setFormData({ ...formData, enabled: checked })
              }
            />
          </SettingsItem>

          <SettingsItem
            icon={<Clock className="w-5 h-5 text-gray-900" />}
            title="Auto-cleanup"
            description="Remove links older than">
            <select
              value={formData.cleanupDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cleanupDays: Number(e.target.value),
                })
              }
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option value={0}>Never</option>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </SettingsItem>
        </div>
      </form>

      <div className="p-4 border-t bg-gray-50">
        <Button buttonType="submit" onClick={(e) => handleSubmit(e)}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
