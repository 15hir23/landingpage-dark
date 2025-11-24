import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './DashboardPreview.css';

const DashboardPreview = () => {
    const datasets = useMemo(() => [
        {
            id: 'metals',
            shortLabel: 'Metals',
            title: 'Market Overview',
            subtitle: 'Industrial Metals · North America',
            statusLabel: 'Live',
            chartStyle: 'area',
            cards: {
                rfqs: { value: '47', trend: '+12% vs last week', tone: 'positive' },
                suppliers: { value: '1,247', trend: 'Verified', tone: 'neutral' },
                savings: { value: '$847K', trend: '+28% YoY', tone: 'positive' },
                users: { value: '3,482', trend: 'In Platform', tone: 'neutral' }
            },
            chartData: [
                { label: 'Jan', value: 58 },
                { label: 'Feb', value: 64 },
                { label: 'Mar', value: 71 },
                { label: 'Apr', value: 67 },
                { label: 'May', value: 75 },
                { label: 'Jun', value: 83 },
                { label: 'Jul', value: 79 },
                { label: 'Aug', value: 92 }
            ],
            legend: [
                { label: 'Spot Index', color: 'linear-gradient(90deg, #3b82f6, #a855f7)' }
            ]
        },
        {
            id: 'electronics',
            shortLabel: 'Electronics',
            title: 'Market Overview',
            subtitle: 'Semiconductors · APAC Suppliers',
            statusLabel: 'Syncing',
            chartStyle: 'dual-line',
            cards: {
                rfqs: { value: '62', trend: '+4 just today', tone: 'positive' },
                suppliers: { value: '982', trend: 'Onboarded', tone: 'neutral' },
                savings: { value: '$612K', trend: '+9% QoQ', tone: 'positive' },
                users: { value: '4,108', trend: 'Ops + Finance', tone: 'neutral' }
            },
            chartData: [
                { label: 'Jan', value: 42 },
                { label: 'Feb', value: 55 },
                { label: 'Mar', value: 61 },
                { label: 'Apr', value: 74 },
                { label: 'May', value: 69 },
                { label: 'Jun', value: 81 },
                { label: 'Jul', value: 88 },
                { label: 'Aug', value: 96 }
            ],
            secondaryChartData: [
                { label: 'Jan', value: 47 },
                { label: 'Feb', value: 53 },
                { label: 'Mar', value: 58 },
                { label: 'Apr', value: 63 },
                { label: 'May', value: 71 },
                { label: 'Jun', value: 78 },
                { label: 'Jul', value: 83 },
                { label: 'Aug', value: 88 }
            ],
            legend: [
                { label: 'Booking Demand', color: '#60a5fa' },
                { label: 'Supplier Capacity', color: '#facc15' }
            ]
        },
        {
            id: 'logistics',
            shortLabel: 'Logistics',
            title: 'Market Overview',
            subtitle: 'Global Freight · Multi-modal',
            statusLabel: 'Tracking',
            chartStyle: 'wave',
            chartTheme: {
                line: '#34d399',
                area: 'rgba(52, 211, 153, 0.18)',
                crest: '#6ee7b7'
            },
            cards: {
                rfqs: { value: '35', trend: 'Quiet morning', tone: 'neutral' },
                suppliers: { value: '712', trend: 'Preferred lanes', tone: 'neutral' },
                savings: { value: '$1.02M', trend: '+14% vs target', tone: 'positive' },
                users: { value: '2,214', trend: 'Ops teams', tone: 'neutral' }
            },
            chartData: [
                { label: 'Jan', value: 63 },
                { label: 'Feb', value: 59 },
                { label: 'Mar', value: 66 },
                { label: 'Apr', value: 70 },
                { label: 'May', value: 77 },
                { label: 'Jun', value: 73 },
                { label: 'Jul', value: 85 },
                { label: 'Aug', value: 90 }
            ],
            legend: [
                { label: 'Lane Cost Index', color: '#34d399' }
            ]
        }
    ], []);

    const [activeDataset, setActiveDataset] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDataset((prev) => (prev + 1) % datasets.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [datasets.length]);

    const dataset = datasets[activeDataset];
    const chartData = dataset.chartData;
    const chartWidth = 360;
    const chartHeight = 120;
    const topPadding = 16;
    const bottomPadding = 20;
    const horizontalPadding = 20;
    const usableHeight = chartHeight - topPadding - bottomPadding;
    const usableWidth = chartWidth - horizontalPadding * 2;
    const allValues = [
        ...dataset.chartData.map((point) => point.value),
        ...(dataset.secondaryChartData ? dataset.secondaryChartData.map((point) => point.value) : [])
    ];
    const maxValue = Math.max(...allValues) + 5;

    const buildPoints = (data = []) => {
        if (data.length === 1) {
            return data.map((point) => ({
                ...point,
                x: horizontalPadding + usableWidth / 2,
                y: chartHeight - bottomPadding - (point.value / maxValue) * usableHeight
            }));
        }
        return data.map((point, index) => {
            const x = horizontalPadding + (index / (data.length - 1)) * usableWidth;
            const y = chartHeight - bottomPadding - (point.value / maxValue) * usableHeight;
            return { ...point, x, y };
        });
    };

    const chartPoints = buildPoints(chartData);
    const secondaryPoints = dataset.secondaryChartData ? buildPoints(dataset.secondaryChartData) : null;

    const generateLinePath = (points = []) => points.reduce((acc, point, index) => {
        return acc + `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
    }, '');

    const generateAreaPath = (points = []) => {
        if (!points.length) return '';
        const line = generateLinePath(points);
        return `${line} L ${points[points.length - 1].x} ${chartHeight - bottomPadding} L ${points[0].x} ${chartHeight - bottomPadding} Z`;
    };

    const linePath = generateLinePath(chartPoints);
    const areaPath = generateAreaPath(chartPoints);

    const handleMouseMove = useCallback((event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    }, []);

    const rotateX = isHovered ? (0.5 - mousePos.y) * 12 : 0;
    const rotateY = isHovered ? (mousePos.x - 0.5) * 18 : 0;
    const hoverScale = isHovered ? 1.02 : 1;

    const cardVariants = {
        hover: {
            y: -8,
            transition: { duration: 0.3 }
        }
    };

    const renderChartContent = () => {
        switch (dataset.chartStyle) {
            case 'dual-line':
                return (
                    <>
                        <motion.path
                            className="chart-line-path dual primary"
                            d={generateLinePath(chartPoints)}
                            stroke="#60a5fa"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.1, ease: 'easeOut' }}
                        />
                        {secondaryPoints && (
                            <motion.path
                                className="chart-line-path dual secondary"
                                d={generateLinePath(secondaryPoints)}
                                stroke="#facc15"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
                            />
                        )}
                        {[chartPoints, secondaryPoints].filter(Boolean).map((points, groupIndex) => (
                            points.map((point, index) => (
                                <motion.circle
                                    key={`${groupIndex}-${point.label}`}
                                    cx={point.x}
                                    cy={point.y}
                                    r={4}
                                    className={`chart-point ${groupIndex === 0 ? 'primary' : 'secondary'}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 + index * 0.08 }}
                                />
                            ))
                        ))}
                    </>
                );
            case 'bar':
                return (
                    <>
                        {chartPoints.map((point, index) => {
                            const barWidth = Math.max(18, usableWidth / (chartPoints.length * 1.8));
                            return (
                                <motion.rect
                                    key={point.label}
                                    x={point.x - barWidth / 2}
                                    y={point.y}
                                    width={barWidth}
                                    height={chartHeight - bottomPadding - point.y}
                                    rx={barWidth / 3}
                                    className="chart-bar"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: chartHeight - bottomPadding - point.y, opacity: 1 }}
                                    transition={{ delay: 0.1 * index, duration: 0.6, ease: 'easeOut' }}
                                />
                            );
                        })}
                        <motion.path
                            className="chart-line-path overlay"
                            d={generateLinePath(chartPoints)}
                            stroke="rgba(255,255,255,0.4)"
                            strokeDasharray="6 6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        />
                    </>
                );
            case 'wave':
                return (
                    <>
                        <motion.path
                            className="chart-area-path wave"
                            d={areaPath}
                            style={{ fill: dataset.chartTheme?.area }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9 }}
                        />
                        <motion.path
                            className="chart-line-path wave"
                            d={linePath}
                            stroke={dataset.chartTheme?.line}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.1, ease: 'easeOut' }}
                        />
                        {chartPoints.map((point, index) => (
                            <motion.circle
                                key={`wave-point-${point.label}`}
                                cx={point.x}
                                cy={point.y}
                                r={4.5}
                                className="chart-point wave"
                                style={{ stroke: dataset.chartTheme?.line }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 180, damping: 16 }}
                            />
                        ))}
                        {chartPoints.map((point, index) => (
                            <motion.line
                                key={`wave-beam-${point.label}`}
                                x1={point.x}
                                y1={chartHeight - bottomPadding}
                                x2={point.x}
                                y2={point.y}
                                className="chart-wave-beam"
                                stroke={dataset.chartTheme?.crest}
                                initial={{ opacity: 0, y1: chartHeight - bottomPadding, y2: chartHeight - bottomPadding }}
                                animate={{ opacity: [0.2, 0.8, 0.2], y1: chartHeight - bottomPadding, y2: point.y }}
                                transition={{ delay: index * 0.1, duration: 1.6, repeat: Infinity, repeatDelay: chartPoints.length * 0.05 }}
                            />
                        ))}
                    </>
                );
            case 'area':
            default:
                return (
                    <>
                        <motion.path
                            className="chart-area-path"
                            d={areaPath}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <motion.path
                            className="chart-line-path"
                            d={linePath}
                            stroke="url(#marketLine)"
                            filter="url(#glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                        {chartPoints.map((point, index) => (
                            <motion.g key={point.label}>
                                <motion.circle
                                    cx={point.x}
                                    cy={point.y}
                                    r={5}
                                    className="chart-point"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1 * index + 0.4, type: 'spring', stiffness: 200, damping: 12 }}
                                />
                                <text x={point.x} y={point.y - 12} className="chart-point-value">
                                    {point.value}
                                </text>
                            </motion.g>
                        ))}
                    </>
                );
        }
    };

    const getTrendClass = (tone = 'neutral') => {
        if (tone === 'positive') return 'text-green-400';
        if (tone === 'negative') return 'text-rose-400';
        return 'text-white/65';
    };

    return (
        <div className="dashboard-preview-stage">
            <motion.div
                className="dashboard-preview relative bg-gradient-to-br from-dark-elevated to-dark-tertiary border border-white/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: hoverScale, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transformStyle: 'preserve-3d',
                    rotateX,
                    rotateY,
                    boxShadow: isHovered
                        ? `0 25px 80px rgba(0,0,0,0.55), 0 0 80px ${dataset.chartTheme?.line || dataset.color || '#3b82f6'}25`
                        : undefined
                }}
            >
                <div
                    className="dashboard-preview-glow"
                    style={{
                        opacity: isHovered ? 1 : 0.65,
                        background: `radial-gradient(circle at 20% 20%, ${dataset.chartTheme?.line || dataset.color || '#3b82f6'}33, transparent 60%)`
                    }}
                />
            <div className="dashboard-header">
                <div className="window-controls">
                    <span className="control-dot"></span>
                    <span className="control-dot"></span>
                    <span className="control-dot"></span>
                </div>
                <div className="dashboard-title">SourceSmart Dashboard</div>
            </div>
            <div className="dashboard-content">
                <motion.div
                    className="dashboard-card group bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <div className="card-label text-xs uppercase tracking-wider text-white/50 mb-2">Active RFQs</div>
                    <div className="card-value text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {dataset.cards.rfqs.value}
                    </div>
                    <div className={`card-trend text-sm font-semibold ${getTrendClass(dataset.cards.rfqs.tone)}`}>
                        {dataset.cards.rfqs.trend}
                    </div>
                </motion.div>
                <motion.div
                    className="dashboard-card group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <div className="card-label text-xs uppercase tracking-wider text-white/50 mb-2">Suppliers</div>
                    <div className="card-value text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        {dataset.cards.suppliers.value}
                    </div>
                    <div className={`card-trend text-sm font-semibold ${getTrendClass(dataset.cards.suppliers.tone)}`}>
                        {dataset.cards.suppliers.trend}
                    </div>
                </motion.div>
                <motion.div
                    className="dashboard-card group bg-gradient-to-br from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/20 transition-all"
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <div className="card-label text-xs uppercase tracking-wider text-white/50 mb-2">Cost Savings</div>
                    <div className="card-value text-3xl font-black bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {dataset.cards.savings.value}
                    </div>
                    <div className={`card-trend text-sm font-semibold ${getTrendClass(dataset.cards.savings.tone)}`}>
                        {dataset.cards.savings.trend}
                    </div>
                </motion.div>
                <motion.div
                    className="dashboard-card mobile-only group bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/20 transition-all"
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <div className="card-label text-xs uppercase tracking-wider text-white/50 mb-2">Active Users</div>
                    <div className="card-value text-3xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        {dataset.cards.users.value}
                    </div>
                    <div className={`card-trend text-sm font-semibold ${getTrendClass(dataset.cards.users.tone)}`}>
                        {dataset.cards.users.trend}
                    </div>
                </motion.div>
                <div className="dashboard-chart">
                    <div className="chart-header">
                        <div className="chart-heading">
                            <span>{dataset.title}</span>
                            <p className="chart-subtitle">{dataset.subtitle}</p>
                        </div>
                        <motion.span
                            className="chart-badge"
                            animate={{
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        >
                            {dataset.statusLabel}
                        </motion.span>
                    </div>
                    <div className="chart-dataset-switcher">
                        {datasets.map((entry, index) => (
                            <button
                                key={entry.id}
                                className={`dataset-pill ${index === activeDataset ? 'active' : ''}`}
                                type="button"
                                onClick={() => setActiveDataset(index)}
                            >
                                {entry.shortLabel}
                            </button>
                        ))}
                    </div>
                    <div className="chart-visual">
                        <svg
                            className="chart-canvas"
                            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                            role="img"
                            aria-label="Market pricing trend"
                        >
                            <defs>
                                <linearGradient id="marketLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                                <linearGradient id="marketArea" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
                                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                                </linearGradient>
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {[0, 1, 2, 3].map((row) => {
                                const y = topPadding + (row / 3) * usableHeight;
                                return (
                                    <line
                                        key={`grid-${row}`}
                                        x1={horizontalPadding}
                                        x2={chartWidth - horizontalPadding}
                                        y1={y}
                                        y2={y}
                                        className="chart-gridline"
                                    />
                                );
                            })}

                            {renderChartContent()}
                        </svg>

                        <div
                            className="chart-x-labels"
                            style={{ gridTemplateColumns: `repeat(${chartData.length}, 1fr)` }}
                        >
                            {chartData.map((point) => (
                                <span key={point.label}>{point.label}</span>
                            ))}
                        </div>
                    </div>
                    {dataset.legend && (
                        <div className="chart-legend">
                            {dataset.legend.map((item) => (
                                <span key={item.label} className="chart-legend-item">
                                    <span className="legend-swatch" style={{ background: item.color }}></span>
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </motion.div>
        </div>
    );
};

export default DashboardPreview;

