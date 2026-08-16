import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { shouldAnimate } from '../../utils/animations';

export default function SectionWrapper({ children, id, className = '', title, subtitle, titleAlign = 'center' }) {
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 relative ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            className={`mb-12 md:mb-16 ${titleAlign === 'center' ? 'text-center' : 'text-left'}`}
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
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
            <div className={`mt-4 h-1 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full ${titleAlign === 'center' ? 'mx-auto' : ''}`} />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}