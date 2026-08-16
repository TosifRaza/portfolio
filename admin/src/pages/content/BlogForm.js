// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { blogApi } from '../../api/endpoints';
// import { Save, ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';

// const BlogForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditing = !!id;
//   const [loading, setLoading] = useState(isEditing);
//   const [saving, setSaving] = useState(false);
//   const [coverFile, setCoverFile] = useState(null);
//   const [coverPreview, setCoverPreview] = useState('');

//   const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

//   const title = watch('title') || '';

//   // Auto-generate slug from title
//   useEffect(() => {
//     if (!isEditing && title) {
//       const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//       setValue('slug', slug);
//     }
//   }, [title, isEditing, setValue]);

//   useEffect(() => {
//     if (isEditing) {
//       const fetchPost = async () => {
//         try {
//           // For editing, we'll use slug from the ID
//           const res = await blogApi.getBySlug(id);
//           if (res.data?.success) {
//             const post = res.data.data;
//             setValue('title', post.title || '');
//             setValue('slug', post.slug || '');
//             setValue('content', post.content || '');
//             setValue('excerpt', post.excerpt || '');
//             setValue('category', post.category || '');
//             setValue('tags', (post.tags || []).join(', '));
//             setValue('isPublished', post.isPublished !== false);
//             setValue('seoTitle', post.seoTitle || '');
//             setValue('seoDescription', post.seoDescription || '');
//             setCoverPreview(post.coverImage || '');
//           }
//         } catch {
//           // Try fetching by ID directly
//           try {
//             const res = await blogApi.getAll();
//             if (res.data?.success) {
//               const post = (res.data.data || []).find((p) => p._id === id);
//               if (post) {
//                 setValue('title', post.title || '');
//                 setValue('slug', post.slug || '');
//                 setValue('content', post.content || '');
//                 setValue('excerpt', post.excerpt || '');
//                 setValue('category', post.category || '');
//                 setValue('tags', (post.tags || []).join(', '));
//                 setValue('isPublished', post.isPublished !== false);
//                 setValue('seoTitle', post.seoTitle || '');
//                 setValue('seoDescription', post.seoDescription || '');
//                 setCoverPreview(post.coverImage || '');
//               }
//             }
//           } catch {
//             toast.error('Failed to load post');
//           }
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchPost();
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, isEditing]);

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const formData = new FormData();
//       formData.append('title', data.title);
//       formData.append('slug', data.slug);
//       formData.append('content', data.content);
//       formData.append('excerpt', data.excerpt);
//       formData.append('category', data.category);
//       formData.append('tags', data.tags);
//       formData.append('isPublished', data.isPublished ? 'true' : 'false');
//       formData.append('seoTitle', data.seoTitle);
//       formData.append('seoDescription', data.seoDescription);
//       if (coverFile) formData.append('coverImage', coverFile);

//       let res;
//       if (isEditing) {
//         res = await blogApi.update(id, formData);
//       } else {
//         res = await blogApi.create(formData);
//       }
//       if (res.data?.success) {
//         toast.success(isEditing ? 'Post updated' : 'Post created');
//         navigate('/blog');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to save post');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setCoverPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <button onClick={() => navigate('/blog')} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
//           <ArrowLeft className="h-5 w-5" />
//         </button>
//         <h2 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Post' : 'New Post'}</h2>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
//         {/* Main Content */}
//         <div className="space-y-4 lg:col-span-2">
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
//                 <input {...register('title', { required: 'Title is required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-lg font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Post title..." />
//                 {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
//               </div>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
//                 <input {...register('slug')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="post-url-slug" />
//               </div>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Content <span className="text-red-500">*</span></label>
//                 <textarea {...register('content', { required: 'Content is required' })} rows={16} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono" placeholder="Write your blog content here..." />
//                 {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
//               </div>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Excerpt</label>
//                 <textarea {...register('excerpt')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="A brief summary of the post..." />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-4">
//           {/* Publish */}
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h3 className="mb-4 text-sm font-semibold text-gray-900">Publish</h3>
//             <div className="flex items-center gap-2 mb-4">
//               <input type="checkbox" id="isPublished" {...register('isPublished')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
//               <label htmlFor="isPublished" className="text-sm text-gray-700">Publish immediately</label>
//             </div>
//             <button
//               type="submit"
//               disabled={saving}
//               className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
//             >
//               {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//               {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
//             </button>
//           </div>

