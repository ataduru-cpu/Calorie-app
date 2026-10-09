import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: 'today' | 'scanner' | 'journal' | 'summary'; label: string; icon: string }[] = [
    { id: 'today', label: 'Today', icon: 'speed' },
    { id: 'scanner', label: 'Scanner', icon: 'center_focus_strong' },
    { id: 'journal', label: 'Journal', icon: 'menu_book' },
    { id: 'summary', label: 'Summary', icon: 'leaderboard' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#eee8d5]/95 backdrop-blur-xl shadow-[0_-4px_18px_rgba(26,30,24,0.18)] border-t border-[#c2c9bb]/60">
      <div className="h-20 px-2 flex items-center justify-around gap-1.5 bg-gradient-to-b from-[#e8e2d0]/60 via-[#f4eedb] to-[#e0dac7]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex flex-col items-center justify-center min-w-[72px] h-[58px] px-1 rounded-lg transition-all duration-150 select-none ${
                isActive
                  ? 'bg-gradient-to-b from-[#775a00] to-[#735700] text-white shadow-[inset_0_3px_5px_rgba(0,0,0,0.65),0_0_12px_rgba(254,206,87,0.75)] translate-y-[1px]'
                  : 'bg-gradient-to-b from-white via-[#faf3e0] to-[#eee8d5] text-[#42493e] shadow-[0_3px_4px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-2px_0_rgba(0,0,0,0.25)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] hover:text-[#1e1c10]'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[20px] transition-transform ${isActive ? 'scale-105 text-[#ffdf98]' : 'group-hover:scale-105'}`}>
                {tab.icon}
              </span>
              <span className={`font-label-sm uppercase tracking-wider mt-0.5 text-[10px] ${isActive ? 'text-[#fff9e9] font-bold' : 'font-semibold'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
