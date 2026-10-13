import React from 'react';
import { PageRoute } from '../types';
import { audioTelemetry } from '../utils/audioTelemetry';
import { X, Home, User, Code2, Award, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  currentRoute,
  onRouteChange,
}) => {
  const routes: { label: string; route: PageRoute; desc: string; icon: React.ReactNode }[] = [
    {
      label: 'SYSTEM CORE / HOME',
      route: '/',
      desc: 'Hero, introductory overview & fluid canvas',
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: 'ENGINEERING PROFILE',
      route: '/about',
      desc: 'Academic journey timeline & core focus vectors',
      icon: <User className="w-5 h-5" />,
    },
    {
      label: 'PROJECT BLUEPRINTS',
      route: '/projects',
      desc: 'Synapse Engine, systems, & hackathon prototypes',
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      label: 'VERIFIED CREDENTIALS',
      route: '/certificates',
      desc: 'HPE, Vigyantram/IIT Delhi, Avishkaar, HT Code-a-thon',
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: 'ESTABLISH TRANSMISSION',
      route: '/contact',
      desc: 'Direct dispatch form & verified social channels',
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  const handleNav = (route: PageRoute) => {
    audioTelemetry.playClick(600, 0.05);
    onRouteChange(route);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/75 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 glass-box-elevated border-r border-white/10 shadow-2xl transition-transform duration-300 flex flex-col justify-between p-5 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="font-heading font-bold text-lg text-cyan-400 tracking-wider">
                Ekam Singh
              </h2>
              <p className="font-mono-code text-[11px] text-[#9ca3af]">B.Tech CSE • VIT Vellore</p>
              <span className="font-mono-code text-[10px] text-cyan-400/90 tracking-wider block mt-0.5">
                ONLINE // SOUTH DELHI
              </span>
            </div>
            <button
              onClick={() => {
                audioTelemetry.playClick(380, 0.04);
                onClose();
              }}
              aria-label="Close Drawer"
              className="p-1.5 rounded-xl glass-btn text-[#9ca3af] hover:text-[#e3e2e8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2.5">
            {routes.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`text-left p-3 rounded-2xl transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                    isActive
                      ? 'glass-tab-active'
                      : 'glass-card border border-white/[0.08] text-[#9ca3af] hover:text-[#e3e2e8]'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl mt-0.5 ${
                      isActive
                        ? 'glass-sub-box text-cyan-300'
                        : 'bg-white/[0.04] text-[#9ca3af] group-hover:text-cyan-400'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-mono-code font-semibold text-xs tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#6b7280] group-hover:text-[#9ca3af] mt-0.5 block leading-tight">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="glass-sub-box p-3.5 rounded-2xl font-mono-code text-[11px] text-[#9ca3af] space-y-1">
            <div className="flex justify-between">
              <span>PORTFOLIO_REV</span>
              <span className="text-cyan-400 font-bold">v3.4.1</span>
            </div>
            <div className="flex justify-between">
              <span>BASE LOCATION</span>
              <span className="text-[#e3e2e8]">South Delhi, IN</span>
            </div>
            <div className="flex justify-between">
              <span>COLLEGE CAMPUS</span>
              <span className="text-[#e3e2e8]">VIT Vellore, TN</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 text-xs font-mono-code">
            <a
              href="https://github.com/ekamsingh0001-esb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-cyan-400 flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-white/20">•</span>
            <a
              href="mailto:ekamsingh1808@gmail.com"
              className="text-[#9ca3af] hover:text-cyan-400 flex items-center gap-1"
            >
              Email <Mail className="w-3 h-3" />
            </a>
          </div>

          <p className="text-center text-[10px] text-[#6b7280] font-mono-code">
            ENGINEERED BY EKAM SINGH • VIT VELLORE
          </p>
        </div>
      </aside>
    </>
  );
};
