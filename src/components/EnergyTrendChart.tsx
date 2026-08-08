import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceDot } from 'recharts';
import { DATASET_22_OBSERVATIONS } from '../data/campusDataset';
import { TrendingUp, AlertTriangle, Calendar, Filter } from 'lucide-react';

export const EnergyTrendChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'7-day' | 'full'>('full');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('ALL');

  // Filter dataset
  const filteredData = DATASET_22_OBSERVATIONS.filter((d) => {
    if (selectedBuilding !== 'ALL' && d.building !== selectedBuilding) return false;
    return true;
  });

  const chartData = viewMode === '7-day' ? filteredData.slice(0, 7) : filteredData;

  const anomalies = chartData.filter((d) => d.isAnomaly);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Daily Energy Consumption Trend
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking energy fluctuations across observation dates (kWh)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Building Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none"
            >
              <option value="ALL" className="bg-slate-900 text-slate-200">All Buildings</option>
              <option value="Hostel" className="bg-slate-900 text-slate-200">Hostel</option>
              <option value="Academic Block" className="bg-slate-900 text-slate-200">Academic Block</option>
              <option value="Science Complex" className="bg-slate-900 text-slate-200">Science Complex</option>
              <option value="Library" className="bg-slate-900 text-slate-200">Library</option>
              <option value="Admin Block" className="bg-slate-900 text-slate-200">Admin Block</option>
            </select>
          </div>

          {/* 7-day vs Full dataset view toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('7-day')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === '7-day' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              7-Day View
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'full' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Dataset ({DATASET_22_OBSERVATIONS.length} Obs)
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
              tickFormatter={(val) => val.split('-').slice(1).join('/')}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              unit=" kWh" 
              axisLine={{ stroke: '#475569' }}
              tickLine={false}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                      <div className="flex items-center justify-between gap-4 font-bold text-white">
                        <span>{data.building}</span>
                        <span className="text-slate-400">{data.date}</span>
                      </div>
                      <p className="text-emerald-400 font-semibold text-sm">
                        Energy: {data.energyConsumption} kWh
                      </p>
                      <p className="text-slate-300">Occupancy: {data.occupancy}%</p>
                      <p className="text-slate-300">Temp: {data.temperature}°C</p>
                      {data.isAnomaly && (
                        <div className="mt-1 pt-1 border-t border-rose-900/60 text-rose-300 font-medium">
                          ⚠ Anomaly Flagged: {data.anomalyNote}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="energyConsumption" 
              stroke="#10b981" 
              strokeWidth={2.5} 
              dot={{ fill: '#059669', r: 4 }}
              activeDot={{ r: 7, fill: '#34d399' }}
            />
            {anomalies.map((ano) => (
              <ReferenceDot
                key={ano.id}
                x={ano.date}
                y={ano.energyConsumption}
                r={8}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Footer */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Trend Insight:</strong> Energy consumption fluctuates across days, with several higher readings (red dots) requiring further investigation.
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dataset Range: Jul 22 - Aug 01, 2025</span>
        </div>
      </div>
    </div>
  );
};
