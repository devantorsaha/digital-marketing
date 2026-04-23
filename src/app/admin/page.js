'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const menuItems = [
    { href: '/admin/services', label: 'Services', icon: 'fa-concierge-bell', color: '#3b82f6' },
    { href: '/admin/projects', label: 'Portfolio', icon: 'fa-briefcase', color: '#8b5cf6' },
    { href: '/admin/team', label: 'Team', icon: 'fa-users', color: '#ec4899' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: 'fa-comment-dots', color: '#f59e0b' },
    { href: '/admin/stats', label: 'Statistics', icon: 'fa-chart-bar', color: '#10b981' },
];

export default function Dashboard() {
    const [counts, setCounts] = useState({ services: 0, projects: 0, team: 0, testimonials: 0, stats: 0 });
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => { fetchCounts(); }, []);

    async function fetchCounts() {
        try {
            const res = await fetch('/api/admin/seed');
            const data = await res.json();
            setCounts(data);
        } catch { showToast('Failed to load data', 'error'); }
        finally { setLoading(false); }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleSeed() {
        setSeeding(true);
        try {
            const res = await fetch('/api/admin/seed', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                showToast('Database seeded successfully');
                fetchCounts();
            } else {
                showToast('Seeding failed', 'error');
            }
        } catch { showToast('Seeding failed', 'error'); }
        finally { setSeeding(false); }
    }

    const hasData = counts.services > 0 || counts.projects > 0;

    return (
        <div className="dashboard">
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
            
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p className="dashboard-subtitle">Manage your website content</p>
                </div>
                {!hasData && (
                    <button onClick={handleSeed} disabled={seeding} className="btn btn-primary">
                        {seeding ? <><div className="btn-spinner-small"></div>Seeding...</> : <><i className="fas fa-database"></i>Seed Database</>}
                    </button>
                )}
            </div>

            {loading ? (
                <div className="loading-grid">
                    {[1,2,3,4].map(i => <div key={i} className="skeleton-card"></div>)}
                </div>
            ) : (
                <>
                    <div className="stats-overview">
                        {menuItems.map(item => (
                            <Link key={item.href} href={item.href} className="stat-card">
                                <div className="stat-card-icon" style={{ background: `${item.color}15`, color: item.color }}>
                                    <i className={`fas ${item.icon}`}></i>
                                </div>
                                <div className="stat-card-info">
                                    <span className="stat-card-value">{counts[item.label.toLowerCase()] || 0}</span>
                                    <span className="stat-card-label">{item.label}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {!hasData && (
                        <div className="setup-card">
                            <div className="setup-icon">
                                <i className="fas fa-rocket"></i>
                            </div>
                            <h2>Get Started</h2>
                            <p>Seed your database with initial content to start managing your website.</p>
                            <button onClick={handleSeed} disabled={seeding} className="btn btn-primary">
                                {seeding ? 'Seeding...' : 'Seed Initial Data'}
                            </button>
                        </div>
                    )}

                    {hasData && (
                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-grid">
                                {menuItems.map(item => (
                                    <Link key={item.href} href={item.href} className="action-card">
                                        <div className="action-icon" style={{ background: `${item.color}15`, color: item.color }}>
                                            <i className={`fas ${item.icon}`}></i>
                                        </div>
                                        <span>Manage {item.label}</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}