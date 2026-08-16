// // ------------------------------------------------------------------
// // Seed Data Script for Portfolio Backend
// // Populates MongoDB with realistic portfolio content.
// // Usage: node seed.js
// // ------------------------------------------------------------------

// const mongoose = require('mongoose');
// const { connectDB } = require('./config/db');

// // Import all models
// const Profile = require('./models/Profile');
// const Skill = require('./models/Skill');
// const Project = require('./models/Project');
// const Experience = require('./models/Experience');
// const Education = require('./models/Education');
// const Service = require('./models/Service');
// const Testimonial = require('./models/Testimonial');
// const BlogPost = require('./models/BlogPost');
// const SocialLink = require('./models/SocialLink');
// const SiteSettings = require('./models/SiteSettings');
// const Section = require('./models/Section');

// // ------------------------------------------------------------------
// // Seed Data Definitions
// // ------------------------------------------------------------------

// const profileData = {
//   name: 'Tosif Raza',
//   title: 'Full-Stack Developer & AI Engineer',
//   subtitle: 'Building intelligent, scalable and modern digital systems',
//   description:
//     'I am a passionate full-stack developer and AI engineer with 5+ years of experience building web applications, APIs, and intelligent systems. I specialize in React, Node.js, Python, and cloud technologies.',
//   location: 'San Francisco, CA',
//   availability: 'available',
//   bio: 'I craft exceptional digital experiences that combine beautiful design with robust engineering. My journey in tech started with a curiosity about how things work, which evolved into a passion for building scalable, intelligent systems. I believe in writing clean, maintainable code and delivering products that make a real difference.',
//   careerObjective:
//     'Seeking challenging opportunities to build innovative full-stack applications and AI-powered solutions that drive business growth and user satisfaction.',
//   highlights: [
//     { text: '5+ Years of Experience', icon: 'trophy' },
//     { text: '50+ Projects Delivered', icon: 'folder' },
//     { text: '30+ Happy Clients', icon: 'users' },
//     { text: 'Open Source Contributor', icon: 'github' },
//   ],
//   statistics: [
//     { label: 'Years Experience', value: '5+', icon: 'calendar' },
//     { label: 'Projects Completed', value: '50+', icon: 'check-circle' },
//     { label: 'Technologies', value: '30+', icon: 'code' },
//     { label: 'Client Satisfaction', value: '98%', icon: 'heart' },
//   ],
// };

// const skillsData = [
//   { name: 'React.js', category: 'Frontend', proficiency: 95, isEnabled: true, order: 10 },
//   { name: 'Next.js', category: 'Frontend', proficiency: 88, isEnabled: true, order: 20 },
//   { name: 'TypeScript', category: 'Frontend', proficiency: 90, isEnabled: true, order: 30 },
//   { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, isEnabled: true, order: 40 },
//   { name: 'Node.js', category: 'Backend', proficiency: 93, isEnabled: true, order: 10 },
//   { name: 'Express.js', category: 'Backend', proficiency: 90, isEnabled: true, order: 20 },
//   { name: 'Python', category: 'Backend', proficiency: 85, isEnabled: true, order: 30 },
//   { name: 'MongoDB', category: 'Database', proficiency: 88, isEnabled: true, order: 10 },
//   { name: 'PostgreSQL', category: 'Database', proficiency: 80, isEnabled: true, order: 20 },
//   { name: 'TensorFlow', category: 'AI / ML', proficiency: 75, isEnabled: true, order: 10 },
//   { name: 'OpenAI API', category: 'AI / ML', proficiency: 85, isEnabled: true, order: 20 },
//   { name: 'Docker', category: 'DevOps', proficiency: 82, isEnabled: true, order: 10 },
//   { name: 'AWS', category: 'Cloud', proficiency: 78, isEnabled: true, order: 10 },
//   { name: 'Git', category: 'Tools', proficiency: 92, isEnabled: true, order: 10 },
// ];

