import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Testimonial from '@/lib/models/Testimonial.js';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const testimonial = await Testimonial.findById(params.id);
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json({ testimonial });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const data = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(params.id, data, { new: true });
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json({ testimonial });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const testimonial = await Testimonial.findByIdAndDelete(params.id);
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}