import React, { createContext, useContext, useState } from 'react';
import { MealItem, ScannedAnalysis, WeeklyDayData } from '../types';

export const ASSETS = {
  emblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOaVSQAcZ-0z8Q79V3sLyOR91LLZFwHMdHeoO6Dk39xLGEOsrX6gYfXs5L0Lyq6mawTWB9w3zEeYTY8EMLQe_3jEm-S2Zn9h9KWbAZwJ3rjAhgNimDS33Kd8tWWG1PoE6Zh13rWFp1rohls5FEtPMKmmcJpQaw-5I3hv2tJfGmmvOw4e22AI3C_H20RRvN8csBuuhiRMAaZa6sXriGVIYHV77OsD1L8g6tM5MAgoOGrOubDSJhhoHj',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK4ctxcepLfpjpUtXuTbvIRyDYyK1aiaIm08dLSE9myUave7jK3_4GR2_8IaDlVY9EB_DXTx1OLZS4VlrYBF0qfV95cR95pSzqmx_W0gd9n0-XFzMZFUxPcXm3Fyj9w-9LZvnOB-7KvKWHTGBlzjtFivL9rH75AS13pqgzeWjoP31UrOWsYBy20auMsdDlOBiWffOD8mWUzmnWDlECnwor_wnrGaY-StTkl_41dmQhGoXValtQX5QL',
  oatmeal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3u67i2wDppwClH0PLdalqLKzsPs7p3c-lhclvKohYM2covQVYymU3GXuGcrTVpcLS2C74GBe-OXObNX7pcpf3PAjytvFyjPQPybttpti93_ERX933Pafeu50MtEjcRLnNoj1pbWub8SOYKTIUbaA9HWrRelminHtifeTV4z8YG5V27RhoGXbHnKv5CYdEVI7NSLWcsv62JgzlyJNFBG6O94jk4lfWfAjYh_guu-pQwtw7lANXHcDm',
  salmon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoD_d0uD1gU2EW_r4smAt8n2zwvJqZ2V7jz63XUP98vSyN3k74TGMfWzaHcnNvegXR8TqRqHm4NIzvbFo_S5MFbKmcB0hJA-Zy7PHrbf6it8kjEiB6GnyDg3264gWkDuKdYSikODZqQ7buoUEd7gQWLHg0oecHkT_VU2X_l8wUcgR4RNakZfKlZWWRfQ7gG0yDdGdRQCfJZJSj8UFRREeuGq3Dwjq-U80ZaIB5ce5k9gsxzQJodjL0',
  chicken: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJiopHRn50ful6qspfp_yqDAoy2217P5jZqlxDHJwrOZPJIWSwxiUlEsBNtZQ6o07_JShRChk7WNDM_11dlILtFo_oWebOhIxZM7FHEGyZAVLYgh2_ebr14KV0nS5P2FkoXHBXVFzD8_EkL0h8jEh8wKjOzZmM5z2fZ0rzDBvc7tdjgNFxp7j6yr-M8OeVgU1Ug_uGps6ltMJQbGHN988E9BgV8B3eopU4NrGaj-IetrVl9UmONAZo',
  wrap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEuY4SPcWRunnfcqKPv3c6VmavzJBOWN0RsuN-8ybri3YgKiRYUs7NTTBWL1WMVvpajjLBsP5efDD90WdnfPPsAZ0UzeYMBsCVkM8jfSFZlUfQJuQ4Ln6jYfxSJbrZR3vZOAy08FAAgDGLpz3qikIHvQKaRa8dk-bl_RCJNVa_q1V7NdueEWzxhJ9fDZgyQL-oEzZEizRSR8Tv2D-vq29-0Xe3VAypmZG2i3vY8iTmbmjJlO6Ydudf',
  scannerPlate: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG0PjnqTSiBbq19yTIY_IfMHtQ4plqLH8EwuTyiA2OUpB2XgLx0d8uWA8coNKMeO1cRKRN3CklZ2B2QQzezcuQ2JscrAOQ4t0un7716MDp8Pq5UOKeMWsgz6J9udHZhl3YVeKlXSO95XoWPyLZXMgL3WfLsrwu7rz0EqZNmu9yvZoGf7XTBtvDbipUZSRtoONwH2YssgzXQJK5prV7uHa-pIMXF7mLZrYax5FzK2qN6U7maL8XUR-X',
  archiveBook: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV9fxI03TJuKxwJ08jMtZ4xDmQI-YtOkUG2Ov3KZu4xK3HGQV2NQkfH20RUoPvoOqtUJ5md--OChBHCTD_Gh7CyL6FTtvVWQLgTjcQtM_HytpCSyrIbYSClFk6552mjyRhT32hBmBCz6_Sr7Efp8f73Rij7W3BalsyRwHX9tfhbeIH9SrMdJeGgbTzIJmm8BhG4Hlkae4Le9hAF7Feb_6Cmf1fdp_RJBm0Z2di7jPieVyul4tOfWCd',
};

