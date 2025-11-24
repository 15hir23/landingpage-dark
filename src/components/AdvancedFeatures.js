import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import './AdvancedFeatures.css';

// Custom SVG Icons
const AIClassificationIcon = () => (
    <svg viewBox="0 0 100 100" className="custom-icon">
        <circle cx="50" cy="30" r="15" fill="currentColor" opacity="0.8" />
        <rect x="30" y="50" width="40" height="12" rx="4" fill="currentColor" opacity="0.7" />
        <rect x="30" y="66" width="40" height="8" rx="4" fill="currentColor" opacity="0.6" />
        <rect x="30" y="78" width="30" height="8" rx="4" fill="currentColor" opacity="0.4" />
        <circle cx="70" cy="54" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="70" cy="70" r="4" fill="currentColor" opacity="0.6" />
    </svg>
);

const ApprovalWorkflowIcon = () => (
    <svg viewBox="0 0 100 100" className="custom-icon">
        <rect x="20" y="20" width="60" height="12" rx="6" fill="currentColor" opacity="0.8" />
        <rect x="20" y="38" width="60" height="12" rx="6" fill="currentColor" opacity="0.6" />
        <rect x="20" y="56" width="60" height="12" rx="6" fill="currentColor" opacity="0.4" />
        <circle cx="75" cy="26" r="8" fill="currentColor" />
        <circle cx="75" cy="44" r="8" fill="currentColor" />
        <circle cx="75" cy="62" r="8" fill="currentColor" />
    </svg>
);

const RiskMonitoringIcon = () => (
    <svg viewBox="0 0 100 100" className="custom-icon">
        <path d="M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
    </svg>
);

const SmartNotificationsIcon = () => (
    <svg viewBox="0 0 100 100" className="custom-icon">
        <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.8" />
        <path d="M50 55 L50 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="80" r="3" fill="currentColor" />
        <circle cx="70" cy="30" r="6" fill="currentColor" opacity="0.6" />
    </svg>
);

