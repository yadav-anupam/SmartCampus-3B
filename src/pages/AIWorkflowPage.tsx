import React, { useState } from 'react';
import { 
  GitMerge, 
  Radio, 
  CloudUpload, 
  Database, 
  Cpu, 
  ShieldAlert, 
  Sparkles, 
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Info,
  Sliders,
  Layers
} from 'lucide-react';
import { SYSTEM_ARCHITECTURE_STAGES } from '../data/campusDataset';
import { NavigationTab } from '../types';

interface AIWorkflowPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const AIWorkflowPage: React.FC<AIWorkflowPageProps> = ({ onNavigate }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3); // Default to AI Model stage

  const workflowSteps = [
    {
      step: '1',
      title: 'Input Data Collection',
      subtitle: 'IoT Sensors & Meters',
      icon: <Radio className="w-5 h-5 text-emerald-500" />,
      tag: 'HARDWARE LAYER',
      description: 'Digital smart electricity meters record kWh continuously while PIR motion sensors monitor occupancy levels and ambient temperature sensors capture environmental heat.',
      inputs: ['Digital Electricity Meters', 'Occupancy PIR Sensors', 'Ambient Temperature (°C)'],
      outputs: ['Raw Electrical Readings', 'Occupancy Headcounts', 'Thermal Degrees'],
      assignmentLink: 'Generates the raw inputs found in Assignment 2B dataset.',
    },
    {
      step: '2',
      title: 'Data Processing & Preprocessing',
      subtitle: 'Aggregation & Normalization',
      icon: <CloudUpload className="w-5 h-5 text-blue-500" />,
      tag: 'ETL PIPELINE',
      description: 'Incoming sensor packets are timestamps-indexed, filtered for telemetry noise, and organized into clean structured records (Building, kWh, Occupancy %, Temp °C).',
      inputs: ['Raw Packet Stream', 'Building ID Tags', 'Timestamps'],
      outputs: ['Normalized Time-Series', 'Occupancy Ratio', 'Temperature Delta'],
      assignmentLink: 'Prepares structured observations ready for statistical correlation.',
    },
    {
      step: '3',
      title: 'Central Storage & Registry',
      subtitle: 'Time-Series Database',
      icon: <Database className="w-5 h-5 text-purple-500" />,
      tag: 'DATABASE LAYER',
      description: 'Stores historical campus reading logs and building metadata. Provides benchmark baselines (e.g. Hostel avg 222 kWh vs Admin avg 68 kWh) for comparison.',
      inputs: ['Structured Observations', 'Building Profiles', 'Historical Log History'],
      outputs: ['Building Baselines', 'Historical Standard Deviations', 'Query Sets'],
      assignmentLink: 'Serves as the repository for the 22 observations from Assignment 2B.',
    },
    {
      step: '4',
      title: 'AI Anomaly Detection Engine',
      subtitle: 'Isolation Forest Algorithm',
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      tag: 'AI MODEL LAYER',
      description: 'Evaluates each observation against occupancy-conditioned expectations. Calculates anomaly probability scores based on unexpected power draw during low occupancy.',
      inputs: ['kWh Demand', 'Occupancy %', 'Thermal Degree', 'Building Baseline'],
      outputs: ['Anomaly Score (0-100%)', 'Classification (Normal / Anomaly)', 'Root Cause Factor'],
      assignmentLink: 'Core AI capability introduced in Assignment 3B.',
    },
    {
      step: '5',
      title: 'AI Insight & Explanation',
      subtitle: 'Natural Language Reasoning',
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      tag: 'EXPLANATION ENGINE',
      description: 'Translates statistical anomaly scores into clear human-readable explanations and prioritized operational recommendations for campus managers.',
      inputs: ['Anomaly Score', 'Occupancy Variance', 'Historical Context'],
      outputs: ['Plain Text Explanation', 'Targeted Action Recommendation', 'Confidence Score'],
      assignmentLink: 'Provides actionable context instead of raw black-box scores.',
    },
    {
      step: '6',
      title: 'Administrator Action & Control',
      subtitle: 'Facility Intervention',
      icon: <LayoutDashboard className="w-5 h-5 text-teal-500" />,
      tag: 'HUMAN-IN-THE-LOOP',
      description: 'Campus administrators review flagged anomalies, dispatch facility technicians to check lighting/HVAC, or trigger automated setback routines to eliminate waste.',
      inputs: ['AI Alert Notification', 'Recommended Action', 'Building Details'],
      outputs: ['Facility Dispatch Ticket', 'HVAC Setback Adjustment', 'Energy Savings Realized'],
      assignmentLink: 'Closes the loop from raw sensor data to real sustainability impact.',
    },
  ];

  const currentStep = workflowSteps[activeStageIndex];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <GitMerge className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                AI System Workflow & Architecture
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                End-to-end data pipeline: Input → Processing → Central Storage → AI Anomaly Model → AI Insight → Admin Action
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('ai-detection')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start md:self-auto"
        >
          <span>Run Anomaly Detection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Evolution Summary Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Layers className="w-4 h-4" />
          <span>Solution Progression Architecture</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase font-mono">STEP 1: ASSIGNMENT 2B</span>
            <h3 className="font-bold text-slate-900 dark:text-white">Campus Data Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Analyzed 22 static observations across 5 buildings. Discovered Hostel highest avg (222 kWh) & occupancy link (r ≈ 0.61).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase font-mono">STEP 2: ASSIGNMENT 3A</span>
            <h3 className="font-bold text-slate-900 dark:text-white">Smart Management System</h3>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Designed 7-stage IoT architecture, dashboard visualizer, decision simulator, and rule-based threshold alert engine.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-1">
            <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase font-mono">STEP 3: ASSIGNMENT 3B</span>
            <h3 className="font-bold text-slate-900 dark:text-white">AI Anomaly Layer</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Integrated Isolation Forest model after processing layer to detect unexpected power spikes and auto-generate recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Stage Step Connector Diagram */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
          Interactive Pipeline Stages (Click Stage to Inspect)
        </h2>

        {/* Desktop Pipeline Horizontal Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {workflowSteps.map((s, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-2 relative ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg scale-[1.02] z-10'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-400/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    isActive ? 'bg-white text-emerald-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {s.step}
                  </span>
                  <div className={isActive ? 'text-white' : ''}>
                    {s.icon}
                  </div>
                </div>

                <div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest block ${
                    isActive ? 'text-emerald-200' : 'text-slate-400'
                  }`}>
                    {s.tag}
                  </span>
                  <h3 className="text-xs font-bold line-clamp-1 mt-0.5">
                    {s.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel for Selected Stage */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border border-emerald-800/80 shadow-xl space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {currentStep.icon}
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
                  STAGE {currentStep.step} OF 6 • {currentStep.tag}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {currentStep.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-xs font-mono font-bold self-start sm:self-auto">
              ● Active Workflow Focus
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-light">
            {currentStep.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Input Attributes */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">
                INPUT PARAMETERS
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {currentStep.inputs.map((inp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Deliverables */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block font-mono">
                OUTPUT DELIVERABLES
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {currentStep.outputs.map((out, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Alignment note */}
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center gap-2 text-xs text-emerald-200">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Assignment Alignment:</strong> {currentStep.assignmentLink}</span>
          </div>

        </div>

      </div>

      {/* Honest Scope & Technical Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Technical Transparency & Scope Boundary</span>
        </div>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          This system uses an extended prototype Isolation Forest heuristic designed for the 22-observation Assignment 2B dataset. In a full production campus deployment, this pipeline would connect to physical MQTT smart meter streams, continuous time-series databases (e.g. TimescaleDB/InfluxDB), and live notification webhooks.
        </p>
      </div>

    </div>
  );
};