// const projectsData = [
//   {
//     title: 'AI-Powered Analytics Dashboard',
//     slug: 'ai-powered-analytics-dashboard',
//     shortDescription:
//       'Real-time analytics platform with AI-driven insights and predictive modeling',
//     category: 'Full-Stack',
//     technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'D3.js'],
//     features: [
//       'Real-time data visualization',
//       'AI-powered predictions',
//       'Custom report builder',
//       'Role-based access control',
//     ],
//     isPublished: true,
//     isFeatured: true,
//     githubUrl: 'https://github.com',
//     liveUrl: 'https://example.com',
//     order: 10,
//   },
//   {
//     title: 'E-Commerce Platform',
//     slug: 'e-commerce-platform',
//     shortDescription:
//       'Modern e-commerce solution with payment processing and inventory management',
//     category: 'Full-Stack',
//     technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'AWS'],
//     features: [
//       'Stripe payment integration',
//       'Real-time inventory',
//       'Admin dashboard',
//       'Order tracking',
//     ],
//     isPublished: true,
//     isFeatured: true,
//     githubUrl: 'https://github.com',
//     liveUrl: 'https://example.com',
//     order: 20,
//   },
//   {
//     title: 'Chat Application',
//     slug: 'chat-application',
//     shortDescription:
//       'Real-time messaging app with end-to-end encryption and video calls',
//     category: 'Backend',
//     technologies: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'Redis'],
//     features: [
//       'End-to-end encryption',
//       'Video calls',
//       'File sharing',
//       'Group chats',
//     ],
//     isPublished: true,
//     isFeatured: false,
//     githubUrl: 'https://github.com',
//     order: 30,
//   },
//   {
//     title: 'Task Management System',
//     slug: 'task-management-system',
//     shortDescription:
//       'Collaborative project management tool with Kanban boards and automation',
//     category: 'Full-Stack',
//     technologies: ['React', 'Express.js', 'MongoDB', 'Docker'],
//     features: [
//       'Kanban boards',
//       'Team collaboration',
//       'Automation rules',
//       'Time tracking',
//     ],
//     isPublished: true,
//     isFeatured: false,
//     githubUrl: 'https://github.com',
//     order: 40,
//   },
//   {
//     title: 'Portfolio CMS',
//     slug: 'portfolio-cms',
//     shortDescription:
//       'Custom content management system for portfolio websites',
//     category: 'Full-Stack',
//     technologies: ['React', 'Node.js', 'MongoDB'],
//     isPublished: false,
//     isFeatured: false,
//     order: 50,
//   },
// ];

// const experienceData = [
//   {
//     company: 'Tech Corp',
//     position: 'Senior Full-Stack Developer',
//     employmentType: 'full-time',
//     location: 'San Francisco, CA',
//     startDate: new Date('2022-01-01'),
//     isCurrent: true,
//     description: 'Leading development of enterprise-scale applications.',
//     responsibilities: [
//       'Architected and developed microservices handling 10M+ requests daily',
//       'Led a team of 5 developers using Agile methodology',
//       'Implemented CI/CD pipelines reducing deployment time by 60%',
//     ],
//     achievements: ['Reduced API response time by 40%', 'Increased test coverage from 45% to 92%'],
//     technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
//     order: 10,
//   },
//   {
//     company: 'StartupXYZ',
//     position: 'Full-Stack Developer',
//     employmentType: 'full-time',
//     location: 'New York, NY',
//     startDate: new Date('2020-03-01'),
//     endDate: new Date('2021-12-31'),
//     description: 'Built and maintained multiple client-facing web applications.',
//     responsibilities: [
//       'Developed RESTful APIs serving 50K+ users',
//       'Built responsive React components with pixel-perfect designs',
//       'Integrated third-party services and payment gateways',
//     ],
//     achievements: ['Delivered 15+ projects on time and within budget', 'Received Employee of the Year award'],
//     technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis'],
//     order: 20,
//   },
//   {
//     company: 'Digital Agency',
//     position: 'Junior Developer',
//     employmentType: 'full-time',
//     location: 'Remote',
//     startDate: new Date('2019-06-01'),
//     endDate: new Date('2020-02-29'),
//     description: 'Started career building websites and web applications for clients.',
//     responsibilities: [
//       'Built responsive websites using HTML, CSS, and JavaScript',
//       'Collaborated with designers to implement UI/UX designs',
//       'Maintained and updated existing client websites',
//     ],
//     technologies: ['JavaScript', 'React', 'Node.js', 'MySQL'],
//     order: 30,
//   },
// ];

// const educationData = [
//   {
//     institution: 'University of Technology',
//     degree: 'Bachelor of Science',
//     field: 'Computer Science',
//     startDate: new Date('2015-09-01'),
//     endDate: new Date('2019-05-31'),
//     grade: '3.8/4.0',
//     description: 'Specialized in software engineering and artificial intelligence.',
//     certificates: [{ name: "Dean's List", issuer: 'University', date: new Date('2018-05-01') }],
//     isVisible: true,
//     order: 10,
//   },
//   {
//     institution: 'Online Academy',
//     degree: 'Professional Certificate',
//     field: 'Full-Stack Web Development',
//     startDate: new Date('2019-01-01'),
//     endDate: new Date('2019-06-30'),
//     grade: 'Passed with Distinction',
//     isVisible: true,
//     order: 20,
//   },
// ];

