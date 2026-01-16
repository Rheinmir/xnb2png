# Business Logic

## Domain Rules (Stardew Valley Modding)
- **XNB Format**: The proprietary binary format used by Stardew Valley for game assets. This tool wraps PNG data into a valid XNB container without re-encoding the image data itself (likely using a specific header wrapper for PNG compat).
- **Folder Structure**: Mods must follow specific directory heirarchies (e.g., `Characters/`, `Portraits/`).
- **Naming Conventions**: Files generally need specific names (e.g., `Abigail.xnb`) to replace game assets.

## Algorithms
- **Folder Normalization (`folderNormalizer.js`)**:
  - Detects patterns in file names (e.g., `Abigail_Stage2.png`).
  - Maps them to standard game paths.
  - Handles duplicate/versioned filenames (e.g., `name 3` vs `name 2`) by prioritizing or renumbering.
  
- **XNB Conversion (`xnb.js`)**:
  - Reads PNG binary data.
  - Prepends XNB file headers required by the XNA Framework/MonoGame.
  - Calculates file size metrics to ensure valid headers.

- **Resizing (`resizer.js`)**:
  - provides logic to scale pixel art assets while preserving crisp edges (likely Nearest Neighbor interpolation or similar context).

## Constraints
- **Browser-Based**: All processing happens in the browser; no server-side conversion to ensure user privacy and speed.
- **File Types**: Input restricted primarily to PNG images.
