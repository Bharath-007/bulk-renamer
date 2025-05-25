import { useState, useEffect } from 'react';
import { FileWithPreview } from '../types';
import { generateNewName } from '../utils/fileUtils';

export const useFileManager = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [renamePattern, setRenamePattern] = useState('{name}');
  const [category, setCategory] = useState('none');
  const [processedFiles, setProcessedFiles] = useState<FileWithPreview[]>([]);

  useEffect(() => {
    if (files.length > 0) {
      const newProcessedFiles = files.map((file, index) => {
        const newName = generateNewName(file, renamePattern, category, index + 1);
        return {
          file,
          originalName: file.name,
          newName,
        };
      });
      
      setProcessedFiles(newProcessedFiles);
    } else {
      setProcessedFiles([]);
    }
  }, [files, renamePattern, category]);

  const addFiles = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    renamePattern,
    setRenamePattern,
    category,
    setCategory,
    processedFiles,
  };
};