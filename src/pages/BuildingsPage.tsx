import React from 'react';
import { getBuildingSummaries } from '../data/campusDataset';
import { BuildingStats } from '../types';
import { Building2, Zap, Users, Thermometer, ArrowUpRight, ArrowDownRight, Minus, AlertCircle, Sparkles } from 'lucide-react';

interface BuildingsPageProps {
  onSelectBuilding: (building: BuildingStats) => void;
}

export const BuildingsPage: React.FC<BuildingsPageProps> = ({ onSelectBuilding }) => {
  const buildings = getBuildingSummaries();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Campus Buildings Overview</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare operational metrics across all 5 monitored campus structures from the Assignment 2B dataset.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Click any building card to open full detailed analytics & readings</span>
        </div>
      </div>

      {/* Building Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildings.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelectBuilding(b)}
            className="group relative p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 space-y-4"
          >
            {/* Status Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {b.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                  {b.name}
                </h3>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  b.status === 'Critical'
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    : b.status === 'Warning'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                }`}
              >
                {b.statusLabel}
              </span>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2">
              {b.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Avg Energy</span>
                <span className="font-bold text-emerald-400 text-sm">{b.avgEnergy} kWh</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Avg Occ</span>
                <span className="font-bold text-teal-300 text-sm">{b.avgOccupancy}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Avg Temp</span>
                <span className="font-bold text-amber-300 text-sm">{b.avgTemperature}°C</span>
              </div>
            </div>

            {/* Recommendation Preview */}
            <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Key Recommendation
              </span>
              <p className="text-slate-300 line-clamp-2 text-[11px] italic">
                “{b.recommendation}”
              </p>
            </div>

            {/* Card Footer Button */}
            <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Inspect Building Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
