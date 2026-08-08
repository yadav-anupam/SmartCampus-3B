import React from 'react';
import { Zap, Users, Thermometer, Building2, Bell } from 'lucide-react';
import { getOverallKPIs } from '../data/campusDataset';

interface KPISectionProps {
  onAlertClick?: () => void;
  onBuildingClick?: () => void;
}

export const KPISection: React.FC<KPISectionProps> = ({ onAlertClick, onBuildingClick }) => {
  const kpis = getOverallKPIs();

  const cards = [
    {
      id: 'kpi-energy',
      title: 'Total Energy Consumption',
      value: `${kpis.totalEnergy.toLocaleString()}`,
      unit: 'kWh',
      badge: 'Prototype Dataset',
      subtitle: `Avg ${kpis.avgEnergyPerReading} kWh/obs`,
      icon: <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
      cardStyle: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'kpi-occupancy',
      title: 'Current Occupancy',
      value: `${kpis.avgOccupancy}%`,
      unit: '',
      badge: 'Normal Range',
      subtitle: `Correlation r ≈ ${kpis.correlation}`,
      icon: <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
      cardStyle: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100',
    },
    {
      id: 'kpi-temperature',
      title: 'Avg Temperature',
      value: `${kpis.avgTemp}°C`,
      unit: '',
      badge: 'Sensors Active',
      subtitle: 'Thermal load factor',
      icon: <Thermometer className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
      cardStyle: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100',
    },
    {
      id: 'kpi-buildings',
      title: 'Monitored Nodes',
      value: `0${kpis.buildingsCount}`,
      unit: 'Active',
      badge: '5 Buildings',
      subtitle: 'Hostel, Academic, Library...',
      icon: <Building2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />,
      cardStyle: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100',
      action: onBuildingClick,
    },
    {
      id: 'kpi-alerts',
      title: 'Active Alerts',
      value: `0${kpis.activeAlerts}`,
      unit: '',
      badge: 'Critical Action Req.',
      subtitle: '1 High Peak, 1 Pattern',
      icon: <Bell className="w-4 h-4 text-rose-500 dark:text-rose-400 animate-pulse" />,
      cardStyle: 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400',
      action: onAlertClick,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.id}
          id={card.id}
          onClick={card.action}
          className={`relative p-4 rounded-xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${card.cardStyle} ${
            card.action ? 'cursor-pointer hover:shadow-md' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              {card.title}
            </p>
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
              {card.icon}
            </div>
          </div>

          <p className="text-2xl font-bold tracking-tight">
            {card.value}
            {card.unit && <span className="text-xs font-semibold ml-1 text-slate-400">{card.unit}</span>}
          </p>

          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {card.subtitle}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {card.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