// const servicesData = [
//   {
//     icon: 'Globe',
//     title: 'Full-Stack Development',
//     description: 'End-to-end web application development using modern technologies',
//     features: ['Custom web apps', 'Progressive web apps', 'API development', 'Database design'],
//     ctaText: 'Discuss Project',
//     isVisible: true,
//     order: 10,
//   },
//   {
//     icon: 'Server',
//     title: 'Backend Development',
//     description: 'Scalable server-side solutions with robust APIs',
//     features: ['REST API design', 'Microservices', 'Authentication systems', 'Performance optimization'],
//     ctaText: 'Learn More',
//     isVisible: true,
//     order: 20,
//   },
//   {
//     icon: 'Cpu',
//     title: 'AI/ML Integration',
//     description: 'Intelligent features powered by machine learning',
//     features: ['Chatbots', 'Recommendation systems', 'Data analysis', 'Natural language processing'],
//     ctaText: 'Explore',
//     isVisible: true,
//     order: 30,
//   },
//   {
//     icon: 'Database',
//     title: 'Database Architecture',
//     description: 'Efficient data modeling and management solutions',
//     features: ['Schema design', 'Query optimization', 'Migration strategies', 'Data security'],
//     ctaText: 'Learn More',
//     isVisible: true,
//     order: 40,
//   },
//   {
//     icon: 'Layout',
//     title: 'Technical Consulting',
//     description: 'Expert guidance on technology decisions and architecture',
//     features: ['Tech stack selection', 'Code reviews', 'Architecture planning', 'Team mentoring'],
//     ctaText: 'Get in Touch',
//     isVisible: true,
//     order: 50,
//   },
// ];

// const testimonialsData = [
//   {
//     name: 'Sarah Johnson',
//     role: 'Product Manager',
//     company: 'Tech Corp',
//     testimonial:
//       'One of the most talented developers I have worked with. Consistently delivers high-quality code and brings innovative solutions to complex problems.',
//     rating: 5,
//     isVisible: true,
//     order: 10,
//   },
//   {
//     name: 'Michael Chen',
//     role: 'CEO',
//     company: 'StartupXYZ',
//     testimonial:
//       'Transformed our vision into a beautiful, functional product. The attention to detail and technical expertise was exactly what we needed.',
//     rating: 5,
//     isVisible: true,
//     order: 20,
//   },
//   {
//     name: 'Emily Davis',
//     role: 'Design Lead',
//     company: 'Design Studio',
//     testimonial:
//       'Exceptional ability to translate designs into pixel-perfect, responsive interfaces. A true collaborator who elevates every project.',
//     rating: 5,
//     isVisible: true,
//     order: 30,
//   },
// ];

// const blogPostsData = [
//   {
//     title: 'Building Scalable React Applications',
//     slug: 'building-scalable-react-applications',
//     content:
//       '## Introduction\n\nBuilding scalable React applications requires careful planning and architecture. In this article, we will explore key patterns and best practices.\n\n## Component Architecture\n\nBreak down your application into small, reusable components. Use composition over inheritance.\n\n## State Management\n\nChoose the right state management solution based on your application needs. React Context works well for medium applications, while Redux or Zustand may be better for complex ones.\n\n## Performance Optimization\n\nUse React.memo, useMemo, and useCallback strategically. Implement code splitting with React.lazy and Suspense.',
//     excerpt: 'Learn the key patterns and best practices for building React applications that scale.',
//     category: 'React',
//     tags: ['react', 'architecture', 'performance'],
//     isPublished: true,
//     publishedAt: new Date('2024-12-15'),
//     order: 10,
//   },
//   {
//     title: 'REST API Design Best Practices',
//     slug: 'rest-api-design-best-practices',
//     content:
//       '## Introduction\n\nDesigning a good REST API is crucial for building maintainable and developer-friendly backends.\n\n## URL Structure\n\nUse nouns for resources and HTTP methods for actions. Keep URLs consistent and intuitive.\n\n## Error Handling\n\nReturn consistent error responses with proper HTTP status codes. Include helpful error messages.\n\n## Versioning\n\nVersion your APIs from day one. Use URL-based versioning for simplicity.',
//     excerpt: 'A comprehensive guide to designing RESTful APIs that developers love.',
//     category: 'Backend',
//     tags: ['api', 'rest', 'nodejs'],
//     isPublished: true,
//     publishedAt: new Date('2024-11-20'),
//     order: 20,
//   },
//   {
//     title: 'Getting Started with AI Development',
//     slug: 'getting-started-with-ai-development',
//     content:
//       '## Introduction\n\nAI development is becoming increasingly accessible. Here is how to get started.\n\n## Prerequisites\n\nA solid understanding of Python and basic machine learning concepts will help you get the most out of this guide.\n\n## Tools and Frameworks\n\nExplore TensorFlow, PyTorch, and scikit-learn. Each has its strengths for different use cases.',
//     excerpt: 'Your guide to entering the world of AI and machine learning development.',
//     category: 'AI / ML',
//     tags: ['ai', 'machine-learning', 'python'],
//     isPublished: true,
//     publishedAt: new Date('2024-10-10'),
//     order: 30,
//   },
//   {
//     title: 'Docker for Developers',
//     slug: 'docker-for-developers',
//     content: 'Draft content...',
//     category: 'DevOps',
//     isPublished: false,
//     order: 40,
//   },
// ];

