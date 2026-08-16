const Analytics = require('../models/Analytics');
const { getDeviceInfo } = require('../utils/helpers');

// Public: track page view
const trackPageView = async (req, res, next) => {
  try {
    const { page, sessionId } = req.body;

    if (!page) {
      return res.status(400).json({ success: false, message: 'Page is required' });
    }

    const { browser, os, device } = getDeviceInfo(req.get('User-Agent'));

    const analytics = await Analytics.create({
      page,
      referrer: req.get('Referer') || req.body.referrer || '',
      ipAddress: req.ip || '',
      userAgent: req.get('User-Agent') || '',
      browser,
      os,
      device,
      sessionId: sessionId || '',
    });

    res.status(201).json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

// Admin: get analytics stats
const getAnalytics = async (req, res, next) => {
  try {
    const { period, startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else if (period) {
      const now = new Date();
      let from;
      switch (period) {
        case 'today':
          from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'year':
          from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      dateFilter = { createdAt: { $gte: from } };
    }

    // Page views over time (daily)
    const dailyViews = await Analytics.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          views: { $sum: 1 },
          uniqueSessions: { $addToSet: '$sessionId' },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          views: 1,
          uniqueVisitors: { $size: '$uniqueSessions' },
          _id: 0,
        },
      },
    ]);

    // Top pages
    const topPages = await Analytics.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$page', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { page: '$_id', views: 1, _id: 0 } },
    ]);

    // Device breakdown
    const deviceBreakdown = await Analytics.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { device: '$_id', count: 1, _id: 0 } },
    ]);

    // Browser breakdown
    const browserBreakdown = await Analytics.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { browser: '$_id', count: 1, _id: 0 } },
    ]);

    // OS breakdown
    const osBreakdown = await Analytics.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { os: '$_id', count: 1, _id: 0 } },
    ]);

    // Total stats
    const totalStats = await Analytics.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalViews: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' },
        },
      },
      {
        $project: {
          totalViews: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
          _id: 0,
        },
      },
    ]);

    // Referrers
    const referrers = await Analytics.aggregate([
      { $match: { ...dateFilter, referrer: { $ne: '' } } },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { referrer: '$_id', count: 1, _id: 0 } },
    ]);

    res.json({
      success: true,
      data: {
        totalStats: totalStats[0] || { totalViews: 0, uniqueVisitors: 0 },
        dailyViews,
        topPages,
        deviceBreakdown,
        browserBreakdown,
        osBreakdown,
        referrers,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackPageView, getAnalytics };
