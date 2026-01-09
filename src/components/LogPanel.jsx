import React from "react";
import { FolderArchive } from "lucide-react";

/**
 * Log panel displaying system messages and progress
 */
const LogPanel = ({ logs, isProcessing, progress }) => {
  return (
    <div className="lg:col-span-2 flex flex-col bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden min-h-[450px] shadow-2xl">
      <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Nhật ký hệ thống
        </span>
        {isProcessing && (
          <span className="text-xs text-amber-500 font-mono">{progress}%</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] space-y-2 scroll-smooth">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-3 opacity-50">
            <FolderArchive size={48} />
            <p className="uppercase tracking-widest text-[10px]">
              Chờ tệp tin đầu vào
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300"
            >
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span
                className={
                  log.type === "success"
                    ? "text-emerald-400"
                    : log.type === "error"
                    ? "text-red-400 font-bold"
                    : log.type === "warning"
                    ? "text-amber-400"
                    : "text-blue-400"
                }
              >
                {log.type === "success"
                  ? "✔"
                  : log.type === "error"
                  ? "✘"
                  : "ℹ"}{" "}
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>

      {isProcessing && (
        <div className="h-1.5 bg-slate-800 w-full relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogPanel;
