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
  Waves,
  Radio,
  Smartphone,
  Globe,
  Download,
  RefreshCw,
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

  // States for new project simulators
  const [isUnmixing, setIsUnmixing] = useState(false);
  const [unmixDone, setUnmixDone] = useState(false);

  const [currentToken, setCurrentToken] = useState('PRX-8419-B7');
  const [deviceBound, setDeviceBound] = useState(true);
  const [checkedInCount, setCheckedInCount] = useState(48);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const [monitorInterval, setMonitorInterval] = useState('5 minutes');
  const [isCheckingSite, setIsCheckingSite] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

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

        {/* Unmix-the-Signal-ICA Simulator */}
        {project.previewType === 'unmix-ica' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  FastICA Audio Separation Simulator (From Scratch)
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-cyan-300">
                BLIND SOURCE SEPARATION // 3 CHANNELS
              </span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono-code">
                <div className="p-2.5 rounded-xl bg-[#0f1322] border border-cyan-400/20">
                  <span className="text-[10px] text-[#9ca3af] block">SOURCE 1</span>
                  <span className="text-cyan-300 font-bold">Synthetic Speech</span>
                  <span className="text-[10px] text-[#6b7280] block mt-1">Formant harmonics (220–880 Hz)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0f1322] border border-indigo-400/20">
                  <span className="text-[10px] text-[#9ca3af] block">SOURCE 2</span>
                  <span className="text-indigo-300 font-bold">Synthetic Music</span>
                  <span className="text-[10px] text-[#6b7280] block mt-1">Chords & sinusoidal tones</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0f1322] border border-purple-400/20">
                  <span className="text-[10px] text-[#9ca3af] block">SOURCE 3</span>
                  <span className="text-purple-300 font-bold">Ambient Noise</span>
                  <span className="text-[10px] text-[#6b7280] block mt-1">Stationary pink noise texture</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="font-mono-code text-xs">
                  <span className="text-[#9ca3af] block text-[10px]">MIXING MATRIX:</span>
                  <span className="text-cyan-300 font-bold">A = [ [0.6, 0.3, 0.1], [0.2, 0.7, 0.1], [0.3, 0.2, 0.5] ]</span>
                </div>
                <button
                  onClick={() => {
                    audioTelemetry.playClick(600, 0.04);
                    setIsUnmixing(true);
                    setUnmixDone(false);
                    setTimeout(() => {
                      setIsUnmixing(false);
                      setUnmixDone(true);
                      audioTelemetry.playChime(440, 660, 'triangle', 0.15);
                    }, 600);
                  }}
                  disabled={isUnmixing}
                  className="px-4 py-2 rounded-xl glass-btn-primary font-mono-code text-xs font-bold active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  {isUnmixing ? 'Computing Negentropy...' : 'Run Scratch FastICA'}
                </button>
              </div>

              {unmixDone && (
                <div className="p-3 rounded-xl glass-card border border-emerald-400/30 text-xs font-mono-code text-emerald-300 space-y-1.5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-emerald-400">✓ FASTICA CONVERGED IN 17 ITERATIONS</span>
                    <span className="text-cyan-300">WAV FILES EXPORTED</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-1.5 rounded bg-black/40">
                      <span className="text-[#9ca3af] block text-[10px]">SPEECH_SDR:</span>
                      <span className="text-emerald-400 font-bold">+15.4 dB (r=0.989)</span>
                    </div>
                    <div className="p-1.5 rounded bg-black/40">
                      <span className="text-[#9ca3af] block text-[10px]">MUSIC_SDR:</span>
                      <span className="text-emerald-400 font-bold">+14.2 dB (r=0.984)</span>
                    </div>
                    <div className="p-1.5 rounded bg-black/40">
                      <span className="text-[#9ca3af] block text-[10px]">AMBIENT_SDR:</span>
                      <span className="text-emerald-400 font-bold">+13.8 dB (r=0.978)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>WHITENING: PCA EIGEN</span>
              <span className="text-cyan-400">ZERO ICA LIBRARY DEPENDENCY</span>
            </div>
          </div>
        )}

        {/* ProxyProof-Attendance Simulator */}
        {project.previewType === 'proxyproof-attendance' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  ProxyProof Anti-Proxy Attendance Session Engine
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-emerald-400">
                SESSION: ACTIVE // VIT CSE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code">
              <div className="p-3 rounded-xl bg-[#0f1322] border border-cyan-400/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9ca3af]">ROTATING SECURITY TOKEN</span>
                  <button
                    onClick={() => {
                      audioTelemetry.playClick(700, 0.03);
                      setCurrentToken(`PRX-${Math.floor(1000 + Math.random() * 9000)}-${['A1', 'B7', 'C4', 'D9'][Math.floor(Math.random() * 4)]}`);
                    }}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Rotate
                  </button>
                </div>
                <div className="font-mono-code text-xl font-extrabold text-cyan-300 tracking-wider">
                  {currentToken}
                </div>
                <div className="text-[10px] text-[#6b7280]">
                  Time-to-expire: 15s • Self-invalidating hash
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0f1322] border border-emerald-400/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9ca3af]">STUDENT DEVICE BINDING</span>
                  <span className="text-[10px] text-emerald-400 font-bold">HARDWARE LOCKED</span>
                </div>
                <div className="font-mono-code text-sm text-[#e3e2e8] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>UUID: 4a8f-92c1-d07b</span>
                </div>
                <div className="text-[10px] text-[#6b7280]">
                  BLE RSSI: -48 dBm (Classroom Proximity Verified)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 font-mono-code text-xs">
                <span className="text-[#9ca3af]">Verified Students:</span>
                <span className="text-emerald-400 font-bold">{checkedInCount} / 50</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    audioTelemetry.playClick(580, 0.04);
                    setCheckedInCount((prev) => prev + 1);
                    setJustCheckedIn(true);
                    audioTelemetry.playChime(500, 750, 'sine', 0.1);
                    setTimeout(() => setJustCheckedIn(false), 2000);
                  }}
                  className="px-3.5 py-1.5 rounded-xl glass-btn-primary font-mono-code text-xs font-bold active:scale-95 transition-all cursor-pointer"
                >
                  {justCheckedIn ? '✓ Student Checked In!' : 'Simulate Check-In'}
                </button>

                <button
                  onClick={() => {
                    audioTelemetry.playClick(440, 0.04);
                    const csvContent = "data:text/csv;charset=utf-8,Student_ID,Name,Timestamp,Device_Bound,BLE_Verified,Status\n22BCE1001,Ekam Singh,10:02:15,YES,YES,PRESENT\n22BCE1002,Rahul V.,10:02:29,YES,YES,PRESENT\n";
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "ProxyProof_Attendance_Session.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-3 py-1.5 rounded-xl glass-btn font-mono-code text-xs text-[#cbd5e1] hover:text-[#e3e2e8] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>ORGANISER DASHBOARD: CONNECTED</span>
              <span className="text-emerald-400">PROXY PREVENTION: 100%</span>
            </div>
          </div>
        )}

        {/* Website Change Detector Simulator */}
        {project.previewType === 'website-change-detector' && (
          <div className="p-4 sm:p-5 rounded-2xl glass-sub-box border border-cyan-400/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-heading font-bold text-xs text-[#e3e2e8] uppercase">
                  Website Change Detector & Multi-Channel Alert Engine
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-cyan-300">
                HEADLESS CHROMIUM // HASH DIFF
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://vit.ac.in/academics/exam-schedule-notices"
                  className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-[#e3e2e8] font-mono-code"
                />
                <select
                  value={monitorInterval}
                  onChange={(e) => setMonitorInterval(e.target.value)}
                  className="bg-[#141724] border border-white/10 rounded-xl px-3 py-2 text-cyan-300 text-xs font-mono-code focus:outline-none"
                >
                  <option>1 minute</option>
                  <option>5 minutes</option>
                  <option>15 minutes</option>
                  <option>1 hour</option>
                  <option>24 hours</option>
                </select>
                <button
                  onClick={() => {
                    audioTelemetry.playClick(640, 0.04);
                    setIsCheckingSite(true);
                    setCheckResult(null);
                    setTimeout(() => {
                      setIsCheckingSite(false);
                      setCheckResult(
                        'Chromium snapshot captured. SHA-256 hash modified: [3d8a... → 9e1f...]. Visual diff detected in section "#exam-notice-2026". Dispatched alerts to Telegram Bot (@EkamNotifyBot) and Discord Webhook (#dev-alerts).'
                      );
                      audioTelemetry.playChime(520, 780, 'sine', 0.12);
                    }, 500);
                  }}
                  disabled={isCheckingSite}
                  className="px-4 py-2 rounded-xl glass-btn-primary font-mono-code text-xs font-bold active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  {isCheckingSite ? 'Checking Headless DOM...' : 'Trigger Headless Check'}
                </button>
              </div>

              {checkResult && (
                <div className="p-3 rounded-xl glass-card border border-cyan-400/30 text-xs font-mono-code text-cyan-300 flex items-start gap-2 animate-in fade-in duration-300">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#6b7280] block mb-0.5">DIFF_MONITOR_ENGINE // TELEGRAM & DISCORD ALERT:</span>
                    <span>{checkResult}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono-code text-[#6b7280] border-t border-white/[0.06]">
              <span>ERROR RESILIENCE: AUTO-RETRY + RATE-SPACING</span>
              <span className="text-cyan-400">ALERTS: TELEGRAM // DISCORD // EMAIL</span>
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
