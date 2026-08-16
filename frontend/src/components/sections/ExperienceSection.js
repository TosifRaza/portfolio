import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import EmptyState from '../common/EmptyState';
import TechBadge from '../common/TechBadge';
import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function ExperienceSection() {
  const { experience } = useData();
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const experienceList = Array.isArray(experience) ? experience : [];

  if (experienceList.length === 0) {
    return (
      <SectionWrapper
        id="experience"
        title="Work Experience"
        subtitle="My professional journey and career highlights."
      >
        <EmptyState
          icon={Briefcase}
          title="No experience listed yet"
          description="Work experience will appear here once it is added."
        />
      </SectionWrapper>
    );
  }

  const formatDate = (date) => {
    if (!date) return 'Present';
    if (typeof date === 'string') return date;
    return `${date.month || ''} ${date.year || ''}`.trim();
  };

  return (
    <SectionWrapper
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and career highlights."
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/50 to-transparent transform md:-translate-x-1/2" />

          {experienceList.map((exp, index) => {
            const company = exp.company || exp.organization || 'Company';
            const role = exp.role || exp.position || exp.title || 'Role';
            const description = exp.description || exp.summary || '';
            const startDate = formatDate(exp.startDate || exp.from);
            const endDate = exp.current ? 'Present' : formatDate(exp.endDate || exp.to);
            const location = exp.location || '';
            const techStack = exp.technologies || exp.techStack || [];
            const companyUrl = exp.companyUrl || exp.website || '';
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp._id || exp.id || index}
                className={`relative flex items-start gap-8 mb-12 last:mb-0
                  ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
                  flex-row pl-8 md:pl-0
                `}
                initial={animate ? { opacity: 0, y: 30 } : undefined}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#0a0a0f] transform md:-translate-x-1/2 mt-2 z-10 shadow-lg shadow-indigo-500/50" />

                {/* Content card */}
                <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className="glass rounded-xl p-6 glass-hover">
                    {/* Date range */}
                    <div className={`flex items-center gap-2 text-sm text-slate-500 mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{startDate} — {endDate}</span>
                    </div>

                    {/* Role */}
                    <h3 className="text-lg font-semibold text-slate-100 mb-1">{role}</h3>

                    {/* Company */}
                    <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      {companyUrl ? (
                        <a
                          href={companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-300 hover:text-indigo-200 font-medium inline-flex items-center gap-1"
                        >
                          {company}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-indigo-300 font-medium">{company}</span>
                      )}
                    </div>

                    {/* Location */}
                    {location && (
                      <div className={`flex items-center gap-1.5 text-sm text-slate-500 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <MapPin className="w-3.5 h-3.5" />
                        {location}
                      </div>
                    )}

                    {/* Description */}
                    {description && (
                      <p className={`text-sm text-slate-400 leading-relaxed mb-3 ${isLeft ? 'md:text-right' : ''}`}>{description}</p>
                    )}

                    {/* Tech stack */}
                    {techStack.length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        {techStack.map((tech, i) => (
                          <TechBadge key={i} name={typeof tech === 'string' ? tech : tech.name} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
