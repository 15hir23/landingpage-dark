import React from 'react';
import { motion } from 'framer-motion';
import './FloatingCards.css';

const FloatingCards = () => {
    const cards = [
        {
            icon: '✓',
            iconType: 'success',
            title: 'New Match Found',
            text: '3 suppliers match your criteria',
            position: { top: '-20px', right: '-20px' },
            delay: 0
        },
        {
            icon: '⚡',
            iconType: 'alert',
            title: 'Price Alert',
            text: 'Steel prices dropped 8%',
            position: { bottom: '-20px', left: '-20px' },
            delay: 2
        }
    ];

    return (
        <>
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    className={`floating-card card-${index + 1} group relative bg-gradient-to-br from-dark-elevated to-dark-tertiary border border-white/20 rounded-2xl p-5 backdrop-blur-xl shadow-2xl cursor-pointer overflow-hidden`}
                    style={card.position}
                    initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -20, 0],
                        rotate: [0, 2, -2, 0],
                        rotateY: 0
                    }}
                    transition={{
                        delay: card.delay,
                        y: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        rotate: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    whileHover={{ scale: 1.15, rotate: 0, z: 50, boxShadow: '0 20px 60px rgba(0, 102, 255, 0.4)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className={`floating-icon ${card.iconType} w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg`}>
                            {card.icon}
                        </div>
                        <div className="floating-content">
                            <div className="floating-title text-sm font-bold text-white mb-1">{card.title}</div>
                            <div className="floating-text text-xs text-white/70">{card.text}</div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
        </>
    );
};

export default FloatingCards;

