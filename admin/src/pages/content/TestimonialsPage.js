// import React, { useState, useEffect, useCallback } from 'react';
// import { testimonialsApi } from '../../api/endpoints';
// import Modal from '../../components/ui/Modal';
// import ConfirmDialog from '../../components/ui/ConfirmDialog';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { Plus, Edit2, Trash2, GripVertical, Save, Star, Upload, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const TestimonialsPage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const fetchItems = useCallback(async () => {
//     try {
//       const res = await testimonialsApi.getAll();
//       if (res.data?.success) setItems(res.data.data || []);
//     } catch { toast.error('Failed to load testimonials'); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchItems(); }, [fetchItems]);

//   const openAdd = () => {
//     setEditing(null); setImageFile(null); setImagePreview('');
//     reset({ name: '', role: '', company: '', testimonial: '', rating: 5, isVisible: true });
//     setModalOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item); setImageFile(null); setImagePreview(item.image || '');
//     reset({ name: item.name || '', role: item.role || '', company: item.company || '', testimonial: item.testimonial || '', rating: item.rating || 5, isVisible: item.isVisible !== false });
//     setModalOpen(true);
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (data[key] !== undefined) {
//           if (key === 'rating') formData.append(key, Number(data[key]));
//           else if (key === 'isVisible') formData.append(key, data[key] ? 'true' : 'false');
//           else formData.append(key, data[key]);
//         }
//       });
//       if (imageFile) formData.append('image', imageFile);

//       const res = editing ? await testimonialsApi.update(editing._id, formData) : await testimonialsApi.create(formData);
//       if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
//     } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
//     finally { setSaving(false); }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try { const res = await testimonialsApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
//     catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
//   };

//   const toggleVisible = async (item) => {
//     try {
//       const res = await testimonialsApi.update(item._id, { ...item, isVisible: !item.isVisible });
//       if (res.data?.success) { toast.success('Updated'); fetchItems(); }
//     } catch { toast.error('Failed'); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const newItems = [...items];
//     const [moved] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, moved);
//     setItems(newItems);
//     try { await testimonialsApi.reorder(newItems.map((t, i) => ({ id: t._id, order: i }))); } catch { fetchItems(); }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) { setImageFile(file); const reader = new FileReader(); reader.onloadend = () => setImagePreview(reader.result); reader.readAsDataURL(file); }
//   };

//   const renderStars = (count) => (
//     <div className="flex gap-0.5">
//       {[...Array(5)].map((_, i) => (
//         <Star key={i} className={`h-4 w-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
//       ))}
//     </div>
//   );

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{items.length} testimonials</p>
//         <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           <Plus className="h-4 w-4" /> Add Testimonial
//         </button>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="test-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {items.map((item, index) => (
//                 <Draggable key={item._id} draggableId={item._id} index={index}>
//                   {(dragProvided) => (
//                     <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
//                       {item.image && <img src={item.image} alt="" className="h-10 w-10 rounded-full object-cover" />}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-gray-900">{item.name}</span>
//                           <span className="text-xs text-gray-500">{item.role} at {item.company}</span>
//                         </div>
//                         <div className="mt-1">{renderStars(item.rating || 5)}</div>
//                       </div>
//                       <div className="flex gap-1.5">
//                         <button onClick={() => toggleVisible(item)} className={`rounded-lg p-1.5 ${item.isVisible !== false ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
//                           <span className={`inline-block h-4 w-4 rounded-full border-2 ${item.isVisible !== false ? 'border-green-600 bg-green-600' : 'border-gray-300'}`} />
//                         </button>
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

//       {items.length === 0 && <div className="py-16 text-center text-gray-500">No testimonials yet.</div>}

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} size="md">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
//               <input {...register('name', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
//               <input {...register('role')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
//               <input {...register('company')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Rating</label>
//               <select {...register('rating')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
//                 {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Testimonial <span className="text-red-500">*</span></label>
//             <textarea {...register('testimonial', { required: 'Required' })} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             {errors.testimonial && <p className="mt-1 text-xs text-red-500">{errors.testimonial.message}</p>}
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Photo</label>
//             <div className="flex items-center gap-4">
//               {imagePreview && (
//                 <div className="relative">
//                   <img src={imagePreview} alt="" className="h-16 w-16 rounded-full border object-cover" />
//                   <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white"><X className="h-3 w-3" /></button>
//                 </div>
//               )}
//               <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                 <Upload className="h-4 w-4" /> Upload
//                 <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               </label>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <input type="checkbox" id="testVisible" {...register('isVisible')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
//             <label htmlFor="testVisible" className="text-sm text-gray-700">Visible</label>
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

//       <ConfirmDialog isOpen={!!confirmDelete} title="Delete Testimonial" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
//     </div>
//   );
// };

// export default TestimonialsPage;
import React, { useState, useEffect, useCallback } from 'react';
import { testimonialsApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Save, Star, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TestimonialsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchItems = useCallback(async () => {
    try {
      const res = await testimonialsApi.getAll();
      if (res.data?.success) setItems(res.data.data || []);
    } catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => {
    setEditing(null);
    reset({ name: '', role: '', company: '', testimonial: '', rating: 5 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    reset({
      name: item.name || '',
      role: item.position || item.role || '',
      company: item.company || '',
      testimonial: item.content || item.testimonial || '',
      rating: item.rating || 5,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Map form fields to model fields
      const payload = {
        name: data.name,
        position: data.role || '',
        company: data.company || '',
        content: data.testimonial,
        rating: Number(data.rating) || 5,
      };

      const res = editing
        ? await testimonialsApi.update(editing._id, payload)
        : await testimonialsApi.create(payload);
      if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try { const res = await testimonialsApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
  };

  const toggleFeatured = async (item) => {
    try {
      const res = await testimonialsApi.update(item._id, { featured: !item.featured });
      if (res.data?.success) { toast.success('Updated'); fetchItems(); }
    } catch { toast.error('Failed'); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const newItems = [...items];
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
    try { await testimonialsApi.reorder(newItems.map((t, i) => ({ id: t._id, order: i }))); } catch { fetchItems(); }
  };

  const renderStars = (count) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} testimonials</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="test-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
                      {item.avatar && <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-xs text-gray-500">{item.position || item.role} {item.company ? `at ${item.company}` : ''}</span>
                        </div>
                        <div className="mt-1">{renderStars(item.rating || 5)}</div>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => toggleFeatured(item)} className={`rounded-lg p-1.5 ${item.featured ? 'text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                          <Star className={`h-4 w-4 ${item.featured ? 'fill-amber-400' : ''}`} />
                        </button>
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

      {items.length === 0 && <div className="py-16 text-center text-gray-500">No testimonials yet.</div>}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <input {...register('name', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Role / Position</label>
              <input {...register('role')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
              <input {...register('company')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Rating</label>
              <select {...register('rating')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Testimonial <span className="text-red-500">*</span></label>
            <textarea {...register('testimonial', { required: 'Required' })} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            {errors.testimonial && <p className="mt-1 text-xs text-red-500">{errors.testimonial.message}</p>}
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

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Testimonial" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default TestimonialsPage;
