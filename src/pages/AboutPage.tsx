import React, { useState } from 'react';
import { PageRoute } from '../types';
import { EDUCATION_JOURNEY, INTEREST_VECTORS } from '../data/portfolioData';
import { audioTelemetry } from '../utils/audioTelemetry';
import {
  School,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Sparkles,
  Palette,
  Terminal,
  Brain,
  Cpu,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onRouteChange: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRouteChange }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'interests'>('timeline');

  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'palette':
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'neurology':
        return <Brain className="w-5 h-5 text-indigo-400" />;
      case 'dns':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'bolt':
        return <Zap className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ===================================================================== */}
      {/* SECTION HEADER                                                        */}
      {/* ===================================================================== */}
      <section className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
          <GraduationCap className="w-4 h-4" />
          <span>Engineering Profile // 02</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#e3e2e8]">
          About Me & Academic Journey
        </h1>
        <p className="font-body text-sm sm:text-base text-[#9ca3af] max-w-3xl leading-relaxed">
          I am a B.Tech Computer Science and Engineering student at{' '}
          <strong className="text-[#e3e2e8]">VIT Vellore</strong>, hailing from South Delhi. Driven by
          a passion for clean code, creative problem-solving, intuitive web design, and building
          useful digital systems that merge engineering rigor with sensory aesthetics.
        </p>

        {/* Toggle Pills */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              setActiveTab('timeline');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'glass-tab-active font-bold'
                : 'glass-tab-inactive'
            }`}
          >
            Education Timeline
          </button>
          <button
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              setActiveTab('interests');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
              activeTab === 'interests'
                ? 'glass-tab-active font-bold'
                : 'glass-tab-inactive'
            }`}
          >
            What I'm Interested In
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 1. EDUCATION TIMELINE                                                 */}
      {/* ===================================================================== */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <School className="w-5 h-5 text-cyan-400" />
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#e3e2e8]">
              Academic Chronology
            </h2>
          </div>
          <span className="text-[11px] font-mono-code text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-400/20">
            VERIFIED INSTITUTIONS
          </span>
        </div>

        {/* Interactive Timeline Tree */}
        <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-indigo-400 before:to-white/20">
          {EDUCATION_JOURNEY.map((item, index) => {
            const isOngoing = item.status === 'Ongoing Degree';
            return (
              <div key={item.id} className="relative group">
                {/* Node indicator */}
                <div
                  className={`absolute -left-[1.85rem] sm:-left-[2.35rem] top-1.5 w-4 h-4 rounded-full ring-4 ring-[#07080d] flex items-center justify-center transition-all ${
                    isOngoing
                      ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'
                      : index === 1
                      ? 'bg-indigo-400'
                      : 'bg-[#6b7280]'
                  }`}
                />

                {/* Card Container */}
                <div className="glass-card p-5 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 space-y-3 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-code text-xs text-cyan-400 font-bold uppercase tracking-wider">
                      {item.stage}
                    </span>
                    <span
                      className={`text-[10px] font-mono-code px-2 py-0.5 rounded ${
                        isOngoing
                          ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-semibold'
                          : 'bg-white/[0.05] text-[#9ca3af]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#f3f4f6]">
                    {item.institution}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex items-center gap-1.5 font-mono-code text-[11px] text-[#6b7280]">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400/80" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. WHAT I'M INTERESTED IN                                             */}
      {/* ===================================================================== */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Core Pillars</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#e3e2e8] mt-1">
              What I'm Interested In
            </h2>
          </div>
          <span className="font-mono-code text-xs text-[#9ca3af]">5 CORE DOMAINS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTEREST_VECTORS.map((vector) => (
            <div
              key={vector.id}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl glass-sub-box flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getInterestIcon(vector.icon)}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                    {vector.title}
                  </h3>
                  <span className="font-mono-code text-[11px] text-[#6b7280] block mt-0.5">
                    {vector.subtitle}
                  </span>
                </div>

                <p className="text-xs text-[#9ca3af] leading-relaxed font-body">
                  {vector.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {vector.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md glass-sub-box font-mono-code text-[10px] text-cyan-300/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Connect CTA Card */}
          <div className="glass-box-elevated p-6 rounded-2xl border border-cyan-400/40 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono-code text-cyan-400 uppercase font-bold">
                LOOKING TO COLLABORATE?
              </span>
              <h3 className="font-heading font-bold text-lg text-[#e3e2e8]">
                Let's Build Something Meaningful
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Whether it's an engineering internship, a 36-hour hackathon lineup, or an experimental web project.
              </p>
            </div>

            <button
              onClick={() => {
                audioTelemetry.playClick(580, 0.05);
                onRouteChange('/contact');
              }}
              className="w-full py-2.5 px-4 rounded-xl glass-btn-primary font-heading font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Dispatch Transmission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
