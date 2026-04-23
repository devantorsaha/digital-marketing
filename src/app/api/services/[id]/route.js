import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Service from '@/lib/models/Service.js';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const service = await Service.findById(params.id);
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json({ service });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const data = await request.json();
        const service = await Service.findByIdAndUpdate(params.id, data, { new: true });
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json({ service });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const service = await Service.findByIdAndDelete(params.id);
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}