import { useState } from "react";
import { Plus, Sparkles, Settings as SettingsIcon } from "lucide-react";
import LinkForm from "./LinkForm";
import LinkGroup from "./LinkGroup";
import SettingsPanel from "./SettingsPanel";
import { Settings, Link, LinkType, Message } from "../types";
import { AI_BOTS } from "../constants/bots";
import Button from "./ui/Button";
import { useLinks } from "../hooks/useLinks";

export default function Sidebar() {
  const {
    links,
    editingLink,
    setEditingLink,
    addLink,
    updateLink,
    deleteLink,
  } = useLinks();
  const [isAdding, setIsAdding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    autoSave: true,
    notifications: true,
    enabled: true,
    cleanupDays: 30,
  });

  const handleSubmit = (linkData: Partial<Link>) => {
    if (editingLink) {
      updateLink(linkData);
    } else {
      addLink(linkData);
      setIsAdding(false);
    }
  };

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  const groupedLinks = links.reduce((acc, link) => {
    const group = acc[link.type] || [];
    return { ...acc, [link.type]: [...group, link] };
  }, {} as Record<LinkType, Link[]>);

  const listenMessage = () => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      addLink({
        title: message.title,
        url: message.url,
        type: "claude",
        createdAt: new Date().toISOString(),
      });
    });
  };

  if (process.env.NODE_ENV !== "development") {
    listenMessage();
  }

  return (
    <div className="w-full h-screen bg-white shadow-xl flex flex-col relative">
      <div className="p-4 border-b bg-gray-900 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <span className="">Published Links Buddy</span>
        </h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {showSettings ? (
        <SettingsPanel
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={handleSaveSettings}
        />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto bg-gray-50/50">
            {(isAdding || editingLink) && (
              <LinkForm
                link={editingLink || {}}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsAdding(false);
                  setEditingLink(null);
                }}
                isEditing={!!editingLink}
              />
            )}

            <div className="py-2">
              {AI_BOTS.map((bot) => (
                <LinkGroup
                  key={bot.id}
                  type={bot.id}
                  links={groupedLinks[bot.id] || []}
                  onEdit={setEditingLink}
                  onDelete={deleteLink}
                />
              ))}
            </div>
          </div>

          {!isAdding && !editingLink && (
            <div className="p-4 border-t bg-white">
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4" />
                Add New Link
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
