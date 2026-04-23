import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Team from '@/lib/models/Team.js';

export async function GET() {
    try {
        await connectDB();
        const team = await Team.find({}).sort({ displayOrder: 1 });
        return NextResponse.json({ team });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const member = await Team.create(data);
        return NextResponse.json({ member }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}