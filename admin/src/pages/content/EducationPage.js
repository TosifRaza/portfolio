// import React, { useState, useEffect, useCallback } from 'react';
// import { educationApi } from '../../api/endpoints';
// import Modal from '../../components/ui/Modal';
// import ConfirmDialog from '../../components/ui/ConfirmDialog';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { Plus, Edit2, Trash2, GripVertical, Save, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const EducationPage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [certificates, setCertificates] = useState([]);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const fetchItems = useCallback(async () => {
//     try {
//       const res = await educationApi.getAll();
//       if (res.data?.success) setItems(res.data.data || []);
//     } catch { toast.error('Failed to load education'); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchItems(); }, [fetchItems]);

//   const openAdd = () => {
//     setEditing(null);
//     setCertificates([]);
//     reset({ institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '', description: '' });
//     setModalOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     setCertificates(item.certificates || []);
//     reset({
//       institution: item.institution || '', degree: item.degree || '', field: item.field || '',
//       startDate: item.startDate ? item.startDate.split('T')[0] : '', endDate: item.endDate ? item.endDate.split('T')[0] : '',
//       grade: item.grade || '', description: item.description || '',
//     });
//     setModalOpen(true);
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       const payload = { ...data, certificates };
//       const res = editing ? await educationApi.update(editing._id, payload) : await educationApi.create(payload);
//       if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
//     } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
//     finally { setSaving(false); }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try { const res = await educationApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
//     catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const newItems = [...items];
//     const [moved] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, moved);
//     setItems(newItems);
//     try { await educationApi.reorder(newItems.map((item, i) => ({ id: item._id, order: i }))); } catch { fetchItems(); }
//   };

//   const addCert = () => setCertificates([...certificates, { name: '', issuer: '', date: '', url: '' }]);
//   const removeCert = (i) => setCertificates(certificates.filter((_, idx) => idx !== i));
//   const updateCert = (i, field, value) => setCertificates(certificates.map((c, idx) => idx === i ? { ...c, [field]: value } : c));

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{items.length} entries</p>
//         <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           <Plus className="h-4 w-4" /> Add Education
//         </button>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="edu-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {items.map((item, index) => (
//                 <Draggable key={item._id} draggableId={item._id} index={index}>
//                   {(dragProvided) => (
//                     <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
//                       <div className="flex-1">
//                         <span className="font-medium text-gray-900">{item.degree} in {item.field}</span>
//                         <p className="text-xs text-gray-500">{item.institution} · {item.startDate?.split('T')[0]} - {item.endDate?.split('T')[0]} {item.grade ? `· GPA: ${item.grade}` : ''}</p>
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

//       {items.length === 0 && <div className="py-16 text-center text-gray-500">No education entries yet.</div>}

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Education' : 'Add Education'} size="lg">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Institution <span className="text-red-500">*</span></label>
//               <input {...register('institution', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               {errors.institution && <p className="mt-1 text-xs text-red-500">{errors.institution.message}</p>}
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Degree <span className="text-red-500">*</span></label>
//               <input {...register('degree', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//               {errors.degree && <p className="mt-1 text-xs text-red-500">{errors.degree.message}</p>}
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Field of Study</label>
//               <input {...register('field')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Grade / GPA</label>
//               <input {...register('grade')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
//               <input type="date" {...register('startDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
//               <input type="date" {...register('endDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//             </div>
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
//             <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//           </div>
//           {/* Certificates */}
//           <div>
//             <div className="mb-2 flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Certificates</label>
//               <button type="button" onClick={addCert} className="text-xs text-indigo-600">+ Add Certificate</button>
//             </div>
//             {certificates.map((cert, i) => (
//               <div key={i} className="mb-3 rounded-lg border border-gray-200 p-3">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs font-medium text-gray-500">Certificate {i + 1}</span>
//                   <button type="button" onClick={() => removeCert(i)} className="text-red-500"><X className="h-4 w-4" /></button>
//                 </div>
//                 <div className="grid gap-2 sm:grid-cols-2">
//                   <input value={cert.name} onChange={(e) => updateCert(i, 'name', e.target.value)} placeholder="Name" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                   <input value={cert.issuer} onChange={(e) => updateCert(i, 'issuer', e.target.value)} placeholder="Issuer" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                   <input value={cert.date} onChange={(e) => updateCert(i, 'date', e.target.value)} placeholder="Date" type="date" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                   <input value={cert.url} onChange={(e) => updateCert(i, 'url', e.target.value)} placeholder="URL" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 </div>
//               </div>
//             ))}
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

