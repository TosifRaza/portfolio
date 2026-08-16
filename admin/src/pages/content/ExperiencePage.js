// import React, { useState, useEffect, useCallback } from 'react';
// import { experienceApi } from '../../api/endpoints';
// import Modal from '../../components/ui/Modal';
// import ConfirmDialog from '../../components/ui/ConfirmDialog';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { Plus, Edit2, Trash2, GripVertical, Save, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const employmentTypes = [
//   { value: 'full-time', label: 'Full Time' },
//   { value: 'part-time', label: 'Part Time' },
//   { value: 'contract', label: 'Contract' },
//   { value: 'freelance', label: 'Freelance' },
//   { value: 'internship', label: 'Internship' },
// ];

// const ExperiencePage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [responsibilities, setResponsibilities] = useState([]);
//   const [achievements, setAchievements] = useState([]);

//   const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

//   const fetchItems = useCallback(async () => {
//     try {
//       const res = await experienceApi.getAll();
//       if (res.data?.success) setItems(res.data.data || []);
//     } catch { toast.error('Failed to load experience'); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchItems(); }, [fetchItems]);

//   const isCurrent = watch('isCurrent');

//   const openAdd = () => {
//     setEditing(null);
//     setResponsibilities([]);
//     setAchievements([]);
//     reset({ company: '', position: '', employmentType: 'full-time', location: '', startDate: '', endDate: '', isCurrent: false, description: '', technologies: '' });
//     setModalOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     setResponsibilities(item.responsibilities || []);
//     setAchievements(item.achievements || []);
//     reset({
//       company: item.company || '', position: item.position || '', employmentType: item.employmentType || 'full-time',
//       location: item.location || '', startDate: item.startDate ? item.startDate.split('T')[0] : '',
//       endDate: item.endDate ? item.endDate.split('T')[0] : '', isCurrent: item.isCurrent || false,
//       description: item.description || '', technologies: (item.technologies || []).join(', '),
//     });
//     setModalOpen(true);
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const payload = { ...data, responsibilities, achievements };
//       if (payload.technologies) payload.technologies = payload.technologies.split(',').map((t) => t.trim()).filter(Boolean);
//       else payload.technologies = [];
//       if (payload.isCurrent) payload.endDate = null;

//       const res = editing ? await experienceApi.update(editing._id, payload) : await experienceApi.create(payload);
//       if (res.data?.success) {
//         toast.success(editing ? 'Updated' : 'Created');
//         setModalOpen(false);
//         fetchItems();
//       }
//     } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
//     finally { setSaving(false); }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try { const res = await experienceApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
//     catch { toast.error('Failed'); }
//     finally { setConfirmDelete(null); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const newItems = [...items];
//     const [moved] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, moved);
//     setItems(newItems);
//     try { await experienceApi.reorder(newItems.map((item, i) => ({ id: item._id, order: i }))); }
//     catch { fetchItems(); }
//   };

//   const addListItem = (setter, list) => setter([...list, '']);
//   const removeListItem = (setter, list, index) => setter(list.filter((_, i) => i !== index));
//   const updateListItem = (setter, list, index, value) => setter(list.map((item, i) => (i === index ? value : item)));

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{items.length} entries</p>
//         <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           <Plus className="h-4 w-4" /> Add Experience
//         </button>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="exp-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {items.map((item, index) => (
//                 <Draggable key={item._id} draggableId={item._id} index={index}>
//                   {(dragProvided) => (
//                     <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-gray-900">{item.position}</span>
//                           <span className="text-gray-400">at</span>
//                           <span className="text-gray-700">{item.company}</span>
//                           {item.isCurrent && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Current</span>}
//                         </div>
//                         <p className="text-xs text-gray-500">{item.employmentType} · {item.location} · {item.startDate?.split('T')[0]} - {item.endDate?.split('T')[0] || 'Present'}</p>
//                       </div>
//                       <div className="flex gap-1.5">
//                         <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"><Edit2 className="h-4 w-4" /></button>
//                         <button onClick={() => setConfirmDelete(item._id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
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

