"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import type { Dictionary } from "@/lib/i18n";

export function QRShare({ dict }: { dict: Dictionary }) {
  const t = dict.signer_page;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const pageUrl = window.location.href;
    setUrl(pageUrl);

    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        pageUrl,
        {
          width: 180,
          margin: 2,
          color: { dark: "#1A3A5C", light: "#ffffff" },
          errorCorrectionLevel: "H",
        },
        () => {}
      );
    }
  }, []);

  function downloadQR() {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.download = "qrcode-unfrancparmille.png";
    a.href = canvasRef.current.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="text-center">
      <div className="inline-block p-4 bg-white border-[3px] border-bleu rounded mx-auto my-4">
        <canvas ref={canvasRef} />
      </div>
      <div className="text-xs text-texte-leger break-all mx-0 my-3 p-2 bg-gris rounded font-mono">
        {url || dict.common.loading}
      </div>
      <p className="text-sm text-texte-leger leading-relaxed mb-4">
        {t.qr_instruction}
      </p>
      <button
        onClick={downloadQR}
        className="inline-block bg-gris text-bleu border-2 border-bleu font-semibold text-sm px-4 py-2 rounded-sm hover:bg-bleu hover:text-blanc transition-all cursor-pointer"
      >
        ↓ {t.qr_download}
      </button>
    </div>
  );
}
