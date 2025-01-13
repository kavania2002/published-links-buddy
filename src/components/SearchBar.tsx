import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <div className="relative px-4 py-3 border-b border-gray-100">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search links..."
          className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900"
        />
        {value && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
