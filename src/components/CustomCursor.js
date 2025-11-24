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
            // Track mouse position globally, including over iframes
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) {
                setIsVisible(true);
            }
        };
        
        // Also listen on document to catch events from iframes
        const moveCursorDocument = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) {
                setIsVisible(true);
            }
        };
        
        // Listen for mouse coordinates from iframe
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'cursor-move') {
                // Adjust coordinates if needed (iframe might have offset)
                const iframe = document.querySelector('iframe[src="/try.html"]');
                if (iframe) {
                    const rect = iframe.getBoundingClientRect();
                    // Coordinates from iframe are relative to iframe, need to add offset
                    cursorX.set(event.data.x + rect.left);
                    cursorY.set(event.data.y + rect.top);
                } else {
                    cursorX.set(event.data.x);
                    cursorY.set(event.data.y);
                }
                if (!isVisible) {
                    setIsVisible(true);
                }
            }
        };
        
        window.addEventListener('message', handleMessage);

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

        // Add listeners to both window and document for better iframe support
        window.addEventListener('mousemove', moveCursor, true);
        document.addEventListener('mousemove', moveCursorDocument, true);
        window.addEventListener('mousedown', handleMouseDown, true);
        window.addEventListener('mouseup', handleMouseUp, true);
        document.addEventListener('mouseover', handleMouseOver, true);
        document.addEventListener('mouseout', handleMouseOut, true);

        // Hide default cursor on body and html
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';
        
        // Also hide cursor on iframes
        const hideIframeCursor = () => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    if (iframe.contentDocument) {
                        iframe.contentDocument.body.style.cursor = 'none';
                        iframe.contentDocument.documentElement.style.cursor = 'none';
                    }
                } catch (e) {
                    // Cross-origin iframe, can't access
                }
            });
        };
        
        // Try to hide cursor in iframe after it loads
        setTimeout(hideIframeCursor, 1000);
        window.addEventListener('load', hideIframeCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor, true);
            document.removeEventListener('mousemove', moveCursorDocument, true);
            window.removeEventListener('mousedown', handleMouseDown, true);
            window.removeEventListener('mouseup', handleMouseUp, true);
            document.removeEventListener('mouseover', handleMouseOver, true);
            document.removeEventListener('mouseout', handleMouseOut, true);
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('load', hideIframeCursor);
            document.body.style.cursor = 'auto';
            document.documentElement.style.cursor = 'auto';
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

