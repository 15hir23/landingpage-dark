import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // More responsive spring configuration - higher stiffness for faster response
    const springConfig = { damping: 25, stiffness: 1200, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Check for interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.feature-card-compact') ||
                target.closest('.btn-primary') ||
                target.closest('.btn-secondary') ||
                target.closest('.nav-links a') ||
                target.closest('.hero-actions button') ||
                target.closest('.cta-button') ||
                target.closest('.cta-input') ||
                target.style.cursor === 'pointer' ||
                getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver, true);
        document.addEventListener('mouseout', handleMouseOut, true);

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver, true);
            document.removeEventListener('mouseout', handleMouseOut, true);
            document.body.style.cursor = 'auto';
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <div className="cursor-dot" />
                <div className="cursor-ring" />
            </motion.div>

            {/* Trailing dots */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="cursor-trail"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                    }}
                />
            ))}
        </>
    );
};

export default CustomCursor;

