import React, { useState, useEffect, useCallback } from 'react';
import { resumeApi } from '../../api/endpoints';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Upload, Download, Trash2, FileText, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchResumes = useCallback(async () => {
    try {
      const res = await resumeApi.getAll();
      if (res.data?.success) setResumes(res.data.data || []);
    } catch { toast.error('Failed to load resumes'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchResumes(); }, [fetchResumes]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await resumeApi.upload(formData);
      if (res.data?.success) {
        toast.success('Resume uploaded');
        fetchResumes();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handlePublish = async (id) => {
    try {
      const res = await resumeApi.publish(id);
      if (res.data?.success) {
        toast.success('Resume published');
        fetchResumes();
      }
    } catch { toast.error('Failed to publish resume'); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await resumeApi.delete(confirmDelete);
      if (res.data?.success) {
        toast.success('Resume deleted');
        fetchResumes();
      }
    } catch { toast.error('Failed to delete'); }
    finally { setConfirmDelete(null); }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Upload Resume</h3>
        <label className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          uploading ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50'
        }`}>
          {uploading ? (
            <>
              <Loader2 className="mb-3 h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="mb-3 h-8 w-8 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Click to upload a PDF</p>
              <p className="mt-1 text-xs text-gray-400">PDF files only</p>
            </>
          )}
          <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Resume List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">All Resumes ({resumes.length})</h3>
        </div>
        {resumes.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <FileText className="mx-auto mb-2 h-10 w-10 text-gray-300" />
            <p>No resumes uploaded yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {resumes.map((resume) => (
              <div key={resume._id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{resume.fileName || 'Resume'}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                      {resume.isPublished && (
                        <span className="ml-2 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                          <Check className="mr-0.5 inline h-3 w-3" /> Published
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.url && (
                    <a href={resume.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                      <Download className="h-3.5 w-3.5" /> Download
                    </a>
                  )}
                  {!resume.isPublished && (
                    <button onClick={() => handlePublish(resume._id)} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700">
                      Publish
                    </button>
                  )}
                  <button onClick={() => setConfirmDelete(resume._id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Resume" message="Are you sure you want to delete this resume?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default ResumePage;
