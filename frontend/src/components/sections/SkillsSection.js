import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import EmptyState from '../common/EmptyState';
import { Code2, Sparkles } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function SkillsSection() {
  const { skills } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skillsList = Array.isArray(skills) ? skills : (skills?.items || []);

  const categories = useMemo(() => {
    const cats = ['All'];
    skillsList.forEach((skill) => {
      const cat = skill.category || skill.type || 'Other';
      if (!cats.includes(cat)) cats.push(cat);
    });
    return cats;
  }, [skillsList]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skillsList;
    return skillsList.filter(
      (s) => (s.category || s.type || 'Other') === activeCategory
    );
  }, [skillsList, activeCategory]);

  if (skillsList.length === 0) {
    return (
      <SectionWrapper
        id="skills"
        title="Skills & Expertise"
        subtitle="Technologies and tools I work with."
      >
        <EmptyState
          icon={Code2}
          title="No skills listed yet"
          description="Skills will appear here once they are added."
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="skills"
      title="Skills & Expertise"
      subtitle="Technologies and tools I work with."
    >
      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
              ${activeCategory === cat
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25'
                : 'glass text-slate-400 hover:text-white hover:border-indigo-500/30'
              }`
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill, index) => {
          const name = skill.name || skill.title || 'Unknown';
          const proficiency = skill.proficiency || skill.level || 0;
          const category = skill.category || skill.type || 'Other';
          const letter = name.charAt(0).toUpperCase();

          return (
            <motion.div
              key={skill._id || skill.id || index}
              className="glass glass-hover rounded-xl p-5 transition-all duration-300"
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {/* First-letter icon */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center text-lg font-bold text-indigo-300 flex-shrink-0">
                  {letter}
                </div>
                <div className="min-w-0">
                  <h4 className="text-slate-200 font-semibold line-clamp-1">{name}</h4>
                  <span className="text-xs text-slate-500">{category}</span>
                </div>
              </div>

              {/* Proficiency bar */}
              {proficiency > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-500">Proficiency</span>
                    <span className="text-xs text-slate-400 font-medium">{proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      initial={animate ? { width: 0 } : undefined}
                      animate={inView ? { width: `${proficiency}%` } : undefined}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
