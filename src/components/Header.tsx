import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', href: '/' },
        { name: 'Recipes', href: '/recipes' },
        { name: 'Meal Plan', href: '/meal-plan' },
        { name: 'Shopping List', href: '/shopping-list' },
        { name: 'Settings', href: '/settings' },
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo-section" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src={logo} alt="Meal Planner Logo" className="logo-img" />
                    <span className="logo-text">Meal<span>Planner</span></span>
                </Link>

                <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    {navLinks.map((link) => (
                        link.href.startsWith('/') ? (
                            <Link key={link.name} to={link.href} className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                {link.name}
                            </Link>
                        ) : (
                            <a key={link.name} href={link.href} className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                {link.name}
                            </a>
                        )
                    ))}
                    <button className="cta-button">Get Started</button>
                </nav>

                <div
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