export const INITIAL_MEALS: MealItem[] = [
  {
    id: 'meal-1',
    name: 'Steel-Cut Oats & Honey',
    category: 'Morning',
    time: '08:15 AM',
    calories: 480,
    description: 'Walnuts, cold pressed cream, espresso double',
    protein: 22,
    carbs: 38,
    fat: 18,
    image: ASSETS.oatmeal,
    status: 'logged',
  },
  {
    id: 'meal-2',
    name: 'Grilled Salmon & Avocado',
    category: 'Midday',
    time: '12:45 PM',
    calories: 620,
    description: 'Garden greens, cold pressed olive oil vinaigrette',
    protein: 44,
    carbs: 41,
    fat: 32,
    image: ASSETS.salmon,
    status: 'logged',
    isAiAnalyzed: true,
    scanTicket: '#41',
  },
  {
    id: 'meal-3',
    name: 'Roasted Chicken & Quinoa',
    category: 'Evening',
    time: 'Planned • 07:30 PM',
    calories: 320,
    description: 'Garden herbs, steamed baby squash, sea salt',
    protein: 44,
    carbs: 66,
    fat: 15,
    image: ASSETS.chicken,
    status: 'planned',
  },
];

export const INITIAL_WEEK_DATA: WeeklyDayData[] = [
  { day: 'Mon', calories: 2110, met: true, water: 2800, carbs: 230, protein: 154, fat: 59 },
  { day: 'Tue', calories: 2160, met: true, water: 3000, carbs: 238, protein: 160, fat: 60 },
  { day: 'Wed', calories: 1890, met: false, water: 2400, carbs: 210, protein: 140, fat: 52 },
  { day: 'Thu', calories: 2140, met: true, water: 2950, carbs: 236, protein: 158, fat: 58 },
  { day: 'Fri', calories: 2180, met: true, water: 3100, carbs: 242, protein: 162, fat: 61 },
  { day: 'Sat', calories: 2150, met: true, water: 3000, carbs: 235, protein: 156, fat: 58 },
  { day: 'Sun', calories: 1990, met: false, water: 2600, carbs: 220, protein: 145, fat: 55 },
];

export const SAMPLE_PREVIEWS: ScannedAnalysis[] = [
  {
    ticket: 'Ticket #4092-B • Table View',
    title: 'Optic Meal Analysis',
    confidence: 94,
    image: ASSETS.scannerPlate,
    items: [
      { name: 'Mediterranean Herb Chicken', portion: '180g (Fillet, Grilled)', calories: 290, protein: 32, carbs: 0, fat: 9 },
      { name: 'Quinoa & Brown Rice Pilaf', portion: '120g (Steamed Grain)', calories: 180, protein: 5, carbs: 36, fat: 3 },
      { name: 'Feta Curd & Kalamata Olives', portion: '45g (Brined Relish)', calories: 130, protein: 5, carbs: 12, fat: 10 },
    ],
    totalCalories: 600,
    protein: 42,
    carbs: 48,
    fat: 22,
  },
  {
    ticket: 'Ticket #4105-C • Delicatessen Wrap',
    title: 'Turkey Bacon Avocado Wrap',
    confidence: 96,
    image: ASSETS.wrap,
    items: [
      { name: 'Smoked Turkey Breast & Bacon', portion: '140g (Crispy, Cured)', calories: 310, protein: 32, carbs: 2, fat: 18 },
      { name: 'Fresh Hass Avocado & Greens', portion: '80g (Sliced Haas)', calories: 140, protein: 2, carbs: 7, fat: 12 },
      { name: 'Artisan Seeded Flatbread', portion: '90g (Toasted Wheat)', calories: 200, protein: 10, carbs: 32, fat: 2 },
    ],
    totalCalories: 650,
    protein: 44,
    carbs: 41,
    fat: 32,
  },
  {
    ticket: 'Ticket #4088-A • Matutinal Rustic Bowl',
    title: 'Steel-Cut Oats with Golden Honey',
    confidence: 98,
    image: ASSETS.oatmeal,
    items: [
      { name: 'Organic Steel-Cut Oats', portion: '160g (Simmered)', calories: 260, protein: 10, carbs: 45, fat: 4 },
      { name: 'Wildflower Honey & Walnuts', portion: '35g (Roasted Halves)', calories: 150, protein: 4, carbs: 18, fat: 9 },
      { name: 'Cold Pressed Cream & Espresso', portion: '40ml (Sweet)', calories: 70, protein: 2, carbs: 5, fat: 5 },
    ],
    totalCalories: 480,
    protein: 16,
    carbs: 68,
    fat: 18,
  },
];