// const socialLinksData = [
//   {
//     platform: 'GitHub',
//     url: 'https://github.com',
//     icon: 'Github',
//     label: 'GitHub',
//     isVisible: true,
//     order: 10,
//   },
//   {
//     platform: 'LinkedIn',
//     url: 'https://linkedin.com',
//     icon: 'Linkedin',
//     label: 'LinkedIn',
//     isVisible: true,
//     order: 20,
//   },
//   {
//     platform: 'Twitter',
//     url: 'https://twitter.com',
//     icon: 'Twitter',
//     label: 'Twitter',
//     isVisible: true,
//     order: 30,
//   },
//   {
//     platform: 'Email',
//     url: 'mailto:tosif@example.com',
//     icon: 'Mail',
//     label: 'Email',
//     isVisible: true,
//     order: 40,
//   },
// ];

// const siteSettingsData = {
//   websiteName: 'Tosif Raza | Portfolio',
//   tagline: 'Full-Stack Developer & AI Engineer',
//   contactEmail: 'tosif@example.com',
//   footerText: 'Designed & Built with passion',
//   copyrightText: '2025 Tosif Raza. All rights reserved.',
// };

// const sectionsData = [
//   { name: 'hero', displayName: 'Hero', isEnabled: true, order: 10 },
//   { name: 'about', displayName: 'About', isEnabled: true, order: 20 },
//   { name: 'skills', displayName: 'Skills', isEnabled: true, order: 30 },
//   { name: 'projects', displayName: 'Projects', isEnabled: true, order: 40 },
//   { name: 'experience', displayName: 'Experience', isEnabled: true, order: 50 },
//   { name: 'services', displayName: 'Services', isEnabled: true, order: 60 },
//   { name: 'testimonials', displayName: 'Testimonials', isEnabled: true, order: 70 },
//   { name: 'blog', displayName: 'Blog', isEnabled: true, order: 80 },
//   { name: 'contact', displayName: 'Contact', isEnabled: true, order: 90 },
// ];

// // ------------------------------------------------------------------
// // Seed Function
// // ------------------------------------------------------------------

// const seedDatabase = async () => {
//   try {
//     console.log('[Seed] Connecting to database...');
//     await connectDB();
//     console.log('[Seed] Database connected.\n');

//     // Clear all collections EXCEPT Admin
//     console.log('[Seed] Clearing existing data (preserving Admin accounts)...');
//     await Profile.deleteMany({});
//     await Skill.deleteMany({});
//     await Project.deleteMany({});
//     await Experience.deleteMany({});
//     await Education.deleteMany({});
//     await Service.deleteMany({});
//     await Testimonial.deleteMany({});
//     await BlogPost.deleteMany({});
//     await SocialLink.deleteMany({});
//     await SiteSettings.deleteMany({});
//     await Section.deleteMany({});
//     await mongoose.connection.db.collection('messages').deleteMany({});
//     await mongoose.connection.db.collection('analytics').deleteMany({});
//     await mongoose.connection.db.collection('resumes').deleteMany({});
//     console.log('[Seed] Collections cleared.\n');

//     // Insert seed data
//     console.log('[Seed] Inserting Profile...');
//     await Profile.create(profileData);

//     console.log('[Seed] Inserting Skills...');
//     await Skill.insertMany(skillsData);

//     console.log('[Seed] Inserting Projects...');
//     await Project.insertMany(projectsData);

//     console.log('[Seed] Inserting Experience...');
//     await Experience.insertMany(experienceData);

//     console.log('[Seed] Inserting Education...');
//     await Education.insertMany(educationData);

//     console.log('[Seed] Inserting Services...');
//     await Service.insertMany(servicesData);

//     console.log('[Seed] Inserting Testimonials...');
//     await Testimonial.insertMany(testimonialsData);

//     console.log('[Seed] Inserting Blog Posts...');
//     await BlogPost.insertMany(blogPostsData);

//     console.log('[Seed] Inserting Social Links...');
//     await SocialLink.insertMany(socialLinksData);

//     console.log('[Seed] Inserting Site Settings...');
//     await SiteSettings.create(siteSettingsData);

//     console.log('[Seed] Inserting Sections...');
//     await Section.insertMany(sectionsData);

