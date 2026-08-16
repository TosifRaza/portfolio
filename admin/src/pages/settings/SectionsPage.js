// // import React, { useState, useEffect, useCallback } from 'react';
// // import { sectionsApi } from '../../api/endpoints';
// // import LoadingSpinner from '../../components/ui/LoadingSpinner';
// // import { GripVertical, Eye, EyeOff } from 'lucide-react';
// // import toast from 'react-hot-toast';
// // import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// // const SectionsPage = () => {
// //   const [sections, setSections] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   const fetchSections = useCallback(async () => {
// //     try {
// //       const res = await sectionsApi.get();
// //       if (res.data?.success) setSections(res.data.data || []);
// //     } catch { toast.error('Failed to load sections'); }
// //     finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => { fetchSections(); }, [fetchSections]);

// //   const toggleSection = async (section) => {
// //     const updated = sections.map((s) =>
// //       s._id === section._id ? { ...s, isEnabled: !s.isEnabled } : s
// //     );
// //     setSections(updated);
// //     setSaving(true);
// //     try {
// //       const res = await sectionsApi.update(updated);
// //       if (res.data?.success) toast.success('Section updated');
// //     } catch { toast.error('Failed to update'); fetchSections(); }
// //     finally { setSaving(false); }
// //   };

// //   const handleDragEnd = async (result) => {
// //     if (!result.destination) return;
// //     const newSections = [...sections];
// //     const [moved] = newSections.splice(result.source.index, 1);
// //     newSections.splice(result.destination.index, 0, moved);
// //     setSections(newSections);
// //     try { await sectionsApi.reorder(newSections.map((s, i) => ({ id: s._id, order: i }))); }
// //     catch { fetchSections(); }
// //   };

// //   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex items-center justify-between">
// //         <p className="text-sm text-gray-500">Manage which sections appear on your portfolio</p>
// //         {saving && <span className="text-xs text-indigo-600">Saving...</span>}
// //       </div>

// //       <DragDropContext onDragEnd={handleDragEnd}>
// //         <Droppable droppableId="sections-list">
// //           {(provided) => (
// //             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
// //               {sections.map((section, index) => (
// //                 <Draggable key={section._id} draggableId={section._id} index={index}>
// //                   {(dragProvided) => (
// //                     <div
// //                       ref={dragProvided.innerRef}
// //                       {...dragProvided.draggableProps}
// //                       className={`flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
// //                         section.isEnabled !== false ? 'border-gray-200' : 'border-gray-100 opacity-60'
// //                       }`}
// //                     >
// //                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400">
// //                         <GripVertical className="h-5 w-5" />
// //                       </div>
// //                       <div className="flex-1">
// //                         <div className="flex items-center gap-3">
// //                           <span className="text-sm font-semibold text-gray-900">
// //                             {section.displayName || section.name}
// //                           </span>
// //                           <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
// //                             {section.name}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <button
// //                         onClick={() => toggleSection(section)}
// //                         className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
// //                           section.isEnabled !== false
// //                             ? 'bg-green-50 text-green-700 hover:bg-green-100'
// //                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
// //                         }`}
// //                       >
// //                         {section.isEnabled !== false ? (
// //                           <><Eye className="h-4 w-4" /> Enabled</>
// //                         ) : (
// //                           <><EyeOff className="h-4 w-4" /> Disabled</>
// //                         )}
// //                       </button>
// //                     </div>
// //                   )}
// //                 </Draggable>
// //               ))}
// //               {provided.placeholder}
// //             </div>
// //           )}
// //         </Droppable>
// //       </DragDropContext>

// //       {sections.length === 0 && (
// //         <div className="py-16 text-center text-gray-500">No sections found.</div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SectionsPage;
// import React, { useState, useEffect, useCallback } from 'react';
// import { sectionsApi } from '../../api/endpoints';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { GripVertical, Eye, EyeOff } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const SectionsPage = () => {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const fetchSections = useCallback(async () => {
//     try {
//       const res = await sectionsApi.get();
//       if (res.data?.success) setSections(res.data.data || []);
//     } catch { toast.error('Failed to load sections'); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchSections(); }, [fetchSections]);

