'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../../layout';

export default function Stats() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => { fetchStats(); }, []);

    async function fetchStats() {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();
            setStats(data.stats || []);
        } catch { showToast('Failed to load stats', 'error'); }
        finally { setLoading(false); }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleSave() {
        try {
            await fetch('/api/stats', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stats) });
            showToast('Stats updated successfully');
        } catch { showToast('Failed to save', 'error'); }
    }

    function updateStat(i, field, value) {
        const updated = [...stats];
        updated[i] = { ...updated[i], [field]: value };
        setStats(updated);
    }

    return (
        <AdminLayout>
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
            
            <div className="content-header">
                <div>
                    <h1>Company Stats</h1>
                    <p className="content-subtitle">Key metrics displayed on homepage</p>
                </div>
                <button onClick={handleSave} className="btn btn-primary">
                    <i className="fas fa-save"></i> Save Changes
                </button>
            </div>

            {loading ? (
                <div className="card"><div className="loading-state"><div className="spinner"></div><p>Loading stats...</p></div></div>
            ) : (
                <div className="stats-editor">
                    {stats.map((stat, i) => (
                        <div key={stat._id || i} className="stat-card">
                            <div className="stat-category">{stat.category || 'Stat'}</div>
                            <input type="text" className="stat-value-input" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value" />
                            <input type="text" className="stat-label-input" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label" />
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}