import React, { useState, useEffect } from 'react';
import { DollarNotesBackground } from "./components/DollarNotesBackground";
import { PageRoute, ProjectItem, CertificateItem } from './types';
import { FluidShaderCanvas } from './components/FluidShaderCanvas';
import { Navbar } from './components/Navbar';
import { NavDrawer } from './components/NavDrawer';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { AiPortfolioChatbot } from './components/AiPortfolioChatbot';
import { CertificateModal } from './components/CertificateModal';
import { ProjectModal } from './components/ProjectModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ContactPage } from './pages/ContactPage';
import { audioTelemetry } from './utils/audioTelemetry';

export default function App() {
  // Determine initial route from pathname or hash
  const getInitialRoute = (): PageRoute => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '').replace('/', '');

    if (path === '/about' || hash === 'about') return '/about';
    if (path === '/projects' || hash === 'projects') return '/projects';
    if (path === '/certificates' || hash === 'certificates') return '/certificates';
    if (path === '/contact' || hash === 'contact') return '/contact';
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route changes with browser History API and window scroll
  const handleRouteChange = (newRoute: PageRoute) => {
    setCurrentRoute(newRoute);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to popstate (browser back/forward button clicks)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      if (['/', '/about', '/projects', '/certificates', '/contact'].includes(path)) {
        setCurrentRoute(path);
      } else {
        const hash = window.location.hash.replace('#', '').replace('/', '');
        if (hash === 'about') setCurrentRoute('/about');
        else if (hash === 'projects') setCurrentRoute('/projects');
        else if (hash === 'certificates') setCurrentRoute('/certificates');
        else if (hash === 'contact') setCurrentRoute('/contact');
        else setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Audio Telemetry Toggle
  const handleToggleAudio = () => {
    const newState = audioTelemetry.toggle();
    setIsAudioOn(newState);
    showToast(newState ? 'Audio Telemetry Synthesizer: ACTIVE' : 'Audio Telemetry: MUTED');
  };

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <div className="relative min-h-screen bg-[#07080d] text-[#e3e2e8] flex flex-col justify-between selection:bg-cyan-400 selection:text-[#07080d]">
      {/* =================================================================== */}
      {/* 1. SIGNATURE INTERACTIVE FLUID SHADER & AMBIENT NOTES (Persistent)  */}
      {/* =================================================================== */}
      <FluidShaderCanvas />
      <DollarNotesBackground />

      {/* =================================================================== */}
      {/* 2. TOP NAVBAR                                                       */}
      {/* =================================================================== */}
      <Navbar
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
      />

      {/* =================================================================== */}
      {/* 3. SLIDE-OUT NAVIGATION DRAWER                                      */}
      {/* =================================================================== */}
      <NavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
      />

      {/* =================================================================== */}
      {/* 4. MAIN PAGE ROUTING VIEW                                           */}
      {/* =================================================================== */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        {currentRoute === '/' && (
          <HomePage
            onRouteChange={handleRouteChange}
            onSelectProject={(p) => setSelectedProject(p)}
            onSelectCert={(c) => setSelectedCert(c)}
          />
        )}

        {currentRoute === '/about' && (
          <AboutPage onRouteChange={handleRouteChange} />
        )}

        {currentRoute === '/projects' && (
          <ProjectsPage
            onRouteChange={handleRouteChange}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {currentRoute === '/certificates' && (
          <CertificatesPage
            onRouteChange={handleRouteChange}
            onSelectCert={(c) => setSelectedCert(c)}
          />
        )}

        {currentRoute === '/contact' && (
          <ContactPage
            onRouteChange={handleRouteChange}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* =================================================================== */}
      {/* 5. FOOTER                                                           */}
      {/* =================================================================== */}
      <Footer onRouteChange={handleRouteChange} />

      {/* =================================================================== */}
      {/* 6. MOBILE BOTTOM NAV DOCK                                           */}
      {/* =================================================================== */}
      <BottomNav
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
      />

      {/* =================================================================== */}
      {/* 7. AI-POWERED PORTFOLIO CHATBOT (Persistent on every page)          */}
      {/* =================================================================== */}
      <AiPortfolioChatbot onRouteChange={handleRouteChange} />

      {/* =================================================================== */}
      {/* 8. MODALS (Certificates Lightbox & Project Case Study)              */}
      {/* =================================================================== */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* =================================================================== */}
      {/* 9. GLOBAL TOAST NOTIFICATION                                        */}
      {/* =================================================================== */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 px-4 py-2.5 rounded-xl bg-cyan-400 text-[#07080d] font-mono-code text-xs font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
