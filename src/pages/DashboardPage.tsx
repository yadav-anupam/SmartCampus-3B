import React from 'react';
import { HeaderBanner } from '../components/HeaderBanner';
import { KPISection } from '../components/KPISection';
import { BuildingComparisonChart } from '../components/BuildingComparisonChart';
import { EnergyTrendChart } from '../components/EnergyTrendChart';
import { OccupancyScatterPlot } from '../components/OccupancyScatterPlot';
import { DecisionSimulator } from '../components/DecisionSimulator';
import { NavigationTab, BuildingStats } from '../types';
import { SYSTEM_ALERTS, AI_SUSTAINABILITY_INSIGHTS, getBuildingSummaries } from '../data/campusDataset';
import { ArrowRight, Bell, Sparkles, Building2, ShieldAlert } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectBuilding: (building: BuildingStats) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectBuilding }) => {
  const buildings = getBuildingSummaries();

  const handleChartBuildingClick = (buildingName: string) => {
    const found = buildings.find((b) => b.name === buildingName);
    if (found) {
      onSelectBuilding(found);
    } else {
      onNavigate('buildings');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <HeaderBanner onNavigate={onNavigate} />

      {/* Top KPI Cards */}
      <KPISection 
        onAlertClick={() => onNavigate('alerts')}
        onBuildingClick={() => onNavigate('buildings')}
      />

      {/* Building Comparison Section */}
      <BuildingComparisonChart onSelectBuilding={handleChartBuildingClick} />

      {/* 2-Column Grid for Quick Alerts & Top AI Insights Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Quick Active Alerts Preview */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-500 dark:text-rose-400 animate-pulse" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">Active Smart Alerts</h3>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All Alerts ({SYSTEM_ALERTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {SYSTEM_ALERTS.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                onClick={() => onNavigate('alerts')}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-slate-700 transition-all cursor-pointer space-y-2 border-l-4 border-l-rose-500"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 uppercase">
                    {alert.building} • {alert.type.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{alert.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">{alert.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Spotlight Preview */}
        <div className="rounded-2xl bg-[#064e3b] text-white border border-emerald-800 p-6 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <h3 className="text-base font-bold text-white tracking-tight">AI Intelligence Spotlight</h3>
              </div>
              <button
                onClick={() => onNavigate('ai-insights')}
                className="text-xs text-emerald-300 hover:text-white font-semibold flex items-center gap-1"
              >
                <span>Explore AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#043e2f] border border-emerald-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900 text-emerald-200 border border-emerald-700/60 uppercase">
                  {AI_SUSTAINABILITY_INSIGHTS[0].badgeText}
                </span>
                <span className="text-[11px] text-emerald-200/80 font-mono">Confidence {AI_SUSTAINABILITY_INSIGHTS[0].confidence}%</span>
              </div>
              <h4 className="text-sm font-bold text-white">{AI_SUSTAINABILITY_INSIGHTS[0].title}</h4>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-light">{AI_SUSTAINABILITY_INSIGHTS[0].insight}</p>
              <div className="pt-2 border-t border-emerald-800 text-xs text-emerald-300 font-semibold">
                Recommended Action: {AI_SUSTAINABILITY_INSIGHTS[0].recommendedAction}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-800 text-[10px] text-emerald-300/80 uppercase tracking-widest font-bold">
            <span>Prototype Intelligence Engine</span>
            <span className="text-emerald-400">Assignment 3A Model</span>
          </div>
        </div>

      </div>

      {/* Energy Trend Chart */}
      <EnergyTrendChart />

      {/* Occupancy vs Energy Scatter Plot */}
      <OccupancyScatterPlot />

      {/* Interactive Decision Simulator */}
      <DecisionSimulator />
    </div>
  );
};

