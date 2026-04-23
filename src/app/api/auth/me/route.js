import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Admin from '@/lib/models/Admin.js';
import { verifyToken, COOKIE_NAME } from '@/lib/auth.js';

export async function GET(request) {
    try {
        const cookie = request.headers.get('cookie') || '';
        const cookieValue = cookie.split(`${COOKIE_NAME}=`)[1]?.split(';')[0];
        
        if (!cookieValue) {
            return NextResponse.json({ admin: null }, { status: 200 });
        }
        
        const payload = verifyToken(cookieValue);
        
        if (!payload) {
            return NextResponse.json({ admin: null }, { status: 200 });
        }
        
        await connectDB();
        const admin = await Admin.findById(payload.id).select('-password');
        
        if (!admin) {
            return NextResponse.json({ admin: null }, { status: 200 });
        }
        
        return NextResponse.json({
            admin: { id: admin._id, email: admin.email, name: admin.name }
        });
    } catch (error) {
        return NextResponse.json({ admin: null }, { status: 200 });
    }
}