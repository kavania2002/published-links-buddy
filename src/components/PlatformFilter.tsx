import { Filter } from "lucide-react";
import { LinkType } from "../types";
import { AI_BOTS } from "../constants/bots";

interface PlatformFilterProps {
  selected: LinkType | "all";
  setSelected: (platform: LinkType | "all") => void;
  counts: Record<LinkType | "all", number>;
}

const PlatformFilter = ({
  selected,
  setSelected,
  counts,
}: PlatformFilterProps) => {
  const platforms: { value: LinkType | "all"; label: string }[] = [
    { value: "all", label: "All" },
  ];
  AI_BOTS.forEach((bot) => {
    platforms.push({ value: bot.id, label: bot.name });
  });

  return (
    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
      <Filter className="w-4 h-4 text-gray-400" />
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as LinkType | "all")}
        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900">
        {platforms.map(({ value, label }) => (
          <option key={value} value={value}>
            {label} ({counts[value] || 0})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformFilter;
