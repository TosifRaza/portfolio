// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { profileApi } from '../../api/endpoints';
// import { Save, Loader2, Plus, Trash2, Upload } from 'lucide-react';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [savingStats, setSavingStats] = useState(false);
//   const [savingHighlights, setSavingHighlights] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   const { register, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await profileApi.get();
//         if (res.data?.success) {
//           const data = res.data.data;
//           setProfile(data);
//           reset({
//             name: data.name || '',
//             title: data.title || '',
//             subtitle: data.subtitle || '',
//             description: data.description || '',
//             location: data.location || '',
//             availability: data.availability || 'available',
//             bio: data.bio || '',
//             careerObjective: data.careerObjective || '',
//           });
//           setImagePreview(data.profileImage || '');
//         }
//       } catch (err) {
//         toast.error('Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await profileApi.get();
//       if (res.data?.success) {
//         const data = res.data.data;
//         setProfile(data);
//         reset({
//           name: data.name || '',
//           title: data.title || '',
//           subtitle: data.subtitle || '',
//           description: data.description || '',
//           location: data.location || '',
//           availability: data.availability || 'available',
//           bio: data.bio || '',
//           careerObjective: data.careerObjective || '',
//         });
//         setImagePreview(data.profileImage || '');
//       }
//     } catch (err) {
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmitBasic = async (data) => {
//     setSaving(true);
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (data[key] !== undefined && data[key] !== '') {
//           formData.append(key, data[key]);
//         }
//       });
//       if (imageFile) {
//         formData.append('profileImage', imageFile);
//       }

//       const res = await profileApi.update(formData);
//       if (res.data?.success) {
//         toast.success('Profile updated successfully');
//         fetchProfile();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const addStatistic = () => {
//     setProfile((prev) => ({
//       ...prev,
//       statistics: [...(prev.statistics || []), { label: '', value: '', icon: '' }],
//     }));
//   };

//   const removeStatistic = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       statistics: prev.statistics.filter((_, i) => i !== index),
//     }));
//   };

//   const updateStatistic = (index, field, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       statistics: prev.statistics.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
//     }));
//   };

//   const saveStatistics = async () => {
//     setSavingStats(true);
//     try {
//       const res = await profileApi.updateStatistics({ statistics: profile.statistics });
//       if (res.data?.success) {
//         toast.success('Statistics saved');
//       }
//     } catch (err) {
//       toast.error('Failed to save statistics');
//     } finally {
//       setSavingStats(false);
//     }
//   };

//   const addHighlight = () => {
//     setProfile((prev) => ({
//       ...prev,
//       highlights: [...(prev.highlights || []), { text: '', icon: '' }],
//     }));
//   };

//   const removeHighlight = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       highlights: prev.highlights.filter((_, i) => i !== index),
//     }));
//   };

//   const updateHighlight = (index, field, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       highlights: prev.highlights.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
//     }));
//   };

//   const saveHighlights = async () => {
//     setSavingHighlights(true);
//     try {
//       const res = await profileApi.updateHighlights({ highlights: profile.highlights });
//       if (res.data?.success) {
//         toast.success('Highlights saved');
//       }
//     } catch (err) {
//       toast.error('Failed to save highlights');
//     } finally {
//       setSavingHighlights(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner size="lg" className="py-20" />;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Basic Info */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <h3 className="mb-6 text-lg font-semibold text-gray-900">Basic Information</h3>
//         <form onSubmit={handleSubmit(onSubmitBasic)} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
//               <input {...register('name')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
//               <input {...register('title')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Subtitle</label>
//               <input {...register('subtitle')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
//               <input {...register('location')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Availability</label>
//               <select {...register('availability')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
//                 <option value="available">Available</option>
//                 <option value="unavailable">Unavailable</option>
//                 <option value="busy">Busy</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
//             <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Bio</label>
//             <textarea {...register('bio')} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Career Objective</label>
//             <textarea {...register('careerObjective')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//           </div>

//           {/* Profile Image */}
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Profile Image</label>
//             <div className="flex items-center gap-4">
//               {imagePreview && (
//                 <img src={imagePreview} alt="Profile" className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover" />
//               )}
//               <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
//                 <Upload className="h-4 w-4" />
//                 Upload Image
//                 <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={saving}
//               className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
//             >
//               {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//               Save Profile
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Statistics */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
//           <button onClick={addStatistic} className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
//             <Plus className="h-4 w-4" /> Add
//           </button>
//         </div>
//         <div className="space-y-3">
//           {(profile?.statistics || []).map((stat, index) => (
//             <div key={index} className="flex items-end gap-3">
//               <div className="flex-1">
//                 <input
//                   value={stat.label}
//                   onChange={(e) => updateStatistic(index, 'label', e.target.value)}
//                   placeholder="Label"
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//               <div className="flex-1">
//                 <input
//                   value={stat.value}
//                   onChange={(e) => updateStatistic(index, 'value', e.target.value)}
//                   placeholder="Value"
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//               <div className="w-32">
//                 <input
//                   value={stat.icon || ''}
//                   onChange={(e) => updateStatistic(index, 'icon', e.target.value)}
//                   placeholder="Icon name"
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//               <button onClick={() => removeStatistic(index)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={saveStatistics}
//             disabled={savingStats}
//             className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
//           >
//             {savingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//             Save Statistics
//           </button>
//         </div>
//       </div>

//       {/* Highlights */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">Highlights</h3>
//           <button onClick={addHighlight} className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
//             <Plus className="h-4 w-4" /> Add
//           </button>
//         </div>
//         <div className="space-y-3">
//           {(profile?.highlights || []).map((hl, index) => (
//             <div key={index} className="flex items-end gap-3">
//               <div className="flex-1">
//                 <input
//                   value={hl.text}
//                   onChange={(e) => updateHighlight(index, 'text', e.target.value)}
//                   placeholder="Highlight text"
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//               <div className="w-32">
//                 <input
//                   value={hl.icon || ''}
//                   onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
//                   placeholder="Icon"
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//               <button onClick={() => removeHighlight(index)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={saveHighlights}
//             disabled={savingHighlights}
//             className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
//           >
//             {savingHighlights ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//             Save Highlights
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileApi } from '../../api/endpoints';
import { Save, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingStats, setSavingStats] = useState(false);
  const [savingHighlights, setSavingHighlights] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileApi.get();
        if (res.data?.success) {
          const data = res.data.data;
          setProfile(data);
          reset({
            name: data.name || '',
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            location: data.location || '',
            availability: data.availability || 'available',
            bio: data.bio || '',
            careerObjective: data.careerObjective || '',
          });
          setImagePreview(data.avatar || data.profileImage || '');
        }
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await profileApi.get();
      if (res.data?.success) {
        const data = res.data.data;
        setProfile(data);
        reset({
          name: data.name || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          location: data.location || '',
          availability: data.availability || 'available',
          bio: data.bio || '',
          careerObjective: data.careerObjective || '',
        });
        setImagePreview(data.profileImage || '');
      }
    } catch (err) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitBasic = async (data) => {
    setSaving(true);
    try {
      // Send as JSON (not FormData) — backend uses express.json()
      const payload = { ...data };
      if (imageFile) {
        // Convert image to base64 data URL and store as avatar
        const reader = new FileReader();
        reader.onloadend = async () => {
          payload.avatar = reader.result;
          try {
            const res = await profileApi.update(payload);
            if (res.data?.success) {
              toast.success('Profile updated successfully');
              fetchProfile();
              setImageFile(null);
            }
          } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
          } finally {
            setSaving(false);
          }
        };
        reader.readAsDataURL(imageFile);
        return;
      }

      const res = await profileApi.update(payload);
      if (res.data?.success) {
        toast.success('Profile updated successfully');
        fetchProfile();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addStatistic = () => {
    setProfile((prev) => ({
      ...prev,
      statistics: [...(prev.statistics || []), { label: '', value: '', icon: '' }],
    }));
  };

  const removeStatistic = (index) => {
    setProfile((prev) => ({
      ...prev,
      statistics: prev.statistics.filter((_, i) => i !== index),
    }));
  };

  const updateStatistic = (index, field, value) => {
    setProfile((prev) => ({
      ...prev,
      statistics: prev.statistics.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const saveStatistics = async () => {
    setSavingStats(true);
    try {
      const res = await profileApi.updateStatistics({ statistics: profile.statistics });
      if (res.data?.success) {
        toast.success('Statistics saved');
      }
    } catch (err) {
      toast.error('Failed to save statistics');
    } finally {
      setSavingStats(false);
    }
  };

  const addHighlight = () => {
    setProfile((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), { text: '', icon: '' }],
    }));
  };

  const removeHighlight = (index) => {
    setProfile((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const updateHighlight = (index, field, value) => {
    setProfile((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    }));
  };

  const saveHighlights = async () => {
    setSavingHighlights(true);
    try {
      const res = await profileApi.updateHighlights({ highlights: profile.highlights });
      if (res.data?.success) {
        toast.success('Highlights saved');
      }
    } catch (err) {
      toast.error('Failed to save highlights');
    } finally {
      setSavingHighlights(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Basic Information</h3>
        <form onSubmit={handleSubmit(onSubmitBasic)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
              <input {...register('name')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
              <input {...register('title')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Subtitle</label>
              <input {...register('subtitle')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
              <input {...register('location')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Availability</label>
              <select {...register('availability')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Bio</label>
            <textarea {...register('bio')} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Career Objective</label>
            <textarea {...register('careerObjective')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Profile Image</label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img src={imagePreview} alt="Profile" className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover" />
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                <Upload className="h-4 w-4" />
                Upload Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Statistics */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
          <button onClick={addStatistic} className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {(profile?.statistics || []).map((stat, index) => (
            <div key={index} className="flex items-end gap-3">
              <div className="flex-1">
                <input
                  value={stat.label}
                  onChange={(e) => updateStatistic(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex-1">
                <input
                  value={stat.value}
                  onChange={(e) => updateStatistic(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="w-32">
                <input
                  value={stat.icon || ''}
                  onChange={(e) => updateStatistic(index, 'icon', e.target.value)}
                  placeholder="Icon name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <button onClick={() => removeStatistic(index)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={saveStatistics}
            disabled={savingStats}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {savingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Statistics
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Highlights</h3>
          <button onClick={addHighlight} className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {(profile?.highlights || []).map((hl, index) => (
            <div key={index} className="flex items-end gap-3">
              <div className="flex-1">
                <input
                  value={hl.text}
                  onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                  placeholder="Highlight text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="w-32">
                <input
                  value={hl.icon || ''}
                  onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                  placeholder="Icon"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <button onClick={() => removeHighlight(index)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={saveHighlights}
            disabled={savingHighlights}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {savingHighlights ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Highlights
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