//       <ConfirmDialog isOpen={!!confirmDelete} title="Delete Education" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
//     </div>
//   );
// };

// export default EducationPage;
import React, { useState, useEffect, useCallback } from 'react';
import { educationApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const EducationPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchItems = useCallback(async () => {
    try {
      const res = await educationApi.getAll();
      if (res.data?.success) setItems(res.data.data || []);
    } catch { toast.error('Failed to load education'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => {
    setEditing(null);
    setCertificates([]);
    reset({ institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '', description: '' }, { shouldValidate: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setCertificates(item.certificates || []);
    reset({
      institution: item.institution || '', degree: item.degree || '', field: item.field || '',
      startDate: item.startDate ? item.startDate.split('T')[0] : '', endDate: item.endDate ? item.endDate.split('T')[0] : '',
      grade: item.grade || '', description: item.description || '',
    }, { shouldValidate: true });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const { certificates: _c, ...payload } = { ...data, certificates };
      const res = editing ? await educationApi.update(editing._id, payload) : await educationApi.create(payload);
      if (res.data?.success) { toast.success(editing ? 'Updated' : 'Created'); setModalOpen(false); fetchItems(); }
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try { const res = await educationApi.delete(confirmDelete); if (res.data?.success) toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Failed'); } finally { setConfirmDelete(null); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const newItems = [...items];
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
    try { await educationApi.reorder(newItems.map((item, i) => ({ id: item._id, order: i }))); } catch { fetchItems(); }
  };

  const addCert = () => setCertificates([...certificates, { name: '', issuer: '', date: '', url: '' }]);
  const removeCert = (i) => setCertificates(certificates.filter((_, idx) => idx !== i));
  const updateCert = (i, field, value) => setCertificates(certificates.map((c, idx) => idx === i ? { ...c, [field]: value } : c));

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} entries</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="edu-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400"><GripVertical className="h-5 w-5" /></div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{item.degree} in {item.field}</span>
                        <p className="text-xs text-gray-500">{item.institution} · {item.startDate?.split('T')[0]} - {item.endDate?.split('T')[0]} {item.grade ? `· GPA: ${item.grade}` : ''}</p>
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

      {items.length === 0 && <div className="py-16 text-center text-gray-500">No education entries yet.</div>}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Education' : 'Add Education'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Institution <span className="text-red-500">*</span></label>
              <input {...register('institution', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.institution && <p className="mt-1 text-xs text-red-500">{errors.institution.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Degree <span className="text-red-500">*</span></label>
              <input {...register('degree', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.degree && <p className="mt-1 text-xs text-red-500">{errors.degree.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Field of Study</label>
              <input {...register('field', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.field && <p className="mt-1 text-xs text-red-500">{errors.field.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Grade / GPA</label>
              <input {...register('grade')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" {...register('startDate', { required: 'Required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" {...register('endDate')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          {/* Certificates */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Certificates</label>
              <button type="button" onClick={addCert} className="text-xs text-indigo-600">+ Add Certificate</button>
            </div>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-3 rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Certificate {i + 1}</span>
                  <button type="button" onClick={() => removeCert(i)} className="text-red-500"><X className="h-4 w-4" /></button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input value={cert.name} onChange={(e) => updateCert(i, 'name', e.target.value)} placeholder="Name" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  <input value={cert.issuer} onChange={(e) => updateCert(i, 'issuer', e.target.value)} placeholder="Issuer" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  <input value={cert.date} onChange={(e) => updateCert(i, 'date', e.target.value)} placeholder="Date" type="date" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  <input value={cert.url} onChange={(e) => updateCert(i, 'url', e.target.value)} placeholder="URL" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
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

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Education" message="Are you sure?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default EducationPage;
