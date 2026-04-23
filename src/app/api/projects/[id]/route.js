import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Project from '@/lib/models/Project.js';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const project = await Project.findById(params.id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ project });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const data = await request.json();
        const project = await Project.findByIdAndUpdate(params.id, data, { new: true });
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ project });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const project = await Project.findByIdAndDelete(params.id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}