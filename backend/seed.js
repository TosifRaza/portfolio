// ------------------------------------------------------------------
// Seed Data Script for Portfolio Backend
// Populates MongoDB with realistic portfolio content.
// Usage: node seed.js
// ------------------------------------------------------------------

const mongoose = require('mongoose');
const { connectDB } = require('./config/db');

// Import all models
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

// ------------------------------------------------------------------
// Seed Data Definitions
// ------------------------------------------------------------------

const profileData = {
  name: 'Tosif Raza',
  title: 'Full-Stack Developer & AI Engineer',
  subtitle: 'Building intelligent, scalable and modern digital systems',
  description:
    'I am a passionate full-stack developer and AI engineer with 5+ years of experience building web applications, APIs, and intelligent systems. I specialize in React, Node.js, Python, and cloud technologies.',
  location: 'San Francisco, CA',
  availability: 'available',
  bio: 'I craft exceptional digital experiences that combine beautiful design with robust engineering. My journey in tech started with a curiosity about how things work, which evolved into a passion for building scalable, intelligent systems. I believe in writing clean, maintainable code and delivering products that make a real difference.',
  careerObjective:
    'Seeking challenging opportunities to build innovative full-stack applications and AI-powered solutions that drive business growth and user satisfaction.',
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
};

const skillsData = [
  { name: 'React.js', category: 'Frontend', proficiency: 95, isEnabled: true, order: 10 },
  { name: 'Next.js', category: 'Frontend', proficiency: 88, isEnabled: true, order: 20 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 90, isEnabled: true, order: 30 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, isEnabled: true, order: 40 },
  { name: 'Node.js', category: 'Backend', proficiency: 93, isEnabled: true, order: 10 },
  { name: 'Express.js', category: 'Backend', proficiency: 90, isEnabled: true, order: 20 },
  { name: 'Python', category: 'Backend', proficiency: 85, isEnabled: true, order: 30 },
  { name: 'MongoDB', category: 'Database', proficiency: 88, isEnabled: true, order: 10 },
  { name: 'PostgreSQL', category: 'Database', proficiency: 80, isEnabled: true, order: 20 },
  { name: 'TensorFlow', category: 'AI / ML', proficiency: 75, isEnabled: true, order: 10 },
  { name: 'OpenAI API', category: 'AI / ML', proficiency: 85, isEnabled: true, order: 20 },
  { name: 'Docker', category: 'DevOps', proficiency: 82, isEnabled: true, order: 10 },
  { name: 'AWS', category: 'Cloud', proficiency: 78, isEnabled: true, order: 10 },
  { name: 'Git', category: 'Tools', proficiency: 92, isEnabled: true, order: 10 },
];

const projectsData = [
  {
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-powered-analytics-dashboard',
    shortDescription:
      'Real-time analytics platform with AI-driven insights and predictive modeling',
    category: 'Full-Stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'D3.js'],
    features: [
      'Real-time data visualization',
      'AI-powered predictions',
      'Custom report builder',
      'Role-based access control',
    ],
    isPublished: true,
    isFeatured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    order: 10,
  },
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    shortDescription:
      'Modern e-commerce solution with payment processing and inventory management',
    category: 'Full-Stack',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'AWS'],
    features: [
      'Stripe payment integration',
      'Real-time inventory',
      'Admin dashboard',
      'Order tracking',
    ],
    isPublished: true,
    isFeatured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    order: 20,
  },
  {
    title: 'Chat Application',
    slug: 'chat-application',
    shortDescription:
      'Real-time messaging app with end-to-end encryption and video calls',
    category: 'Backend',
    technologies: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'Redis'],
    features: [
      'End-to-end encryption',
      'Video calls',
      'File sharing',
      'Group chats',
    ],
    isPublished: true,
    isFeatured: false,
    githubUrl: 'https://github.com',
    order: 30,
  },
  {
    title: 'Task Management System',
    slug: 'task-management-system',
    shortDescription:
      'Collaborative project management tool with Kanban boards and automation',
    category: 'Full-Stack',
    technologies: ['React', 'Express.js', 'MongoDB', 'Docker'],
    features: [
      'Kanban boards',
      'Team collaboration',
      'Automation rules',
      'Time tracking',
    ],
    isPublished: true,
    isFeatured: false,
    githubUrl: 'https://github.com',
    order: 40,
  },
  {
    title: 'Portfolio CMS',
    slug: 'portfolio-cms',
    shortDescription:
      'Custom content management system for portfolio websites',
    category: 'Full-Stack',
    technologies: ['React', 'Node.js', 'MongoDB'],
    isPublished: false,
    isFeatured: false,
    order: 50,
  },
];

