import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TodayScreen: React.FC = () => {
  const {
    calories,
    calorieGoal,
    water,
    waterGoal,
    protein,
    proteinGoal,
    carbs,
    carbsGoal,
    fat,
    fatGoal,
    meals,
    addWater,
    logPlannedMeal,
    setOpenQuickCalorieModal,
    setActiveTab,
  } = useApp();

  const [sloshing, setSloshing] = useState(false);

  // Caloric Needle Angle calculation
  // 0 cal -> -45deg, Goal (2,150) -> +55deg
  const calRatio = Math.min(1.2, calories / calorieGoal);
  const needleDeg = Math.round(-45 + calRatio * 95); // ~40deg at 1420 kcal
  const availableReserve = Math.max(0, calorieGoal - calories);

  // Macro percentages
  const carbPct = Math.min(100, Math.round((carbs / carbsGoal) * 100));
  const proteinPct = Math.min(100, Math.round((protein / proteinGoal) * 100));
  const fatPct = Math.min(100, Math.round((fat / fatGoal) * 100));

  // Water calculations
  const waterPct = Math.min(100, Math.round((water / waterGoal) * 100));

  const handleWaterClick = (amount: number) => {
    addWater(amount);
    setSloshing(true);
    setTimeout(() => setSloshing(false), 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-4 max-w-lg mx-auto">
      {/* TOP SUMMARY SECTION: Brass Chronometer & Caloric Needle Gauge */}
      <section className="relative w-full rounded-xl bg-gradient-to-b from-[#f4eedb] via-[#faf3e0] to-[#e8e2d0] p-4 shadow-[0_6px_20px_rgba(26,30,24,0.28),inset_0_1px_1px_rgba(255,255,255,0.7)] flex flex-col items-center border border-[#d5c89e]/60">
        {/* Header ribbon / Plate */}
        <div className="w-full flex items-center justify-between pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#775a00] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.5)]"></span>
            <span className="font-label-md text-[#42493e] uppercase tracking-widest text-[10px]">
              Registry No. 4482-B
            </span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#e8e2d0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
            <span className="material-symbols-outlined text-[#775a00] text-[14px]">tune</span>
            <span className="font-label-sm text-[#775a00] uppercase text-[10px] font-semibold">
              Calibrated Today
            </span>
          </div>
        </div>

        {/* Analog Dial Bezel Assembly */}
        <div className="relative w-64 h-64 rounded-full p-2 bg-gradient-to-tr from-[#775a00] via-[#ffdf98] to-[#5a4300] shadow-[0_8px_20px_rgba(30,28,16,0.45),inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_5px_rgba(0,0,0,0.6)] flex items-center justify-center">
          {/* Inner Dark Brass Bezel Lip */}
          <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-b from-[#2e2300] via-[#5a4300] to-[#1a1400] shadow-[inset_0_3px_6px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
            {/* Dial Face (Parchment with Inset Shadow) */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#fbf4de] via-[#f1e6c4] to-[#e4d6aa] shadow-[inset_0_4px_10px_rgba(40,30,10,0.5),inset_0_0_20px_rgba(119,90,0,0.25)] flex flex-col items-center justify-between p-3.5 overflow-hidden">
              {/* Dial SVG Overlay: Radial ticks & Arcs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 240">
                {/* Caloric Target Arc (Track) */}
                <path
                  d="M 45 170 A 85 85 0 1 1 195 170"
                  fill="none"
                  stroke="#d5c89e"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                {/* Consumed Arc (Forest Green) */}
                <path
                  d="M 45 170 A 85 85 0 1 1 185 130"
                  fill="none"
                  stroke="#2d5a27"
                  strokeDasharray="320"
                  strokeDashoffset={Math.max(50, 320 - (calRatio * 215))}
                  strokeLinecap="round"
                  strokeWidth="8"
                  className="transition-all duration-700 ease-out"
                />
                {/* Radial Ticks & Markings */}
                <g opacity="0.8" stroke="#615638" strokeWidth="1.5">
                  <line x1="45" x2="55" y1="170" y2="164" />
                  <line x1="38" x2="50" y1="140" y2="137" />
                  <line x1="40" x2="52" y1="105" y2="108" />
                  <line x1="56" x2="66" y1="73" y2="80" />
                  <line x1="84" x2="92" y1="48" y2="58" />
                  <line x1="120" x2="120" y1="38" y2="50" />
                  <line x1="156" x2="148" y1="48" y2="58" />
                  <line x1="184" x2="174" y1="73" y2="80" />
                  <line x1="200" x2="188" y1="105" y2="108" />
                  <line x1="202" x2="190" y1="140" y2="137" />
                  <line x1="195" x2="185" y1="170" y2="164" />
                </g>
              </svg>

              {/* Top Dial Header */}
              <div className="relative z-10 text-center mt-3">
                <span className="font-label-sm uppercase tracking-widest text-[#42493e] text-[9px] block">
                  Energy Intake
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-metric-numeral text-[#154212] text-[26px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    {calories.toLocaleString()}
                  </span>
                  <span className="font-label-sm text-[#42493e] text-[11px]">
                    / {calorieGoal.toLocaleString()}
                  </span>
                </div>
                <span className="font-label-sm text-[#775a00] uppercase text-[8px] tracking-wider block -mt-1 font-semibold">
                  kilo-calories
                </span>
              </div>

              {/* Needle Assembly (Pivoted from center) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {/* Pivot bolt shadow & shadow needle */}
                <div
                  className="w-1 h-20 bg-gradient-to-t from-transparent to-black/35 absolute origin-bottom blur-[1px] transition-transform duration-700 ease-out"
                  style={{
                    transform: `rotate(${needleDeg + 2}deg) translateY(-38px) translateX(2px)`,
                  }}
                />
                {/* Physical Needle */}
                <div
                  className="w-1.5 h-20 rounded-t-full bg-gradient-to-r from-[#ba1a1a] via-[#ff5449] to-[#873724] absolute origin-bottom shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-out"
                  style={{
                    transform: `rotate(${needleDeg}deg) translateY(-38px)`,
                  }}
                >
                  {/* Needle white counter-weight accent */}
                  <div className="w-1.5 h-4 bg-white mx-auto rounded-t-full" />
                </div>
                {/* Brass Center Hub Bolt */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#463400] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.7)] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#735700] to-[#ffdf98] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white"></span>
                  </div>
                </div>
              </div>

              {/* Debossed Metal Plaque: Remaining */}
              <div className="relative z-10 mb-2 px-3 py-1 rounded bg-gradient-to-b from-[#e8e2d0] to-[#e0dac7] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),inset_0_-1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center">
                <span className="font-label-sm uppercase tracking-widest text-[#42493e] text-[8px]">
                  Available Reserve
                </span>
                <span className="font-headline-sm text-[#154212] tracking-tight font-bold drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] text-[15px]">
                  {availableReserve.toLocaleString()} kcal
                </span>
              </div>

              {/* Glass Lens Curved Reflection Glare */}
              <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/35 via-transparent to-transparent opacity-80" />
              <div className="absolute -top-12 -right-8 w-44 h-44 rounded-full pointer-events-none bg-white/10 blur-sm" />
            </div>
          </div>
        </div>

        {/* Macro Meters Trio (Recessed Bezels with glowing tubes) */}
        <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-2">
          {/* Carb Meter */}
          <div className="relative rounded-lg p-2 bg-[#eee8d5] shadow-[0_3px_6px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col items-center border border-[#c2c9bb]/40">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#ffdf98] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.6)]"></div>
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ffdf98] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.6)]"></div>
            <span className="font-label-sm uppercase tracking-wider text-[#775a00] font-bold text-[9px] mt-0.5">
              Carbs
            </span>
            <div className="relative w-full h-3 rounded-full bg-[#e8e2d0] my-1.5 p-0.5 shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ffdf98] via-[#eec14b] to-[#735700] shadow-[0_0_6px_rgba(238,193,75,0.7)] transition-all duration-500"
                style={{ width: `${carbPct}%` }}
              />
              <div className="absolute inset-x-1 top-0.5 h-1 rounded-full bg-white/40 pointer-events-none"></div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-label-lg text-[#154212] text-[13px] font-bold">{carbs}</span>
              <span className="font-body-sm text-[#42493e] text-[10px]">/{carbsGoal}g</span>
            </div>
          </div>

          {/* Protein Meter */}
          <div className="relative rounded-lg p-2 bg-[#eee8d5] shadow-[0_3px_6px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col items-center border border-[#c2c9bb]/40">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#ffdf98] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.6)]"></div>
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ffdf98] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.6)]"></div>
            <span className="font-label-sm uppercase tracking-wider text-[#154212] font-bold text-[9px] mt-0.5">
              Protein
            </span>
            <div className="relative w-full h-3 rounded-full bg-[#e8e2d0] my-1.5 p-0.5 shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#bcf0ae] via-[#2d5a27] to-[#002201] shadow-[0_0_6px_rgba(45,90,39,0.7)] transition-all duration-500"
                style={{ width: `${proteinPct}%` }}
              />
              <div className="absolute inset-x-1 top-0.5 h-1 rounded-full bg-white/40 pointer-events-none"></div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-label-lg text-[#154212] text-[13px] font-bold">{protein}</span>
              <span className="font-body-sm text-[#42493e] text-[10px]">/{proteinGoal}g</span>
            </div>
          </div>

          {/* Lipids / Fat Meter */}
          <div className="relative rounded-lg p-2 bg-[#eee8d5] shadow-[0_3px_6px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col items-center border border-[#c2c9bb]/40">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#ffdf98] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.6)]"></div>
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ffdf98] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.6)]"></div>
            <span className="font-label-sm uppercase tracking-wider text-[#873724] font-bold text-[9px] mt-0.5">
              Lipids
            </span>
            <div className="relative w-full h-3 rounded-full bg-[#e8e2d0] my-1.5 p-0.5 shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ffdad2] via-[#692010] to-[#873724] shadow-[0_0_6px_rgba(105,32,16,0.6)] transition-all duration-500"
                style={{ width: `${fatPct}%` }}
              />
              <div className="absolute inset-x-1 top-0.5 h-1 rounded-full bg-white/40 pointer-events-none"></div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-label-lg text-[#154212] text-[13px] font-bold">{fat}</span>
              <span className="font-body-sm text-[#42493e] text-[10px]">/{fatGoal}g</span>
            </div>
          </div>
        </div>
      </section>

      {/* HYDRATION STATION: Glass Mason Beaker & Tactile Brass Clickers */}
      <section className="relative w-full rounded-xl bg-gradient-to-b from-[#faf3e0] via-[#f4eedb] to-[#eee8d5] p-4 shadow-[0_6px_18px_rgba(26,30,24,0.22),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#d5c89e]/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#154212] text-[18px]">water_drop</span>
            <h2 className="font-headline-sm text-[#154212] tracking-tight">Hydration Chamber</h2>
          </div>
          <span className="font-label-md text-[#775a00] uppercase tracking-wider bg-[#e8e2d0] px-2 py-0.5 rounded shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] font-semibold text-[11px]">
            {waterPct}% Target
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Vintage Apothecary Glass Beaker Vessel */}
          <div className="relative w-28 h-44 rounded-b-xl rounded-t-sm p-1.5 bg-gradient-to-r from-[#e0dac7]/40 via-white/80 to-[#e0dac7]/40 shadow-[0_8px_16px_rgba(26,30,24,0.3),inset_0_0_10px_rgba(255,255,255,0.7)] flex flex-col justify-end overflow-hidden border border-[#c2c9bb]/50">
            {/* Graduated Apothecary Measurement Ticks along the edge */}
            <div className="absolute top-2 left-2 bottom-3 flex flex-col justify-between text-[8px] font-label-sm text-[#42493e]/70 z-20 pointer-events-none">
              <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#42493e]/50"></span><span>3000</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#42493e]/40"></span><span>2500</span></div>
              <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#42493e]/50"></span><span>2000</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#42493e]/40"></span><span>1500</span></div>
              <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#42493e]/50"></span><span>1000</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#42493e]/40"></span><span>500</span></div>
            </div>

            {/* Glass Lip Bevel at Top */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-white/80 to-[#e8e2d0] shadow-[0_1px_2px_rgba(0,0,0,0.2)] rounded-t"></div>

            {/* Liquid Column */}
            <div
              className={`relative w-full rounded-b-lg bg-gradient-to-t from-[#1b5042] via-[#2a7a66] to-[#42a88e] shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.4)] flex flex-col justify-between p-1 transition-all duration-500 ease-out ${sloshing ? 'scale-[1.02]' : ''}`}
              style={{ height: `${Math.max(12, waterPct)}%` }}
            >
              {/* Curved Meniscus Line */}
              <div className="w-full h-2.5 rounded-[50%] bg-white/50 shadow-[0_1px_3px_rgba(255,255,255,0.8)] -mt-1 blur-[0.5px]"></div>
              
              {/* Ambient Micro Bubbles in Liquid */}
              <div className="absolute bottom-4 right-3 w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_2px_rgba(255,255,255,0.8)] animate-pulse"></div>
              <div className="absolute bottom-9 left-6 w-1 h-1 rounded-full bg-white/50"></div>
              <div className="absolute bottom-16 right-5 w-2 h-2 rounded-full bg-white/30"></div>

              {/* Vessel Readout Debossed at liquid base */}
              <div className="text-center pb-1">
                <span className="font-metric-numeral text-white text-[18px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] font-bold">
                  {water.toLocaleString()}
                </span>
                <span className="font-label-sm text-white/80 text-[8px] block -mt-1 tracking-wider uppercase">
                  Milliliters
                </span>
              </div>
            </div>

            {/* Cylindrical Glass Specular Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-12deg] translate-x-1"></div>
            <div className="absolute top-0 bottom-0 right-1 w-1 bg-white/30 pointer-events-none rounded-full"></div>
          </div>

          {/* Action Panel: Tactile Mechanical Beveled Clickers */}
          <div className="flex-1 flex flex-col justify-center gap-2.5">
            <div className="px-2 py-1 bg-[#e8e2d0] rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] flex items-center justify-between">
              <span className="font-label-sm text-[#42493e] uppercase text-[9px] font-semibold">Goal Target</span>
              <span className="font-label-lg text-[#154212] text-[12px] font-bold">3,000 ml</span>
            </div>

            {/* +250ml Glass Button (Apothecary Cup) */}
            <button
              onClick={() => handleWaterClick(250)}
              className="group w-full py-2.5 px-3 rounded-lg bg-gradient-to-b from-white via-[#faf3e0] to-[#eee8d5] text-[#1e1c10] shadow-[0_4px_6px_rgba(26,30,24,0.25),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] flex items-center justify-between transition-all"
              type="button"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#ffdf98] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#735700]">
                  <span className="material-symbols-outlined text-[14px]">local_cafe</span>
                </div>
                <div className="text-left">
                  <span className="font-label-lg text-[#1e1c10] text-[12px] block font-semibold">Apothecary Cup</span>
                  <span className="font-body-sm text-[#42493e] text-[10px] block -mt-0.5">+250 ml measure</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#775a00] text-[18px] group-hover:scale-110 transition-transform">
                add_circle
              </span>
            </button>

            {/* +500ml Flask Button (Forest Leather Green Tactile Primary Button) */}
            <button
              onClick={() => handleWaterClick(500)}
              className="group w-full py-2.5 px-3 rounded-lg bg-gradient-to-b from-[#154212] via-[#2d5a27] to-[#23501e] text-white shadow-[0_5px_8px_rgba(21,66,18,0.4),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-between transition-all"
              type="button"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#bcf0ae] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-center text-[#002201]">
                  <span className="material-symbols-outlined text-[14px]">sports_bar</span>
                </div>
                <div className="text-left">
                  <span className="font-label-lg text-white text-[12px] block font-bold">Field Flask</span>
                  <span className="font-body-sm text-[#bcf0ae] text-[10px] block -mt-0.5">+500 ml reservoir</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bcf0ae] text-[18px] group-hover:scale-110 transition-transform">
                add_circle
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* DAILY MEALS BREAKDOWN: Stitched Deckle Ledger Cards */}
      <section className="w-full flex flex-col gap-2">
        {/* Ledger Header Bar with Brass Clipboard Clip Illusion */}
        <div className="relative w-full flex items-center justify-between pt-3 pb-1">
          {/* Decorative Clipboard Stamped Brass Clip centered */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-b-md bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[0_3px_5px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center">
            <div className="w-16 h-1 rounded bg-[#2e2300] opacity-60"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a00] text-[18px]">receipt_long</span>
            <h2 className="font-headline-sm text-[#154212] tracking-tight">Daily Aliment Ledger</h2>
          </div>
          <span className="font-label-sm text-[#42493e] uppercase tracking-wider text-[10px] font-semibold">
            {meals.length} Entries Recorded
          </span>
        </div>

        {/* Dynamic Meal Entries List */}
        {meals.map((meal) => {
          const isPlanned = meal.status === 'planned';
          return (
            <article
              key={meal.id}
              className={`relative w-full rounded-lg ${
                isPlanned ? 'bg-[#f4eedb]' : 'bg-[#faf3e0]'
              } p-4 shadow-[0_3px_8px_rgba(30,28,16,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-start justify-between gap-3 overflow-hidden border border-[#d5c89e]/50`}
            >
              {/* Stitched left border simulation */}
              <div
                className={`absolute left-1.5 top-2 bottom-2 w-0.5 border-l border-dashed ${
                  isPlanned ? 'border-[#775a00]/40' : 'border-[#c2c9bb]'
                }`}
              />

              <div className="flex items-start gap-3 pl-2 flex-1 min-w-0">
                {/* Photo Thumbnail in Inset Frame */}
                {meal.image ? (
                  <div className="relative w-14 h-14 rounded bg-[#e0dac7] p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] shrink-0">
                    <img
                      className={`w-full h-full object-cover rounded ${isPlanned ? 'opacity-85' : ''}`}
                      alt={meal.name}
                      src={meal.image}
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded bg-[#eee8d5] flex items-center justify-center text-[#775a00] shrink-0 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
                    <span className="material-symbols-outlined text-[24px]">restaurant</span>
                  </div>
                )}

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[#775a00] uppercase tracking-widest text-[10px] font-semibold">
                      {meal.category} • {meal.time}
                    </span>
                    <span className="font-label-lg text-[#154212] font-bold text-[13px]">
                      {meal.calories} kcal
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-[#1e1c10] text-[14px] leading-tight mt-0.5 truncate font-semibold">
                    {meal.name}
                  </h3>
                  <p className="font-body-sm text-[#42493e] text-[11px] truncate">
                    {meal.description}
                  </p>
                </div>
              </div>

              {/* Action: Wax Seal for logged, Brass '+' for planned */}
              {!isPlanned ? (
                <div
                  title="Logged & Verified"
                  className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#3b6934] via-[#2d5a27] to-[#154212] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[#bcf0ae] text-[16px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                    check
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => logPlannedMeal(meal.id)}
                  aria-label={`Commit ${meal.name}`}
                  title="Commit this meal"
                  className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[0_3px_5px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-[1px] flex items-center justify-center text-[#251a00] hover:scale-105 transition-transform"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              )}
            </article>
          );
        })}

        {/* SNACK SECTION: Rubberized Convex Quick-Log Button */}
        <div className="w-full pt-1">
          <button
            onClick={() => setOpenQuickCalorieModal(true)}
            className="group w-full py-3 px-4 rounded-xl bg-gradient-to-b from-[#333124] via-[#252319] to-[#16150d] text-[#fff9e9] shadow-[0_5px_10px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.8)] active:translate-y-[1px] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            type="button"
          >
            <div className="w-6 h-6 rounded-full bg-[#e8e2d0]/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.7)] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ffdf98] text-[16px] group-hover:rotate-90 transition-transform">
                add_circle
              </span>
            </div>
            <span className="font-label-lg text-[#fff9e9] tracking-wider uppercase text-[12px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-semibold">
              Quick Inscribe Snack / Tea (0 kcal)
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
