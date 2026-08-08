import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { getBuildingSummaries } from '../data/campusDataset';
import { Info, Sparkles, Building2 } from 'lucide-react';

interface BuildingComparisonChartProps {
  onSelectBuilding?: (buildingName: string) => void;
}

export const BuildingComparisonChart: React.FC<BuildingComparisonChartProps> = ({ onSelectBuilding }) => {
  const buildings = getBuildingSummaries().sort((a, b) => b.avgEnergy - a.avgEnergy);

  // Color gradient map for building consumption levels
  const getBarColor = (name: string) => {
    if (name === 'Hostel') return '#059669'; // Emerald primary
    if (name === 'Academic Block') return '#10b981'; // Emerald medium
    if (name === 'Science Complex') return '#34d399'; // Emerald light
    if (name === 'Library') return '#6ee7b7'; // Mint
    if (name === 'Admin Block') return '#cbd5e1'; // Slate
    return '#10b981';
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
              Building Performance Comparison
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Average electricity consumption by facility (kWh per observation)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold text-[11px]">
            kWh Consumption
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Chart Column */}
        <div className="lg:col-span-2 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buildings} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" opacity={0.8} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                unit=" kWh" 
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1 text-white">
                        <p className="font-bold text-white text-sm">{data.name}</p>
                        <p className="text-emerald-400 font-semibold">
                          Avg Energy: <span className="text-white">{data.avgEnergy} kWh</span>
                        </p>
                        <p className="text-slate-300">
                          Avg Occupancy: <span className="text-white">{data.avgOccupancy}%</span>
                        </p>
                        <p className="text-slate-300">
                          Avg Temp: <span className="text-white">{data.avgTemperature}°C</span>
                        </p>
                        <p className="text-slate-400 italic text-[11px] pt-1">
                          Click to inspect building details
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="avgEnergy" 
                radius={[6, 6, 0, 0]} 
                cursor="pointer"
                onClick={(data) => onSelectBuilding && onSelectBuilding(data.name)}
              >
                {buildings.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={getBarColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insight Card */}
        <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-slate-950 border border-emerald-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Key Insight: Target Identification</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            “Hostel represents the highest average demand (~{buildings[0]?.avgEnergy} kWh) in dataset. Admin block records the lowest (~{buildings[buildings.length - 1]?.avgEnergy} kWh). Prioritize Hostel for efficiency retrofits.”
          </p>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-300">
              <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Dataset Provenance</span>
            </div>
            <p className="text-[11px]">
              Calculated from 22 observations in Assignment 2B. Occupancy moderate correlation (0.61) explains partial variance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

