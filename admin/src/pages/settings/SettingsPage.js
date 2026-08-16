import React, { useState, useEffect } from 'react';
import { settingsApi } from '../../api/endpoints';
import { Save, Loader2, Upload, X, Globe, Palette, Megaphone, Wrench } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState('');
  const [ogFile, setOgFile] = useState(null);
  const [ogPreview, setOgPreview] = useState('');

  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsApi.get();
        if (res.data?.success) {
          const data = res.data.data || {};
          reset({
            websiteName: data.websiteName || '',
            tagline: data.tagline || '',
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            address: data.address || '',
            footerText: data.footerText || '',
            copyrightText: data.copyrightText || '',
            announcementBanner: data.announcementBanner || '',
            announcementEnabled: data.announcementEnabled || false,
            maintenanceMode: data.maintenanceMode || false,
            seoTitle: data.seoTitle || '',
            seoDescription: data.seoDescription || '',
            primaryColor: data.primaryColor || '#6366f1',
            accentColor: data.accentColor || '#10b981',
            borderRadius: data.borderRadius || '8',
            animationIntensity: data.animationIntensity || 'medium',
          });
          setLogoPreview(data.logo || '');
          setFaviconPreview(data.favicon || '');
          setOgPreview(data.ogImage || '');
        }
      } catch { toast.error('Failed to load settings'); }
      finally { setLoading(false); }
    };
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== '') {
          if (key === 'announcementEnabled' || key === 'maintenanceMode') {
            formData.append(key, data[key] ? 'true' : 'false');
          } else {
            formData.append(key, data[key]);
          }
        }
      });
      if (logoFile) formData.append('logo', logoFile);
      if (faviconFile) formData.append('favicon', faviconFile);
      if (ogFile) formData.append('ogImage', ogFile);

      const res = await settingsApi.update(formData);
      if (res.data?.success) toast.success('Settings saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) { setLogoFile(file); const r = new FileReader(); r.onloadend = () => setLogoPreview(r.result); r.readAsDataURL(file); }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFaviconFile(file); const r = new FileReader(); r.onloadend = () => setFaviconPreview(r.result); r.readAsDataURL(file); }
  };

  const handleOgChange = (e) => {
    const file = e.target.files[0];
    if (file) { setOgFile(file); const r = new FileReader(); r.onloadend = () => setOgPreview(r.result); r.readAsDataURL(file); }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* General */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Globe className="h-5 w-5 text-indigo-600" /> General
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Website Name</label>
            <input {...register('websiteName')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tagline</label>
            <input {...register('tagline')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Logo</label>
            <div className="flex items-center gap-4">
              {logoPreview && <img src={logoPreview} alt="" className="h-12 rounded-lg border object-contain" />}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                <Upload className="h-4 w-4" /> Upload <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Favicon</label>
            <div className="flex items-center gap-4">
              {faviconPreview && <img src={faviconPreview} alt="" className="h-8 w-8 rounded border object-contain" />}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                <Upload className="h-4 w-4" /> Upload <input type="file" accept="image/*" onChange={handleFaviconChange} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Email</label>
            <input type="email" {...register('contactEmail')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Phone</label>
            <input {...register('contactPhone')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
            <input {...register('address')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Footer</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Footer Text</label>
            <input {...register('footerText')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Copyright Text</label>
            <input {...register('copyrightText')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>
      </div>

      {/* Announcement */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Megaphone className="h-5 w-5 text-indigo-600" /> Announcement Banner
        </h3>
        <div className="mb-3">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Banner Text</label>
          <input {...register('announcementBanner')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. Now available for freelance work!" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="announcementEnabled" {...register('announcementEnabled')} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
          <label htmlFor="announcementEnabled" className="text-sm text-gray-700">Enable Announcement Banner</label>
        </div>
      </div>

      {/* Maintenance */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Wrench className="h-5 w-5 text-indigo-600" /> Maintenance
        </h3>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="maintenanceMode" {...register('maintenanceMode')} className="h-4 w-4 rounded border-gray-300 text-red-600" />
          <label htmlFor="maintenanceMode" className="text-sm text-gray-700">Enable Maintenance Mode</label>
          <span className="text-xs text-gray-400">(Site will show a maintenance page)</span>
        </div>
      </div>

      {/* SEO */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">SEO Defaults</h3>
        <div className="mb-3">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Default Title</label>
          <input {...register('seoTitle')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <div className="mb-3">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Default Description</label>
          <textarea {...register('seoDescription')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">OG Image</label>
          <div className="flex items-center gap-4">
            {ogPreview && (
              <div className="relative">
                <img src={ogPreview} alt="" className="h-16 w-28 rounded-lg border object-cover" />
                <button type="button" onClick={() => { setOgFile(null); setOgPreview(''); }} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white"><X className="h-3 w-3" /></button>
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              <Upload className="h-4 w-4" /> Upload OG Image <input type="file" accept="image/*" onChange={handleOgChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Palette className="h-5 w-5 text-indigo-600" /> Theme Settings
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Primary Color</label>
            <div className="flex items-center gap-2">
              <input type="color" {...register('primaryColor')} className="h-10 w-10 cursor-pointer rounded-lg border border-gray-300" />
              <input {...register('primaryColor')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Accent Color</label>
            <div className="flex items-center gap-2">
              <input type="color" {...register('accentColor')} className="h-10 w-10 cursor-pointer rounded-lg border border-gray-300" />
              <input {...register('accentColor')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Border Radius ({watch('borderRadius')}px)</label>
            <input type="range" min="0" max="24" {...register('borderRadius')} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Animation Intensity</label>
            <select {...register('animationIntensity')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save All Settings
        </button>
      </div>
    </form>
  );
};

export default SettingsPage;
