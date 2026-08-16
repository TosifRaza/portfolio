import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ArrowDown, Download, ExternalLink, Globe, MessageCircle, AtSign, Mail, MapPin, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import TechBadge from '../common/TechBadge';
import SEOHelmet from '../common/SEOHelmet';
import { shouldAnimate } from '../../utils/animations';

export default function HeroSection() {
  const { profile, settings, socialLinks, resume, sections, isSectionEnabled } = useData();
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const gridRef = useRef(null);

  const titles = useMemo(() => {
    if (!profile) return ['Developer'];
    const roles = [profile.title, profile.role].filter(Boolean);
    return roles.length > 0 ? roles : ['Developer'];
  }, [profile]);

  useEffect(() => {
    const currentTitle = titles[currentRoleIndex] || '';
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      if (!shouldAnimate()) {
        setTypedText(currentTitle);
        return;
      }

      if (!isDeleting) {
        setTypedText(currentTitle.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentTitle.length) {
          timeout = setTimeout(() => { isDeleting = true; type(); }, 2000);
          return;
        }
        timeout = setTimeout(type, 80);
      } else {
        setTypedText(currentTitle.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
        timeout = setTimeout(type, 40);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [currentRoleIndex, titles]);

  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current || !shouldAnimate()) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    gridRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const siteName = settings?.siteName || profile?.name || 'Portfolio';
  const siteDescription = profile?.bio || profile?.description || '';

  const getSocialIcon = (platform) => {
    const lower = (platform || '').toLowerCase();
    switch (lower) {
      case 'github': return Globe;
      case 'linkedin': return MessageCircle;
      case 'twitter':
      case 'x': return AtSign;
      case 'email': return Mail;
      default: return ExternalLink;
    }
  };

  const techBadges = profile?.skills?.slice(0, 6) || [];

  const anim = shouldAnimate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <SEOHelmet title={siteName} description={siteDescription} />
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
        {/* Animated grid background */}
        <div className="absolute inset-0 hero-grid-bg" ref={gridRef} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" onMouseMove={handleMouseMove}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div
              variants={anim ? containerVariants : undefined}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              {/* Availability badge */}
              {profile?.available !== undefined && (
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${profile.available ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${profile.available ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                  </span>
                  <span className="text-sm text-slate-300">
                    {profile.available ? 'Available for work' : 'Not available'}
                  </span>
                </motion.div>
              )}

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                <span className="text-slate-100">Hi, I'm </span>
                <span className="gradient-text">{profile?.name || 'Developer'}</span>
              </motion.h1>

              {/* Typed title */}
              <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-medium">
                  {typedText}
                </span>
                <span className="inline-block w-0.5 h-8 bg-indigo-500 animate-pulse" />
              </motion.div>

              {/* Description */}
              <motion.p variants={itemVariants} className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                {profile?.bio || profile?.description || profile?.headline || 'Building exceptional digital experiences with modern technologies.'}
              </motion.p>

              {/* Location */}
              {profile?.location && (
                <motion.div variants={itemVariants} className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('projects')}
                  icon={ArrowDown}
                >
                  Explore Work
                </Button>
                {resume?.url && (
                  <Button
                    variant="outline"
                    size="lg"
                    icon={Download}
                    onClick={() => window.open(resume.url, '_blank')}
                  >
                    Download Resume
                  </Button>
                )}
              </motion.div>

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <motion.div variants={itemVariants} className="mt-8 flex items-center gap-3">
                  {socialLinks.map((link, i) => {
                    const Icon = getSocialIcon(link.platform || link.name);
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-200"
                        aria-label={link.platform || link.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>

            {/* Right side - Avatar */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={anim ? { opacity: 0, scale: 0.8 } : undefined}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-2xl blur-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl opacity-20" />

                {profile?.avatar || profile?.image ? (
                  <img
                    src={profile.avatar || profile.image}
                    alt={profile?.name || 'Profile'}
                    className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl object-cover border-2 border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-purple-500/20 border-2 border-white/10 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl font-bold gradient-text">
                      {(profile?.name || 'D')[0].toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Floating tech badges */}
                {techBadges.length > 0 && (
                  <>
                    <motion.div
                      className="absolute -top-3 -right-3 glass px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300"
                      animate={anim ? { y: [-5, 5, -5] } : undefined}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {techBadges[0]}
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-3 -left-3 glass px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300"
                      animate={anim ? { y: [5, -5, 5] } : undefined}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      {techBadges[1] || 'Code'}
                    </motion.div>
                    <motion.div
                      className="absolute top-1/2 -right-8 glass px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 hidden sm:block"
                      animate={anim ? { x: [-3, 3, -3] } : undefined}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      {techBadges[2] || 'Build'}
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={anim ? { y: [0, 8, 0] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
              aria-label="Scroll to next section"
            >
              <span className="text-xs">Scroll</span>
              <ChevronRight className="w-5 h-5 rotate-90" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
