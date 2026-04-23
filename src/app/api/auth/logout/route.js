import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/auth.js';

export async function POST() {
    const cookie = clearAdminCookie();
    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', cookie);
    return response;
}