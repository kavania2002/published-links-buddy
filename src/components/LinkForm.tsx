import React from 'react';
import { X } from 'lucide-react';
import { Link, LinkType } from '../types/Link';

interface LinkFormProps {
  link: Partial<Link>;
  onSubmit: (link: Partial<Link>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function LinkForm({ link, onSubmit, onCancel, isEditing }: LinkFormProps) {
  const [formData, setFormData] = React.useState(link);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          {isEditing ? 'Edit Link' : 'Add New Link'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-shadow"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="URL"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-shadow"
          value={formData.url || ''}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
        <select
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-shadow"
          value={formData.type || 'gpt'}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as LinkType })}
        >
          <option value="gpt">ChatGPT</option>
          <option value="claude">Claude</option>
          <option value="bolt">Bolt</option>
          <option value="rollout">Rollout</option>
        </select>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Add Link'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}