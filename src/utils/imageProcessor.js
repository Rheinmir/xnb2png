/**
 * Image Processing Utilities for XNB conversion
 */

import { createXNB } from "./xnb.js";
import {
  ASSET_SIZES,
  detectAssetType,
  resizeImage,
  getResizeInfo,
} from "./resizer.js";

/**
 * Apply premultiplied alpha to RGBA data
 * Required for proper transparency in XNA/Stardew Valley
 * @param {Uint8Array} data - RGBA pixel data
 * @returns {Uint8Array} - Processed pixel data
 */
export const premultiplyAlpha = (data) => {
  // data is Uint8ClampedArray, need to convert properly
  const result = new Uint8Array(data.length);
  result.set(data);
  for (let i = 0; i < result.length; i += 4) {
    const alpha = result[i + 3] / 255;
    result[i] = Math.round(result[i] * alpha); // R
    result[i + 1] = Math.round(result[i + 1] * alpha); // G
    result[i + 2] = Math.round(result[i + 2] * alpha); // B
  }
  return result;
};

/**
 * Process a PNG file and convert to XNB format
 * @param {File} file - PNG file to process
 * @param {object} options - Processing options
 * @param {string} options.assetType - Asset type for resize ('auto' for auto-detect)
 * @returns {Promise<{buffer: ArrayBuffer, outputPath: string, resizeInfo: string}>}
 */
export const processImageToXNB = async (file, options = {}) => {
  const bitmap = await createImageBitmap(file);

  // Determine asset type
  let assetType = options.assetType || "auto";
  if (assetType === "auto") {
    assetType = detectAssetType(file.name);
  }

  // Get target size
  const targetSize = ASSET_SIZES[assetType] || ASSET_SIZES.original;

  // Get resize info for logging
  const resizeInfo = getResizeInfo(bitmap, assetType);

  // Resize image
  const { canvas, width, height } = resizeImage(
    bitmap,
    targetSize.width,
    targetSize.height
  );

  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const processedData = premultiplyAlpha(imageData);
  const xnbBuffer = createXNB(processedData, width, height);

  // Clean up
  bitmap.close();

  const relativePath = file.webkitRelativePath || file.name;
  const outputPath = relativePath.replace(/\.[^/.]+$/, "") + ".xnb";

  return { buffer: xnbBuffer, outputPath, resizeInfo };
};

// Re-export for use in components
export { ASSET_SIZES, detectAssetType };
