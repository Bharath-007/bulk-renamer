import React from 'react';
import { Layers } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">Bulk Rename</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            GitHub
          </a>
          <span className="text-gray-300">|</span>
          <a 
            href="#help" 
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            Help
          </a>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;