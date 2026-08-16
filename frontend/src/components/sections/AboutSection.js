import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../context/DataContext';
import { CheckCircle, Download, User } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import AnimatedCounter from '../common/AnimatedCounter';
import Button from '../common/Button';
import { shouldAnimate } from '../../utils/animations';

export default function AboutSection() {
  const { profile, resume } = useData();
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const bio = profile?.bio || profile?.description || '';
  const careerObjective = profile?.careerObjective || profile?.objective || '';
  const highlights = profile?.highlights || profile?.keyPoints || [];
  const stats = profile?.stats || [];

  const defaultStats = stats.length > 0
    ? stats
    : [
        { label: 'Years Experience', value: profile?.yearsExperience || 3, suffix: '+' },
        { label: 'Projects Completed', value: profile?.projectsCompleted || 25, suffix: '+' },
        { label: 'Technologies', value: profile?.technologiesCount || 15, suffix: '+' },
        { label: 'Client Satisfaction', value: profile?.clientSatisfaction || 100, suffix: '%' },
      ];

  const defaultHighlights = highlights.length > 0
    ? highlights
    : [
        'Experienced in building scalable web applications',
        'Strong focus on clean, maintainable code',
        'Passionate about user experience and performance',
        'Continuous learner and open-source contributor',
      ];

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="Get to know more about me, my background, and what drives me."
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image Column */}
        <motion.div
          className="flex justify-center"
          initial={animate ? { opacity: 0, x: -40 } : undefined}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-2xl blur-2xl" />
            {profile?.avatar || profile?.image ? (
              <img
                src={profile.avatar || profile.image}
                alt={profile?.name || 'About me'}
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl object-cover border-2 border-white/10"
                loading="lazy"
              />
            ) : (
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-purple-500/20 border-2 border-white/10 flex items-center justify-center">
                <User className="w-24 h-24 text-indigo-400/50" />
              </div>
            )}
            {/* Decorative dots */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 dot-pattern-bg rounded-xl opacity-30" />
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial={animate ? { opacity: 0, x: 40 } : undefined}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-slate-100 mb-4">
            {profile?.name ? `I'm ${profile.name}` : 'Who I Am'}
          </h3>

          {careerObjective && (
            <p className="text-indigo-300 font-medium mb-4">{careerObjective}</p>
          )}

          {bio && (
            <p className="text-slate-400 leading-relaxed mb-6 whitespace-pre-line">
              {bio}
            </p>
          )}

          {/* Highlights */}
          {defaultHighlights.length > 0 && (
            <div className="space-y-3 mb-8">
              {defaultHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={animate ? { opacity: 0, x: 20 } : undefined}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Resume download */}
          {resume?.url && (
            <Button
              variant="outline"
              icon={Download}
              onClick={() => window.open(resume.url, '_blank')}
            >
              Download Resume
            </Button>
          )}
        </motion.div>
      </div>

      {/* Statistics */}
      {defaultStats.length > 0 && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={animate ? { opacity: 0, y: 30 } : undefined}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {defaultStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 glass rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                <AnimatedCounter
                  end={stat.value || 0}
                  suffix={stat.suffix || ''}
                  prefix={stat.prefix || ''}
                />
              </div>
              <p className="text-slate-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
