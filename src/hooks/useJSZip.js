/**
 * Custom hook for loading JSZip library from CDN
 */

import { useState, useEffect, useCallback } from "react";

const JSZIP_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";

/**
 * Hook to load JSZip library dynamically
 * @returns {{ status: 'loading' | 'ready' | 'error', JSZip: object | null }}
 */
export const useJSZip = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (window.JSZip) {
      setStatus("ready");
      return;
    }

    const script = document.createElement("script");
    script.src = JSZIP_CDN;
    script.async = true;

    script.onload = () => setStatus("ready");
    script.onerror = () => setStatus("error");

    document.head.appendChild(script);

    return () => {
      // Cleanup not needed for CDN scripts
    };
  }, []);

  return {
    status,
    JSZip: status === "ready" ? window.JSZip : null,
  };
};
