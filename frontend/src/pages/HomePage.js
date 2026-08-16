import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';

const sectionComponents = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  services: ServicesSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  education: EducationSection,
  testimonials: TestimonialsSection,
  blog: BlogSection,
  contact: ContactSection,
};

export default function HomePage() {
  const { loading, error, getSectionOrder, isSectionEnabled } = useData();

  const sectionOrder = useMemo(() => getSectionOrder(), [getSectionOrder]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading portfolio..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Something went wrong</h2>
          <p className="text-slate-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {sectionOrder.map((sectionName) => {
        const SectionComponent = sectionComponents[sectionName];
        if (!SectionComponent || !isSectionEnabled(sectionName)) return null;
        return <SectionComponent key={sectionName} />;
      })}
    </>
  );
}
