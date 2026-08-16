import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import EmptyState from '../common/EmptyState';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function EducationSection() {
  const { education } = useData();
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const educationList = Array.isArray(education) ? education : [];

  if (educationList.length === 0) {
    return (
      <SectionWrapper
        id="education"
        title="Education"
        subtitle="My academic background and qualifications."
      >
        <EmptyState
          icon={GraduationCap}
          title="No education listed yet"
          description="Education details will appear here once they are added."
        />
      </SectionWrapper>
    );
  }

  const formatDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return `${date.month || ''} ${date.year || ''}`.trim();
  };

  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="My academic background and qualifications."
    >
      <div ref={ref} className="max-w-4xl mx-auto space-y-6">
        {educationList.map((edu, index) => {
          const institution = edu.institution || edu.school || edu.university || 'Institution';
          const degree = edu.degree || edu.qualification || 'Degree';
          const field = edu.fieldOfStudy || edu.field || edu.major || '';
          const description = edu.description || edu.summary || '';
          const startDate = formatDate(edu.startDate || edu.from);
          const endDate = edu.current ? 'Present' : formatDate(edu.endDate || edu.to);
          const location = edu.location || '';
          const grade = edu.grade || edu.gpa || edu.score || '';
          const highlights = edu.highlights || edu.achievements || [];

          return (
            <motion.div
              key={edu._id || edu.id || index}
              className="glass rounded-xl p-6 glass-hover transition-all duration-300"
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-indigo-400" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-100">{degree}{field ? ` in ${field}` : ''}</h3>
                    <p className="text-indigo-300 font-medium mt-1">{institution}</p>

                    {description && (
                      <p className="text-sm text-slate-400 leading-relaxed mt-2">{description}</p>
                    )}

                    {/* Highlights / Achievements */}
                    {highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <Award className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{typeof item === 'string' ? item : item.title || item.text || ''}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-slate-500 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{startDate}{endDate ? ` — ${endDate}` : ''}</span>
                  </div>
                  {location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{location}</span>
                    </div>
                  )}
                  {grade && (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Award className="w-3.5 h-3.5" />
                      <span>{grade}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
