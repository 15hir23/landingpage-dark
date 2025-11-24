import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, TrendingUp, CheckCircle2, Clock, Shield, Search, ArrowRight } from 'lucide-react';
import './Platform.css';

const Platform = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    const [activeDemo, setActiveDemo] = useState(0);
    const [typingIndex, setTypingIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const features = [
        'Real-time market data',
        'AI-powered insights',
        'Automated workflows',
        'Enterprise security'
    ];

    const demos = useMemo(() => [
        {
            title: 'Supplier Discovery',
            query: 'findSupplier({ material: "Steel Grade 304", location: "Asia" })',
            result: {
                count: 247,
                suppliers: [
                    { name: 'TechSteel Asia', rating: 4.9, verified: true },
                    { name: 'Global Metals Co', rating: 4.8, verified: true },
                    { name: 'Pacific Steel', rating: 4.7, verified: true }
                ],
                time: '0.8s'
            }
        },
        {
            title: 'Price Analysis',
            query: 'analyzePrice({ commodity: "Copper", timeframe: "30d" })',
            result: {
                count: 156,
                trend: '+5.2%',
                suppliers: [
                    { name: 'Best Price Found', price: '$8,450/ton', savings: '12%' },
                    { name: 'Market Average', price: '$9,200/ton', savings: '0%' }
                ],
                time: '1.2s'
            }
        },
        {
            title: 'Risk Assessment',
            query: 'assessRisk({ supplierId: "TS-2024", factors: ["financial", "geopolitical"] })',
            result: {
                count: 8,
                risk: 'Low',
                score: 2.3,
                suppliers: [
                    { name: 'Financial Health', status: 'Excellent', score: 1.2 },
                    { name: 'Geopolitical', status: 'Stable', score: 1.1 }
                ],
                time: '0.6s'
            }
        }
    ], []);

    useEffect(() => {
        if (!inView) return;
        const interval = setInterval(() => {
            setActiveDemo(prev => (prev + 1) % demos.length);
            setTypingIndex(0);
        }, 5000);
        return () => clearInterval(interval);
    }, [inView, demos.length]);

    useEffect(() => {
        if (!inView) return;
        const query = demos[activeDemo].query;
        if (typingIndex < query.length) {
            const timeout = setTimeout(() => {
                setTypingIndex(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typingIndex, activeDemo, inView, demos]);

    const currentDemo = demos[activeDemo];

    return (
        <section id="platform" className="platform" ref={ref}>
            <div className="section-container">
                <div className="platform-content">
                    <motion.div
                        className="platform-text"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="section-badge"
                            whileHover={{ scale: 1.05 }}
                        >
                            See It In Action
                        </motion.div>
                        <h2 className="text-3xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                Built for modern procurement teams
                            </span>
                        </h2>
                        <p className="section-description">
                            Experience the power of AI-driven procurement with our intuitive platform designed for speed and efficiency.
                        </p>
                        <div className="platform-features">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="platform-feature"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    <div className="platform-feature-icon">✓</div>
                                    <span>{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="platform-visual"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {isMobile ? (
                            <div className="mobile-demo-container">
                                <div className="mobile-demo-header">
                                    <div className="mobile-demo-title">
                                        <Zap size={20} />
                                        <span>Live Demo</span>
                                    </div>
                                    <motion.div
                                        className="mobile-status-dot"
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>

                                <div className="mobile-demo-tabs">
                                    {demos.map((demo, index) => (
                                        <button
                                            key={index}
                                            className={`mobile-tab ${activeDemo === index ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveDemo(index);
                                                setTypingIndex(0);
                                            }}
                                        >
                                            {demo.title}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDemo}
                                        className="mobile-demo-content"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mobile-search-bar">
                                            <Search size={18} />
                                            <div className="mobile-query-text">
                                                <span className="mobile-code-text">
                                                    {currentDemo.query.substring(0, typingIndex)}
                                                    {typingIndex < currentDemo.query.length && (
                                                        <motion.span
                                                            className="mobile-cursor"
                                                            animate={{ opacity: [1, 0, 1] }}
                                                            transition={{ duration: 0.8, repeat: Infinity }}
                                                        >
                                                            |
                                                        </motion.span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mobile-result-header">
                                            <div className="mobile-result-count">
                                                <TrendingUp size={16} />
                                                <span>{currentDemo.result.count} Results</span>
                                            </div>
                                            <div className="mobile-result-time">
                                                <Clock size={14} />
                                                <span>{currentDemo.result.time}</span>
                                            </div>
                                        </div>

                                        <div className="mobile-result-cards">
                                            {currentDemo.result.suppliers.map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="mobile-result-card"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                >
                                                    <div className="mobile-card-header">
                                                        <div className="mobile-card-icon">
                                                            <CheckCircle2 size={18} />
                                                        </div>
                                                        <div className="mobile-card-title">{item.name}</div>
                                                        <ArrowRight size={16} className="mobile-card-arrow" />
                                                    </div>
                                                    <div className="mobile-card-body">
                                                        {item.rating && (
                                                            <div className="mobile-card-rating">
                                                                ⭐ {item.rating}
                                                            </div>
                                                        )}
                                                        {item.price && (
                                                            <div className="mobile-card-price">{item.price}</div>
                                                        )}
                                                        {item.status && (
                                                            <div className="mobile-card-status">{item.status}</div>
                                                        )}
                                                        {item.savings && (
                                                            <div className="mobile-card-savings">Save {item.savings}</div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {currentDemo.result.trend && (
                                            <div className="mobile-trend-badge">
                                                <TrendingUp size={16} />
                                                <span>Trend: {currentDemo.result.trend}</span>
                                            </div>
                                        )}

                                        {currentDemo.result.risk && (
                                            <div className="mobile-risk-badge">
                                                <Shield size={16} />
                                                <div className="mobile-risk-content">
                                                    <span>Risk: <strong>{currentDemo.result.risk}</strong></span>
                                                    <span className="mobile-risk-score">{currentDemo.result.score}/10</span>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="api-demo-container">
                                <div className="api-demo-header">
                                    <div className="api-demo-title">
                                        <Zap size={18} />
                                        <span>Live API Demo</span>
                                    </div>
                                    <div className="api-demo-status">
                                        <motion.div
                                            className="status-dot"
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <span>Live</span>
                                    </div>
                                </div>

                                <div className="api-demo-tabs">
                                    {demos.map((demo, index) => (
                                        <button
                                            key={index}
                                            className={`api-tab ${activeDemo === index ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveDemo(index);
                                                setTypingIndex(0);
                                            }}
                                        >
                                            {demo.title}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDemo}
                                        className="api-demo-content"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="api-query">
                                            <div className="query-label">
                                                <span>Query</span>
                                                <Clock size={14} />
                                            </div>
                                            <div className="query-code">
                                                <span className="code-prompt">$</span>
                                                <span className="code-text">
                                                    {currentDemo.query.substring(0, typingIndex)}
                                                    {typingIndex < currentDemo.query.length && (
                                                        <motion.span
                                                            className="cursor"
                                                            animate={{ opacity: [1, 0, 1] }}
                                                            transition={{ duration: 0.8, repeat: Infinity }}
                                                        >
                                                            |
                                                        </motion.span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="api-result">
                                            <div className="result-header">
                                                <div className="result-metric">
                                                    <TrendingUp size={16} />
                                                    <span>{currentDemo.result.count} Results</span>
                                                </div>
                                                <div className="result-time">
                                                    <Clock size={14} />
                                                    <span>{currentDemo.result.time}</span>
                                                </div>
                                            </div>

                                            <div className="result-items">
                                                {currentDemo.result.suppliers.map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="result-item"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 + index * 0.1 }}
                                                    >
                                                        <div className="result-item-icon">
                                                            <CheckCircle2 size={16} />
                                                        </div>
                                                        <div className="result-item-content">
                                                            <div className="result-item-name">{item.name}</div>
                                                            {item.rating && (
                                                                <div className="result-item-rating">
                                                                    ⭐ {item.rating}
                                                                </div>
                                                            )}
                                                            {item.price && (
                                                                <div className="result-item-price">{item.price}</div>
                                                            )}
                                                            {item.status && (
                                                                <div className="result-item-status">{item.status}</div>
                                                            )}
                                                            {item.savings && (
                                                                <div className="result-item-savings">Save {item.savings}</div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {currentDemo.result.trend && (
                                                <div className="result-trend">
                                                    <TrendingUp size={16} />
                                                    <span>Trend: {currentDemo.result.trend}</span>
                                                </div>
                                            )}

                                            {currentDemo.result.risk && (
                                                <div className="result-risk">
                                                    <Shield size={16} />
                                                    <span>Risk Level: <strong>{currentDemo.result.risk}</strong></span>
                                                    <span className="risk-score">Score: {currentDemo.result.score}/10</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Platform;

