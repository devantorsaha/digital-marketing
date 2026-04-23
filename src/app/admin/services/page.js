'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../../layout';

const icons = [
    'fa-chart-pie', 'fa-share-alt', 'fa-code', 'fa-search', 'fa-palette', 'fa-ad', 'fa-video', 'fa-pencil-ruler',
    'fa-bullhorn', 'fa-handshake', 'fa-rocket', 'fa-users', 'fa-briefcase', 'fa-store', 'fa-envelope', 'fa-phone'
];

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, data: null });
    const [form, setForm] = useState({ icon: 'fa-chart-pie', title: '', description: '', features: '', displayOrder: 0, isActive: true });
    const [toast, setToast] = useState(null);

    useEffect(() => { fetchServices(); }, []);

    async function fetchServices() {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data.services || []);
        } catch { showToast('Failed to load services', 'error'); }
        finally { setLoading(false); }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { ...form, features: form.features.split(',').map(f => f.trim()).filter(Boolean) };
        try {
            const url = modal.data ? `/api/services/${modal.data._id}` : '/api/services';
            await fetch(url, { method: modal.data ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            setModal({ open: false, data: null });
            fetchServices();
            showToast(modal.data ? 'Service updated' : 'Service created');
        } catch { showToast('Failed to save', 'error'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this service?')) return;
        try {
            await fetch(`/api/services/${id}`, { method: 'DELETE' });
            fetchServices();
            showToast('Service deleted');
        } catch { showToast('Failed to delete', 'error'); }
    }

    function openModal(service = null) {
        if (service) setForm({ ...service, features: service.features?.join(', ') || '' });
        else setForm({ icon: 'fa-chart-pie', title: '', description: '', features: '', displayOrder: 0, isActive: true });
        setModal({ open: true, data: service });
    }

    return (
        <AdminLayout>
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
            
            <div className="content-header">
                <div>
                    <h1>Services</h1>
                    <p className="content-subtitle">Manage your service offerings</p>
                </div>
                <button onClick={() => openModal()} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Service
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <div className="loading-state"><div className="spinner"></div><p>Loading services...</p></div>
                ) : services.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-concierge-bell"></i>
                        <h3>No services yet</h3>
                        <p>Add your first service to get started</p>
                        <button onClick={() => openModal()} className="btn btn-primary">Add Service</button>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{width: 60}}>Icon</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th style={{width: 80}}>Order</th>
                                    <th style={{width: 80}}>Status</th>
                                    <th style={{width: 100}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map(s => (
                                    <tr key={s._id}>
                                        <td><div className="icon-preview"><i className={`fas ${s.icon}`}></i></div></td>
                                        <td className="cell-title">{s.title}</td>
                                        <td className="cell-description">{s.description}</td>
                                        <td><span className="badge badge-secondary">{s.displayOrder}</span></td>
                                        <td><span className={`badge ${s.isActive ? 'badge-success' : 'badge-warning'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => openModal(s)} className="btn-icon" title="Edit"><i className="fas fa-pen"></i></button>
                                                <button onClick={() => handleDelete(s._id)} className="btn-icon btn-icon-danger" title="Delete"><i className="fas fa-trash"></i></button>
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
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modal.data ? 'Edit Service' : 'Add Service'}</h2>
                            <button onClick={() => setModal({ open: false, data: null })} className="modal-close"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
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
                                <label>Features <span className="label-hint">(comma separated)</span></label>
                                <input type="text" className="form-input" value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Feature 1, Feature 2, Feature 3" />
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