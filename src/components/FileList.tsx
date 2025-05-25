import React from 'react';
import { File, FileImage, FileText, FileVideo, X } from 'lucide-react';
import { FileWithPreview } from '../types';

interface FileListProps {
  files: File[];
  processedFiles: FileWithPreview[];
  onRemove: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, processedFiles, onRemove }) => {
  const getFileIcon = (file: File) => {
    const type = file.type;
    
    if (type.startsWith('image/')) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (type.startsWith('video/')) {
      return <FileVideo className="h-5 w-5 text-purple-500" />;
    } else if (type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
      {files.map((file, index) => (
        <div 
          key={`${file.name}-${index}`}
          className="bg-gray-50 rounded-lg p-3 flex items-center justify-between group hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            {getFileIcon(file)}
            <div className="min-w-0">
              <p className="font-medium text-sm text-gray-700 truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {processedFiles[index] && (
              <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                → {processedFiles[index].newName}
              </div>
            )}
            <button 
              onClick={() => onRemove(index)}
              className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      
      {files.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No files uploaded yet
        </div>
      )}
    </div>
  );
};

export default FileList;