//       {items.length === 0 && <div className="py-16 text-center text-gray-500">No experience entries yet.</div>}

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'} size="lg">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Company <span className="text-red-500">*</span></label>
//               <input {...register('company', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Position <span className="text-red-500">*</span></label>
//               <input {...register('position', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>}
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Employment Type</label>
//               <select {...register('employmentType')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
//                 {employmentTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
//               <input {...register('location')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
//               <input type="date" {...register('startDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
//               <input type="date" {...register('endDate')} disabled={isCurrent} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:bg-gray-100" />
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <input type="checkbox" id="isCurrent" {...register('isCurrent')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
//             <label htmlFor="isCurrent" className="text-sm text-gray-700">Currently working here</label>
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
//             <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//           </div>
//           {/* Responsibilities */}
//           <div>
//             <div className="mb-1.5 flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Responsibilities</label>
//               <button type="button" onClick={() => addListItem(setResponsibilities, responsibilities)} className="text-xs text-indigo-600">+ Add</button>
//             </div>
//             {responsibilities.map((r, i) => (
//               <div key={i} className="mb-2 flex gap-2">
//                 <input value={r} onChange={(e) => updateListItem(setResponsibilities, responsibilities, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 <button type="button" onClick={() => removeListItem(setResponsibilities, responsibilities, i)} className="text-red-500"><X className="h-4 w-4" /></button>
//               </div>
//             ))}
//           </div>
//           {/* Achievements */}
//           <div>
//             <div className="mb-1.5 flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Achievements</label>
//               <button type="button" onClick={() => addListItem(setAchievements, achievements)} className="text-xs text-indigo-600">+ Add</button>
//             </div>
//             {achievements.map((a, i) => (
//               <div key={i} className="mb-2 flex gap-2">
//                 <input value={a} onChange={(e) => updateListItem(setAchievements, achievements, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 <button type="button" onClick={() => removeListItem(setAchievements, achievements, i)} className="text-red-500"><X className="h-4 w-4" /></button>
//               </div>
//             ))}
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
//             <input {...register('technologies')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="React, Node.js" />
//           </div>
//           <div className="flex justify-end gap-3 pt-2">
//             <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
//             <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
//               {saving ? <Save className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//               {editing ? 'Update' : 'Create'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       <ConfirmDialog isOpen={!!confirmDelete} title="Delete Experience" message="Are you sure you want to delete this entry?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
//     </div>
//   );
// };

// export default ExperiencePage;
import React, { useState, useEffect, useCallback } from 'react';
import { experienceApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const employmentTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
];

const ExperiencePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [responsibilities, setResponsibilities] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const fetchItems = useCallback(async () => {
    try {
      const res = await experienceApi.getAll();
      if (res.data?.success) setItems(res.data.data || []);
    } catch { toast.error('Failed to load experience'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const isCurrent = watch('isCurrent');

  const openAdd = () => {
    setEditing(null);
    setResponsibilities([]);
    setAchievements([]);
    reset({ company: '', position: '', employmentType: 'full-time', location: '', startDate: '', endDate: '', isCurrent: false, description: '', technologies: '' }, { shouldValidate: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setResponsibilities(item.responsibilities || item.highlights || []);
    setAchievements(item.achievements || []);
    reset({
      company: item.company || '', position: item.position || '', employmentType: item.employmentType || 'full-time',
      location: item.location || '', startDate: item.startDate ? item.startDate.split('T')[0] : '',
      endDate: item.endDate ? item.endDate.split('T')[0] : '', isCurrent: item.current || item.isCurrent || false,
      description: item.description || '', technologies: (item.technologies || []).join(', '),
    }, { shouldValidate: true });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Map form fields to model fields
      const { isCurrent, employmentType, responsibilities: _resp, ...rest } = data;
      const payload = {
        ...rest,
        current: !!isCurrent,
        highlights: [...(responsibilities || []), ...(achievements || [])],
      };
      if (payload.technologies) payload.technologies = payload.technologies.split(',').map((t) => t.trim()).filter(Boolean);
      else payload.technologies = [];
      if (payload.current) payload.endDate = null;

      const res = editing ? await experienceApi.update(editing._id, payload) : await experienceApi.create(payload);
      if (res.data?.success) {
        toast.success(editing ? 'Updated' : 'Created');
        setModalOpen(false);
        fetchItems();
      }
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try { const res = await experienceApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Failed'); }
    finally { setConfirmDelete(null); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const newItems = [...items];
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
    try { await experienceApi.reorder(newItems.map((item, i) => ({ id: item._id, order: i }))); }
    catch { fetchItems(); }
  };

  const addListItem = (setter, list) => setter([...list, '']);
  const removeListItem = (setter, list, index) => setter(list.filter((_, i) => i !== index));
  const updateListItem = (setter, list, index, value) => setter(list.map((item, i) => (i === index ? value : item)));

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} entries</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="exp-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{item.position}</span>
                          <span className="text-gray-400">at</span>
                          <span className="text-gray-700">{item.company}</span>
                          {(item.current || item.isCurrent) && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Current</span>}
                        </div>
                        <p className="text-xs text-gray-500">{item.employmentType} · {item.location} · {item.startDate?.split('T')[0]} - {item.endDate?.split('T')[0] || 'Present'}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => setConfirmDelete(item._id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
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

      {items.length === 0 && <div className="py-16 text-center text-gray-500">No experience entries yet.</div>}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Company <span className="text-red-500">*</span></label>
              <input {...register('company', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Position <span className="text-red-500">*</span></label>
              <input {...register('position', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Employment Type</label>
              <select {...register('employmentType')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                {employmentTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
              <input {...register('location')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" {...register('startDate', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" {...register('endDate')} disabled={isCurrent} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:bg-gray-100" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isCurrent" {...register('isCurrent')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
            <label htmlFor="isCurrent" className="text-sm text-gray-700">Currently working here</label>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea {...register('description', { required: 'Required' })} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
          </div>
          {/* Responsibilities */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Responsibilities</label>
              <button type="button" onClick={() => addListItem(setResponsibilities, responsibilities)} className="text-xs text-indigo-600">+ Add</button>
            </div>
            {responsibilities.map((r, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={r} onChange={(e) => updateListItem(setResponsibilities, responsibilities, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                <button type="button" onClick={() => removeListItem(setResponsibilities, responsibilities, i)} className="text-red-500"><X className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          {/* Achievements */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Achievements</label>
              <button type="button" onClick={() => addListItem(setAchievements, achievements)} className="text-xs text-indigo-600">+ Add</button>
            </div>
            {achievements.map((a, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={a} onChange={(e) => updateListItem(setAchievements, achievements, i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                <button type="button" onClick={() => removeListItem(setAchievements, achievements, i)} className="text-red-500"><X className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
            <input {...register('technologies')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="React, Node.js" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
              {saving ? <Save className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Experience" message="Are you sure you want to delete this entry?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default ExperiencePage;
