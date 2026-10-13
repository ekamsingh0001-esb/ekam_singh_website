import React from 'react';
import { PageRoute } from '../types';
import { audioTelemetry } from '../utils/audioTelemetry';
import { Home, User, Code2, Award, Mail } from 'lucide-react';

interface BottomNavProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onRouteChange }) => {
  const tabs: { label: string; route: PageRoute; icon: React.ReactNode }[] = [
    { label: 'Home', route: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'About', route: '/about', icon: <User className="w-4 h-4" /> },
    { label: 'Projects', route: '/projects', icon: <Code2 className="w-4 h-4" /> },
    { label: 'Certs', route: '/certificates', icon: <Award className="w-4 h-4" /> },
    { label: 'Contact', route: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleTab = (route: PageRoute) => {
    audioTelemetry.playClick(500, 0.04);
    onRouteChange(route);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-box border-t border-white/10 px-2 py-1.5 flex justify-around items-center">
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        return (
          <button
            key={tab.route}
            onClick={() => handleTab(tab.route)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-90 cursor-pointer ${
              isActive
                ? 'glass-tab-active font-semibold'
                : 'text-[#9ca3af] hover:text-[#e3e2e8]'
            }`}
          >
            <div className="p-1">
              {tab.icon}
            </div>
            <span className="font-mono-code text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
