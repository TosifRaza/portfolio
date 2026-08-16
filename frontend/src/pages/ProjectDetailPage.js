import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { projectsApi } from '../api/endpoints';
import SEOHelmet from '../components/common/SEOHelmet';
import TechBadge from '../components/common/TechBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { ArrowLeft, Code, ExternalLink, FolderOpen, Calendar, Star } from 'lucide-react';
import { shouldAnimate } from '../utils/animations';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const animate = shouldAnimate();

  useEffect(() => {
    let cancelled = false;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsApi.getBySlug(slug);
        const data = response?.data || response;
        if (!cancelled) setProject(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Project not found.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProject();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading project..." />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <FolderOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Project Not Found</h2>
          <p className="text-slate-400 mb-6">{error || 'The project you are looking for does not exist.'}</p>
          <Link to="/">
            <Button variant="outline" icon={ArrowLeft}>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = project.title || project.name || 'Untitled Project';
  const description = project.description || project.summary || '';
  const content = project.content || project.body || project.longDescription || '';
  const coverImage = project.coverImage || project.image || project.thumbnail;
  const techStack = project.technologies || project.techStack || project.tags || [];
  const githubUrl = project.github || project.githubUrl;
  const liveUrl = project.liveUrl || project.demoUrl || project.url;
  const category = project.category || project.type || '';
  const createdAt = project.createdAt || project.date;
  const isFeatured = project.featured || project.isFeatured;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <>
      <SEOHelmet title={`${title} | Portfolio`} description={description} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back button */}
        <motion.div
          initial={animate ? { opacity: 0, x: -20 } : undefined}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Cover image */}
        {coverImage && (
          <motion.div
            className="rounded-xl overflow-hidden mb-8"
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={coverImage}
              alt={title}
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star className="w-3 h-3" />
                Featured
              </span>
            )}
            {category && (
              <TechBadge name={category} />
            )}
            {formattedDate && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">{title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed">{description}</p>
        </motion.div>

        {/* Action buttons */}
        {(githubUrl || liveUrl) && (
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" icon={Code}>View Source</Button>
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <Button icon={ExternalLink}>Live Demo</Button>
              </a>
            )}
          </motion.div>
        )}

        {/* Tech stack */}
        {techStack.length > 0 && (
          <motion.div
            className="mb-10"
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <TechBadge key={i} name={typeof tech === 'string' ? tech : tech.name} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Content */}
        {content && (
          <motion.div
            className="prose prose-invert max-w-none
              prose-headings:text-slate-100 prose-headings:font-bold
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-img:rounded-xl
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:text-slate-300
              prose-blockquote:border-indigo-500 prose-blockquote:text-slate-400
              prose-hr:border-white/10
              prose-strong:text-slate-200
            "
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        )}
      </article>
    </>
  );
}
