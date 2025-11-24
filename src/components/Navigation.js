import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#advanced-features', label: 'Capabilities' },
        { href: '#cta', label: 'Get Started' }
    ];

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        if (href === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <motion.nav
            className={`nav ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="nav-container">
                <motion.a
                    href="#"
                    className="nav-brand"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <div className="logo-container">
                        <motion.div
                            className="logo-icon"
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <motion.circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="url(#logoGradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="60 40"
                                />
                                <defs>
                                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#0066FF" />
                                        <stop offset="50%" stopColor="#7C3AED" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                        <div className="logo-text">
                            <span className="logo-main">Source</span>
                            <span className="logo-accent">Smart</span>
                        </div>
                    </div>
                </motion.a>
                
                <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -2 }}
                            className="nav-link-item"
                        >
                            <span className="nav-link-text">{link.label}</span>
                            <motion.div
                                className="nav-link-underline"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    ))}
                </div>

                <motion.button
                    className="nav-cta"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const cta = document.querySelector('.cta');
                        if (cta) cta.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <span className="nav-cta-text">Get Started</span>
                    <motion.div
                        className="nav-cta-shine"
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                        }}
                    />
                    <div className="nav-cta-glow" />
                </motion.button>

                <button
                    className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </motion.nav>
    );
};

export default Navigation;

