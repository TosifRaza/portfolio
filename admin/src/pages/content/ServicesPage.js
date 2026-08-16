// import React, { useState, useEffect, useCallback } from 'react';
// import { servicesApi } from '../../api/endpoints';
// import Modal from '../../components/ui/Modal';
// import ConfirmDialog from '../../components/ui/ConfirmDialog';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { Plus, Edit2, Trash2, GripVertical, Save, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const ServicesPage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [features, setFeatures] = useState([]);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const fetchItems = useCallback(async () => {
//     try {
//       const res = await servicesApi.getAll();
//       if (res.data?.success) setItems(res.data.data || []);
//     } catch { toast.error('Failed to load services'); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchItems(); }, [fetchItems]);

//   const openAdd = () => {
//     setEditing(null); setFeatures([]);
//     reset({ icon: '', title: '', description: '', features: '', ctaText: '', ctaLink: '', isVisible: true });
//     setModalOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     setFeatures(item.features || []);
//     reset({
//       icon: item.icon || '', title: item.title || '', description: item.description || '',
//       ctaText: item.ctaText || '', ctaLink: item.ctaLink || '', isVisible: item.isVisible !== false,
//     });
//     setModalOpen(true);
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const payload = { ...data, features };
//       const res = editing ? await servicesApi.update(editing._id, payload) : await servicesApi.create(payload);
//       if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
//     } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
//     finally { setSaving(false); }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try { const res = await servicesApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
//     catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
//   };

//   const toggleVisible = async (item) => {
//     try {
//       const res = await servicesApi.update(item._id, { ...item, isVisible: !item.isVisible });
//       if (res.data?.success) { toast.success('Updated'); fetchItems(); }
//     } catch { toast.error('Failed'); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const newItems = [...items];
//     const [moved] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, moved);
//     setItems(newItems);
//     try { await servicesApi.reorder(newItems.map((s, i) => ({ id: s._id, order: i }))); } catch { fetchItems(); }
//   };

//   const addFeature = () => setFeatures([...features, '']);
//   const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i));
//   const updateFeature = (i, val) => setFeatures(features.map((f, idx) => idx === i ? val : f));

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{items.length} services</p>
//         <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           <Plus className="h-4 w-4" /> Add Service
//         </button>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="svc-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {items.map((item, index) => (
//                 <Draggable key={item._id} draggableId={item._id} index={index}>
//                   {(dragProvided) => (
//                     <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className="text-xl">{item.icon}</span>
//                           <span className="font-medium text-gray-900">{item.title}</span>
//                         </div>
//                         <p className="mt-1 truncate text-xs text-gray-500">{item.description}</p>
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

//       {items.length === 0 && <div className="py-16 text-center text-gray-500">No services yet.</div>}

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'} size="md">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Icon (text/emoji)</label>
//               <input {...register('icon')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="🚀" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
//               <input {...register('title', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
//             </div>
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
//             <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//           </div>
//           <div>
//             <div className="mb-1.5 flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Features</label>
//               <button type="button" onClick={addFeature} className="text-xs text-indigo-600">+ Add</button>
//             </div>
//             {features.map((f, i) => (
//               <div key={i} className="mb-2 flex gap-2">
//                 <input value={f} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 <button type="button" onClick={() => removeFeature(i)} className="text-red-500"><X className="h-4 w-4" /></button>
//               </div>
//             ))}
//           </div>
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">CTA Text</label>
//               <input {...register('ctaText')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Learn More" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">CTA Link</label>
//               <input {...register('ctaLink')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." />
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <input type="checkbox" id="svcVisible" {...register('isVisible')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
//             <label htmlFor="svcVisible" className="text-sm text-gray-700">Visible</label>
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

//       <ConfirmDialog isOpen={!!confirmDelete} title="Delete Service" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
//     </div>
//   );
// };

// export default ServicesPage;
import React, { useState, useEffect, useCallback } from 'react';
import { servicesApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Save, X, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ServicesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [features, setFeatures] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchItems = useCallback(async () => {
    try {
      const res = await servicesApi.getAll();
      if (res.data?.success) setItems(res.data.data || []);
    } catch { toast.error('Failed to load services'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => {
    setEditing(null); setFeatures([]);
    reset({ icon: '', title: '', description: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFeatures(item.features || []);
    reset({
      icon: item.icon || '', title: item.title || '', description: item.description || ''
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Only send fields that exist in the Service model
      const { ctaText, ctaLink, isVisible, ...payload } = data;
      payload.features = features;
      const res = editing ? await servicesApi.update(editing._id, payload) : await servicesApi.create(payload);
      if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try { const res = await servicesApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
  };

  const toggleFeatured = async (item) => {
    try {
      const res = await servicesApi.update(item._id, { featured: !item.featured });
      if (res.data?.success) { toast.success('Updated'); fetchItems(); }
    } catch { toast.error('Failed'); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const newItems = [...items];
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
    try { await servicesApi.reorder(newItems.map((s, i) => ({ id: s._id, order: i }))); } catch { fetchItems(); }
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i));
  const updateFeature = (i, val) => setFeatures(features.map((f, idx) => idx === i ? val : f));

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} services</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="svc-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium text-gray-900">{item.title}</span>
                        </div>
                        <p className="mt-1 truncate text-xs text-gray-500">{item.description}</p>
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

      {items.length === 0 && <div className="py-16 text-center text-gray-500">No services yet.</div>}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Icon (text/emoji)</label>
              <input {...register('icon')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="🚀" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
              <input {...register('title', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Features</label>
              <button type="button" onClick={addFeature} className="text-xs text-indigo-600">+ Add</button>
            </div>
            {features.map((f, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={f} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                <button type="button" onClick={() => removeFeature(i)} className="text-red-500"><X className="h-4 w-4" /></button>
              </div>
            ))}
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

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Service" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default ServicesPage;
