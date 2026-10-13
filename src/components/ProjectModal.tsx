import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { audioTelemetry } from '../utils/audioTelemetry';
import {
  X,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  Clock,
  Heart,
  TrendingUp,
  Play,
  RotateCcw,
  UserCheck,
  WifiOff,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Interactive state for preview widgets
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (7s)' | 'Exhale (8s)'>('Inhale (4s)');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState('Sprint 08 (Bi-Weekly)');
  const [offlinePrompt, setOfflinePrompt] = useState('Explain how local quantized models run without cloud APIs');
  const [offlineResponse, setOfflineResponse] = useState<string | null>(null);
  const [isOfflineInferencing, setIsOfflineInferencing] = useState(false);

  if (!project) return null;

  const handleClose = () => {
    audioTelemetry.playClick(380, 0.04);
    setIsTimerRunning(false);
    setIsBreathingActive(false);
    onClose();
  };

  const toggleTimer = () => {
    audioTelemetry.playClick(550, 0.04);
    setIsTimerRunning(!isTimerRunning);
  };

  const toggleBreathing = () => {
    audioTelemetry.playChime(440, 554, 'triangle', 0.15);
    setIsBreathingActive(!isBreathingActive);
    if (!isBreathingActive) {
      setBreathPhase('Inhale (4s)');
      setTimeout(() => setBreathPhase('Hold (7s)'), 4000);
      setTimeout(() => setBreathPhase('Exhale (8s)'), 11000);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl glass-box-elevated border border-cyan-400/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.2)] space-y-6 my-auto relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-full glass-sub-box text-cyan-300 font-semibold uppercase">
                {project.categoryLabel}
              </span>
              <span className="text-[11px] font-mono-code text-[#9ca3af]">• {project.status}</span>
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#e3e2e8]">
              {project.title}
            </h3>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Case Study"
            className="p-2 rounded-xl glass-btn text-[#9ca3af] hover:text-[#e3e2e8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Short Summary */}
        <p className="text-sm text-[#cbd5e1] leading-relaxed font-body">
          {project.shortDescription}
        </p>

        {/* ================================================================= */}
        {/* INTERACTIVE PREVIEW WIDGET (Dynamic per project)                 */}
        {/* ================================================================= */}
        {/* ================================================================= */}
        {/* INTERACTIVE PREVIEW WIDGET (Dynamic per project)                 */}
        {/* ================================================================= */}
        {project.previewType === 'tick-analytics' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  Tick Output Sheet & Employee Growth Simulator
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono-code text-[11px]">
                <span className="text-[#9ca3af]">Period:</span>
                <select
                  value={selectedSprint}
                  onChange={(e) => setSelectedSprint(e.target.value)}
                  className="bg-[#141724] border border-white/10 rounded-lg px-2 py-1 text-cyan-300 text-xs focus:outline-none"
                >
                  <option>Sprint 08 (Bi-Weekly)</option>
                  <option>September Monthly Aggregate</option>
                  <option>Q3 Quarterly Output Review</option>
                </select>
              </div>
            </div>

            {/* Mock Output Table */}
            <div className="overflow-x-auto text-xs font-mono-code">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#6b7280] border-b border-white/[0.06] pb-1">
                    <th className="py-1">EMPLOYEE</th>
                    <th className="py-1">TASKS DONE</th>
                    <th className="py-1">OUTPUT SCORE</th>
                    <th className="py-1">GROWTH FEEDBACK & ADVICE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="py-2 text-[#e3e2e8] font-semibold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Sarah M.
                    </td>
                    <td className="py-2 text-cyan-300">38 deliverables</td>
                    <td className="py-2 text-emerald-400 font-bold">96% High Velocity</td>
                    <td className="py-2 text-[#9ca3af]">Ready for microservice architecture lead</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#e3e2e8] font-semibold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> David K.
                    </td>
                    <td className="py-2 text-cyan-300">27 deliverables</td>
                    <td className="py-2 text-amber-300 font-bold">82% Steady Pace</td>
                    <td className="py-2 text-[#9ca3af]">Improve unit test execution speed by 15%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>COMPANY STATUS: OUTPUT SHEET GENERATED</span>
              <span className="text-cyan-400">ACTIONABLE IMPROVEMENT LOOPS: ACTIVE</span>
            </div>
          </div>
        )}

        {project.previewType === 'studysync-timer' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  StudySync Focus Interval & Score Tracker
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18% Exam Score Boost
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <div className="text-center sm:text-left">
                <span className="font-mono-code text-3xl font-extrabold text-cyan-400 block tracking-wider">
                  {Math.floor(timerSeconds / 60)}:00
                </span>
                <span className="text-[11px] font-mono-code text-[#9ca3af]">
                  {isTimerRunning ? 'ACTIVE FLOW-STATE FOCUS BLOCK' : 'DEEP WORK CYCLE (POMODORO)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className="px-4 py-2 rounded-xl glass-btn-primary font-mono-code text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isTimerRunning ? 'Pause Study' : 'Start Focus Session'}</span>
                </button>
                <button
                  onClick={() => {
                    audioTelemetry.playClick(400, 0.03);
                    setTimerSeconds(1500);
                    setIsTimerRunning(false);
                  }}
                  className="p-2 rounded-xl glass-btn text-[#9ca3af] hover:text-[#e3e2e8] cursor-pointer"
                  title="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>DISTRACTION BLOCKER: ON</span>
              <span className="text-cyan-400">STUDY STREAK: 14 DAYS</span>
            </div>
          </div>
        )}

        {project.previewType === 'stress-relief' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  CalmPulse 4-7-8 Breathing Pacer & Sensory Reset
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-cyan-300">
                PHYSIOLOGICAL DECOMPRESSION
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-20 h-20 rounded-full border-2 border-cyan-400/50 flex items-center justify-center transition-all duration-1000 ${
                    isBreathingActive ? 'scale-125 bg-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.4)]' : 'scale-100 bg-white/[0.04]'
                  }`}
                >
                  <span className="font-mono-code text-[11px] text-cyan-300 text-center font-bold px-1">
                    {isBreathingActive ? breathPhase : 'Ready'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <p className="text-xs text-[#9ca3af] font-body max-w-xs">
                  Inhale for 4s, hold for 7s, exhale for 8s to quickly alleviate coding anxiety and exam stress.
                </p>
                <button
                  onClick={toggleBreathing}
                  className="px-4 py-2 rounded-xl glass-btn-primary font-mono-code text-xs font-bold active:scale-95 transition-all cursor-pointer"
                >
                  {isBreathingActive ? 'Pause Exercise' : 'Start 4-7-8 Breathing Reset'}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>BINAURAL SOUND: GENERATIVE</span>
              <span className="text-cyan-400">RESTORED CLARITY</span>
            </div>
          </div>
        )}

        {project.previewType === 'offline-ai-runner' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-emerald-400" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  Offline AI On-Device Neural Execution Simulator
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> AIR-GAPPED // ZERO INTERNET
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={offlinePrompt}
                  onChange={(e) => setOfflinePrompt(e.target.value)}
                  placeholder="Query local on-device neural model..."
                  className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-[#e3e2e8]"
                />
                <button
                  onClick={() => {
                    audioTelemetry.playClick(620, 0.04);
                    setIsOfflineInferencing(true);
                    setOfflineResponse(null);
                    setTimeout(() => {
                      setIsOfflineInferencing(false);
                      setOfflineResponse(
                        '100% on-device forward pass completed in 0.06s. Zero bytes transmitted over network. Quantized 4-bit weights executed via local SIMD/GPU tensor runtime without external API dependency.'
                      );
                      audioTelemetry.playChime(520, 780, 'sine', 0.1);
                    }, 400);
                  }}
                  disabled={isOfflineInferencing}
                  className="px-4 py-2 rounded-xl glass-btn-primary font-mono-code text-xs font-bold active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  {isOfflineInferencing ? 'Computing Locally...' : 'Run Local Inference'}
                </button>
              </div>

              {offlineResponse && (
                <div className="p-3 rounded-xl glass-card border border-cyan-400/30 text-xs font-mono-code text-cyan-300 flex items-start gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#6b7280] block mb-0.5">LOCAL_INFERENCE_OUTPUT // ZERO_TELEMETRY:</span>
                    <span>{offlineResponse}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>QUANTIZATION: 4-BIT GGUF/ONNX</span>
              <span className="text-emerald-400">PRIVACY: 100% LOCAL DISK</span>
            </div>
          </div>
        )}

        {/* Case Study Details */}
        {project.fullCaseStudy && (
          <div className="space-y-4 pt-2">
            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <h4 className="font-mono-code text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
                <Cpu className="w-4 h-4" />
                Problem Statement & Motivation
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {project.fullCaseStudy.problem}
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <h4 className="font-mono-code text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
                <Layers className="w-4 h-4" />
                Architectural Approach & Engineering
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {project.fullCaseStudy.approach}
              </p>
              <ul className="space-y-1.5 pt-2">
                {project.fullCaseStudy.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1.5">
              <h4 className="font-mono-code text-xs font-bold text-emerald-400 uppercase">
                Measurable Outcome
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {project.fullCaseStudy.outcome}
              </p>
            </div>
          </div>
        )}

        {/* Technology Stack Tags */}
        <div>
          <span className="font-mono-code text-[11px] text-[#9ca3af] block mb-2">
            TECHNOLOGY STACK & INTEGRATIONS:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg glass-sub-box text-cyan-300 font-mono-code text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl glass-btn-secondary hover:border-cyan-400 text-[#e3e2e8] font-mono-code text-xs flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>Inspect Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl glass-btn-primary font-heading font-semibold text-xs active:scale-95 transition-all cursor-pointer"
          >
            Dismiss Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
