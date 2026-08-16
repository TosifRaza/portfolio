import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text inline-block">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-1 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mx-auto" />
    </motion.div>
  );
}