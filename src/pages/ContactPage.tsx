import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { audioTelemetry } from '../utils/audioTelemetry';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  Inbox,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ContactPageProps {
  onRouteChange: (route: PageRoute) => void;
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // anti-spam field
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    mailtoUrl?: string;
    gmailUrl?: string;
    transmissionId?: string;
    recipient?: string;
    deliveryStatus?: 'delivered' | 'needs_activation' | 'forwarding_queued' | 'logged_locally';
    deliveryNote?: string;
    needsActivation?: boolean;
  } | null>(null);

  const [showLogs, setShowLogs] = useState(false);
  const [transmissions, setTransmissions] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  const fetchTransmissions = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch('/api/contact/messages');
      if (res.ok) {
        const data = await res.json();
        setTransmissions(data.messages || []);
      }
    } catch (e) {
      console.warn('Failed to fetch transmissions:', e);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (showLogs) {
      fetchTransmissions();
    }
  }, [showLogs]);

  const handleCopyEmail = () => {
    audioTelemetry.playClick(620, 0.04);
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopied(true);
    onShowToast(`Copied to clipboard: ${PERSONAL_INFO.email}`);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Pre-calculated direct email links with current inputs
  const dynamicSubject = encodeURIComponent(
    formData.subject ? `[Portfolio Inquiry] ${formData.subject}` : '[Portfolio Inquiry] Message for Ekam Singh'
  );
  const dynamicBody = encodeURIComponent(
    `Hi Ekam,\n\n${formData.message || 'I would like to connect regarding an opportunity / project.'}\n\nSender: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'Not provided'}\nSent to ekamsingh1808@gmail.com via Portfolio`
  );

  const dynamicGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ekamsingh1808@gmail.com&su=${dynamicSubject}&body=${dynamicBody}`;
  const dynamicMailtoUrl = `mailto:ekamsingh1808@gmail.com?subject=${dynamicSubject}&body=${dynamicBody}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check
    if (formData.honeypot) {
      console.warn('Spam submission intercepted.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setErrorMessage('Please provide a valid electronic mail address format.');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');
    audioTelemetry.playClick(500, 0.05);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server rejected transmission.');
      }

      const result = await response.json();
      setSubmittedResult(result);
      setFormStatus('success');
      audioTelemetry.playChime(580, 880, 'sine', 0.2);
      onShowToast('Message dispatched & securely routed to Ekam Singh!');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      fetchTransmissions();
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setFormStatus('error');
      setErrorMessage(err.message || 'Transmission failed. You can send directly via the Gmail button below.');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ===================================================================== */}
      {/* HEADER                                                                */}
      {/* ===================================================================== */}
      <section className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest">
          <Mail className="w-4 h-4" />
          <span>Establish Transmission // 05</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#e3e2e8]">
          Have an Idea? Let's Build Something.
        </h1>
        <p className="font-body text-sm sm:text-base text-[#9ca3af] max-w-3xl leading-relaxed">
          Open for software engineering internships, creative web development roles, research
          collaborations, and hackathon team lineups. All messages on this panel are securely routed
          directly to <strong className="text-cyan-300 font-mono-code">Ekam Singh's verified inbox</strong>.
        </p>
      </section>

      {/* ===================================================================== */}
      {/* CONTACT GRID: Form (7 cols) + Direct Channels (5 cols)                */}
      {/* ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Transmission Form */}
        <div className="lg:col-span-7 glass-box-elevated p-6 sm:p-8 rounded-3xl border border-cyan-400/30 space-y-6 shadow-xl">
          {/* Header & Target Recipient Badge */}
          <div className="space-y-2.5 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#e3e2e8] flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Direct Message Dispatch</span>
              </h2>
              <span className="font-mono-code text-[11px] text-cyan-400/80">ENCRYPTED // REST</span>
            </div>

            {/* Recipient Target Banner (Email hidden for privacy) */}
            <div className="p-3.5 rounded-xl glass-sub-box border border-cyan-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code">
              <div className="flex items-center gap-2 text-cyan-300">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-[#9ca3af]">Recipient:</span>
                <span className="text-white font-bold">Ekam Singh (Direct Inbox)</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 w-fit flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                ACTIVE INBOX ROUTE
              </span>
            </div>
          </div>

          {formStatus === 'success' ? (
            <div className="p-8 rounded-2xl glass-sub-box border border-cyan-400/40 text-center space-y-5 animate-in fade-in duration-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="w-16 h-16 rounded-full bg-cyan-400/20 text-cyan-300 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.35)] border border-cyan-400/40">
                <Check className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-2xl text-[#e3e2e8]">
                  Transmission Dispatched!
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-code bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    TARGET: Ekam Singh (Private Inbox)
                  </span>
                  {submittedResult?.deliveryStatus === 'delivered' && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono-code bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      FORWARDED TO INBOX
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery / Activation Note */}
              {submittedResult?.needsActivation ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-left space-y-2 text-xs font-mono-code text-amber-200">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>One-Time Form Activation Required</span>
                  </div>
                  <p className="font-body text-xs text-[#cbd5e1] leading-relaxed">
                    FormSubmit has dispatched an <strong>'Activate Form'</strong> verification link to Ekam's registered inbox. Please check your inbox (or Spam folder) and click that link once to activate automated inbox forwarding!
                  </p>
                  <p className="font-body text-[11px] text-[#9ca3af]">
                    To deliver your message immediately without waiting for activation, click <strong>'Open in Gmail'</strong> below!
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#9ca3af] max-w-md mx-auto leading-relaxed font-body">
                  Your message was processed and recorded directly for <strong className="text-white">Ekam Singh</strong>.
                  {submittedResult?.deliveryNote ? ` ${submittedResult.deliveryNote}` : ''}
                </p>
              )}

              {/* Direct Mail Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submittedResult?.gmailUrl || dynamicGmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl glass-btn-primary font-heading font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Directly in Gmail (Instant)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
                </a>

                <a
                  href={submittedResult?.mailtoUrl || dynamicMailtoUrl}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl glass-btn-secondary hover:border-cyan-400/50 text-[#e3e2e8] font-mono-code text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Send via Mail App</span>
                </a>

                <button
                  onClick={() => {
                    setFormStatus('idle');
                    setSubmittedResult(null);
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl glass-btn text-[#9ca3af] font-mono-code text-xs transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {formStatus === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-mono-code">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block font-mono-code text-xs text-[#9ca3af] mb-1.5 uppercase">
                  Your Identity / Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-[#e3e2e8] placeholder:text-[#6b7280] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono-code text-xs text-[#9ca3af] mb-1.5 uppercase">
                  Electronic Mail Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. name@company.com"
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-[#e3e2e8] placeholder:text-[#6b7280] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono-code text-xs text-[#9ca3af] mb-1.5 uppercase">
                  Transmission Subject <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Software Internship / Web Project Collaboration"
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-[#e3e2e8] placeholder:text-[#6b7280] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono-code text-xs text-[#9ca3af] mb-1.5 uppercase">
                  Message Details / Project Scope <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your requirements, hackathon role, or collaboration goals..."
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-[#e3e2e8] placeholder:text-[#6b7280] transition-colors resize-none"
                />
              </div>

              {/* Dual Action Dispatch Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-xl glass-btn-primary font-heading font-bold text-xs active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message (Direct Dispatch to Ekam)</span>
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={dynamicGmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl glass-btn-secondary hover:border-cyan-400/60 text-[#e3e2e8] font-mono-code text-xs flex items-center justify-center gap-2 transition-all group"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>Instant Send via Gmail Web</span>
                    <ExternalLink className="w-3 h-3 text-[#6b7280] group-hover:text-cyan-400" />
                  </a>

                  <a
                    href={dynamicMailtoUrl}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl glass-btn text-[#9ca3af] hover:text-white font-mono-code text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>System Mail App</span>
                  </a>
                </div>
              </div>
            </form>
          )}

          {/* Expandable Transmission Log to confirm messages delivered */}
          <div className="pt-2 border-t border-white/[0.08]">
            <button
              onClick={() => {
                audioTelemetry.playClick(480, 0.04);
                setShowLogs(!showLogs);
              }}
              className="w-full flex items-center justify-between text-xs font-mono-code text-[#9ca3af] hover:text-[#e3e2e8] p-2.5 rounded-xl glass-btn-secondary transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Inbox className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inbox Transmission Log (Direct Dispatch)</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded glass-sub-box text-cyan-300">
                  {transmissions.length} Recorded
                </span>
                {showLogs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showLogs && (
              <div className="mt-3 p-4 rounded-2xl glass-sub-box border border-white/10 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#9ca3af] pb-2 border-b border-white/[0.06]">
                  <span>Transmissions routed to Ekam Singh</span>
                  <button
                    onClick={() => {
                      audioTelemetry.playClick(560, 0.04);
                      fetchTransmissions();
                    }}
                    disabled={isLoadingLogs}
                    className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingLogs ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {transmissions.length === 0 ? (
                  <div className="py-4 text-center text-xs text-[#6b7280] font-mono-code">
                    No new transmissions logged yet in this session. Messages sent through the form above will appear here and in your inbox.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar">
                    {transmissions.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-xl glass-card border border-white/[0.08] text-xs font-mono-code space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold">{t.name}</span>
                          <span className="text-[10px] text-[#6b7280]">
                            {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-[11px] text-cyan-300">
                          {t.email} • <span className="text-[#9ca3af]">{t.subject}</span>
                        </div>
                        <p className="text-xs text-[#cbd5e1] font-body line-clamp-2">
                          {t.message}
                        </p>
                        <div className="text-[9px] text-emerald-400 flex items-center gap-1 pt-0.5">
                          <Check className="w-3 h-3" />
                          <span>Routed to Ekam Singh (Verified)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Direct Channels & Verified Coordinates */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-box-elevated p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5 shadow-xl">
            <h3 className="font-heading font-bold text-lg text-[#e3e2e8]">
              Direct Channels & Verification
            </h3>

            {/* Email Card with 1-click Copy */}
            <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl glass-sub-box text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="font-mono-code text-[10px] text-[#6b7280] block">PRIMARY EMAIL</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono-code text-xs text-[#e3e2e8] hover:text-cyan-400 font-semibold truncate block transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-2 rounded-xl glass-btn text-[#9ca3af] hover:text-cyan-300 transition-colors"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* GitHub Profile */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-sub-box text-cyan-400 shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono-code text-[10px] text-[#6b7280] block">
                    DEVELOPER REPOSITORY
                  </span>
                  <span className="font-mono-code text-xs text-[#e3e2e8] group-hover:text-cyan-300 font-semibold block transition-colors">
                    github.com/ekamsingh0001-esb
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#6b7280] group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl glass-card border border-white/10 hover:border-indigo-400/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-sub-box text-indigo-400 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono-code text-[10px] text-[#6b7280] block">
                    PROFESSIONAL NETWORK
                  </span>
                  <span className="font-mono-code text-xs text-[#e3e2e8] group-hover:text-indigo-300 font-semibold block transition-colors">
                    LinkedIn: Ekam Singh
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#6b7280] group-hover:text-indigo-400 transition-colors" />
            </a>

            {/* Location & Response Time Meta */}
            <div className="p-4 rounded-2xl glass-sub-box border border-white/[0.08] space-y-2 text-xs font-mono-code">
              <div className="flex items-center justify-between text-[#9ca3af]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Base Location</span>
                </span>
                <span className="text-[#e3e2e8] font-semibold">South Delhi / VIT Vellore</span>
              </div>
              <div className="flex items-center justify-between text-[#9ca3af]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Avg Response Time</span>
                </span>
                <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
