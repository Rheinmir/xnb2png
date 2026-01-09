/**
 * XNB File Creator for XNA 4.0 / Stardew Valley
 * Creates binary XNB texture files from image data
 */

/**
 * Encode integer using 7-bit variable length encoding
 * @param {number} value - Integer to encode
 * @returns {number[]} - Encoded bytes
 */
const encode7BitInt = (value) => {
  const data = [];
  while (value >= 0x80) {
    data.push((value | 0x80) & 0xff);
    value >>= 7;
  }
  data.push(value & 0x7f);
  return data;
};

/**
 * Create XNB binary file from RGBA image data
 * @param {Uint8Array} imageData - Premultiplied RGBA pixel data
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {ArrayBuffer} - XNB file buffer
 */
export const createXNB = (imageData, width, height) => {
  const typeReader =
    "Microsoft.Xna.Framework.Content.Texture2DReader, Microsoft.Xna.Framework.Graphics, Version=4.0.0.0, Culture=neutral, PublicKeyToken=842cf8be1de50553";
  const encoder = new TextEncoder();
  const typeReaderBytes = encoder.encode(typeReader);

  const pixelDataSize = imageData.length;
  const typeReaderLen = encode7BitInt(typeReaderBytes.length);

  // Header(10) + ReaderCount(1) + TypeReaders(Len+Name+4) + Shared(1) + Object(1+20+Pixels)
  const contentSize =
    1 + // Reader count byte (line 62)
    typeReaderLen.length +
    typeReaderBytes.length +
    4 +
    1 +
    1 +
    20 +
    pixelDataSize;

  const buffer = new ArrayBuffer(10 + contentSize);
  const view = new DataView(buffer);
  let offset = 0;

  // --- HEADER ---
  view.setUint8(offset++, 0x58); // X
  view.setUint8(offset++, 0x4e); // N
  view.setUint8(offset++, 0x42); // B
  view.setUint8(offset++, 0x77); // Platform 'w' (Windows)
  view.setUint8(offset++, 5); // Version 5 (XNA 4.0)
  view.setUint8(offset++, 0); // Flags: No compression
  view.setUint32(offset, 10 + contentSize, true);
  offset += 4;

  // --- CONTENT ---
  view.setUint8(offset++, 1); // Reader count
  typeReaderLen.forEach((b) => view.setUint8(offset++, b));
  typeReaderBytes.forEach((b) => view.setUint8(offset++, b));
  view.setUint32(offset, 0, true);
  offset += 4; // Reader version
  view.setUint8(offset++, 0); // Shared resources count

  // --- OBJECT ---
  view.setUint8(offset++, 1); // Type ID
  view.setUint32(offset, 0, true);
  offset += 4; // SurfaceFormat.Color
  view.setUint32(offset, width, true);
  offset += 4;
  view.setUint32(offset, height, true);
  offset += 4;
  view.setUint32(offset, 1, true);
  offset += 4; // MipCount
  view.setUint32(offset, pixelDataSize, true);
  offset += 4;

  const pixels = new Uint8Array(buffer, offset, pixelDataSize);
  pixels.set(imageData);

  return buffer;
};
