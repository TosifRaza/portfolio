import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../api/endpoints';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await blogApi.getAll();
      if (res.data?.success) setPosts(res.data.data || []);
    } catch { toast.error('Failed to load blog posts'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await blogApi.delete(confirmDelete);
      if (res.data?.success) toast.success('Post deleted');
      fetchPosts();
    } catch { toast.error('Failed to delete'); }
    finally { setConfirmDelete(null); }
  };

  const togglePublish = async (post) => {
    try {
      const res = await blogApi.togglePublish(post._id);
      if (res.data?.success) { toast.success(res.data.message || 'Updated'); fetchPosts(); }
    } catch { toast.error('Failed to toggle publish'); }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{posts.length} posts</p>
        <button onClick={() => navigate('/blog/new')} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Tags</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Date</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post._id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {post.coverImage && <img src={post.coverImage} alt="" className="h-10 w-14 rounded-lg object-cover" />}
                    <div>
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.readingTime ? `${post.readingTime} min read` : ''}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 capitalize">{post.category || 'Uncategorized'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(post.tags || []).slice(0, 3).map((tag, i) => (
                      <span key={i} className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs text-indigo-600">{tag}</span>
                    ))}
                    {(post.tags || []).length > 3 && <span className="text-xs text-gray-400">+{(post.tags || []).length - 3}</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => togglePublish(post)}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.isPublished !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {post.isPublished !== false ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => togglePublish(post)} className={`rounded-lg p-1.5 ${post.isPublished !== false ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                      {post.isPublished !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button onClick={() => navigate(`/blog/edit/${post._id}`)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => setConfirmDelete(post._id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No blog posts yet.</p>
          <button onClick={() => navigate('/blog/new')} className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700">Create your first post →</button>
        </div>
      )}

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Post" message="Are you sure? This cannot be undone." confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default BlogPage;
