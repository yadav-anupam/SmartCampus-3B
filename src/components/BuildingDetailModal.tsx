import React from 'react';
import { X, Building2, Zap, Users, Thermometer, TrendingUp, AlertTriangle, CheckCircle2, Sparkles, Lightbulb } from 'lucide-react';
import { BuildingStats } from '../types';
import { DATASET_22_OBSERVATIONS } from '../data/campusDataset';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface BuildingDetailModalProps {
  building: BuildingStats | null;
  onClose: () => void;
}

export const BuildingDetailModal: React.FC<BuildingDetailModalProps> = ({ building, onClose }) => {
  if (!building) return null;

  // Filter observations for this specific building
  const buildingReadings = DATASET_22_OBSERVATIONS.filter((d) => d.building === building.name);
  const hasAnomalies = buildingReadings.some((d) => d.isAnomaly);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-b border-slate-800 p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-emerald-300">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">{building.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  building.status === 'Critical'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : building.status === 'Warning'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {building.statusLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{building.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            id="close-building-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Average Energy</span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-extrabold text-white">{building.avgEnergy} kWh</p>
              <p className="text-[11px] text-slate-400 mt-1">Per observation average</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Average Occupancy</span>
                <Users className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-2xl font-extrabold text-white">{building.avgOccupancy}%</p>
              <p className="text-[11px] text-slate-400 mt-1">Observed capacity level</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Average Temperature</span>
                <Thermometer className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold text-white">{building.avgTemperature}°C</p>
              <p className="text-[11px] text-slate-400 mt-1">Ambient thermal condition</p>
            </div>
          </div>

          {/* Building Energy & Occupancy Trend Chart */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Consumption & Occupancy Timeline</h3>
              </div>
              <span className="text-xs text-slate-400">{buildingReadings.length} Dataset Observations</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={buildingReadings} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => v.split('-').slice(1).join('/')} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-xs space-y-1">
                            <p className="font-bold text-white">{data.date}</p>
                            <p className="text-emerald-400">Energy: {data.energyConsumption} kWh</p>
                            <p className="text-teal-300">Occupancy: {data.occupancy}%</p>
                            <p className="text-amber-300">Temp: {data.temperature}°C</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="energyConsumption" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Energy (kWh)" />
                  <Area type="monotone" dataKey="occupancy" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} name="Occupancy (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Targeted Recommendation Box */}
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
              <span>Targeted Sustainability Recommendation</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              “{building.recommendation}”
            </p>
            <div className="pt-1 text-[11px] text-slate-400">
              Status: <span className="text-emerald-400 font-semibold">Actionable Decision Support</span>
            </div>
          </div>

          {/* Observations Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">Specific Observation Readings</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Obs ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Energy (kWh)</th>
                    <th className="p-3">Occupancy (%)</th>
                    <th className="p-3">Temp (°C)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {buildingReadings.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-slate-400">{r.id}</td>
                      <td className="p-3 font-medium text-white">{r.date}</td>
                      <td className="p-3 font-semibold text-emerald-400">{r.energyConsumption} kWh</td>
                      <td className="p-3">{r.occupancy}%</td>
                      <td className="p-3">{r.temperature}°C</td>
                      <td className="p-3">
                        {r.isAnomaly ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                            ⚠ Anomaly
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
                            Normal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
