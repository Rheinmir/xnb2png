import React, { useEffect } from "react";
import "./index.css";
import { useJSZip } from "./hooks/useJSZip.js";
import { useFileProcessor, ASSET_SIZES } from "./hooks/useFileProcessor.js";
import Header from "./components/Header.jsx";
import DropZone from "./components/DropZone.jsx";
import LogPanel from "./components/LogPanel.jsx";
import Footer from "./components/Footer.jsx";

/**
 * Main Application Component
 * Stardew XNB Packer Pro - PNG to XNB converter
 */
const App = () => {
  const { status: libStatus, JSZip } = useJSZip();

  const {
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
  } = useFileProcessor({ JSZip, libStatus });

  // Log when JSZip is ready
  useEffect(() => {
    if (libStatus === "ready") {
      addLog("Hệ thống nén (JSZip) đã sẵn sàng.", "success");
    } else if (libStatus === "error") {
      addLog(
        "Không thể tải thư viện JSZip. Vui lòng kiểm tra kết nối mạng.",
        "error"
      );
    }
  }, [libStatus, addLog]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <Header libStatus={libStatus} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DropZone
            files={files}
            fileInputRef={fileInputRef}
            isProcessing={isProcessing}
            libStatus={libStatus}
            assetType={assetType}
            assetSizes={ASSET_SIZES}
            parentFolder={parentFolder}
            childFolder={childFolder}
            onAssetTypeChange={setAssetType}
            onParentFolderChange={setParentFolder}
            onChildFolderChange={setChildFolder}
            onFileChange={handleFileChange}
            onProcess={processFiles}
            onClear={clearFiles}
          />

          <LogPanel
            logs={logs}
            isProcessing={isProcessing}
            progress={progress}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
