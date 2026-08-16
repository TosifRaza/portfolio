import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import TechBadge from '../common/TechBadge';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import { FolderOpen, Code, ExternalLink, Star, ArrowRight } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function ProjectsSection() {
  const { projects } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const projectsList = Array.isArray(projects) ? projects : [];

  const categories = useMemo(() => {
    const cats = ['All'];
    projectsList.forEach((project) => {
      const cat = project.category || project.type || 'Other';
      if (!cats.includes(cat)) cats.push(cat);
    });
    return cats;
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsList;
    return projectsList.filter(
      (p) => (p.category || p.type || 'Other') === activeCategory
    );
  }, [projectsList, activeCategory]);

  if (projectsList.length === 0) {
    return (
      <SectionWrapper
        id="projects"
        title="Featured Projects"
        subtitle="A selection of my recent work and personal projects."
      >
        <EmptyState
          icon={FolderOpen}
          title="No projects yet"
          description="Projects will be displayed here once they are added."
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="A selection of my recent work and personal projects."
    >
      {/* Category filter */}
      {categories.length > 2 && (
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
      )}

      {/* Project cards grid */}
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const title = project.title || project.name || 'Untitled Project';
          const description = project.description || project.summary || '';
          const slug = project.slug || project._id;
          const techStack = project.technologies || project.techStack || project.tags || [];
          const githubUrl = project.github || project.githubUrl;
          const liveUrl = project.liveUrl || project.demoUrl || project.url;
          const coverImage = project.coverImage || project.image || project.thumbnail;
          const isFeatured = project.featured || project.isFeatured;
          const category = project.category || project.type || '';

          return (
            <motion.div
              key={project._id || project.id || index}
              className="group relative glass rounded-xl overflow-hidden transition-all duration-300"
              initial={animate ? { opacity: 0, y: 30 } : undefined}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              {/* Cover image */}
              <div className="relative h-48 overflow-hidden bg-slate-800/50">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen className="w-12 h-12 text-slate-600" />
                  </div>
                )}

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-indigo-300 transition-colors"
                      aria-label="View source code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Code className="w-5 h-5" />
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-indigo-300 transition-colors"
                      aria-label="View live demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {slug && (
                    <Link
                      to={`/projects/${slug}`}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-indigo-300 transition-colors"
                      aria-label="View details"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {category}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-100 line-clamp-1 mb-2 group-hover:text-indigo-300 transition-colors">
                  {slug ? (
                    <Link to={`/projects/${slug}`} className="hover:underline">
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">{description}</p>

                {/* Tech badges */}
                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.slice(0, 4).map((tech, i) => (
                      <TechBadge key={i} name={typeof tech === 'string' ? tech : tech.name} />
                    ))}
                    {techStack.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400">
                        +{techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
