import { Plus, Sparkles, Settings as SettingsIcon } from "lucide-react";
import LinkForm from "./LinkForm";
import SettingsPanel from "./SettingsPanel";
import Button from "./ui/Button";
import useLinkManager from "../hooks/useLinkManager";
import useSettingsManager from "../hooks/useSettingsManager";
import useFilterManager from "../hooks/useFilterManager";
import PlatformFilter from "./PlatformFilter";
import LinkList from "./LinkList";
import useFormManager from "../hooks/useFormManager";

export default function Sidebar() {
  const {
    links,
    editingLink,
    setEditingLink,
    addLink,
    updateLink,
    deleteLink,
    listenLinkUpdates,
  } = useLinkManager();
  const {
    selectedPlatform,
    handlePlatformChange,
    platformCounts,
    filteredLinks,
  } = useFilterManager({ links });

  const { settings, showSettings, setShowSettings, handleSaveSettings } =
    useSettingsManager({
      autoSave: true,
      notifications: true,
      enabled: true,
      cleanupDays: 30,
    });

  const { isAdding, setIsAdding, handleSubmit } = useFormManager({
    editingLink,
    addLink,
    updateLink,
  });

  if (process.env.NODE_ENV !== "development") {
    listenLinkUpdates();
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
          <PlatformFilter
            selected={selectedPlatform}
            setSelected={handlePlatformChange}
            counts={platformCounts}
          />

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
              <LinkList
                links={filteredLinks}
                onEdit={setEditingLink}
                onDelete={deleteLink}
              />
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
