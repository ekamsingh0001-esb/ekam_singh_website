import React, { useState } from 'react';
import { PageRoute, ProjectItem, CertificateItem } from '../types';
import { PERSONAL_INFO, PROJECTS, CERTIFICATES } from '../data/portfolioData';
import { audioTelemetry } from '../utils/audioTelemetry';
import {
  ArrowRight,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  ChevronDown,
  Clock,
  Heart,
  TrendingUp,
  WifiOff,
  Eye,
  Activity,
  Github,
  ExternalLink,
  Waves,
  Radio,
  Smartphone,
  Globe,
} from 'lucide-react';

interface HomePageProps {
  onRouteChange: (route: PageRoute) => void;
  onSelectProject: (proj: ProjectItem) => void;
  onSelectCert: (cert: CertificateItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onRouteChange,
  onSelectProject,
  onSelectCert,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('synapse-engine');
  const featuredProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* ===================================================================== */}
      {/* HERO SECTION                                                          */}
      {/* ===================================================================== */}
      <section className="relative min-h-[82vh] flex flex-col justify-center pt-8 pb-12 overflow-hidden rounded-3xl glass-box-elevated px-6 sm:px-12 lg:px-16 shadow-[0_0_50px_rgba(34,211,238,0.12)]">
        {/* Subtle grid and accent background highlights */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-sub-box text-[#e3e2e8] font-mono-code text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-cyan-300 font-medium">{PERSONAL_INFO.availability}</span>
          </div>

          {/* Hero Name & Editorial Headline */}
          <div className="space-y-3">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f3f4f6] uppercase">
              Ekam{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                Singh
              </span>
            </h1>
            <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-300 tracking-tight">
              {PERSONAL_INFO.headline}
            </p>
          </div>

          {/* Bio introduction */}
          <p className="font-body text-base sm:text-lg text-[#9ca3af] max-w-2xl leading-relaxed">
            B.Tech Computer Science and Engineering student at{' '}
            <strong className="text-[#f3f4f6] font-semibold">VIT Vellore</strong>, hailing from South Delhi.
            Focused on web design, creative frontend architectures, AI integrations, and rapid hackathon prototypes.
          </p>

          {/* Live Telemetry Tags */}
          <div className="flex flex-wrap gap-2.5 pt-1 font-mono-code text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-sub-box text-[#9ca3af]">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Current Focus: <strong className="text-[#f3f4f6]">WebGL Shaders & Neural Nets</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-sub-box text-[#9ca3af]">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Location: <strong className="text-[#f3f4f6]">South Delhi // VIT Vellore</strong></span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                audioTelemetry.playClick(620, 0.05);
                onRouteChange('/projects');
              }}
              className="px-6 py-3.5 rounded-xl glass-btn-primary font-heading font-bold text-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                audioTelemetry.playClick(520, 0.05);
                onRouteChange('/contact');
              }}
              className="px-6 py-3.5 rounded-xl glass-btn-secondary hover:border-cyan-400/60 text-[#e3e2e8] font-heading font-semibold text-sm flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Let's Connect</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="relative z-10 mt-14 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="block font-mono-code text-[#6b7280] text-[11px]">DEGREE PROGRAM</span>
            <span className="font-heading font-bold text-sm sm:text-base text-[#e3e2e8]">
              B.Tech in CSE
            </span>
          </div>
          <div>
            <span className="block font-mono-code text-[#6b7280] text-[11px]">INSTITUTION</span>
            <span className="font-heading font-bold text-sm sm:text-base text-cyan-400">
              VIT Vellore
            </span>
          </div>
          <div>
            <span className="block font-mono-code text-[#6b7280] text-[11px]">HOMETOWN</span>
            <span className="font-heading font-bold text-sm sm:text-base text-[#e3e2e8]">
              South Delhi, IN
            </span>
          </div>
          <div>
            <span className="block font-mono-code text-[#6b7280] text-[11px]">CREDENTIALS</span>
            <span className="font-heading font-bold text-sm sm:text-base text-indigo-300">
              4 Official Certificates
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FEATURED WORK SPOTLIGHT                                               */}
      {/* ===================================================================== */}
      {/* ===================================================================== */}
      {/* FEATURED WORK SPOTLIGHT (Interactive Box for Every Project)           */}
      {/* ===================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Project Blueprint Spotlight</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#e3e2e8] mt-1">
              {featuredProject.title}
            </h2>
          </div>
          <button
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              onRouteChange('/projects');
            }}
            className="text-xs font-mono-code text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer w-fit"
          >
            All Projects & Categories ({PROJECTS.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                audioTelemetry.playClick(540, 0.04);
                setSelectedProjectId(p.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap cursor-pointer ${
                selectedProjectId === p.id
                  ? 'glass-tab-active font-bold'
                  : 'glass-tab-inactive'
              }`}
            >
              {p.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        {/* Big Spotlight Box (Matching Synapse Box Specification) */}
        <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono-code uppercase font-bold bg-cyan-400 text-[#07080d]">
                  {featuredProject.categoryLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono-code bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                  {featuredProject.status}
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                {featuredProject.title}
              </h3>

              <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed font-body">
                {featuredProject.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 font-mono-code text-xs">
                {featuredProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg glass-sub-box text-cyan-300 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    audioTelemetry.playClick(600, 0.04);
                    onSelectProject(featuredProject);
                  }}
                  className="px-5 py-2.5 rounded-xl glass-btn-primary font-heading font-bold text-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Inspect Case Study</span>
                </button>

                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl glass-btn-secondary hover:border-cyan-400/60 text-[#e3e2e8] font-mono-code text-xs flex items-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>Inspect Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af]" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Side Visualizer Box */}
            {selectedProjectId === 'synapse-engine' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-cyan-300 font-bold">GLSL_DISPLACEMENT_MAP</span>
                  <span className="text-cyan-400 font-mono-code">60 FPS</span>
                </div>
                <div className="flex items-center justify-center gap-3 py-2">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-cyan-400/40 flex items-center justify-center animate-spin [animation-duration:12s]">
                      <div className="w-8 h-8 rounded-full bg-cyan-400/20" />
                    </div>
                    <Sparkles className="w-5 h-5 text-cyan-400 absolute animate-pulse" />
                  </div>
                  <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full" />
                  <div className="w-12 h-12 rounded-xl border border-indigo-400/30 flex items-center justify-center bg-indigo-500/10">
                    <Cpu className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>SYNAPSE_NODES: 1,024</span>
                  <span className="text-cyan-300">STATUS: OPERATIONAL</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'studysync-platform' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-cyan-300 font-bold">STUDYSYNC_FOCUS_CORE</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18% SCORE
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center py-1 space-y-1">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-cyan-400/40 flex items-center justify-center bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <span className="font-mono-code text-xl font-extrabold text-cyan-300">25:00</span>
                    </div>
                    <Clock className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1" />
                  </div>
                  <span className="text-[10px] font-mono-code text-[#9ca3af] tracking-wider uppercase">
                    FLOW-STATE DEEP WORK
                  </span>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>INTERVAL: POMODORO</span>
                  <span className="text-cyan-300">DISTRACTION_SHIELD: 100%</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'tick-platform' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-cyan-300 font-bold">TICK_OUTPUT_ENGINE</span>
                  <span className="text-emerald-400 font-bold">VELOCITY: 96%</span>
                </div>
                <div className="flex items-end justify-center gap-3 py-3 h-28">
                  <div className="w-6 bg-cyan-500/30 rounded-t-lg h-12 relative flex items-center justify-center">
                    <span className="text-[9px] font-mono-code text-cyan-300 -top-4 absolute">W1</span>
                  </div>
                  <div className="w-6 bg-cyan-500/50 rounded-t-lg h-18 relative flex items-center justify-center">
                    <span className="text-[9px] font-mono-code text-cyan-300 -top-4 absolute">W2</span>
                  </div>
                  <div className="w-6 bg-cyan-500/70 rounded-t-lg h-22 relative flex items-center justify-center">
                    <span className="text-[9px] font-mono-code text-cyan-300 -top-4 absolute">W3</span>
                  </div>
                  <div className="w-6 bg-cyan-400 rounded-t-lg h-26 relative flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <span className="text-[9px] font-mono-code text-cyan-300 -top-4 absolute">W4</span>
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>OUTPUT_SHEET: COMPILED</span>
                  <span className="text-emerald-400">GROWTH_LOOPS: ACTIVE</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'calmpulse-stress-relief' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-rose-300 font-bold">CALMPULSE_BIOFEEDBACK</span>
                  <span className="text-cyan-300">4-7-8 PACER</span>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-rose-400/40 bg-rose-500/10 flex items-center justify-center animate-pulse [animation-duration:4s] shadow-[0_0_25px_rgba(244,63,94,0.25)]">
                      <Heart className="w-7 h-7 text-rose-400" />
                    </div>
                    <div className="w-28 h-28 rounded-full border border-cyan-400/20 absolute animate-ping [animation-duration:5s]" />
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>STRESS_INDEX: NORMALIZED</span>
                  <span className="text-cyan-300">HARMONIC: RESTORED</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'offline-ai-engine' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <WifiOff className="w-3.5 h-3.5" /> AIR-GAPPED_NEURAL
                  </span>
                  <span className="text-emerald-400 font-bold">LATENCY: 0.04s</span>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="relative p-4 rounded-xl bg-[#141828] border border-emerald-400/30 flex flex-col items-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
                    <span className="font-mono-code text-[10px] text-emerald-300 mt-1 font-bold">
                      4-BIT ONNX / GGUF
                    </span>
                    <span className="font-mono-code text-[9px] text-[#6b7280]">ZERO CLOUD API</span>
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>NETWORK: 0 BYTES</span>
                  <span className="text-emerald-400">PRIVACY: 100% LOCAL</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'iit-delhi-vision-lab' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-indigo-300 font-bold">IIT_DELHI_VISION_LAB</span>
                  <span className="text-cyan-400">CONF: 98.4%</span>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-28 h-20 border-2 border-indigo-400/40 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-indigo-400" />
                    <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
                    <div className="w-full h-0.5 bg-cyan-400/50 absolute animate-bounce" />
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>LATENCY: 12ms</span>
                  <span className="text-indigo-300">ARCH: EDGE_CONVNET</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'unmix-the-signal-ica' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-cyan-300 font-bold flex items-center gap-1">
                    <Waves className="w-3.5 h-3.5 text-cyan-400" /> FASTICA_AUDIO_DECOMP
                  </span>
                  <span className="text-emerald-400 font-mono-code">SDR: +14.2 dB</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 space-y-2">
                  <div className="flex items-center gap-2 w-full justify-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-end gap-1 h-12">
                        <span className="w-1.5 bg-cyan-400 rounded-full h-8 animate-pulse" />
                        <span className="w-1.5 bg-cyan-300 rounded-full h-12" />
                        <span className="w-1.5 bg-cyan-500 rounded-full h-6 animate-pulse" />
                      </div>
                      <span className="text-[8px] font-mono-code text-[#9ca3af] mt-1">SPEECH</span>
                    </div>
                    <span className="text-xs font-mono-code text-cyan-400 font-bold">+</span>
                    <div className="flex flex-col items-center">
                      <div className="flex items-end gap-1 h-12">
                        <span className="w-1.5 bg-indigo-400 rounded-full h-10" />
                        <span className="w-1.5 bg-indigo-300 rounded-full h-6 animate-pulse" />
                        <span className="w-1.5 bg-indigo-500 rounded-full h-11" />
                      </div>
                      <span className="text-[8px] font-mono-code text-[#9ca3af] mt-1">MUSIC</span>
                    </div>
                    <span className="text-xs font-mono-code text-cyan-400 font-bold">+</span>
                    <div className="flex flex-col items-center">
                      <div className="flex items-end gap-1 h-12">
                        <span className="w-1.5 bg-purple-400 rounded-full h-5 animate-pulse" />
                        <span className="w-1.5 bg-purple-300 rounded-full h-7" />
                        <span className="w-1.5 bg-purple-500 rounded-full h-4" />
                      </div>
                      <span className="text-[8px] font-mono-code text-[#9ca3af] mt-1">AMBIENT</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#101424] border border-cyan-400/30 text-[9px] font-mono-code text-cyan-300 text-center">
                    PCA WHITENING → FASTICA SCRATCH
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>MIX_MATRIX: 3×3</span>
                  <span className="text-cyan-300">SEPARATED: 3 SOURCES</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'proxyproof-attendance' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> PROXYPROOF_BLE
                  </span>
                  <span className="text-cyan-300 font-mono-code">TOKEN: 15s ROTATE</span>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-emerald-400/30 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <Smartphone className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-400 text-[#07080d] font-bold text-[9px] font-mono-code flex items-center justify-center shadow">
                      OK
                    </div>
                    <div className="w-28 h-28 rounded-full border border-emerald-400/20 absolute animate-ping [animation-duration:4s]" />
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>DEVICE_BINDING: VERIFIED</span>
                  <span className="text-emerald-400">PROXY_CHECK: PREVENTED</span>
                </div>
              </div>
            )}

            {selectedProjectId === 'website-change-detector' && (
              <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl glass-sub-box p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg group-hover:border-cyan-400/60 transition-all">
                <div className="flex justify-between items-center font-mono-code text-[11px] text-[#6b7280]">
                  <span className="text-cyan-300 font-bold flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" /> CHROMIUM_DIFF_WATCH
                  </span>
                  <span className="text-emerald-400 font-bold">24/7 ACTIVE</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 space-y-2">
                  <div className="w-full max-w-[200px] p-2.5 rounded-xl bg-[#0f1322] border border-cyan-400/30 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-[9px] font-mono-code">
                      <span className="text-cyan-300 font-bold truncate">target-page.com</span>
                      <span className="text-amber-400">DIFF DETECTED</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 w-3/4 animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-[8px] font-mono-code text-[#6b7280]">
                      <span>SHA-256 HASH DIFF</span>
                      <span className="text-cyan-400">DISCORD/TG SENT</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
                  <span>INTERVAL: CONFIGURABLE</span>
                  <span className="text-cyan-300">RETRIES: AUTO_EXP</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4 CORE NAVIGATION HUBS TEASER                                         */}
      {/* ===================================================================== */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>Architecture Portals</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#e3e2e8] mt-1">
            Explore Dedicated Sections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: About */}
          <div
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              onRouteChange('/about');
            }}
            className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="font-mono-code text-xs text-cyan-400 font-bold">02 // ABOUT</span>
              <h3 className="font-heading font-bold text-base text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                Academic Journey
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Chronological timeline from Mayoor School Noida, DPS Mathura Road, to B.Tech CSE at VIT Vellore.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-mono-code text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>View Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Projects */}
          <div
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              onRouteChange('/projects');
            }}
            className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="font-mono-code text-xs text-cyan-400 font-bold">03 // PROJECTS</span>
              <h3 className="font-heading font-bold text-base text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                What I'm Building
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Featuring Synapse Engine (Web Dev), StudySync & Tick (Hackathons), CalmPulse & Offline AI (AI & Software), and Cognitive Vision.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-mono-code text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Certificates */}
          <div
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              onRouteChange('/certificates');
            }}
            className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="font-mono-code text-xs text-cyan-400 font-bold">04 // CERTS</span>
              <h3 className="font-heading font-bold text-base text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                Verified Credentials
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Inspect official credentials from HPE, Vigyantram/IIT Delhi, Avishkaar, and HT Code-a-thon.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-mono-code text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Inspect Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Contact */}
          <div
            onClick={() => {
              audioTelemetry.playClick(500, 0.04);
              onRouteChange('/contact');
            }}
            className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="font-mono-code text-xs text-cyan-400 font-bold">05 // TRANSMISSION</span>
              <h3 className="font-heading font-bold text-base text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                Let's Connect
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Connect for engineering collaborations, summer internships, hackathon teams, and projects.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-mono-code text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Send Message</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
