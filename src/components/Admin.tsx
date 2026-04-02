import React, { useState, useEffect, useCallback } from 'react';
import { supabase, MediaItem } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Trash2, X, Image as ImageIcon, 
  Video as VideoIcon, Loader2, CheckCircle2, 
  AlertCircle, LayoutDashboard, LogOut, Lock
} from 'lucide-react';

const AdminPanel = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (err: any) {
      console.error('Error fetching media:', err.message);
      setError('Failed to fetch media. Make sure the table exists.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchMedia();
    }
  }, [isAuthorized, fetchMedia]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, use Supabase Auth. This is a simple proof of concept.
    if (password === 'Admin@Frozen2026') {
      setIsAuthorized(true);
      setError(null);
    } else {
      setError('Invalid password');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // 3. Save to Database
      const type = file.type.startsWith('video') ? 'video' : 'image';
      const { error: dbError } = await supabase
        .from('media')
        .insert([{ url: publicUrl, type }]);

      if (dbError) throw dbError;

      setSuccess('File uploaded successfully!');
      fetchMedia();
    } catch (err: any) {
      console.error('Upload error:', err.message);
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      
      // Extract file path from URL
      const urlParts = item.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `uploads/${fileName}`;

      // 1. Delete from Storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath]);

      // Note: We ignore storageError if file not found to proceed with DB deletion
      
      // 2. Delete from Database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;

      setSuccess('Item deleted successfully');
      fetchMedia();
    } catch (err: any) {
      setError(`Delete failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 rounded-3xl w-full max-w-md border border-gold/20"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/30">
              <Lock className="text-gold" size={32} />
            </div>
            <h2 className="text-3xl font-serif text-white">Admin Access</h2>
            <p className="text-white/40 text-sm mt-2">Please enter the secure key</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Password"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none text-center tracking-widest"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center flex items-center justify-center gap-2">
                <AlertCircle size={14} /> {error}
              </p>
            )}
            <button className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all rounded-xl shadow-lg shadow-gold/20">
              Unlock Terminal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="text-gold" size={24} />
              <h1 className="text-4xl font-serif">Media Control Center</h1>
            </div>
            <p className="text-white/40 text-sm tracking-widest uppercase">Frozen Apple Weddings Admin</p>
          </div>
          <button 
            onClick={() => setIsAuthorized(false)}
            className="flex items-center gap-2 px-6 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-3xl sticky top-24 border border-white/10">
              <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
                <Upload className="text-gold" size={20} /> Upload Media
              </h3>
              
              <div className="space-y-6">
                <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 hover:border-gold/30 transition-all group overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      {uploading ? <Loader2 className="text-gold animate-spin" /> : <ImageIcon className="text-gold" />}
                    </div>
                    <p className="mb-2 text-sm text-white/60">
                      <span className="font-bold text-white">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-white/30">PNG, JPG, MP4 (Max. 100MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} accept="image/*,video/*" />
                </label>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5" size={16} />
                    <p>{error}</p>
                  </motion.div>
                )}

                {success && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-start gap-3">
                    <CheckCircle2 className="shrink-0 mt-0.5" size={16} />
                    <p>{success}</p>
                  </motion.div>
                )}

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Guidelines</h4>
                  <ul className="space-y-2 text-xs text-white/50">
                    <li className="flex items-center gap-2">• Optimized for fast loading</li>
                    <li className="flex items-center gap-2">• Support for highlight videos</li>
                    <li className="flex items-center gap-2">• Global gallery updates instantly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif">Cloud Library <span className="text-sm font-sans text-white/30 ml-2">({media.length} items)</span></h3>
            </div>

            {loading && media.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-white/30">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-serif italic">Synchronizing with Supabase...</p>
              </div>
            ) : media.length === 0 ? (
              <div className="glass-panel p-20 rounded-3xl text-center border border-dashed border-white/10">
                <ImageIcon className="text-white/10 mx-auto mb-6" size={64} />
                <p className="text-white/40">No media found in the cloud.</p>
                <p className="text-xs text-white/20 mt-2">Upload your first asset to see it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {media.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                    >
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.url} className="w-full h-full object-cover" alt="Cloud asset" />
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                        <div className="p-2 bg-luxury-black/80 rounded-full text-gold">
                          {item.type === 'video' ? <VideoIcon size={20} /> : <ImageIcon size={20} />}
                        </div>
                        <button 
                          onClick={() => handleDelete(item)}
                          className="px-4 py-2 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>

                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded text-[8px] uppercase tracking-tighter text-white/60">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
