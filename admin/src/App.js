import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Toast from './components/ui/Toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/content/ProfilePage';
import SkillsPage from './pages/content/SkillsPage';
import ProjectsPage from './pages/content/ProjectsPage';
import ExperiencePage from './pages/content/ExperiencePage';
import EducationPage from './pages/content/EducationPage';
import ServicesPage from './pages/content/ServicesPage';
import TestimonialsPage from './pages/content/TestimonialsPage';
import BlogPage from './pages/content/BlogPage';
import BlogForm from './pages/content/BlogForm';
import MessagesPage from './pages/content/MessagesPage';
import SocialLinksPage from './pages/content/SocialLinksPage';
import SectionsPage from './pages/settings/SectionsPage';
import ResumePage from './pages/settings/ResumePage';
import SettingsPage from './pages/settings/SettingsPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Toast />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="experience" element={<ExperiencePage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="testimonials" element={<TestimonialsPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/new" element={<BlogForm />} />
              <Route path="blog/edit/:id" element={<BlogForm />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="social-links" element={<SocialLinksPage />} />
              <Route path="sections" element={<SectionsPage />} />
              <Route path="resume" element={<ResumePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
