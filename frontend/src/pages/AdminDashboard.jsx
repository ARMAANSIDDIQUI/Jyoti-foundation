import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Users, FolderHeart, MessageSquare,
  LogOut, Plus, Trash2, Edit2, Save, X, Loader2, Check, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({ members: [], projects: [], contacts: [], stats: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [members, projects, contacts] = await Promise.all([
        fetch(`${API_BASE}/members`).then(r => r.json()),
        fetch(`${API_BASE}/projects`).then(r => r.json()),
        fetch(`${API_BASE}/contact`).then(r => r.json()),
        fetch(`${API_BASE}/stats`).then(r => r.json()),
        fetch(`${API_BASE}/categories`).then(r => r.json()),
      ]);
      setData({
        members: Array.isArray(members) ? members : [],
        projects: Array.isArray(projects) ? projects : [],
        contacts: Array.isArray(contacts) ? contacts : [],
        stats: Array.isArray(stats) ? stats : [],
        categories: Array.isArray(categories) ? categories : []
      });
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${API_BASE}/${type}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchAllData();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Error deleting');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const type = activeTab === 'members' ? 'members' : activeTab === 'projects' ? 'projects' : activeTab === 'stats' ? 'stats' : 'categories';
    const method = currentItem._id ? 'PUT' : 'POST';
    const url = currentItem._id ? `${API_BASE}/${type}/${currentItem._id}` : `${API_BASE}/${type}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem)
      });

      if (response.ok) {
        setShowModal(false);
        setCurrentItem(null);
        fetchAllData();
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      alert('Error saving');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'members', label: 'Members', icon: <Users className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderHeart className="w-5 h-5" /> },
    { id: 'categories', label: 'Categories', icon: <Target className="w-5 h-5" /> },
    { id: 'stats', label: 'Statistics', icon: <Check className="w-5 h-5" /> },
    { id: 'contacts', label: 'Inquiries', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-heading font-bold text-xl text-primary flex items-center gap-2">
            <Check className="w-6 h-6" /> Jyoti Admin
          </h2>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setShowModal(false); setCurrentItem(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text capitalize">{activeTab}</h1>
            <p className="text-gray-500">Foundation Administration Panel</p>
          </div>
          <div className="flex gap-4">
            <a href="/" target="_blank" className="bg-white text-gray-600 px-4 py-3 rounded-xl font-medium border border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-all">
              <ExternalLink className="w-4 h-4" /> View Site
            </a>
            {(activeTab === 'members' || activeTab === 'projects') && (
              <button
                onClick={() => { setCurrentItem({}); setShowModal(true); }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="w-5 h-5" /> Add {activeTab === 'members' ? 'Member' : activeTab === 'projects' ? 'Project' : activeTab === 'stats' ? 'Stat' : 'Category'}
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center p-20 text-primary">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 min-h-[500px]">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-blue-700 font-bold text-lg mb-1">Total Members</h3>
                  <p className="text-4xl font-bold text-blue-900">{data.members.length}</p>
                </div>
                <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                      <FolderHeart className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-green-700 font-bold text-lg mb-1">Total Projects</h3>
                  <p className="text-4xl font-bold text-green-900">{data.projects.length}</p>
                </div>
                <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-purple-700 font-bold text-lg mb-1">Total Inquiries</h3>
                  <p className="text-4xl font-bold text-purple-900">{data.contacts.length}</p>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 font-semibold text-gray-500">Index</th>
                      <th className="py-4 font-semibold text-gray-500">Name</th>
                      <th className="py-4 font-semibold text-gray-500">Position</th>
                      <th className="py-4 font-semibold text-gray-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.members.map((member) => (
                      <tr key={member._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 text-gray-600">#{member.index}</td>
                        <td className="py-4 font-bold text-text">{member.name}</td>
                        <td className="py-4 text-primary font-medium">{member.post}</td>
                        <td className="py-4 text-right space-x-3">
                          <button onClick={() => { setCurrentItem(member); setShowModal(true); }} className="text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete('members', member._id)} className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.projects.map((project) => (
                  <div key={project._id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group relative">
                    <h3 className="font-bold text-text text-lg mb-2">{project.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{project.location}</p>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => { setCurrentItem(project); setShowModal(true); }} className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 text-blue-600"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('projects', project._id)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {data.contacts.map((contact) => (
                  <div key={contact._id} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-text text-lg">{contact.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{contact.email}</span>
                          {contact.phone && <span>• {contact.phone}</span>}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-sm italic">
                      "{contact.message}"
                    </p>
                  </div>
                ))}
                {data.contacts.length === 0 && <p className="text-center text-gray-500 py-10">No inquiries yet.</p>}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 font-semibold text-gray-500">Label</th>
                      <th className="py-4 font-semibold text-gray-500">Value</th>
                      <th className="py-4 font-semibold text-gray-500">Suffix</th>
                      <th className="py-4 font-semibold text-gray-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.stats.map((stat) => (
                      <tr key={stat._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-bold text-text">{stat.label}</td>
                        <td className="py-4 text-primary font-medium">{stat.value}</td>
                        <td className="py-4 text-gray-600">{stat.suffix}</td>
                        <td className="py-4 text-right space-x-3">
                          <button onClick={() => { setCurrentItem(stat); setShowModal(true); }} className="text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete('stats', stat._id)} className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10"
            >
              <h2 className="text-2xl font-bold mb-6 text-text">{currentItem?._id ? 'Edit' : 'Add New'} {
                activeTab === 'members' ? 'Member' : 
                activeTab === 'projects' ? 'Project' : 
                activeTab === 'stats' ? 'Stat' : 'Category'
              }</h2>
              <form onSubmit={handleSave} className="space-y-4">
                {activeTab === 'members' ? (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Full Name</label>
                      <input type="text" required value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Role / Designation</label>
                      <input type="text" required value={currentItem.role || ''} onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Display Order</label>
                      <input type="number" required value={currentItem.index || 0} onChange={e => setCurrentItem({ ...currentItem, index: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                  </>
                ) : activeTab === 'projects' ? (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Title / Name</label>
                      <input type="text" required value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Location</label>
                      <input type="text" required value={currentItem.location || ''} onChange={e => setCurrentItem({ ...currentItem, location: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Category</label>
                      <select 
                        required 
                        value={currentItem.category || ''} 
                        onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} 
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none"
                      >
                        <option value="">Select Category</option>
                        {data.categories.map(cat => (
                          <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Short Description</label>
                      <textarea required value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none h-24 resize-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Full Details</label>
                      <textarea required value={currentItem.details || ''} onChange={e => setCurrentItem({ ...currentItem, details: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none h-32 resize-none" />
                    </div>
                  </>
                ) : activeTab === 'stats' ? (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Stat Label</label>
                      <input type="text" required placeholder="e.g. Surgeries Done" value={currentItem.label || ''} onChange={e => setCurrentItem({ ...currentItem, label: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Stat Value</label>
                      <input type="text" required placeholder="e.g. 15000" value={currentItem.value || ''} onChange={e => setCurrentItem({ ...currentItem, value: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Suffix</label>
                      <input type="text" placeholder="e.g. +" value={currentItem.suffix || ''} onChange={e => setCurrentItem({ ...currentItem, suffix: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Display Order</label>
                      <input type="number" required value={currentItem.index || 0} onChange={e => setCurrentItem({ ...currentItem, index: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Category Name</label>
                      <input type="text" required placeholder="e.g. Eye Camps" value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Display Order</label>
                      <input type="number" required value={currentItem.index || 0} onChange={e => setCurrentItem({ ...currentItem, index: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary outline-none" />
                    </div>
                  </>
                )}
                <div className="flex gap-4 pt-6">
                  <button type="submit" className="flex-grow bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all">Save Changes</button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
