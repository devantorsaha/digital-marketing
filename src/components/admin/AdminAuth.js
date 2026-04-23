'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuth({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (!data.admin) {
                router.push('/admin/login');
            } else {
                setAdmin(data.admin);
                setLoading(false);
            }
        } catch (error) {
            router.push('/admin/login');
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return admin ? children : null;
}