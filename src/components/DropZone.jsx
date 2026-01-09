import React from "react";
import { Upload, Download, Trash2, Loader2, Settings } from "lucide-react";
import FolderSelector from "./FolderSelector.jsx";

/**
 * Drop zone for file/folder upload with action buttons and asset type selector
 */
const DropZone = ({
  files,
  fileInputRef,
  isProcessing,
  libStatus,
  assetType,
  assetSizes,
  parentFolder,
  childFolder,
  onAssetTypeChange,
  onParentFolderChange,
  onChildFolderChange,
  onFileChange,
  onProcess,
  onClear,
}) => {
  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer
          ${
            files.length > 0
              ? "border-amber-500/50 bg-amber-500/5"
              : "border-slate-800 hover:border-slate-700 bg-slate-900/30"
          }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload
          className={files.length > 0 ? "text-amber-500" : "text-slate-600"}
          size={48}
        />
        <div className="text-center">
          <p className="font-bold text-slate-200">Nạp thư mục hoặc tệp</p>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
            PNG (Hỗ trợ cấu trúc lồng nhau)
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          webkitdirectory="true"
          onChange={onFileChange}
        />
      </div>

      {/* Folder Selector */}
      <FolderSelector
        parentFolder={parentFolder}
        childFolder={childFolder}
        onParentChange={onParentFolderChange}
        onChildChange={onChildFolderChange}
      />

      {/* Asset Type Selector */}
      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Settings size={14} className="text-amber-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Chế độ Resize
          </span>
        </div>
        <select
          value={assetType}
          onChange={(e) => onAssetTypeChange(e.target.value)}
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 transition-colors"
        >
          <option value="auto">🔍 Auto-detect (theo tên file)</option>
          {Object.entries(assetSizes).map(([key, size]) => (
            <option key={key} value={key}>
              {size.label}
            </option>
          ))}
        </select>
        <p className="text-[9px] text-slate-500 mt-2 leading-relaxed">
          Auto-detect: portrait*, sprite*, item*, crop*, craftable*, building*
        </p>
      </div>

      <button
        onClick={onProcess}
        disabled={files.length === 0 || isProcessing || libStatus !== "ready"}
        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all
          ${
            isProcessing || files.length === 0 || libStatus !== "ready"
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/20 text-white active:scale-[0.98]"
          }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Đang chạy...
          </>
        ) : (
          <>
            <Download size={18} /> Đóng gói XNB
          </>
        )}
      </button>

      {files.length > 0 && (
        <button
          onClick={onClear}
          className="w-full py-3 rounded-2xl border border-white/5 text-slate-500 hover:text-red-400 hover:bg-red-400/5 text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={14} /> Xóa danh sách
        </button>
      )}
    </div>
  );
};

export default DropZone;
