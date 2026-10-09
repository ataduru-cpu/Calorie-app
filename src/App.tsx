/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TodayScreen } from './components/TodayScreen';
import { ScannerScreen } from './components/ScannerScreen';
import { JournalScreen } from './components/JournalScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { Modals } from './components/Modals';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#fff9e9] text-[#1e1c10] flex flex-col font-body-md selection:bg-[#fece57] selection:text-[#735700]">
      {/* Fixed Apothecary Header */}
      <Header />

      {/* Main Active Screen */}
      <main className="flex-1 flex flex-col relative w-full">
        {activeTab === 'today' && <TodayScreen />}
        {activeTab === 'scanner' && <ScannerScreen />}
        {activeTab === 'journal' && <JournalScreen />}
        {activeTab === 'summary' && <SummaryScreen />}
      </main>

      {/* Fixed Skeuomorphic Bottom Nav */}
      <BottomNav />

      {/* Modals for Calibration, Quick Inscribe, Barcode, and Export */}
      <Modals />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
