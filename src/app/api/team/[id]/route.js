import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Team from '@/lib/models/Team.js';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const member = await Team.findById(params.id);
        if (!member) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ member });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const data = await request.json();
        const member = await Team.findByIdAndUpdate(params.id, data, { new: true });
        if (!member) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ member });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const member = await Team.findByIdAndDelete(params.id);
        if (!member) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
}