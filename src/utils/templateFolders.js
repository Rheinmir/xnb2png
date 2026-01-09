/**
 * Template folder structure configuration
 * Based on Stardew Valley Content folder structure
 */

/**
 * Parent folders in Content directory
 */
export const PARENT_FOLDERS = [
  "Animals",
  "Buildings",
  "Characters",
  "Data",
  "Effects",
  "Fonts",
  "LooseSprites",
  "Maps",
  "Minigames",
  "Portraits",
  "Strings",
  "TerrainFeatures",
  "TileSheets",
  "VolcanoLayouts",
];

/**
 * Child folders for each parent (only parents with subfolders)
 */
export const CHILD_FOLDERS = {
  Characters: ["Dialogue", "Farmer", "Monsters", "schedules"],
  LooseSprites: ["Lighting"],
};

/**
 * Get child folders for a parent folder
 * @param {string} parentFolder - Parent folder name
 * @returns {string[]} Array of child folder names, empty if no children
 */
export const getChildFolders = (parentFolder) => {
  return CHILD_FOLDERS[parentFolder] || [];
};

/**
 * Check if a parent folder has children
 * @param {string} parentFolder - Parent folder name
 * @returns {boolean}
 */
export const hasChildFolders = (parentFolder) => {
  return CHILD_FOLDERS[parentFolder]?.length > 0;
};

/**
 * Build the full folder path
 * @param {string} parentFolder - Parent folder name
 * @param {string} childFolder - Optional child folder name
 * @returns {string} Full folder path
 */
export const buildFolderPath = (parentFolder, childFolder = null) => {
  if (!parentFolder) return "";
  if (childFolder) {
    return `${parentFolder}/${childFolder}`;
  }
  return parentFolder;
};
