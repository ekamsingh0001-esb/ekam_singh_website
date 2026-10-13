import React, { useState } from 'react';
import { CertificateItem } from '../types';
import { audioTelemetry } from '../utils/audioTelemetry';
import { X, ZoomIn, ZoomOut, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!cert) return null;

  const handleZoom = (delta: number) => {
    audioTelemetry.playClick(600, 0.03);
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 2.0));
  };

  const handleClose = () => {
    audioTelemetry.playClick(380, 0.04);
    setZoomLevel(1);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl glass-box-elevated border border-cyan-400/40 rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(34,211,238,0.2)] space-y-4 my-auto relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code text-cyan-300 glass-sub-box px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                VERIFIED CREDENTIAL
              </span>
              <span className="text-xs font-mono-code text-[#9ca3af]">{cert.programType}</span>
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#e3e2e8] leading-tight">
              {cert.title}
            </h3>
            <p className="font-mono-code text-xs text-cyan-400/90">{cert.issuingOrganization}</p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Modal"
            className="p-2 rounded-xl glass-btn text-[#9ca3af] hover:text-[#e3e2e8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Area with Zoom Controls */}
        <div className="relative bg-black/60 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center min-h-[320px] max-h-[60vh] p-2">
          {/* Zoom floating controls */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 glass-sub-box p-1.5 rounded-xl border border-white/10 shadow-lg">
            <button
              onClick={() => handleZoom(0.25)}
              title="Zoom In"
              className="p-1 rounded-lg glass-btn text-[#9ca3af] hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono-code text-[#9ca3af] px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom(-0.25)}
              title="Zoom Out"
              className="p-1 rounded-lg glass-btn text-[#9ca3af] hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-auto max-h-full max-w-full flex items-center justify-center p-2">
            <img
              src={cert.imageUrl}
              alt={cert.title}
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              className="max-h-[55vh] w-auto object-contain rounded-lg transition-transform duration-200 select-none shadow-2xl"
            />
          </div>
        </div>

        {/* Description & Competencies */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-body">
            {cert.description}
          </p>

          <div>
            <span className="font-mono-code text-[11px] text-[#e3e2e8] font-bold block mb-1.5">
              COMPETENCIES & DOMAINS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cert.skillsAcquired.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg glass-sub-box text-cyan-300 font-mono-code text-[11px] flex items-center gap-1 font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <a
            href={cert.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono-code text-cyan-400 hover:underline flex items-center gap-1.5"
          >
            <span>Open High-Resolution File</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl glass-btn text-[#e3e2e8] font-mono-code text-xs transition-colors cursor-pointer"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