interface AppContextType {
  activeTab: 'today' | 'scanner' | 'journal' | 'summary';
  setActiveTab: (tab: 'today' | 'scanner' | 'journal' | 'summary') => void;
  calories: number;
  calorieGoal: number;
  water: number;
  waterGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fat: number;
  fatGoal: number;
  meals: MealItem[];
  addWater: (amount: number) => void;
  resetWater: () => void;
  logPlannedMeal: (id: string) => void;
  addMealItem: (meal: Omit<MealItem, 'id'>) => void;
  quickInscribeSnack: (name: string, calories: number, description?: string) => void;
  currentAnalysis: ScannedAnalysis;
  setCurrentAnalysis: (analysis: ScannedAnalysis) => void;
  weeklyData: WeeklyDayData[];
  dateString: string;
  setDateString: (date: string) => void;
  nextDay: () => void;
  prevDay: () => void;
  openCalibrationModal: boolean;
  setOpenCalibrationModal: (open: boolean) => void;
  openExportModal: boolean;
  setOpenExportModal: (open: boolean) => void;
  openQuickCalorieModal: boolean;
  setOpenQuickCalorieModal: (open: boolean) => void;
  openBarcodeModal: boolean;
  setOpenBarcodeModal: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'scanner' | 'journal' | 'summary'>('today');
  const [dateString, setDateString] = useState<string>('Wednesday, Oct 24');
  const [water, setWater] = useState<number>(2100);
  const waterGoal = 3000;
  const calorieGoal = 2150;
  const proteinGoal = 150;
  const carbsGoal = 220;
  const fatGoal = 65;

  const [meals, setMeals] = useState<MealItem[]>(INITIAL_MEALS);
  const [currentAnalysis, setCurrentAnalysis] = useState<ScannedAnalysis>(SAMPLE_PREVIEWS[0]);
  const [weeklyData] = useState<WeeklyDayData[]>(INITIAL_WEEK_DATA);

  // Modals
  const [openCalibrationModal, setOpenCalibrationModal] = useState<boolean>(false);
  const [openExportModal, setOpenExportModal] = useState<boolean>(false);
  const [openQuickCalorieModal, setOpenQuickCalorieModal] = useState<boolean>(false);
  const [openBarcodeModal, setOpenBarcodeModal] = useState<boolean>(false);

  // Calculate consumed totals based on logged meals + extra calories
  const [extraCalories, setExtraCalories] = useState<number>(320); // starts calibrated with the 1,420 total in mockup (480 + 620 + 320 = 1420)
  const [extraMacros, setExtraMacros] = useState<{ protein: number; carbs: number; fat: number }>({
    protein: 44,
    carbs: 66,
    fat: -2,
  });

  const loggedMeals = meals.filter((m) => m.status === 'logged');
  const loggedCalories = loggedMeals.reduce((sum, m) => sum + m.calories, 0);
  const loggedProtein = loggedMeals.reduce((sum, m) => sum + m.protein, 0);
  const loggedCarbs = loggedMeals.reduce((sum, m) => sum + m.carbs, 0);
  const loggedFat = loggedMeals.reduce((sum, m) => sum + m.fat, 0);

  const calories = loggedCalories + extraCalories;
  const protein = loggedProtein + extraMacros.protein;
  const carbs = loggedCarbs + extraMacros.carbs;
  const fat = loggedFat + extraMacros.fat;

  const addWater = (amount: number) => {
    setWater((prev) => Math.min(waterGoal + 1000, prev + amount));
  };

  const resetWater = () => {
    setWater(0);
  };

  const logPlannedMeal = (id: string) => {
    setMeals((prev) =>
      prev.map((meal) => {
        if (meal.id === id) {
          return { ...meal, status: 'logged' };
        }
        return meal;
      })
    );
  };

  const addMealItem = (meal: Omit<MealItem, 'id'>) => {
    const newMeal: MealItem = {
      ...meal,
      id: `meal-${Date.now()}`,
    };
    setMeals((prev) => [newMeal, ...prev]);
  };

  const quickInscribeSnack = (name: string, cal: number, description = 'Apothecary infusion / snack') => {
    addMealItem({
      name,
      category: 'Snack',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: cal,
      description,
      protein: Math.round(cal * 0.05),
      carbs: Math.round(cal * 0.15),
      fat: Math.round(cal * 0.04),
      status: 'logged',
    });
  };

  const nextDay = () => {
    setDateString((prev) => (prev.includes('Oct 24') ? 'Thursday, Oct 25' : 'Wednesday, Oct 24'));
  };

  const prevDay = () => {
    setDateString((prev) => (prev.includes('Oct 24') ? 'Tuesday, Oct 23' : 'Wednesday, Oct 24'));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
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
        resetWater,
        logPlannedMeal,
        addMealItem,
        quickInscribeSnack,
        currentAnalysis,
        setCurrentAnalysis,
        weeklyData,
        dateString,
        setDateString,
        nextDay,
        prevDay,
        openCalibrationModal,
        setOpenCalibrationModal,
        openExportModal,
        setOpenExportModal,
        openQuickCalorieModal,
        setOpenQuickCalorieModal,
        openBarcodeModal,
        setOpenBarcodeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
