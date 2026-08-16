import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { blogApi } from '../api/endpoints';
import SEOHelmet from '../components/common/SEOHelmet';
import TechBadge from '../components/common/TechBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { ArrowLeft, Calendar, Clock, User, BookOpen } from 'lucide-react';
import { shouldAnimate } from '../utils/animations';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const animate = shouldAnimate();

  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogApi.getBySlug(slug);
        const data = response?.data || response;
        if (!cancelled) setPost(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Post not found.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPost();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading article..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Post Not Found</h2>
          <p className="text-slate-400 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link to="/">
            <Button variant="outline" icon={ArrowLeft}>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = post.title || 'Untitled Post';
  const excerpt = post.excerpt || post.summary || post.description || '';
  const content = post.content || post.body || '';
  const coverImage = post.coverImage || post.image || post.thumbnail;
  const author = post.author?.name || post.authorName || 'Admin';
  const authorAvatar = post.author?.avatar || post.authorImage || '';
  const category = post.category || post.tags?.[0] || '';
  const tags = post.tags || [];
  const date = post.publishedAt || post.createdAt || post.date;
  const updatedAt = post.updatedAt;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const formattedUpdated = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const readTime = content
    ? `${Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)} min read`
    : '';

  return (
    <>
      <SEOHelmet title={`${title} | Blog`} description={excerpt} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back button */}
        <motion.div
          initial={animate ? { opacity: 0, x: -20 } : undefined}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
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
              className="w-full h-56 md:h-72 object-cover"
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
          {/* Category */}
          {category && (
            <TechBadge name={category} className="!bg-emerald-500/10 !text-emerald-300 !border-emerald-500/20 mb-4 inline-flex" />
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-4 leading-tight">{title}</h1>
          {excerpt && (
            <p className="text-lg text-slate-400 leading-relaxed">{excerpt}</p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/5 text-sm text-slate-500">
            {/* Author */}
            <div className="flex items-center gap-2">
              {authorAvatar ? (
                <img src={authorAvatar} alt={author} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-300">{author.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <span className="text-slate-300 font-medium">{author}</span>
            </div>

            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            )}

            {readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            )}
          </div>

          {formattedUpdated && (
            <p className="text-xs text-slate-600 mt-2">Last updated: {formattedUpdated}</p>
          )}
        </motion.div>

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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <motion.div
            className="mt-10 pt-6 border-t border-white/5"
            initial={animate ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500 mr-1">Tags:</span>
              {tags.map((tag, i) => (
                <TechBadge key={i} name={typeof tag === 'string' ? tag : tag.name} />
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </>
  );
}
