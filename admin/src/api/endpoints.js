// import api from './axios';

// export const authApi = {
//   login: (data) => api.post('/auth/login', data),
//   getMe: () => api.get('/auth/me'),
//   updateProfile: (data) => api.put('/auth/profile', data),
// };

// export const profileApi = {
//   get: () => api.get('/profile'),
//   update: (data) => api.put('/profile', data),
//   updateStatistics: (data) => api.put('/profile/statistics', data),
//   updateHighlights: (data) => api.put('/profile/highlights', data),
// };

// export const skillsApi = {
//   getAll: () => api.get('/skills'),
//   getById: (id) => api.get(`/skills/${id}`),
//   create: (data) => api.post('/skills', data),
//   update: (id, data) => api.put(`/skills/${id}`, data),
//   delete: (id) => api.delete(`/skills/${id}`),
//   reorder: (items) => api.put('/skills/reorder', { items }),
// };

// export const projectsApi = {
//   getAll: (params) => api.get('/projects', { params }),
//   getBySlug: (slug) => api.get(`/projects/${slug}`),
//   create: (formData) =>
//     api.post('/projects', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   update: (id, formData) =>
//     api.put(`/projects/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   delete: (id) => api.delete(`/projects/${id}`),
//   togglePublish: (id) => api.patch(`/projects/${id}/publish`),
//   toggleFeatured: (id) => api.patch(`/projects/${id}/feature`),
//   reorder: (items) => api.put('/projects/reorder', { items }),
// };

// export const experienceApi = {
//   getAll: () => api.get('/experience'),
//   create: (data) => api.post('/experience', data),
//   update: (id, data) => api.put(`/experience/${id}`, data),
//   delete: (id) => api.delete(`/experience/${id}`),
//   reorder: (items) => api.put('/experience/reorder', { items }),
// };

// export const educationApi = {
//   getAll: () => api.get('/education'),
//   create: (data) => api.post('/education', data),
//   update: (id, data) => api.put(`/education/${id}`, data),
//   delete: (id) => api.delete(`/education/${id}`),
//   reorder: (items) => api.put('/education/reorder', { items }),
// };

// export const servicesApi = {
//   getAll: () => api.get('/services'),
//   create: (data) => api.post('/services', data),
//   update: (id, data) => api.put(`/services/${id}`, data),
//   delete: (id) => api.delete(`/services/${id}`),
//   reorder: (items) => api.put('/services/reorder', { items }),
// };

// export const testimonialsApi = {
//   getAll: () => api.get('/testimonials'),
//   create: (data) => api.post('/testimonials', data),
//   update: (id, data) => api.put(`/testimonials/${id}`, data),
//   delete: (id) => api.delete(`/testimonials/${id}`),
//   reorder: (items) => api.put('/testimonials/reorder', { items }),
// };

// export const blogApi = {
//   getAll: (params) => api.get('/blog', { params }),
//   getBySlug: (slug) => api.get(`/blog/${slug}`),
//   create: (formData) =>
//     api.post('/blog', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   update: (id, formData) =>
//     api.put(`/blog/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   delete: (id) => api.delete(`/blog/${id}`),
//   togglePublish: (id) => api.patch(`/blog/${id}/publish`),
// };

// export const messagesApi = {
//   getAll: (params) => api.get('/messages', { params }),
//   getById: (id) => api.get(`/messages/${id}`),
//   getCounts: () => api.get('/messages/counts'),
//   updateStatus: (id, status) => api.put(`/messages/${id}/status`, { status }),
//   reply: (id, reply) => api.put(`/messages/${id}/reply`, { reply }),
//   delete: (id) => api.delete(`/messages/${id}`),
// };

// export const socialLinksApi = {
//   getAll: () => api.get('/social-links'),
//   create: (data) => api.post('/social-links', data),
//   update: (id, data) => api.put(`/social-links/${id}`, data),
//   delete: (id) => api.delete(`/social-links/${id}`),
//   reorder: (items) => api.put('/social-links/reorder', { items }),
// };

// export const settingsApi = {
//   get: () => api.get('/settings'),
//   update: (data) => api.put('/settings', data),
// };

// export const sectionsApi = {
//   get: () => api.get('/sections'),
//   update: (sections) => api.put('/sections', sections),
//   reorder: (items) => api.put('/sections/reorder', { items }),
// };

// export const resumeApi = {
//   upload: (formData) =>
//     api.post('/resume', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   get: () => api.get('/resume'),
//   getAll: () => api.get('/resume/all'),
//   delete: (id) => api.delete(`/resume/${id}`),
//   publish: (id) => api.patch(`/resume/${id}/publish`),
// };

// export const analyticsApi = {
//   track: (data) => api.post('/analytics/track', data),
//   get: (params) => api.get('/analytics', { params }),
//   getDashboard: () => api.get('/analytics/dashboard'),
// };
import api from './axios';

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const profileApi = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  updateStatistics: (data) => api.put('/profile/statistics', data),
  updateHighlights: (data) => api.put('/profile/highlights', data),
};

export const skillsApi = {
  getAll: () => api.get('/skills'),
  getById: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
  reorder: (items) => api.put('/skills/reorder', { items }),
};

export const projectsApi = {
  getAll: (params) => api.get('/projects', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  togglePublish: (id) => api.patch(`/projects/${id}/publish`),
  toggleFeatured: (id) => api.patch(`/projects/${id}/feature`),
  reorder: (items) => api.put('/projects/reorder', { items }),
};

export const experienceApi = {
  getAll: () => api.get('/experience'),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
  reorder: (items) => api.put('/experience/reorder', { items }),
};

export const educationApi = {
  getAll: () => api.get('/education'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`),
  reorder: (items) => api.put('/education/reorder', { items }),
};

export const servicesApi = {
  getAll: () => api.get('/services'),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  reorder: (items) => api.put('/services/reorder', { items }),
};

export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
  reorder: (items) => api.put('/testimonials/reorder', { items }),
};

export const blogApi = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
  togglePublish: (id) => api.patch(`/blog/${id}/publish`),
};

export const messagesApi = {
  getAll: (params) => api.get('/messages', { params }),
  getById: (id) => api.get(`/messages/${id}`),
  getCounts: () => api.get('/messages/counts'),
  updateStatus: (id, status) => api.put(`/messages/${id}/status`, { status }),
  reply: (id, reply) => api.put(`/messages/${id}/reply`, { reply }),
  delete: (id) => api.delete(`/messages/${id}`),
};

export const socialLinksApi = {
  getAll: () => api.get('/social-links'),
  create: (data) => api.post('/social-links', data),
  update: (id, data) => api.put(`/social-links/${id}`, data),
  delete: (id) => api.delete(`/social-links/${id}`),
  reorder: (items) => api.put('/social-links/reorder', { items }),
};

export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export const sectionsApi = {
  get: () => api.get('/sections'),
  update: (sections) => api.put('/sections', sections),
  reorder: (items) => api.put('/sections/reorder', { items }),
};

export const resumeApi = {
  upload: (formData) =>
    api.post('/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  get: () => api.get('/resume'),
  getAll: () => api.get('/resume/all'),
  delete: (id) => api.delete(`/resume/${id}`),
  publish: (id) => api.patch(`/resume/${id}/publish`),
};

export const analyticsApi = {
  track: (data) => api.post('/analytics/track', data),
  get: (params) => api.get('/analytics', { params }),
  getDashboard: () => api.get('/analytics/dashboard'),
};