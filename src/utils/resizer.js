/**
 * Stardew Valley Asset Size Definitions and Resize Utilities
 */

// Standard asset sizes for Stardew Valley
export const ASSET_SIZES = {
  portrait: { width: 64, height: 64, label: "Portrait (64×64)" },
  sprite: { width: 16, height: 32, label: "Character Sprite (16×32)" },
  item: { width: 16, height: 16, label: "Item/Object (16×16)" },
  crop: { width: 16, height: 32, label: "Crop Sprite (16×32)" },
  bigCraftable: { width: 16, height: 32, label: "Big Craftable (16×32)" },
  building: { width: 96, height: 96, label: "Building (96×96)" },
  original: { width: null, height: null, label: "Giữ nguyên kích thước gốc" },
};

// Filename patterns for auto-detection
const FILENAME_PATTERNS = [
  { pattern: /portrait/i, type: "portrait" },
  { pattern: /sprite/i, type: "sprite" },
  { pattern: /item|object/i, type: "item" },
  { pattern: /crop/i, type: "crop" },
  { pattern: /craftable/i, type: "bigCraftable" },
  { pattern: /building/i, type: "building" },
];

/**
 * Auto-detect asset type from filename
 * @param {string} filename
 * @returns {string} Asset type key
 */
export const detectAssetType = (filename) => {
  for (const { pattern, type } of FILENAME_PATTERNS) {
    if (pattern.test(filename)) {
      return type;
    }
  }
  return "original"; // Default: keep original size
};

/**
 * Resize image to target dimensions using canvas
 * Uses nearest-neighbor for pixel art preservation
 * @param {ImageBitmap} bitmap - Source image
 * @param {number} targetWidth - Target width
 * @param {number} targetHeight - Target height
 * @returns {{ canvas: HTMLCanvasElement, width: number, height: number }}
 */
export const resizeImage = (bitmap, targetWidth, targetHeight) => {
  // If no resize needed, return original dimensions
  if (!targetWidth || !targetHeight) {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bitmap, 0, 0);
    return { canvas, width: bitmap.width, height: bitmap.height };
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  // Disable image smoothing for pixel-perfect scaling
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  return { canvas, width: targetWidth, height: targetHeight };
};

/**
 * Get resize info for logging
 * @param {ImageBitmap} bitmap - Original bitmap
 * @param {string} assetType - Asset type key
 * @returns {string} Resize description
 */
export const getResizeInfo = (bitmap, assetType) => {
  const size = ASSET_SIZES[assetType];
  if (!size.width || !size.height) {
    return `Giữ nguyên ${bitmap.width}×${bitmap.height}`;
  }
  if (bitmap.width === size.width && bitmap.height === size.height) {
    return `Đã đúng kích thước ${size.width}×${size.height}`;
  }
  return `Resize ${bitmap.width}×${bitmap.height} → ${size.width}×${size.height}`;
};
