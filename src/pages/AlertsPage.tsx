import React, { useState } from 'react';
import { SYSTEM_ALERTS } from '../data/campusDataset';
import { Bell, ShieldAlert, AlertTriangle, Info, CheckCircle2, Search, Filter, Lightbulb, ArrowRight } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredAlerts = SYSTEM_ALERTS.filter((a) => {
    if (filterType === 'ALL') return true;
    return a.type === filterType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-400" />
            <h1 className="text-2xl font-bold tracking-tight">Smart Alert System</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated anomaly detection and operational decision support alerts
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterType === 'ALL' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Alerts ({SYSTEM_ALERTS.length})
          </button>
          <button
            onClick={() => setFilterType('HIGH_ENERGY')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterType === 'HIGH_ENERGY' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🔴 High Energy
          </button>
          <button
            onClick={() => setFilterType('UNUSUAL_PATTERN')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterType === 'UNUSUAL_PATTERN' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🟡 Unusual Pattern
          </button>
          <button
            onClick={() => setFilterType('INFO')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              filterType === 'INFO' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🔵 Info
          </button>
        </div>
      </div>

      {/* Prototype Decision Support Banner Notice */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
        <Info className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          <strong>Monitoring & Decision Support Scope:</strong> Alerts notify administrators of abnormal consumption to guide physical facility inspection. The prototype system does not directly control physical campus hardware.
        </span>
      </div>

      {/* Alerts List */}
      <div className="space-y-6">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 rounded-2xl bg-slate-900 border shadow-xl space-y-4 ${
              alert.type === 'HIGH_ENERGY'
                ? 'border-rose-900/60'
                : alert.type === 'UNUSUAL_PATTERN'
                ? 'border-amber-900/60'
                : 'border-blue-900/60'
            }`}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                {alert.type === 'HIGH_ENERGY' && <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />}
                {alert.type === 'UNUSUAL_PATTERN' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {alert.type === 'INFO' && <Info className="w-5 h-5 text-blue-400" />}

                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    alert.type === 'HIGH_ENERGY'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : alert.type === 'UNUSUAL_PATTERN'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}
                >
                  {alert.type.replace('_', ' ')}
                </span>
                <span className="text-sm font-bold text-white">{alert.building}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Date: <strong className="text-white">{alert.date}</strong></span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  {alert.status}
                </span>
              </div>
            </div>

            {/* Alert Title & Message */}
            <div>
              <h3 className="text-base font-bold text-white mb-1">{alert.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
            </div>

            {/* Observed Metrics Badge */}
            <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400">Observed Metrics:</span>
              <span className="font-bold text-emerald-400">Energy: {alert.metrics.energy} kWh</span>
              <span className="font-bold text-teal-300">Occupancy: {alert.metrics.occupancy}%</span>
              <span className="font-bold text-amber-300">Temp: {alert.metrics.temperature}°C</span>
            </div>

            {/* Possible Areas to Investigate & Recommended Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Areas to Investigate */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Possible Areas to Investigate:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {alert.possibleAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700 text-[11px]"
                    >
                      • {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-xs">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                  <span>Action Directive</span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  “{alert.recommendedAction}”
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
