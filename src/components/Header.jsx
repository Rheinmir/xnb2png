import React from "react";
import { FileCode, CheckCircle2, RefreshCw } from "lucide-react";

/**
 * Header component with app title and JSZip status
 */
const Header = ({ libStatus }) => {
  return (
    <header className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-500/20 text-slate-950">
          <FileCode size={28} />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Stardew XNB Packer Pro
          </h1>
          <p className="text-slate-400 text-xs">
            Chuẩn hóa Premultiplied Alpha &amp; XNA 4.0
          </p>
        </div>
      </div>

      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
          libStatus === "ready"
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
        }`}
      >
        {libStatus === "ready" ? (
          <CheckCircle2 size={12} />
        ) : (
          <RefreshCw size={12} className="animate-spin" />
        )}
        JSZip: {libStatus === "ready" ? "Sẵn sàng" : "Đang nạp..."}
      </div>
    </header>
  );
};

export default Header;
