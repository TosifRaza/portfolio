// import React, { useState, useEffect, useCallback } from 'react';
// import { socialLinksApi } from '../../api/endpoints';
// import Modal from '../../components/ui/Modal';
// import ConfirmDialog from '../../components/ui/ConfirmDialog';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { Plus, Edit2, Trash2, GripVertical, Save, ExternalLink } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const SocialLinksPage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const fetchItems = useCallback(async () => {
//     try {
//       const res = await socialLinksApi.getAll();
//       if (res.data?.success) setItems(res.data.data || []);
//     } catch { toast.error('Failed to load social links'); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchItems(); }, [fetchItems]);

//   const openAdd = () => {
//     setEditing(null);
//     reset({ platform: '', url: '', icon: '', label: '', isVisible: true });
//     setModalOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     reset({ platform: item.platform || '', url: item.url || '', icon: item.icon || '', label: item.label || '', isVisible: item.isVisible !== false });
//     setModalOpen(true);
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const res = editing ? await socialLinksApi.update(editing._id, data) : await socialLinksApi.create(data);
//       if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
//     } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
//     finally { setSaving(false); }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try { const res = await socialLinksApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
//     catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
//   };

//   const toggleVisible = async (item) => {
//     try {
//       const res = await socialLinksApi.update(item._id, { ...item, isVisible: !item.isVisible });
//       if (res.data?.success) { toast.success('Updated'); fetchItems(); }
//     } catch { toast.error('Failed'); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const newItems = [...items];
//     const [moved] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, moved);
//     setItems(newItems);
//     try { await socialLinksApi.reorder(newItems.map((s, i) => ({ id: s._id, order: i }))); } catch { fetchItems(); }
//   };

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{items.length} links</p>
//         <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           <Plus className="h-4 w-4" /> Add Link
//         </button>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="social-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {items.map((item, index) => (
//                 <Draggable key={item._id} draggableId={item._id} index={index}>
//                   {(dragProvided) => (
//                     <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
//                       <div className="text-xl">{item.icon || '🔗'}</div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-gray-900">{item.label || item.platform}</span>
//                           <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 capitalize">{item.platform}</span>
//                         </div>
//                         <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1 truncate text-xs text-indigo-600 hover:text-indigo-700">
//                           {item.url} <ExternalLink className="h-3 w-3" />
//                         </a>
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

//       {items.length === 0 && <div className="py-16 text-center text-gray-500">No social links yet.</div>}

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Social Link' : 'Add Social Link'} size="md">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Platform <span className="text-red-500">*</span></label>
//               <input {...register('platform', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. GitHub" />
//               {errors.platform && <p className="mt-1 text-xs text-red-500">{errors.platform.message}</p>}
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Label</label>
//               <input {...register('label')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Display text" />
//             </div>
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">URL <span className="text-red-500">*</span></label>
//             <input {...register('url', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." />
//             {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>}
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Icon (text/emoji)</label>
//             <input {...register('icon')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="🐙" />
//           </div>
//           <div className="flex items-center gap-2">
//             <input type="checkbox" id="socialVisible" {...register('isVisible')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
//             <label htmlFor="socialVisible" className="text-sm text-gray-700">Visible</label>
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

//       <ConfirmDialog isOpen={!!confirmDelete} title="Delete Link" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
//     </div>
//   );
// };

// export default SocialLinksPage;
import React, { useState, useEffect, useCallback } from 'react';
import { socialLinksApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Save, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const SocialLinksPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchItems = useCallback(async () => {
    try {
      const res = await socialLinksApi.getAll();
      if (res.data?.success) setItems(res.data.data || []);
    } catch { toast.error('Failed to load social links'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => {
    setEditing(null);
    reset({ platform: '', url: '', icon: '', username: '', enabled: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    reset({ platform: item.platform || '', url: item.url || '', icon: item.icon || '', username: item.username || '', enabled: item.enabled !== false });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Strip fields not in the model
      const { isVisible: _iv, label: _lb, ...payload } = data;
      const res = editing ? await socialLinksApi.update(editing._id, payload) : await socialLinksApi.create(payload);
      if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try { const res = await socialLinksApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
  };

  const toggleEnabled = async (item) => {
    try {
      const res = await socialLinksApi.update(item._id, { enabled: !(item.enabled !== false) });
      if (res.data?.success) { toast.success('Updated'); fetchItems(); }
    } catch { toast.error('Failed'); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const newItems = [...items];
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
    try { await socialLinksApi.reorder(newItems.map((s, i) => ({ id: s._id, order: i }))); } catch { fetchItems(); }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} links</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Link
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="social-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
                      <div className="text-xl">{item.icon || '🔗'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{item.platform}</span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 capitalize">{item.platform}</span>
                        </div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1 truncate text-xs text-indigo-600 hover:text-indigo-700">
                          {item.url} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => toggleEnabled(item)} className={`rounded-lg p-1.5 ${item.enabled !== false ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                          <span className={`inline-block h-4 w-4 rounded-full border-2 ${item.enabled !== false ? 'border-green-600 bg-green-600' : 'border-gray-300'}`} />
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

      {items.length === 0 && <div className="py-16 text-center text-gray-500">No social links yet.</div>}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Social Link' : 'Add Social Link'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Platform <span className="text-red-500">*</span></label>
              <input {...register('platform', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. GitHub" />
              {errors.platform && <p className="mt-1 text-xs text-red-500">{errors.platform.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Username</label>
              <input {...register('username')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="@username" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">URL <span className="text-red-500">*</span></label>
            <input {...register('url', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." />
            {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Icon (text/emoji)</label>
            <input {...register('icon')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="🐙" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="socialEnabled" {...register('enabled')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
            <label htmlFor="socialEnabled" className="text-sm text-gray-700">Enabled</label>
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

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Link" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default SocialLinksPage;
