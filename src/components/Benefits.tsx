import React from 'react';
import './Benefits.css';

const Benefits: React.FC = () => {
    const benefits = [
        {
            title: 'Save Time',
            description: 'Spend less time worrying about what to cook and more time enjoying your meals. A few minutes of planning saves hours of daily stress.',
            icon: '⏱️',
            color: '#84cc16'
        },
        {
            title: 'Save Money',
            description: 'Stop wasting food and money. By planning ahead, you buy exactly what you need and avoid expensive last-minute takeout.',
            icon: '💰',
            color: '#65a30d'
        },
        {
            title: 'Save Calories',
            description: 'Take charge of your health. Home-planned meals mean better nutrition, fresh ingredients, and perfect portion control.',
            icon: '🥗',
            color: '#a3e635'
        }
    ];

    return (
        <section className="benefits">
            <div className="benefits-container">
                <div className="benefits-header">
                    <span className="subtitle">The Power of Planning</span>
                    <h2>Big impact with minimal effort</h2>
                    <p>Meal planning is the secret weapon for a healthier, wealthier, and more organized life. See how much you can gain.</p>
                </div>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon" style={{ backgroundColor: `${benefit.color}15`, color: benefit.color }}>
                                {benefit.icon}
                            </div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
