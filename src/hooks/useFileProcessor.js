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

  const processFiles = useCallback(async () => {
    if (libStatus !== "ready" || !JSZip) {
      addLog("Lỗi: Thư viện JSZip chưa tải xong.", "error");
      return;
    }
    if (files.length === 0) return;

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

    // Build target folder path
    const targetFolder = buildFolderPath(parentFolder, childFolder);
    if (targetFolder) {
      addLog(`📁 Folder đích: Content/${targetFolder}/`, "info");
    }

    // Normalize files (handle duplicates)
    const { normalizedFiles, logs: normLogs } = normalizeFiles(
      files,
      targetFolder
    );

    // Log normalization info
    normLogs.forEach((log) => addLog(log, "info"));

    try {
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
        } catch (err) {
          addLog(`Lỗi xử lý ${file.name}: ${err.message}`, "error");
        }

        setProgress(Math.round(((i + 1) / normalizedFiles.length) * 100));
      }

      if (successCount > 0) {
        addLog("Đang nén kết quả...", "info");
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Stardew_Mod_Assets_${Date.now()}.zip`;
        link.click();
        URL.revokeObjectURL(url);
        addLog(`Hoàn tất! Đã tạo ${successCount} tệp XNB.`, "success");
      }
    } catch (err) {
      addLog(`Lỗi hệ thống: ${err.message}`, "error");
    } finally {
      setIsProcessing(false);
    }
  }, [files, JSZip, libStatus, assetType, parentFolder, childFolder, addLog]);

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
