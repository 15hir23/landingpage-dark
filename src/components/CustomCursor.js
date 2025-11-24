import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    // Initialize cursor position to center of screen or current mouse position
    const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
    
    // More responsive spring configuration - higher stiffness for faster response
    const springConfig = { damping: 25, stiffness: 1200, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Initialize cursor position to center of viewport
        const initCursor = () => {
            cursorX.set(window.innerWidth / 2);
            cursorY.set(window.innerHeight / 2);
            setIsVisible(true);
        };
        
        // Initialize immediately
        initCursor();
        
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) {
                setIsVisible(true);
            }
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
    }, [cursorX, cursorY, isVisible]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${isVisible ? 'visible' : ''}`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
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

