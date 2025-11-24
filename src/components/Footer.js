import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const footerLinks = {
        Product: [
            { name: 'Features', href: '#features' },
            { name: 'Platform', href: '#platform' },
            { name: 'Pricing', href: '#' },
            { name: 'Security', href: '#' }
        ],
        Company: [
            { name: 'About', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Contact', href: '#' }
        ],
        Resources: [
            { name: 'Documentation', href: '#' },
            { name: 'API', href: '#' },
            { name: 'Support', href: '#' },
            { name: 'Community', href: '#' }
        ],
        Legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Mail, href: '#', label: 'Email' }
    ];

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <footer className="footer">
            <div className="section-container">
                <div className="footer-content">
                    <motion.div
                        className="footer-brand"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="logo">SourceSmart AI</div>
                        <p className="footer-tagline">
                            Transform your procurement with AI-powered intelligence and automation.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="social-link"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    <div className="footer-links-grid">
                        {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                            <motion.div
                                key={category}
                                className="footer-column"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            >
                                <h4>{category}</h4>
                                <ul>
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <motion.a
                                                href={link.href}
                                                whileHover={{ x: 4, color: 'var(--text-primary)' }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {link.name}
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="footer-newsletter"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4>Stay Updated</h4>
                        <p className="newsletter-description">
                            Get the latest updates on procurement insights and platform features.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                            <div className="newsletter-input-wrapper">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="newsletter-input"
                                    required
                                />
                                <motion.button
                                    type="submit"
                                    className="newsletter-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={submitted}
                                >
                                    {submitted ? (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            ✓
                                        </motion.span>
                                    ) : (
                                        <ArrowRight size={18} />
                                    )}
                                </motion.button>
                            </div>
                            {submitted && (
                                <motion.p
                                    className="newsletter-success"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Thanks for subscribing!
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>

                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="footer-bottom-content">
                        <p>&copy; 2024 SourceSmart AI. All rights reserved.</p>
                        <div className="footer-badges">
                            <span className="footer-badge">SOC 2 Certified</span>
                            <span className="footer-badge">ISO 27001</span>
                            <span className="footer-badge">GDPR Compliant</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

