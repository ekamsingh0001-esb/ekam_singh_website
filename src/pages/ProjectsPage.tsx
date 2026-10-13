import React, { useState } from 'react';
import { PageRoute, ProjectCategory, ProjectItem } from '../types';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { audioTelemetry } from '../utils/audioTelemetry';
import {
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Trophy,
  Cpu,
  Flame,
  Clock,
  Heart,
  TrendingUp,
  BarChart3,
  WifiOff,
  Eye,
  Activity,
  ArrowRight,
  Waves,
  Radio,
  Smartphone,
  Globe,
} from 'lucide-react';

interface ProjectsPageProps {
  onRouteChange: (route: PageRoute) => void;
  onSelectProject: (proj: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'ai', label: 'AI & Software', count: PROJECTS.filter((p) => p.category === 'ai').length },
    { id: 'app', label: 'App Development', count: PROJECTS.filter((p) => p.category === 'app').length },
    { id: 'web', label: 'Web Development', count: PROJECTS.filter((p) => p.category === 'web').length },
    { id: 'hackathon', label: 'Hackathons', count: PROJECTS.filter((p) => p.category === 'hackathon').length },
    { id: 'experiments', label: 'Personal Experiments', count: PROJECTS.filter((p) => p.category === 'experiments').length },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Dedicated interactive animated visualizer box for each project
  const renderVisualizerGraphic = (project: ProjectItem) => {
    switch (project.id) {
      case 'synapse-engine':
        return (
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
        );

      case 'studysync-platform':
        return (
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
        );

      case 'tick-platform':
        return (
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
        );

      case 'calmpulse-stress-relief':
        return (
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
        );

      case 'offline-ai-engine':
        return (
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
        );

      case 'iit-delhi-vision-lab':
        return (
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
        );

      case 'unmix-the-signal-ica':
        return (
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
        );

      case 'proxyproof-attendance':
        return (
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
        );

      case 'website-change-detector':
        return (
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
        );

      default:
        return (
          <div className="w-full lg:w-84 h-56 sm:h-64 rounded-2xl bg-[#090b12] border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden shrink-0">
            <div className="flex justify-between font-mono-code text-[11px] text-[#6b7280]">
              <span>SYSTEM_MODULE</span>
              <span className="text-cyan-400">READY</span>
            </div>
            <div className="flex items-center justify-center">
              <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex justify-between font-mono-code text-[10px] text-[#6b7280]">
              <span>TELEMETRY: VERIFIED</span>
              <span>STATE: OPERATIONAL</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ===================================================================== */}
      {/* HEADER & FILTER CHIPS                                                 */}
      {/* ===================================================================== */}
      <section className="border-b border-white/10 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              <span>Project Blueprints // 03</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#e3e2e8] mt-1">
              What I'm Building
            </h1>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-btn-secondary hover:border-cyan-400/50 text-cyan-300 font-mono-code text-xs transition-all w-fit"
          >
            <Github className="w-4 h-4" />
            <span>github.com/ekamsingh0001-esb</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af]" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                audioTelemetry.playClick(500, 0.04);
                setActiveCategory(cat.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'glass-tab-active font-bold'
                  : 'glass-tab-inactive'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* EXPANSIVE SPOTLIGHT BOXES FOR EVERY PROJECT (Matching Synapse Box)    */}
      {/* ===================================================================== */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#e3e2e8] flex items-center gap-2">
            <span>
              {activeCategory === 'all' && 'All Portfolio Artifacts & Systems'}
              {activeCategory === 'web' && 'Web Development Artifact (Synapse Engine)'}
              {activeCategory === 'hackathon' && 'Hackathon Artifacts (StudySync & Tick)'}
              {activeCategory === 'ai' && 'AI & Software Artifacts (CalmPulse & Offline AI)'}
              {activeCategory === 'experiments' && 'Personal Experiments Artifact (Cognitive Vision)'}
            </span>
          </h2>
          <span className="text-xs font-mono-code text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-400/20">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Project Spotlight' : 'Project Spotlights'}
          </span>
        </div>

        {/* Expansive Project Boxes */}
        <div className="space-y-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel-elevated p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                {/* Left Side: Metadata, Title, Description, Tech Tags & Actions */}
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono-code uppercase font-bold bg-cyan-400 text-[#07080d]">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono-code bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#e3e2e8] group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#9ca3af] leading-relaxed font-body">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1 font-mono-code text-xs">
                    {project.technologies.map((t, idx) => (
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
                        audioTelemetry.playClick(620, 0.05);
                        onSelectProject(project);
                      }}
                      className="px-5 py-2.5 rounded-xl glass-btn-primary font-heading font-bold text-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4" />
                      <span>View Full Case Study</span>
                    </button>

                    {/* Repository button - ONLY rendered if project has a repository URL */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl glass-btn-secondary hover:border-cyan-400/60 text-[#e3e2e8] font-mono-code text-xs flex items-center gap-2 transition-all"
                      >
                        <Github className="w-4 h-4 text-cyan-400" />
                        <span>Inspect Repository</span>
                        <ExternalLink className="w-3 h-3 text-[#9ca3af]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Tailored Visualizer Graphic */}
                {renderVisualizerGraphic(project)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* HACKATHON JOURNEY SECTION (Only on All or Hackathons)                 */}
      {/* ===================================================================== */}
      {(activeCategory === 'all' || activeCategory === 'hackathon') && (
        <section className="glass-box-elevated p-6 sm:p-8 rounded-3xl border border-indigo-400/35 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl glass-sub-box text-indigo-400 border border-indigo-400/40">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#e3e2e8]">
                The Hackathon Philosophy & Rapid Prototyping
              </h3>
              <span className="font-mono-code text-xs text-indigo-300 tracking-wider">
                0-TO-1 AGILITY • TEAM SYNERGY • 36-HOUR SPRINTS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold">
                <Flame className="w-4 h-4" />
                <span>Sprint Discipline</span>
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Transforming ambiguous challenge briefs into functional, tested user flows within 36 hours. Prioritizing atomic design systems and solid architectural contracts early.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-mono-code text-xs font-bold">
                <Cpu className="w-4 h-4" />
                <span>Pressure Triaging</span>
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Handling unexpected edge-case bugs at 4 AM, pivoting gracefully based on mentor feedback, and ensuring reliable zero-downtime demos before presentation judges.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-mono-code text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Presentation Polish</span>
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Delivering high-conviction technical narratives with working live prototypes rather than slide decks, articulating trade-offs, architecture, and real user value.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
