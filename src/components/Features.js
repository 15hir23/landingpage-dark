import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Features.css';
import './mobile.css';

const Features = () => {
    const sectionRef = useRef(null);
    const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const setSectionRefs = useCallback((node) => {
        sectionRef.current = node;
        inViewRef(node);
    }, [inViewRef]);
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedQuery, setSelectedQuery] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileFeatureNav, setShowMobileFeatureNav] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [showFeatureList, setShowFeatureList] = useState(false);
    const [isLaptopDocked, setIsLaptopDocked] = useState(false);
    const demoContentRef = useRef(null);
    const autoRotateIndexRef = useRef(0);
    const isUserScrollingRef = useRef(false);
    const scrollIntervalRef = useRef(null);
    const autoRotateIntervalRef = useRef(null);
    const userInteractionTimeoutRef = useRef(null);
    const laptopIntroTimeoutRef = useRef(null);
    const featureListTimeoutRef = useRef(null);

    useEffect(() => {
        if (isMobile) {
            setIsLaptopDocked(true);
            setShowFeatureList(true);
            if (laptopIntroTimeoutRef.current) {
                clearTimeout(laptopIntroTimeoutRef.current);
                laptopIntroTimeoutRef.current = null;
            }
            if (featureListTimeoutRef.current) {
                clearTimeout(featureListTimeoutRef.current);
                featureListTimeoutRef.current = null;
            }
            return;
        }

        if (!inView) {
            setIsLaptopDocked(false);
            setShowFeatureList(false);
            if (laptopIntroTimeoutRef.current) {
                clearTimeout(laptopIntroTimeoutRef.current);
                laptopIntroTimeoutRef.current = null;
            }
            if (featureListTimeoutRef.current) {
                clearTimeout(featureListTimeoutRef.current);
                featureListTimeoutRef.current = null;
            }
            return;
        }

        setIsLaptopDocked(false);
        setShowFeatureList(false);

        if (laptopIntroTimeoutRef.current) {
            clearTimeout(laptopIntroTimeoutRef.current);
        }
        if (featureListTimeoutRef.current) {
            clearTimeout(featureListTimeoutRef.current);
        }

        laptopIntroTimeoutRef.current = setTimeout(() => {
            setIsLaptopDocked(true);
            laptopIntroTimeoutRef.current = null;

            featureListTimeoutRef.current = setTimeout(() => {
                setShowFeatureList(true);
                featureListTimeoutRef.current = null;
            }, 300);
        }, 2000);

        return () => {
            if (laptopIntroTimeoutRef.current) {
                clearTimeout(laptopIntroTimeoutRef.current);
                laptopIntroTimeoutRef.current = null;
            }
            if (featureListTimeoutRef.current) {
                clearTimeout(featureListTimeoutRef.current);
                featureListTimeoutRef.current = null;
            }
        };
    }, [inView, isMobile]);

    const features = useMemo(() => [
        {
            icon: '📊',
            title: 'Interactive Data Visualization',
            description: 'Dynamic, zoomable charts with hover insights & multi-commodity comparison.',
            feature: 'market',
            demo: {
                type: 'chart',
                data: [
                    { name: 'Steel', price: 857.88, change: -0.3, trend: 'down' },
                    { name: 'Copper', price: 427.58, change: 1.7, trend: 'up' },
                    { name: 'Aluminum', price: 295.05, change: 0.9, trend: 'up' },
                    { name: 'Plastic', price: 142.30, change: 2.1, trend: 'up' }
                ]
            }
        },
        {
            icon: '🔍',
            title: 'AI-Powered Smart Search',
            description: 'Natural language search with price benchmarking & negotiation insights.',
            feature: 'search',
            demo: {
                type: 'search',
                sampleQueries: [
                    { 
                        id: 'suppliers', 
                        text: 'Show me all steel suppliers in the Midwest with good delivery ratings',
                        results: [
                            { name: 'Midwest Steel Co.', match: 98, location: 'Chicago, IL', rating: 4.8 },
                            { name: 'Great Lakes Metals', match: 95, location: 'Detroit, MI', rating: 4.7 },
                            { name: 'Heartland Steel', match: 92, location: 'Kansas City, MO', rating: 4.6 }
                        ],
                        negotiation: [
                            { text: 'Based on similar deals, you can push for 5-8% lower', confidence: 87 },
                            { text: 'Market rate suggests $850/ton is competitive', confidence: 92 }
                        ]
                    },
                    {
                        id: 'pricing',
                        text: 'What is the current market price for copper per ton?',
                        results: [
                            { name: 'Copper Market Data', match: 100, location: 'LME Futures', rating: 5.0, price: '$9,450/ton' },
                            { name: 'Spot Price Analysis', match: 95, location: 'COMEX', rating: 4.9, price: '$9,425/ton' },
                            { name: 'Regional Pricing', match: 92, location: 'Midwest', rating: 4.7, price: '$9,500/ton' }
                        ],
                        negotiation: [
                            { text: 'Current price is 3% above 30-day average', confidence: 94 },
                            { text: 'Consider waiting 2-3 weeks for better pricing', confidence: 78 }
                        ]
                    },
                    {
                        id: 'alternatives',
                        text: 'Find alternative suppliers for aluminum with ISO certification',
                        results: [
                            { name: 'Aluminum Solutions Inc.', match: 98, location: 'Pittsburgh, PA', rating: 4.9 },
                            { name: 'Certified Metals Co.', match: 96, location: 'Cleveland, OH', rating: 4.8 },
                            { name: 'Premium Aluminum Ltd.', match: 94, location: 'Milwaukee, WI', rating: 4.7 }
                        ],
                        negotiation: [
                            { text: 'These suppliers offer 12-15% cost savings vs current', confidence: 91 },
                            { text: 'Lead times are 2 weeks shorter on average', confidence: 88 }
                        ]
                    }
                ],
                query: 'Show me all steel suppliers in the Midwest with good delivery ratings',
                results: [
                    { name: 'Midwest Steel Co.', match: 98, location: 'Chicago, IL', rating: 4.8 },
                    { name: 'Great Lakes Metals', match: 95, location: 'Detroit, MI', rating: 4.7 },
                    { name: 'Heartland Steel', match: 92, location: 'Kansas City, MO', rating: 4.6 }
                ],
                negotiation: [
                    { text: 'Based on similar deals, you can push for 5-8% lower', confidence: 87 },
                    { text: 'Market rate suggests $850/ton is competitive', confidence: 92 }
                ]
            }
        },
        {
            icon: '🌐',
            title: 'Supplier Discovery',
            description: 'Conversational UI with real-time map visualization, smart suggestions & scorecards.',
            feature: 'supplier',
            demo: {
                type: 'map',
                suppliers: [
                    { name: 'TechSteel Industries', location: 'Taiwan', match: 98 },
                    { name: 'Global Steel Co.', location: 'South Korea', match: 95 },
                    { name: 'Asia Metals Ltd', location: 'China', match: 92 },
                    { name: 'European Metals', location: 'Germany', match: 90 }
                ],
                scorecards: {
                    'TechSteel Industries': {
                        scores: [
                            { label: 'On-Time Delivery', value: 96, color: 'green' },
                            { label: 'Quality Score', value: 94, color: 'green' },
                            { label: 'Price Competitiveness', value: 88, color: 'yellow' },
                            { label: 'Responsiveness', value: 92, color: 'green' }
                        ]
                    },
                    'Global Steel Co.': {
                        scores: [
                            { label: 'On-Time Delivery', value: 93, color: 'green' },
                            { label: 'Quality Score', value: 91, color: 'green' },
                            { label: 'Price Competitiveness', value: 85, color: 'yellow' },
                            { label: 'Responsiveness', value: 89, color: 'green' }
                        ]
                    },
                    'Asia Metals Ltd': {
                        scores: [
                            { label: 'On-Time Delivery', value: 90, color: 'green' },
                            { label: 'Quality Score', value: 88, color: 'yellow' },
                            { label: 'Price Competitiveness', value: 92, color: 'green' },
                            { label: 'Responsiveness', value: 87, color: 'green' }
                        ]
                    },
                    'European Metals': {
                        scores: [
                            { label: 'On-Time Delivery', value: 95, color: 'green' },
                            { label: 'Quality Score', value: 96, color: 'green' },
                            { label: 'Price Competitiveness', value: 82, color: 'yellow' },
                            { label: 'Responsiveness', value: 94, color: 'green' }
                        ]
                    }
                }
            }
        },
        {
            icon: '📝',
            title: 'Smart RFQ Management',
            description: 'Intelligent templates, workflow visualization & AI-recommended suppliers.',
            feature: 'rfq',
            demo: {
                type: 'workflow',
                steps: ['Draft', 'AI Review', 'Send to Suppliers', 'Track Responses', 'Evaluation', 'Awarded'],
                templates: {
                    categories: [
                        { id: 'steel', name: 'Steel & Metals', icon: '⚙️' },
                        { id: 'electronics', name: 'Electronics', icon: '🔌' },
                        { id: 'raw-materials', name: 'Raw Materials', icon: '📦' },
                        { id: 'services', name: 'Professional Services', icon: '💼' }
                    ],
                    samples: {
                        'steel': {
                            title: 'Steel & Metals RFQ Template',
                            description: 'Comprehensive template for steel procurement',
                            fields: [
                                { label: 'Material Grade', value: 'ASTM A36', required: true },
                                { label: 'Quantity', value: '500 tons', required: true },
                                { label: 'Delivery Location', value: 'Chicago, IL', required: true },
                                { label: 'Delivery Date', value: '2025-04-15', required: true },
                                { label: 'Quality Certification', value: 'ISO 9001', required: false },
                                { label: 'Payment Terms', value: 'Net 30', required: false }
                            ],
                            recommendedSuppliers: ['Midwest Steel Co.', 'Great Lakes Metals', 'Heartland Steel']
                        },
                        'electronics': {
                            title: 'Electronics RFQ Template',
                            description: 'Standard template for electronic components',
                            fields: [
                                { label: 'Component Type', value: 'Microcontrollers', required: true },
                                { label: 'Specifications', value: '32-bit ARM Cortex-M4', required: true },
                                { label: 'Quantity', value: '10,000 units', required: true },
                                { label: 'Operating Temperature', value: '-40°C to +85°C', required: true },
                                { label: 'Lead Time', value: '8-12 weeks', required: true },
                                { label: 'ROHS Compliance', value: 'Required', required: false }
                            ],
                            recommendedSuppliers: ['TechComponents Inc.', 'Global Electronics Ltd.', 'Semiconductor Solutions']
                        },
                        'raw-materials': {
                            title: 'Raw Materials RFQ Template',
                            description: 'Template for bulk raw materials procurement',
                            fields: [
                                { label: 'Material Type', value: 'Industrial Chemicals', required: true },
                                { label: 'Purity Level', value: '99.5%', required: true },
                                { label: 'Batch Size', value: '20,000 kg', required: true },
                                { label: 'Storage Requirements', value: 'Climate-controlled', required: true },
                                { label: 'Safety Compliance', value: 'MSDS Required', required: true },
                                { label: 'Sampling Protocol', value: 'Before shipment', required: false }
                            ],
                            recommendedSuppliers: ['ChemSupply Global', 'Industrial Materials Co.', 'Bulk Chemical Solutions']
                        },
                        'services': {
                            title: 'Professional Services RFQ Template',
                            description: 'Template for service-based procurement',
                            fields: [
                                { label: 'Service Type', value: 'Consulting Services', required: true },
                                { label: 'Scope of Work', value: 'Digital Transformation', required: true },
                                { label: 'Project Duration', value: '6 months', required: true },
                                { label: 'Team Size', value: '5-8 consultants', required: true },
                                { label: 'Certifications Required', value: 'PMP, Agile', required: false },
                                { label: 'Budget Range', value: '$200K - $350K', required: true }
                            ],
                            recommendedSuppliers: ['Strategic Consulting Group', 'Tech Advisors Inc.', 'Business Solutions Co.']
                        }
                    }
                }
            }
        },
        {
            icon: '⚡',
            title: 'Contextual AI Assistant',
            description: 'Action-based responses with Create RFQ, Add to Watchlist, Export buttons.',
            feature: 'ai',
            demo: {
                type: 'chat',
                messages: [
                    { role: 'user', text: 'Find steel suppliers with ISO 9001' },
                    { role: 'ai', text: 'Found 247 certified suppliers. Top 3 matches...', actions: ['Create RFQ', 'Add to Watchlist', 'Export'] }
                ]
            }
        },
        {
            icon: '📈',
            title: 'Market Trends Analysis',
            description: 'Correlation analysis showing commodity relationships & supplier impact.',
            feature: 'trends',
            demo: {
                type: 'correlation',
                pairs: [
                    { from: 'Oil', to: 'Plastic', correlation: 0.87, lag: '2 weeks' },
                    { from: 'Steel', to: 'Construction', correlation: 0.92, lag: '1 month' }
                ]
            }
        },
        {
            icon: '📊',
            title: 'Spend Analytics Dashboard',
            description: 'Spend by category, supplier, department with budget vs actual tracking.',
            feature: 'analytics',
            demo: {
                type: 'dashboard',
                metrics: [
                    { label: 'Total Spend', value: '$2.4M', trend: '+12%' },
                    { label: 'Savings', value: '18%', trend: '+5%' },
                    { label: 'Orders', value: '847', trend: '+8%' },
                    { label: 'Budget Used', value: '73%', trend: 'On Track' }
                ]
            }
        },
        {
            icon: '🛡️',
            title: 'Risk Intelligence',
            description: 'Multi-dimensional risk scoring with predictive alerts & negotiation insights.',
            feature: 'risk',
            demo: {
                type: 'risk',
                risks: [
                    { type: 'High', title: 'Port Disruption', location: 'Shanghai', score: 8.5 },
                    { type: 'Medium', title: 'Currency Fluctuation', location: 'EUR/USD', score: 6.2 },
                    { type: 'Low', title: 'Weather Alert', location: 'Gulf Coast', score: 3.1 }
                ],
                alerts: [
                    { type: 'Price Prediction', text: 'Copper expected to rise 12% next month', priority: 'High' },
                    { type: 'Performance', text: 'On-time delivery dropped to 78%', priority: 'Medium' },
                    { type: 'Opportunity', text: 'Alternative supplier offering 15% savings', priority: 'Low' }
                ],
                negotiation: [
                    { text: 'Price benchmarking suggests 5-8% negotiation room', confidence: 87 },
                    { text: 'TCO analysis recommends alternative supplier', confidence: 92 }
                ]
            }
        }
    ], []);

    // Calculate pagination after features array is defined
    const FEATURES_PER_PAGE = 4;
    const totalPages = Math.ceil(features.length / FEATURES_PER_PAGE);
    const visibleFeatures = features.slice(
        currentPage * FEATURES_PER_PAGE,
        (currentPage + 1) * FEATURES_PER_PAGE
    );

    // Auto-rotate through features
    useEffect(() => {
        if (!inView || !isAutoRotating || (!isMobile && !showFeatureList)) {
            // Clear interval if auto-rotation is disabled
            if (autoRotateIntervalRef.current) {
                clearInterval(autoRotateIntervalRef.current);
                autoRotateIntervalRef.current = null;
            }
            return;
        }

        // Start auto-rotation after 1 second
        const startDelay = setTimeout(() => {
            // Set initial feature
            setSelectedFeature(0);
            setHoveredFeature(0);
            autoRotateIndexRef.current = 0;
            
            // Calculate which page contains the first feature
            const initialPage = Math.floor(0 / FEATURES_PER_PAGE);
            setCurrentPage(initialPage);

            // Auto-rotate through all features
            autoRotateIntervalRef.current = setInterval(() => {
                const nextIndex = (autoRotateIndexRef.current + 1) % features.length;
                autoRotateIndexRef.current = nextIndex;

                // Update selected feature
                setSelectedFeature(nextIndex);
                setHoveredFeature(nextIndex);

                // Calculate which page contains this feature
                const pageForFeature = Math.floor(nextIndex / FEATURES_PER_PAGE);
                setCurrentPage(pageForFeature);
            }, 4500); // 4.5 seconds per feature (enough time to see demo)
        }, 1000); // Start after 1 second

        return () => {
            clearTimeout(startDelay);
            if (autoRotateIntervalRef.current) {
                clearInterval(autoRotateIntervalRef.current);
                autoRotateIntervalRef.current = null;
            }
            if (userInteractionTimeoutRef.current) {
                clearTimeout(userInteractionTimeoutRef.current);
                userInteractionTimeoutRef.current = null;
            }
        };
    }, [inView, isAutoRotating, features.length, showFeatureList, isMobile]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (autoRotateIntervalRef.current) {
                clearInterval(autoRotateIntervalRef.current);
            }
            if (userInteractionTimeoutRef.current) {
                clearTimeout(userInteractionTimeoutRef.current);
            }
        };
    }, []);

    // Auto-scroll functionality
    useEffect(() => {
        const currentFeature = selectedFeature !== null ? selectedFeature : hoveredFeature;
        
        // Clear any existing scroll interval first
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
        
        if (currentFeature === null) {
            return;
        }

        let cleanupFunctions = [];
        let retryCount = 0;
        const maxRetries = 5;

        // Try to find the scrollable element with retries
        const findAndStartScroll = () => {
            // Try to find the scrollable element
            const findScrollableElement = () => {
                // First try the ref directly
                if (demoContentRef.current) {
                    const element = demoContentRef.current;
                    // Check if it's scrollable
                    if (element.scrollHeight > element.clientHeight) {
                        return element;
                    }
                }
                // Fallback: try to find by class (might be in a wrapper)
                const byClass = document.querySelector('.demo-content');
                if (byClass) {
                    // Check if it's actually scrollable
                    if (byClass.scrollHeight > byClass.clientHeight) {
                        return byClass;
                    }
                }
                return null;
            };

            const contentElement = findScrollableElement();
            
            if (!contentElement) {
                retryCount++;
                if (retryCount < maxRetries) {
                    // Retry after delay (increasing delay each time)
                    setTimeout(findAndStartScroll, 100 * retryCount);
                }
                return;
            }

            // Reset retry count on success
            retryCount = 0;

            const maxScroll = contentElement.scrollHeight - contentElement.clientHeight;
            
            // If content isn't scrollable yet (e.g. animations still loading), retry after a short delay
            if (maxScroll <= 0) {
                const retryTimeout = setTimeout(findAndStartScroll, 600);
                cleanupFunctions.push(() => clearTimeout(retryTimeout));
                return;
            }

            // Reset scroll position when feature changes
            contentElement.scrollTop = 0;
            isUserScrollingRef.current = false;

            // Variables for scroll tracking
            let lastAutoScrollPosition = 0;
            let resetTimeout = null;

            // Handle manual scroll detection
            const handleScroll = () => {
                const currentScroll = contentElement.scrollTop;
                const scrollDiff = Math.abs(currentScroll - lastAutoScrollPosition);
                
                // If scroll difference is large, it's likely user scrolling
                // Small differences are from auto-scroll
                if (scrollDiff > 10) {
                    isUserScrollingRef.current = true;
                    
                    // Clear auto-scroll when user scrolls
                    if (scrollIntervalRef.current) {
                        clearInterval(scrollIntervalRef.current);
                        scrollIntervalRef.current = null;
                    }

                    // Clear existing reset timeout
                    if (resetTimeout) {
                        clearTimeout(resetTimeout);
                    }

                    // Reset user scrolling flag after a delay
                    resetTimeout = setTimeout(() => {
                        isUserScrollingRef.current = false;
                        lastAutoScrollPosition = contentElement.scrollTop;
                        // Restart auto-scroll after user stops
                        if (contentElement && contentElement.scrollHeight > contentElement.clientHeight) {
                            findAndStartScroll();
                        }
                    }, 2000);
                } else {
                    // Update last position for auto-scroll tracking
                    lastAutoScrollPosition = currentScroll;
                }
            };

            const handleWheel = () => {
                // User is manually scrolling with wheel
                isUserScrollingRef.current = true;
                if (scrollIntervalRef.current) {
                    clearInterval(scrollIntervalRef.current);
                    scrollIntervalRef.current = null;
                }
                
                // Clear existing reset timeout
                if (resetTimeout) {
                    clearTimeout(resetTimeout);
                }
                
                // Reset after delay
                resetTimeout = setTimeout(() => {
                    isUserScrollingRef.current = false;
                    lastAutoScrollPosition = contentElement.scrollTop;
                    // Restart auto-scroll after user stops
                    if (contentElement && contentElement.scrollHeight > contentElement.clientHeight) {
                        findAndStartScroll();
                    }
                }, 2000);
            };

            contentElement.addEventListener('scroll', handleScroll, { passive: true });
            contentElement.addEventListener('wheel', handleWheel, { passive: true });

            // Store cleanup for event listeners
            cleanupFunctions.push(() => {
                if (resetTimeout) {
                    clearTimeout(resetTimeout);
                }
                if (contentElement) {
                    contentElement.removeEventListener('scroll', handleScroll);
                    contentElement.removeEventListener('wheel', handleWheel);
                }
            });

            // Start auto-scrolling after animation completes (wait for AnimatePresence)
            const startDelay = setTimeout(() => {
                // Re-check if element still exists and has scrollable content
                if (!contentElement || contentElement.scrollHeight <= contentElement.clientHeight) {
                    return;
                }

                // Reset scroll to top
                contentElement.scrollTop = 0;
                let currentScroll = 0;
                const scrollSpeed = 3; // Much faster: pixels per frame
                let targetScroll = contentElement.scrollHeight - contentElement.clientHeight;
                let isScrollingDown = true;
                let pauseAtEnd = 0;

                scrollIntervalRef.current = setInterval(() => {
                    if (isUserScrollingRef.current) {
                        // User is manually scrolling, pause auto-scroll
                        return;
                    }

                    if (!contentElement) {
                        if (scrollIntervalRef.current) {
                            clearInterval(scrollIntervalRef.current);
                            scrollIntervalRef.current = null;
                        }
                        return;
                    }

                    // Re-check scrollable height in case content changed
                    const currentMaxScroll = contentElement.scrollHeight - contentElement.clientHeight;
                    if (currentMaxScroll <= 0) {
                        return;
                    }

                    // Update target scroll if it changed
                    targetScroll = currentMaxScroll;

                    // Handle pause at ends (shorter pause)
                    if (pauseAtEnd > 0) {
                        pauseAtEnd--;
                        return;
                    }

                    if (isScrollingDown) {
                        if (currentScroll < targetScroll) {
                            currentScroll += scrollSpeed;
                            contentElement.scrollTop = currentScroll;
                            lastAutoScrollPosition = currentScroll;
                        } else {
                            // Reached bottom, short pause then scroll back up
                            pauseAtEnd = 15; // ~0.25 second pause (15 frames at 60fps)
                            isScrollingDown = false;
                        }
                    } else {
                        if (currentScroll > 0) {
                            currentScroll -= scrollSpeed * 2.5; // Much faster scroll back
                            contentElement.scrollTop = Math.max(0, currentScroll);
                            lastAutoScrollPosition = currentScroll;
                        } else {
                            // Reached top, short pause then scroll down again
                            pauseAtEnd = 15; // ~0.25 second pause
                            isScrollingDown = true;
                            currentScroll = 0;
                            lastAutoScrollPosition = 0;
                        }
                    }
                }, 16); // ~60fps

                // Store cleanup for interval
                cleanupFunctions.push(() => {
                    clearTimeout(startDelay);
                });
            }, 500); // Wait 500ms for AnimatePresence animation to complete
        };

        // Start after initial delay to allow DOM to update
        const initialDelay = setTimeout(() => {
            findAndStartScroll();
        }, 300); // Wait for AnimatePresence exit animation

        return () => {
            clearTimeout(initialDelay);
            // Clear all cleanup functions
            cleanupFunctions.forEach(cleanup => cleanup());
            cleanupFunctions = [];
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
                scrollIntervalRef.current = null;
            }
        };
    }, [selectedFeature, hoveredFeature]);

    const getDemoMeta = (featureData) => {
        if (!featureData || !featureData.demo) {
            return { badge: 'Live workspace', stats: [], actions: [], sidebar: null };
        }

        const { demo } = featureData;
        const defaultActions = [
            { label: 'Share snapshot', variant: 'ghost' },
            { label: 'Open in platform', variant: 'primary' }
        ];

        const baseSidebar = (
            <div className="demo-sidebar-card">
                <h4>AI Copilot</h4>
                <p>Ask SourceSmart to summarize or trigger an automation.</p>
                <button className="demo-sidebar-btn">Ask SourceSmart</button>
            </div>
        );

        switch (demo.type) {
            case 'chart': {
                const assets = demo.data || [];
                const topMover = assets.length
                    ? assets.reduce((current, asset) => {
                        if (!current) return asset;
                        return Math.abs(asset.change ?? 0) > Math.abs(current.change ?? 0) ? asset : current;
                    }, assets[0])
                    : null;

                return {
                    badge: 'Market pulse',
                    stats: [
                        { label: 'Tracked assets', value: assets.length || '—' },
                        { 
                            label: 'Top mover', 
                            value: topMover ? `${topMover.name} ${topMover.change > 0 ? '+' : ''}${topMover.change}%` : '—' 
                        },
                        { label: 'Latency', value: '2.3s' }
                    ],
                    actions: defaultActions,
                    sidebar: assets.length ? (
                        <div className="demo-sidebar-card">
                            <h4>AI trade notes</h4>
                            <ul className="demo-sidebar-list">
                                {assets.slice(0, 3).map((asset) => (
                                    <li key={asset.name}>
                                        <div>
                                            <span className="sidebar-label">{asset.name}</span>
                                            <span className="sidebar-subtext">
                                                {asset.trend === 'up' ? 'Momentum building' : 'Watch pullback'}
                                            </span>
                                        </div>
                                        <span className={`sidebar-value ${asset.trend}`}>
                                            {asset.change > 0 ? '+' : ''}
                                            {asset.change}%
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button className="demo-sidebar-btn">Share snapshot</button>
                        </div>
                    ) : baseSidebar
                };
            }
            case 'map': {
                const suppliers = demo.suppliers || [];
                const avgMatch = suppliers.length
                    ? Math.round(
                        suppliers.reduce((sum, supplier) => sum + (supplier.match || 0), 0) / suppliers.length
                    )
                    : null;
                const scorecardsCount = demo.scorecards ? Object.keys(demo.scorecards).length : 0;
                const bestSupplier = suppliers[0];

                return {
                    badge: 'Supplier discovery',
                    stats: [
                        { label: 'Matches', value: suppliers.length || '—' },
                        { label: 'Avg match', value: avgMatch ? `${avgMatch}%` : '—' },
                        { label: 'Scorecards', value: scorecardsCount }
                    ],
                    actions: defaultActions,
                    sidebar: bestSupplier ? (
                        <div className="demo-sidebar-card">
                            <h4>AI recommendation</h4>
                            <div className="sidebar-spotlight">
                                <span className="spotlight-name">{bestSupplier.name}</span>
                                <span className="spotlight-score">{bestSupplier.match}% match</span>
                            </div>
                            <ul className="demo-sidebar-list compact">
                                <li>
                                    <span className="sidebar-label">Region</span>
                                    <span className="sidebar-value">{bestSupplier.location}</span>
                                </li>
                                <li>
                                    <span className="sidebar-label">Lead time</span>
                                    <span className="sidebar-value">2-3 wks</span>
                                </li>
                                <li>
                                    <span className="sidebar-label">Risk</span>
                                    <span className="sidebar-value low">Low</span>
                                </li>
                            </ul>
                            <button className="demo-sidebar-btn">Compare suppliers</button>
                        </div>
                    ) : baseSidebar
                };
            }
            case 'workflow': {
                const steps = demo.steps || [];
                const categories = demo.templates?.categories || [];

                return {
                    badge: 'RFQ automation',
                    stats: [
                        { label: 'Workflow steps', value: steps.length || 6 },
                        { label: 'Template sets', value: categories.length || 4 },
                        { label: 'AI coverage', value: '92%' }
                    ],
                    actions: defaultActions,
                    sidebar: (
                        <div className="demo-sidebar-card">
                            <h4>Automation health</h4>
                            <ul className="demo-sidebar-list">
                                <li className="sidebar-note">
                                    <span>⚡ 92% of RFQs auto-progress with no manual touch.</span>
                                </li>
                                <li className="sidebar-note">
                                    <span>🤖 Supplier suggestions refresh every 30 minutes.</span>
                                </li>
                                <li className="sidebar-note">
                                    <span>🔁 SLA nudges trigger at Track + Evaluate stages.</span>
                                </li>
                            </ul>
                            <button className="demo-sidebar-btn">Review playbook</button>
                        </div>
                    )
                };
            }
            case 'search': {
                const sampleQueries = demo.sampleQueries || [];
                const baseQuery = sampleQueries[0] || {
                    results: demo.results || [],
                    negotiation: demo.negotiation || []
                };
                const results = baseQuery.results || [];
                const negotiation = baseQuery.negotiation || [];
                const topResult = results[0];

                return {
                    badge: 'Smart search',
                    stats: [
                        { label: 'Matches', value: results.length || '—' },
                        { label: 'Best match', value: topResult ? `${topResult.match}%` : '—' },
                        { label: 'Confidence', value: negotiation[0]?.confidence ? `${negotiation[0].confidence}%` : '88%' }
                    ],
                    actions: defaultActions,
                    sidebar: negotiation.length ? (
                        <div className="demo-sidebar-card">
                            <h4>AI negotiation</h4>
                            <ul className="demo-sidebar-list">
                                {negotiation.slice(0, 2).map((insight, index) => (
                                    <li key={`negotiation-${index}`} className="sidebar-note">
                                        <span className="sidebar-label">Confidence {insight.confidence}%</span>
                                        <span className="sidebar-subtext">{insight.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="demo-sidebar-btn">Start counter offer</button>
                        </div>
                    ) : baseSidebar
                };
            }
            case 'correlation': {
                const pairs = demo.pairs || [];
                const strongest = pairs.length
                    ? pairs.reduce((current, pair) => {
                        if (!current) return pair;
                        return (pair.correlation ?? 0) > (current.correlation ?? 0) ? pair : current;
                    }, pairs[0])
                    : null;

                return {
                    badge: 'Market relationships',
                    stats: [
                        { label: 'Pairs', value: pairs.length || '—' },
                        { label: 'Strongest', value: strongest ? `${Math.round(strongest.correlation * 100)}%` : '—' },
                        { label: 'Avg lag', value: strongest?.lag || '2 weeks' }
                    ],
                    actions: defaultActions,
                    sidebar: strongest ? (
                        <div className="demo-sidebar-card">
                            <h4>Focus pair</h4>
                            <div className="sidebar-spotlight">
                                <span className="spotlight-name">{strongest.from} → {strongest.to}</span>
                                <span className="spotlight-score">{Math.round(strongest.correlation * 100)}% correlation</span>
                            </div>
                            <ul className="demo-sidebar-list compact">
                                <li>
                                    <span className="sidebar-label">Time lag</span>
                                    <span className="sidebar-value">{strongest.lag}</span>
                                </li>
                                <li>
                                    <span className="sidebar-label">Signal</span>
                                    <span className="sidebar-value">Leading</span>
                                </li>
                            </ul>
                            <button className="demo-sidebar-btn">Alert me</button>
                        </div>
                    ) : baseSidebar
                };
            }
            case 'dashboard': {
                const metrics = demo.metrics || [];
                const spendMetric = metrics.find(metric => metric.label.toLowerCase().includes('spend'));
                const savingsMetric = metrics.find(metric => metric.label.toLowerCase().includes('saving'));

                return {
                    badge: 'Spend analytics',
                    stats: [
                        { label: 'Total spend', value: spendMetric?.value || '$—' },
                        { label: 'Savings', value: savingsMetric?.value || '18%' },
                        { label: 'Trend', value: savingsMetric?.trend || 'On track' }
                    ],
                    actions: defaultActions,
                    sidebar: (
                        <div className="demo-sidebar-card">
                            <h4>AI recommendations</h4>
                            <ul className="demo-sidebar-list">
                                <li className="sidebar-note">
                                    <span>📊 MRO running +4% vs plan — review releases.</span>
                                </li>
                                <li className="sidebar-note">
                                    <span>💡 Consolidate electronics suppliers for +6% savings.</span>
                                </li>
                            </ul>
                            <button className="demo-sidebar-btn">Generate report</button>
                        </div>
                    )
                };
            }
            case 'chat': {
                const messages = demo.messages || [];
                const aiMessage = messages.find(message => message.role === 'ai');
                const actionsAvailable = aiMessage?.actions?.length || 0;

                return {
                    badge: 'AI copilot',
                    stats: [
                        { label: 'Actions', value: actionsAvailable },
                        { label: 'Response time', value: '0.4s' },
                        { label: 'Context', value: `${messages.length} msgs` }
                    ],
                    actions: defaultActions,
                    sidebar: (
                        <div className="demo-sidebar-card">
                            <h4>Suggested automations</h4>
                            <ul className="demo-sidebar-list">
                                <li className="sidebar-note">
                                    <span>📝 Draft RFQ from this query</span>
                                </li>
                                <li className="sidebar-note">
                                    <span>📥 Add shortlisted suppliers to watchlist</span>
                                </li>
                                <li className="sidebar-note">
                                    <span>📤 Export briefing to stakeholders</span>
                                </li>
                            </ul>
                            <button className="demo-sidebar-btn">Run workflow</button>
                        </div>
                    )
                };
            }
            case 'risk': {
                const risks = demo.risks || [];
                const highRisks = risks.filter(risk => (risk.type || '').toLowerCase() === 'high');
                const predictiveCount = demo.alerts?.length || 0;
                const negotiationCount = demo.negotiation?.length || 0;
                const critical = highRisks[0] || risks[0];
                const negotiationTop = demo.negotiation?.[0];

                return {
                    badge: 'Risk intelligence',
                    stats: [
                        { label: 'Critical alerts', value: highRisks.length || '—' },
                        { label: 'Predictive', value: predictiveCount },
                        { label: 'Negotiation', value: negotiationCount }
                    ],
                    actions: defaultActions,
                    sidebar: (
                        <div className="demo-sidebar-card">
                            <h4>Immediate attention</h4>
                            {critical && (
                                <div className="sidebar-spotlight">
                                    <span className="spotlight-name">{critical.title}</span>
                                    <span className="spotlight-score">Score {critical.score}</span>
                                    <span className="sidebar-subtext">{critical.location}</span>
                                </div>
                            )}
                            {negotiationTop && (
                                <div className="sidebar-note">
                                    <span className="sidebar-label">Negotiation {negotiationTop.confidence}%</span>
                                    <span className="sidebar-subtext">{negotiationTop.text}</span>
                                </div>
                            )}
                            <button className="demo-sidebar-btn">Open playbook</button>
                        </div>
                    )
                };
            }
            default:
                return {
                    badge: 'Live workspace',
                    stats: [
                        { label: 'Status', value: 'Synced' },
                        { label: 'Latency', value: '2.1s' }
                    ],
                    actions: defaultActions,
                    sidebar: baseSidebar
                };
        }
    };

    const renderDemo = (featureData) => {
        if (!featureData || !featureData.demo) return null;
        const meta = getDemoMeta(featureData);
        const { demo, title, description } = featureData;

        return (
            <div className={`demo-shell demo-shell-${demo.type}`}>
                <div className="demo-shell-header">
                    <div className="demo-shell-info">
                        <span className="demo-shell-chip">{meta.badge || 'Live workspace'}</span>
                        <div className="demo-shell-title">
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                    {meta.stats && meta.stats.length > 0 && (
                        <div className="demo-shell-metrics">
                            {meta.stats.map((stat, index) => (
                                <div key={`${stat.label}-${index}`} className="demo-shell-stat">
                                    <span className="stat-label">{stat.label}</span>
                                    <span className="stat-value">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {meta.actions && meta.actions.length > 0 && (
                    <div className="demo-shell-actions">
                        {meta.actions.map((action, index) => (
                            <button
                                key={`${action.label}-${index}`}
                                className={`demo-shell-action ${action.variant || 'ghost'}`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
                <div className={`demo-shell-body ${meta.sidebar ? 'with-sidebar' : ''}`}>
                    <div className="demo-shell-main">
                        {renderDemoContent(demo)}
                    </div>
                    {meta.sidebar && (
                        <aside className="demo-shell-sidebar">
                            {meta.sidebar}
                        </aside>
                    )}
                </div>
            </div>
        );
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    // Custom SVG Icon Components
    const FeatureIcon = ({ feature, isActive }) => {
        const iconVariants = {
            inactive: { scale: 1, opacity: 0.7 },
            active: { scale: 1.05, opacity: 1 }
        };

        const renderIcon = () => {
            switch (feature) {
                case 'market':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <rect x="4" y="24" width="4" height="8" fill="url(#gradient1)" rx="2">
                                <animate attributeName="height" values="8;12;8" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="y" values="24;20;24" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="10" y="20" width="4" height="12" fill="url(#gradient1)" rx="2">
                                <animate attributeName="height" values="12;16;12" dur="2.2s" repeatCount="indefinite" />
                                <animate attributeName="y" values="20;16;20" dur="2.2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="16" y="16" width="4" height="16" fill="url(#gradient1)" rx="2">
                                <animate attributeName="height" values="16;20;16" dur="2.4s" repeatCount="indefinite" />
                                <animate attributeName="y" values="16;12;16" dur="2.4s" repeatCount="indefinite" />
                            </rect>
                            <rect x="22" y="18" width="4" height="14" fill="url(#gradient1)" rx="2">
                                <animate attributeName="height" values="14;18;14" dur="2.1s" repeatCount="indefinite" />
                                <animate attributeName="y" values="18;14;18" dur="2.1s" repeatCount="indefinite" />
                            </rect>
                            <rect x="28" y="22" width="4" height="10" fill="url(#gradient1)" rx="2">
                                <animate attributeName="height" values="10;14;10" dur="1.9s" repeatCount="indefinite" />
                                <animate attributeName="y" values="22;18;22" dur="1.9s" repeatCount="indefinite" />
                            </rect>
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'search':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <circle cx="18" cy="18" r="8" stroke="url(#gradient2)" strokeWidth="2" fill="none">
                                <animate attributeName="r" values="8;9;8" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <line x1="24" y1="24" x2="30" y2="30" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                            </line>
                            <circle cx="18" cy="18" r="3" fill="url(#gradient2)" opacity="0.3">
                                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <defs>
                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'supplier':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <circle cx="20" cy="12" r="4" fill="url(#gradient3)" />
                            <circle cx="10" cy="24" r="3" fill="url(#gradient3)" opacity="0.7">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="20" cy="28" r="3" fill="url(#gradient3)" opacity="0.7">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="30" cy="24" r="3" fill="url(#gradient3)" opacity="0.7">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" />
                            </circle>
                            <line x1="20" y1="16" x2="10" y2="21" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.5" />
                            <line x1="20" y1="16" x2="20" y2="25" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.5" />
                            <line x1="20" y1="16" x2="30" y2="21" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.5" />
                            <defs>
                                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'rfq':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <rect x="8" y="8" width="24" height="24" rx="2" stroke="url(#gradient4)" strokeWidth="2" fill="none" />
                            <line x1="12" y1="14" x2="28" y2="14" stroke="url(#gradient4)" strokeWidth="1.5">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                            </line>
                            <line x1="12" y1="20" x2="24" y2="20" stroke="url(#gradient4)" strokeWidth="1.5">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
                            </line>
                            <line x1="12" y1="26" x2="20" y2="26" stroke="url(#gradient4)" strokeWidth="1.5">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
                            </line>
                            <circle cx="30" cy="12" r="3" fill="url(#gradient4)" opacity="0.6">
                                <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <defs>
                                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'ai':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <circle cx="20" cy="20" r="10" stroke="url(#gradient5)" strokeWidth="2" fill="none">
                                <animate attributeName="stroke-dasharray" values="0 63;31.5 31.5;0 63" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="20" cy="20" r="6" fill="url(#gradient5)" opacity="0.3">
                                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="20" cy="20" r="2" fill="url(#gradient5)" />
                            <defs>
                                <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#EC4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'trends':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <polyline
                                points="4,28 12,20 20,16 28,12 36,8"
                                stroke="url(#gradient6)"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                            >
                                <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="2s" repeatCount="indefinite" />
                            </polyline>
                            <circle cx="4" cy="28" r="2" fill="url(#gradient6)" />
                            <circle cx="12" cy="20" r="2" fill="url(#gradient6)" />
                            <circle cx="20" cy="16" r="2" fill="url(#gradient6)" />
                            <circle cx="28" cy="12" r="2" fill="url(#gradient6)" />
                            <circle cx="36" cy="8" r="2" fill="url(#gradient6)">
                                <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <defs>
                                <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'analytics':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <rect x="6" y="20" width="6" height="12" fill="url(#gradient7)" rx="1">
                                <animate attributeName="height" values="12;16;12" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="y" values="20;16;20" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="14" y="12" width="6" height="20" fill="url(#gradient7)" rx="1">
                                <animate attributeName="height" values="20;24;20" dur="2.2s" repeatCount="indefinite" />
                                <animate attributeName="y" values="12;8;12" dur="2.2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="22" y="16" width="6" height="16" fill="url(#gradient7)" rx="1">
                                <animate attributeName="height" values="16;20;16" dur="2.1s" repeatCount="indefinite" />
                                <animate attributeName="y" values="16;12;16" dur="2.1s" repeatCount="indefinite" />
                            </rect>
                            <rect x="30" y="8" width="6" height="24" fill="url(#gradient7)" rx="1">
                                <animate attributeName="height" values="24;28;24" dur="2.3s" repeatCount="indefinite" />
                                <animate attributeName="y" values="8;4;8" dur="2.3s" repeatCount="indefinite" />
                            </rect>
                            <defs>
                                <linearGradient id="gradient7" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'scorecards':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <rect x="6" y="6" width="28" height="28" rx="2" stroke="url(#gradient8)" strokeWidth="2" fill="none" />
                            <rect x="10" y="12" width="20" height="3" fill="url(#gradient8)" rx="1.5" opacity="0.8">
                                <animate attributeName="width" values="20;24;20" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="10" y="18" width="18" height="3" fill="url(#gradient8)" rx="1.5" opacity="0.8">
                                <animate attributeName="width" values="18;22;18" dur="2.2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="10" y="24" width="16" height="3" fill="url(#gradient8)" rx="1.5" opacity="0.8">
                                <animate attributeName="width" values="16;20;16" dur="2.1s" repeatCount="indefinite" />
                            </rect>
                            <defs>
                                <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'contracts':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <rect x="8" y="6" width="24" height="28" rx="2" stroke="url(#gradient9)" strokeWidth="2" fill="none" />
                            <line x1="12" y1="12" x2="28" y2="12" stroke="url(#gradient9)" strokeWidth="1.5">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                            </line>
                            <line x1="12" y1="18" x2="24" y2="18" stroke="url(#gradient9)" strokeWidth="1.5">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
                            </line>
                            <line x1="12" y1="24" x2="20" y2="24" stroke="url(#gradient9)" strokeWidth="1.5">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
                            </line>
                            <circle cx="28" cy="28" r="4" fill="url(#gradient9)" opacity="0.3">
                                <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <defs>
                                <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                case 'risk':
                    return (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="feature-svg-icon">
                            <path d="M20 6 L32 14 L28 28 L12 28 L8 14 Z" stroke="url(#gradient10)" strokeWidth="2" fill="none">
                                <animate attributeName="stroke-dasharray" values="0 80;40 40;0 80" dur="2s" repeatCount="indefinite" />
                            </path>
                            <circle cx="20" cy="20" r="6" fill="url(#gradient10)" opacity="0.2">
                                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="20" cy="20" r="2" fill="url(#gradient10)" />
                            <defs>
                                <linearGradient id="gradient10" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#EC4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                    );

                default:
                    return null;
            }
        };

        return (
            <motion.div
                className="feature-icon-svg"
                variants={iconVariants}
                animate={isActive ? "active" : "inactive"}
                transition={{ duration: 0.3 }}
            >
                {renderIcon()}
            </motion.div>
        );
    };

    const AnimatedPlaceholder = () => {
        const introStages = useMemo(() => ([
            { label: 'Source Smarter', detail: 'Market pulse initializing' },
            { label: 'Procure Faster', detail: 'Workflow canvas loading' },
            { label: 'Predict Earlier', detail: 'AI signals syncing' }
        ]), []);
        const [stageIndex, setStageIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setStageIndex(prev => (prev + 1) % introStages.length);
            }, 2600);

            return () => clearInterval(interval);
        }, [introStages.length]);

        const activeStage = introStages[stageIndex];

        return (
            <div className="demo-kickoff">
                <motion.div
                    className="kickoff-core"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeStage.label}
                            className="kickoff-stage"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.45 }}
                        >
                            {activeStage.label}
                        </motion.span>
                    </AnimatePresence>
                    <h3 className="kickoff-title">
                        SourceSmart <span>Platform Feature</span>
                    </h3>
                    <p className="kickoff-detail">{activeStage.detail}</p>
                </motion.div>

                <div className="kickoff-graph-wrap">
                    <div className="kickoff-graph-label">
                        SourceSmart – Features
                    </div>
                    <motion.svg
                        key={stageIndex}
                        viewBox="0 0 380 140"
                        className="kickoff-graph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <defs>
                            <linearGradient id="kickoffGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0066FF" />
                                <stop offset="100%" stopColor="#7C3AED" />
                            </linearGradient>
                            <linearGradient id="kickoffFill" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(0, 102, 255, 0.35)" />
                                <stop offset="100%" stopColor="rgba(0, 102, 255, 0)" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d="M10 110 L60 90 L110 70 L160 65 L210 50 L260 60 L310 45 L360 40"
                            fill="none"
                            stroke="url(#kickoffGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
                        />
                        <motion.path
                            d="M10 110 L60 90 L110 70 L160 65 L210 50 L260 60 L310 45 L360 40 L360 140 L10 140 Z"
                            fill="url(#kickoffFill)"
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: [0.2, 0.35, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        {[60, 110, 160, 210, 260, 310].map((x, idx) => (
                            <motion.circle
                                key={x}
                                cx={x}
                                cy={[90, 70, 65, 50, 60, 45][idx]}
                                r="5"
                                fill="url(#kickoffGradient)"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.15 }}
                            />
                        ))}
                    </motion.svg>
                    <div className="kickoff-graph-caption">
                        <span>Live Insights Stream</span>
                        <div className="kickoff-progress">
                            <motion.div
                                className="kickoff-progress-fill"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="kickoff-metrics">
                    <div className="kickoff-metric">
                        <span>Auto demo loop</span>
                        <strong>00:03</strong>
                    </div>
                    <div className="kickoff-metric">
                        <span>Modules ready</span>
                        <strong>08</strong>
                    </div>
                    <div className="kickoff-metric">
                        <span>Mode</span>
                        <strong>Guided</strong>
                    </div>
                </div>
            </div>
        );
    };

    // Reset template and query selections when feature changes
    useEffect(() => {
        setSelectedTemplate(null);
        setSelectedQuery(0);
    }, [selectedFeature, hoveredFeature]);

    useEffect(() => {
        if (!showFeatureList && !isMobile) {
            setSelectedFeature(null);
            setHoveredFeature(null);
        }
    }, [showFeatureList, isMobile]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = (event) => setIsMobile(event.matches);
        handleChange(mediaQuery);
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleChange);
        }
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else if (mediaQuery.removeListener) {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!isMobile) {
            setShowMobileFeatureNav(false);
            return;
        }
        const handleVisibility = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const isVisible = rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2;
            setShowMobileFeatureNav(isVisible);
        };
        handleVisibility();
        window.addEventListener('scroll', handleVisibility, { passive: true });
        window.addEventListener('resize', handleVisibility);
        return () => {
            window.removeEventListener('scroll', handleVisibility);
            window.removeEventListener('resize', handleVisibility);
        };
    }, [isMobile]);

    // Auto-open AI chat after 5 seconds when on workflow demo first screen
    useEffect(() => {
        const activeFeature = hoveredFeature !== null ? hoveredFeature : selectedFeature;
        const isWorkflowDemo = activeFeature !== null && features[activeFeature]?.demo?.type === 'workflow';
        
        if (isWorkflowDemo && !selectedTemplate) {
            const timer = setTimeout(() => {
                setIsAIChatOpen(true);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setIsAIChatOpen(false);
        }
    }, [selectedTemplate, hoveredFeature, selectedFeature, features]);

    const renderDemoContent = (demo) => {
        if (!demo) return null;

        switch (demo.type) {
            case 'chart':
                return (
                    <div className="demo-chart">
                        <div className="demo-chart-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Market Overview</h3>
                                <span className="demo-subtitle">Real-time commodity prices</span>
                            </div>
                            <div className="demo-header-right">
                                <span className="demo-badge live">
                                    <span className="badge-dot"></span>
                                    LIVE
                                </span>
                            </div>
                        </div>
                        <div className="demo-chart-content">
                            {demo.data.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="demo-chart-item"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                                >
                                    <div className="chart-item-header">
                                        <div className="chart-item-info">
                                            <span className="chart-commodity-name">{item.name}</span>
                                            <span className="chart-commodity-price">${item.price.toFixed(2)}</span>
                                        </div>
                                        <div className={`chart-trend-badge ${item.trend}`}>
                                            <span className="trend-icon">{item.trend === 'up' ? '↗' : '↘'}</span>
                                            <span className="trend-value">{Math.abs(item.change)}%</span>
                                        </div>
                                    </div>
                                    <div className="chart-progress-container">
                                        <motion.div
                                            className={`chart-progress-bar ${item.trend}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.abs(item.change) * 15 + 20}%` }}
                                            transition={{ delay: i * 0.08 + 0.2, duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'map':
                return (
                    <div className="demo-map">
                        <div className="demo-map-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Supplier Network</h3>
                                <span className="demo-subtitle">Global supplier discovery</span>
                            </div>
                            <div className="demo-header-right">
                                <span className="demo-badge count">{demo.suppliers.length} matches</span>
                            </div>
                        </div>
                        <div className="demo-map-content">
                            <div className="demo-map-visual">
                                <div className="map-grid">
                                    {demo.suppliers.map((supplier, i) => (
                                        <motion.div
                                            key={i}
                                            className="map-marker"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 20 }}
                                            style={{
                                                left: `${15 + (i % 3) * 35}%`,
                                                top: `${25 + Math.floor(i / 3) * 40}%`
                                            }}
                                        >
                                            <div className="marker-pulse" />
                                            <div className="marker-dot" />
                                            <div className="marker-tooltip">{supplier.match}%</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="demo-suppliers-list">
                                {demo.suppliers.map((supplier, i) => (
                                    <motion.div
                                        key={i}
                                        className="demo-supplier-item"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 + 0.4 }}
                                    >
                                        <div className="supplier-item-main">
                                            <div className="supplier-info">
                                                <span className="supplier-name">{supplier.name}</span>
                                                <span className="supplier-location">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: '4px' }}>
                                                        <path d="M6 0C3.24 0 1 2.24 1 5c0 3.5 5 7 5 7s5-3.5 5-7c0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2.5-1.12-2.5-2.5S4.62 2.5 6 2.5 8.5 3.62 8.5 5 7.38 7.5 6 7.5z" fill="currentColor"/>
                                                    </svg>
                                                    {supplier.location}
                                                </span>
                                            </div>
                                            <div className="supplier-match-badge">
                                                <span className="match-value">{supplier.match}%</span>
                                                <span className="match-label">Match</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {demo.scorecards && (
                                <div className="demo-scorecards-section">
                                    <div className="demo-risk-section-title">
                                        <div className="section-title-left">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="section-icon">
                                                <path d="M8 0L9.5 5.5L15 5.5L10.5 8.5L12 14L8 11L4 14L5.5 8.5L1 5.5L6.5 5.5L8 0Z" fill="currentColor"/>
                                            </svg>
                                            <span>Supplier Scorecards</span>
                                        </div>
                                    </div>
                                    <div className="demo-scorecards-grid">
                                        {demo.suppliers.slice(0, 2).map((supplier, i) => {
                                            const scorecard = demo.scorecards[supplier.name];
                                            if (!scorecard) return null;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    className="demo-scorecard-compact"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.15 + 0.6 }}
                                                >
                                                    <div className="scorecard-compact-header">
                                                        <h4 className="scorecard-compact-title">{supplier.name}</h4>
                                                    </div>
                                                    <div className="scorecard-compact-scores">
                                                        {scorecard.scores.map((score, j) => (
                                                            <motion.div
                                                                key={j}
                                                                className="scorecard-compact-item"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.15 + j * 0.1 + 0.7 }}
                                                            >
                                                                <div className="scorecard-compact-label">{score.label}</div>
                                                                <div className="scorecard-compact-bar-container">
                                                                    <motion.div
                                                                        className="scorecard-compact-bar"
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${score.value}%` }}
                                                                        transition={{ delay: i * 0.15 + j * 0.1 + 0.9, duration: 0.6 }}
                                                                    >
                                                                        <div className={`scorecard-compact-fill scorecard-${score.color}`} />
                                                                    </motion.div>
                                                                    <span className={`scorecard-compact-value scorecard-${score.color}`}>
                                                                        {score.value}%
                                                                    </span>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'workflow':
                const templates = demo.templates || {};
                const categories = templates.categories || [];
                const samples = templates.samples || {};
                const currentTemplate = selectedTemplate && samples[selectedTemplate] ? samples[selectedTemplate] : null;

                return (
                    <div className="demo-workflow">
                        <div className="demo-workflow-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Smart RFQ Templates</h3>
                                <span className="demo-subtitle">AI-powered template library</span>
                            </div>
                            <div className="demo-header-right">
                                <span className="demo-badge ai">AI</span>
                            </div>
                        </div>
                        
                        {!currentTemplate ? (
                            <div className="demo-templates-container">
                                <div className="templates-header">
                                    <span className="templates-title">Choose a Template Category</span>
                                    <span className="templates-subtitle">Click on any category to view sample templates</span>
                                </div>
                                <div className="templates-grid-compact">
                                    {categories.map((category, i) => (
                                        <motion.button
                                            key={category.id}
                                            className="template-category-card-compact"
                                            onClick={() => setSelectedTemplate(category.id)}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <div className="category-icon-small">{category.icon}</div>
                                            <span className="category-name-small">{category.name}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="workflow-demo-section-first">
                                    <div className="workflow-demo-header">
                                        <span className="workflow-title">RFQ Workflow</span>
                                        <span className="workflow-status">Auto-Progress</span>
                                    </div>
                                    <div className="workflow-train">
                                        {['Draft', 'AI Review', 'Send', 'Track', 'Evaluate', 'Award'].map((step, i) => (
                                            <motion.div
                                                key={i}
                                                className="workflow-step-card"
                                                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    x: 0, 
                                                    scale: 1,
                                                    boxShadow: [
                                                        '0 0 0px rgba(124, 58, 237, 0)',
                                                        '0 0 20px rgba(124, 58, 237, 0.6)',
                                                        '0 0 0px rgba(124, 58, 237, 0)'
                                                    ]
                                                }}
                                                transition={{ 
                                                    delay: i * 0.2,
                                                    duration: 0.5,
                                                    boxShadow: {
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        repeatDelay: 2,
                                                        delay: i * 0.2
                                                    }
                                                }}
                                            >
                                                <div className="step-card-glow"></div>
                                                <div className="step-card-content">
                                                    <div className="step-number-small">{i + 1}</div>
                                                    <span className="step-name-small">{step}</span>
                                                </div>
                                                {i < 5 && (
                                                    <motion.div
                                                        className="step-connector"
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: 1 }}
                                                        transition={{ delay: i * 0.2 + 0.4, duration: 0.4 }}
                                                    >
                                                        <div className="connector-glow"></div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating AI Chat Bubble */}
                                <AnimatePresence>
                                    {isAIChatOpen && (
                                        <motion.div
                                            className="ai-chat-bubble"
                                            initial={{ opacity: 0, scale: 0, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0, y: 20 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        >
                                            <button
                                                className="ai-chat-close"
                                                onClick={() => setIsAIChatOpen(false)}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </button>
                                            <div className="ai-chat-header">
                                                <div className="ai-chat-avatar">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                        <circle cx="10" cy="10" r="3" fill="currentColor"/>
                                                    </svg>
                                                </div>
                                                <div className="ai-chat-info">
                                                    <span className="ai-chat-name">AI Assistant</span>
                                                    <span className="ai-chat-status">Online</span>
                                                </div>
                                            </div>
                                            <div className="ai-chat-messages">
                                                <div className="ai-message">
                                                    <p>Hi! I can help you find the perfect template and suggest suppliers based on your needs.</p>
                                                </div>
                                                <div className="ai-message">
                                                    <p>Try selecting a category to see how I can assist you!</p>
                                                </div>
                                            </div>
                                            <div className="ai-chat-suggestions">
                                                <button className="ai-suggestion-btn">Smart template matching</button>
                                                <button className="ai-suggestion-btn">Supplier recommendations</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {!isAIChatOpen && (
                                    <motion.button
                                        className="ai-chat-trigger"
                                        onClick={() => setIsAIChatOpen(true)}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <circle cx="12" cy="12" r="4" fill="currentColor"/>
                                        </svg>
                                        <motion.div
                                            className="ai-chat-pulse"
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.button>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                className="demo-template-viewer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="template-viewer-header">
                                    <button 
                                        className="back-button"
                                        onClick={() => setSelectedTemplate(null)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Back to Categories
                                    </button>
                                    <div className="template-title-section">
                                        <h4 className="template-title">{currentTemplate.title}</h4>
                                        <span className="template-description">{currentTemplate.description}</span>
                                    </div>
                                </div>
                                
                                <div className="template-content-wrapper">
                                    <div className="template-fields">
                                        <div className="fields-header">
                                            <span className="fields-title">Template Fields</span>
                                            <span className="fields-count">{currentTemplate.fields.length} fields</span>
                                        </div>
                                        <div className="fields-list">
                                            {currentTemplate.fields.slice(0, 3).map((field, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`template-field ${field.required ? 'required' : ''}`}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                >
                                                    <div className="field-label">
                                                        <span>{field.label}</span>
                                                        {field.required && <span className="required-badge">Required</span>}
                                                    </div>
                                                    <div className="field-value">{field.value}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div className="template-actions">
                                    <motion.button
                                        className="action-button primary"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Use This Template
                                    </motion.button>
                                    <motion.button
                                        className="action-button secondary"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Customize
                                    </motion.button>
                                </div>

                                {currentTemplate.recommendedSuppliers && (
                                    <motion.div
                                        className="ai-helper-panel"
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="ai-helper-header">
                                            <div className="ai-helper-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    <circle cx="10" cy="10" r="3" fill="currentColor"/>
                                                </svg>
                                            </div>
                                            <span className="ai-helper-title">AI Assistant</span>
                                        </div>
                                        <div className="ai-helper-content">
                                            <p className="ai-helper-text">
                                                Based on your template, I found <strong>{currentTemplate.recommendedSuppliers.length} suppliers</strong> that can help you:
                                            </p>
                                            <div className="ai-helper-suppliers">
                                                {currentTemplate.recommendedSuppliers.slice(0, 2).map((supplier, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="ai-supplier-suggestion"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.7 + i * 0.1 }}
                                                    >
                                                        <div className="suggestion-icon">✓</div>
                                                        <span className="suggestion-text">{supplier} can fulfill this RFQ</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <motion.button
                                                className="ai-helper-action"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                View All Suppliers →
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                );

            case 'chat':
                return (
                    <div className="demo-chat">
                        <div className="demo-chat-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">AI Assistant</h3>
                                <span className="demo-subtitle">Contextual help & insights</span>
                            </div>
                            <div className="demo-header-right">
                                <div className="chat-status-indicator">
                                    <span className="status-dot"></span>
                                    <span className="status-text">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="demo-chat-messages">
                            {demo.messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    className={`demo-chat-message ${msg.role}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <div className="chat-avatar">
                                        {msg.role === 'ai' ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                <circle cx="10" cy="10" r="3" fill="currentColor"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                                                <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor"/>
                                            </svg>
                                        )}
                                    </div>
                                    <div className="chat-message-content">
                                        <div className={`chat-bubble ${msg.role}`}>
                                            {msg.role === 'ai' && (
                                                <motion.span
                                                    className="typing-indicator"
                                                    animate={{ opacity: [1, 0.3, 1] }}
                                                    transition={{ duration: 1.2, repeat: Infinity }}
                                                >
                                                    ●●●
                                                </motion.span>
                                            )}
                                            <span className="chat-text">{msg.text}</span>
                                        </div>
                                        {msg.actions && (
                                            <div className="chat-actions">
                                                {msg.actions.map((action, ai) => (
                                                    <motion.button
                                                        key={ai}
                                                        className="chat-action-btn"
                                                        whileHover={{ scale: 1.02, y: -1 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 + ai * 0.08 }}
                                                    >
                                                        {action}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'risk':
                return (
                    <div className="demo-risk">
                        <div className="demo-risk-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Risk Intelligence</h3>
                                <span className="demo-subtitle">AI-powered risk monitoring</span>
                            </div>
                            <div className="demo-header-right">
                                <span className="demo-badge ai">AI</span>
                            </div>
                        </div>
                        <div className="demo-risk-risks">
                            <div className="demo-risk-section-title">
                                <div className="section-title-left">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="section-icon">
                                        <path d="M8 0L9.5 5.5L15 5.5L10.5 8.5L12 14L8 11L4 14L5.5 8.5L1 5.5L6.5 5.5L8 0Z" fill="currentColor"/>
                                    </svg>
                                    <span>Risk Alerts</span>
                                </div>
                                <div className="section-count-badge">
                                    <span>{demo.risks.length}</span>
                                </div>
                            </div>
                            <div className="demo-alerts-grid">
                                {demo.risks.map((risk, i) => (
                                    <motion.div
                                        key={i}
                                        className={`demo-alert-card ${risk.type.toLowerCase()}`}
                                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ 
                                            delay: i * 0.1, 
                                            type: "spring", 
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                        whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                                    >
                                        <div className="alert-card-header">
                                            <div className={`alert-severity-indicator ${risk.type.toLowerCase()}`}>
                                                <div className={`severity-dot ${risk.type.toLowerCase()}`}></div>
                                                <div className={`severity-pulse ${risk.type.toLowerCase()}`}></div>
                                            </div>
                                            <div className="alert-score-compact">
                                                <span className="score-value">{risk.score}</span>
                                            </div>
                                        </div>
                                        <div className="alert-card-body">
                                            <h4 className="alert-title-compact">{risk.title}</h4>
                                            <div className="alert-location-compact">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="location-icon">
                                                    <path d="M6 0C3.24 0 1 2.24 1 5c0 3.5 5 7 5 7s5-3.5 5-7c0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2.5-1.12-2.5-2.5S4.62 2.5 6 2.5 8.5 3.62 8.5 5 7.38 7.5 6 7.5z" fill="currentColor"/>
                                                </svg>
                                                <span>{risk.location}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {demo.alerts && (
                            <div className="demo-predictive-section">
                                <div className="demo-risk-section-title">
                                    <div className="section-title-left">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="section-icon">
                                            <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11ZM8.5 8H7.5V5H8.5V8Z" fill="currentColor"/>
                                        </svg>
                                        <span>Predictive Alerts</span>
                                    </div>
                                    <div className="section-count-badge">
                                        <span>{demo.alerts.length}</span>
                                    </div>
                                </div>
                                <div className="demo-predictive-grid">
                                    {demo.alerts.map((alert, i) => (
                                        <motion.div
                                            key={i}
                                            className={`demo-predictive-card ${alert.priority.toLowerCase()}`}
                                            initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            transition={{ 
                                                delay: i * 0.1 + 0.3, 
                                                type: "spring", 
                                                stiffness: 200,
                                                damping: 20
                                            }}
                                            whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                                        >
                                            <div className="predictive-card-header">
                                                <div className={`predictive-badge ${alert.priority.toLowerCase()}`}>
                                                    <div className={`priority-dot ${alert.priority.toLowerCase()}`}></div>
                                                    <div className={`priority-pulse ${alert.priority.toLowerCase()}`}></div>
                                                </div>
                                                <span className="predictive-type-badge">{alert.type}</span>
                                            </div>
                                            <p className="predictive-text-compact">{alert.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {demo.negotiation && (
                            <div className="demo-negotiation-section">
                                <div className="demo-risk-section-title">
                                    <div className="section-title-left">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="section-icon">
                                            <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11ZM8.5 8H7.5V5H8.5V8Z" fill="currentColor"/>
                                        </svg>
                                        <span>Negotiation Insights</span>
                                    </div>
                                </div>
                                <div className="demo-negotiation-grid">
                                    {demo.negotiation.map((insight, i) => (
                                        <motion.div
                                            key={i}
                                            className="demo-negotiation-card"
                                            initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            transition={{ 
                                                delay: i * 0.15 + 0.6, 
                                                type: "spring", 
                                                stiffness: 200,
                                                damping: 20
                                            }}
                                            whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                                        >
                                            <div className="negotiation-card-header">
                                                <div className="negotiation-icon">
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <path d="M9 0L10.5 5.5L16 5.5L11.5 8.5L13 14L9 11L5 14L6.5 8.5L2 5.5L7.5 5.5L9 0Z" fill="currentColor"/>
                                                    </svg>
                                                </div>
                                                <div className="negotiation-confidence-badge">
                                                    <span>{insight.confidence}%</span>
                                                </div>
                                            </div>
                                            <p className="negotiation-text-compact">{insight.text}</p>
                                            <div className="negotiation-progress-container">
                                                <motion.div
                                                    className="negotiation-progress-bar"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${insight.confidence}%` }}
                                                    transition={{ delay: i * 0.15 + 0.8, duration: 0.6 }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'dashboard':
                return (
                    <div className="demo-dashboard">
                        <div className="demo-dashboard-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Analytics Dashboard</h3>
                                <span className="demo-subtitle">Spend insights & trends</span>
                            </div>
                        </div>
                        <div className="demo-dashboard-grid">
                            {demo.metrics.map((metric, i) => (
                                <motion.div
                                    key={i}
                                    className="demo-metric-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                >
                                    <div className="metric-header">
                                        <span className="metric-label">{metric.label}</span>
                                        <div className={`metric-trend ${metric.trend.includes('+') ? 'positive' : 'neutral'}`}>
                                            {metric.trend.includes('+') ? '↑' : metric.trend.includes('-') ? '↓' : '→'} {metric.trend}
                                        </div>
                                    </div>
                                    <motion.span
                                        className="metric-value"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                    >
                                        {metric.value}
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'search':
                const sampleQueries = demo.sampleQueries || [];
                const currentQuery = sampleQueries[selectedQuery] || (demo.query ? {
                    text: demo.query,
                    results: demo.results || [],
                    negotiation: demo.negotiation || []
                } : null);

                return (
                    <div className="demo-search">
                        <div className="demo-search-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">AI Smart Search</h3>
                                <span className="demo-subtitle">Natural language search across platform</span>
                            </div>
                            <div className="demo-header-right">
                                <span className="demo-badge ai">AI</span>
                            </div>
                        </div>

                        {sampleQueries.length > 0 && (
                            <div className="demo-search-samples">
                                <div className="samples-header">
                                    <span className="samples-title">Try Sample Queries</span>
                                    <span className="samples-subtitle">Click any query to see AI results</span>
                                </div>
                                <div className="samples-list">
                                    {sampleQueries.map((query, i) => (
                                        <motion.button
                                            key={query.id}
                                            className={`sample-query-button ${selectedQuery === i ? 'active' : ''}`}
                                            onClick={() => setSelectedQuery(i)}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="query-icon">
                                                <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                <path d="M9 9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <span className="query-text-preview">{query.text}</span>
                                            {selectedQuery === i && (
                                                <motion.div
                                                    className="selected-indicator"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentQuery && (
                            <motion.div
                                className="demo-search-results-container"
                                key={selectedQuery}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="demo-search-query-active">
                                    <motion.div
                                        className="search-query-box active"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="search-icon">
                                            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                            <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        <span className="query-text">{currentQuery.text}</span>
                                        <motion.div
                                            className="ai-processing"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
                                            </svg>
                                        </motion.div>
                                    </motion.div>
                                </div>

                                <div className="demo-search-results">
                                    <div className="results-header">
                                        <div className="results-header-left">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="results-icon">
                                                <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <span className="results-title">Search Results</span>
                                        </div>
                                        <div className="results-count-badge">
                                            <span className="count-value">{currentQuery.results?.length || 0}</span>
                                            <span className="count-label">matches</span>
                                        </div>
                                    </div>
                                    <div className="results-list">
                                        {currentQuery.results?.map((result, i) => (
                                            <motion.div
                                                key={i}
                                                className="demo-search-result"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                            >
                                                <div className="result-rank">
                                                    <span className="rank-number">#{i + 1}</span>
                                                </div>
                                                <div className="result-main">
                                                    <div className="search-result-header">
                                                        <div className="result-name-section">
                                                            <span className="result-name">{result.name}</span>
                                                            <div className="result-match-badge">
                                                                <div className="match-indicator"></div>
                                                                <span className="match-value">{result.match}%</span>
                                                                <span className="match-label">Match</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="search-result-footer">
                                                        <div className="result-info-group">
                                                            <div className="result-info-item">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="info-icon">
                                                                    <path d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0ZM7 9.5C6.58579 9.5 6.25 9.16421 6.25 8.75C6.25 8.33579 6.58579 8 7 8C7.41421 8 7.75 8.33579 7.75 8.75C7.75 9.16421 7.41421 9.5 7 9.5ZM7.5 7H6.5V4.5H7.5V7Z" fill="currentColor"/>
                                                                </svg>
                                                                <span className="result-location">{result.location}</span>
                                                            </div>
                                                            {result.price && (
                                                                <div className="result-info-item">
                                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="info-icon">
                                                                        <path d="M7 0L8.75 5.25L14 5.25L9.625 8.5L11.375 13.75L7 10.5L2.625 13.75L4.375 8.5L0 5.25L5.25 5.25L7 0Z" fill="currentColor"/>
                                                                    </svg>
                                                                    <span className="result-price">{result.price}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="result-rating-group">
                                                            <div className="rating-stars">
                                                                {[...Array(5)].map((_, starIndex) => (
                                                                    <svg 
                                                                        key={starIndex}
                                                                        width="12" 
                                                                        height="12" 
                                                                        viewBox="0 0 12 12" 
                                                                        fill={starIndex < Math.floor(result.rating) ? "currentColor" : "none"}
                                                                        className={`star ${starIndex < Math.floor(result.rating) ? 'filled' : 'empty'}`}
                                                                    >
                                                                        <path d="M6 0L7.5 4.5L12 4.5L8.5 7.5L10 12L6 9L2 12L3.5 7.5L0 4.5L4.5 4.5L6 0Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <span className="rating-value">{result.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {currentQuery.negotiation && currentQuery.negotiation.length > 0 && (
                                    <div className="demo-negotiation-section">
                                        <div className="demo-negotiation-header-small">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '6px' }}>
                                                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <span className="text-xs font-semibold text-white">AI Negotiation Insights</span>
                                        </div>
                                        <div className="demo-negotiation-insights-small">
                                            {currentQuery.negotiation.map((insight, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="demo-negotiation-item-small"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.15 + 0.3 }}
                                                >
                                                    <div className="negotiation-text-small">
                                                        <span className="text-xs text-white">{insight.text}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <motion.div
                                                            className="negotiation-confidence-small"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${insight.confidence}%` }}
                                                            transition={{ delay: i * 0.15 + 0.5, duration: 0.6 }}
                                                        />
                                                        <span className="text-xs text-white/50">{insight.confidence}% confidence</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                );

            case 'correlation':
                return (
                    <div className="demo-correlation">
                        <div className="demo-correlation-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Commodity Correlation</h3>
                                <span className="demo-subtitle">Market relationship analysis</span>
                            </div>
                        </div>
                        <div className="demo-correlation-pairs">
                            {demo.pairs.map((pair, i) => (
                                <motion.div
                                    key={i}
                                    className="demo-correlation-item"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                >
                                    <div className="correlation-visual">
                                        <div className="correlation-from-box">
                                            <div className="commodity-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    <circle cx="10" cy="10" r="3" fill="currentColor"/>
                                                </svg>
                                            </div>
                                            <span className="commodity-name">{pair.from}</span>
                                        </div>
                                        <div className="correlation-connection">
                                            <motion.div
                                                className="correlation-connector"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                                            >
                                                <div className="correlation-line-bg"></div>
                                                <motion.div
                                                    className="correlation-strength"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pair.correlation * 100}%` }}
                                                    transition={{ delay: i * 0.15 + 0.4, duration: 0.8 }}
                                                />
                                            </motion.div>
                                            <div className="correlation-arrow">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="correlation-to-box">
                                            <div className="commodity-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    <path d="M8 8H12M8 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                            <span className="commodity-name">{pair.to}</span>
                                        </div>
                                    </div>
                                    <div className="correlation-info">
                                        <div className="correlation-metric">
                                            <span className="metric-label">Correlation</span>
                                            <span className="metric-value">{Math.round(pair.correlation * 100)}%</span>
                                        </div>
                                        <div className="correlation-metric">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="lag-icon">
                                                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                <path d="M7 3V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <span className="lag-text">Time lag: {pair.lag}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'scorecard':
                return (
                    <div className="demo-scorecard">
                        <div className="demo-scorecard-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Supplier Scorecard</h3>
                                <span className="demo-subtitle">{demo.supplier}</span>
                            </div>
                        </div>
                        <div className="demo-scorecard-scores">
                            {demo.scores.map((score, i) => (
                                <motion.div
                                    key={i}
                                    className="demo-scorecard-item"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                >
                                    <div className="scorecard-header">
                                        <span className="scorecard-label">{score.label}</span>
                                        <span className={`scorecard-value ${score.color}`}>
                                            {score.value}%
                                        </span>
                                    </div>
                                    <motion.div
                                        className="scorecard-bar"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score.value}%` }}
                                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                                    >
                                        <div className={`scorecard-fill scorecard-${score.color}`} />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'contracts':
                return (
                    <div className="demo-contracts">
                        <div className="demo-contracts-header">
                            <div className="demo-header-left">
                                <h3 className="demo-title">Contract Repository</h3>
                                <span className="demo-subtitle">OCR-powered contract management</span>
                            </div>
                            <div className="demo-header-right">
                                <span className="demo-badge ocr">OCR</span>
                            </div>
                        </div>
                        <div className="demo-contracts-list">
                            {demo.contracts.map((contract, i) => (
                                <motion.div
                                    key={i}
                                    className={`demo-contract-item ${contract.status === 'Expiring Soon' ? 'expiring' : ''}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                >
                                    <div className="contract-item-main">
                                        <div className="contract-icon-wrapper">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="contract-icon">
                                                <path d="M4 3C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V7.41421C17 7.149 16.8946 6.89464 16.7071 6.70711L13.2929 3.29289C13.1054 3.10536 12.851 3 12.5858 3H4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                <path d="M6 8H14M6 11H12M6 14H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                            </svg>
                                            {contract.alerts > 0 && (
                                                <div className="contract-alert-indicator">
                                                    <span className="alert-count">{contract.alerts}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="contract-details">
                                            <div className="contract-item-header">
                                                <span className="contract-name">{contract.name}</span>
                                                <div className={`contract-status-badge ${contract.status === 'Expiring Soon' ? 'warning' : 'active'}`}>
                                                    <div className={`status-dot ${contract.status === 'Expiring Soon' ? 'warning' : 'active'}`}></div>
                                                    <span className="status-text">{contract.status}</span>
                                                </div>
                                            </div>
                                            <div className="contract-item-footer">
                                                <div className="contract-expiry-info">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="expiry-icon">
                                                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                        <path d="M7 3V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    <span className="expiry-label">Expires:</span>
                                                    <span className="contract-expiry">{contract.expiry}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const activeFeatureIndex = selectedFeature !== null ? selectedFeature : hoveredFeature;
    const activeFeature = activeFeatureIndex !== null ? features[activeFeatureIndex] : null;

    return (
        <section id="features" className="features" ref={setSectionRefs}>
            <div className="section-container">
                <AnimatePresence>
                    {(isMobile || showFeatureList) && (
                        <motion.div
                            key="features-header"
                            className="section-header"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{
                                duration: 0.75,
                                ease: [0.4, 0, 0.2, 1],
                                delay: (!isMobile && showFeatureList) ? 0.2 : 0
                            }}
                        >
                            <motion.div
                                className="section-badge"
                                whileHover={{ scale: 1.05 }}
                            >
                                Platform Features
                            </motion.div>
                            <h2 className="text-3xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                    Everything you need to optimize procurement
                                </span>
                            </h2>
                            <p className="section-description">Powerful tools designed for modern procurement teams</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className={`features-layout ${
                        (!isMobile && !isLaptopDocked)
                            ? 'features-layout-intro'
                            : (!isMobile ? 'features-layout-docked' : '')
                    }`}
                >
                    {!isMobile && (
                        <AnimatePresence>
                            {showFeatureList && (
                                <motion.div
                                    className="features-list"
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <div className="features-list-inner">
                                        <motion.button
                                            className="features-nav-btn features-nav-prev"
                                            onClick={() => {
                                                setIsAutoRotating(false);
                                                if (autoRotateIntervalRef.current) {
                                                    clearInterval(autoRotateIntervalRef.current);
                                                    autoRotateIntervalRef.current = null;
                                                }
                                                setCurrentPage(prev => Math.max(0, prev - 1));
                                            }}
                                            disabled={currentPage === 0}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </motion.button>

                                        <div className="features-list-cards" key={currentPage}>
                                            <AnimatePresence mode="wait">
                                                {visibleFeatures.map((feature, localIndex) => {
                                                    const globalIndex = currentPage * FEATURES_PER_PAGE + localIndex;
                                                    const isActive = selectedFeature === globalIndex || (hoveredFeature === globalIndex && selectedFeature === null);
                                                    const isSelected = selectedFeature === globalIndex;
                                                    return (
                                                        <motion.div
                                                            key={globalIndex}
                                                            className={`feature-card-compact ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
                                                            data-feature={feature.feature}
                                                            variants={itemVariants}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 20 }}
                                                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                                                            onMouseEnter={() => {
                                                                setIsAutoRotating(false);
                                                                if (autoRotateIntervalRef.current) {
                                                                    clearInterval(autoRotateIntervalRef.current);
                                                                    autoRotateIntervalRef.current = null;
                                                                }
                                                                
                                                                if (selectedFeature === null) {
                                                                    setHoveredFeature(globalIndex);
                                                                }
                                                            }}
                                                            onMouseLeave={() => {
                                                                if (selectedFeature === null) {
                                                                    setHoveredFeature(null);
                                                                }
                                                            }}
                                                            onClick={() => {
                                                                setIsAutoRotating(false);
                                                                if (autoRotateIntervalRef.current) {
                                                                    clearInterval(autoRotateIntervalRef.current);
                                                                    autoRotateIntervalRef.current = null;
                                                                }
                                                                
                                                                if (userInteractionTimeoutRef.current) {
                                                                    clearTimeout(userInteractionTimeoutRef.current);
                                                                    userInteractionTimeoutRef.current = null;
                                                                }
                                                                
                                                                if (selectedFeature === globalIndex) {
                                                                    setSelectedFeature(null);
                                                                    setHoveredFeature(null);
                                                                } else {
                                                                    setSelectedFeature(globalIndex);
                                                                    setHoveredFeature(globalIndex);
                                                                }
                                                                
                                                                userInteractionTimeoutRef.current = setTimeout(() => {
                                                                    setIsAutoRotating(true);
                                                                    autoRotateIndexRef.current = globalIndex;
                                                                }, 10000);
                                                            }}
                                                            whileHover={{ x: 6 }}
                                                        >
                                                            <div className="feature-icon-compact">
                                                                <FeatureIcon feature={feature.feature} isActive={isActive} />
                                                            </div>
                                                            <div className="feature-content-compact">
                                                                <h3 className="feature-title-compact">{feature.title}</h3>
                                                                <motion.p 
                                                                    className="feature-description-compact"
                                                                    animate={isActive ? { opacity: 1 } : { opacity: 0.6 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    {feature.description}
                                                                </motion.p>
                                                            </div>
                                                            {isSelected && (
                                                                <motion.div
                                                                    className="feature-selected-indicator"
                                                                    initial={{ scale: 0, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    exit={{ scale: 0, opacity: 0 }}
                                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                                />
                                                            )}
                                                        </motion.div>
                                                    );
                                                })}
                                            </AnimatePresence>
                                        </div>

                                        <motion.button
                                            className="features-nav-btn features-nav-next"
                                            onClick={() => {
                                                setIsAutoRotating(false);
                                                if (autoRotateIntervalRef.current) {
                                                    clearInterval(autoRotateIntervalRef.current);
                                                    autoRotateIntervalRef.current = null;
                                                }
                                                setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
                                            }}
                                            disabled={currentPage === totalPages - 1}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </motion.button>
                                    </div>

                                    <div className="features-pagination">
                                        {Array.from({ length: totalPages }).map((_, i) => (
                                            <motion.button
                                                key={i}
                                                className={`features-page-dot ${currentPage === i ? 'active' : ''}`}
                                                onClick={() => {
                                                    setIsAutoRotating(false);
                                                    if (autoRotateIntervalRef.current) {
                                                        clearInterval(autoRotateIntervalRef.current);
                                                        autoRotateIntervalRef.current = null;
                                                    }
                                                    setCurrentPage(i);
                                                }}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}

                    <motion.div
                        className="features-demo"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: inView ? 1 : 0,
                            scale: isLaptopDocked ? 1 : 1.08,
                            y: isLaptopDocked ? -35 : 0
                        }}
                        transition={{
                            opacity: { duration: 0.8, delay: 0.2 },
                            scale: { duration: isLaptopDocked ? 1 : 0.8, ease: [0.4, 0, 0.2, 1] },
                            y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                            layout: { duration: 2, ease: [0.4, 0, 0.2, 1] }
                        }}
                    >
                        <div className="laptop-mockup">
                            <div className="laptop-screen">
                                <div className="laptop-header">
                                    <div className="laptop-camera" />
                                    <div className="laptop-speaker" />
                                </div>
                                <div className="laptop-content">
                                    <AnimatePresence mode="wait">
                                        {activeFeature ? (
                                            <motion.div
                                                key={`demo-${activeFeatureIndex}`}
                                                className="demo-content-wrapper"
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                            >
                                                <div
                                                    ref={demoContentRef}
                                                    className="demo-content"
                                                >
                                                    {renderDemo(activeFeature)}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                className="demo-placeholder"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <AnimatedPlaceholder />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="laptop-base" />
                        </div>
                    </motion.div>
                </div>

                {isMobile && showMobileFeatureNav && (
                    <div className="features-mobile-nav">
                        <span className="features-mobile-nav-title">Feature List</span>
                        <div className="features-mobile-nav-scroll">
                            {features.map((feature, index) => {
                                const isActive = selectedFeature === index || (selectedFeature === null && hoveredFeature === index);
                                return (
                                    <button
                                        key={feature.title}
                                        className={`features-mobile-nav-item ${isActive ? 'active' : ''}`}
                                        onClick={() => {
                                            setIsAutoRotating(false);
                                            if (autoRotateIntervalRef.current) {
                                                clearInterval(autoRotateIntervalRef.current);
                                                autoRotateIntervalRef.current = null;
                                            }
                                            setSelectedFeature(index);
                                            setHoveredFeature(index);
                                            userInteractionTimeoutRef.current = setTimeout(() => {
                                                setIsAutoRotating(true);
                                                    autoRotateIndexRef.current = index;
                                            }, 10000);
                                            setCurrentPage(Math.floor(index / FEATURES_PER_PAGE));
                                        }}
                                    >
                                        {feature.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Features;

