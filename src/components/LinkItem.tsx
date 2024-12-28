import { Trash2, Edit2, ExternalLink } from "lucide-react";
import { Link } from "../types";

interface LinkItemProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export default function LinkItem({ link, onEdit, onDelete }: LinkItemProps) {
  return (
    <div className="p-4 link-item-hover">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 line-clamp-1">
            {link.title}
          </h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 mt-1 line-clamp-1 flex items-center gap-1 group-hover:underline">
            <ExternalLink className="w-3 h-3" />
            {link.url}
          </a>
          <div className="text-xs text-gray-500 mt-1 font-mono">
            {new Date(link.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
        <div className="flex gap-2 transition-opacity">
          <button
            onClick={() => onEdit(link)}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
