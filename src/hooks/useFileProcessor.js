/**
 * Custom hook for file processing logic
 */

import { useState, useRef, useCallback } from "react";
import { processImageToXNB, ASSET_SIZES } from "../utils/imageProcessor.js";
import { normalizeFiles } from "../utils/folderNormalizer.js";
import { buildFolderPath } from "../utils/templateFolders.js";

/**
 * Generate unique ID for logs
 */
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * Hook for managing file processing state and logic
 * @param {object} options
 * @param {object} options.JSZip - JSZip constructor
 * @param {string} options.libStatus - Library loading status
 * @returns {object} File processor state and methods
 */
export const useFileProcessor = ({ JSZip, libStatus }) => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [assetType, setAssetType] = useState("auto"); // 'auto' or specific type
  const [parentFolder, setParentFolder] = useState(""); // Selected parent folder
  const [childFolder, setChildFolder] = useState(""); // Selected child folder
  const fileInputRef = useRef(null);

  const addLog = useCallback((message, type = "info") => {
    setLogs((prev) =>
      [
        ...prev,
        {
          message,
          type,
          id: generateId(),
          time: new Date().toLocaleTimeString(),
        },
      ].slice(-50)
    );
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files).filter((f) =>
        f.name.toLowerCase().endsWith(".png")
      );
      setFiles(selectedFiles);
      addLog(`Đã nạp ${selectedFiles.length} tệp PNG.`);
    },
    [addLog]
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
    setLogs([]);
    setProgress(0);
  }, []);

  const processFiles = useCallback(
    async (filesList = files, structure = null) => {
      if (libStatus !== "ready" || !JSZip) {
        addLog("Lỗi: Thư viện JSZip chưa tải xong.", "error");
        return;
      }
      if (!filesList || filesList.length === 0) return;

      setIsProcessing(true);
      setLogs([]);
      setProgress(0);

      const zip = new JSZip();
      let successCount = 0;

      // Log resize mode
      if (assetType === "auto") {
        addLog("Chế độ: Auto-detect theo tên file", "info");
      } else {
        const sizeInfo = ASSET_SIZES[assetType];
        addLog(`Chế độ: ${sizeInfo.label}`, "info");
      }

      // Build target folder path from argument OR internal state
      let pFolder = parentFolder;
      let cFolder = childFolder;

      if (structure) {
        pFolder = structure.parent || "";
        cFolder = structure.child || "";
      }

      const targetFolder = buildFolderPath(pFolder, cFolder);
      if (targetFolder) {
        addLog(`📁 Folder đích: Content/${targetFolder}/`, "info");
      }

      // Normalize files (handle duplicates)
      const { normalizedFiles, logs: normLogs } = normalizeFiles(
        filesList,
        targetFolder
      );

      // Log normalization info
      normLogs.forEach((log) => addLog(log, "info"));

      try {
        const processedFilesList = [];
        for (let i = 0; i < normalizedFiles.length; i++) {
          const { file, outputPath } = normalizedFiles[i];

          if (!file.name.toLowerCase().endsWith(".png")) continue;

          try {
            const { buffer, resizeInfo } = await processImageToXNB(file, {
              assetType,
            });
            zip.file(outputPath, buffer);
            addLog(`✔ ${outputPath} (${resizeInfo})`, "success");
            successCount++;

            processedFilesList.push({ path: outputPath, buffer });
          } catch (err) {
            addLog(`Lỗi xử lý ${file.name}: ${err.message}`, "error");
          }

          setProgress(Math.round(((i + 1) / normalizedFiles.length) * 100));
        }

        if (successCount > 0) {
          // Return valid return for the caller to handle zip generation if needed
          // But the previous implementation did zip generation here.
          // The new App.jsx calls `generateZip` from useJSZip separately?
          // Wait, App.jsx has: `await generateZip(processedFiles);`
          // So this function should return the processed files (buffers/blobs)
          // OR the zip object itself.

          // Let's modify this to return the processed data so App.jsx can handle zipping
          // OR keep zipping here.
          // App.jsx calls `await generateZip(processedFiles)`.
          // Let's look at `useJSZip.js` to see what `generateZip` does.
          // Ideally we shouldn't mix responsibilities.
          // For now, I will KEEP the zipping logic HERE to avoid breaking too much,
          // but I will also return the list just in case.

          addLog("Đang nén kết quả...", "info");
          const content = await zip.generateAsync({ type: "blob" });
          const url = URL.createObjectURL(content);
          const link = document.createElement("a");
          link.href = url;
          link.download = `Stardew_Mod_Assets_${Date.now()}.zip`;
          link.click();
          URL.revokeObjectURL(url);
          addLog(`Hoàn tất! Đã tạo ${successCount} tệp XNB.`, "success");
          return processedFilesList;
        }
      } catch (err) {
        addLog(`Lỗi hệ thống: ${err.message}`, "error");
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [files, JSZip, libStatus, assetType, parentFolder, childFolder, addLog]
  );

  return {
    files,
    isProcessing,
    logs,
    progress,
    fileInputRef,
    assetType,
    setAssetType,
    parentFolder,
    setParentFolder,
    childFolder,
    setChildFolder,
    addLog,
    handleFileChange,
    clearFiles,
    processFiles,
  };
};

// Re-export ASSET_SIZES for UI
export { ASSET_SIZES };
