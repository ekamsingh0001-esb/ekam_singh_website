import React from 'react';
import { PageRoute } from '../types';
import { audioTelemetry } from '../utils/audioTelemetry';
import { Volume2, VolumeX, Menu, Terminal } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
  onOpenDrawer: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onRouteChange,
  onOpenDrawer,
  isAudioOn,
  onToggleAudio,
}) => {
  const navLinks: { label: string; route: PageRoute; iconName: string }[] = [
    { label: 'Home', route: '/', iconName: 'Home' },
    { label: 'About', route: '/about', iconName: 'User' },
    { label: 'Projects', route: '/projects', iconName: 'Layers' },
    { label: 'Certificates', route: '/certificates', iconName: 'Award' },
    { label: 'Contact', route: '/contact', iconName: 'Mail' },
  ];

  const handleLinkClick = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    audioTelemetry.playClick(520, 0.05);
    onRouteChange(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07080d]/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioTelemetry.playClick(440, 0.05);
              onOpenDrawer();
            }}
            aria-label="Open Navigation Menu"
            className="md:hidden p-2 rounded-xl glass-btn text-[#e3e2e8] active:scale-95 transition-all"
          >
            <Menu className="w-5 h-5 text-cyan-400" />
          </button>

          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9 rounded-xl glass-sub-box border border-cyan-400/50 flex items-center justify-center font-heading font-bold text-cyan-400 text-sm shadow-[0_0_15px_rgba(34,211,238,0.25)] group-hover:border-cyan-400 transition-colors">
              <span>ES</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-[#07080d]" />
            </div>
            <div>
              <span className="font-heading font-bold tracking-tight text-[#e3e2e8] text-sm uppercase block group-hover:text-cyan-300 transition-colors">
                Ekam Singh
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 glass-box p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => handleLinkClick(e, item.route)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all duration-200 relative ${
                  isActive
                    ? 'glass-tab-active font-semibold'
                    : 'text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Trailing Controls */}
        <div className="flex items-center gap-2.5">
          {/* Status badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-sub-box text-cyan-400 font-mono-code text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            SYS.ONLINE
          </div>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
            }}
            title={isAudioOn ? 'Mute audio telemetry' : 'Enable futuristic audio telemetry'}
            className={`p-2 rounded-xl transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
              isAudioOn
                ? 'glass-btn-primary'
                : 'glass-btn text-[#9ca3af] hover:text-[#e3e2e8]'
            }`}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Direct CTA */}
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-btn-primary font-heading font-semibold text-xs active:scale-95 transition-all cursor-pointer"
          >
            <span>CONNECT</span>
            <Terminal className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
