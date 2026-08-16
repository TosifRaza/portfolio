import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, gradient = false, onClick, as = 'div', ...props }) {
  const Component = as;

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`
        rounded-xl p-6 transition-all duration-300
        ${gradient
          ? 'glass gradient-border'
          : 'glass glass-hover'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}