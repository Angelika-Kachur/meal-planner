import React, { useState } from 'react';
import './Recipes.css';
import salmonSalad from '../assets/salmon_salad.png';
import quinoaBowl from '../assets/quinoa_bowl.png';
import pastaPrimavera from '../assets/pasta_primavera.png';
import { useMeal, type Recipe } from '../context/MealContext';
import { convertUnit } from '../utils/units';

const recipes: Recipe[] = [
    {
        id: 1,
        name: 'Grilled Salmon Salad',
        calories: 450,
        protein: 35,
        fat: 22,
        carbs: 12,
        time: '20 min',
        image: salmonSalad,
        category: 'Lunch/Dinner',
        description: 'Fresh Atlantic salmon grilled to perfection, served over a bed of organic spring greens with avocado and citrus vinaigrette.',
        ingredients: ['6 oz Salmon fillet', '2 cups Spring mix', '1/2 Avocado, sliced', '1/4 cup Cherry tomatoes', '2 tbsp Citrus vinaigrette'],
        instructions: ['Season salmon with salt and pepper.', 'Grill salmon for 4-5 minutes per side.', 'Toss greens with vinaigrette.', 'Top greens with salmon and avocado.']
    },
    {
        id: 2,
        name: 'Mediterranean Quinoa Bowl',
        calories: 380,
        protein: 14,
        fat: 16,
        carbs: 48,
        time: '15 min',
        image: quinoaBowl,
        category: 'Vegetarian',
        description: 'Protein-packed quinoa topped with crisp cucumbers, kalamata olives, tangy feta cheese, and a lemon-tahini dressing.',
        ingredients: ['1 cup Cooked quinoa', '1/4 cup Chickpeas', '1/4 cup Cucumber, diced', '2 tbsp Kalamata olives', '1 tbsp Feta cheese', '2 tbsp Lemon-tahini dressing'],
        instructions: ['In a bowl, layer quinoa as the base.', 'Add chickpeas, cucumber, and olives.', 'Top with crumbled feta.', 'Drizzle with lemon-tahini dressing.']
    },
    {
        id: 3,
        name: 'Fresh Pasta Primavera',
        calories: 520,
        protein: 12,
        fat: 18,
        carbs: 72,
        time: '25 min',
        image: pastaPrimavera,
        category: 'Dinner',
        description: 'Hand-crafted pasta tossed with seasonal garden vegetables in a light garlic cream sauce with fresh parmesan.',
        ingredients: ['8 oz Fettuccine pasta', '1 Bell pepper, sliced', '1 Zucchini, diced', '1/2 cup Green peas', '2 cloves Garlic, minced', '1/4 cup Heavy cream', '2 tbsp Parmesan cheese'],
        instructions: ['Cook pasta in salted boiling water.', 'Sauté vegetables and garlic in olive oil.', 'Stir in cream and simmer for 2 minutes.', 'Toss pasta with sauce and parmesan.']
    },
    {
        id: 4,
        name: 'Seared Salmon Delight',
        calories: 460,
        protein: 36,
        fat: 24,
        carbs: 8,
        time: '22 min',
        image: salmonSalad,
        category: 'Dinner',
        description: 'A variation of our classic salmon, seared for a crispy skin and served with seasonal roasted asparagus.',
        ingredients: ['6 oz Salmon fillet', '1 bunch Asparagus', '2 cloves Garlic', '1 tbsp Lemon juice', 'Olive oil'],
        instructions: ['Preheat oven to 400°F (200°C).', 'Sear salmon in a hot pan skin-side down.', 'Roast asparagus with garlic and oil for 10 minutes.', 'Serve salmon over roasted asparagus with a squeeze of lemon.']
    },
    {
        id: 5,
        name: 'Garden Quinoa Power',
        calories: 390,
        protein: 15,
        fat: 14,
        carbs: 52,
        time: '18 min',
        image: quinoaBowl,
        category: 'Vegan',
        description: 'A fully plant-based power bowl featuring roasted chickpeas, shredded carrots, and a zesty lime dressing.',
        ingredients: ['1 cup Cooked quinoa', '1/2 cup Roasted chickpeas', '1/2 cup Shredded carrots', '1/4 cup Red cabbage', '2 tbsp Lime-cilantro dressing'],
        instructions: ['Divide quinoa into bowls.', 'Top with chickpeas, carrots, and cabbage.', 'Drizzle with lime-cilantro dressing.', 'Garnish with fresh cilantro.']
    }
];

