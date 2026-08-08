import React, { useState } from 'react';
import { DATASET_22_OBSERVATIONS } from '../data/campusDataset';
import { Table, Search, Filter, ArrowUpDown, ShieldAlert, CheckCircle2, Download } from 'lucide-react';

export const DatasetPage: React.FC = () => {
  const [buildingFilter, setBuildingFilter] = useState<string>('ALL');
  const [anomalyOnly, setAnomalyOnly] = useState<boolean>(false);
  const [sortField, setSortField] = useState<'date' | 'energyConsumption' | 'occupancy' | 'temperature'>('date');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Filter & sort
  const filtered = DATASET_22_OBSERVATIONS.filter((item) => {
    if (buildingFilter !== 'ALL' && item.building !== buildingFilter) return false;
    if (anomalyOnly && !item.isAnomaly) return false;
    return true;
  }).sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: 'date' | 'energyConsumption' | 'occupancy' | 'temperature') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Table className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Assignment 2B Dataset Explorer</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Underlying dataset: 22 observations across 5 campus buildings tracking 5 primary variables
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold">
            22 Observations Total
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
            5 Variables
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Building Filter */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Building:</span>
            <select
              value={buildingFilter}
              onChange={(e) => setBuildingFilter(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none"
            >
              <option value="ALL" className="bg-slate-900">All Buildings</option>
              <option value="Hostel" className="bg-slate-900">Hostel</option>
              <option value="Academic Block" className="bg-slate-900">Academic Block</option>
              <option value="Science Complex" className="bg-slate-900">Science Complex</option>
              <option value="Library" className="bg-slate-900">Library</option>
              <option value="Admin Block" className="bg-slate-900">Admin Block</option>
            </select>
          </div>

          {/* Anomaly Checkbox */}
          <label className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={anomalyOnly}
              onChange={(e) => setAnomalyOnly(e.target.checked)}
              className="accent-emerald-500 rounded"
            />
            <span>Show Anomalies Only</span>
          </label>
        </div>

        <div className="text-slate-400 text-xs font-mono">
          Showing {filtered.length} of 22 records
        </div>
      </div>

      {/* Dataset Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Obs ID</th>
                <th 
                  onClick={() => toggleSort('date')}
                  className="p-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="p-4">Building</th>
                <th 
                  onClick={() => toggleSort('energyConsumption')}
                  className="p-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Energy (kWh)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('occupancy')}
                  className="p-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Occupancy (%)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('temperature')}
                  className="p-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Temp (°C)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="p-4">Pattern Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
              {filtered.map((row) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-slate-800/50 transition-colors ${
                    row.isAnomaly ? 'bg-rose-950/20' : ''
                  }`}
                >
                  <td className="p-4 font-mono font-bold text-slate-400">{row.id}</td>
                  <td className="p-4 font-semibold text-white">{row.date}</td>
                  <td className="p-4 font-medium text-slate-200">{row.building}</td>
                  <td className="p-4 font-extrabold text-emerald-400">{row.energyConsumption} kWh</td>
                  <td className="p-4 font-semibold text-teal-300">{row.occupancy}%</td>
                  <td className="p-4 font-semibold text-amber-300">{row.temperature}°C</td>
                  <td className="p-4">
                    {row.isAnomaly ? (
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1 w-fit">
                        <ShieldAlert className="w-3 h-3" />
                        <span>High Reading Anomaly</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded text-[10px] font-medium bg-slate-800 text-slate-400 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Normal Pattern</span>
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
  );
};
