import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Admin from '@/lib/models/Admin.js';
import { createToken, serializeAdmin, clearAdminCookie } from '@/lib/auth.js';

export async function POST(request) {
    try {
        await connectDB();
        
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password required' },
                { status: 400 }
            );
        }
        
        const admin = await Admin.findOne({ email });
        
        if (!admin || !(await admin.comparePassword(password))) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
        
        const token = createToken(admin);
        const cookie = serializeAdmin(token);
        
        const response = NextResponse.json({
            success: true,
            admin: { id: admin._id, email: admin.email, name: admin.name }
        });
        
        response.headers.set('Set-Cookie', cookie);
        
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        );
    }
}