import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';
import { shouldAnimate } from '../utils/animations';

export default function NotFoundPage() {
  const animate = shouldAnimate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button icon={Home}>Go Home</Button>
          </Link>
          <Button variant="outline" icon={ArrowLeft} onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
