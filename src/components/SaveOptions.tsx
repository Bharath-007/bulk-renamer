import React from 'react';
import { Download, FolderOpen } from 'lucide-react';
import { FileWithPreview } from '../types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface SaveOptionsProps {
  files: FileWithPreview[];
  disabled: boolean;
}

const SaveOptions: React.FC<SaveOptionsProps> = ({ files, disabled }) => {
  const handleDownload = async () => {
    // // // In a real application, we would create a zip file of all the renamed files
    // // alert('In a real application, this would download all renamed files as a zip file.');\
    // --------------------------------------------------------------
    if (files.length === 0) return;
    if (files.length === 1) {
      const fileItem = files[0];
      if (fileItem.file && fileItem.file instanceof File) {
        const renamedFile = new File([fileItem.file], fileItem.newName || fileItem.file.name, {
          type: fileItem.file.type,
          lastModified: fileItem.file.lastModified,
        });
        saveAs(renamedFile, renamedFile.name);
      }
    } else {
      const zip = new JSZip();

      // Add each file to the zip with renamed file name
      files.forEach((fileItem) => {
        if (fileItem.file && fileItem.file instanceof File) {
          // Create a new File object with the new name
          const renamedFile = new File([fileItem.file], fileItem.newName || fileItem.file.name, {
            type: fileItem.file.type,
            lastModified: fileItem.file.lastModified,
          });

          // Add the renamed file to the zip
          zip.file(renamedFile.name, renamedFile);
        }
      });

      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'renamed-files.zip');
    }
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

        {/* <button
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
        </button> */}

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