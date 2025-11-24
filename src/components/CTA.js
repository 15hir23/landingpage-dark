import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CTA.css';

const CTA = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            setError('Please enter your email');
            return;
        }
        
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email');
            return;
        }
        
        setSubmitted(true);
        setError('');
        setTimeout(() => {
            setSubmitted(false);
            setEmail('');
        }, 3000);
    };

    return (
        <section className="cta" ref={ref}>
            <div className="cta-background">
                <motion.div
                    className="cta-gradient"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <div className="section-container">
                <motion.div
                    className="cta-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                            Ready to transform your procurement?
                        </span>
                    </h2>
                    <p className="cta-description">
                        Join 500+ companies using SourceSmart to streamline operations and cut costs.
                    </p>
                    <form className="cta-form flex gap-4 max-w-lg mx-auto mb-4" onSubmit={handleSubmit}>
                        <motion.input
                            type="email"
                            placeholder="Enter your work email"
                            className={`cta-input flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border ${error ? 'border-red-500' : 'border-white/20'} rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)' }}
                        />
                        <motion.button
                            type="submit"
                            className="cta-button relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden group shadow-xl shadow-blue-500/50 whitespace-nowrap"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            animate={submitted ? {
                                background: 'linear-gradient(135deg, #10b981, #059669)'
                            } : {}}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {submitted ? (
                                    <>
                                        <motion.svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1, rotate: 360 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </motion.svg>
                                        Success!
                                    </>
                                ) : (
                                    'Get Started Free'
                                )}
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                            />
                        </motion.button>
                    </form>
                    {error && (
                        <motion.p
                            className="cta-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.p>
                    )}
                    <div className="cta-trust">
                        <span>Trusted by</span>
                        <div className="trust-badges">
                            {['Fortune 500', 'ISO Certified', 'SOC 2'].map((badge, index) => (
                                <motion.span
                                    key={index}
                                    className="trust-badge"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: index * 0.1 + 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {badge}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;

