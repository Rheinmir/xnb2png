import React, { useState } from "react";
import {
  PARENT_FOLDERS,
  getChildFolders,
  hasChildFolders,
} from "../utils/templateFolders";

const FolderStructureSelector = ({ onSelect }) => {
  const [parent, setParent] = useState("");
  const [child, setChild] = useState("");

  const handleParentChange = (e) => {
    const newVal = e.target.value;
    setParent(newVal);
    setChild("");
    onSelect({ parent: newVal, child: "" });
  };

  const handleChildChange = (e) => {
    const newVal = e.target.value;
    setChild(newVal);
    onSelect({ parent, child: newVal });
  };

  const childFolders = parent ? getChildFolders(parent) : [];
  const showChildSelector = parent && hasChildFolders(parent);

  return (
    <div className="bg-[var(--sdv-cream)] border-2 border-[var(--sdv-brown)] rounded p-4 text-left shadow-inner">
      <h3 className="text-[var(--sdv-brown)] font-bold mb-2 uppercase tracking-wide border-b border-[var(--sdv-border)] pb-1">
        Target Folder
      </h3>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs uppercase font-bold text-[var(--sdv-text)] mb-1">
            Category
          </label>
          <select
            value={parent}
            onChange={handleParentChange}
            className="w-full bg-[#fff] border-2 border-[var(--sdv-border)] rounded p-2 font-['VT323'] text-lg focus:outline-none focus:border-[var(--sdv-orange)] text-[var(--sdv-text)]"
          >
            <option value="">-- Select Category --</option>
            {PARENT_FOLDERS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {showChildSelector && (
          <div className="flex-1">
            <label className="block text-xs uppercase font-bold text-[var(--sdv-text)] mb-1">
              Subfolder
            </label>
            <select
              value={child}
              onChange={handleChildChange}
              className="w-full bg-[#fff] border-2 border-[var(--sdv-border)] rounded p-2 font-['VT323'] text-lg focus:outline-none focus:border-[var(--sdv-orange)] text-[var(--sdv-text)]"
            >
              <option value="">-- Select Subfolder --</option>
              {childFolders.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {parent && (
        <div className="mt-4 text-sm bg-[var(--sdv-menu-bg)] p-2 rounded border border-[var(--sdv-brown)] text-[var(--sdv-text)]">
          Path: Content/{parent}
          {child ? `/${child}` : ""}/
        </div>
      )}
    </div>
  );
};

export default FolderStructureSelector;
