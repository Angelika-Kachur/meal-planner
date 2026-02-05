import React from 'react';
import './Settings.css';
import { useMeal } from '../context/MealContext';

const Settings: React.FC = () => {
    const { unitSystem, setUnitSystem } = useMeal();

    return (
        <div className="settings-page">
            <section className="settings-hero">
                <div className="container">
                    <h1>App <span>Settings</span></h1>
                    <p>Customize your experience. Manage unit systems and application preferences.</p>
                </div>
            </section>

            <section className="settings-content">
                <div className="container">
                    <div className="settings-card">
                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Unit System</h3>
                                <p>Choose your preferred measurement system for ingredients and weights.</p>
                            </div>
                            <div className="setting-control">
                                <div className="unit-toggle">
                                    <button
                                        className={`unit-btn ${unitSystem === 'metric' ? 'active' : ''}`}
                                        onClick={() => setUnitSystem('metric')}
                                    >
                                        Metric (g, ml)
                                    </button>
                                    <button
                                        className={`unit-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
                                        onClick={() => setUnitSystem('imperial')}
                                    >
                                        Imperial (oz, lb)
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Dark Mode</h3>
                                <p>Switch between light and dark themes.</p>
                            </div>
                            <div className="setting-control">
                                <span className="system-default">Controlled by System</span>
                            </div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Language</h3>
                                <p>Select your interface language.</p>
                            </div>
                            <div className="setting-control">
                                <select className="settings-select" disabled>
                                    <option>English</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="settings-footer">
                        <p>Version 1.2.0 • Made with ❤️ by MealPlanner Team</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Settings;
