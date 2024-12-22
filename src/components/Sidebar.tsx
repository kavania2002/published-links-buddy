import { useState } from "react";
import { Plus, Sparkles, Settings as SettingsIcon } from "lucide-react";
import LinkForm from "./LinkForm";
import LinkGroup from "./LinkGroup";
import SettingsPanel from "./SettingsPanel";
import { Link, LinkType } from "../types/Link";
import { Settings } from "../types/Settings";
import { AI_BOTS } from "../constants/bots";
import Button from "./ui/Button";

export default function Sidebar() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    autoSave: true,
    notifications: true,
    enabled: true,
    cleanupDays: 30,
  });

  const handleSubmit = (linkData: Partial<Link>) => {
    if (editingLink) {
      setLinks(
        links.map((link) =>
          link.id === editingLink.id
            ? {
                ...editingLink,
                ...linkData,
                updatedAt: new Date().toISOString(),
              }
            : link
        )
      );
      setEditingLink(null);
    } else {
      const newLink: Link = {
        id: Date.now().toString(),
        title: linkData.title || "",
        url: linkData.url || "",
        type: (linkData.type as LinkType) || "gpt",
        createdAt: new Date().toISOString(),
      };
      setLinks([newLink, ...links]);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      setLinks(links.filter((link) => link.id !== id));
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
                  onDelete={handleDelete}
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
