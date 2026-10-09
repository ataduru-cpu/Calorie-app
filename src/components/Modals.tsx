import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Modals: React.FC = () => {
  const {
    openCalibrationModal,
    setOpenCalibrationModal,
    openQuickCalorieModal,
    setOpenQuickCalorieModal,
    openBarcodeModal,
    setOpenBarcodeModal,
    openExportModal,
    setOpenExportModal,
    currentAnalysis,
    setCurrentAnalysis,
    quickInscribeSnack,
    weeklyData,
    dateString,
  } = useApp();

  // Calibration state based on currentAnalysis
  const [scaleFactors, setScaleFactors] = useState<{ [key: number]: number }>({
    0: 100,
    1: 100,
    2: 100,
  });

  // Quick Inscribe state
  const [snackName, setSnackName] = useState('Botanical Infusion (Herbal Tea)');
  const [snackCalories, setSnackCalories] = useState('0');
  const [snackCategory, setSnackCategory] = useState<'Snack' | 'Morning' | 'Midday' | 'Evening'>('Snack');

  const handleUpdateGrams = (idx: number, percentage: number) => {
    setScaleFactors((prev) => ({ ...prev, [idx]: percentage }));
  };

  const handleApplyCalibration = () => {
    // Recalculate based on factor
    const updatedItems = currentAnalysis.items.map((item, idx) => {
      const factor = (scaleFactors[idx] || 100) / 100;
      return {
        ...item,
        calories: Math.round(item.calories * factor),
        protein: Math.round(item.protein * factor),
        carbs: Math.round(item.carbs * factor),
        fat: Math.round(item.fat * factor),
      };
    });

    const totalCalories = updatedItems.reduce((acc, i) => acc + i.calories, 0);
    const protein = updatedItems.reduce((acc, i) => acc + i.protein, 0);
    const carbs = updatedItems.reduce((acc, i) => acc + i.carbs, 0);
    const fat = updatedItems.reduce((acc, i) => acc + i.fat, 0);

    setCurrentAnalysis({
      ...currentAnalysis,
      items: updatedItems,
      totalCalories,
      protein,
      carbs,
      fat,
    });

    setOpenCalibrationModal(false);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cals = parseInt(snackCalories, 10) || 0;
    quickInscribeSnack(snackName, cals);
    setOpenQuickCalorieModal(false);
  };

  const handleScanBarcodeItem = (name: string, cal: number, desc: string) => {
    quickInscribeSnack(name, cal, desc);
    setOpenBarcodeModal(false);
  };

  const handleDownloadCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Day,Calories,Met,Water_ml,Carbs_g,Protein_g,Fat_g\n' +
      weeklyData
        .map(
          (d) =>
            `${d.day},${d.calories},${d.met},${d.water},${d.carbs},${d.protein},${d.fat}`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vitalis_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* 1. CALIBRATION MODAL */}
      {openCalibrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-xl bg-[#fff9e9] border border-[#d5c89e] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#e8e2d0] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#775a00] text-[20px]">tune</span>
                <h3 className="font-headline-sm text-[#154212] font-semibold text-[16px]">
                  Gram Scale Calibrator
                </h3>
              </div>
              <button
                onClick={() => setOpenCalibrationModal(false)}
                className="w-6 h-6 rounded-full bg-[#eee8d5] text-[#42493e] flex items-center justify-center hover:bg-[#e0dac7] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="font-body-sm text-[#42493e] text-[11px]">
              Calibrate portions based on counter weight or physical scale reading:
            </p>

            <div className="flex flex-col gap-3 py-1">
              {currentAnalysis.items.map((item, idx) => {
                const currentPct = scaleFactors[idx] || 100;
                return (
                  <div key={idx} className="flex flex-col gap-1 p-2 bg-[#faf3e0] rounded-lg border border-[#e8e2d0]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#1e1c10] truncate">{item.name}</span>
                      <span className="font-bold text-[#154212]">{currentPct}%</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="180"
                      step="5"
                      value={currentPct}
                      onChange={(e) => handleUpdateGrams(idx, Number(e.target.value))}
                      className="accent-[#154212] cursor-pointer w-full"
                    />
                    <div className="flex justify-between text-[10px] text-[#72796e]">
                      <span>Light</span>
                      <span>Target ({item.portion})</span>
                      <span>Hearty</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setOpenCalibrationModal(false)}
                className="flex-1 py-2 rounded-lg bg-[#eee8d5] text-[#42493e] font-label-md uppercase text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCalibration}
                className="flex-1 py-2 rounded-lg bg-[#154212] text-white font-label-md uppercase text-xs font-bold shadow-[0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-[#2d5a27]"
              >
                Apply Weights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. QUICK INSCRIBE MODAL */}
      {openQuickCalorieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-xl bg-[#fff9e9] border border-[#d5c89e] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#e8e2d0] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#775a00] text-[20px]">history_edu</span>
                <h3 className="font-headline-sm text-[#154212] font-semibold text-[16px]">
                  Quick Inscribe Entry
                </h3>
              </div>
              <button
                onClick={() => setOpenQuickCalorieModal(false)}
                className="w-6 h-6 rounded-full bg-[#eee8d5] text-[#42493e] flex items-center justify-center hover:bg-[#e0dac7] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm uppercase text-[10px] text-[#775a00] font-bold">
                  Item Description
                </label>
                <input
                  type="text"
                  required
                  value={snackName}
                  onChange={(e) => setSnackName(e.target.value)}
                  className="p-2 rounded bg-white border border-[#c2c9bb] text-sm text-[#1e1c10] focus:outline-[#154212]"
                  placeholder="e.g. Lavender Chamomile Tea, Dark Chocolate"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="font-label-sm uppercase text-[10px] text-[#775a00] font-bold">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    required
                    value={snackCalories}
                    onChange={(e) => setSnackCalories(e.target.value)}
                    className="p-2 rounded bg-white border border-[#c2c9bb] text-sm text-[#1e1c10] focus:outline-[#154212]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="font-label-sm uppercase text-[10px] text-[#775a00] font-bold">
                    Category
                  </label>
                  <select
                    value={snackCategory}
                    onChange={(e) => setSnackCategory(e.target.value as any)}
                    className="p-2 rounded bg-white border border-[#c2c9bb] text-sm text-[#1e1c10] focus:outline-[#154212]"
                  >
                    <option value="Snack">Snack / Tea</option>
                    <option value="Morning">Morning</option>
                    <option value="Midday">Midday</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSnackName('Herbal Tisane (0 kcal)');
                    setSnackCalories('0');
                  }}
                  className="px-2 py-1 rounded bg-[#faf3e0] border border-[#d5c89e] text-[10px] font-semibold text-[#154212] cursor-pointer hover:bg-[#eee8d5]"
                >
                  🍵 Tisane (0 kcal)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSnackName('Double Espresso (5 kcal)');
                    setSnackCalories('5');
                  }}
                  className="px-2 py-1 rounded bg-[#faf3e0] border border-[#d5c89e] text-[10px] font-semibold text-[#775a00] cursor-pointer hover:bg-[#eee8d5]"
                >
                  ☕ Espresso (5 kcal)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSnackName('Roasted Almonds 30g');
                    setSnackCalories('170');
                  }}
                  className="px-2 py-1 rounded bg-[#faf3e0] border border-[#d5c89e] text-[10px] font-semibold text-[#873724] cursor-pointer hover:bg-[#eee8d5]"
                >
                  🌰 Almonds (170 kcal)
                </button>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenQuickCalorieModal(false)}
                  className="flex-1 py-2 rounded-lg bg-[#eee8d5] text-[#42493e] font-label-md uppercase text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#154212] text-white font-label-md uppercase text-xs font-bold shadow-[0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-[#2d5a27]"
                >
                  Inscribe into Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. BARCODE SCANNER MODAL */}
      {openBarcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-xl bg-[#201c13] border border-[#775a00] p-4 text-[#fff9e9] shadow-[0_12px_32px_rgba(0,0,0,0.8)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#5a4300] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ffdf98] text-[20px]">barcode_scanner</span>
                <h3 className="font-headline-sm text-[#ffdf98] font-semibold text-[16px]">
                  Optic Barcode Reader
                </h3>
              </div>
              <button
                onClick={() => setOpenBarcodeModal(false)}
                className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Simulated Barcode Laser Viewfinder */}
            <div className="relative w-full h-44 rounded-lg bg-black border-2 border-[#775a00] overflow-hidden flex items-center justify-center">
              {/* Laser Line */}
              <div className="absolute inset-x-4 h-0.5 bg-red-500 shadow-[0_0_10px_red] animate-pulse"></div>
              {/* Mock Barcode graphics */}
              <div className="w-3/4 h-24 flex items-center justify-around opacity-75">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-white"
                    style={{ width: `${(i % 3) + 1.5}px` }}
                  />
                ))}
              </div>
              <span className="absolute bottom-2 text-[10px] text-[#ffdf98] tracking-widest font-mono">
                CODE-128 • 890124802
              </span>
            </div>

            <p className="text-[11px] text-[#c2c9bb] text-center">
              Position item code within illuminated aperture. Select recognized apothecary packaging:
            </p>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleScanBarcodeItem('Raw Organic Almonds', 160, 'Raw California orchard nuts')}
                className="p-2 rounded bg-white/5 border border-white/10 hover:border-[#ffdf98] text-left text-xs flex justify-between cursor-pointer"
              >
                <span>🌰 Raw Organic Almonds (30g)</span>
                <span className="text-[#ffdf98] font-bold">160 kcal</span>
              </button>
              <button
                onClick={() => handleScanBarcodeItem('Fermented Ginger Kombucha', 35, 'Live probiotic sparkling draught')}
                className="p-2 rounded bg-white/5 border border-white/10 hover:border-[#ffdf98] text-left text-xs flex justify-between cursor-pointer"
              >
                <span>🍾 Fermented Ginger Kombucha (330ml)</span>
                <span className="text-[#ffdf98] font-bold">35 kcal</span>
              </button>
              <button
                onClick={() => handleScanBarcodeItem('Stone-Ground Matcha Cold Draught', 45, 'Ceremonial grade green leaf')}
                className="p-2 rounded bg-white/5 border border-white/10 hover:border-[#ffdf98] text-left text-xs flex justify-between cursor-pointer"
              >
                <span>🍵 Cold Draught Matcha (250ml)</span>
                <span className="text-[#ffdf98] font-bold">45 kcal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXPORT LEDGER REPORT MODAL */}
      {openExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-xl bg-[#fff9e9] border border-[#d5c89e] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#e8e2d0] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#154212] text-[20px]">military_tech</span>
                <h3 className="font-headline-sm text-[#154212] font-semibold text-[16px]">
                  Archival Ledger Certificate
                </h3>
              </div>
              <button
                onClick={() => setOpenExportModal(false)}
                className="w-6 h-6 rounded-full bg-[#eee8d5] text-[#42493e] flex items-center justify-center hover:bg-[#e0dac7] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Certificate Parchment Card */}
            <div className="p-3 rounded-lg bg-[#faf3e0] border-2 border-double border-[#775a00]/40 flex flex-col items-center text-center gap-1.5">
              <span className="font-label-sm text-[#775a00] uppercase tracking-widest text-[9px] font-bold">
                OFFICIAL RECORD • FOLIO NO. 4482-B
              </span>
              <h4 className="font-headline-sm text-[#154212] text-lg font-bold">
                Weekly Adherence Seal: 97%
              </h4>
              <p className="font-body-sm text-[#42493e] text-[11px]">
                Valid for week of October 18 – October 24. 7-Day Mean Output: 2,080 kcal / day. Hydration Streak: 7 Days unbroken.
              </p>
              <div className="mt-1 px-3 py-0.5 rounded-full bg-[#873724] text-white text-[10px] font-bold shadow">
                AUTHENTICATED &amp; APPROVED
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleDownloadCsv}
                className="w-full py-2.5 rounded-lg bg-gradient-to-b from-[#154212] to-[#2d5a27] text-white font-label-md uppercase text-xs font-bold shadow flex items-center justify-center gap-2 cursor-pointer hover:brightness-105"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Authenticated CSV Roll</span>
              </button>
              <button
                onClick={() => window.print()}
                className="w-full py-2 rounded-lg bg-[#eee8d5] text-[#1e1c10] font-label-md uppercase text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer hover:bg-[#e0dac7]"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Ledger Folio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
