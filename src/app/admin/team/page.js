'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../../layout';

export default function Team() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, data: null });
    const [form, setForm] = useState({ initials: '', name: '', role: '', bio: '', socialLinks: { linkedin: '', twitter: '', github: '', dribbble: '' }, displayOrder: 0, isActive: true });
    const [toast, setToast] = useState(null);

    useEffect(() => { fetchTeam(); }, []);

    async function fetchTeam() {
        try {
            const res = await fetch('/api/team');
            const data = await res.json();
            setTeam(data.team || []);
        } catch { showToast('Failed to load team', 'error'); }
        finally { setLoading(false); }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const url = modal.data ? `/api/team/${modal.data._id}` : '/api/team';
            await fetch(url, { method: modal.data ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            setModal({ open: false, data: null });
            fetchTeam();
            showToast(modal.data ? 'Member updated' : 'Member created');
        } catch { showToast('Failed to save', 'error'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this team member?')) return;
        try {
            await fetch(`/api/team/${id}`, { method: 'DELETE' });
            fetchTeam();
            showToast('Member deleted');
        } catch { showToast('Failed to delete', 'error'); }
    }

    function openModal(member = null) {
        if (member) setForm({ ...member, socialLinks: member.socialLinks || {} });
        else setForm({ initials: '', name: '', role: '', bio: '', socialLinks: { linkedin: '', twitter: '', github: '', dribbble: '' }, displayOrder: 0, isActive: true });
        setModal({ open: true, data: member });
    }

    return (
        <AdminLayout>
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
            
            <div className="content-header">
                <div>
                    <h1>Team Members</h1>
                    <p className="content-subtitle">Manage your team</p>
                </div>
                <button onClick={() => openModal()} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Member
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <div className="loading-state"><div className="spinner"></div><p>Loading team...</p></div>
                ) : team.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-users"></i>
                        <h3>No team members yet</h3>
                        <p>Add your first team member</p>
                        <button onClick={() => openModal()} className="btn btn-primary">Add Member</button>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{width: 70}}>Avatar</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th style={{width: 80}}>Order</th>
                                    <th style={{width: 100}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {team.map(m => (
                                    <tr key={m._id}>
                                        <td><div className="avatar-preview">{m.initials}</div></td>
                                        <td className="cell-title">{m.name}</td>
                                        <td className="cell-secondary">{m.role}</td>
                                        <td><span className="badge badge-secondary">{m.displayOrder}</span></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => openModal(m)} className="btn-icon" title="Edit"><i className="fas fa-pen"></i></button>
                                                <button onClick={() => handleDelete(m._id)} className="btn-icon btn-icon-danger" title="Delete"><i className="fas fa-trash"></i></button>
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
                            <h2>{modal.data ? 'Edit Member' : 'Add Member'}</h2>
                            <button onClick={() => setModal({ open: false, data: null })} className="modal-close"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Initials</label>
                                    <input type="text" className="form-input" maxLength={2} value={form.initials} onChange={e => setForm({...form, initials: e.target.value})} placeholder="e.g., JD" required />
                                </div>
                                <div className="form-group">
                                    <label>Display Order</label>
                                    <input type="number" className="form-input" value={form.displayOrder} onChange={e => setForm({...form, displayOrder: parseInt(e.target.value) || 0})} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label>Role / Title</label>
                                <input type="text" className="form-input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g., Marketing Director" required />
                            </div>
                            <div className="form-group">
                                <label>Short Bio</label>
                                <textarea className="form-input" rows={2} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Social Links</label>
                                <div className="social-inputs">
                                    <div className="social-input"><i className="fab fa-linkedin"></i><input type="url" className="form-input" value={form.socialLinks?.linkedin || ''} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, linkedin: e.target.value}})} placeholder="LinkedIn URL" /></div>
                                    <div className="social-input"><i className="fab fa-twitter"></i><input type="url" className="form-input" value={form.socialLinks?.twitter || ''} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, twitter: e.target.value}})} placeholder="Twitter URL" /></div>
                                    <div className="social-input"><i className="fab fa-github"></i><input type="url" className="form-input" value={form.socialLinks?.github || ''} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, github: e.target.value}})} placeholder="GitHub URL" /></div>
                                    <div className="social-input"><i className="fab fa-dribbble"></i><input type="url" className="form-input" value={form.socialLinks?.dribbble || ''} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, dribbble: e.target.value}})} placeholder="Dribbble URL" /></div>
                                </div>
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