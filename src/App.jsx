import React, { useState } from "react";
import "./index.css";
import DropZone from "./components/DropZone";
import FolderStructureSelector from "./components/FolderStructureSelector";
import useFileProcessor from "./hooks/useFileProcessor";
import useJSZip from "./hooks/useJSZip";

function App() {
  const [targetStructure, setTargetStructure] = useState(null);
  const { status: libStatus, JSZip } = useJSZip();
  const { files, processFiles, clearFiles } = useFileProcessor({
    JSZip,
    libStatus,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      // processFiles handles the actual conversion and download internally
      await processFiles(files, targetStructure);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Conversion failed!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div
        className="max-w-4xl w-full mx-auto p-8 rounded-xl shadow-2xl relative"
        style={{
          backgroundColor: "var(--sdv-menu-bg)",
          border: "8px solid var(--sdv-border)",
          boxShadow: "8px 8px 0 rgba(0,0,0,0.4)",
        }}
      >
        {/* Decorative corner screws */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-[var(--sdv-brown)] rounded-full border-2 border-[var(--sdv-cream)]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 bg-[var(--sdv-brown)] rounded-full border-2 border-[var(--sdv-cream)]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--sdv-brown)] rounded-full border-2 border-[var(--sdv-cream)]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-[var(--sdv-brown)] rounded-full border-2 border-[var(--sdv-cream)]"></div>

        <h1 className="text-5xl font-bold mb-8 text-[var(--sdv-brown)] drop-shadow-md text-center">
          Stardew XNB Converter
        </h1>

        <div className="space-y-8 bg-[var(--sdv-cream)] p-6 rounded-lg border-4 border-[var(--sdv-border)]">
          <FolderStructureSelector onSelect={setTargetStructure} />

          <DropZone onFilesAdded={processFiles} files={files} />

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={clearFiles}
              className="px-8 py-3 text-xl hover:bg-red-400 hover:text-white transition-colors"
              style={{ backgroundColor: "#ff6b6b" }}
            >
              Clear
            </button>
            <button
              onClick={handleConvert}
              disabled={files.length === 0 || isProcessing}
              className="px-8 py-3 text-xl font-bold"
            >
              {isProcessing ? "Processing..." : "CONVERT!"}
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-[var(--sdv-brown)] text-sm opacity-80">
          <p>Drag & drop PNG files to convert to XNB</p>
        </div>
      </div>
    </div>
  );
}

export default App;
