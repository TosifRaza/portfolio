import React, { useState, useEffect, useCallback } from 'react';
import { skillsApi } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Edit2, Trash2, GripVertical, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const categoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'devops', label: 'DevOps' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Tools' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'other', label: 'Other' },
];

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchSkills = useCallback(async () => {
    try {
      const res = await skillsApi.getAll();
      if (res.data?.success) {
        setSkills(res.data.data || []);
      }
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSkills(); }, [fetchSkills]);

  const openAdd = () => {
    setEditingSkill(null);
    reset({ name: '', category: 'frontend', proficiency: 80, icon: '', enabled: true });
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditingSkill(skill);
    reset({
      name: skill.name || '',
      category: skill.category || 'frontend',
      proficiency: skill.proficiency || 80,
      icon: skill.icon || '',
      enabled: skill.enabled !== false,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = { ...data, proficiency: Number(data.proficiency) };
      if (editingSkill?._id) {
        const res = await skillsApi.update(editingSkill._id, payload);
        if (res.data?.success) {
          toast.success('Skill updated');
          setModalOpen(false);
          fetchSkills();
        }
      } else {
        const res = await skillsApi.create(payload);
        if (res.data?.success) {
          toast.success('Skill created');
          setModalOpen(false);
          fetchSkills();
        }
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
      const res = await skillsApi.delete(confirmDelete);
      if (res.data?.success) {
        toast.success('Skill deleted');
        fetchSkills();
      }
    } catch {
      toast.error('Failed to delete skill');
    } finally {
      setConfirmDelete(null);
    }
  };

  const toggleEnabled = async (skill) => {
    try {
      const res = await skillsApi.update(skill._id, { ...skill, enabled: !skill.enabled });
      if (res.data?.success) {
        toast.success('Skill updated');
        fetchSkills();
      }
    } catch {
      toast.error('Failed to update skill');
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const items = [...skills];
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setSkills(items);
    try {
      await skillsApi.reorder(items.map((s, i) => ({ id: s._id, order: i })));
    } catch {
      toast.error('Failed to reorder');
      fetchSkills();
    }
  };

  const proficiency = 0; // fallback

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{skills.length} skills total</p>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Add Skill
        </button>
      </div>

      {/* Drag and drop list */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="skills-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {skills.map((skill, index) => (
                <Draggable key={skill._id} draggableId={skill._id} index={index}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400 hover:text-gray-600">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 capitalize">{skill.category}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-gray-200">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${skill.proficiency}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{skill.proficiency}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEnabled(skill)}
                          className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${skill.enabled !== false ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${skill.enabled !== false ? 'translate-x-6 translate-y-1' : 'translate-x-1 translate-y-1'}`} />
                        </button>
                        <button onClick={() => openEdit(skill)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => setConfirmDelete(skill._id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
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

      {skills.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No skills yet. Add your first skill!</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingSkill ? 'Edit Skill' : 'Add Skill'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
            <input {...register('name', { required: 'Name is required' })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. React" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
            <select {...register('category')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              {categoryOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Proficiency ({proficiency}%)</label>
            <input type="range" min="0" max="100" {...register('proficiency')} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Icon (text/emoji)</label>
            <input {...register('icon')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. ⚛️" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="enabled" {...register('enabled')} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="enabled" className="text-sm text-gray-700">Enabled</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
              {saving ? <Save className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingSkill ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        type="danger"
      />
    </div>
  );
};

export default SkillsPage;
