import React from "react";
import { FolderTree, ChevronRight } from "lucide-react";
import {
  PARENT_FOLDERS,
  getChildFolders,
  hasChildFolders,
} from "../utils/templateFolders.js";

/**
 * Folder selector component for choosing target Content folder structure
 */
const FolderSelector = ({
  parentFolder,
  childFolder,
  onParentChange,
  onChildChange,
}) => {
  const childFolders = parentFolder ? getChildFolders(parentFolder) : [];
  const showChildSelector = parentFolder && hasChildFolders(parentFolder);

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <FolderTree size={14} className="text-cyan-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Folder đích
        </span>
      </div>

      <div className="space-y-3">
        {/* Parent Folder Selector */}
        <div>
          <label className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 block">
            Folder mẹ
          </label>
          <select
            value={parentFolder}
            onChange={(e) => {
              onParentChange(e.target.value);
              onChildChange(""); // Reset child when parent changes
            }}
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
          >
            <option value="">-- Không chọn (giữ nguyên đường dẫn) --</option>
            {PARENT_FOLDERS.map((folder) => (
              <option key={folder} value={folder}>
                📁 {folder} {hasChildFolders(folder) ? "▸" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Child Folder Selector (conditional) */}
        {showChildSelector && (
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 block">
                Subfolder
              </label>
              <select
                value={childFolder}
                onChange={(e) => onChildChange(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
              >
                <option value="">-- Không chọn subfolder --</option>
                {childFolders.map((folder) => (
                  <option key={folder} value={folder}>
                    📂 {folder}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Current path preview */}
      {parentFolder && (
        <div className="mt-3 flex items-center gap-2 text-[10px] text-cyan-400/70 bg-cyan-500/5 rounded-lg px-3 py-2">
          <span className="text-slate-500">Đường dẫn:</span>
          <code className="font-mono">
            Content/{parentFolder}
            {childFolder ? `/${childFolder}` : ""}/
          </code>
        </div>
      )}

      <p className="text-[9px] text-slate-500 mt-2 leading-relaxed">
        Files sẽ được đặt vào folder template được chọn. Duplicates sẽ tự động
        đánh số lại.
      </p>
    </div>
  );
};

export default FolderSelector;
