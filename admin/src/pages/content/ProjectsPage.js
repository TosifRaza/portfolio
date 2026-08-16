// import React, { useState, useEffect, useCallback } from 'react';
// import { projectsApi } from '../../api/endpoints';
// import Modal from '../../components/ui/Modal';
// import ConfirmDialog from '../../components/ui/ConfirmDialog';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Star, Save, Upload, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const categoryOptions = [
//   { value: 'web', label: 'Web Application' },
//   { value: 'mobile', label: 'Mobile App' },
//   { value: 'api', label: 'API / Backend' },
//   { value: 'desktop', label: 'Desktop' },
//   { value: 'library', label: 'Library / Package' },
//   { value: 'design', label: 'Design' },
//   { value: 'other', label: 'Other' },
// ];

// const ProjectsPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingProject, setEditingProject] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [tab, setTab] = useState('basic');
//   const [coverFile, setCoverFile] = useState(null);
//   const [coverPreview, setCoverPreview] = useState('');
//   const [features, setFeatures] = useState([]);
//   const [challenges, setChallenges] = useState([]);
//   const [solutions, setSolutions] = useState([]);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const fetchProjects = useCallback(async () => {
//     try {
//       const res = await projectsApi.getAll();
//       if (res.data?.success) {
//         setProjects(res.data.data || []);
//       }
//     } catch {
//       toast.error('Failed to load projects');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchProjects(); }, [fetchProjects]);

//   const openAdd = () => {
//     setEditingProject(null);
//     setTab('basic');
//     setCoverFile(null);
//     setCoverPreview('');
//     setFeatures([]);
//     setChallenges([]);
//     setSolutions([]);
//     reset({
//       title: '', shortDescription: '', category: 'web', technologies: '', githubUrl: '',
//       liveUrl: '', clientName: '', startDate: '', endDate: '', description: '',
//       features: '', challenges: '', solutions: '', architecture: '', results: '',
//       isPublished: true, isFeatured: false,
//     });
//     setModalOpen(true);
//   };

