import React from 'react';
import { Download, FolderOpen } from 'lucide-react';
import { FileWithPreview } from '../types';

interface SaveOptionsProps {
  files: FileWithPreview[];
  disabled: boolean;
}

const SaveOptions: React.FC<SaveOptionsProps> = ({ files, disabled }) => {
  const handleDownload = () => {
    // In a real application, we would create a zip file of all the renamed files
    alert('In a real application, this would download all renamed files as a zip file.');
  };
  
  const handleSaveAs = () => {
    // In a browser environment, we can't directly save to a folder
    // In an electron app, this would open a folder picker
    alert('In a desktop application, this would open a folder picker dialog.');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Save Files</h2>
      
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          disabled={disabled}
          className={`
            w-full py-2.5 px-4 rounded-md flex items-center justify-center
            ${disabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
            transition-colors
          `}
        >
          <Download className="h-5 w-5 mr-2" />
          Download All
        </button>
        
        <button
          onClick={handleSaveAs}
          disabled={disabled}
          className={`
            w-full py-2.5 px-4 rounded-md border flex items-center justify-center
            ${disabled 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }
            transition-colors
          `}
        >
          <FolderOpen className="h-5 w-5 mr-2" />
          Save to Folder
        </button>
        
        <div className="pt-2">
          <p className="text-xs text-gray-500">
            Note: Some browser limitations may apply. For full functionality, consider using a desktop version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaveOptions;