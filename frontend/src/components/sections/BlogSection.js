import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import EmptyState from '../common/EmptyState';
import TechBadge from '../common/TechBadge';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function BlogSection() {
  const { blogPosts } = useData();
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const posts = Array.isArray(blogPosts) ? blogPosts : [];

  if (posts.length === 0) {
    return (
      <SectionWrapper
        id="blog"
        title="Blog"
        subtitle="Thoughts, tutorials, and insights on development."
      >
        <EmptyState
          icon={BookOpen}
          title="No blog posts yet"
          description="Blog posts will appear here once they are published."
        />
      </SectionWrapper>
    );
  }

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const readTime = (content) => {
    if (!content) return '';
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <SectionWrapper
      id="blog"
      title="Blog"
      subtitle="Thoughts, tutorials, and insights on development."
    >
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post, index) => {
          const title = post.title || 'Untitled Post';
          const slug = post.slug || post._id;
          const excerpt = post.excerpt || post.summary || post.description || '';
          const coverImage = post.coverImage || post.image || post.thumbnail;
          const author = post.author?.name || post.authorName || '';
          const category = post.category || post.tags?.[0] || '';
          const tags = post.tags || [];
          const date = post.publishedAt || post.createdAt || post.date;
          const content = post.content || post.body || '';
          const isFeatured = post.featured || post.isFeatured;

          return (
            <motion.article
              key={post._id || post.id || index}
              className="group glass rounded-xl overflow-hidden transition-all duration-300"
              initial={animate ? { opacity: 0, y: 30 } : undefined}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              {/* Cover image */}
              <Link to={`/blog/${slug}`} className="block">
                <div className="relative h-44 overflow-hidden bg-slate-800/50">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-slate-600" />
                    </div>
                  )}
                  {isFeatured && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Featured
                    </span>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                {/* Category & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {category && (
                    <TechBadge name={category} className="!bg-emerald-500/10 !text-emerald-300 !border-emerald-500/20" />
                  )}
                  {date && (
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(date)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <Link to={`/blog/${slug}`}>
                  <h3 className="text-lg font-semibold text-slate-100 line-clamp-2 mb-2 group-hover:text-indigo-300 transition-colors">
                    {title}
                  </h3>
                </Link>

                {/* Excerpt */}
                {excerpt && (
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">{excerpt}</p>
                )}

                {/* Footer: author, read time, arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {author && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {author}
                      </span>
                    )}
                    {content && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime(content)}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/blog/${slug}`}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    aria-label={`Read ${title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
