import React from 'react';
import { Zap, ShieldCheck, Sparkles, GitMerge } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#064e3b] flex items-center justify-center text-white shadow-md">
              <Zap className="w-4 h-4 fill-emerald-300 text-emerald-300" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight font-mono">
              SMARTCAMPUS AI
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed font-light">
            AI-Enabled Campus Energy Intelligence System. Evolves Assignment 2B data analysis and Assignment 3A system design into a practical AI anomaly detection platform for campus administrators.
          </p>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 text-[11px] text-emerald-800 dark:text-emerald-400 font-bold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Designed for AI-Enabled Solution Design – Assignment 3B</span>
          </div>
        </div>

        {/* Project Context Col */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] font-mono">
            Project Lineage & Author
          </h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
            <li>
              <span className="text-slate-500 dark:text-slate-400">Author:</span> <strong className="text-slate-900 dark:text-white">Anupam Yadav</strong>
            </li>
            <li>
              <span className="text-slate-500 dark:text-slate-400">Domain:</span> <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Energy Systems</span>
            </li>
            <li>
              <span className="text-slate-500 dark:text-slate-400">Lineage:</span> 2B (Data Analysis) → 3A (Management) → 3B (AI Anomaly)
            </li>
            <li>
              <span className="text-slate-500 dark:text-slate-400">Core AI Use Case:</span> Energy Anomaly Detection
            </li>
          </ul>
        </div>

        {/* Quick Links Col */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] font-mono">
            AI System Navigation
          </h4>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            <li>
              <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                • Dashboard Overview
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ai-detection')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold text-emerald-600 dark:text-emerald-400">
                • AI Anomaly Detector
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ai-workflow')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                • AI Workflow Diagram
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('buildings')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                • Building Comparison
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('decision-engine')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                • Interactive AI Simulator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dataset')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                • Dataset Explorer
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 gap-2">
        <p>© 2025 SmartCampus AI Prototype. AI outputs labeled as prototype anomaly estimates.</p>
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>● AI System Online (Prototype Isolation Forest)</span>
        </div>
      </div>
    </footer>
  );
};


