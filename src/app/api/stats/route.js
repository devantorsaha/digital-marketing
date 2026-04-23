import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Stat from '@/lib/models/Stat.js';

export async function GET() {
    try {
        await connectDB();
        const stats = await Stat.find({}).sort({ displayOrder: 1 });
        return NextResponse.json({ stats });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        const data = await request.json();
        
        if (Array.isArray(data)) {
            for (const stat of data) {
                if (stat._id) {
                    await Stat.findByIdAndUpdate(stat._id, stat);
                } else {
                    await Stat.create(stat);
                }
            }
        }
        
        const stats = await Stat.find({}).sort({ displayOrder: 1 });
        return NextResponse.json({ stats });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
    }
}