const QuickActionsIcon = () => (
    <svg viewBox="0 0 100 100" className="custom-icon">
        <rect x="30" y="30" width="40" height="40" rx="8" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="40" r="4" fill="currentColor" />
        <circle cx="60" cy="40" r="4" fill="currentColor" />
        <circle cx="40" cy="60" r="4" fill="currentColor" />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
        <path d="M50 45 L50 55" stroke="currentColor" strokeWidth="2" />
        <path d="M45 50 L55 50" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const OnboardingIcon = () => (
    <svg viewBox="0 0 100 100" className="custom-icon">
        <circle cx="50" cy="30" r="12" fill="currentColor" opacity="0.8" />
        <rect x="30" y="50" width="40" height="35" rx="4" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="62" r="3" fill="currentColor" />
        <circle cx="50" cy="62" r="3" fill="currentColor" />
        <circle cx="60" cy="62" r="3" fill="currentColor" />
        <rect x="35" y="72" width="30" height="8" rx="2" fill="currentColor" opacity="0.8" />
    </svg>
);

const AdvancedFeatures = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [showDemo, setShowDemo] = useState({});
    const [expandedCards, setExpandedCards] = useState({});
    const [manuallyCollapsed, setManuallyCollapsed] = useState({});
    const [isMobile, setIsMobile] = useState(false);
    const autoPlayRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const advancedFeatures = [
        {
            id: 'ai-classification',
            icon: AIClassificationIcon,
            title: 'AI-Powered Spend Classification',
            shortDesc: 'Automatic category labeling',
            description: 'Automatic category labeling with suggested GL codes and confidence scores.',
            benefits: ['One-click correction', '95%+ accuracy', 'Time savings'],
            demo: {
                type: 'classification',
                items: [
                    { text: 'Office Supplies', category: 'Office', confidence: 98 },
                    { text: 'Software License', category: 'Software', confidence: 95 },
                    { text: 'Consulting', category: 'Services', confidence: 92 }
                ]
            }
        },
        {
            id: 'approval-workflows',
            icon: ApprovalWorkflowIcon,
            title: 'Automated Approval Workflows',
            shortDesc: 'Rules-based routing',
            description: 'Rules-based routing with mobile approval and delegation support.',
            benefits: ['Compliance ensured', 'Faster processing', 'Mobile-ready'],
            demo: {
                type: 'workflow',
                steps: ['Submit', 'Auto-Route', 'Manager Review', 'Finance Approval', 'Complete']
            }
        },
        {
            id: 'risk-monitoring',
            icon: RiskMonitoringIcon,
            title: 'Compliance & Risk Monitoring',
            shortDesc: 'Real-time risk scoring',
            description: 'Real-time risk scoring with financial, geopolitical, and environmental factors.',
            benefits: ['Proactive alerts', 'Heat maps', 'Scenario modeling'],
            demo: {
                type: 'risk',
                score: 2.3,
                status: 'Low Risk',
                factors: ['Financial: Excellent', 'Geopolitical: Stable']
            }
        },
        {
            id: 'smart-notifications',
            icon: SmartNotificationsIcon,
            title: 'Smart Notifications',
            shortDesc: 'Intelligent alerts',
            description: 'Intelligent alerts that learn preferences with digest mode and priority levels.',
            benefits: ['Reduced fatigue', 'Action buttons', 'Slack/Teams integration'],
            demo: {
                type: 'notifications',
                count: 5,
                urgent: 1,
                info: 4
            }
        },
        {
            id: 'quick-actions',
            icon: QuickActionsIcon,
            title: 'Quick Actions Everywhere',
            shortDesc: 'Context-aware actions',
            description: 'Context-aware actions: Create RFQ, Export PDF, Find Alternatives with keyboard shortcuts.',
            benefits: ['Faster workflows', 'Less clicks', 'Power user mode'],
            demo: {
                type: 'actions',
                shortcuts: ['⌘K Create RFQ', '⌘E Export PDF', '⌘F Find Alternatives']
            }
        },
        {
            id: 'onboarding',
            icon: OnboardingIcon,
            title: 'Progressive Onboarding',
            shortDesc: 'Interactive tutorials',
            description: 'Interactive tutorials, sample data toggle, and contextual help videos.',
            benefits: ['Faster adoption', 'Self-service', 'Reduced support'],
            demo: {
                type: 'onboarding',
                progress: 75,
                steps: ['Welcome ✓', 'Create RFQ ✓', 'Add Suppliers', 'Review Analytics']
            }
        }
    ];

    // Auto-rotate carousel
    useEffect(() => {
        if (!inView || !isAutoPlaying) return;

        autoPlayRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % advancedFeatures.length);
        }, 4000);

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [inView, isAutoPlaying, advancedFeatures.length]);

    // Show demo after 2 seconds for active card (only if not manually collapsed)
    useEffect(() => {
        if (manuallyCollapsed[activeIndex]) {
            return; // Don't auto-show if user manually collapsed
        }

        const timer = setTimeout(() => {
            setShowDemo(prev => ({ ...prev, [activeIndex]: true }));
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [activeIndex, manuallyCollapsed]);

    // Reset states when card changes
    useEffect(() => {
        setExpandedCards({});
        setShowDemo({});
        setManuallyCollapsed({});
    }, [activeIndex]);

    const nextCard = () => {
        setActiveIndex(prev => (prev + 1) % advancedFeatures.length);
    };

    const prevCard = () => {
        setActiveIndex(prev => (prev - 1 + advancedFeatures.length) % advancedFeatures.length);
    };

    const getCardPosition = (index) => {
        const diff = (index - activeIndex + advancedFeatures.length) % advancedFeatures.length;
        if (diff === 0) return 'center';
        if (diff === 1 || diff === advancedFeatures.length - 1) return 'back';
        return 'hidden';
    };

    const renderDemo = (feature) => {
        if (!feature.demo) return null;

        switch (feature.demo.type) {
            case 'classification':
                return (
                    <div className="demo-classification">
                        {feature.demo.items.map((item, i) => (
                            <motion.div
                                key={i}
                                className="demo-classification-item"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="demo-item-text">{item.text}</div>
                                <div className="demo-item-badge">{item.category}</div>
                                <div className="demo-item-confidence">{item.confidence}%</div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'workflow':
                return (
                    <div className="demo-workflow">
                        {feature.demo.steps.map((step, i) => (
                            <motion.div
                                key={i}
                                className={`demo-workflow-step ${i < 2 ? 'completed' : i === 2 ? 'active' : ''}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <div className="workflow-step-dot" />
                                <span>{step}</span>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'risk':
                return (
                    <div className="demo-risk">
                        <div className="demo-risk-score">{feature.demo.score}</div>
                        <div className="demo-risk-status">{feature.demo.status}</div>
                        <div className="demo-risk-factors">
                            {feature.demo.factors.map((factor, i) => (
                                <div key={i} className="demo-risk-factor">{factor}</div>
                            ))}
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="demo-notifications">
                        <div className="demo-notif-count">{feature.demo.count} New</div>
                        <div className="demo-notif-types">
                            <span className="notif-urgent">{feature.demo.urgent} Urgent</span>
                            <span className="notif-info">{feature.demo.info} Info</span>
                        </div>
                    </div>
                );

            case 'actions':
                return (
                    <div className="demo-actions">
                        {feature.demo.shortcuts.map((shortcut, i) => (
                            <motion.div
                                key={i}
                                className="demo-action-shortcut"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {shortcut}
                            </motion.div>
                        ))}
                    </div>
                );

            case 'onboarding':
                return (
                    <div className="demo-onboarding">
                        <div className="demo-progress-bar">
                            <motion.div
                                className="demo-progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${feature.demo.progress}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <div className="demo-progress-text">{feature.demo.progress}%</div>
                        <div className="demo-steps">
                            {feature.demo.steps.map((step, i) => (
                                <div key={i} className={`demo-step ${step.includes('✓') ? 'completed' : ''}`}>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section id="advanced-features" className="advanced-features" ref={ref}>
            <div className="section-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="section-badge"
                        whileHover={{ scale: 1.05 }}
                    >
                        Enterprise Capabilities
                    </motion.div>
                    <h2 className="text-3xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                            High-Impact Features for Modern Procurement
                        </span>
                    </h2>
                    <p className="section-description">
                        Powerful tools that transform how your team works—no clicks required, just seamless automation
                    </p>
                </motion.div>

                {/* Carousel Controls */}
                <div className="carousel-controls">
                    <button
                        className="carousel-btn"
                        onClick={prevCard}
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="carousel-btn"
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        aria-label={isAutoPlaying ? "Pause" : "Play"}
                    >
                        {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                        className="carousel-btn"
                        onClick={nextCard}
                        aria-label="Next"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Carousel Container */}
                <div className="carousel-container">
                    {advancedFeatures.map((feature, index) => {
                        const position = getCardPosition(index);
                        const Icon = feature.icon;
                        const isActive = index === activeIndex;
                        const shouldShowDemo = showDemo[index] && isActive;
                        const isExpanded = expandedCards[index] || false;

                        if (position === 'hidden') return null;

                        const toggleExpand = (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            
                            const isCurrentlyExpanded = expandedCards[index] || showDemo[index];
                            
                            if (isCurrentlyExpanded) {
                                // User is collapsing - mark as manually collapsed
                                setExpandedCards(prev => {
                                    const newState = { ...prev };
                                    delete newState[index];
                                    return newState;
                                });
                                setShowDemo(prev => {
                                    const newState = { ...prev };
                                    delete newState[index];
                                    return newState;
                                });
                                setManuallyCollapsed(prev => ({ ...prev, [index]: true }));
                            } else {
                                // User is expanding - clear manual collapse flag
                                setExpandedCards(prev => ({ ...prev, [index]: true }));
                                setManuallyCollapsed(prev => {
                                    const newState = { ...prev };
                                    delete newState[index];
                                    return newState;
                                });
                            }
                        };

                        return (
                            <motion.div
                                key={feature.id}
                                className={`feature-card-carousel ${position} ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
                                initial={false}
                                animate={{
                                    scale: position === 'center' ? (isExpanded ? 1.05 : 1) : 0.85,
                                    y: position === 'center' ? 0 : 40,
                                    opacity: position === 'center' ? 1 : 0.6,
                                    zIndex: position === 'center' ? 10 : position === 'back' ? 5 : 1
                                }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                style={{
                                    x: position === 'back' && index > activeIndex ? 200 : 
                                       position === 'back' && index < activeIndex ? -200 : 0
                                }}
                            >
                                <div className="feature-card-content">
                                    {/* Expand/Collapse Button */}
                                    {isActive && (
                                        <button
                                            className="expand-toggle-btn"
                                            onClick={toggleExpand}
                                            aria-label={isExpanded ? "Collapse" : "Expand"}
                                        >
                                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </button>
                                    )}

                                    <div className="feature-icon-wrapper">
                                        <Icon />
                                    </div>

                                    <div className="feature-header">
                                        <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="feature-badge">{feature.shortDesc}</span>
                                    </div>

                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>

                                    <div className="feature-benefits">
                                        {feature.benefits.map((benefit, i) => (
                                            <div key={i} className="benefit-item">
                                                <span>✓</span>
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Demo Section */}
                                    <AnimatePresence mode="wait">
                                        {(shouldShowDemo || isExpanded) && (
                                            <motion.div
                                                key={`demo-${index}-${isExpanded}`}
                                                className="feature-demo"
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginTop: isMobile ? '0.75rem' : '1.5rem' }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            >
                                                {renderDemo(feature)}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AdvancedFeatures;