const Recipes: React.FC = () => {
    const { addMeal, unitSystem } = useMeal();
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [targetRecipe, setTargetRecipe] = useState<Recipe | null>(null);

    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealSlots = ['Breakfast', 'Lunch', 'Dinner'];

    const openModal = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        document.body.style.overflow = 'auto';
    };

    const handleAddToPlan = (recipe: Recipe) => {
        setTargetRecipe(recipe);
        setIsSelectorOpen(true);
    };

    const confirmAdd = (day: string, slot: string) => {
        if (targetRecipe) {
            addMeal(day, slot, targetRecipe);
            setIsSelectorOpen(false);
            setTargetRecipe(null);
        }
    };

    return (
        <div className="recipes-page">
            <section className="recipes-hero">
                <div className="container">
                    <h1>Healthy <span>Recipes</span></h1>
                    <p>Discover and manage your curated selection of delicious, easy-to-make recipes.</p>
                </div>
            </section>

            <section className="recipes-list">
                <div className="container">
                    <div className="recipes-grid">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                <div className="recipe-image-wrapper">
                                    <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                                    <span className="recipe-category">{recipe.category}</span>
                                </div>
                                <div className="recipe-info">
                                    <div className="recipe-meta">
                                        <span className="recipe-calories">🔥 {recipe.calories} kcal</span>
                                        <span className="recipe-time">⏱️ {recipe.time}</span>
                                    </div>
                                    <h3>{recipe.name}</h3>
                                    <p className="recipe-description">{recipe.description}</p>
                                    <div className="recipe-actions">
                                        <button className="btn-add" onClick={() => handleAddToPlan(recipe)}>Add to Plan</button>
                                        <button className="btn-details" onClick={() => openModal(recipe)}>View Recipe</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recipe Modal */}
            {selectedRecipe && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <div className="modal-content">
                            <div className="modal-image-col">
                                <img src={selectedRecipe.image} alt={selectedRecipe.name} />
                            </div>
                            <div className="modal-info-col">
                                <span className="modal-category">{selectedRecipe.category}</span>
                                <h2>{selectedRecipe.name}</h2>
                                <div className="modal-meta">
                                    <span>🔥 {selectedRecipe.calories} kcal</span>
                                    <span>⏱️ {selectedRecipe.time}</span>
                                </div>
                                <div className="modal-macros">
                                    <div className="macro-item">
                                        <span className="macro-value">{selectedRecipe.protein}g</span>
                                        <span className="macro-label">Protein</span>
                                    </div>
                                    <div className="macro-item">
                                        <span className="macro-value">{selectedRecipe.fat}g</span>
                                        <span className="macro-label">Fat</span>
                                    </div>
                                    <div className="macro-item">
                                        <span className="macro-value">{selectedRecipe.carbs}g</span>
                                        <span className="macro-label">Carbs</span>
                                    </div>
                                </div>
                                <p className="modal-desc">{selectedRecipe.description}</p>

                                <div className="recipe-details-grid">
                                    <div className="ingredients-section">
                                        <h4>Ingredients</h4>
                                        <ul>
                                            {selectedRecipe.ingredients?.map((ing, i) => (
                                                <li key={i}>{convertUnit(ing, unitSystem)}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="instructions-section">
                                        <h4>Instructions</h4>
                                        <ol>
                                            {selectedRecipe.instructions?.map((inst, i) => (
                                                <li key={i}>{inst}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn-primary" onClick={() => handleAddToPlan(selectedRecipe)}>Add to My Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Day/Meal Selector Modal */}
            {isSelectorOpen && (
                <div className="modal-overlay" onClick={() => setIsSelectorOpen(false)}>
                    <div className="selector-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Add to Plan</h3>
                        <p>Choose when you'll enjoy this meal:</p>

                        <div className="selector-grid">
                            <div className="selector-group">
                                <label>Select Day</label>
                                <div className="selector-options">
                                    {dayLabels.map(day => (
                                        <button key={day} className="option-btn" onClick={() => {
                                            const slot = (document.getElementById('slot-select') as HTMLSelectElement).value;
                                            confirmAdd(day, slot);
                                        }}>
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="selector-group">
                                <label>Select Slot</label>
                                <select id="slot-select" className="slot-dropdown">
                                    {mealSlots.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipes;
