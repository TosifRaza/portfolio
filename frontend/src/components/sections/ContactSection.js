import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import Button from '../common/Button';
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

export default function ContactSection() {
  const { profile, contactSubmit } = useData();
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const email = profile?.email || '';
  const location = profile?.location || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    try {
      await contactSubmit(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind? Let's work together."
    >
      <div ref={ref} className="grid lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Contact info */}
        <motion.div
          className="lg:col-span-2"
          initial={animate ? { opacity: 0, x: -30 } : undefined}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-slate-100 mb-4">Let's connect</h3>
          <p className="text-slate-400 leading-relaxed mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
          </p>

          <div className="space-y-4">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-indigo-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm">{email}</p>
                </div>
              </a>
            )}

            {location && (
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-sm">{location}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          className="lg:col-span-3 glass rounded-xl p-6 md:p-8"
          onSubmit={handleSubmit}
          initial={animate ? { opacity: 0, x: 30 } : undefined}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Message Sent!</h3>
              <p className="text-slate-400 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
              <Button variant="outline" onClick={() => setStatus('idle')}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Email <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Message <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}

              <Button
                type="submit"
                loading={status === 'submitting'}
                icon={Send}
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>
            </>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