//           {/* Cover Image */}
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h3 className="mb-4 text-sm font-semibold text-gray-900">Cover Image</h3>
//             {coverPreview && (
//               <div className="mb-3 relative">
//                 <img src={coverPreview} alt="Cover" className="w-full rounded-lg border object-cover" style={{ maxHeight: '200px' }} />
//                 <button type="button" onClick={() => { setCoverFile(null); setCoverPreview(''); }} className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"><X className="h-3 w-3" /></button>
//               </div>
//             )}
//             <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600">
//               <Upload className="h-4 w-4" /> Upload Image
//               <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
//             </label>
//           </div>

//           {/* Category & Tags */}
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h3 className="mb-4 text-sm font-semibold text-gray-900">Category & Tags</h3>
//             <div className="mb-3">
//               <label className="mb-1.5 block text-xs font-medium text-gray-500">Category</label>
//               <input {...register('category')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. Technology" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-xs font-medium text-gray-500">Tags (comma separated)</label>
//               <input {...register('tags')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="react, javascript, web" />
//             </div>
//           </div>

//           {/* SEO */}
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h3 className="mb-4 text-sm font-semibold text-gray-900">SEO</h3>
//             <div className="mb-3">
//               <label className="mb-1.5 block text-xs font-medium text-gray-500">SEO Title</label>
//               <input {...register('seoTitle')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-xs font-medium text-gray-500">SEO Description</label>
//               <textarea {...register('seoDescription')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogApi } from '../../api/endpoints';
import { Save, ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const title = watch('title') || '';

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setValue('slug', slug);
    }
  }, [title, isEditing, setValue]);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          // For editing, we'll use slug from the ID
          const res = await blogApi.getBySlug(id);
          if (res.data?.success) {
            const post = res.data.data;
            setValue('title', post.title || '');
            setValue('slug', post.slug || '');
            setValue('content', post.content || '');
            setValue('excerpt', post.excerpt || '');
            setValue('category', post.category || '');
            setValue('tags', (post.tags || []).join(', '));
            setValue('isPublished', post.isPublished !== false);
            setValue('seoTitle', post.seoTitle || '');
            setValue('seoDescription', post.seoDescription || '');
            setCoverPreview(post.coverImage || '');
          }
        } catch {
          // Try fetching by ID directly
          try {
            const res = await blogApi.getAll();
            if (res.data?.success) {
              const post = (res.data.data || []).find((p) => p._id === id);
              if (post) {
                setValue('title', post.title || '');
                setValue('slug', post.slug || '');
                setValue('content', post.content || '');
                setValue('excerpt', post.excerpt || '');
                setValue('category', post.category || '');
                setValue('tags', (post.tags || []).join(', '));
                setValue('isPublished', post.isPublished !== false);
                setValue('seoTitle', post.seoTitle || '');
                setValue('seoDescription', post.seoDescription || '');
                setCoverPreview(post.coverImage || '');
              }
            }
          } catch {
            toast.error('Failed to load post');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditing]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug || undefined,
        content: data.content,
        excerpt: data.excerpt || '',
        category: data.category || '',
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        status: data.isPublished ? 'published' : 'draft',
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
      };
      if (coverPreview && !coverFile) payload.coverImage = coverPreview;

      let res;
      if (isEditing) {
        res = await blogApi.update(id, payload);
      } else {
        res = await blogApi.create(payload);
      }
      if (res.data?.success) {
        toast.success(isEditing ? 'Post updated' : 'Post created');
        navigate('/blog');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/blog')} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Post' : 'New Post'}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                <input {...register('title', { required: 'Title is required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-lg font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Post title..." />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
                <input {...register('slug')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="post-url-slug" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Content <span className="text-red-500">*</span></label>
                <textarea {...register('content', { required: 'Content is required' })} rows={16} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono" placeholder="Write your blog content here..." />
                {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea {...register('excerpt')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="A brief summary of the post..." />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Publish</h3>
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="isPublished" {...register('isPublished')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
              <label htmlFor="isPublished" className="text-sm text-gray-700">Publish immediately</label>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Cover Image</h3>
            {coverPreview && (
              <div className="mb-3 relative">
                <img src={coverPreview} alt="Cover" className="w-full rounded-lg border object-cover" style={{ maxHeight: '200px' }} />
                <button type="button" onClick={() => { setCoverFile(null); setCoverPreview(''); }} className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"><X className="h-3 w-3" /></button>
              </div>
            )}
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600">
              <Upload className="h-4 w-4" /> Upload Image
              <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
            </label>
          </div>

          {/* Category & Tags */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Category & Tags</h3>
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Category</label>
              <input {...register('category')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. Technology" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Tags (comma separated)</label>
              <input {...register('tags')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="react, javascript, web" />
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">SEO</h3>
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">SEO Title</label>
              <input {...register('seoTitle')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">SEO Description</label>
              <textarea {...register('seoDescription')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
