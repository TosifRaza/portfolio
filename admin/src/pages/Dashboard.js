import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyticsApi, messagesApi } from '../api/endpoints';
import {
  FolderKanban,
  Eye,
  Code2,
  Briefcase,
  FileText,
  Mail,
  MessageSquareQuote,
  Plus,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { SkeletonCard } from '../components/ui/Skeleton';

const statCards = [
  { key: 'totalProjects', label: 'Total Projects', icon: FolderKanban, color: 'bg-blue-500', bgLight: 'bg-blue-50' },
  { key: 'publishedProjects', label: 'Published Projects', icon: Eye, color: 'bg-green-500', bgLight: 'bg-green-50' },
  { key: 'totalSkills', label: 'Skills', icon: Code2, color: 'bg-purple-500', bgLight: 'bg-purple-50' },
  { key: 'totalExperience', label: 'Experience', icon: Briefcase, color: 'bg-orange-500', bgLight: 'bg-orange-50' },
  { key: 'totalBlogPosts', label: 'Blog Posts', icon: FileText, color: 'bg-pink-500', bgLight: 'bg-pink-50' },
  { key: 'unreadMessages', label: 'Unread Messages', icon: Mail, color: 'bg-red-500', bgLight: 'bg-red-50' },
  { key: 'totalTestimonials', label: 'Testimonials', icon: MessageSquareQuote, color: 'bg-cyan-500', bgLight: 'bg-cyan-50' },
];

const Dashboard = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [analyticsRes, countsRes] = await Promise.allSettled([
          analyticsApi.getDashboard(),
          messagesApi.getCounts(),
        ]);

        const analyticsData = analyticsRes.status === 'fulfilled' ? analyticsRes.value.data?.data : {};
        const countsData = countsRes.status === 'fulfilled' ? countsRes.value.data?.data : {};

        setStats({
          totalProjects: analyticsData?.totalProjects || 0,
          publishedProjects: analyticsData?.publishedProjects || 0,
          totalSkills: analyticsData?.totalSkills || 0,
          totalExperience: analyticsData?.totalExperience || 0,
          totalBlogPosts: analyticsData?.totalBlogPosts || 0,
          unreadMessages: countsData?.unread || 0,
          totalTestimonials: analyticsData?.totalTestimonials || 0,
        });
      } catch {
        setStats({
          totalProjects: 0,
          publishedProjects: 0,
          totalSkills: 0,
          totalExperience: 0,
          totalBlogPosts: 0,
          unreadMessages: 0,
          totalTestimonials: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {admin?.name || 'Admin'}!</h2>
          <p className="text-sm text-gray-500">Here's an overview of your portfolio.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5">
          <TrendingUp className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">Admin Dashboard</span>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(7)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            const value = stats?.[card.key] || 0;
            return (
              <div key={card.key} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.label}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${card.bgLight}`}>
                    <Icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <FolderKanban className="h-4 w-4" />
            Manage Projects
          </button>
          <button
            onClick={() => navigate('/messages')}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Mail className="h-4 w-4" />
            View Messages
          </button>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <FileText className="h-4 w-4" />
            Manage Blog
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Site Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
