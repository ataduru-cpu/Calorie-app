import React, { useState } from 'react';
import { useApp, ASSETS } from '../context/AppContext';

export const SummaryScreen: React.FC = () => {
  const { weeklyData, setOpenExportModal } = useApp();

  const [activeView, setActiveView] = useState<'calories' | 'hydration' | 'macros'>('calories');
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const weekLabels = [
    'Week of Oct 18 – Oct 24',
    'Week of Oct 11 – Oct 17',
    'Week of Oct 4 – Oct 10',
  ];

  const currentWeekLabel = weekLabels[Math.abs(weekOffset) % weekLabels.length];

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-4 max-w-lg mx-auto select-none">
      {/* Top Stamped Brass Console Header & Switchgear */}
      <div className="relative w-full rounded-xl bg-gradient-to-b from-[#eee8d5] via-[#f4eedb] to-[#faf3e0] p-3 shadow-[0_4px_12px_rgba(26,30,24,0.22),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.3)] border border-[#d5c89e]">
        {/* Engraved Brass Screws in Corners */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#333124] rotate-45 opacity-80"></div>
        </div>
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#333124] -rotate-12 opacity-80"></div>
        </div>
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#333124] rotate-12 opacity-80"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#333124] -rotate-45 opacity-80"></div>
        </div>

        <div className="flex flex-col gap-1 px-2 py-1">
          {/* Stamped Metal Date Plaque */}
          <div className="flex items-center justify-between gap-1">
            <button
              onClick={() => setWeekOffset((p) => p - 1)}
              className="w-8 h-8 rounded-lg bg-gradient-to-b from-white via-[#eee8d5] to-[#e0dac7] text-[#1e1c10] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.45)] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            <div className="flex-1 text-center py-1 px-3 rounded bg-gradient-to-b from-[#ffdf98] via-[#eec14b] to-[#775a00] shadow-[inset_0_2px_3px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.5)]">
              <span className="font-label-sm text-[#251a00] uppercase tracking-widest block text-[9px] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] font-bold">
                ARCHIVAL RECORD
              </span>
              <span className="font-headline-sm text-[#1e1c10] tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] text-[15px] font-semibold">
                {currentWeekLabel}
              </span>
            </div>

            <button
              onClick={() => setWeekOffset((p) => p + 1)}
              className="w-8 h-8 rounded-lg bg-gradient-to-b from-white via-[#eee8d5] to-[#e0dac7] text-[#1e1c10] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.45)] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Mechanical Inset Switch Toggles */}
          <div className="mt-1 p-1 rounded-lg bg-[#333124] shadow-[inset_0_3px_6px_rgba(0,0,0,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-1">
            <button
              onClick={() => setActiveView('calories')}
              className={`flex-1 py-1.5 px-2 rounded font-label-md uppercase tracking-wider text-center transition-all cursor-pointer text-[11px] font-bold ${
                activeView === 'calories'
                  ? 'bg-gradient-to-b from-[#775a00] to-[#735700] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.4)]'
                  : 'text-[#ffdf98] hover:text-[#fff9e9]'
              }`}
              type="button"
            >
              Calories
            </button>

            <button
              onClick={() => setActiveView('hydration')}
              className={`flex-1 py-1.5 px-2 rounded font-label-md uppercase tracking-wider text-center transition-all cursor-pointer text-[11px] font-bold ${
                activeView === 'hydration'
                  ? 'bg-gradient-to-b from-[#775a00] to-[#735700] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.4)]'
                  : 'text-[#ffdf98] hover:text-[#fff9e9]'
              }`}
              type="button"
            >
              Hydration
            </button>

            <button
              onClick={() => setActiveView('macros')}
              className={`flex-1 py-1.5 px-2 rounded font-label-md uppercase tracking-wider text-center transition-all cursor-pointer text-[11px] font-bold ${
                activeView === 'macros'
                  ? 'bg-gradient-to-b from-[#775a00] to-[#735700] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.4)]'
                  : 'text-[#ffdf98] hover:text-[#fff9e9]'
              }`}
              type="button"
            >
              Macros
            </button>
          </div>
        </div>
      </div>

      {/* Calorie Adherence Console (Mechanical Liquid Manometer Tubes) */}
      <div className="relative w-full rounded-xl bg-gradient-to-b from-white via-[#faf3e0] to-[#f4eedb] p-4 shadow-[0_4px_16px_rgba(26,30,24,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.12)] border border-[#d5c89e]/60">
        {/* Header with Brass Engraving */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2d5a27] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),0_0_6px_rgba(45,90,39,0.5)]"></div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[#775a00] tracking-widest uppercase text-[9px] font-semibold">
                BAROMETER No. 7
              </span>
              <h2 className="font-headline-sm text-[#154212] tracking-tight text-[17px] font-semibold">
                {activeView === 'calories'
                  ? 'Caloric Adherence'
                  : activeView === 'hydration'
                  ? 'Liquid Volume Reservoir'
                  : 'Nutritional Ratio Integrity'}
              </h2>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded bg-[#eee8d5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fece57] animate-pulse"></span>
            <span className="font-label-sm text-[#42493e] uppercase text-[10px] font-semibold">
              {activeView === 'calories' ? 'Goal: 2,150' : activeView === 'hydration' ? 'Goal: 3,000 ml' : 'Balanced Ratio'}
            </span>
          </div>
        </div>

        {/* Liquid Column Gauge Deck */}
        <div className="relative w-full pt-4 pb-2 px-1">
          {/* Target Goal Brass Reference Cable across the tubes */}
          <div className="absolute top-[72px] left-0 right-0 z-20 flex items-center pointer-events-none">
            <div className="w-full h-[2px] bg-gradient-to-r from-[#eec14b] via-[#775a00] to-[#eec14b] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"></div>
            <span className="absolute right-1 -top-4 font-label-sm text-[#251a00] bg-[#ffdf98] px-1.5 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.3)] text-[8px] tracking-wider font-bold">
              {activeView === 'calories' ? '2,150 KCAL' : activeView === 'hydration' ? '3,000 ML' : 'IDEAL TARGET'}
            </span>
          </div>

          {/* 7 Manometer / Brass Tube Wells */}
          <div className="grid grid-cols-7 gap-2 items-end h-44 relative z-10 pt-2 pb-1">
            {weeklyData.map((d, idx) => {
              // Calculate fill height based on view
              let heightPct = Math.min(100, Math.round((d.calories / 2150) * 100));
              let isMet = d.met;
              let displayVal = d.calories.toLocaleString();

              if (activeView === 'hydration') {
                heightPct = Math.min(100, Math.round((d.water / 3000) * 100));
                isMet = d.water >= 2800;
                displayVal = (d.water / 1000).toFixed(1) + 'L';
              } else if (activeView === 'macros') {
                heightPct = Math.min(100, Math.round(((d.protein + d.carbs) / 380) * 100));
                isMet = heightPct >= 90;
                displayVal = `${d.protein}g`;
              }

              const isGreen = isMet;

              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  {/* Star icon if target met */}
                  {isMet ? (
                    <span className="material-symbols-outlined text-[13px] text-[#fece57] drop-shadow-[0_1px_2px_rgba(115,87,0,0.8)] mb-1 font-bold">
                      stars
                    </span>
                  ) : (
                    <div className="h-[13px] mb-1"></div>
                  )}

                  {/* Glass Tube Container */}
                  <div className="w-full max-w-[32px] h-32 rounded-full p-1 bg-[#333124] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),inset_0_-1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-end relative overflow-hidden">
                    {/* Glass Specular Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/5 pointer-events-none z-10"></div>

                    {/* Liquid Column */}
                    <div
                      className={`w-full rounded-full transition-all duration-700 ${
                        isGreen
                          ? 'bg-gradient-to-t from-[#154212] to-[#a1d494] shadow-[0_0_8px_rgba(161,212,148,0.7)]'
                          : 'bg-gradient-to-t from-[#5a4300] to-[#fece57] shadow-[0_0_6px_rgba(254,206,87,0.5)]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="w-full h-1.5 rounded-full bg-white/70 mx-auto"></div>
                    </div>
                  </div>

                  <span className="font-label-sm text-[#42493e] uppercase mt-1.5 text-[10px] font-semibold">
                    {d.day}
                  </span>
                  <span
                    className={`font-label-sm text-[9px] font-bold ${
                      isGreen ? 'text-[#154212]' : 'text-[#775a00]'
                    }`}
                  >
                    {displayVal}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Debossed Mechanical Digital Nixie Counter Readout */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#333124] shadow-[inset_0_3px_6px_rgba(0,0,0,0.8),inset_0_-1px_1px_rgba(255,255,255,0.1)] flex items-center justify-between border border-[#5a4300]/40">
          <div className="flex flex-col">
            <span className="font-label-sm text-[#ffdf98] tracking-widest uppercase text-[9px] font-semibold">
              7-Day Mean Output
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-metric-numeral text-[#fece57] tracking-tight drop-shadow-[0_0_8px_rgba(254,206,87,0.6)] text-[24px] font-bold">
                2,080
              </span>
              <span className="font-body-sm text-[#e8e2d0] text-[12px]">kcal / day</span>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-white/10 border-0 flex flex-col items-end">
            <span className="font-label-sm text-[#bcf0ae] uppercase tracking-wider text-[9px] font-bold">
              Adherence
            </span>
            <span className="font-headline-sm text-[#bcf0ae] drop-shadow-[0_0_6px_rgba(188,240,174,0.5)] text-[18px] font-bold">
              97%
            </span>
          </div>
        </div>
      </div>

      {/* Hydration Weekly Milestone Card (Mahogany Frame & Pressure Dial) */}
      <div className="relative w-full rounded-xl bg-gradient-to-b from-[#873724] via-[#692010] to-[#421207] p-3.5 shadow-[0_6px_18px_rgba(66,18,7,0.35),inset_0_1px_1px_rgba(255,218,210,0.3),inset_0_-2px_4px_rgba(0,0,0,0.6)] text-white border border-[#ffdad2]/30">
        {/* Inner Brushed Brass Bezel */}
        <div className="relative rounded-lg bg-white/95 p-3 text-[#1e1c10] shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] flex items-center gap-3">
          {/* Physical Circular Pressure Dial (SVG Skeuomorphic Gauge) */}
          <div className="relative w-24 h-24 shrink-0 rounded-full bg-gradient-to-b from-[#eee8d5] via-[#f4eedb] to-[#e0dac7] p-1.5 shadow-[0_3px_6px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center">
            {/* Brass Outer Bezel Rim */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#fff9e9] via-[#faf3e0] to-[#e0dac7] p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center relative">
              {/* Circular Ticks via SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="38" stroke="#e0dac7" strokeWidth="5" />
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#2d5a27"
                  strokeDasharray="238"
                  strokeDashoffset="40"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
              </svg>
              {/* Needle Hub */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[#ffdf98] to-[#5a4300] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-10" />
              {/* Gauge Readings */}
              <span className="font-label-sm text-[#775a00] uppercase tracking-widest text-[8px] mt-0.5 font-bold">
                Hydration
              </span>
              <span className="font-headline-sm text-[#154212] tracking-tight leading-none text-[15px] font-bold">
                2,750
              </span>
              <span className="font-label-sm text-[#42493e] text-[8px]">ml / day</span>
            </div>
          </div>

          {/* Milestone Badge & Authentic Wax Seal Graphics */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[16px] text-[#775a00]">verified</span>
              <span className="font-label-sm text-[#775a00] uppercase tracking-wider text-[10px] font-bold">
                Apothecary Stamp
              </span>
            </div>
            <h3 className="font-headline-sm text-[#154212] truncate text-[16px] font-semibold">
              Hydration Master
            </h3>
            <p className="font-body-sm text-[#42493e] leading-tight text-[11px]">
              7-Day uninterrupted reservoir streak achieved.
            </p>
            {/* Red Wax Seal Ornament */}
            <div className="mt-2 inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-gradient-to-r from-[#873724] to-[#692010] text-white shadow-[0_2px_4px_rgba(105,32,16,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]">
              <span className="material-symbols-outlined text-[13px] text-[#ffdad2]">military_tech</span>
              <span className="font-label-sm uppercase tracking-wider text-[9px] text-[#ffdad2] font-bold">
                SEALED &amp; VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Composition Breakdown (3 Horizontal Analog Slide-Rules) */}
      <div className="relative w-full rounded-xl bg-gradient-to-b from-white via-[#faf3e0] to-[#f4eedb] p-4 shadow-[0_4px_16px_rgba(26,30,24,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.12)] border border-[#d5c89e]/60">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#775a00] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),0_0_6px_rgba(119,90,0,0.5)]"></div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[#775a00] tracking-widest uppercase text-[9px] font-semibold">
                REGULATION DIAL
              </span>
              <h2 className="font-headline-sm text-[#154212] tracking-tight text-[16px] font-semibold">
                Macro Composition (7-Day Avg)
              </h2>
            </div>
          </div>
          <span className="font-label-sm text-[#42493e] uppercase text-[10px] font-bold">
            Ratio 45:30:25
          </span>
        </div>

        {/* 3 Slide-Rules */}
        <div className="flex flex-col gap-3 pt-1">
          {/* Carbohydrates (45%) */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#fece57]"></span>
                <span className="font-label-md text-[#1e1c10] uppercase tracking-wider text-[11px] font-semibold">
                  Carbohydrates
                </span>
              </div>
              <span className="font-label-lg text-[#775a00] font-bold text-[13px]">
                45% <span className="font-body-sm text-[#42493e] font-normal text-[11px]">(234g)</span>
              </span>
            </div>
            {/* Inset Rule Track */}
            <div className="relative w-full h-4 rounded bg-[#333124] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] overflow-hidden p-0.5">
              <div
                className="h-full rounded bg-gradient-to-r from-[#ffdf98] via-[#fece57] to-[#775a00] shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-700"
                style={{ width: '45%' }}
              >
                <div className="w-full h-full bg-gradient-to-b from-white/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Protein (30%) */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#154212]"></span>
                <span className="font-label-md text-[#1e1c10] uppercase tracking-wider text-[11px] font-semibold">
                  Proteins
                </span>
              </div>
              <span className="font-label-lg text-[#154212] font-bold text-[13px]">
                30% <span className="font-body-sm text-[#42493e] font-normal text-[11px]">(156g)</span>
              </span>
            </div>
            {/* Inset Rule Track */}
            <div className="relative w-full h-4 rounded bg-[#333124] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] overflow-hidden p-0.5">
              <div
                className="h-full rounded bg-gradient-to-r from-[#bcf0ae] via-[#3b6934] to-[#154212] shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-700"
                style={{ width: '30%' }}
              >
                <div className="w-full h-full bg-gradient-to-b from-white/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Dietary Fats (25%) */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#873724]"></span>
                <span className="font-label-md text-[#1e1c10] uppercase tracking-wider text-[11px] font-semibold">
                  Lipids &amp; Fats
                </span>
              </div>
              <span className="font-label-lg text-[#873724] font-bold text-[13px]">
                25% <span className="font-body-sm text-[#42493e] font-normal text-[11px]">(58g)</span>
              </span>
            </div>
            {/* Inset Rule Track */}
            <div className="relative w-full h-4 rounded bg-[#333124] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] overflow-hidden p-0.5">
              <div
                className="h-full rounded bg-gradient-to-r from-[#ffdad2] via-[#ffaf9c] to-[#692010] shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-700"
                style={{ width: '25%' }}
              >
                <div className="w-full h-full bg-gradient-to-b from-white/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archival Ledger Image Highlight */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(26,30,24,0.2)] bg-[#e8e2d0] border border-[#d5c89e]">
        <div
          className="w-full h-28 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${ASSETS.archiveBook}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#333124] via-[#333124]/60 to-transparent p-3 flex flex-col justify-end">
            <span className="font-label-sm text-[#ffdf98] uppercase tracking-widest text-[9px] font-bold">
              ATELIER ARCHIVE CERTIFICATE
            </span>
            <span className="font-headline-sm text-white tracking-tight text-[16px] font-semibold">
              Ledger Folio Vol. IV Approved
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Card: Embossed Parchment Certificate Button */}
      <button
        onClick={() => setOpenExportModal(true)}
        className="w-full relative rounded-xl p-3.5 bg-gradient-to-b from-white via-[#faf3e0] to-[#f4eedb] text-[#1e1c10] shadow-[0_6px_14px_rgba(26,30,24,0.22),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-3px_0_rgba(0,0,0,0.2)] active:translate-y-[1px] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.35)] transition-all flex items-center justify-between group cursor-pointer border border-[#d5c89e]"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#154212] via-[#2d5a27] to-[#154212] text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.3)] group-active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[22px]">history_edu</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-headline-sm text-[#154212] tracking-tight text-[15px] font-semibold">
              Export Weekly Ledger Report
            </span>
            <span className="font-body-sm text-[#42493e] text-[11px]">
              Authenticated PDF &amp; CSV Data Roll
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eee8d5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] text-[#154212]">
          <span className="material-symbols-outlined text-[18px]">download</span>
        </div>
      </button>
    </div>
  );
};