const experienceData = [
  {
    company: 'Tech Corp',
    position: 'Senior Full-Stack Developer',
    employmentType: 'full-time',
    location: 'San Francisco, CA',
    startDate: new Date('2022-01-01'),
    isCurrent: true,
    description: 'Leading development of enterprise-scale applications.',
    responsibilities: [
      'Architected and developed microservices handling 10M+ requests daily',
      'Led a team of 5 developers using Agile methodology',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
    ],
    achievements: ['Reduced API response time by 40%', 'Increased test coverage from 45% to 92%'],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    order: 10,
  },
  {
    company: 'StartupXYZ',
    position: 'Full-Stack Developer',
    employmentType: 'full-time',
    location: 'New York, NY',
    startDate: new Date('2020-03-01'),
    endDate: new Date('2021-12-31'),
    description: 'Built and maintained multiple client-facing web applications.',
    responsibilities: [
      'Developed RESTful APIs serving 50K+ users',
      'Built responsive React components with pixel-perfect designs',
      'Integrated third-party services and payment gateways',
    ],
    achievements: ['Delivered 15+ projects on time and within budget', 'Received Employee of the Year award'],
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis'],
    order: 20,
  },
  {
    company: 'Digital Agency',
    position: 'Junior Developer',
    employmentType: 'full-time',
    location: 'Remote',
    startDate: new Date('2019-06-01'),
    endDate: new Date('2020-02-29'),
    description: 'Started career building websites and web applications for clients.',
    responsibilities: [
      'Built responsive websites using HTML, CSS, and JavaScript',
      'Collaborated with designers to implement UI/UX designs',
      'Maintained and updated existing client websites',
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'MySQL'],
    order: 30,
  },
];

const educationData = [
  {
    institution: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: new Date('2015-09-01'),
    endDate: new Date('2019-05-31'),
    grade: '3.8/4.0',
    description: 'Specialized in software engineering and artificial intelligence.',
    certificates: [{ name: "Dean's List", issuer: 'University', date: new Date('2018-05-01') }],
    isVisible: true,
    order: 10,
  },
  {
    institution: 'Online Academy',
    degree: 'Professional Certificate',
    field: 'Full-Stack Web Development',
    startDate: new Date('2019-01-01'),
    endDate: new Date('2019-06-30'),
    grade: 'Passed with Distinction',
    isVisible: true,
    order: 20,
  },
];

const servicesData = [
  {
    icon: 'Globe',
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using modern technologies',
    features: ['Custom web apps', 'Progressive web apps', 'API development', 'Database design'],
    ctaText: 'Discuss Project',
    isVisible: true,
    order: 10,
  },
  {
    icon: 'Server',
    title: 'Backend Development',
    description: 'Scalable server-side solutions with robust APIs',
    features: ['REST API design', 'Microservices', 'Authentication systems', 'Performance optimization'],
    ctaText: 'Learn More',
    isVisible: true,
    order: 20,
  },
  {
    icon: 'Cpu',
    title: 'AI/ML Integration',
    description: 'Intelligent features powered by machine learning',
    features: ['Chatbots', 'Recommendation systems', 'Data analysis', 'Natural language processing'],
    ctaText: 'Explore',
    isVisible: true,
    order: 30,
  },
  {
    icon: 'Database',
    title: 'Database Architecture',
    description: 'Efficient data modeling and management solutions',
    features: ['Schema design', 'Query optimization', 'Migration strategies', 'Data security'],
    ctaText: 'Learn More',
    isVisible: true,
    order: 40,
  },
  {
    icon: 'Layout',
    title: 'Technical Consulting',
    description: 'Expert guidance on technology decisions and architecture',
    features: ['Tech stack selection', 'Code reviews', 'Architecture planning', 'Team mentoring'],
    ctaText: 'Get in Touch',
    isVisible: true,
    order: 50,
  },
];

