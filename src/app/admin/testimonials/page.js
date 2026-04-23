'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../../layout';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, data: null });
    const [form, setForm] = useState({ name: '', role: '', company: '', quote: '', isActive: true });
    const [toast, setToast] = useState(null);

    useEffect(() => { fetchTestimonials(); }, []);

    async function fetchTestimonials() {
        try {
            const res = await fetch('/api/testimonials');
            const data = await res.json();
            setTestimonials(data.testimonials || []);
        } catch { showToast('Failed to load testimonials', 'error'); }
        finally { setLoading(false); }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const url = modal.data ? `/api/testimonials/${modal.data._id}` : '/api/testimonials';
            await fetch(url, { method: modal.data ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            setModal({ open: false, data: null });
            fetchTestimonials();
            showToast(modal.data ? 'Testimonial updated' : 'Testimonial created');
        } catch { showToast('Failed to save', 'error'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
            fetchTestimonials();
            showToast('Testimonial deleted');
        } catch { showToast('Failed to delete', 'error'); }
    }

    function openModal(t = null) {
        if (t) setForm({ ...t });
        else setForm({ name: '', role: '', company: '', quote: '', isActive: true });
        setModal({ open: true, data: t });
    }

    return (
        <AdminLayout>
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
            
            <div className="content-header">
                <div>
                    <h1>Testimonials</h1>
                    <p className="content-subtitle">Customer reviews and quotes</p>
                </div>
                <button onClick={() => openModal()} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Testimonial
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <div className="loading-state"><div className="spinner"></div><p>Loading testimonials...</p></div>
                ) : testimonials.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-quote-left"></i>
                        <h3>No testimonials yet</h3>
                        <p>Add your first testimonial</p>
                        <button onClick={() => openModal()} className="btn btn-primary">Add Testimonial</button>
                    </div>
                ) : (
                    <div className="testimonial-grid">
                        {testimonials.map(t => (
                            <div key={t._id} className="testimonial-card">
                                <div className="testimonial-quote"><i className="fas fa-quote-left"></i></div>
                                <p className="testimonial-text">{t.quote}</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
                                    <div className="author-info">
                                        <strong>{t.name}</strong>
                                        <span>{t.role}{t.company ? ` at ${t.company}` : ''}</span>
                                    </div>
                                </div>
                                <div className="testimonial-actions">
                                    <button onClick={() => openModal(t)} className="btn-icon" title="Edit"><i className="fas fa-pen"></i></button>
                                    <button onClick={() => handleDelete(t._id)} className="btn-icon btn-icon-danger" title="Delete"><i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modal.open && (
                <div className="modal-overlay" onClick={() => setModal({ open: false, data: null })}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modal.data ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                            <button onClick={() => setModal({ open: false, data: null })} className="modal-close"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <input type="text" className="form-input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g., CEO" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <input type="text" className="form-input" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Quote</label>
                                <textarea className="form-input" rows={4} value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} placeholder="What the customer said..." required />
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