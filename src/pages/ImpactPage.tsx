import React from 'react';
import { Leaf, Zap, Settings, Globe, Users, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const beneficiaries = [
    { title: 'Students & Hostel Residents', desc: 'Enjoy optimized indoor environmental comfort and participate in sustainability initiatives.' },
    { title: 'Faculty & Researchers', desc: 'Reliable power distribution and temperature stability across lecture halls and laboratories.' },
    { title: 'Campus Administration', desc: 'Data-driven capital expenditure and targeted energy budgeting based on empirical usage patterns.' },
    { title: 'Facility Managers', desc: 'Automated anomaly detection directs maintenance dispatches to exact high-consumption zones.' },
    { title: 'Campus Environment', desc: 'Reduces avoidable off-peak electricity waste, supporting long-term university ESG goals.' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Expected Sustainability Impact</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Evaluating the multi-dimensional value proposition of the proposed SmartCampus solution
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold">
          Labeled: Estimated Opportunity / Prototype Estimate
        </div>
      </div>

      {/* 3 Core Impact Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ENERGY */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 w-fit">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">1. ENERGY IMPACT</h2>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Better Visibility:</strong> Real-time and historical monitoring of sub-metered electricity consumption across all buildings.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>High-Demand Identification:</strong> Pinpoints peak energy consumers (Hostel & Academic Block) for targeted retrofits.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Faster Anomaly Investigation:</strong> Rapidly flags unseasonal or off-peak power surges before waste compounds.</span>
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-emerald-400 font-semibold">
            Metric Label: Estimated Opportunity
          </div>
        </div>

        {/* OPERATIONS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="p-3 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 w-fit">
            <Settings className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">2. OPERATIONAL IMPACT</h2>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Data-Driven Decisions:</strong> Replaces guesswork with empirical correlation analysis between occupancy and load.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Building-Level Monitoring:</strong> Granular comparison between administrative, residential, and laboratory facilities.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Prioritized Maintenance:</strong> Directs technician dispatches to specific zones exhibiting anomalous base loads.</span>
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-teal-300 font-semibold">
            Metric Label: Prototype Estimate
          </div>
        </div>

        {/* ENVIRONMENT */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="p-3 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 w-fit">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">3. ENVIRONMENTAL IMPACT</h2>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Supports Energy Efficiency:</strong> Lays the digital foundation for campus decarbonization and ESG compliance.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Reduces Unnecessary Waste:</strong> Minimizes off-peak lighting and HVAC operation in empty facilities.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Sustainable Operations:</strong> Fosters a data-aware culture among campus residents and facility managers.</span>
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-blue-300 font-semibold">
            Metric Label: Sustainability Roadmap
          </div>
        </div>

      </div>

      {/* Primary Beneficiaries Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white tracking-tight">Key Stakeholders & Beneficiaries</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {beneficiaries.map((b, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <h3 className="text-xs font-bold text-emerald-300">{b.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
