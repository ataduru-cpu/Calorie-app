import React, { useState } from 'react';
import { useApp, ASSETS } from '../context/AppContext';

export const JournalScreen: React.FC = () => {
  const {
    dateString,
    nextDay,
    prevDay,
    calories,
    calorieGoal,
    water,
    setOpenQuickCalorieModal,
    setOpenBarcodeModal,
    setActiveTab,
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'hydration' | 'favorites' | 'recipes'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="flex flex-col w-full pt-16 pb-28 max-w-lg mx-auto">
      {/* Top Leather Header Trim & Stitched Margin */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-3 bg-[#faf3e0] shadow-[0_4px_12px_rgba(26,30,24,0.12)] border-b border-[#e8e2d0]">
        {/* Skeuomorphic Brass Calendar Roller */}
        <div className="flex items-center justify-between p-1.5 rounded-lg bg-gradient-to-b from-[#333124] via-[#252219] to-[#333124] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_2px_4px_rgba(255,255,255,0.4)] border border-[#5a4300]/50">
          {/* Stamped Metal Arrow Left */}
          <button
            onClick={prevDay}
            aria-label="Previous day"
            className="w-8 h-8 rounded flex items-center justify-center bg-gradient-to-b from-[#ffdf98] via-[#eec14b] to-[#775a00] text-[#1e1c10] shadow-[0_2px_3px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.8)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.7)] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>

          {/* Brass Wheel Roller Display */}
          <div className="flex flex-col items-center justify-center px-4 py-0.5 rounded bg-gradient-to-r from-[#18160f] via-[#2d281a] to-[#18160f] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fece57] shadow-[0_0_6px_rgba(254,206,87,0.9)] animate-pulse"></span>
              <span className="font-headline-sm text-[#ffdf98] tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-[16px] font-semibold">
                {dateString}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fece57] shadow-[0_0_6px_rgba(254,206,87,0.9)] animate-pulse"></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm uppercase tracking-widest text-[#c2c9bb] text-[9px]">
                Chronometer Folio N° 297
              </span>
              <span className="w-1 h-1 rounded-full bg-[#72796e]"></span>
              <span className="font-label-sm text-[#eec14b] tracking-wider text-[9px] font-bold">
                AUTUMN RECORD
              </span>
            </div>
          </div>

          {/* Stamped Metal Arrow Right */}
          <button
            onClick={nextDay}
            aria-label="Next day"
            className="w-8 h-8 rounded flex items-center justify-center bg-gradient-to-b from-[#ffdf98] via-[#eec14b] to-[#775a00] text-[#1e1c10] shadow-[0_2px_3px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.8)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.7)] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Search & Filter Bar: Debossed Card Slot */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#eee8d5] shadow-[inset_0_2px_4px_rgba(40,30,20,0.35),0_1px_0_rgba(255,255,255,0.8)] border border-[#c2c9bb]/60">
            <span className="material-symbols-outlined text-[#775a00] text-[20px] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-body-md text-[#1e1c10] placeholder:text-[#72796e] focus:outline-none placeholder:italic text-sm"
              placeholder="Search daily ledger entries, ingredients, herbs..."
              type="text"
            />
            <span className="material-symbols-outlined text-[#72796e] text-[18px]">tune</span>
          </div>

          {/* Physical Flip Tabs Styled like Card Dividers */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-t-md font-label-md uppercase tracking-wider flex items-center gap-1 shrink-0 transition-all text-[11px] cursor-pointer ${
                activeTabFilter === 'all'
                  ? 'bg-[#fff9e9] text-[#154212] font-bold shadow-[0_-2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]'
                  : 'bg-[#f4eedb] text-[#42493e] shadow-[inset_0_2px_3px_rgba(0,0,0,0.15)] hover:text-[#1e1c10]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">local_dining</span>
              <span>All Meals</span>
            </button>

            <button
              onClick={() => setActiveTabFilter('hydration')}
              className={`px-3 py-1.5 rounded-t-md font-label-md uppercase tracking-wider flex items-center gap-1 shrink-0 transition-all text-[11px] cursor-pointer ${
                activeTabFilter === 'hydration'
                  ? 'bg-[#fff9e9] text-[#154212] font-bold shadow-[0_-2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]'
                  : 'bg-[#f4eedb] text-[#42493e] shadow-[inset_0_2px_3px_rgba(0,0,0,0.15)] hover:text-[#1e1c10]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">water_drop</span>
              <span>Hydration</span>
            </button>

            <button
              onClick={() => setActiveTabFilter('favorites')}
              className={`px-3 py-1.5 rounded-t-md font-label-md uppercase tracking-wider flex items-center gap-1 shrink-0 transition-all text-[11px] cursor-pointer ${
                activeTabFilter === 'favorites'
                  ? 'bg-[#fff9e9] text-[#154212] font-bold shadow-[0_-2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]'
                  : 'bg-[#f4eedb] text-[#42493e] shadow-[inset_0_2px_3px_rgba(0,0,0,0.15)] hover:text-[#1e1c10]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">bookmark_heart</span>
              <span>Favorites</span>
            </button>

            <button
              onClick={() => setActiveTabFilter('recipes')}
              className={`px-3 py-1.5 rounded-t-md font-label-md uppercase tracking-wider flex items-center gap-1 shrink-0 transition-all text-[11px] cursor-pointer ${
                activeTabFilter === 'recipes'
                  ? 'bg-[#fff9e9] text-[#154212] font-bold shadow-[0_-2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]'
                  : 'bg-[#f4eedb] text-[#42493e] shadow-[inset_0_2px_3px_rgba(0,0,0,0.15)] hover:text-[#1e1c10]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">auto_stories</span>
              <span>Custom Recipes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notebook Body Canvas with Spiral Ring Binder Trim */}
      <div className="relative flex w-full min-w-0 bg-[#fff9e9]">
        {/* Left Leather Bound Edge with Perforated Ring Binder Coils (10 coils) */}
        <div className="w-7 shrink-0 bg-gradient-to-r from-[#201c13] via-[#3d3320] to-[#2b2518] shadow-[inset_-3px_0_6px_rgba(0,0,0,0.6)] flex flex-col justify-around items-center py-4 select-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-3.5 rounded-full bg-gradient-to-r from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[0_2px_4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.8)] my-2"
            />
          ))}
        </div>

        {/* Ruled Parchment Area */}
        <div className="flex-1 flex flex-col px-3.5 py-4 min-w-0 bg-gradient-to-b from-[#fff9e9] via-white to-[#fff9e9] shadow-[inset_4px_0_8px_rgba(0,0,0,0.06)]">
          {/* Decorative Subhead & Running Tally */}
          <div className="flex items-center justify-between pb-3 mb-2 bg-[#faf3e0] px-3 py-2 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#e8e2d0]">
            <div className="flex flex-col">
              <span className="font-label-sm text-[#775a00] uppercase tracking-widest text-[9px] font-semibold">
                Day Balance
              </span>
              <span className="font-headline-sm text-[#154212] text-[16px] font-semibold">
                {calories.toLocaleString()} / {calorieGoal.toLocaleString()}{' '}
                <span className="font-body-sm text-[#42493e] font-normal text-[11px]">kcal</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="font-label-sm text-[#775a00] uppercase tracking-widest text-[9px] font-semibold">
                  Hydrated
                </span>
                <span className="font-headline-sm text-[#873724] text-[16px] font-semibold">
                  {water.toLocaleString()} / 3,000{' '}
                  <span className="font-body-sm text-[#42493e] font-normal text-[11px]">ml</span>
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#ffdf98] to-[#775a00] flex items-center justify-center text-[#333124] shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>
          </div>

          {/* Entries Stream with Tactile Ruled Notebook Styling */}
          <div className="flex flex-col gap-4">
            {/* Entry 1: Breakfast */}
            {(activeTabFilter === 'all' || activeTabFilter === 'favorites') && (
              <article className="flex flex-col p-3 rounded-lg bg-white shadow-[0_3px_6px_rgba(26,30,24,0.08),inset_0_1px_0_rgba(255,255,255,1)] relative transition-transform active:scale-[0.99] border border-[#d5c89e]/40">
                <div className="flex items-center justify-between gap-2 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#2d5a27] text-white font-label-sm uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-[9px] font-bold">
                      08:15 AM
                    </span>
                    <span className="font-headline-sm text-[#154212] text-[15px] font-semibold">
                      Matutinal Repast
                    </span>
                  </div>
                  {/* Vintage Red Rubber Stamp */}
                  <div className="px-2 py-0.5 rounded-sm bg-[#ffdad2] text-[#692010] font-label-md uppercase tracking-widest rotate-[-2deg] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] flex items-center gap-1 font-bold text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                    <span>420 KCAL</span>
                  </div>
                </div>

                <p className="font-body-md text-[#1e1c10] leading-snug pl-1 pt-1 text-[13px]">
                  2 eggs over-medium lightly seasoned, artisanal sourdough toast brushed with sweet cream butter, single origin black coffee.
                </p>

                {/* Embossed Macro Pills */}
                <div className="flex items-center gap-2 mt-2.5 pt-2 bg-[#faf3e0] px-2 py-1.5 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#154212]"></span>
                    <span className="font-label-sm text-[#42493e] uppercase text-[10px]">
                      P: <strong className="text-[#1e1c10] font-semibold">22g</strong>
                    </span>
                  </div>
                  <span className="text-[#c2c9bb]">•</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#775a00]"></span>
                    <span className="font-label-sm text-[#42493e] uppercase text-[10px]">
                      C: <strong className="text-[#1e1c10] font-semibold">38g</strong>
                    </span>
                  </div>
                  <span className="text-[#c2c9bb]">•</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#692010]"></span>
                    <span className="font-label-sm text-[#42493e] uppercase text-[10px]">
                      F: <strong className="text-[#1e1c10] font-semibold">18g</strong>
                    </span>
                  </div>
                  <span className="ml-auto material-symbols-outlined text-[#72796e] text-[16px]">draw</span>
                </div>
              </article>
            )}

            {/* Entry 2: Hydration Flask with Wax Seal */}
            {(activeTabFilter === 'all' || activeTabFilter === 'hydration') && (
              <article className="flex flex-col p-3 rounded-lg bg-[#faf3e0] shadow-[0_3px_6px_rgba(26,30,24,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] relative border border-[#d5c89e]/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#e0dac7] text-[#42493e] font-label-sm uppercase tracking-wider text-[9px] font-bold">
                      10:30 AM
                    </span>
                    <span className="font-headline-sm text-[#1e1c10] text-[15px] font-semibold">
                      Spring Water Flask
                    </span>
                  </div>
                  {/* Miniature Water Wax Seal Badge */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-b from-[#bcf0ae] to-[#3b6934] text-[#002201] shadow-[0_2px_4px_rgba(21,66,18,0.3)]">
                    <span className="material-symbols-outlined text-[13px]">water_drop</span>
                    <span className="font-label-sm uppercase tracking-wider font-bold text-[9px]">500 ML</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pl-1 text-[#42493e]">
                  <span className="font-body-sm italic text-[11px]">
                    Pure mountain spring well • Cold draught infused with mint leaf
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#3b6934]">check_circle</span>
                </div>
              </article>
            )}

            {/* Entry 3: Lunch with AI Polaroid & Brass Paperclip */}
            {(activeTabFilter === 'all' || activeTabFilter === 'favorites') && (
              <article className="flex flex-col p-3 rounded-lg bg-white shadow-[0_3px_6px_rgba(26,30,24,0.09),inset_0_1px_0_rgba(255,255,255,1)] relative overflow-visible border border-[#d5c89e]/40">
                {/* Brass Paperclip Ornament attached at top right corner */}
                <div className="absolute -top-2.5 right-4 w-5 h-8 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[0_2px_4px_rgba(0,0,0,0.35)] flex items-center justify-center pointer-events-none z-10">
                  <div className="w-3 h-6 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
                </div>

                <div className="flex items-center justify-between gap-2 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#2d5a27] text-white font-label-sm uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-[9px] font-bold">
                      01:10 PM
                    </span>
                    <span className="font-headline-sm text-[#154212] text-[15px] font-semibold">
                      Midday Meal
                    </span>
                  </div>
                  {/* Stamped Calories */}
                  <div className="px-2 py-0.5 rounded-sm bg-[#ffdad2] text-[#692010] font-label-md uppercase tracking-widest rotate-[1deg] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] flex items-center gap-1 font-bold text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                    <span>650 KCAL</span>
                  </div>
                </div>

                {/* Meal Details with Polaroid Thumbnail Mockup */}
                <div className="flex gap-3 pt-1">
                  {/* Miniature Polaroid Snapshot */}
                  <div className="shrink-0 p-1 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.15)] rotate-[-3deg] rounded-sm flex flex-col items-center">
                    <img
                      className="w-16 h-16 object-cover rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                      alt="Turkey wrap"
                      src={ASSETS.wrap}
                    />
                    <span className="font-label-sm text-[8px] text-[#72796e] tracking-wider mt-1 uppercase font-semibold">
                      AI Scan #41
                    </span>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="font-headline-sm text-[15px] leading-tight text-[#1e1c10] truncate font-semibold">
                      Turkey Bacon Avocado Wrap
                    </span>
                    <p className="font-body-sm text-[#42493e] line-clamp-2 mt-0.5 text-[11px]">
                      Smoked turkey breast, thick cured bacon, fresh Hass avocado, organic butter leaf, in a toasted seeded wrap.
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="material-symbols-outlined text-[#775a00] text-[14px]">auto_awesome</span>
                      <span className="font-label-sm text-[#775a00] uppercase tracking-wider text-[9px] font-bold">
                        Plate Analyzed by Lens
                      </span>
                    </div>
                  </div>
                </div>

                {/* Embossed Macro Pills */}
                <div className="flex items-center gap-2 mt-2.5 pt-2 bg-[#faf3e0] px-2 py-1.5 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#154212]"></span>
                    <span className="font-label-sm text-[#42493e] uppercase text-[10px]">
                      P: <strong className="text-[#1e1c10] font-semibold">44g</strong>
                    </span>
                  </div>
                  <span className="text-[#c2c9bb]">•</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#775a00]"></span>
                    <span className="font-label-sm text-[#42493e] uppercase text-[10px]">
                      C: <strong className="text-[#1e1c10] font-semibold">41g</strong>
                    </span>
                  </div>
                  <span className="text-[#c2c9bb]">•</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#692010]"></span>
                    <span className="font-label-sm text-[#42493e] uppercase text-[10px]">
                      F: <strong className="text-[#1e1c10] font-semibold">32g</strong>
                    </span>
                  </div>
                  <span className="ml-auto material-symbols-outlined text-[#72796e] text-[16px]">qr_code_scanner</span>
                </div>
              </article>
            )}

            {/* Entry 4: Afternoon Hydration / Botanical Infusion */}
            {(activeTabFilter === 'all' || activeTabFilter === 'hydration') && (
              <article className="flex flex-col p-3 rounded-lg bg-[#faf3e0] shadow-[0_3px_6px_rgba(26,30,24,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] relative border border-[#d5c89e]/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#e0dac7] text-[#42493e] font-label-sm uppercase tracking-wider text-[9px] font-bold">
                      04:00 PM
                    </span>
                    <span className="font-headline-sm text-[#1e1c10] text-[15px] font-semibold">
                      Earl Grey Tea
                    </span>
                  </div>
                  {/* Volume Stamp */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-b from-[#bcf0ae] to-[#3b6934] text-[#002201] shadow-[0_2px_4px_rgba(21,66,18,0.3)]">
                    <span className="material-symbols-outlined text-[13px]">coffee</span>
                    <span className="font-label-sm uppercase tracking-wider font-bold text-[9px]">350 ML</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pl-1 text-[#42493e]">
                  <span className="font-body-sm italic text-[11px]">
                    Bergamot oil infusion with organic raw clover honey (1 tsp)
                  </span>
                  <span className="font-label-sm text-[#775a00] tracking-wider uppercase font-bold text-[10px]">
                    +25 KCAL
                  </span>
                </div>
              </article>
            )}

            {/* Entry 5: Pending Dinner Slot with Tactile Embossed Dashed Frame */}
            {activeTabFilter === 'all' && (
              <article className="p-4 rounded-xl bg-[#f4eedb]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#c2c9bb]/80 transition-all hover:bg-[#f4eedb]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#5a4300] text-[#1e1c10] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </div>
                  <span className="font-headline-sm text-[#154212] tracking-tight text-[16px] font-semibold">
                    Evening Repast (Dinner)
                  </span>
                </div>
                <p className="font-body-sm text-[#42493e] text-center max-w-[260px] text-[12px]">
                  Uncataloged slot for 07:30 PM. Tap here to compose ingredients or position plate beneath the apothecary lens.
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => setOpenQuickCalorieModal(true)}
                    className="px-3 py-1 rounded bg-white shadow-[0_2px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] font-label-sm text-[#154212] uppercase tracking-wider flex items-center gap-1 text-[11px] font-bold cursor-pointer hover:bg-[#faf3e0]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    <span>Manual Entry</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('scanner')}
                    className="px-3 py-1 rounded bg-[#154212] text-white shadow-[0_2px_4px_rgba(21,66,18,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] font-label-sm uppercase tracking-wider flex items-center gap-1 text-[11px] font-bold cursor-pointer hover:bg-[#2d5a27]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">center_focus_strong</span>
                    <span>Scan Plate</span>
                  </button>
                </div>
              </article>
            )}

            {/* Daily Ledger Footnote / Handwritten Affirmation */}
            <div className="p-3 mt-1 rounded bg-[#eee8d5]/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] flex items-start gap-2.5 border border-[#d5c89e]/40">
              <span className="material-symbols-outlined text-[#775a00] text-[20px] shrink-0 mt-0.5">
                history_edu
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-[#775a00] uppercase tracking-widest text-[9px] font-bold">
                  Apothecary Note
                </span>
                <p className="font-body-sm italic text-[#42493e] text-[12px]">
                  "Balance of green nourishment and consistent hydration maintains vitality throughout the autumn equinox."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Floating Dock with Dual Brass Knurled Buttons */}
      <div className="sticky bottom-2 z-30 px-4 py-2 mt-4">
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-gradient-to-b from-[#2e291e] via-[#1f1b13] to-[#12100a] shadow-[0_6px_20px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-[#5a4300]/60">
          {/* Quick Manual Button */}
          <button
            onClick={() => setOpenQuickCalorieModal(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-gradient-to-b from-[#ffdf98] via-[#eec14b] to-[#775a00] text-[#1e1c10] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)] transition-all cursor-pointer font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="font-label-md uppercase tracking-wider drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] text-[11px]">
              + Quick Calorie
            </span>
          </button>

          {/* Barcode Scanner Physical Button */}
          <button
            onClick={() => setOpenBarcodeModal(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-gradient-to-b from-[#2d5a27] via-[#154212] to-[#0f300c] text-white shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)] transition-all cursor-pointer font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
            <span className="font-label-md uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-[11px]">
              Scan Barcode
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
