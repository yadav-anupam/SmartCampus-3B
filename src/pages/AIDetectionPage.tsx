import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Zap, 
  Users, 
  Thermometer, 
  Building2, 
  Calendar, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Cpu,
  Info,
  Filter
} from 'lucide-react';
import { DATASET_22_OBSERVATIONS, analyzeEnergyAnomaly } from '../data/campusDataset';
import { NavigationTab, EnergyReading, AIAnomalyResult } from '../types';

interface AIDetectionPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const AIDetectionPage: React.FC<AIDetectionPageProps> = ({ onNavigate }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReading, setActiveReading] = useState<{ reading: EnergyReading; analysis: AIAnomalyResult } | null>(null);

  // Compute AI Anomaly results for all 22 observations
  const analyzedDataset = DATASET_22_OBSERVATIONS.map((obs) => {
    const analysis = analyzeEnergyAnomaly(obs);
    return {
      reading: obs,
      analysis,
    };
  });

  // Filter observations
  const filteredDataset = analyzedDataset.filter(({ reading, analysis }) => {
    const matchesBuilding = selectedBuilding === 'All' || reading.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'All' || analysis.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      reading.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reading.date.includes(searchQuery) ||
      obsIdText(reading).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBuilding && matchesStatus && matchesSearch;
  });

  function obsIdText(r: EnergyReading) {
    return r.id || 'OBS';
  }

  // Count stats
  const potentialAnomaliesCount = analyzedDataset.filter((item) => item.analysis.status === 'Potential Anomaly').length;
  const needsReviewCount = analyzedDataset.filter((item) => item.analysis.status === 'Needs Review').length;
  const normalCount = analyzedDataset.filter((item) => item.analysis.status === 'Normal').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldAlert className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                AI Energy Anomaly Detection
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pattern recognition and outlier analysis across campus building energy observations
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 font-mono text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Prototype Isolation Forest Engine
          </span>
        </div>
      </div>

      {/* Why Anomaly Detection Explanation Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-800/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Why Anomaly Detection Was Selected</span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            “Anomaly Detection was selected because the previous campus energy analysis identified several unusually high readings that require investigation.”
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-4xl font-light">
            Campus administrators cannot manually inspect hundreds of hourly meter logs across multiple buildings. Rather than using generic optimization promises, SmartCampus AI explicitly places an anomaly detection model directly after the data-processing layer to spot unusual consumption spikes, off-peak HVAC overruns, and unseasonable electrical loads.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">WHERE</span>
              <span className="text-white font-medium">After Analytics & Data Layer</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">WHAT</span>
              <span className="text-white font-medium">Pattern Deviation Detection</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">INPUT</span>
              <span className="text-white font-medium">Energy, Occupancy, Temp, Bldg</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">OUTPUT</span>
              <span className="text-white font-medium">Score, Status, Recommendation</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">ACTION</span>
              <span className="text-white font-medium">Targeted Admin Investigation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs vs Outputs Visual Flow Diagram */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
          AI Architecture & Signals Flow
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* 5 INPUT CARDS */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block">
              1. WHAT DOES AI RECEIVE? (5 INPUT FEATURES)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Energy Consumption</h4>
                  <p className="text-[10px] text-slate-500 font-mono">kWh per observation</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Occupancy Rate</h4>
                  <p className="text-[10px] text-slate-500 font-mono">% head-count estimate</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Temperature</h4>
                  <p className="text-[10px] text-slate-500 font-mono">°C ambient thermal load</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Building Context</h4>
                  <p className="text-[10px] text-slate-500 font-mono">Hostel, Academic, etc.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl sm:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Timestamp & Temporal Baseline</h4>
                  <p className="text-[10px] text-slate-500 font-mono">Date, day-of-week, hour window</p>
                </div>
              </div>
            </div>
          </div>

          {/* PROCESSOR BRIDGE */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-800 text-center space-y-1">
            <Cpu className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">PROCESSING</span>
            <span className="text-[9px] text-emerald-400 font-mono">Isolation Forest Model</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 hidden lg:block" />
          </div>

          {/* 4 OUTPUT CARDS */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block">
              2. WHAT DOES AI OUTPUT? (4 OUTPUT METRICS)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 border-l-4 border-l-rose-500">
                <span className="text-[9px] font-bold text-slate-400 uppercase">1. ANOMALY STATUS</span>
                <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">Potential Anomaly / Normal</h4>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 border-l-4 border-l-amber-500">
                <span className="text-[9px] font-bold text-slate-400 uppercase">2. ANOMALY SCORE</span>
                <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">0% — 100% Probability</h4>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 border-l-4 border-l-blue-500">
                <span className="text-[9px] font-bold text-slate-400 uppercase">3. EXPLANATION</span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">"High energy demand relative to observed low occupancy."</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 border-l-4 border-l-emerald-500">
                <span className="text-[9px] font-bold text-slate-400 uppercase">4. RECOMMENDED ACTION</span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">"Inspect high-consumption zones & electrical loads."</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Anomaly Score Threshold Legend */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              AI Anomaly Score Classification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prototype threshold mapping used for evaluation and classification
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-semibold border border-amber-300 dark:border-amber-800/80">
            Prototype threshold — intended for demonstration and further validation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">0% — 40%</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">NORMAL</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Consumption matches historical baseline and expected occupancy load. No intervention required.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">41% — 70%</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">NEEDS REVIEW</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Moderate deviation from occupancy expectations. Automated flag for facility log review.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase">71% — 100%</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">POTENTIAL ANOMALY</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Significant energy spike or high consumption during low occupancy. Dispatches administrator warning.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Dataset AI Anomaly Analysis Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        
        {/* Table Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight font-mono">
                Assignment 2B Dataset — AI Anomaly Detection Matrix
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold font-mono">
                22 OBSERVATIONS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All 22 observations evaluated by the prototype Isolation Forest anomaly algorithm
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[11px] font-bold">
              ● {potentialAnomaliesCount} Potential Anomalies
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-bold">
              ● {needsReviewCount} Review Flags
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
              ● {normalCount} Normal
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* Building Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Filter Building</label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All 5 Buildings</option>
              <option value="Hostel">Hostel (Highest Avg)</option>
              <option value="Academic Block">Academic Block</option>
              <option value="Science Complex">Science Complex</option>
              <option value="Library">Library</option>
              <option value="Admin Block">Admin Block (Lowest Avg)</option>
            </select>
          </div>

          {/* AI Status Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Filter AI Classification</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Potential Anomaly">Potential Anomaly (71–100%)</option>
              <option value="Needs Review">Needs Review (41–70%)</option>
              <option value="Normal">Normal (0–40%)</option>
            </select>
          </div>

          {/* Search Bar */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Search Dataset</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search date, building..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Dataset Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3">ID / Date</th>
                <th className="p-3">Building</th>
                <th className="p-3">Energy (kWh)</th>
                <th className="p-3">Occupancy (%)</th>
                <th className="p-3">Temp (°C)</th>
                <th className="p-3">AI Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Recommendation</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredDataset.map(({ reading, analysis }) => {
                const isPotential = analysis.status === 'Potential Anomaly';
                const isReview = analysis.status === 'Needs Review';

                return (
                  <tr 
                    key={reading.id}
                    onClick={() => setActiveReading({ reading, analysis })}
                    className={`hover:bg-emerald-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                      isPotential ? 'bg-rose-50/40 dark:bg-rose-950/20' : isReview ? 'bg-amber-50/30 dark:bg-amber-950/10' : ''
                    }`}
                  >
                    <td className="p-3 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      <div>{reading.id}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{reading.date}</div>
                    </td>

                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {reading.building}
                      {reading.building === 'Hostel' && (
                        <span className="ml-1 text-[9px] text-rose-600 dark:text-rose-400 font-mono">
                          (Highest Avg)
                        </span>
                      )}
                    </td>

                    <td className="p-3 font-mono font-extrabold text-slate-900 dark:text-white">
                      {reading.energyConsumption} kWh
                    </td>

                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                      {reading.occupancy}%
                    </td>

                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                      {reading.temperature}°C
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-1.5 font-mono font-extrabold">
                        <span className={`text-xs ${
                          isPotential ? 'text-rose-600 dark:text-rose-400' : isReview ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {analysis.anomalyScore}%
                        </span>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase inline-flex items-center gap-1 ${
                        isPotential 
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                          : isReview
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {isPotential && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                        {isReview && <Info className="w-3 h-3 text-amber-600" />}
                        {!isPotential && !isReview && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {analysis.status}
                      </span>
                    </td>

                    <td className="p-3 text-[11px] text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {analysis.recommendation}
                    </td>

                    <td className="p-3 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveReading({ reading, analysis });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold"
                      >
                        Inspect Signal
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span>* Showing {filteredDataset.length} of 22 campus observations</span>
          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Honesty Note: Prototype outputs derived from transparent rule-based Isolation Forest heuristic
          </span>
        </div>
      </div>

      {/* Detail Modal / Drawer for Selected Observation */}
      {activeReading && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp text-slate-900 dark:text-white">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  AI Inspection Signal • {activeReading.reading.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeReading.reading.building} ({activeReading.reading.date})
                </h3>
              </div>
              <button
                onClick={() => setActiveReading(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs"
              >
                Close
              </button>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">ENERGY</span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {activeReading.reading.energyConsumption} kWh
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">OCCUPANCY</span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {activeReading.reading.occupancy}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">TEMP</span>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                  {activeReading.reading.temperature}°C
                </span>
              </div>
            </div>

            {/* AI Score & Interpretation */}
            <div className="p-4 rounded-xl bg-emerald-950 text-emerald-100 border border-emerald-800 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">AI Evaluation</span>
                </div>
                <span className="text-sm font-extrabold font-mono text-emerald-400">
                  Anomaly Score: {activeReading.analysis.anomalyScore}%
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">AI Explanation</span>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {activeReading.analysis.explanation}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">Recommended Action</span>
                <p className="text-xs text-emerald-200 font-semibold leading-relaxed">
                  {activeReading.analysis.recommendation}
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                onClick={() => {
                  setActiveReading(null);
                  onNavigate('decision-engine');
                }}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Test in AI Decision Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveReading(null)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
