import React, { useState } from 'react';
import './MealPlan.css';
import { useMeal } from '../context/MealContext';
import { Link } from 'react-router-dom';

const MealPlan: React.FC = () => {
    const { mealPlan, removeMeal } = useMeal();
    const [days, setDays] = useState<3 | 7>(7);

    const mealSlots = ['Breakfast', 'Lunch', 'Dinner'];
    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const displayDays = dayLabels.slice(0, days);

    const calculateDailyNutrients = (day: string) => {
        const dayMeals = mealPlan[day] || {};
        return Object.values(dayMeals).filter(Boolean).reduce(
            (acc, meal) => {
                if (meal) {
                    acc.calories += meal.calories || 0;
                    acc.protein += meal.protein || 0;
                    acc.fat += meal.fat || 0;
                    acc.carbs += meal.carbs || 0;
                }
                return acc;
            },
            { calories: 0, protein: 0, fat: 0, carbs: 0 }
        );
    };

    return (
        <div className="meal-plan-page">
            <section className="plan-hero">
                <div className="container">
                    <h1>Your <span>Meal Plan</span></h1>
                    <p>Organize your week with ease. Choose your plan duration and start building your healthy habits.</p>

                    <div className="plan-toggle">
                        <button
                            className={`toggle-btn ${days === 3 ? 'active' : ''}`}
                            onClick={() => setDays(3)}
                        >
                            3 Day Plan
                        </button>
                        <button
                            className={`toggle-btn ${days === 7 ? 'active' : ''}`}
                            onClick={() => setDays(7)}
                        >
                            7 Day Plan
                        </button>
                    </div>
                </div>
            </section>

            <section className="plan-grid-section">
                <div className="container">
                    <div className={`plan-grid days-${days}`}>
                        {displayDays.map((day, index) => {
                            const dailyNutrients = calculateDailyNutrients(day);
                            return (
                                <div key={day} className="day-column">
                                    <div className="day-header">
                                        <div className="day-title-group">
                                            <h3>{day}</h3>
                                            <span className="day-number">Day {index + 1}</span>
                                        </div>
                                        <div className="day-nutrition-summary">
                                            <span className="daily-total-kcal">{dailyNutrients.calories} kcal</span>
                                            <div className="daily-macros">
                                                <span>P: {dailyNutrients.protein}g</span>
                                                <span>F: {dailyNutrients.fat}g</span>
                                                <span>C: {dailyNutrients.carbs}g</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="meal-slots">
                                        {mealSlots.map(slot => {
                                            const meal = mealPlan[day]?.[slot];
                                            return (
                                                <div key={slot} className="meal-slot">
                                                    <span className="slot-label">{slot}</span>
                                                    {meal ? (
                                                        <div className="slot-content filled">
                                                            <img src={meal.image} alt={meal.name} className="slot-img" />
                                                            <div className="slot-info">
                                                                <span className="slot-name">{meal.name}</span>
                                                                <span className="slot-meta">{meal.calories} kcal</span>
                                                            </div>
                                                            <button
                                                                className="remove-meal-btn"
                                                                onClick={() => removeMeal(day, slot)}
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <Link to="/recipes" className="slot-content empty">
                                                            <button className="add-meal-btn">+</button>
                                                            <span>Add Recipe</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="plan-actions">
                        <button className="btn-primary">Save Plan</button>
                        <button className="btn-secondary">Print PDF</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MealPlan;
