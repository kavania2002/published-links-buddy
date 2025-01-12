import { useState } from "react";
import { Settings } from "../types";

export default function SettingsManager(initialSettings: Settings) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return {
    settings,
    showSettings,
    setShowSettings,
    handleSaveSettings,
  };
}
