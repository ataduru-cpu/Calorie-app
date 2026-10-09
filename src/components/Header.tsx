import React from 'react';
import { useApp, ASSETS } from '../context/AppContext';

export const Header: React.FC = () => {
  const { activeTab, dateString } = useApp();

  const getTitle = () => {
    switch (activeTab) {
      case 'today':
        return 'Today';
      case 'scanner':
        return 'Ai Scanner';
      case 'journal':
        return 'Log & Journal';
      case 'summary':
        return 'Summary';
      default:
        return 'Today';
    }
  };

  // Extract short date e.g. "OCT 24"
  const getShortDate = () => {
    if (dateString.includes('Oct 24')) return 'OCT 24';
    if (dateString.includes('Oct 25')) return 'OCT 25';
    if (dateString.includes('Oct 23')) return 'OCT 23';
    return 'OCT 24';
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#fff9e9]/90 backdrop-blur-xl shadow-[0_4px_16px_rgba(21,66,18,0.12)] border-b border-[#e8e2d0]/50">
      <div className="h-16 px-4 flex items-center justify-between gap-2 bg-gradient-to-b from-[#eec14b]/15 via-[#faf3e0] to-[#f4eedb]">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            alt="Apothecary Atelier Emblem"
            className="h-8 w-auto object-contain shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
            src={ASSETS.emblem}
          />
          <div className="flex flex-col truncate">
            <span className="font-label-sm text-[#775a00] tracking-widest uppercase text-[10px]">Vitalis</span>
            <span className="font-headline-sm text-[#154212] tracking-tight truncate drop-shadow-[0_1px_0_rgba(255,255,255,0.7)] text-[17px] font-semibold">
              {getTitle()}
            </span>
          </div>
        </div>

        {/* Date Stamp & Profile Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#333124] text-[#fff9e9] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.15)] cursor-default">
            <span className="material-symbols-outlined text-[13px] text-[#ffdf98]">calendar_today</span>
            <span className="font-label-md text-[#ffdf98] tracking-wider uppercase text-[11px] font-semibold">
              {getShortDate()}
            </span>
          </div>

          <div className="p-0.5 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.avatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
