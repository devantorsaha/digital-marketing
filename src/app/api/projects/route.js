import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Project from '@/lib/models/Project.js';

export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find({}).sort({ displayOrder: 1 });
        return NextResponse.json({ projects });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const project = await Project.create(data);
        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}