//   const openEdit = (project) => {
//     setEditingProject(project);
//     setTab('basic');
//     setCoverFile(null);
//     setCoverPreview(project.coverImage || '');
//     setFeatures(project.features || []);
//     setChallenges(project.challenges || []);
//     setSolutions(project.solutions || []);
//     reset({
//       title: project.title || '',
//       shortDescription: project.shortDescription || '',
//       category: project.category || 'web',
//       technologies: (project.technologies || []).join(', '),
//       githubUrl: project.githubUrl || '',
//       liveUrl: project.liveUrl || '',
//       clientName: project.clientName || '',
//       startDate: project.startDate ? project.startDate.split('T')[0] : '',
//       endDate: project.endDate ? project.endDate.split('T')[0] : '',
//       description: project.description || '',
//       architecture: project.architecture || '',
//       results: project.results || '',
//       isPublished: project.isPublished !== false,
//       isFeatured: project.isFeatured || false,
//     });
//     setModalOpen(true);
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (data[key] !== undefined && data[key] !== '') {
//           if (key === 'isPublished' || key === 'isFeatured') {
//             formData.append(key, data[key] ? 'true' : 'false');
//           } else if (key === 'technologies') {
//             formData.append(key, data[key]);
//           } else {
//             formData.append(key, data[key]);
//           }
//         }
//       });
//       formData.append('features', JSON.stringify(features));
//       formData.append('challenges', JSON.stringify(challenges));
//       formData.append('solutions', JSON.stringify(solutions));
//       if (coverFile) formData.append('coverImage', coverFile);

//       let res;
//       if (editingProject?._id) {
//         res = await projectsApi.update(editingProject._id, formData);
//       } else {
//         res = await projectsApi.create(formData);
//       }
//       if (res.data?.success) {
//         toast.success(editingProject ? 'Project updated' : 'Project created');
//         setModalOpen(false);
//         fetchProjects();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Operation failed');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try {
//       const res = await projectsApi.delete(confirmDelete);
//       if (res.data?.success) toast.success('Project deleted');
//       fetchProjects();
//     } catch { toast.error('Failed to delete'); }
//     finally { setConfirmDelete(null); }
//   };

//   const togglePublish = async (project) => {
//     try {
//       const res = await projectsApi.togglePublish(project._id);
//       if (res.data?.success) {
//         toast.success(res.data.message || 'Updated');
//         fetchProjects();
//       }
//     } catch { toast.error('Failed to toggle publish'); }
//   };

//   const toggleFeatured = async (project) => {
//     try {
//       const res = await projectsApi.toggleFeatured(project._id);
//       if (res.data?.success) {
//         toast.success(res.data.message || 'Updated');
//         fetchProjects();
//       }
//     } catch { toast.error('Failed to toggle featured'); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const items = [...projects];
//     const [reordered] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reordered);
//     setProjects(items);
//     try {
//       await projectsApi.reorder(items.map((p, i) => ({ id: p._id, order: i })));
//     } catch { fetchProjects(); }
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

//   const addListItem = (setter, list) => setter([...list, '']);
//   const removeListItem = (setter, list, index) => setter(list.filter((_, i) => i !== index));
//   const updateListItem = (setter, list, index, value) => setter(list.map((item, i) => (i === index ? value : item)));

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{projects.length} projects total</p>
//         <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           <Plus className="h-4 w-4" /> Add Project
//         </button>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="projects-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {projects.map((project, index) => (
//                 <Draggable key={project._id} draggableId={project._id} index={index}>
//                   {(dragProvided) => (
//                     <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400 hover:text-gray-600">
//                         <GripVertical className="h-5 w-5" />
//                       </div>
//                       {project.coverImage && (
//                         <img src={project.coverImage} alt="" className="h-12 w-12 rounded-lg object-cover" />
//                       )}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <span className="font-medium text-gray-900">{project.title}</span>
//                           <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 capitalize">{project.category}</span>
//                           {project.isFeatured && (
//                             <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
//                               <Star className="h-3 w-3" /> Featured
//                             </span>
//                           )}
//                         </div>
//                         <p className="mt-1 truncate text-xs text-gray-500">{project.shortDescription}</p>
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <button onClick={() => togglePublish(project)} className={`rounded-lg p-1.5 ${project.isPublished !== false ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title={project.isPublished ? 'Published' : 'Unpublished'}>
//                           {project.isPublished !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
//                         </button>
//                         <button onClick={() => toggleFeatured(project)} className={`rounded-lg p-1.5 ${project.isFeatured ? 'text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-100'}`} title={project.isFeatured ? 'Featured' : 'Not featured'}>
//                           <Star className={`h-4 w-4 ${project.isFeatured ? 'fill-current' : ''}`} />
//                         </button>
//                         <button onClick={() => openEdit(project)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600">
//                           <Edit2 className="h-4 w-4" />
//                         </button>
//                         <button onClick={() => setConfirmDelete(project._id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {projects.length === 0 && (
//         <div className="py-16 text-center">
//           <p className="text-gray-500">No projects yet. Add your first project!</p>
//         </div>
//       )}

//       {/* Modal */}
//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? 'Edit Project' : 'Add Project'} size="lg">
//         {/* Tabs */}
//         <div className="mb-4 flex border-b border-gray-200">
//           {['basic', 'details'].map((t) => (
//             <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${tab === t ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
//               {t === 'basic' ? 'Basic Info' : 'Details'}
//             </button>
//           ))}
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {tab === 'basic' && (
//             <>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
//                 <input {...register('title', { required: 'Title is required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Project title" />
//                 {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
//               </div>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Short Description</label>
//                 <textarea {...register('shortDescription')} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Brief description" />
//               </div>
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
//                   <select {...register('category')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
//                     {categoryOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
//                   <input {...register('technologies')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="React, Node.js, MongoDB" />
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">GitHub URL</label>
//                   <input {...register('githubUrl')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://github.com/..." />
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">Live URL</label>
//                   <input {...register('liveUrl')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." />
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">Client Name</label>
//                   <input {...register('clientName')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
//                   <input type="date" {...register('startDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
//                   <input type="date" {...register('endDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 </div>
//               </div>
//               {/* Cover Image */}
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Cover Image</label>
//                 <div className="flex items-center gap-4">
//                   {coverPreview && (
//                     <div className="relative">
//                       <img src={coverPreview} alt="Cover" className="h-24 w-24 rounded-lg border object-cover" />
//                       <button type="button" onClick={() => { setCoverFile(null); setCoverPreview(''); }} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white"><X className="h-3 w-3" /></button>
//                     </div>
//                   )}
//                   <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                     <Upload className="h-4 w-4" /> Upload
//                     <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
//                   </label>
//                 </div>
//               </div>
//             </>
//           )}

//           {tab === 'details' && (
//             <>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Description</label>
//                 <textarea {...register('description')} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               </div>
//               {/* Features */}
//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label className="text-sm font-medium text-gray-700">Features</label>
//                   <button type="button" onClick={() => addListItem(setFeatures, features)} className="text-xs text-indigo-600 hover:text-indigo-700">+ Add</button>
//                 </div>
//                 {features.map((f, i) => (
//                   <div key={i} className="mb-2 flex gap-2">
//                     <input value={f} onChange={(e) => updateListItem(setFeatures, features, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                     <button type="button" onClick={() => removeListItem(setFeatures, features, i)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
//                   </div>
//                 ))}
//               </div>
//               {/* Challenges */}
//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label className="text-sm font-medium text-gray-700">Challenges</label>
//                   <button type="button" onClick={() => addListItem(setChallenges, challenges)} className="text-xs text-indigo-600 hover:text-indigo-700">+ Add</button>
//                 </div>
//                 {challenges.map((c, i) => (
//                   <div key={i} className="mb-2 flex gap-2">
//                     <input value={c} onChange={(e) => updateListItem(setChallenges, challenges, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                     <button type="button" onClick={() => removeListItem(setChallenges, challenges, i)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
//                   </div>
//                 ))}
//               </div>
//               {/* Solutions */}
//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label className="text-sm font-medium text-gray-700">Solutions</label>
//                   <button type="button" onClick={() => addListItem(setSolutions, solutions)} className="text-xs text-indigo-600 hover:text-indigo-700">+ Add</button>
//                 </div>
//                 {solutions.map((s, i) => (
//                   <div key={i} className="mb-2 flex gap-2">
//                     <input value={s} onChange={(e) => updateListItem(setSolutions, solutions, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                     <button type="button" onClick={() => removeListItem(setSolutions, solutions, i)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Architecture</label>
//                 <textarea {...register('architecture')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               </div>
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">Results</label>
//                 <textarea {...register('results')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               </div>
//             </>
//           )}

//           <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//             <div className="flex items-center gap-4">
//               <label className="flex items-center gap-2 text-sm">
//                 <input type="checkbox" {...register('isPublished')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
//                 Published
//               </label>
//               <label className="flex items-center gap-2 text-sm">
//                 <input type="checkbox" {...register('isFeatured')} className="h-4 w-4 rounded border-gray-300 text-amber-600" />
//                 Featured
//               </label>
//             </div>
//             <div className="flex gap-3">
//               <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
//               <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
//                 {saving ? <Save className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                 {editingProject ? 'Update' : 'Create'}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Modal>

//       <ConfirmDialog isOpen={!!confirmDelete} title="Delete Project" message="Are you sure? This cannot be undone." confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
//     </div>
//   );
// };

// export default ProjectsPage;
import React, { useState, useEffect, useCallback } from 'react';
import { projectsApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Star, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const categoryOptions = [
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'api', label: 'API / Backend' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'library', label: 'Library / Package' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('basic');
  const [coverPreview, setCoverPreview] = useState('');
  const [features, setFeatures] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [solutions, setSolutions] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchProjects = useCallback(async () => {
    try {
      const res = await projectsApi.getAll();
      if (res.data?.success) {
        setProjects(res.data.data || []);
      }
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openAdd = () => {
    setEditingProject(null);
    setTab('basic');
    setCoverPreview('');
    setFeatures([]);
    setChallenges([]);
    setSolutions([]);
    reset({
      title: '', shortDescription: '', category: 'web', technologies: '', githubUrl: '',
      liveUrl: '', clientName: '', startDate: '', endDate: '', description: '',
      features: '', challenges: '', solutions: '', architecture: '', results: '',
      isPublished: true, isFeatured: false,
    });
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setTab('basic');
    setCoverPreview(project.thumbnail || '');
    setFeatures(project.features || []);
    setChallenges(project.challenges || []);
    setSolutions(project.solutions || []);
    reset({
      title: project.title || '',
      shortDescription: project.shortDescription || '',
      category: project.category || 'web',
      technologies: (project.techStack || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      clientName: project.client || '',
      startDate: project.startDate ? project.startDate.split('T')[0] : '',
      endDate: project.endDate ? project.endDate.split('T')[0] : '',
      description: project.description || '',
      architecture: project.architecture || '',
      results: project.results || '',
      isPublished: project.status !== 'planned',
      isFeatured: project.featured || false,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Map form fields to model fields
      const payload = {
        title: data.title,
        shortDescription: data.shortDescription || '',
        description: data.description || '',
        category: data.category || 'web',
        techStack: data.technologies ? data.technologies.split(',').map((t) => t.trim()).filter(Boolean) : [],
        githubUrl: data.githubUrl || '',
        liveUrl: data.liveUrl || '',
        client: data.clientName || '',
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        featured: !!data.isFeatured,
        status: data.isPublished !== false ? 'completed' : 'planned',
      };
      if (data.architecture) payload.architecture = data.architecture;
      if (data.results) payload.results = data.results;
      if (features.length > 0) payload.features = features.filter(Boolean);
      if (challenges.length > 0) payload.challenges = challenges.filter(Boolean);
      if (solutions.length > 0) payload.solutions = solutions.filter(Boolean);

      let res;
      if (editingProject?._id) {
        res = await projectsApi.update(editingProject._id, payload);
      } else {
        res = await projectsApi.create(payload);
      }
      if (res.data?.success) {
        toast.success(editingProject ? 'Project updated' : 'Project created');
        setModalOpen(false);
        fetchProjects();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await projectsApi.delete(confirmDelete);
      if (res.data?.success) toast.success('Project deleted');
      fetchProjects();
    } catch { toast.error('Failed to delete'); }
    finally { setConfirmDelete(null); }
  };

  const togglePublish = async (project) => {
    try {
      const res = await projectsApi.togglePublish(project._id);
      if (res.data?.success) {
        toast.success(res.data.message || 'Updated');
        fetchProjects();
      }
    } catch { toast.error('Failed to toggle publish'); }
  };

  const toggleFeatured = async (project) => {
    try {
      const res = await projectsApi.toggleFeatured(project._id);
      if (res.data?.success) {
        toast.success(res.data.message || 'Updated');
        fetchProjects();
      }
    } catch { toast.error('Failed to toggle featured'); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const items = [...projects];
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setProjects(items);
    try {
      await projectsApi.reorder(items.map((p, i) => ({ id: p._id, order: i })));
    } catch { fetchProjects(); }
  };

  const addListItem = (setter, list) => setter([...list, '']);
  const removeListItem = (setter, list, index) => setter(list.filter((_, i) => i !== index));
  const updateListItem = (setter, list, index, value) => setter(list.map((item, i) => (i === index ? value : item)));

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{projects.length} projects total</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {projects.map((project, index) => (
                <Draggable key={project._id} draggableId={project._id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400 hover:text-gray-600">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      {project.thumbnail && (
                        <img src={project.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-gray-900">{project.title}</span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 capitalize">{project.category}</span>
                          {project.featured && (
                            <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                              <Star className="h-3 w-3" /> Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-1 truncate text-xs text-gray-500">{project.shortDescription}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => togglePublish(project)} className={`rounded-lg p-1.5 ${project.status !== 'planned' ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title={project.status !== 'planned' ? 'Published' : 'Unpublished'}>
                          {project.status !== 'planned' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        <button onClick={() => toggleFeatured(project)} className={`rounded-lg p-1.5 ${project.featured ? 'text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-100'}`} title={project.featured ? 'Featured' : 'Not featured'}>
                          <Star className={`h-4 w-4 ${project.featured ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={() => openEdit(project)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => setConfirmDelete(project._id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {projects.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No projects yet. Add your first project!</p>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? 'Edit Project' : 'Add Project'} size="lg">
        {/* Tabs */}
        <div className="mb-4 flex border-b border-gray-200">
          {['basic', 'details'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${tab === t ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {t === 'basic' ? 'Basic Info' : 'Details'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {tab === 'basic' && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                <input {...register('title', { required: 'Title is required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Project title" />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Short Description</label>
                <textarea {...register('shortDescription')} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Brief description" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                  <select {...register('category')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                    {categoryOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
                  <input {...register('technologies')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="React, Node.js, MongoDB" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">GitHub URL</label>
                  <input {...register('githubUrl')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Live URL</label>
                  <input {...register('liveUrl')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Client Name</label>
                  <input {...register('clientName')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" {...register('startDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
                  <input type="date" {...register('endDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
              </div>
              {/* Thumbnail URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Thumbnail URL</label>
                <input {...register('thumbnail')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." />
              </div>
            </>
          )}

          {tab === 'details' && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Description</label>
                <textarea {...register('description')} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              {/* Features */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Features</label>
                  <button type="button" onClick={() => addListItem(setFeatures, features)} className="text-xs text-indigo-600 hover:text-indigo-700">+ Add</button>
                </div>
                {features.map((f, i) => (
                  <div key={i} className="mb-2 flex gap-2">
                    <input value={f} onChange={(e) => updateListItem(setFeatures, features, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <button type="button" onClick={() => removeListItem(setFeatures, features, i)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              {/* Challenges */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Challenges</label>
                  <button type="button" onClick={() => addListItem(setChallenges, challenges)} className="text-xs text-indigo-600 hover:text-indigo-700">+ Add</button>
                </div>
                {challenges.map((c, i) => (
                  <div key={i} className="mb-2 flex gap-2">
                    <input value={c} onChange={(e) => updateListItem(setChallenges, challenges, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <button type="button" onClick={() => removeListItem(setChallenges, challenges, i)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              {/* Solutions */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Solutions</label>
                  <button type="button" onClick={() => addListItem(setSolutions, solutions)} className="text-xs text-indigo-600 hover:text-indigo-700">+ Add</button>
                </div>
                {solutions.map((s, i) => (
                  <div key={i} className="mb-2 flex gap-2">
                    <input value={s} onChange={(e) => updateListItem(setSolutions, solutions, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <button type="button" onClick={() => removeListItem(setSolutions, solutions, i)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Architecture</label>
                <textarea {...register('architecture')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Results</label>
                <textarea {...register('results')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </div>
            </>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('isPublished')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('isFeatured')} className="h-4 w-4 rounded border-gray-300 text-amber-600" />
                Featured
              </label>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
                {saving ? <Save className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {editingProject ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Project" message="Are you sure? This cannot be undone." confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default ProjectsPage;
