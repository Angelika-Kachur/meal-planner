import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingList.css';
import { useMeal } from '../context/MealContext';
import { convertUnit } from '../utils/units';
import { exportToPdf } from '../utils/exportPdf';

interface ShoppingItem {
    id: string;
    name: string;
    amount: string;
    category: string;
    checked: boolean;
    source?: string; // To identify if it came from a specific recipe
}

const ShoppingList: React.FC = () => {
    const { mealPlan, unitSystem } = useMeal();
    const [manualCheckedItems, setManualCheckedItems] = useState<Set<string>>(new Set());
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        await exportToPdf('shopping-list-content', 'My-Shopping-List');
        setIsExporting(false);
    };

    // Derive ingredients from meal plan
    const derivedItems = useMemo(() => {
        const items: ShoppingItem[] = [];
        const ingredientMap: { [key: string]: { amount: string; category: string; source: Set<string> } } = {};

        // Iterate through all days and slots in the meal plan
        Object.values(mealPlan).forEach((dayPlan) => {
            Object.values(dayPlan).forEach((recipe) => {
                if (recipe && recipe.ingredients) {
                    recipe.ingredients.forEach((ing) => {
                        // Simple approach: use the full string as the key
                        // In a real app, you'd parse "200g Spinach" into "Spinach" and "200g"
                        if (!ingredientMap[ing]) {
                            ingredientMap[ing] = {
                                amount: '', // Amount is often baked into the string in this mockup
                                category: recipe.category.includes('Vegetarian') || recipe.category.includes('Vegan') ? 'Produce' : 'Other',
                                source: new Set([recipe.name])
                            };
                        } else {
                            ingredientMap[ing].source.add(recipe.name);
                        }
                    });
                }
            });
        });

        Object.entries(ingredientMap).forEach(([ing, data], index) => {
            items.push({
                id: `recipe-ing-${index}`,
                name: ing,
                amount: '',
                category: data.category,
                checked: manualCheckedItems.has(ing),
                source: Array.from(data.source).join(', ')
            });
        });

        // Add some basic/staple items if the list is empty or just as defaults
        if (items.length === 0) {
            const staples = [
                { id: 'staple-1', name: 'Olive Oil', amount: '1 bottle', category: 'Pantry', checked: manualCheckedItems.has('Olive Oil') },
                { id: 'staple-2', name: 'Salt & Pepper', amount: 'Any', category: 'Pantry', checked: manualCheckedItems.has('Salt & Pepper') },
                { id: 'staple-3', name: 'Garlic', amount: '2 bulbs', category: 'Produce', checked: manualCheckedItems.has('Garlic') },
            ];
            items.push(...staples);
        }

        return items;
    }, [mealPlan, manualCheckedItems]);

    const toggleItem = (name: string) => {
        const newChecked = new Set(manualCheckedItems);
        if (newChecked.has(name)) {
            newChecked.delete(name);
        } else {
            newChecked.add(name);
        }
        setManualCheckedItems(newChecked);
    };

    const categories = Array.from(new Set(derivedItems.map(item => item.category)));

    const completedCount = derivedItems.filter(i => i.checked).length;
    const totalCount = derivedItems.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="shopping-list-page">
            <section className="shopping-hero">
                <div className="container">
                    <h1>Shopping <span>List</span></h1>
                    <p>
                        {totalCount > 0
                            ? `We've gathered ${totalCount} items from your ${Object.keys(mealPlan).length} planned days.`
                            : "Add recipes to your meal plan to automatically generate your shopping list!"}
                    </p>
                </div>
            </section>

            <section className="shopping-content">
                <div className="container">
                    <div className="shopping-grid">
                        <div id="shopping-list-content" className="list-container">
                            {totalCount === 0 && (
                                <div className="empty-list-state">
                                    <p>Your shopping list is empty. Head over to Recipes to start planning!</p>
                                    <Link to="/recipes" className="btn-primary">Browse Recipes</Link>
                                </div>
                            )}

                            {categories.map(category => (
                                <div key={category} className="category-group">
                                    <h3 className="category-title">{category}</h3>
                                    <div className="items-list">
                                        {derivedItems.filter(item => item.category === category).map(item => (
                                            <div
                                                key={item.id}
                                                className={`shopping-item ${item.checked ? 'checked' : ''}`}
                                                onClick={() => toggleItem(item.name)}
                                            >
                                                <div className="checkbox">
                                                    {item.checked && <span className="check-mark">✓</span>}
                                                </div>
                                                <div className="item-info">
                                                    <div className="item-details">
                                                        <span className="item-name">{convertUnit(item.name, unitSystem)}</span>
                                                        {item.source && <span className="item-source">Needed for: {item.source}</span>}
                                                    </div>
                                                    <span className="item-amount">{convertUnit(item.amount, unitSystem)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="shopping-sidebar">
                            <div className="summary-card">
                                <h3>Plan Summary</h3>
                                <div className="summary-stat">
                                    <span>Total Items</span>
                                    <span>{totalCount}</span>
                                </div>
                                <div className="summary-stat">
                                    <span>Completed</span>
                                    <span>{completedCount}</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <button
                                    className="btn-primary full-width"
                                    onClick={handleExport}
                                    disabled={isExporting}
                                >
                                    {isExporting ? 'Generating PDF...' : 'Export to PDF'}
                                </button>
                                <button className="btn-secondary full-width" onClick={() => setManualCheckedItems(new Set())}>
                                    Reset All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};



export default ShoppingList;
