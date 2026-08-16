const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const Skill = require('../models/Skill');
const Message = require('../models/Message');
const SocialLink = require('../models/SocialLink');
const Analytics = require('../models/Analytics');

const getStats = async (req, res, next) => {
  try {
    const [projectCount, featuredProjectCount, blogCount, publishedBlogCount,
      experienceCount, educationCount, serviceCount, testimonialCount,
      skillCount, unreadMessages, totalMessages, socialLinkCount, analyticsCount] =
      await Promise.all([
        Project.countDocuments(),
        Project.countDocuments({ featured: true }),
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ status: 'published' }),
        Experience.countDocuments(),
        Education.countDocuments(),
        Service.countDocuments(),
        Testimonial.countDocuments(),
        Skill.countDocuments(),
        Message.countDocuments({ status: 'unread' }),
        Message.countDocuments(),
        SocialLink.countDocuments(),
        Analytics.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }),
      ]);

    // Recent messages (last 5)
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    // Recent blog posts (last 5)
    const recentBlogPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug status publishedAt createdAt views');

    // Recent analytics (last 7 days daily views)
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentViews = await Analytics.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', views: 1, _id: 0 } },
    ]);

    // Blog status breakdown
    const blogStatusBreakdown = await BlogPost.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Message status breakdown
    const messageStatusBreakdown = await Message.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          projects: projectCount,
          featuredProjects: featuredProjectCount,
          blogPosts: blogCount,
          publishedBlogPosts: publishedBlogCount,
          experiences: experienceCount,
          education: educationCount,
          services: serviceCount,
          testimonials: testimonialCount,
          skills: skillCount,
          unreadMessages,
          totalMessages,
          socialLinks: socialLinkCount,
          monthlyViews: analyticsCount,
        },
        recent: {
          messages: recentMessages,
          blogPosts: recentBlogPosts,
          views: recentViews,
        },
        breakdowns: {
          blogStatus: blogStatusBreakdown.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          messageStatus: messageStatusBreakdown.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };
