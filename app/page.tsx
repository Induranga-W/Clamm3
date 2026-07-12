"use client";

import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";

type ErrorLevel = "L" | "M" | "Q" | "H";

const PRESETS = [
  { label: "URL",   placeholder: "https://example.com", prefix: "",        suffix: "" },
  { label: "Email", placeholder: "hello@example.com",   prefix: "mailto:", suffix: "" },
  { label: "Phone", placeholder: "+1 555 000 0000",     prefix: "tel:",    suffix: "" },
  { label: "SMS",   placeholder: "+1 555 000 0000",     prefix: "sms:",    suffix: "" },
  { label: "Wi-Fi", placeholder: "NetworkName",         prefix: "WIFI:S:", suffix: ";;;" },
  { label: "Text",  placeholder: "Any text…",           prefix: "",        suffix: "" },
];

const COLORS = [
  { fg: "#0a0a0a", bg: "#ffffff", label: "Classic"  },
  { fg: "#1a1a2e", bg: "#e8f4f8", label: "Ocean"    },
  { fg: "#2d1b69", bg: "#f5f0ff", label: "Violet"   },
  { fg: "#0f3d2e", bg: "#e8f5ef", label: "Forest"   },
  { fg: "#7c2d12", bg: "#fff7ed", label: "Ember"    },
  { fg: "#ffffff", bg: "#0a0a0a", label: "Inverted" },
  { fg: "#ffa2a2", bg: "#000000", label: "RedBlack" },
  { fg: "#008cff", bg: "#ffffff", label: "BlueWhite" },
];

const EC_HINTS: Record<ErrorLevel, string> = {
  L: "7% data recovery — smallest code",
  M: "15% data recovery — recommended",
  Q: "25% data recovery — good for logos",
  H: "30% data recovery — maximum",
};

export default function QRGenerator() {
  const [input, setInput]           = useState("https://");
  const [preset, setPreset]         = useState(0);
  const [colorIdx, setColorIdx]     = useState(0);
  const [size, setSize]             = useState(300);
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("M");
  const [qrDataUrl, setQrDataUrl]   = useState<string | null>(null);
  const [hasError, setHasError]     = useState(false);

  const generate = useCallback(async () => {
    if (!input.trim()) { setQrDataUrl(null); return; }
    try {
      const value = PRESETS[preset].prefix + input + PRESETS[preset].suffix;
      const url = await QRCode.toDataURL(value, {
        width: size,
        margin: 2,
        color: { dark: COLORS[colorIdx].fg, light: COLORS[colorIdx].bg },
        errorCorrectionLevel: errorLevel,
      });
      setQrDataUrl(url);
      setHasError(false);
    } catch {
      setHasError(true);
      setQrDataUrl(null);
    }
  }, [input, preset, colorIdx, size, errorLevel]);

  useEffect(() => { generate(); }, [generate]);

  const download = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;
    const res  = await fetch(qrDataUrl);
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  };

  return (
    <main className="qr-page">
      <header className="qr-header">
        <div className="qr-logo">
          <span className="qr-logo__bracket">[</span>QR<span className="qr-logo__bracket">]</span>
        </div>
        <h1 className="qr-title">QR Code Generator</h1>
        <p className="qr-subtitle">Instant, customizable QR codes — no tracking, no limits.</p>
      </header>

      <div className="qr-layout">
        {/* ── Left panel ── */}
        <section className="qr-panel">
          <div className="qr-field">
            <label className="qr-label">Type</label>
            <div className="qr-tabs">
              {PRESETS.map((p, i) => (
                <button
                  key={p.label}
                  className={`qr-tab${preset === i ? " qr-tab--active" : ""}`}
                  onClick={() => { setPreset(i); setInput(""); }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="qr-field">
            <label className="qr-label">Content</label>
            {PRESETS[preset].prefix && (
              <span className="qr-prefix">{PRESETS[preset].prefix}</span>
            )}
            <input
              className="qr-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={PRESETS[preset].placeholder}
            />
          </div>

          <div className="qr-field">
            <label className="qr-label">Color scheme</label>
            <div className="qr-color-grid">
              {COLORS.map((c, i) => (
                <button
                  key={c.label}
                  className={`qr-swatch${colorIdx === i ? " qr-swatch--active" : ""}`}
                  style={{ background: c.bg, borderColor: colorIdx === i ? c.fg : "transparent", color: c.fg }}
                  onClick={() => setColorIdx(i)}
                  title={c.label}
                >
                  {c.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="qr-field">
            <label className="qr-label">
              Size <span className="qr-label__meta">{size}px</span>
            </label>
            <input
              type="range"
              min={128} max={600} step={8}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="qr-range"
            />
          </div>

          <div className="qr-field">
            <label className="qr-label">Error correction</label>
            <div className="qr-tabs">
              {(["L", "M", "Q", "H"] as ErrorLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  className={`qr-tab${errorLevel === lvl ? " qr-tab--active" : ""}`}
                  onClick={() => setErrorLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="qr-hint">{EC_HINTS[errorLevel]}</p>
          </div>
        </section>

        {/* ── Right panel ── */}
        <section className="qr-preview">
          <div
            className="qr-frame"
            style={{ background: COLORS[colorIdx].bg }}
          >
            {qrDataUrl && !hasError ? (
              <img src={qrDataUrl} alt="Generated QR Code" className="qr-image" />
            ) : hasError ? (
              <p className="qr-placeholder qr-placeholder--error">Input too long</p>
            ) : (
              <p className="qr-placeholder">Enter content →</p>
            )}
          </div>

          <div className="qr-actions">
            <button className="qr-btn qr-btn--primary" onClick={download} disabled={!qrDataUrl}>
              Download PNG
            </button>
            <button className="qr-btn qr-btn--secondary" onClick={copyToClipboard} disabled={!qrDataUrl}>
              Copy image
            </button>
          </div>

          {qrDataUrl && (
            <div className="qr-meta">
              <span className="qr-meta__item">
                <span className="qr-meta__dot" style={{ background: COLORS[colorIdx].fg }} />
                {COLORS[colorIdx].label}
              </span>
              <span className="qr-meta__item">{size}×{size}px</span>
              <span className="qr-meta__item">EC: {errorLevel}</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}