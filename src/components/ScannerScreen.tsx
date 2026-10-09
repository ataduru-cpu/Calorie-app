import React, { useState, useRef } from 'react';
import { useApp, SAMPLE_PREVIEWS, ASSETS } from '../context/AppContext';
import { ScannedAnalysis } from '../types';

export const ScannerScreen: React.FC = () => {
  const {
    currentAnalysis,
    setCurrentAnalysis,
    addMealItem,
    setOpenCalibrationModal,
    setActiveTab,
  } = useApp();

  // Top toggles
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [macroOn, setMacroOn] = useState<boolean>(true);
  const [isoIndex, setIsoIndex] = useState<number>(0);
  const isoValues = ['ISO 100 • 50mm', 'ISO 200 • 35mm', 'ISO 400 • 85mm'];

  // Shutter state
  const [isShutterActive, setIsShutterActive] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [sampleIdx, setSampleIdx] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleFlash = () => setFlashOn((prev) => !prev);
  const handleToggleMacro = () => setMacroOn((prev) => !prev);
  const handleCycleIso = () => setIsoIndex((prev) => (prev + 1) % isoValues.length);

  // Cycle through sample plates or import photo
  const handleCycleSample = () => {
    const nextIdx = (sampleIdx + 1) % SAMPLE_PREVIEWS.length;
    setSampleIdx(nextIdx);
    setCurrentAnalysis(SAMPLE_PREVIEWS[nextIdx]);
    setIsLogged(false);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const customAnalysis: ScannedAnalysis = {
          ticket: `Ticket #${Math.floor(1000 + Math.random() * 9000)}-D • Custom Snapshot`,
          title: 'Artisanal Prepared Repast',
          confidence: 93,
          image: reader.result as string,
          items: [
            { name: 'Herb Seared Protein', portion: '160g (Roasted)', calories: 280, protein: 34, carbs: 2, fat: 12 },
            { name: 'Ancient Steamed Grain', portion: '130g (Organic)', calories: 190, protein: 6, carbs: 38, fat: 3 },
            { name: 'Fresh Garden Greens & Oil', portion: '60g (Vinaigrette)', calories: 110, protein: 2, carbs: 4, fat: 9 },
          ],
          totalCalories: 580,
          protein: 42,
          carbs: 44,
          fat: 24,
        };
        setCurrentAnalysis(customAnalysis);
        setIsLogged(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerShutter = () => {
    setIsShutterActive(true);
    setTimeout(() => {
      setIsShutterActive(false);
    }, 250);
  };

  const handleConfirmAndLog = () => {
    if (isLogged) return;

    addMealItem({
      name: currentAnalysis.items.map((i) => i.name).slice(0, 2).join(' & '),
      category: 'Midday',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: currentAnalysis.totalCalories,
      description: currentAnalysis.items.map((i) => i.name).join(', '),
      protein: currentAnalysis.protein,
      carbs: currentAnalysis.carbs,
      fat: currentAnalysis.fat,
      image: currentAnalysis.image,
      status: 'logged',
      isAiAnalyzed: true,
      scanTicket: currentAnalysis.ticket,
    });

    setIsLogged(true);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-4 max-w-lg mx-auto">
      {/* Hidden File Input for Custom Food Snapshots */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCustomUpload}
        accept="image/*"
        className="hidden"
      />

      {/* VINTAGE FIELD OPTICS TOP BAR / PHYSICAL TOGGLES */}
      <section className="w-full bg-gradient-to-b from-[#333124] via-[#2a281c] to-[#333124] text-[#e0dac7] rounded-xl p-3 shadow-[0_6px_16px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-[#5a4300]/40">
        <div className="flex items-center justify-between gap-2">
          {/* Flash Lever */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-label-sm text-[#ffdf98] text-[9px] tracking-widest uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Strobe
            </span>
            <button
              onClick={handleToggleFlash}
              aria-pressed={flashOn}
              className="group relative w-12 h-6 rounded-full bg-gradient-to-b from-[#15140e] to-[#2c2a1e] p-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.15)] flex items-center transition-all duration-200 cursor-pointer"
              type="button"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-b from-[#e8e2d0] via-[#c2c9bb] to-[#72796e] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center transition-transform duration-200 ${
                  flashOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                <span className={`material-symbols-outlined text-[13px] ${flashOn ? 'text-[#775a00]' : 'text-[#333124]'}`}>
                  {flashOn ? 'flash_on' : 'flash_off'}
                </span>
              </div>
            </button>
          </div>

          {/* Center Calibration Dial */}
          <div className="flex flex-col items-center">
            <span className="font-label-sm text-[#eec14b] text-[9px] tracking-widest uppercase">
              Aperture Cal.
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 mt-0.5 rounded bg-black/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)]">
              <span className="font-metric-numeral text-[#fece57] text-xs tracking-wider">ƒ/2.8</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#bcf0ae] shadow-[0_0_6px_rgba(188,240,174,0.9)] animate-pulse"></span>
              <span className="font-label-sm text-[#e0dac7] text-[10px]">AUTO-PORTION</span>
            </div>
          </div>

          {/* Macro Lens Slider */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-label-sm text-[#ffdf98] text-[9px] tracking-widest uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Macro
            </span>
            <button
              onClick={handleToggleMacro}
              aria-pressed={macroOn}
              className="group relative w-12 h-6 rounded-full bg-gradient-to-b from-[#15140e] to-[#2c2a1e] p-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.15)] flex items-center transition-all duration-200 cursor-pointer"
              type="button"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#775a00] to-[#5a4300] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center transition-transform duration-200 ${
                  macroOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                <span className="material-symbols-outlined text-[13px] text-white">
                  center_focus_strong
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* VIEWFINDER CHAMBER (HASSELBLAD / LEICA BRASS & LEATHERETTE CHASSIS) */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#1a1811] via-[#242116] to-[#12110b] p-3 shadow-[0_12px_32px_rgba(21,66,18,0.25),0_4px_12px_rgba(0,0,0,0.4),inset_0_2px_1px_rgba(255,255,255,0.25)] border border-[#775a00]/40">
        {/* Knurled Brass Aperture Bezel */}
        <div className="relative w-full rounded-xl p-2 bg-gradient-to-tr from-[#775a00] via-[#fece57] to-[#5a4300] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),0_2px_4px_rgba(0,0,0,0.5)]">
          {/* Inner Darkened Optical Barrel */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.95)]">
            {/* Live Simulated Camera Preview */}
            <img
              className={`w-full h-full object-cover select-none transition-transform duration-500 ${isShutterActive ? 'scale-105 filter brightness-150' : 'scale-100'}`}
              alt="Meal view"
              src={currentAnalysis.image}
            />

            {/* Shutter flash overlay */}
            {isShutterActive && (
              <div className="absolute inset-0 bg-white/70 pointer-events-none transition-opacity duration-100 animate-out fade-out" />
            )}

            {/* Optical Lens Glass Specular Glare */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 mix-blend-screen" />
            <div className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#ffdf98]/20 blur-2xl" />

            {/* Crosshair Reticle & HUD Overlay */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3">
              {/* Top HUD Metrics */}
              <div className="flex items-center justify-between text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping" />
                  <span className="font-label-sm text-[10px] tracking-widest text-[#fff9e9]">
                    SPECTRA: LOCK
                  </span>
                </div>
                <div className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span className="font-label-sm text-[10px] text-[#ffdf98] tracking-wider">
                    EXP 1/250s
                  </span>
                </div>
              </div>

              {/* Central Crosshair Focus Reticle */}
              <div className="self-center my-auto relative w-24 h-24 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#eec14b] drop-shadow" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#eec14b] drop-shadow" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#eec14b] drop-shadow" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#eec14b] drop-shadow" />
                <div className="w-2 h-2 rounded-full bg-[#ffdf98] shadow-[0_0_8px_rgba(254,206,87,1)]" />
                <div
                  className="absolute w-14 h-14 rounded-full border border-dashed border-[#ffdf98]/50 animate-spin"
                  style={{ animationDuration: '18s' }}
                />
              </div>

              {/* Bottom HUD Status */}
              <div className="flex items-center justify-between text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                <span className="font-label-sm text-[10px] tracking-wider bg-black/50 px-2 py-0.5 rounded">
                  {isoValues[isoIndex]}
                </span>
                <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded text-[#bcf0ae]">
                  <span className="material-symbols-outlined text-[14px]">nutrition</span>
                  <span className="font-label-sm text-[10px] tracking-wider uppercase font-semibold">
                    Plate Identified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TACTILE MECHANICAL SHUTTER DECK */}
        <div className="flex items-center justify-around pt-3 pb-1">
          {/* Film Roll Gallery Import Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import photo or switch plate"
            className="group flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[#3a3727] via-[#242217] to-[#12110c] text-[#ffdf98] shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.7)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:rotate-45 transition-transform">
              filter_frames
            </span>
            <span className="font-label-sm text-[8px] uppercase tracking-tighter text-[#e0dac7] -mt-0.5 font-bold">
              Roll
            </span>
          </button>

          {/* Giant Chrome & Red-Dot Shutter Release Actuator */}
          <div className="p-1 rounded-full bg-gradient-to-b from-[#8c9287] via-[#52574e] to-[#252822] shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
            <button
              onClick={triggerShutter}
              aria-label="Capture & Analyze Nutrition"
              className="relative w-16 h-16 rounded-full bg-gradient-to-b from-white via-[#ded7c4] to-[#a8a18f] p-1 shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_4px_8px_rgba(0,0,0,0.5),inset_0_-3px_4px_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] transition-all flex items-center justify-center cursor-pointer hover:scale-[1.02]"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#ba1a1a] via-[#93000a] to-[#5c0005] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[24px]">camera</span>
              </div>
            </button>
          </div>

          {/* Exposure Compensation Wheel */}
          <button
            onClick={handleCycleIso}
            title="Cycle ISO sensitivity"
            className="group flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[#3a3727] via-[#242217] to-[#12110c] text-[#ffdf98] shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.7)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              tune
            </span>
            <span className="font-label-sm text-[8px] uppercase tracking-tighter text-[#e0dac7] -mt-0.5 font-bold">
              Sens.
            </span>
          </button>
        </div>
      </div>

      {/* SAMPLE DISHES SELECTOR QUICK BAR */}
      <div className="flex items-center justify-between px-1">
        <span className="font-label-sm text-[#775a00] uppercase tracking-wider text-[10px] font-semibold">
          Prepared Specimen Plates:
        </span>
        <button
          onClick={handleCycleSample}
          className="font-label-sm text-[#154212] underline hover:text-[#2d5a27] text-[10px] font-bold cursor-pointer"
        >
          Switch Specimen Plate ➔
        </button>
      </div>

      {/* MECHANICAL THERMAL RECEIPT PRINTOUT DISPENSER (DISPENSING TRAY EFFECT) */}
      <div className="relative w-full">
        {/* Brass Dispenser Slot Trim */}
        <div className="w-full h-3 rounded-t bg-gradient-to-b from-[#5a4300] via-[#775a00] to-[#251a00] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]" />

        {/* Torn Edge Physical Receipt Paper */}
        <div
          className={`w-full bg-[#fcf8ec] text-[#242116] rounded-b-xl shadow-[0_8px_24px_rgba(0,0,0,0.22),0_2px_6px_rgba(0,0,0,0.12)] p-4 flex flex-col gap-3 transition-all duration-500 ease-out border-x border-b border-[#d5c89e]/60 ${
            isShutterActive ? '-translate-y-2 opacity-80' : 'translate-y-0 opacity-100'
          }`}
        >
          {/* Receipt Header / Dot-Matrix Stamp */}
          <div className="flex items-start justify-between pb-2 border-b-2 border-dashed border-[#d1c8b0]">
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] tracking-widest uppercase text-[#692010] font-bold">
                VITALIS DISPENSARY APOTHECARY
              </span>
              <span className="font-headline-sm text-[#154212] text-base font-bold">
                {currentAnalysis.title}
              </span>
              <span className="font-body-sm text-[11px] text-[#42493e]">
                {currentAnalysis.ticket}
              </span>
            </div>

            {/* Vintage Red Confidence Stamp */}
            <div className="rotate-[-6deg] px-2 py-1 rounded bg-[#ffdad6] text-[#93000a] shadow-[0_1px_2px_rgba(186,26,26,0.3)] flex flex-col items-center">
              <span className="font-label-sm text-[9px] uppercase tracking-widest font-black">
                CONFIDENCE
              </span>
              <span className="font-headline-sm text-[#692010] text-sm leading-none font-bold">
                {currentAnalysis.confidence}% CONFIRMED
              </span>
            </div>
          </div>

          {/* Recognized Line Items */}
          <div className="flex flex-col gap-2">
            {currentAnalysis.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between font-body-md text-xs py-1 border-b border-[#ece4cd]"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1e1c10]">{item.name}</span>
                  <span className="font-body-sm text-[11px] text-[#72796e]">{item.portion}</span>
                </div>
                <span className="font-headline-sm text-sm text-[#154212] font-semibold">
                  {item.calories} kcal
                </span>
              </div>
            ))}
          </div>

          {/* Recessed LCD Macro Strips (Brass Bezel Aesthetic) */}
          <div className="rounded-lg bg-[#e8e2d0] p-2.5 shadow-[inset_0_2px_5px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.8)] border border-[#c2c9bb]/60">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#c2c9bb]">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#42493e] font-bold">
                TOTAL CALORIC YIELD
              </span>
              <span className="font-headline-md text-[#154212] text-xl font-bold">
                {currentAnalysis.totalCalories}{' '}
                <span className="font-body-sm text-xs font-normal">KCAL</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="flex flex-col bg-white p-1.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <span className="font-label-sm text-[9px] uppercase tracking-wider text-[#72796e] font-bold">
                  PROTEIN
                </span>
                <span className="font-metric-numeral text-sm font-bold text-[#154212]">
                  {currentAnalysis.protein}
                  <span className="text-[10px] font-normal">g</span>
                </span>
              </div>
              <div className="flex flex-col bg-white p-1.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <span className="font-label-sm text-[9px] uppercase tracking-wider text-[#72796e] font-bold">
                  CARBS
                </span>
                <span className="font-metric-numeral text-sm font-bold text-[#775a00]">
                  {currentAnalysis.carbs}
                  <span className="text-[10px] font-normal">g</span>
                </span>
              </div>
              <div className="flex flex-col bg-white p-1.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <span className="font-label-sm text-[9px] uppercase tracking-wider text-[#72796e] font-bold">
                  FATS
                </span>
                <span className="font-metric-numeral text-sm font-bold text-[#873724]">
                  {currentAnalysis.fat}
                  <span className="text-[10px] font-normal">g</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tactile Hardware Decision Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            {/* Raised Green Enamel Primary Button */}
            <button
              onClick={handleConfirmAndLog}
              disabled={isLogged}
              className={`w-full h-12 rounded-lg font-headline-sm text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLogged
                  ? 'bg-[#2d5a27] text-[#bcf0ae] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] cursor-default'
                  : 'bg-gradient-to-b from-[#3b6934] via-[#2d5a27] to-[#154212] text-white shadow-[0_4px_6px_rgba(21,66,18,0.4),inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-2px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] hover:brightness-105'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isLogged ? 'check_circle' : 'verified'}
              </span>
              <span>{isLogged ? 'Recorded to Ledger!' : 'Confirm & Log Meal'}</span>
            </button>

            {/* Brushed Steel Calibrate Secondary Button */}
            <button
              onClick={() => setOpenCalibrationModal(true)}
              className="w-full h-10 rounded-lg bg-gradient-to-b from-white via-[#eee8d5] to-[#e0dac7] text-[#42493e] font-label-lg text-xs uppercase tracking-wider shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:text-[#1e1c10]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Calibrate Portions (Gram Scale)</span>
            </button>
          </div>

          {/* Perforated Tear-off Footer Visual */}
          <div className="flex justify-between items-center -mx-4 -mb-4 px-2 pt-2 text-[#d1c8b0] overflow-hidden select-none">
            <span className="text-xs tracking-[4px]">
              ▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
