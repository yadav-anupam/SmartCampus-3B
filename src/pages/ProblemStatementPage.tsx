import React from 'react';
import { FileText, ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Database, Network, Cpu, Lightbulb, Leaf } from 'lucide-react';
import { NavigationTab } from '../types';

interface ProblemStatementPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const ProblemStatementPage: React.FC<ProblemStatementPageProps> = ({ onNavigate }) => {
  const designChain = [
    { step: '1. Assignment 2B Data', desc: '22 observations across 5 buildings measuring Energy (kWh), Occupancy (%), and Temperature (°C).' },
    { step: '2. Problem Identification', desc: 'Hostel highest demand, high variance, moderate occupancy correlation (0.61), and unflagged peak anomalies.' },
    { step: '3. Smart System Design', desc: 'Centralized IoT sub-metering, environmental sensors, and gateway data integration.' },
    { step: '4. Data Flow Pipeline', desc: '7-stage architecture converting raw sensor packets to structured relational logs.' },
    { step: '5. Intelligent Analysis', desc: 'Statistical correlation engine, outlier detection, and prototype AI intelligence.' },
    { step: '6. Recommendations', desc: 'Actionable decision-support directives for facility managers and building administrators.' },
    { step: '7. Sustainability Impact', desc: 'Better visibility, operational efficiency, and estimated opportunity for energy waste reduction.' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Assignment Context & Problem Statement</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Bridging Assignment 2B Campus Energy Analysis to Assignment 3A Smart System Design
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold font-mono">
          Assignment 2B → 3A Bridge
        </div>
      </div>

      {/* Core Problem Statement Box */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-slate-200">
        <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>The Campus Energy Challenge</span>
        </h2>

        <p className="text-sm md:text-base leading-relaxed text-slate-200 font-medium">
          “Campus energy consumption varies across buildings and days. The previous data analysis identified the <strong className="text-emerald-400">Hostel as the highest average energy consumer</strong>, a <strong className="text-teal-300">moderate relationship between occupancy and energy consumption (r ≈ 0.61)</strong>, and several <strong className="text-rose-400">unusually high readings requiring investigation</strong>.”
        </p>

        <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>The SmartCampus Solution</span>
          </h3>
          <p className="text-xs md:text-sm leading-relaxed text-emerald-100">
            “SmartCampus addresses this gap by connecting energy, occupancy and temperature data to a centralized monitoring and decision-support system.”
          </p>
        </div>
      </div>

      {/* The Complete Solution Design Chain */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Full Methodological Chain
          </span>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">
            From Dataset Findings to Decision Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designChain.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors"
            >
              <span className="text-[11px] font-bold text-emerald-400 block">
                {item.step}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Author & Evaluator Notice Footer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-white block">Author Context:</span>
          <span>Designed by Anupam Yadav (Energy Systems Domain) for Smart Systems Solution Design (Assignment 3A).</span>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shrink-0 flex items-center gap-2"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
