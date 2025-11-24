import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './StatsCounter.css';

const StatsCounter = ({ target, label, suffix = '' }) => {
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const count = useMotionValue(0);
    const rounded = useSpring(count, {
        damping: 50,
        stiffness: 100
    });

    useEffect(() => {
        if (inView) {
            count.set(target);
        }
    }, [inView, target, count]);

    const displayValue = useTransform(rounded, (latest) => {
        if (target < 1) {
            return `$${latest.toFixed(1)}${suffix}`;
        }
        return `${Math.floor(latest)}${suffix}`;
    });

    return (
        <div className="stat-item" ref={ref}>
            <motion.div className="stat-value">
                {displayValue}
            </motion.div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

export default StatsCounter;

