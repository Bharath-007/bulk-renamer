import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      onFilesAdded(fileArray);
    }
  }, [onFilesAdded]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      onFilesAdded(fileArray);
      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = '';
    }
  }, [onFilesAdded]);

  return (
    <div 
      className={`
        border-2 border-dashed rounded-xl p-8 
        transition-all duration-200 ease-in-out
        flex flex-col items-center justify-center
        ${isDragging ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4">
        <div className={`
          p-4 rounded-full 
          ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}
        `}>
          <Upload 
            className={`h-8 w-8 ${isDragging ? 'text-blue-500' : 'text-gray-500'}`} 
          />
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-lg font-medium text-gray-800">
          {isDragging ? 'Drop files here' : 'Drag & drop files'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          or click to browse your device
        </p>
      </div>
      
      <label className="relative inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors cursor-pointer">
        <span>Select Files</span>
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInputChange}
        />
      </label>
      
      <p className="text-xs text-gray-400 mt-4">
        Supports images, videos, PDFs, and other file types
      </p>
    </div>
  );
};

export default FileUploader;