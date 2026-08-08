import React, { useState, useEffect } from 'react';
import { NavigationTab, BuildingStats } from './types';
import { getBuildingSummaries, getOverallKPIs } from './data/campusDataset';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BuildingDetailModal } from './components/BuildingDetailModal';

import { DashboardPage } from './pages/DashboardPage';
import { BuildingsPage } from './pages/BuildingsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIDetectionPage } from './pages/AIDetectionPage';
import { AIWorkflowPage } from './pages/AIWorkflowPage';
import { AlertsPage } from './pages/AlertsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { DecisionEnginePage } from './pages/DecisionEnginePage';
import { ImpactPage } from './pages/ImpactPage';
import { DatasetPage } from './pages/DatasetPage';
import { ProblemStatementPage } from './pages/ProblemStatementPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedBuildingModal, setSelectedBuildingModal] = useState<BuildingStats | null>(null);

  const kpis = getOverallKPIs();

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeAlertsCount={kpis.activeAlerts}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardPage
            onNavigate={setActiveTab}
            onSelectBuilding={(b) => setSelectedBuildingModal(b)}
          />
        )}

        {activeTab === 'buildings' && (
          <BuildingsPage
            onSelectBuilding={(b) => setSelectedBuildingModal(b)}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsPage />}

        {activeTab === 'ai-detection' && (
          <AIDetectionPage onNavigate={setActiveTab} />
        )}

        {activeTab === 'ai-workflow' && (
          <AIWorkflowPage onNavigate={setActiveTab} />
        )}

        {activeTab === 'alerts' && <AlertsPage />}

        {activeTab === 'ai-insights' && <AIInsightsPage />}

        {activeTab === 'decision-engine' && <DecisionEnginePage />}

        {activeTab === 'impact' && <ImpactPage />}

        {activeTab === 'dataset' && <DatasetPage />}

        {activeTab === 'problem-statement' && (
          <ProblemStatementPage onNavigate={setActiveTab} />
        )}
      </main>

      {/* Building Detail Modal */}
      <BuildingDetailModal
        building={selectedBuildingModal}
        onClose={() => setSelectedBuildingModal(null)}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

