/**
 * Generates a new file name based on the provided pattern and other parameters
 */
export const generateNewName = (
  file: File, 
  pattern: string, 
  category: string, 
  index: number
): string => {
  const originalName = file.name;
  const extension = originalName.split('.').pop() || '';
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
  
  // Get current date formatted as YYYY-MM-DD
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  let result = pattern;
  
  // Replace placeholders
  result = result.replace(/{name}/g, nameWithoutExt);
  result = result.replace(/{ext}/g, extension);
  result = result.replace(/{num}/g, String(index).padStart(2, '0'));
  result = result.replace(/{date}/g, date);
  
  // Only add category if it's not 'none'
  if (category !== 'none') {
    result = result.replace(/{category}/g, category);
  } else {
    result = result.replace(/{category}/g, '');
    // Clean up any double dashes that might result from empty category
    result = result.replace(/--/g, '-');
    // Remove leading or trailing dashes
    result = result.replace(/^-|-$/g, '');
  }
  
  // Make sure we always have an extension
  if (!result.endsWith(`.${extension}`)) {
    result = `${result}.${extension}`;
  }
  
  return result;
};

/**
 * Groups files by type
 */
export const groupFilesByType = (files: File[]): Record<string, File[]> => {
  const groups: Record<string, File[]> = {};
  
  files.forEach(file => {
    const type = getFileType(file);
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(file);
  });
  
  return groups;
};

/**
 * Gets the general type of a file
 */
export const getFileType = (file: File): string => {
  const type = file.type;
  
  if (type.startsWith('image/')) {
    return 'image';
  } else if (type.startsWith('video/')) {
    return 'video';
  } else if (type === 'application/pdf') {
    return 'pdf';
  } else if (type.startsWith('audio/')) {
    return 'audio';
  } else if (type.includes('document') || type.includes('text')) {
    return 'document';
  } else {
    return 'other';
  }
};