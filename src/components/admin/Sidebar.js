'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: 'fa-th-large' },
    { href: '/admin/services', label: 'Services', icon: 'fa-concierge-bell' },
    { href: '/admin/projects', label: 'Portfolio', icon: 'fa-briefcase' },
    { href: '/admin/team', label: 'Team', icon: 'fa-users' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: 'fa-comment-dots' },
    { href: '/admin/stats', label: 'Statistics', icon: 'fa-chart-bar' },
];

export default function Sidebar() {
    const pathname = usePathname();

    async function handleLogout() {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout failed', error);
        }
        window.location.href = '/admin/login';
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <Link href="/admin" className="brand-link">
                    <div className="brand-icon">
                        <i className="fas fa-leaf"></i>
                    </div>
                    <div className="brand-text">
                        <span className="brand-name">Marketing</span>
                        <span className="brand-sub">Park Admin</span>
                    </div>
                </Link>
            </div>

            <div className="sidebar-section">
                <span className="section-label">Main</span>
                <nav className="sidebar-nav">
                    {menuItems.slice(0, 1).map((item) => (
                        <SidebarItem key={item.href} item={item} pathname={pathname} />
                    ))}
                </nav>
            </div>

            <div className="sidebar-section">
                <span className="section-label">Content</span>
                <nav className="sidebar-nav">
                    {menuItems.slice(1, 5).map((item) => (
                        <SidebarItem key={item.href} item={item} pathname={pathname} />
                    ))}
                </nav>
            </div>

            <div className="sidebar-section">
                <span className="section-label">Analytics</span>
                <nav className="sidebar-nav">
                    {menuItems.slice(5).map((item) => (
                        <SidebarItem key={item.href} item={item} pathname={pathname} />
                    ))}
                </nav>
            </div>

            <div className="sidebar-footer">
                <Link href="/" target="_blank" className="sidebar-link">
                    <i className="fas fa-external-link-alt"></i>
                    <span>View Website</span>
                    <i className="fas fa-arrow-right link-arrow"></i>
                </Link>
                <button onClick={handleLogout} className="sidebar-link logout">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

function SidebarItem({ item, pathname }) {
    const isActive = pathname === item.href;
    return (
        <Link href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
        </Link>
    );
}