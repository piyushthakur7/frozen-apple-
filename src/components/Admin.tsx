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
  const [selectedCategory, setSelectedCategory] = useState('Wedding');
  const [filterCategory, setFilterCategory] = useState('All');
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

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

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const type = file.type.startsWith('video') ? 'video' : 'image';
      const { error: dbError } = await supabase
        .from('media')
        .insert([{ url: publicUrl, type, category: selectedCategory }]);

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

  const handleUpdateCategory = async (id: string, category: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('media')
        .update({ category })
        .eq('id', id);

      if (error) throw error;
      setSuccess('Category updated successfully');
      setEditingItem(null);
      fetchMedia();
    } catch (err: any) {
      setError(`Update failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      const urlParts = item.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `uploads/${fileName}`;

      await supabase.storage
        .from('media')
        .remove([filePath]);
      
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

  const categories = ['Wedding', 'Mehndi', 'Reception', 'Dubai', 'Other'];
  
  const filteredMedia = filterCategory === 'All' 
    ? media 
    : media.filter(item => item.category === filterCategory);

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
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none text-center tracking-widest text-white"
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
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest opacity-50 block">Target Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none text-white appearance-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-luxury-black">{cat}</option>
                    ))}
                  </select>
                </div>

                <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 hover:border-gold/30 transition-all group overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      {uploading ? <Loader2 className="text-gold animate-spin" /> : <ImageIcon className="text-gold" />}
                    </div>
                    <p className="mb-2 text-sm text-white/60 text-center px-4">
                      <span className="font-bold text-white">Click to upload</span> to <span className="text-gold">{selectedCategory}</span>
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
                    <li className="flex items-center gap-2">• Select correct category first</li>
                    <li className="flex items-center gap-2">• Support for highlight videos</li>
                    <li className="flex items-center gap-2">• Global gallery updates instantly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <h3 className="text-2xl font-serif">Cloud Library <span className="text-sm font-sans text-white/30 ml-2">({filteredMedia.length} items)</span></h3>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                <button 
                  onClick={() => setFilterCategory('All')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filterCategory === 'All' ? 'bg-gold text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filterCategory === cat ? 'bg-gold text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading && media.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-white/30">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-serif italic">Synchronizing with Supabase...</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="glass-panel p-20 rounded-3xl text-center border border-dashed border-white/10">
                <ImageIcon className="text-white/10 mx-auto mb-6" size={64} />
                <p className="text-white/40">No media found for <span className="text-gold">{filterCategory === 'All' ? 'any category' : filterCategory}</span>.</p>
                <p className="text-xs text-white/20 mt-2">Upload your first asset to see it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredMedia.map((item) => (
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
                      
                      <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{item.category || 'Uncategorized'}</span>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => setEditingItem(item)}
                                className="p-1.5 bg-white/10 hover:bg-gold hover:text-black rounded-md transition-colors"
                                title="Edit Category"
                              >
                                <Upload size={12} />
                              </button>
                              <button 
                                onClick={() => handleDelete(item)}
                                className="p-1.5 bg-red-500/20 hover:bg-red-500 text-white rounded-md transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded-full text-gold opacity-100 group-hover:opacity-0 transition-opacity">
                        {item.type === 'video' ? <VideoIcon size={14} /> : <ImageIcon size={14} />}
                      </div>

                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-gold text-black rounded text-[8px] font-bold uppercase tracking-widest opacity-100 group-hover:opacity-0 transition-opacity">
                        {item.category}
                      </div>

                      {/* Editing Overlay */}
                      {editingItem?.id === item.id && (
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4">
                          <button onClick={() => setEditingItem(null)} className="absolute top-2 right-2 p-1 text-white/50 hover:text-white"><X size={16} /></button>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">Re-categorize</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {categories.map(cat => (
                              <button 
                                key={cat}
                                onClick={() => handleUpdateCategory(item.id, cat)}
                                className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border transition-all ${item.category === cat ? 'border-gold bg-gold text-black' : 'border-white/10 bg-white/5 hover:border-gold/30'}`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
