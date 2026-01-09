import React from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ onFilesAdded, files }) => {
  const onDrop = (acceptedFiles) => {
    onFilesAdded(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
    },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-4 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all
          ${
            isDragActive
              ? "border-[var(--sdv-orange)] bg-[var(--sdv-highlight)] scale-102"
              : "border-[var(--sdv-brown)] hover:bg-[var(--sdv-cream)] hover:border-[var(--sdv-orange)]"
          }
        `}
        style={{
          backgroundColor: "rgba(255, 235, 205, 0.5)",
        }}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          <div className="text-6xl animate-bounce">📦</div>
          {isDragActive ? (
            <p className="text-xl font-bold text-[var(--sdv-orange)]">
              Drop items here!
            </p>
          ) : (
            <div>
              <p className="text-xl font-bold text-[var(--sdv-brown)]">
                Drag & drop PNG files here
              </p>
              <p className="text-sm opacity-70 mt-2">
                or click to open inventory
              </p>
            </div>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group bg-[var(--sdv-menu-bg)] p-2 rounded border-2 border-[var(--sdv-border)] shadow-sm"
            >
              <div className="aspect-square mb-2 overflow-hidden rounded bg-[var(--sdv-cream)] flex items-center justify-center border border-[var(--sdv-border)]">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-2xl">📄</span>
                )}
              </div>
              <p
                className="text-xs truncate font-bold text-[var(--sdv-border)]"
                title={file.name}
              >
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZone;
