import React, { useState } from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Building2, 
  TrendingUp, 
  Bell, 
  Sparkles, 
  Network, 
  Cpu, 
  Leaf, 
  Table, 
  FileText, 
  Menu, 
  X, 
  Moon, 
  Sun,
  ShieldAlert,
  GitMerge
} from 'lucide-react';
import { NavigationTab } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  activeAlertsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'buildings', label: 'Buildings', icon: <Building2 className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'ai-detection', label: 'AI Detection', icon: <ShieldAlert className="w-4 h-4 text-emerald-300" /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" />, badge: activeAlertsCount },
    { id: 'ai-workflow', label: 'AI Workflow', icon: <GitMerge className="w-4 h-4" /> },
    { id: 'impact', label: 'Impact & Feasibility', icon: <Leaf className="w-4 h-4" /> },
    { id: 'dataset', label: 'Dataset Explorer', icon: <Table className="w-4 h-4" /> },
    { id: 'decision-engine', label: 'AI Simulator', icon: <Cpu className="w-4 h-4" /> },
    { id: 'problem-statement', label: 'Lineage & Stack', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#064e3b] text-white border-b border-emerald-900/80 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-400 rounded-xl flex items-center justify-center text-emerald-950 shadow-md">
              <Zap className="w-5 h-5 fill-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                  SMARTCAMPUS AI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest rounded-md bg-emerald-900 text-emerald-300 border border-emerald-700/80">
                  ASSIGNMENT 3B
                </span>
              </div>
              <p className="text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">
                AI-ENABLED CAMPUS ENERGY INTELLIGENCE
              </p>
            </div>
          </div>

          {/* System Online Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-950/80 rounded-full border border-emerald-700/60 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase font-mono">
              ● AI SYSTEM ONLINE
            </span>
          </div>

          {/* Controls: Theme & Mobile menu toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-300" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-900/80 text-emerald-200 border border-emerald-700/60"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Primary Tab Navigation Bar */}
        <div className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto border-t border-emerald-900/80 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                id={`nav-btn-${item.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-400 text-emerald-950 font-bold shadow-md'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-rose-950 text-rose-200' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900 bg-[#043e2f] px-4 pt-3 pb-6 space-y-1">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-800/80 text-xs text-emerald-300">
            <span className="font-bold uppercase tracking-wider text-[10px]">System Menu</span>
            <span className="text-emerald-400 font-mono font-bold text-[10px]">● AI SYSTEM ONLINE</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-400 text-emerald-950 font-bold border-l-4 border-emerald-300 shadow'
                      : 'text-emerald-100/90 bg-emerald-950/60 hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};