//     // Summary
//     console.log('\n==========================================');
//     console.log('  Seed completed successfully!');
//     console.log('==========================================');
//     console.log(`  Profile:         1 entry`);
//     console.log(`  Skills:          ${skillsData.length} entries`);
//     console.log(`  Projects:        ${projectsData.length} entries`);
//     console.log(`  Experience:      ${experienceData.length} entries`);
//     console.log(`  Education:       ${educationData.length} entries`);
//     console.log(`  Services:        ${servicesData.length} entries`);
//     console.log(`  Testimonials:    ${testimonialsData.length} entries`);
//     console.log(`  Blog Posts:      ${blogPostsData.length} entries`);
//     console.log(`  Social Links:    ${socialLinksData.length} entries`);
//     console.log(`  Site Settings:   1 entry`);
//     console.log(`  Sections:        ${sectionsData.length} entries`);
//     console.log('==========================================\n');
//   } catch (error) {
//     console.error('[Seed] Error during seeding:');
//     console.error(error);
//     process.exitCode = 1;
//   } finally {
//     console.log('[Seed] Disconnecting from database...');
//     await mongoose.disconnect();
//     console.log('[Seed] Done.');
//     process.exit(process.exitCode || 0);
//   }
// };

// // Run the seed
// seedDatabase();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const BlogPost = require('./models/BlogPost');
const SocialLink = require('./models/SocialLink');
const SiteSettings = require('./models/SiteSettings');
const Section = require('./models/Section');

