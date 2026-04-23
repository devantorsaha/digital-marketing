'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../../layout';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, data: null });
    const [form, setForm] = useState({ icon: 'fa-store', tag: 'E-Commerce', title: '', description: '', stats: [{ value: '', label: '' }], displayOrder: 0, isActive: true });
    const [toast, setToast] = useState(null);

    const icons = ['fa-store', 'fa-utensils', 'fa-building', 'fa-heartbeat', 'fa-graduation-cap', 'fa-spa', 'fa-chart-line', 'fa-laptop'];
    const tags = ['E-Commerce', 'Restaurant', 'Real Estate', 'Healthcare', 'Education', 'Beauty', 'Technology', 'Finance'];

    useEffect(() => { fetchProjects(); }, []);

    async function fetchProjects() {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data.projects || []);
        } catch { showToast('Failed to load projects', 'error'); }
        finally { setLoading(false); }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { ...form, stats: form.stats.filter(s => s.value && s.label) };
        try {
            const url = modal.data ? `/api/projects/${modal.data._id}` : '/api/projects';
            await fetch(url, { method: modal.data ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            setModal({ open: false, data: null });
            fetchProjects();
            showToast(modal.data ? 'Project updated' : 'Project created');
        } catch { showToast('Failed to save', 'error'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this project?')) return;
        try {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            fetchProjects();
            showToast('Project deleted');
        } catch { showToast('Failed to delete', 'error'); }
    }

    function openModal(project = null) {
        if (project) {
            setForm({ 
                ...project, 
                stats: project.stats?.length ? project.stats : [{ value: '', label: '' }]
            });
        } else {
            setForm({ icon: 'fa-store', tag: 'E-Commerce', title: '', description: '', stats: [{ value: '', label: '' }], displayOrder: 0, isActive: true });
        }
        setModal({ open: true, data: project });
    }

    function addStat() { setForm({ ...form, stats: [...form.stats, { value: '', label: '' }] }); }
    function removeStat(i) { setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) }); }

    return (
        <AdminLayout>
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
            
            <div className="content-header">
                <div>
                    <h1>Portfolio Projects</h1>
                    <p className="content-subtitle">Showcase your best work</p>
                </div>
                <button onClick={() => openModal()} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Project
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <div className="loading-state"><div className="spinner"></div><p>Loading projects...</p></div>
                ) : projects.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-briefcase"></i>
                        <h3>No projects yet</h3>
                        <p>Add your first portfolio project</p>
                        <button onClick={() => openModal()} className="btn btn-primary">Add Project</button>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{width: 60}}>Icon</th>
                                    <th>Tag</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th style={{width: 80}}>Order</th>
                                    <th style={{width: 100}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(p => (
                                    <tr key={p._id}>
                                        <td><div className="icon-preview"><i className={`fas ${p.icon}`}></i></div></td>
                                        <td><span className="badge badge-info">{p.tag}</span></td>
                                        <td className="cell-title">{p.title}</td>
                                        <td className="cell-description">{p.description}</td>
                                        <td><span className="badge badge-secondary">{p.displayOrder}</span></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => openModal(p)} className="btn-icon" title="Edit"><i className="fas fa-pen"></i></button>
                                                <button onClick={() => handleDelete(p._id)} className="btn-icon btn-icon-danger" title="Delete"><i className="fas fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modal.open && (
                <div className="modal-overlay" onClick={() => setModal({ open: false, data: null })}>
                    <div className="modal modal-large" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modal.data ? 'Edit Project' : 'Add Project'}</h2>
                            <button onClick={() => setModal({ open: false, data: null })} className="modal-close"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Icon</label>
                                    <div className="icon-grid">
                                        {icons.map(icon => (
                                            <button type="button" key={icon} className={`icon-btn ${form.icon === icon ? 'selected' : ''}`} onClick={() => setForm({ ...form, icon })}>
                                                <i className={`fas ${icon}`}></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Industry Tag</label>
                                    <select className="form-input" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}>
                                        {tags.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Display Order</label>
                                    <input type="number" className="form-input" value={form.displayOrder} onChange={e => setForm({...form, displayOrder: parseInt(e.target.value) || 0})} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label>Results Stats</label>
                                <div className="stats-list">
                                    {form.stats.map((stat, i) => (
                                        <div key={i} className="stat-row">
                                            <input type="text" className="form-input" value={stat.value} onChange={e => { const s = [...form.stats]; s[i].value = e.target.value; setForm({...form, stats: s}); }} placeholder="Value (e.g., 340%)" />
                                            <input type="text" className="form-input" value={stat.label} onChange={e => { const s = [...form.stats]; s[i].label = e.target.value; setForm({...form, stats: s}); }} placeholder="Label (e.g., Sales Increase)" />
                                            <button type="button" onClick={() => removeStat(i)} className="btn-icon btn-icon-danger" disabled={form.stats.length <= 1}><i className="fas fa-minus"></i></button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addStat} className="btn btn-outline btn-sm"><i className="fas fa-plus"></i> Add Stat</button>
                            </div>
                            <div className="form-group">
                                <label className="toggle-label">
                                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} />
                                    <span className="toggle-switch"></span>
                                    <span>Active Status</span>
                                </label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => setModal({ open: false, data: null })} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">{modal.data ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}