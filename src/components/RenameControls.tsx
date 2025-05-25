import React, { useState } from 'react';
import { Settings, Tag, Hash, Calendar } from 'lucide-react';

interface RenameControlsProps {
  pattern: string;
  setPattern: (pattern: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const RenameControls: React.FC<RenameControlsProps> = ({
  pattern,
  setPattern,
  category,
  setCategory
}) => {
  const [selectedTab, setSelectedTab] = useState<'basic' | 'advanced'>('basic');
  
  const categories = [
    { id: 'none', name: 'None' },
    { id: 'photos', name: 'Photos' },
    { id: 'documents', name: 'Documents' },
    { id: 'videos', name: 'Videos' },
    { id: 'music', name: 'Music' },
    { id: 'downloads', name: 'Downloads' },
    { id: 'custom', name: 'Custom' },
  ];

  const patternTemplates = [
    { id: 'original', label: 'Original Name', value: '{name}' },
    { id: 'date-name', label: 'Date + Name', value: '{date}-{name}' },
    { id: 'category-number', label: 'Category + Number', value: '{category}-{num}' },
    { id: 'custom-pattern', label: 'Custom...', value: '' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Settings className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Rename Options</h2>
      </div>
      
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium text-sm ${selectedTab === 'basic' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setSelectedTab('basic')}
        >
          Basic
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${selectedTab === 'advanced' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setSelectedTab('advanced')}
        >
          Advanced
        </button>
      </div>
      
      {selectedTab === 'basic' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rename Pattern
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            >
              {patternTemplates.map(template => (
                <option key={template.id} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
            
            {pattern === '' && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Pattern
                </label>
                <input
                  type="text"
                  placeholder="e.g. {category}_{num}_{name}"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {'{name}'}, {'{ext}'}, {'{num}'}, {'{date}'}, {'{category}'} as placeholders
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                Category
              </div>
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            
            {category === 'custom' && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter custom category"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Hash className="h-4 w-4 mr-1" />
                Start Number
              </div>
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Date Format
              </div>
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              defaultValue="YYYY-MM-DD"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM-DD-YYYY">MM-DD-YYYY</option>
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              <option value="YYYYMMDD">YYYYMMDD</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="preserveExt"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              defaultChecked
            />
            <label htmlFor="preserveExt" className="text-sm text-gray-700">
              Preserve file extensions
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="lowercase"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="lowercase" className="text-sm text-gray-700">
              Convert to lowercase
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="replaceSpaces"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="replaceSpaces" className="text-sm text-gray-700">
              Replace spaces with underscores
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenameControls;