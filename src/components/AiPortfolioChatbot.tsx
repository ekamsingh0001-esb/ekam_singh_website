import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PageRoute } from '../types';
import { audioTelemetry } from '../utils/audioTelemetry';
import { Bot, Send, X, RotateCcw, ArrowRight, Sparkles, User, CornerDownRight } from 'lucide-react';

interface AiPortfolioChatbotProps {
  onRouteChange: (route: PageRoute) => void;
}

export const AiPortfolioChatbot: React.FC<AiPortfolioChatbotProps> = ({ onRouteChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Greetings! I'm EKAM.AI, the automated portfolio intelligence for Ekam Singh. Ask me anything about his web software (Tick, StudySync, CalmPulse), his B.Tech CSE studies at VIT Vellore, his HPE software simulation, IIT Delhi certification, or how to collaborate.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    'What is Tick?',
    'Tell me about StudySync',
    'What is CalmPulse?',
    'What is Offline AI?',
    'Synapse WebGL experience',
    'Show all GitHub repositories',
    'Who is Ekam Singh?',
    'Show education journey',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    audioTelemetry.playClick(580, 0.04);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Call backend /api/chat if available
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.includes('application/json')) {
        throw new Error('API unavailable or returned static page');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "I'm ready to answer any questions about Ekam's work and projects.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      audioTelemetry.playChime(520, 680, 'sine', 0.1);
    } catch {
      // Offline/Static Netlify Fallback with rich portfolio intelligence
      const q = query.toLowerCase();
      let reply = '';

      if (q.includes('tick')) {
        reply = "**Tick** is an enterprise hackathon platform for employee output & performance intelligence.\n\n- **Functionality**: Automatically compiles output sheets showing work completed throughout custom sprint periods and provides constructive growth advice.\n- **Tech Stack**: React, TypeScript, Node.js, Tailwind CSS, REST APIs, Analytics Engine.\n- **Repository**: [https://github.com/Vedant-Rajgaria/Tick.git](https://github.com/Vedant-Rajgaria/Tick.git)";
      } else if (q.includes('studysync')) {
        reply = "**StudySync** is a student focus and academic score booster application built for Vinhack.\n\n- **Functionality**: Helps students enter deep flow sessions, avoid cognitive distractions, and measurably boost exam scores by +18%.\n- **Tech Stack**: React, TypeScript, Tailwind CSS, Pomodoro / Flow Engine, Web Audio.\n- **Repository**: [https://github.com/vengala69/Vinhack.git](https://github.com/vengala69/Vinhack.git)";
      } else if (q.includes('calmpulse') || q.includes('stress')) {
        reply = "**CalmPulse** is an interactive stress relief and mental wellness web application.\n\n- **Functionality**: Decompresses students and developers with 4-7-8 breathing cycles, interactive WebGL fluid particles, and ambient soundscapes.\n- **Tech Stack**: React, TypeScript, WebGL / Canvas, Web Audio Synthesizer.\n- **Repository**: [https://github.com/vengala69/Vinhack.git](https://github.com/vengala69/Vinhack.git)";
      } else if (q.includes('offline ai') || q.includes('offline')) {
        reply = "**Offline AI** is an on-device local neural engine.\n\n- **Functionality**: Executes quantized models 100% locally on user hardware without internet, cloud APIs, or latency.\n- **Tech Stack**: Python, ONNX Runtime, WebLLM / GGUF, Quantization, Zero Cloud API.\n- **Repository**: [https://github.com/ekamsingh0001-esb/offline-ai.git](https://github.com/ekamsingh0001-esb/offline-ai.git)";
      } else if (q.includes('synapse') || q.includes('shader') || q.includes('webgl')) {
        reply = "**Synapse Engine** is an experimental AI web experience.\n\n- **Functionality**: Features real-time WebGL fluid displacement shaders, RGB chromatic aberration splitting, and reactive neural node mapping at 60 FPS.\n- **Tech Stack**: WebGL 2, GLSL Shaders, Three.js, React, TypeScript.\n- **Repository**: [https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git](https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git)";
      } else if (q.includes('who is') || q.includes('about') || q.includes('ekam')) {
        reply = "**Ekam Singh** is a B.Tech Computer Science and Engineering student at **VIT Vellore** (Batch of 2026), originally from South Delhi. He specializes in creative web engineering, WebGL shaders, full-stack systems, and hackathon prototypes.";
      } else if (q.includes('cert') || q.includes('hpe') || q.includes('iit')) {
        reply = "Ekam holds verified credentials including:\n- **Hewlett Packard Enterprise (HPE)** Software Engineering Job Simulation via Forage (RESTful web services & unit testing).\n- **Vigyantram & Enactus IIT Delhi** Jr. Artificial Intelligence Scientist Summer Camp.\n- **Avishkaar** Android App Development Workshop.\n- **HT Code-a-thon** (Hindustan Times & IBM / Delhi Govt).";
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
        reply = "You can contact Ekam directly at **ekamsingh1808@gmail.com** or connect with him on LinkedIn ([Ekam Singh](https://www.linkedin.com/in/ekam-singh-28333b285/?isSelfProfile=true)) and GitHub ([ekamsingh0001-esb](https://github.com/ekamsingh0001-esb)).";
      } else {
        reply = "I'm **EKAM.AI**, the portfolio assistant for Ekam Singh (B.Tech CSE at VIT Vellore). Ask me about his software projects (**Tick**, **StudySync**, **CalmPulse**, **Offline AI**, **Synapse Engine**), his certifications, or reach out to him at **ekamsingh1808@gmail.com**.";
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      audioTelemetry.playChime(520, 680, 'sine', 0.1);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    audioTelemetry.playClick(400, 0.05);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: 'Session refreshed. What would you like to explore regarding Ekam Singh?',
        timestamp: 'Just now',
      },
    ]);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      let remaining = line;
      let keyIdx = 0;

      const isH3 = remaining.startsWith('### ');
      const isH2 = remaining.startsWith('## ');
      const isH1 = remaining.startsWith('# ');
      const isBullet = remaining.startsWith('- ') || remaining.startsWith('* ');

      if (isH3) remaining = remaining.slice(4);
      else if (isH2) remaining = remaining.slice(3);
      else if (isH1) remaining = remaining.slice(2);
      else if (isBullet) remaining = remaining.slice(2);

      const parts: React.ReactNode[] = [];
      const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(remaining)) !== null) {
        if (match.index > lastIndex) {
          parts.push(remaining.substring(lastIndex, match.index));
        }
        if (match[2] && match[3]) {
          parts.push(
            <a
              key={`link-${keyIdx++}`}
              href={match[3]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold break-all inline-flex items-center gap-0.5"
            >
              {match[2]}
            </a>
          );
        } else if (match[4]) {
          parts.push(
            <strong key={`bold-${keyIdx++}`} className="font-bold text-white">
              {match[4]}
            </strong>
          );
        }
        lastIndex = tokenRegex.lastIndex;
      }
      if (lastIndex < remaining.length) {
        parts.push(remaining.substring(lastIndex));
      }

      if (isH1 || isH2 || isH3) {
        return (
          <div key={lineIdx} className="font-heading font-bold text-sm text-cyan-300 mt-2 mb-1">
            {parts}
          </div>
        );
      }
      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 ml-1 my-0.5">
            <span className="text-cyan-400 font-bold shrink-0">•</span>
            <span className="flex-1">{parts}</span>
          </div>
        );
      }
      return (
        <div key={lineIdx} className={line.trim() === '' ? 'h-2' : ''}>
          {parts}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
        <button
          onClick={() => {
            audioTelemetry.playClick(isOpen ? 380 : 640, 0.06);
            setIsOpen(!isOpen);
          }}
          aria-label="Toggle AI Portfolio Assistant"
          className="relative w-13 h-13 p-3 rounded-full glass-btn-primary shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
        >
          <Bot className="w-6 h-6 text-cyan-300 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-2 ring-[#07080d] animate-pulse" />
        </button>
      </div>

      {/* Backdrop on mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Chat Window Panel */}
      <div
        className={`fixed bottom-0 md:bottom-24 right-0 md:right-8 w-full md:w-[420px] max-h-[85vh] md:max-h-[600px] h-[550px] glass-box-elevated border border-cyan-400/35 md:rounded-3xl rounded-t-3xl z-50 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full md:translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 glass-sub-box flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg glass-sub-box text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-xs text-[#e3e2e8]">EKAM.AI Assistant</h4>
                <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded-full glass-sub-box text-cyan-300">
                  Gemini 3.8
                </span>
              </div>
              <span className="font-mono-code text-[10px] text-cyan-400/80 block leading-tight">
                Trained on Ekam's Verified Dossier
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={resetChat}
              title="Reset conversation"
              className="p-1.5 rounded-lg glass-btn text-[#9ca3af] hover:text-[#e3e2e8] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg glass-btn text-[#9ca3af] hover:text-[#e3e2e8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-body">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-md glass-sub-box text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'glass-btn-primary text-white font-medium'
                    : 'glass-card border border-white/10 text-[#e3e2e8]'
                }`}
              >
                <div>{renderFormattedText(msg.text)}</div>
                <div
                  className={`text-[9px] mt-1.5 font-mono-code ${
                    msg.role === 'user' ? 'text-cyan-200/80 text-right' : 'text-[#6b7280]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-md glass-sub-box text-[#e3e2e8] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center">
              <div className="w-6 h-6 rounded-md glass-sub-box text-cyan-300 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="glass-card border border-white/10 p-3 rounded-2xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-3 py-2 glass-sub-box border-t border-white/[0.06] overflow-x-auto flex gap-1.5 no-scrollbar">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full glass-tab-inactive text-[10px] font-mono-code text-cyan-300 whitespace-nowrap active:scale-95 transition-all cursor-pointer"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* Action Shortcut to Contact */}
        <div className="px-3 py-1.5 bg-[#0b0d14]/70 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono-code">
          <span className="text-[#6b7280]">Looking to collaborate?</span>
          <button
            onClick={() => {
              setIsOpen(false);
              onRouteChange('/contact');
            }}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline cursor-pointer"
          >
            Go to Contact Form <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 glass-sub-box border-t border-white/10 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query Ekam's background, projects, or credentials..."
            className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-[#e3e2e8] placeholder:text-[#6b7280]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl glass-btn-primary active:scale-95 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
};
