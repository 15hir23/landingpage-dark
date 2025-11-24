import React from 'react';
import { motion } from 'framer-motion';
import './GradientOrbs.css';

const GradientOrbs = ({ mousePosition }) => {
    const orbVariants = {
        animate: {
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="hero-background">
            {/* Subtle single orb for depth */}
            <motion.div
                className="gradient-orb orb-1"
                variants={orbVariants}
                animate="animate"
                style={{
                    x: mousePosition.x * 0.3,
                    y: mousePosition.y * 0.3,
                    filter: 'blur(150px)',
                    opacity: 0.15
                }}
            />
        </div>
    );
};

export default GradientOrbs;