//   const toggleSection = async (section) => {
//     const updated = sections.map((s) =>
//       s._id === section._id ? { ...s, enabled: !s.enabled } : s
//     );
//     setSections(updated);
//     setSaving(true);
//     try {
//       const res = await sectionsApi.update(updated);
//       if (res.data?.success) toast.success('Section updated');
//     } catch { toast.error('Failed to update'); fetchSections(); }
//     finally { setSaving(false); }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const newSections = [...sections];
//     const [moved] = newSections.splice(result.source.index, 1);
//     newSections.splice(result.destination.index, 0, moved);
//     setSections(newSections);
//     try { await sectionsApi.reorder(newSections.map((s, i) => ({ id: s._id, order: i }))); }
//     catch { fetchSections(); }
//   };

//   if (loading) return <LoadingSpinner size="lg" className="py-20" />;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">Manage which sections appear on your portfolio</p>
//         {saving && <span className="text-xs text-indigo-600">Saving...</span>}
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="sections-list">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
//               {sections.map((section, index) => (
//                 <Draggable key={section._id} draggableId={section._id} index={index}>
//                   {(dragProvided) => (
//                     <div
//                       ref={dragProvided.innerRef}
//                       {...dragProvided.draggableProps}
//                       className={`flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
//                         section.enabled !== false ? 'border-gray-200' : 'border-gray-100 opacity-60'
//                       }`}
//                     >
//                       <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400">
//                         <GripVertical className="h-5 w-5" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3">
//                           <span className="text-sm font-semibold text-gray-900">
//                             {section.title || section.displayName || section.sectionId || 'Section'}
//                           </span>
//                           <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
//                             {section.sectionId || section.name}
//                           </span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => toggleSection(section)}
//                         className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
//                           section.enabled !== false
//                             ? 'bg-green-50 text-green-700 hover:bg-green-100'
//                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                         }`}
//                       >
//                         {section.enabled !== false ? (
//                           <><Eye className="h-4 w-4" /> Enabled</>
//                         ) : (
//                           <><EyeOff className="h-4 w-4" /> Disabled</>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {sections.length === 0 && (
//         <div className="py-16 text-center text-gray-500">No sections found.</div>
//       )}
//     </div>
//   );
// };

// export default SectionsPage;
import React, { useState, useEffect, useCallback } from 'react';
import { sectionsApi } from '../../api/endpoints';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const SectionsPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSections = useCallback(async () => {
    try {
      const res = await sectionsApi.get();
      if (res.data?.success) setSections(res.data.data || []);
    } catch { toast.error('Failed to load sections'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  const toggleSection = async (section) => {
    const updated = sections.map((s) =>
      s._id === section._id ? { ...s, enabled: !s.enabled } : s
    );
    setSections(updated);
    setSaving(true);
    try {
      const res = await sectionsApi.update(updated);
      if (res.data?.success) toast.success('Section updated');
    } catch { toast.error('Failed to update'); fetchSections(); }
    finally { setSaving(false); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const newSections = [...sections];
    const [moved] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, moved);
    setSections(newSections);
    try { await sectionsApi.reorder(newSections.map((s, i) => ({ id: s._id, order: i }))); }
    catch { fetchSections(); }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Manage which sections appear on your portfolio</p>
        {saving && <span className="text-xs text-indigo-600">Saving...</span>}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {sections.map((section, index) => (
                <Draggable key={section._id} draggableId={section._id} index={index}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={`flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                        section.enabled !== false ? 'border-gray-200' : 'border-gray-100 opacity-60'
                      }`}
                    >
                      <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">
                            {section.title || section.displayName || section.sectionId || 'Section'}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                            {section.sectionId || section.name}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSection(section)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          section.enabled !== false
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {section.enabled !== false ? (
                          <><Eye className="h-4 w-4" /> Enabled</>
                        ) : (
                          <><EyeOff className="h-4 w-4" /> Disabled</>
                        )}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {sections.length === 0 && (
        <div className="py-16 text-center text-gray-500">No sections found.</div>
      )}
    </div>
  );
};

export default SectionsPage;
