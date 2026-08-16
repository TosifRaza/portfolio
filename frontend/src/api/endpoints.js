import api from './axios';

export const profileApi = {
  get: () => api.get('/profile'),
};

export const skillsApi = {
  get: (category) => api.get('/skills', { params: category ? { category } : {} }),
};

export const projectsApi = {
  getAll: (params) => api.get('/projects', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
};

export const experienceApi = {
  get: () => api.get('/experience'),
};

export const educationApi = {
  get: () => api.get('/education'),
};

export const servicesApi = {
  get: () => api.get('/services'),
};

export const testimonialsApi = {
  get: () => api.get('/testimonials'),
};

export const blogApi = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
};

export const contactApi = {
  submit: (data) => api.post('/contact', data),
};

export const socialLinksApi = {
  get: () => api.get('/social-links'),
};

export const settingsApi = {
  get: () => api.get('/settings'),
};

export const sectionsApi = {
  get: () => api.get('/sections'),
};

export const resumeApi = {
  get: () => api.get('/resume'),
};
