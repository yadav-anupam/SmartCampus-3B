import React from 'react';
import { ArrowRight, Sparkles, ShieldAlert, GitMerge, Info, Cpu } from 'lucide-react';
import { NavigationTab } from '../types';

interface HeaderBannerProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#064e3b] via-[#043e2f] to-slate-900 border border-emerald-800/80 p-6 md:p-8 text-white shadow-xl mb-8">
      {/* Background subtle highlights */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-3xl space-y-3.5">
          
          {/* Top Lineage Badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300">
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 border border-emerald-700/80 flex items-center gap-1.5 uppercase text-[10px] font-extrabold tracking-widest text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              ASSIGNMENT 3B — AI-ENABLED SOLUTION DESIGN
            </span>
            <span className="text-emerald-600 dark:text-emerald-700">•</span>
            <span className="text-emerald-100/90 text-xs font-medium">By Anupam Yadav (Energy Systems)</span>
          </div>

          {/* Solution Lineage Breadcrumb Chain */}
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-[11px] font-medium text-emerald-200 flex flex-wrap items-center gap-2">
            <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Evolution Chain:</span>
            <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-100">2B: Data Analysis</span>
            <span className="text-emerald-500">→</span>
            <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-100">3A: System Architecture</span>
            <span className="text-emerald-500">→</span>
            <span className="bg-emerald-400 text-emerald-950 font-bold px-2 py-0.5 rounded">3B: AI Anomaly Detection</span>
            <span className="text-emerald-500">→</span>
            <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-200">AI Insight</span>
            <span className="text-emerald-500">→</span>
            <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-200">Admin Action</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-mono">
            AI Energy Intelligence & Anomaly Detection
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
            Detect unusual campus energy consumption patterns across buildings and time periods. Automatically flag high-energy readings relative to occupancy, calculate anomaly scores, and provide actionable recommendations for campus administrators.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-emerald-950/90 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-800 text-[11px] font-medium">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>Groundwork: Assignment 2B Dataset (22 Observations, 5 Buildings)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-950/70 text-amber-200 px-3 py-1.5 rounded-lg border border-amber-800/80 text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Label: Prototype Anomaly Detection Environment</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('ai-detection')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-xs transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]"
            id="view-ai-detection-btn"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-950" />
            <span>Launch AI Anomaly Detector</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onNavigate('ai-workflow')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 font-semibold text-xs border border-emerald-700/80 transition-all hover:scale-[1.01]"
            id="open-ai-workflow-btn"
          >
            <GitMerge className="w-4 h-4 text-emerald-400" />
            <span>Explore AI Workflow Diagram</span>
          </button>

          <button
            onClick={() => onNavigate('decision-engine')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 font-semibold text-xs border border-emerald-800/80 transition-all hover:scale-[1.01]"
            id="open-decision-simulator-btn"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Interactive AI Simulator</span>
          </button>
        </div>
      </div>
    </div>
  );
};


