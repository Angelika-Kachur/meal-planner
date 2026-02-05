import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface Recipe {
    id: number;
    name: string;
    calories: number;
    time: string;
    image: string;
    category: string;
    description: string;
    protein: number;
    fat: number;
    carbs: number;
    ingredients?: string[];
    instructions?: string[];
}

interface MealPlanState {
    [day: string]: {
        [slot: string]: Recipe | null;
    };
}

interface MealContextType {
    mealPlan: MealPlanState;
    unitSystem: 'metric' | 'imperial';
    addMeal: (day: string, slot: string, recipe: Recipe) => void;
    removeMeal: (day: string, slot: string) => void;
    setUnitSystem: (system: 'metric' | 'imperial') => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mealPlan, setMealPlan] = useState<MealPlanState>({});
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

    const addMeal = (day: string, slot: string, recipe: Recipe) => {
        setMealPlan((prev) => ({
            ...prev,
            [day]: {
                ...(prev[day] || {}),
                [slot]: recipe,
            },
        }));
    };

    const removeMeal = (day: string, slot: string) => {
        setMealPlan((prev) => {
            const dayPlan = { ...(prev[day] || {}) };
            delete dayPlan[slot];
            return {
                ...prev,
                [day]: dayPlan,
            };
        });
    };

    return (
        <MealContext.Provider value={{ mealPlan, unitSystem, addMeal, removeMeal, setUnitSystem }}>
            {children}
        </MealContext.Provider>
    );
};

export const useMeal = () => {
    const context = useContext(MealContext);
    if (context === undefined) {
        throw new Error('useMeal must be used within a MealProvider');
    }
    return context;
};
