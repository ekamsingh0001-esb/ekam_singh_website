import React, { useState } from 'react';
import { CertificateCategory, CertificateItem, PageRoute } from '../types';
import { CERTIFICATES } from '../data/portfolioData';
import { audioTelemetry } from '../utils/audioTelemetry';
import {
  Award,
  Search,
  ShieldCheck,
  ZoomIn,
  CheckCircle2,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface CertificatesPageProps {
  onRouteChange: (route: PageRoute) => void;
  onSelectCert: (cert: CertificateItem) => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({
  onSelectCert,
}) => {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CertificateCategory; label: string }[] = [
    { id: 'all', label: 'All Credentials' },
    { id: 'technical', label: 'Technical & Enterprise' },
    { id: 'aiml', label: 'AI & Machine Learning' },
    { id: 'mobile', label: 'Mobile Architecture' },
  ];

  const filteredCerts = CERTIFICATES.filter((cert) => {
    const matchesCategory =
      activeCategory === 'all' || cert.category === activeCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuingOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.badgeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skillsAcquired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ===================================================================== */}
      {/* HEADER & SEARCH BAR                                                   */}
      {/* ===================================================================== */}
      <section className="border-b border-white/10 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Verified Credentials // 04</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#e3e2e8] mt-1">
              Official Certificates & Training
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121522] border border-cyan-400/30 text-cyan-300 font-mono-code text-xs">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>4 RECORDED & ACCREDITED</span>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by credential title, issuing body (HPE, IIT Delhi, IBM), or skills..."
              className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#e3e2e8] placeholder:text-[#6b7280] transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  audioTelemetry.playClick(500, 0.04);
                  setActiveCategory(cat.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-code whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'glass-tab-active font-bold'
                    : 'glass-tab-inactive'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CERTIFICATES ARCHIVE GRID                                             */}
      {/* ===================================================================== */}
      <section className="space-y-6">
        {filteredCerts.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
            <p className="text-sm font-mono-code text-[#9ca3af]">
              No credentials matched your search query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-xl glass-btn-primary font-mono-code text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="glass-card rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                {/* Certificate Image Canvas Preview */}
                <div
                  onClick={() => {
                    audioTelemetry.playClick(650, 0.05);
                    onSelectCert(cert);
                  }}
                  className="relative overflow-hidden bg-black/60 aspect-[1.4] cursor-pointer group-hover:brightness-105 transition-all"
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-102 transition-transform duration-300 select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-transparent opacity-75" />

                  {/* Floating Inspect Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg glass-sub-box text-cyan-300 text-xs font-mono-code flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inspect Credential</span>
                  </div>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md glass-sub-box font-mono-code text-[10px] text-cyan-300">
                    {cert.categoryLabel}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-mono-code text-xs">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {cert.issuingOrganization}
                      </span>
                      <span className="text-[#6b7280]">{cert.dateOrYear}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#e3e2e8] group-hover:text-cyan-300 transition-colors pt-1">
                      {cert.title}
                    </h3>

                    <p className="font-body text-xs text-[#9ca3af] leading-relaxed pt-1">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills / Badges */}
                  <div className="pt-2 border-t border-white/[0.06] space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsAcquired.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md glass-sub-box text-cyan-300/90 font-mono-code text-[10px] flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-mono-code text-cyan-400/80">
                      ACCREDITED RECORD
                    </span>
                    <button
                      onClick={() => {
                        audioTelemetry.playClick(620, 0.04);
                        onSelectCert(cert);
                      }}
                      className="px-3.5 py-1.5 rounded-lg glass-btn-primary font-mono-code text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>Full View</span>
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