const testimonialsData = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'Tech Corp',
    testimonial:
      'One of the most talented developers I have worked with. Consistently delivers high-quality code and brings innovative solutions to complex problems.',
    rating: 5,
    isVisible: true,
    order: 10,
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    company: 'StartupXYZ',
    testimonial:
      'Transformed our vision into a beautiful, functional product. The attention to detail and technical expertise was exactly what we needed.',
    rating: 5,
    isVisible: true,
    order: 20,
  },
  {
    name: 'Emily Davis',
    role: 'Design Lead',
    company: 'Design Studio',
    testimonial:
      'Exceptional ability to translate designs into pixel-perfect, responsive interfaces. A true collaborator who elevates every project.',
    rating: 5,
    isVisible: true,
    order: 30,
  },
];

const blogPostsData = [
  {
    title: 'Building Scalable React Applications',
    slug: 'building-scalable-react-applications',
    content:
      '## Introduction\n\nBuilding scalable React applications requires careful planning and architecture. In this article, we will explore key patterns and best practices.\n\n## Component Architecture\n\nBreak down your application into small, reusable components. Use composition over inheritance.\n\n## State Management\n\nChoose the right state management solution based on your application needs. React Context works well for medium applications, while Redux or Zustand may be better for complex ones.\n\n## Performance Optimization\n\nUse React.memo, useMemo, and useCallback strategically. Implement code splitting with React.lazy and Suspense.',
    excerpt: 'Learn the key patterns and best practices for building React applications that scale.',
    category: 'React',
    tags: ['react', 'architecture', 'performance'],
    isPublished: true,
    publishedAt: new Date('2024-12-15'),
    order: 10,
  },
  {
    title: 'REST API Design Best Practices',
    slug: 'rest-api-design-best-practices',
    content:
      '## Introduction\n\nDesigning a good REST API is crucial for building maintainable and developer-friendly backends.\n\n## URL Structure\n\nUse nouns for resources and HTTP methods for actions. Keep URLs consistent and intuitive.\n\n## Error Handling\n\nReturn consistent error responses with proper HTTP status codes. Include helpful error messages.\n\n## Versioning\n\nVersion your APIs from day one. Use URL-based versioning for simplicity.',
    excerpt: 'A comprehensive guide to designing RESTful APIs that developers love.',
    category: 'Backend',
    tags: ['api', 'rest', 'nodejs'],
    isPublished: true,
    publishedAt: new Date('2024-11-20'),
    order: 20,
  },
  {
    title: 'Getting Started with AI Development',
    slug: 'getting-started-with-ai-development',
    content:
      '## Introduction\n\nAI development is becoming increasingly accessible. Here is how to get started.\n\n## Prerequisites\n\nA solid understanding of Python and basic machine learning concepts will help you get the most out of this guide.\n\n## Tools and Frameworks\n\nExplore TensorFlow, PyTorch, and scikit-learn. Each has its strengths for different use cases.',
    excerpt: 'Your guide to entering the world of AI and machine learning development.',
    category: 'AI / ML',
    tags: ['ai', 'machine-learning', 'python'],
    isPublished: true,
    publishedAt: new Date('2024-10-10'),
    order: 30,
  },
  {
    title: 'Docker for Developers',
    slug: 'docker-for-developers',
    content: 'Draft content...',
    category: 'DevOps',
    isPublished: false,
    order: 40,
  },
];

const socialLinksData = [
  {
    platform: 'GitHub',
    url: 'https://github.com',
    icon: 'Github',
    label: 'GitHub',
    isVisible: true,
    order: 10,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'Linkedin',
    label: 'LinkedIn',
    isVisible: true,
    order: 20,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com',
    icon: 'Twitter',
    label: 'Twitter',
    isVisible: true,
    order: 30,
  },
  {
    platform: 'Email',
    url: 'mailto:tosif@example.com',
    icon: 'Mail',
    label: 'Email',
    isVisible: true,
    order: 40,
  },
];

