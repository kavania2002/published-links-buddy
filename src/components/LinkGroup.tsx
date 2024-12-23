import { useState } from "react";
import {
  MessageSquare,
  Bot,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Link, LinkType } from "../types/Link";
import LinkItem from "./LinkItem";

interface LinkGroupProps {
  type: LinkType;
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export default function LinkGroup({
  type,
  links,
  onEdit,
  onDelete,
}: LinkGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getGroupIcon = () => {
    switch (type) {
      case "gpt":
        return <MessageSquare className="w-5 h-5 text-gray-900" />;
      case "claude":
        return <Bot className="w-5 h-5 text-gray-900" />;
      case "bolt":
        return <Sparkles className="w-5 h-5 text-gray-900" />;
      default:
        return <ExternalLink className="w-5 h-5 text-gray-900" />;
    }
  };

  const getGroupTitle = () => {
    switch (type) {
      case "gpt":
        return "ChatGPT";
      case "claude":
        return "Claude";
      case "bolt":
        return "Bolt";
      default:
        return "Rollout";
    }
  };

  if (links.length === 0) return null;

  return (
    <div className="mb-2 bg-white rounded-lg mx-2 shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg">
        {getGroupIcon()}
        <h2 className="font-medium text-gray-900">{getGroupTitle()}</h2>
        <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
          {links.length}
        </span>
        <div
          className="ml-auto text-gray-400 transition-transform duration-200"
          style={{ transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)" }}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
