/**
 * Folder normalizer utility
 * Handles duplicate detection, Stage pattern normalization, and renumbering
 */

/**
 * Extract base name and number from a filename
 * Handles patterns like:
 * - "Abigail_Stage2" → { baseName: "Abigail", number: 2 }
 * - "Abigail_Stage2_Beach" → { baseName: "Abigail_Beach", number: 2 }
 * - "cat 1" → { baseName: "cat", number: 1 }
 * - "cat(1)", "cat_1" → { baseName: "cat", number: 1 }
 * @param {string} filename - Filename without extension
 * @returns {{ baseName: string, number: number | null }}
 */
const parseFilename = (filename) => {
  // First, try to match Stage pattern (highest priority for Stardew Valley mods)
  // Pattern: Name_StageN or Name_StageN_Suffix
  const stagePatterns = [
    /^(.+?)_Stage(\d+)_(.+)$/, // Name_StageN_Suffix → baseName = Name_Suffix
    /^(.+?)_Stage(\d+)$/, // Name_StageN → baseName = Name
  ];

  for (const pattern of stagePatterns) {
    const match = filename.match(pattern);
    if (match) {
      if (match[3]) {
        // Has suffix after Stage number
        return {
          baseName: `${match[1]}_${match[3]}`, // Combine Name + Suffix
          number: parseInt(match[2], 10),
        };
      } else {
        return {
          baseName: match[1],
          number: parseInt(match[2], 10),
        };
      }
    }
  }

  // Fallback patterns for other numbering conventions
  const fallbackPatterns = [
    /^(.+?)\s*\((\d+)\)$/, // name(1), name (1)
    /^(.+?)\s+(\d+)$/, // name 1
    /^(.+?)_(\d+)$/, // name_1
    /^(.+?)-(\d+)$/, // name-1
  ];

  for (const pattern of fallbackPatterns) {
    const match = filename.match(pattern);
    if (match) {
      return {
        baseName: match[1].trim(),
        number: parseInt(match[2], 10),
      };
    }
  }

  // No number suffix found
  return {
    baseName: filename,
    number: null,
  };
};

/**
 * Group files by their base name
 * @param {File[]} files - Array of files
 * @returns {Map<string, Array<{ file: File, number: number | null, originalName: string }>>}
 */
const groupFilesByBaseName = (files) => {
  const groups = new Map();

  for (const file of files) {
    const relativePath = file.webkitRelativePath || file.name;
    const pathParts = relativePath.split("/");
    const filename = pathParts[pathParts.length - 1];
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

    const { baseName, number } = parseFilename(nameWithoutExt);

    if (!groups.has(baseName)) {
      groups.set(baseName, []);
    }

    groups.get(baseName).push({
      file,
      number,
      originalName: filename,
    });
  }

  return groups;
};

/**
 * Normalize files - prioritize higher numbers and renumber
 * Output extension is always .xnb
 * @param {File[]} files - Array of files
 * @param {string} targetFolder - Target folder path (e.g., "Characters/Farmer")
 * @returns {{ normalizedFiles: Array<{ file: File, outputPath: string, originalName: string }>, logs: string[] }}
 */
export const normalizeFiles = (files, targetFolder = "") => {
  const groups = groupFilesByBaseName(files);
  const normalizedFiles = [];
  const logs = [];

  for (const [baseName, items] of groups) {
    if (items.length === 1) {
      // Single file, no duplicate handling needed
      const item = items[0];
      // Always use .xnb extension for output
      const outputPath = targetFolder
        ? `${targetFolder}/${baseName}.xnb`
        : `${baseName}.xnb`;

      normalizedFiles.push({
        file: item.file,
        outputPath,
        originalName: item.originalName,
      });
    } else {
      // Multiple files with same base name - sort by number (higher first)
      const sorted = items.sort((a, b) => {
        // Higher numbers have higher priority
        // null (no number) has lowest priority
        const numA = a.number ?? -1;
        const numB = b.number ?? -1;
        return numB - numA;
      });

      logs.push(
        `📦 Duplicates detected for "${baseName}": ${sorted
          .map((i) => i.originalName)
          .join(", ")}`
      );

      sorted.forEach((item, index) => {
        let newName;

        if (index === 0) {
          // Highest priority gets the base name
          newName = baseName;
        } else {
          // Others get numbered suffix (1, 2, 3, ...)
          newName = `${baseName}${index}`;
        }

        // Always use .xnb extension for output
        const outputPath = targetFolder
          ? `${targetFolder}/${newName}.xnb`
          : `${newName}.xnb`;

        logs.push(`  → ${item.originalName} → ${newName}.xnb`);

        normalizedFiles.push({
          file: item.file,
          outputPath,
          originalName: item.originalName,
        });
      });
    }
  }

  return { normalizedFiles, logs };
};

/**
 * Check if files have duplicates
 * @param {File[]} files - Array of files
 * @returns {boolean}
 */
export const hasDuplicates = (files) => {
  const groups = groupFilesByBaseName(files);
  for (const [, items] of groups) {
    if (items.length > 1) return true;
  }
  return false;
};
