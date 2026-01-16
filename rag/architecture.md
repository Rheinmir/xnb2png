# Architecture

## System Context
- **Purpose**: A client-side web application for Stardew Valley modders to convert PNG images into XNB format, including folder normalization and resizing tools.
- **Platform**: Web (React/Vite).

## Directory Structure
```text
project_root/
├── src/
│   ├── components/       # UI Components (DropZone, Header, etc.)
│   ├── hooks/            # Custom Hooks (useFileProcessor)
│   ├── utils/            # Core Business Logic (Conversion, Resizing)
│   ├── App.jsx           # Main Application Entry
│   └── index.css         # Global Styles (Tailwind)
├── rag/                  # RAG Documentation context
├── Dockerfile            # Container definition
├── Jenkinsfile           # CI/CD Pipeline
└── vite.config.js        # Vite Configuration
```

## Key Data Flows
1. **File Input**: User drops files onto `DropZone`.
2. **Processing Orchestration**: `useFileProcessor` hook receives files.
3. **Normalization**: `utils/folderNormalizer.js` organizes files into Stardew Valley standard structure.
4. **Image Processing**: `utils/imageProcessor.js` iterates through files.
   - **Resizing**: `utils/resizer.js` (if enabled) scales images.
   - **Conversion**: `utils/xnb.js` packs PNG data into XNB binary format.
5. **Output**: Application generates a ZIP file containing the structured XNB files for download.
