// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import {
//   profileApi,
//   skillsApi,
//   projectsApi,
//   experienceApi,
//   educationApi,
//   servicesApi,
//   testimonialsApi,
//   blogApi,
//   contactApi,
//   socialLinksApi,
//   settingsApi,
//   sectionsApi,
//   resumeApi,
// } from '../api/endpoints';

// const DataContext = createContext(null);

// const initialState = {
//   profile: null,
//   skills: [],
//   projects: [],
//   experience: [],
//   education: [],
//   services: [],
//   testimonials: [],
//   blogPosts: [],
//   socialLinks: [],
//   settings: {},
//   sections: [],
//   resume: null,
//   loading: true,
//   error: null,
// };

// export function DataProvider({ children }) {
//   const [state, setState] = useState(initialState);

//   const fetchAllData = useCallback(async () => {
//     setState((prev) => ({ ...prev, loading: true, error: null }));

//     const fetches = [
//       { key: 'profile', fn: profileApi.get },
//       { key: 'skills', fn: skillsApi.get },
//       { key: 'projects', fn: () => projectsApi.getAll() },
//       { key: 'experience', fn: experienceApi.get },
//       { key: 'education', fn: educationApi.get },
//       { key: 'services', fn: servicesApi.get },
//       { key: 'testimonials', fn: testimonialsApi.get },
//       { key: 'blogPosts', fn: () => blogApi.getAll() },
//       { key: 'socialLinks', fn: socialLinksApi.get },
//       { key: 'settings', fn: settingsApi.get },
//       { key: 'sections', fn: sectionsApi.get },
//       { key: 'resume', fn: resumeApi.get },
//     ];

//     const results = await Promise.allSettled(
//       fetches.map(async ({ key, fn }) => {
//         const response = await fn();
//         return { key, data: response?.data || response };
//       })
//     );

//     const newState = { ...initialState, loading: false };
//     const errors = [];

//     results.forEach((result, index) => {
//       const key = fetches[index].key;
//       if (result.status === 'fulfilled') {
//         newState[key] = result.value.data;
//       } else {
//         errors.push(`${key}: ${result.reason?.message || 'Failed to load'}`);
//       }
//     });

//     if (errors.length === fetches.length) {
//       newState.error = 'Failed to load portfolio data. Please check your connection.';
//     }

//     setState(newState);
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   const isSectionEnabled = useCallback(
//     (sectionName) => {
//       if (!state.sections || state.sections.length === 0) return true;
//       const section = state.sections.find(
//         (s) => s.name?.toLowerCase() === sectionName.toLowerCase() || s.title?.toLowerCase() === sectionName.toLowerCase()
//       );
//       return section ? section.visible !== false && section.enabled !== false : true;
//     },
//     [state.sections]
//   );

//   const getSectionOrder = useCallback(() => {
//     if (!state.sections || state.sections.length === 0) {
//       return ['hero', 'about', 'skills', 'services', 'projects', 'experience', 'education', 'testimonials', 'blog', 'contact'];
//     }
//     return state.sections
//       .filter((s) => s.visible !== false && s.enabled !== false)
//       .map((s) => s.name || s.title);
//   }, [state.sections]);

//   const refetchSection = useCallback(async (sectionName) => {
//     const sectionMap = {
//       profile: profileApi.get,
//       skills: skillsApi.get,
//       projects: () => projectsApi.getAll(),
//       experience: experienceApi.get,
//       education: educationApi.get,
//       services: servicesApi.get,
//       testimonials: testimonialsApi.get,
//       blogPosts: () => blogApi.getAll(),
//       socialLinks: socialLinksApi.get,
//       settings: settingsApi.get,
//       sections: sectionsApi.get,
//       resume: resumeApi.get,
//     };

//     const fn = sectionMap[sectionName];
//     if (fn) {
//       try {
//         const response = await fn();
//         setState((prev) => ({
//           ...prev,
//           [sectionName]: response?.data || response,
//         }));
//       } catch (err) {
//         console.error(`Failed to refetch ${sectionName}:`, err);
//       }
//     }
//   }, []);

//   return (
//     <DataContext.Provider
//       value={{
//         ...state,
//         isSectionEnabled,
//         getSectionOrder,
//         refetchSection,
//         refetchAll: fetchAllData,
//         contactSubmit: contactApi.submit,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// }

// export function useData() {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// }
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  profileApi,
  skillsApi,
  projectsApi,
  experienceApi,
  educationApi,
  servicesApi,
  testimonialsApi,
  blogApi,
  contactApi,
  socialLinksApi,
  settingsApi,
  sectionsApi,
  resumeApi,
} from '../api/endpoints';

