import React from 'react';
import { FileIcon } from 'lucide-react';
import AppHeader from './components/AppHeader';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import RenameControls from './components/RenameControls';
import SaveOptions from './components/SaveOptions';
import { useFileManager } from './hooks/useFileManager';

function App() {
  const {
    files,
    addFiles,
    removeFile,
    clearFiles,
    renamePattern,
    setRenamePattern,
    category,
    setCategory,
    processedFiles,
  } = useFileManager();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <FileIcon size={64} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Files Uploaded</h2>
            <p className="text-gray-500 max-w-md mb-8">
              Upload files to begin renaming. You can upload multiple files at once.
            </p>
            <FileUploader onFilesAdded={addFiles} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FileUploader onFilesAdded={addFiles} />
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Files ({files.length})</h2>
                  <button 
                    onClick={clearFiles}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <FileList 
                  files={files} 
                  processedFiles={processedFiles}
                  onRemove={removeFile} 
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <RenameControls 
                pattern={renamePattern}
                setPattern={setRenamePattern}
                category={category}
                setCategory={setCategory}
              />
              
              <SaveOptions 
                files={processedFiles} 
                disabled={files.length === 0} 
              />
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Bulk File Rename Tool &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;