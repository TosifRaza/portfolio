import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import EmptyState from '../common/EmptyState';
import { MessageSquare, ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function TestimonialsSection() {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const animate = shouldAnimate();

  const testimonialsList = Array.isArray(testimonials) ? testimonials : [];

  // Auto-rotate testimonials
  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
  }, [testimonialsList.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  }, [testimonialsList.length]);

  useEffect(() => {
    if (testimonialsList.length <= 1 || !animate) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [testimonialsList.length, next, animate]);

  if (testimonialsList.length === 0) {
    return (
      <SectionWrapper
        id="testimonials"
        title="Testimonials"
        subtitle="What people say about working with me."
      >
        <EmptyState
          icon={MessageSquare}
          title="No testimonials yet"
          description="Client testimonials will appear here once they are added."
        />
      </SectionWrapper>
    );
  }

  const current = testimonialsList[currentIndex];
  const name = current?.name || current?.author || 'Client';
  const role = current?.role || current?.position || current?.title || '';
  const company = current?.company || current?.organization || '';
  const text = current?.text || current?.content || current?.testimonial || '';
  const rating = current?.rating || current?.stars || 5;
  const avatar = current?.avatar || current?.image || '';

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
      />
    ));
  };

  return (
    <SectionWrapper
      id="testimonials"
      title="Testimonials"
      subtitle="What people say about working with me."
    >
      <div className="max-w-3xl mx-auto relative">
        {/* Quote icon */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Quote className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Testimonial card */}
        <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden min-h-[260px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="w-full"
              initial={animate ? { opacity: 0, x: 30 } : undefined}
              animate={{ opacity: 1, x: 0 }}
              exit={animate ? { opacity: 0, x: -30 } : undefined}
              transition={{ duration: 0.4 }}
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {renderStars(rating)}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-center text-base md:text-lg leading-relaxed mb-8 italic">
                &ldquo;{text}&rdquo;
              </p>

              {/* Author info */}
              <div className="flex items-center justify-center gap-4">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-2 border-white/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-indigo-300">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="text-left">
                  <p className="text-slate-100 font-semibold">{name}</p>
                  <p className="text-slate-500 text-sm">
                    {role}{company ? ` at ${company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {testimonialsList.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'bg-indigo-500 w-6'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
