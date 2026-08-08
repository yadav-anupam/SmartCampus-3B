import React from 'react';
import { SYSTEM_ARCHITECTURE_STAGES } from '../data/campusDataset';
import { Network, Cpu, Database, Radio, CloudUpload, ShieldAlert, Sparkles, LayoutDashboard, ArrowDown, CheckCircle2 } from 'lucide-react';

export const SystemDesignPage: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">System Architecture & Data Flow</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end telemetry pipeline connecting physical sensors to decision support
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold">
          Proposed Smart System Architecture
        </div>
      </div>

      {/* High-Level Architecture Flow Diagram (INPUT -> PROCESSING -> ANALYSIS -> DECISION -> ACTION) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight">
          System Processing Pipeline Diagram
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">STEP 1</span>
            <h3 className="text-xs font-extrabold text-white">INPUT</h3>
            <p className="text-[11px] text-slate-400">Energy Meters, Occupancy & Temp Sensors</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">STEP 2</span>
            <h3 className="text-xs font-extrabold text-white">PROCESSING</h3>
            <p className="text-[11px] text-slate-400">Gateway Aggregation & Database Indexing</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">STEP 3</span>
            <h3 className="text-xs font-extrabold text-white">ANALYSIS</h3>
            <p className="text-[11px] text-slate-400">Correlation Engine & Anomaly Outlier Detector</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">STEP 4</span>
            <h3 className="text-xs font-extrabold text-white">DECISION</h3>
            <p className="text-[11px] text-slate-400">Rule Engine & AI Recommendation Matrix</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">STEP 5</span>
            <h3 className="text-xs font-extrabold text-white">ACTION</h3>
            <p className="text-[11px] text-slate-400">Dashboard Alerts & Facility Dispatch</p>
          </div>

        </div>
      </div>

      {/* Detailed Stage-by-Stage Flow */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Detailed Pipeline Stages
        </h2>

        <div className="space-y-4">
          {SYSTEM_ARCHITECTURE_STAGES.map((stg, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4 max-w-2xl">
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{stg.stage}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{stg.description}</p>
                  </div>
                </div>

                {/* Sub Inputs & Data Payload */}
                <div className="w-full md:w-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Data Payload & Handshake:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {stg.inputs.map((inp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
                        • {inp}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {index < SYSTEM_ARCHITECTURE_STAGES.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="w-5 h-5 text-emerald-500/60 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
