import React from 'react';
import Benefits from '../components/Benefits';
import './Home.css';

const Home: React.FC = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Plan Your Meals. <br /><span>Enjoy Your Life.</span></h1>
                    <p>The smartest way to organize your weekly meals, discover new recipes, and simplify your grocery shopping.</p>
                    <div className="hero-btns">
                        <button className="btn-primary">Get Started Free</button>
                        <button className="btn-secondary">Watch Demo</button>
                    </div>
                </div>
            </section>
            <Benefits />
        </>
    );
};

export default Home;
