import React, { useState } from 'react';
import { Cpu, Sparkles, AlertTriangle, CheckCircle, ShieldAlert, ArrowRight, RefreshCw, Info } from 'lucide-react';
import { DecisionSimulationResult } from '../types';

export const DecisionSimulator: React.FC = () => {
  const [building, setBuilding] = useState<string>('Hostel');
  const [occupancy, setOccupancy] = useState<number>(45);
  const [energy, setEnergy] = useState<number>(260);
  const [temperature, setTemperature] = useState<number>(29);

  // Evaluate prototype rule-based logic
  const evaluateSimulation = (): DecisionSimulationResult => {
    // Typical building baselines based on dataset
    const baselines: Record<string, { avgEnergy: number; maxNormal: number }> = {
      Hostel: { avgEnergy: 222, maxNormal: 235 },
      'Academic Block': { avgEnergy: 189, maxNormal: 210 },
      'Science Complex': { avgEnergy: 151, maxNormal: 170 },
      Library: { avgEnergy: 114, maxNormal: 130 },
      'Admin Block': { avgEnergy: 68, maxNormal: 85 },
    };

    const base = baselines[building] || { avgEnergy: 150, maxNormal: 180 };

    // Case 1: Unusually High / Anomaly
    if (energy > base.maxNormal && occupancy < 50) {
      return {
        status: 'UNUSUAL',
        color: 'rose',
        summary: 'UNUSUAL ANOMALOUS CONSUMPTION PATTERN DETECTED',
        reasoning: [
          `Energy demand (${energy} kWh) significantly exceeds expected baseline (${base.avgEnergy} kWh).`,
          `Occupancy is low (${occupancy}%), indicating substantial off-peak idle power draw or unmitigated base loads.`,
          `Ambient temperature (${temperature}°C) adds moderate cooling strain, but does not justify the energy magnitude.`,
        ],
        recommendedAction: 'Inspect high-consumption zones and electrical loads during periods of lower occupancy.',
        potentialImpact: 'Preventing unnecessary off-peak load could save an estimated 25-45 kWh/day.',
      };
    }

    // Case 2: High Energy Demand
    if (energy > base.maxNormal) {
      return {
        status: 'HIGH',
        color: 'amber',
        summary: 'HIGH ENERGY DEMAND DETECTED',
        reasoning: [
          `Recorded energy (${energy} kWh) is elevated above the historical average (${base.avgEnergy} kWh).`,
          `Occupancy (${occupancy}%) correlates with elevated demand, but peak load optimization is advised.`,
          `Temperature (${temperature}°C) likely contributing to active HVAC cooling load.`,
        ],
        recommendedAction: 'Engage pre-cooling strategies and check variable HVAC ventilation dampers.',
        potentialImpact: 'Optimizing HVAC schedules offers an estimated 10-20 kWh/day peak shaving opportunity.',
      };
    }

    // Case 3: Consistent / Normal
    return {
      status: 'NORMAL',
      color: 'emerald',
      summary: 'USAGE CONSISTENT WITH OCCUPANCY-DRIVEN DEMAND',
      reasoning: [
        `Energy consumption (${energy} kWh) aligns well with building historical average (${base.avgEnergy} kWh).`,
        `Occupancy (${occupancy}%) and thermal conditions (${temperature}°C) exhibit expected proportionate load.`,
        `No anomalous outlier patterns detected by decision matrix.`,
      ],
      recommendedAction: 'Maintain current energy management policies and sensor monitoring.',
      potentialImpact: 'Building operating within optimal parameters.',
    };
  };

  const result = evaluateSimulation();

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Interactive Prototype Decision Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate building inputs (Occupancy, Energy, Temperature) to test decision-support recommendations
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Rule-Based Decision Logic</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Sliders Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Simulator Inputs
          </h3>

          {/* Building Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Select Building:</label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-medium rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="Hostel">Hostel (Avg: 222 kWh)</option>
              <option value="Academic Block">Academic Block (Avg: 189 kWh)</option>
              <option value="Science Complex">Science Complex (Avg: 151 kWh)</option>
              <option value="Library">Library (Avg: 114 kWh)</option>
              <option value="Admin Block">Admin Block (Avg: 68 kWh)</option>
            </select>
          </div>

          {/* Energy Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Energy Consumption:</span>
              <span className="font-bold text-emerald-400">{energy} kWh</span>
            </div>
            <input
              type="range"
              min="40"
              max="320"
              step="5"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>40 kWh</span>
              <span>320 kWh</span>
            </div>
          </div>

          {/* Occupancy Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Occupancy Level:</span>
              <span className="font-bold text-teal-400">{occupancy}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={occupancy}
              onChange={(e) => setOccupancy(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Ambient Temperature:</span>
              <span className="font-bold text-amber-400">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="18"
              max="38"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>18°C</span>
              <span>38°C</span>
            </div>
          </div>

          <button
            onClick={() => {
              setEnergy(275);
              setOccupancy(42);
              setTemperature(31);
              setBuilding('Hostel');
            }}
            className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Preset Anomaly (Hostel OBS-04)</span>
          </button>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Decision Support Output
            </h3>
            <span className="text-[11px] text-slate-500">Evaluated in real-time</span>
          </div>

          {/* Status Badge & Banner */}
          <div
            className={`p-5 rounded-xl border ${
              result.status === 'UNUSUAL'
                ? 'bg-rose-950/50 border-rose-800/80 text-rose-200'
                : result.status === 'HIGH'
                ? 'bg-amber-950/50 border-amber-800/80 text-amber-200'
                : 'bg-emerald-950/50 border-emerald-800/80 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {result.status === 'UNUSUAL' && <ShieldAlert className="w-7 h-7 text-rose-400 shrink-0 animate-bounce" />}
              {result.status === 'HIGH' && <AlertTriangle className="w-7 h-7 text-amber-400 shrink-0" />}
              {result.status === 'NORMAL' && <CheckCircle className="w-7 h-7 text-emerald-400 shrink-0" />}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  System Status Classification
                </span>
                <h4 className="text-lg font-black tracking-tight">{result.summary}</h4>
              </div>
            </div>
          </div>

          {/* Analytical Reasoning list */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300">
              Analytical Logic Breakdown:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {result.reasoning.map((r, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Action & Estimated Opportunity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Recommended Action
              </span>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {result.recommendedAction}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Estimated Opportunity
              </span>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {result.potentialImpact}
              </p>
            </div>
          </div>

          {/* Mandated Disclaimer */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Note:</strong> This is a prototype decision-support model and not a real-time building control system.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
