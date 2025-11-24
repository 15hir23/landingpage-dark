import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GradientOrbs from './GradientOrbs';
import DashboardPreview from './DashboardPreview';
import FloatingCards from './FloatingCards';
import StatsCounter from './StatsCounter';
import './Hero.css';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [copyIndex, setCopyIndex] = useState(0);
    const [stageReady, setStageReady] = useState(false);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const heroStatements = useMemo(() => [
        'Transform supply chain operations with real-time AI-Powered Procurement Intelligence and automated procurement workflows',
        'Put AI copilots inside every sourcing workflow to benchmark pricing, surface risks, and draft RFQs in seconds.',
        'See commodity shifts before they spike and auto-route mitigation playbooks across finance, sourcing, and operations.',
        'Give procurement teams a command center that negotiates, alerts, and executes in real time.'
    ], []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 100,
                y: (e.clientY / window.innerHeight - 0.5) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (!inView) return;
        const timer = setTimeout(() => setStageReady(true), 1100);
        return () => clearTimeout(timer);
    }, [inView]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCopyIndex(prev => (prev + 1) % heroStatements.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroStatements.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

    const titleLineVariants = {
        hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
        visible: custom => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                delay: custom * 0.35,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    const heroBodyVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const heroVisualVariants = {
        hidden: { opacity: 0, x: 110, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const heroHeadingVariants = {
        rest: { y: 0, opacity: 1 },
        lifted: {
            y: -26,
            opacity: 1,
            transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] }
        }
    };

    return (
        <section className="hero" ref={ref}>
            <GradientOrbs mousePosition={mousePosition} />
            
            <motion.div
                className="hero-container"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.div className="hero-content" variants={containerVariants}>
                    <motion.div
                        className="hero-heading-block"
                        initial="rest"
                        animate={inView ? (stageReady ? 'lifted' : 'rest') : 'rest'}
                        variants={heroHeadingVariants}
                        layout
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight"
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={containerVariants}
                            layout
                        >
                            <motion.span
                                className="hero-title-line bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm"
                                variants={titleLineVariants}
                                custom={0}
                            >
                                Source Smarter.
                            </motion.span>
                            <motion.span
                                className="hero-title-line gradient-flow"
                                variants={titleLineVariants}
                                custom={1}
                            >
                                Procure Faster.
                            </motion.span>
                        </motion.h1>

                        <motion.div className="hero-description-wrapper" layout>
                            <AnimatePresence mode="wait">
                                {stageReady && (
                                    <motion.p
                                        key={heroStatements[copyIndex]}
                                        className="hero-description"
                                        initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -10, filter: 'blur(12px)' }}
                                        transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
                                    >
                                        {heroStatements[copyIndex]}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    <AnimatePresence>
                        {stageReady && (
                            <motion.div
                                className="hero-body-stack"
                                variants={heroBodyVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <motion.div
                                    className="hero-actions flex gap-4 mb-16 flex-wrap"
                                    variants={heroBodyVariants}
                                >
                                    <motion.button
                                        className="btn-primary"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            const cta = document.querySelector('.cta');
                                            if (cta) cta.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            Start Free Trial
                                            <motion.svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <path
                                                    d="M7.5 15L12.5 10L7.5 5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </motion.svg>
                                        </span>
                                    </motion.button>
                                    <motion.button
                                        className="btn-secondary"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M8 7L12 10L8 13"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            Watch Demo
                                        </span>
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    className="hero-stats"
                                    variants={heroBodyVariants}
                                >
                                    <StatsCounter target={500000} label="Global Suppliers" suffix="K+" />
                                    <StatsCounter target={2.5} label="$B+ Procurement Volume" suffix="B+" />
                                    <StatsCounter target={98} label="% Client Satisfaction" suffix="%" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    variants={heroVisualVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                        x: useTransform(useSpring(mousePosition.x), [-50, 50], [-20, 20]),
                        y: useTransform(useSpring(mousePosition.y), [-50, 50], [-20, 20])
                    }}
                >
                    <motion.div
                        className="hero-dashboard-wrapper"
                        initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: -10 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                    >
                        <DashboardPreview />
                    </motion.div>
                    <FloatingCards />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

