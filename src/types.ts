export interface MealItem {
  id: string;
  name: string;
  category: 'Morning' | 'Midday' | 'Evening' | 'Snack' | 'Hydration';
  time: string;
  calories: number;
  description: string;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
  image?: string;
  status: 'logged' | 'planned';
  isAiAnalyzed?: boolean;
  scanTicket?: string;
  milliliters?: number;
}

export interface ScannedAnalysis {
  ticket: string;
  title: string;
  confidence: number;
  image: string;
  items: {
    name: string;
    portion: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DayStats {
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
}

export interface WeeklyDayData {
  day: string;
  calories: number;
  met: boolean;
  water: number;
  carbs: number;
  protein: number;
  fat: number;
}
