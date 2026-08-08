export interface EnergyReading {
  id: string;
  date: string; // YYYY-MM-DD
  building: string;
  energyConsumption: number; // kWh
  occupancy: number; // percentage 0-100
  temperature: number; // °C
  isAnomaly?: boolean;
  anomalyNote?: string;
}

export interface AIAnomalyResult {
  anomalyScore: number; // 0 - 100
  status: 'Normal' | 'Needs Review' | 'Potential Anomaly';
  category: 'LOW' | 'MEDIUM' | 'HIGH';
  explanation: string;
  recommendation: string;
  factors: {
    buildingBaselineDiffPct: number;
    occupancyEfficiencyRatio: number;
    thermalImpact: string;
  };
}

export interface BuildingStats {
  id: string;
  name: string;
  category: string;
  avgEnergy: number; // kWh
  avgOccupancy: number; // %
  avgTemperature: number; // °C
  totalReadings: number;
  status: 'Critical' | 'Warning' | 'Optimal' | 'Normal';
  statusLabel: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  recommendation: string;
  primaryAlert?: string;
  description: string;
}

export interface SmartAlert {
  id: string;
  type: 'HIGH_ENERGY' | 'UNUSUAL_PATTERN' | 'INFO';
  title: string;
  building: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  metrics: {
    energy: number;
    occupancy: number;
    temperature: number;
  };
  possibleAreas: string[];
  recommendedAction: string;
  status: 'Active' | 'Investigating' | 'Resolved';
}

export interface AIInsight {
  id: string;
  title: string;
  category: 'Highest Demand' | 'Occupancy Link' | 'Fluctuations' | 'Anomalies' | 'Opportunity';
  insight: string;
  whyItMatters: string;
  dataEvidence: string;
  recommendedAction: string;
  confidence: number;
  badgeText: string;
}

export interface DecisionSimulationInput {
  building: string;
  occupancy: number;
  energyConsumption: number;
  temperature: number;
}

export interface DecisionSimulationResult {
  status: 'NORMAL' | 'HIGH' | 'UNUSUAL';
  color: string;
  summary: string;
  reasoning: string[];
  recommendedAction: string;
  potentialImpact: string;
}

export type NavigationTab = 
  | 'dashboard'
  | 'buildings'
  | 'analytics'
  | 'ai-detection'
  | 'ai-insights'
  | 'alerts'
  | 'ai-workflow'
  | 'impact'
  | 'dataset'
  | 'decision-engine'
  | 'problem-statement';

