import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid } from 'recharts';
import { DATASET_22_OBSERVATIONS, calculateCorrelation } from '../data/campusDataset';
import { Users, Sparkles, AlertCircle } from 'lucide-react';

export const OccupancyScatterPlot: React.FC = () => {
  const correlation = calculateCorrelation();

  const buildingColors: Record<string, string> = {
    Hostel: '#ef4444',
    'Academic Block': '#f59e0b',
    'Science Complex': '#3b82f6',
    Library: '#10b981',
    'Admin Block': '#059669',
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Occupancy vs. Energy Consumption Correlation
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing operational demand dependence on building occupancy
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-teal-950/80 border border-teal-800/60 text-teal-300 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Pearson Correlation r ≈ {correlation}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Scatter Chart */}
        <div className="lg:col-span-2 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis 
                type="number" 
                dataKey="occupancy" 
                name="Occupancy" 
                unit="%" 
                stroke="#94a3b8" 
                fontSize={12}
                domain={[20, 100]}
                axisLine={{ stroke: '#475569' }}
                tickLine={false}
              />
              <YAxis 
                type="number" 
                dataKey="energyConsumption" 
                name="Energy" 
                unit=" kWh" 
                stroke="#94a3b8" 
                fontSize={12}
                axisLine={{ stroke: '#475569' }}
                tickLine={false}
              />
              <ZAxis range={[60, 60]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                        <p className="font-bold text-white">{data.building} ({data.date})</p>
                        <p className="text-teal-300 font-semibold">Occupancy: {data.occupancy}%</p>
                        <p className="text-emerald-400 font-semibold">Energy: {data.energyConsumption} kWh</p>
                        <p className="text-slate-400">Temp: {data.temperature}°C</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={DATASET_22_OBSERVATIONS} fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Statistical Analysis Card */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Relationship Analysis
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Moderate Positive Relationship
            </h3>
          </div>

          <p className="text-slate-300 leading-relaxed">
            Higher occupancy is generally associated with higher energy consumption in the analyzed dataset (correlation coefficient ≈ 0.61).
          </p>

          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-200/90 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Statistical Nuance</span>
            </div>
            <p>
              Occupancy is a significant driver, but not the <i>only</i> cause of energy consumption. Ambient temperature, equipment base-loads, and manual overrides account for the remaining operational variance.
            </p>
          </div>

          {/* Building Color Legend */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[11px]">
            {Object.entries(buildingColors).map(([bName, color]) => (
              <span key={bName} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                {bName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
