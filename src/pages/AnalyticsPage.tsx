import React from 'react';
import { BuildingComparisonChart } from '../components/BuildingComparisonChart';
import { EnergyTrendChart } from '../components/EnergyTrendChart';
import { OccupancyScatterPlot } from '../components/OccupancyScatterPlot';
import { TrendingUp, BarChart3, Users, Zap, Thermometer, ShieldAlert } from 'lucide-react';
import { calculateCorrelation, DATASET_22_OBSERVATIONS } from '../data/campusDataset';

export const AnalyticsPage: React.FC = () => {
  const correlation = calculateCorrelation();
  const highReadings = DATASET_22_OBSERVATIONS.filter((d) => d.isAnomaly);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Deep Energy & Environmental Analytics</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Statistical exploration of Assignment 2B dataset (22 observations across 5 buildings)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-teal-950 border border-teal-800 text-teal-300 text-xs font-bold">
            Pearson Correlation r ≈ {correlation}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold">
            22 Observations Analyzed
          </div>
        </div>
      </div>

      {/* Building Demand Distribution */}
      <BuildingComparisonChart />

      {/* Daily Fluctuations & Anomaly Line Chart */}
      <EnergyTrendChart />

      {/* Occupancy vs Energy Scatter Plot */}
      <OccupancyScatterPlot />

      {/* Detailed Statistical Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Daily Fluctuation Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <TrendingUp className="w-5 h-5" />
            <h3>Daily Fluctuation & Thermal Load</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Daily energy consumption exhibits high variance, ranging from 58 kWh (Admin Block on low-activity days) to 275 kWh (Hostel on warm peak days). Elevated ambient temperatures (&gt;29°C) amplify HVAC compressor runtime, creating noticeable daily surges.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            Finding: Fluctuations support implementing thermal pre-cooling and automated setback schedules.
          </div>
        </div>

        {/* Anomaly Detection Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            <h3>Unusual Readings Identified for Investigation</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The dataset includes several unusually high energy readings that deviate from expected occupancy-proportionate curves:
          </p>
          <ul className="space-y-1 text-xs text-slate-300">
            {highReadings.map((h) => (
              <li key={h.id} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  <strong>{h.building} ({h.date}):</strong> {h.energyConsumption} kWh at {h.occupancy}% occupancy ({h.temperature}°C) — {h.anomalyNote}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
