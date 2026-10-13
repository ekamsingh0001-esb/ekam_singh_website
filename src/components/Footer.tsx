import React from 'react';
import { PageRoute } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { audioTelemetry } from '../utils/audioTelemetry';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onRouteChange: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const scrollToTop = () => {
    audioTelemetry.playClick(650, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full border-t border-white/[0.08] bg-[#07080d]/85 backdrop-blur-md pt-12 pb-24 md:pb-12 text-[#9ca3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="font-heading font-bold text-lg text-[#e3e2e8] tracking-tight uppercase">
                {PERSONAL_INFO.name}
              </h3>
            </div>
            <p className="text-xs text-[#9ca3af] max-w-md leading-relaxed font-body">
              {PERSONAL_INFO.bio}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400/80">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>South Delhi (28.6139° N, 77.2090° E) • VIT Vellore</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono-code text-xs font-bold text-[#e3e2e8] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono-code">
              <li>
                <button
                  onClick={() => onRouteChange('/')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  01 // Home & Introduction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('/about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  02 // About & Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('/projects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  03 // Projects & Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('/certificates')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  04 // Verified Credentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('/contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  05 // Contact Transmission
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-3">
            <h4 className="font-mono-code text-xs font-bold text-[#e3e2e8] uppercase tracking-wider">
              Direct Channels
            </h4>
            <div className="space-y-2.5 text-xs font-mono-code">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
              >
                <Github className="w-4 h-4 text-[#9ca3af] group-hover:text-cyan-400" />
                <span>github.com/ekamsingh0001-esb</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-[#9ca3af] group-hover:text-cyan-400" />
                <span>LinkedIn: Ekam Singh</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#9ca3af] group-hover:text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#6b7280]">
          <div>
            © {new Date().getFullYear()} Ekam Singh. Built with React 19, TypeScript, WebGL Shaders & Tailwind.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-btn hover:border-cyan-400 text-[#9ca3af] hover:text-cyan-300 transition-all active:scale-95 cursor-pointer"
          >
            <span>TOP_OF_PAGE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