const siteSettingsData = {
  websiteName: 'Tosif Raza | Portfolio',
  tagline: 'Full-Stack Developer & AI Engineer',
  contactEmail: 'tosif@example.com',
  footerText: 'Designed & Built with passion',
  copyrightText: '2025 Tosif Raza. All rights reserved.',
};

const sectionsData = [
  { name: 'hero', displayName: 'Hero', isEnabled: true, order: 10 },
  { name: 'about', displayName: 'About', isEnabled: true, order: 20 },
  { name: 'skills', displayName: 'Skills', isEnabled: true, order: 30 },
  { name: 'projects', displayName: 'Projects', isEnabled: true, order: 40 },
  { name: 'experience', displayName: 'Experience', isEnabled: true, order: 50 },
  { name: 'services', displayName: 'Services', isEnabled: true, order: 60 },
  { name: 'testimonials', displayName: 'Testimonials', isEnabled: true, order: 70 },
  { name: 'blog', displayName: 'Blog', isEnabled: true, order: 80 },
  { name: 'contact', displayName: 'Contact', isEnabled: true, order: 90 },
];

// ------------------------------------------------------------------
// Seed Function
// ------------------------------------------------------------------

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();
    console.log('[Seed] Database connected.\n');

    // Clear all collections EXCEPT Admin
    console.log('[Seed] Clearing existing data (preserving Admin accounts)...');
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await BlogPost.deleteMany({});
    await SocialLink.deleteMany({});
    await SiteSettings.deleteMany({});
    await Section.deleteMany({});
    await mongoose.connection.db.collection('messages').deleteMany({});
    await mongoose.connection.db.collection('analytics').deleteMany({});
    await mongoose.connection.db.collection('resumes').deleteMany({});
    console.log('[Seed] Collections cleared.\n');

    // Insert seed data
    console.log('[Seed] Inserting Profile...');
    await Profile.create(profileData);

    console.log('[Seed] Inserting Skills...');
    await Skill.insertMany(skillsData);

    console.log('[Seed] Inserting Projects...');
    await Project.insertMany(projectsData);

    console.log('[Seed] Inserting Experience...');
    await Experience.insertMany(experienceData);

    console.log('[Seed] Inserting Education...');
    await Education.insertMany(educationData);

    console.log('[Seed] Inserting Services...');
    await Service.insertMany(servicesData);

    console.log('[Seed] Inserting Testimonials...');
    await Testimonial.insertMany(testimonialsData);

    console.log('[Seed] Inserting Blog Posts...');
    await BlogPost.insertMany(blogPostsData);

    console.log('[Seed] Inserting Social Links...');
    await SocialLink.insertMany(socialLinksData);

    console.log('[Seed] Inserting Site Settings...');
    await SiteSettings.create(siteSettingsData);

    console.log('[Seed] Inserting Sections...');
    await Section.insertMany(sectionsData);

    // Summary
    console.log('\n==========================================');
    console.log('  Seed completed successfully!');
    console.log('==========================================');
    console.log(`  Profile:         1 entry`);
    console.log(`  Skills:          ${skillsData.length} entries`);
    console.log(`  Projects:        ${projectsData.length} entries`);
    console.log(`  Experience:      ${experienceData.length} entries`);
    console.log(`  Education:       ${educationData.length} entries`);
    console.log(`  Services:        ${servicesData.length} entries`);
    console.log(`  Testimonials:    ${testimonialsData.length} entries`);
    console.log(`  Blog Posts:      ${blogPostsData.length} entries`);
    console.log(`  Social Links:    ${socialLinksData.length} entries`);
    console.log(`  Site Settings:   1 entry`);
    console.log(`  Sections:        ${sectionsData.length} entries`);
    console.log('==========================================\n');
  } catch (error) {
    console.error('[Seed] Error during seeding:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log('[Seed] Disconnecting from database...');
    await mongoose.disconnect();
    console.log('[Seed] Done.');
    process.exit(process.exitCode || 0);
  }
};

// Run the seed
seedDatabase();
