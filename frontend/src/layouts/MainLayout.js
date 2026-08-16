import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import {
  Home,
  User,
  Code2,
  Briefcase,
  BookOpen,
  Mail,
  Menu,
  X,
  ArrowUp,
  Globe,
  MessageCircle,
  AtSign,
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { shouldAnimate } from '../utils/animations';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const getSocialIcon = (platform) => {
  const lower = (platform || '').toLowerCase();
  switch (lower) {
    case 'github': return Globe;
    case 'linkedin': return MessageCircle;
    case 'twitter':
    case 'x': return AtSign;
    default: return null;
  }
};

export default function MainLayout({ children }) {
  const { profile, socialLinks, loading, getSectionOrder, isSectionEnabled } = useData();
  const location = useLocation();
  const animate = shouldAnimate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const isHomePage = location.pathname === '/';

  const enabledNavItems = useMemo(() => {
    return navItems.filter((item) => isSectionEnabled(item.id));
  }, [isSectionEnabled]);

  const scrollToSection = useCallback((id) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // If still loading, show spinner (only on home page)
  if (loading && isHomePage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <LoadingSpinner size="lg" message="Loading portfolio..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-slate-200">
      {/* Header / Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <Link
              to="/"
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              {profile?.name || 'Portfolio'}
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isHomePage
                    ? 'text-indigo-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4 inline mr-1.5" />
                Home
              </Link>
              {enabledNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4 inline mr-1.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Social links (desktop) */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="hidden lg:flex items-center gap-2">
                {socialLinks.slice(0, 3).map((link, i) => {
                  const Icon = getSocialIcon(link.platform || link.name);
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors"
                      aria-label={link.platform || link.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
              initial={animate ? { opacity: 0, height: 0 } : undefined}
              animate={{ opacity: 1, height: 'auto' }}
              exit={animate ? { opacity: 0, height: 0 } : undefined}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4 space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                {enabledNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={animate ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            exit={animate ? { opacity: 0 } : undefined}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.
            </p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((link, i) => {
                  const Icon = getSocialIcon(link.platform || link.name);
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors"
                      aria-label={link.platform || link.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all z-40 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
            animate={{ opacity: 1, scale: 1 }}
            exit={animate ? { opacity: 0, scale: 0.8 } : undefined}
            whileHover={{ scale: 1.1 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