const DataContext = createContext(null);

const initialState = {
  profile: null,
  skills: [],
  projects: [],
  experience: [],
  education: [],
  services: [],
  testimonials: [],
  blogPosts: [],
  socialLinks: [],
  settings: {},
  sections: [],
  resume: null,
  loading: true,
  error: null,
};

export function DataProvider({ children }) {
  const [state, setState] = useState(initialState);

  const fetchAllData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const fetches = [
      { key: 'profile', fn: profileApi.get },
      { key: 'skills', fn: skillsApi.get },
      { key: 'projects', fn: () => projectsApi.getAll() },
      { key: 'experience', fn: experienceApi.get },
      { key: 'education', fn: educationApi.get },
      { key: 'services', fn: servicesApi.get },
      { key: 'testimonials', fn: testimonialsApi.get },
      { key: 'blogPosts', fn: () => blogApi.getAll() },
      { key: 'socialLinks', fn: socialLinksApi.get },
      { key: 'settings', fn: settingsApi.get },
      { key: 'sections', fn: sectionsApi.get },
      { key: 'resume', fn: resumeApi.get },
    ];

    const results = await Promise.allSettled(
      fetches.map(async ({ key, fn }) => {
        const response = await fn();
        return { key, data: response?.data || response };
      })
    );

    const newState = { ...initialState, loading: false };
    const errors = [];

    results.forEach((result, index) => {
      const key = fetches[index].key;
      if (result.status === 'fulfilled') {
        newState[key] = result.value.data;
      } else {
        errors.push(`${key}: ${result.reason?.message || 'Failed to load'}`);
      }
    });

    if (errors.length === fetches.length) {
      newState.error = 'Failed to load portfolio data. Please check your connection.';
    }

    setState(newState);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const isSectionEnabled = useCallback(
    (sectionName) => {
      if (!state.sections || state.sections.length === 0) return true;
      const section = state.sections.find(
        (s) => (s.sectionId || s.name || '').toLowerCase() === sectionName.toLowerCase()
      );
      return section ? section.enabled !== false : true;
    },
    [state.sections]
  );

  const getSectionOrder = useCallback(() => {
    if (!state.sections || state.sections.length === 0) {
      return ['hero', 'about', 'skills', 'services', 'projects', 'experience', 'education', 'testimonials', 'blog', 'contact'];
    }
    return state.sections
      .filter((s) => s.enabled !== false)
      .map((s) => (s.sectionId || s.name || s.title || '').toLowerCase());
  }, [state.sections]);

  const refetchSection = useCallback(async (sectionName) => {
    const sectionMap = {
      profile: profileApi.get,
      skills: skillsApi.get,
      projects: () => projectsApi.getAll(),
      experience: experienceApi.get,
      education: educationApi.get,
      services: servicesApi.get,
      testimonials: testimonialsApi.get,
      blogPosts: () => blogApi.getAll(),
      socialLinks: socialLinksApi.get,
      settings: settingsApi.get,
      sections: sectionsApi.get,
      resume: resumeApi.get,
    };

    const fn = sectionMap[sectionName];
    if (fn) {
      try {
        const response = await fn();
        setState((prev) => ({
          ...prev,
          [sectionName]: response?.data || response,
        }));
      } catch (err) {
        console.error(`Failed to refetch ${sectionName}:`, err);
      }
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        ...state,
        isSectionEnabled,
        getSectionOrder,
        refetchSection,
        refetchAll: fetchAllData,
        contactSubmit: contactApi.submit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