const seedDatabase = async () => {
  try {
    console.log('[Seed] Starting database seeding...');

    // Seed default admin if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        name: 'Admin',
        email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com',
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123',
        role: 'super_admin',
      });
      console.log('[Seed] Admin created: admin@portfolio.com / Admin@123');
    }

    // Only seed content if profile is empty
    const profileExists = await Profile.countDocuments() > 0;
    if (profileExists) {
      console.log('[Seed] Data already exists, skipping content seed.');
      return;
    }

    // --- Profile ---
    await Profile.create({
      name: 'Tosif Raza',
      title: 'Full-Stack Developer & AI Engineer',
      subtitle: 'Building intelligent, scalable and modern digital systems',
      bio: 'I am a passionate full-stack developer and AI engineer with 5+ years of experience building web applications, APIs, and intelligent systems. I specialize in React, Node.js, Python, and cloud technologies. I craft exceptional digital experiences that combine beautiful design with robust engineering.',
      shortBio: 'Full-Stack Developer & AI Engineer with 5+ years of experience',
      description: 'I am a passionate full-stack developer and AI engineer with 5+ years of experience building web applications, APIs, and intelligent systems.',
      location: 'San Francisco, CA',
      availability: 'available',
      email: 'tosif@example.com',
      website: 'https://example.com',
      yearsOfExperience: 5,
      availableForHire: true,
      careerObjective: 'Seeking challenging opportunities to build innovative full-stack applications and AI-powered solutions that drive business growth and user satisfaction.',
      highlights: [
        { text: '5+ Years of Experience', icon: 'trophy' },
        { text: '50+ Projects Delivered', icon: 'folder' },
        { text: '30+ Happy Clients', icon: 'users' },
        { text: 'Open Source Contributor', icon: 'github' },
      ],
      statistics: [
        { label: 'Years Experience', value: '5+', icon: 'calendar' },
        { label: 'Projects Completed', value: '50+', icon: 'check-circle' },
        { label: 'Technologies', value: '30+', icon: 'code' },
        { label: 'Client Satisfaction', value: '98%', icon: 'heart' },
      ],
      languages: ['English', 'Hindi', 'Urdu'],
      interests: ['AI/ML', 'Open Source', 'Cloud Architecture', 'DevOps'],
    });
    console.log('[Seed] Profile created');

    // --- Skills ---
    await Skill.insertMany([
      { name: 'React.js', category: 'Frontend', proficiency: 95, icon: '⚛️', color: '#61DAFB', order: 1, featured: true },
      { name: 'Next.js', category: 'Frontend', proficiency: 88, icon: '▲', color: '#000000', order: 2, featured: true },
      { name: 'TypeScript', category: 'Frontend', proficiency: 90, icon: '📘', color: '#3178C6', order: 3, featured: true },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, icon: '🎨', color: '#06B6D4', order: 4, featured: false },
      { name: 'Node.js', category: 'Backend', proficiency: 93, icon: '🟢', color: '#339933', order: 5, featured: true },
      { name: 'Express.js', category: 'Backend', proficiency: 90, icon: '🚂', color: '#000000', order: 6, featured: false },
      { name: 'Python', category: 'Backend', proficiency: 85, icon: '🐍', color: '#3776AB', order: 7, featured: false },
      { name: 'MongoDB', category: 'Database', proficiency: 88, icon: '🍃', color: '#47A248', order: 8, featured: true },
      { name: 'PostgreSQL', category: 'Database', proficiency: 80, icon: '🐘', color: '#4169E1', order: 9, featured: false },
      { name: 'Docker', category: 'DevOps', proficiency: 82, icon: '🐳', color: '#2496ED', order: 10, featured: false },
      { name: 'AWS', category: 'Cloud', proficiency: 78, icon: '☁️', color: '#FF9900', order: 11, featured: false },
      { name: 'Git', category: 'Tools', proficiency: 92, icon: '📦', color: '#F05032', order: 12, featured: false },
    ]);
    console.log('[Seed] 12 Skills created');

    // --- Projects ---
    await Project.insertMany([
      {
        title: 'AI-Powered Analytics Dashboard',
        slug: 'ai-powered-analytics-dashboard',
        shortDescription: 'Real-time analytics platform with AI-driven insights and predictive modeling',
        description: 'A comprehensive analytics dashboard that leverages machine learning to provide predictive insights, anomaly detection, and automated reporting. Built with a microservices architecture handling 10M+ events daily with real-time data visualization using D3.js and WebSockets.',
        techStack: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'D3.js', 'WebSocket'],
        liveUrl: 'https://example.com/analytics',
        githubUrl: 'https://github.com',
        category: 'Full-Stack',
        featured: true,
        status: 'completed',
        order: 1,
      },
      {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        shortDescription: 'Modern e-commerce solution with payment processing and inventory management',
        description: 'A full-featured e-commerce platform with Stripe payment integration, real-time inventory tracking, admin dashboard, order management, and customer analytics. Supports multiple currencies and shipping providers.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS S3'],
        liveUrl: 'https://example.com/shop',
        githubUrl: 'https://github.com',
        category: 'Full-Stack',
        featured: true,
        status: 'completed',
        order: 2,
      },
      {
        title: 'Real-Time Chat Application',
        slug: 'real-time-chat-app',
        shortDescription: 'End-to-end encrypted messaging with video calls and file sharing',
        description: 'A feature-rich chat application supporting private and group messaging, end-to-end encryption, video calls via WebRTC, file sharing, message search, and read receipts. Uses Socket.io for real-time communication.',
        techStack: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'Redis'],
        githubUrl: 'https://github.com',
        category: 'Backend',
        featured: false,
        status: 'completed',
        order: 3,
      },
      {
        title: 'Task Management System',
        slug: 'task-management-system',
        shortDescription: 'Collaborative project management with Kanban boards and automation',
        description: 'A project management tool featuring Kanban boards, sprint planning, time tracking, team collaboration, automation rules, and customizable workflows. Built for agile teams with real-time updates.',
        techStack: ['React', 'Express.js', 'MongoDB', 'Docker'],
        githubUrl: 'https://github.com',
        category: 'Full-Stack',
        featured: false,
        status: 'completed',
        order: 4,
      },
      {
        title: 'AI Content Generator',
        slug: 'ai-content-generator',
        shortDescription: 'GPT-powered content generation tool for marketing teams',
        description: 'An AI-powered content creation platform that generates blog posts, social media content, email campaigns, and ad copy. Features template management, brand voice customization, and content scheduling.',
        techStack: ['Next.js', 'Python', 'OpenAI API', 'PostgreSQL'],
        liveUrl: 'https://example.com/ai-content',
        category: 'AI / ML',
        featured: true,
        status: 'in_progress',
        order: 5,
      },
    ]);
    console.log('[Seed] 5 Projects created');

    // --- Experience ---
    await Experience.insertMany([
      {
        company: 'Tech Corp',
        position: 'Senior Full-Stack Developer',
        location: 'San Francisco, CA',
        description: 'Leading development of enterprise-scale applications serving millions of users. Architected microservices infrastructure and mentored a team of 5 developers using Agile methodologies.',
        startDate: new Date('2022-01-15'),
        current: true,
        highlights: ['Architected microservices handling 10M+ requests daily', 'Led team of 5 developers using Agile methodology', 'Implemented CI/CD pipelines reducing deployment time by 60%', 'Reduced API response time by 40% through optimization'],
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
        order: 1,
      },
      {
        company: 'StartupXYZ',
        position: 'Full-Stack Developer',
        location: 'New York, NY',
        description: 'Built and maintained multiple client-facing web applications. Developed RESTful APIs serving 50K+ users and implemented responsive UI components with pixel-perfect designs.',
        startDate: new Date('2020-03-01'),
        endDate: new Date('2021-12-31'),
        current: false,
        highlights: ['Developed RESTful APIs serving 50K+ users', 'Delivered 15+ projects on time and within budget', 'Integrated Stripe, Twilio, and AWS services', 'Received Employee of the Year award'],
        technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis'],
        order: 2,
      },
      {
        company: 'Digital Agency',
        position: 'Junior Developer',
        location: 'Remote',
        description: 'Started career building websites and web applications for various clients. Collaborated closely with designers to implement responsive UI/UX designs and maintain client projects.',
        startDate: new Date('2019-06-01'),
        endDate: new Date('2020-02-29'),
        current: false,
        highlights: ['Built 20+ responsive websites for clients', 'Learned React and Node.js ecosystem', 'Improved site performance scores by 50%'],
        technologies: ['JavaScript', 'React', 'Node.js', 'MySQL'],
        order: 3,
      },
    ]);
    console.log('[Seed] 3 Experiences created');

    // --- Education ---
    await Education.insertMany([
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'California',
        description: 'Specialized in software engineering and artificial intelligence. Active participant in coding competitions and hackathons.',
        startDate: new Date('2015-09-01'),
        endDate: new Date('2019-05-31'),
        current: false,
        grade: '3.8 / 4.0',
        highlights: ["Dean's List for 6 semesters", "Won university hackathon 2018", "Published research paper on ML optimization"],
        order: 1,
      },
      {
        institution: 'Online Academy',
        degree: 'Professional Certificate',
        field: 'Full-Stack Web Development',
        description: 'Intensive 6-month program covering modern web development technologies and best practices.',
        startDate: new Date('2019-01-01'),
        endDate: new Date('2019-06-30'),
        current: false,
        grade: 'Passed with Distinction',
        order: 2,
      },
    ]);
    console.log('[Seed] 2 Education entries created');

    // --- Services ---
    await Service.insertMany([
      { title: 'Full-Stack Development', description: 'End-to-end web application development using React, Node.js, and modern cloud technologies. From concept to deployment.', icon: '🌐', features: ['Custom web apps', 'Progressive web apps', 'API development', 'Database design'], order: 1, featured: true },
      { title: 'Backend Development', description: 'Scalable server-side solutions with robust RESTful APIs, authentication systems, and microservices architecture.', icon: '⚙️', features: ['REST API design', 'Microservices', 'Authentication systems', 'Performance optimization'], order: 2, featured: true },
      { title: 'AI/ML Integration', description: 'Intelligent features powered by machine learning — chatbots, recommendation engines, and data analysis pipelines.', icon: '🤖', features: ['Chatbots & assistants', 'Recommendation systems', 'Data analysis', 'NLP solutions'], order: 3, featured: false },
      { title: 'Database Architecture', description: 'Efficient data modeling, query optimization, and migration strategies for MongoDB, PostgreSQL, and Redis.', icon: '🗄️', features: ['Schema design', 'Query optimization', 'Migration strategies', 'Data security'], order: 4, featured: false },
    ]);
    console.log('[Seed] 4 Services created');

    // --- Testimonials ---
    await Testimonial.insertMany([
      { name: 'Sarah Johnson', position: 'Product Manager', company: 'Tech Corp', content: 'One of the most talented developers I have worked with. Consistently delivers high-quality code and brings innovative solutions to complex problems. A true asset to any team.', rating: 5, featured: true, order: 1 },
      { name: 'Michael Chen', position: 'CEO', company: 'StartupXYZ', content: 'Transformed our vision into a beautiful, functional product. The attention to detail and technical expertise was exactly what we needed. Highly recommend for any project.', rating: 5, featured: true, order: 2 },
      { name: 'Emily Davis', position: 'Design Lead', company: 'Design Studio', content: 'Exceptional ability to translate designs into pixel-perfect, responsive interfaces. A true collaborator who elevates every project with creative problem-solving.', rating: 5, featured: false, order: 3 },
    ]);
    console.log('[Seed] 3 Testimonials created');

    // --- Blog Posts ---
    await BlogPost.insertMany([
      {
        title: 'Building Scalable React Applications',
        slug: 'building-scalable-react-applications',
        excerpt: 'Learn the key patterns and best practices for building React applications that scale to millions of users.',
        content: '<h2>Introduction</h2><p>Building scalable React applications requires careful planning and architecture. In this article, we explore key patterns and best practices that ensure your application grows smoothly.</p><h2>Component Architecture</h2><p>Break down your application into small, reusable components. Use composition over inheritance. Each component should have a single responsibility.</p><h2>State Management</h2><p>Choose the right state management solution based on your application needs. React Context works well for medium applications, while Redux or Zustand may be better for complex ones.</p><h2>Performance</h2><p>Use React.memo, useMemo, and useCallback strategically. Implement code splitting with React.lazy and Suspense to reduce initial bundle size.</p>',
        category: 'React',
        tags: ['react', 'architecture', 'performance'],
        status: 'published',
        publishedAt: new Date('2024-12-15'),
        featured: true,
      },
      {
        title: 'REST API Design Best Practices',
        slug: 'rest-api-design-best-practices',
        excerpt: 'A comprehensive guide to designing RESTful APIs that developers love to use.',
        content: '<h2>Introduction</h2><p>Designing a good REST API is crucial for building maintainable and developer-friendly backends.</p><h2>URL Structure</h2><p>Use nouns for resources and HTTP methods for actions. Keep URLs consistent and intuitive. Example: /api/v1/users instead of /api/getUsers.</p><h2>Error Handling</h2><p>Return consistent error responses with proper HTTP status codes. Include helpful error messages and documentation links.</p><h2>Versioning</h2><p>Version your APIs from day one. Use URL-based versioning for simplicity and clarity.</p>',
        category: 'Backend',
        tags: ['api', 'rest', 'nodejs'],
        status: 'published',
        publishedAt: new Date('2024-11-20'),
        featured: false,
      },
      {
        title: 'Getting Started with AI Development',
        slug: 'getting-started-with-ai-development',
        excerpt: 'Your guide to entering the world of AI and machine learning development.',
        content: '<h2>Introduction</h2><p>AI development is becoming increasingly accessible. Here is how to get started on your AI journey.</p><h2>Prerequisites</h2><p>A solid understanding of Python and basic machine learning concepts will help you get the most out of this guide.</p><h2>Tools and Frameworks</h2><p>Explore TensorFlow, PyTorch, and scikit-learn. Each has its strengths for different use cases.</p>',
        category: 'AI / ML',
        tags: ['ai', 'machine-learning', 'python'],
        status: 'published',
        publishedAt: new Date('2024-10-10'),
        featured: false,
      },
      {
        title: 'Docker for Node.js Developers',
        slug: 'docker-for-nodejs-developers',
        excerpt: 'Learn how to containerize your Node.js applications with Docker for consistent deployments.',
        content: '<p>Draft content for Docker article...</p>',
        category: 'DevOps',
        tags: ['docker', 'nodejs', 'devops'],
        status: 'draft',
      },
    ]);
    console.log('[Seed] 4 Blog Posts created');

    // --- Social Links ---
    await SocialLink.insertMany([
      { platform: 'GitHub', url: 'https://github.com', icon: 'Github', username: 'tosifraza', order: 1, enabled: true },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/tosifraza', icon: 'Linkedin', username: 'tosifraza', order: 2, enabled: true },
      { platform: 'Twitter', url: 'https://twitter.com/tosifraza', icon: 'Twitter', username: 'tosifraza', order: 3, enabled: true },
      { platform: 'Email', url: 'mailto:tosif@example.com', icon: 'Mail', username: '', order: 4, enabled: true },
    ]);
    console.log('[Seed] 4 Social Links created');

    // --- Site Settings ---
    await SiteSettings.create({
      siteName: 'Tosif Raza | Portfolio',
      siteDescription: 'Full-Stack Developer & AI Engineer',
      primaryColor: '#6366f1',
      accentColor: '#06b6d4',
      darkMode: true,
      contact: { email: 'tosif@example.com', phone: '+1 (555) 123-4567', address: 'San Francisco, CA' },
      hero: { greeting: "Hello, I'm", ctaText: 'View My Work', ctaLink: '#projects', secondaryCtaText: 'Get In Touch', secondaryCtaLink: '#contact', showResumeButton: true },
      footer: { text: 'Designed & Built with passion', copyrightText: '2026 Tosif Raza. All rights reserved.', showSocial: true },
    });
    console.log('[Seed] Site Settings created');

    // --- Sections ---
    await Section.insertMany([
      { sectionId: 'hero', title: 'Hero', enabled: true, order: 1 },
      { sectionId: 'about', title: 'About', enabled: true, order: 2 },
      { sectionId: 'skills', title: 'Skills', enabled: true, order: 3 },
      { sectionId: 'projects', title: 'Projects', enabled: true, order: 4 },
      { sectionId: 'experience', title: 'Experience', enabled: true, order: 5 },
      { sectionId: 'education', title: 'Education', enabled: true, order: 6 },
      { sectionId: 'services', title: 'Services', enabled: true, order: 7 },
      { sectionId: 'testimonials', title: 'Testimonials', enabled: true, order: 8 },
      { sectionId: 'blog', title: 'Blog', enabled: true, order: 9 },
      { sectionId: 'contact', title: 'Contact', enabled: true, order: 10 },
    ]);
    console.log('[Seed] 10 Sections created');

    console.log('\n==========================================');
    console.log('  ✅ Seed completed successfully!');
    console.log('==========================================');
    console.log('  Admin:    admin@portfolio.com / Admin@123');
    console.log('  Profile:  1 entry');
    console.log('  Skills:   12 entries');
    console.log('  Projects: 5 entries');
    console.log('  Exp:      3 entries');
    console.log('  Edu:      2 entries');
    console.log('  Services: 4 entries');
    console.log('  Testimonials: 3 entries');
    console.log('  Blog:     4 entries (3 published, 1 draft)');
    console.log('  Social:   4 links');
    console.log('  Sections: 10 (all enabled)');
    console.log('==========================================\n');
  } catch (error) {
    console.error('[Seed] Error:', error.message);
  }
};

module.exports = seedDatabase;
