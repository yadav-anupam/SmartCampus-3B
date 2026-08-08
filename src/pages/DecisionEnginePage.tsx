import React from 'react';
import { DecisionSimulator } from '../components/DecisionSimulator';
import { Cpu, Sparkles, Info, CheckCircle2 } from 'lucide-react';

export const DecisionEnginePage: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Interactive Prototype Decision Engine</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate building operational variables to test real-time decision-support logic
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-semibold">
          Decision Support System Prototype
        </div>
      </div>

      {/* Decision Simulator Component */}
      <DecisionSimulator />

      {/* Logic Documentation Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight">
          Decision Matrix Rules Documentation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 uppercase">
              RULE 1: ANOMALOUS OUTLIER
            </span>
            <h3 className="font-bold text-white">IF Energy High AND Occupancy Low</h3>
            <p className="text-slate-300 leading-relaxed">
              Triggers an Anomaly Alert. Indicates idle equipment, stuck ventilation dampers, or left-on electronics during low-occupancy periods.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 uppercase">
              RULE 2: PEAK LOAD SURGE
            </span>
            <h3 className="font-bold text-white">IF Energy &gt; Max Baseline</h3>
            <p className="text-slate-300 leading-relaxed">
              Triggers a High Demand Alert. Recommends pre-cooling strategies and load-shaving HVAC setback adjustments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
              RULE 3: OCCUPANCY ALIGNED
            </span>
            <h3 className="font-bold text-white">IF Energy ∝ Occupancy</h3>
            <p className="text-slate-300 leading-relaxed">
              Classified as Normal Operation. Consumption matches expected activity density within normal statistical variance.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
